import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs"; // Needed for file deletion
import File from "./models/File.js";

// --- START: Authentication/Session Setup ---
// ⚠️ WARNING: This is NOT a production-ready session store. Use JWTs + database.
const adminSession = {}; // Simple in-memory storage for admin 'session'

const isAdmin = (req, res, next) => {
  // Simple check for a 'token' sent in the Authorization header
  const token = req.headers['authorization']?.split(' ')[1];
  if (token && adminSession[token]) {
    next();
  } else {
    res.status(401).json({ error: "Access Denied: Admin privileges required." });
  }
};
// --- END: Authentication/Session Setup ---


// 🔹 Configure storage (Unchanged)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // save files in /uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

const upload = multer({ storage });

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/oic-store";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("OIC Store Backend is running 🚀");
});

app.use("/uploads", express.static("uploads"));

// ================= ADMIN LOGIN ROUTE =================

// Admin Login Route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASS = process.env.ADMIN_PASS;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    // Generate a simple "token"
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    adminSession[token] = true; // Store session state
    res.status(200).json({ message: "Login successful", token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});


// ================= FILE UPLOAD (PROTECTED) =================

// Upload a single file (PROTECTED BY isAdmin MIDDLEWARE)
app.post("/api/upload", isAdmin, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    // Save file metadata to MongoDB
    const newFile = new File({
      filename: req.file.originalname,
      filepath: `/uploads/${req.file.filename}`,
    });
    await newFile.save();

    res.status(200).json({
      message: "File uploaded successfully",
      filePath: newFile.filepath,
      filename: newFile.filename,
    });
  } catch (err) {
    res.status(500).json({ error: "Error saving file to database" });
  }
});

// ================= FILE DELETION (PROTECTED) =================

// Delete a file by its MongoDB ID (PROTECTED BY isAdmin MIDDLEWARE)
app.delete("/api/files/:id", isAdmin, async (req, res) => {
  try {
    const fileId = req.params.id;

    // 1. Find the file record in MongoDB
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // 2. Delete the physical file from the disk (e.g., /uploads/filename.ext)
    // Remove the leading '/' from the filepath before joining
    const localFilePath = path.join(process.cwd(), file.filepath.substring(1));

    fs.unlink(localFilePath, async (err) => {
      if (err) {
        console.error("Error deleting physical file:", err);
        // We proceed to delete metadata even if physical deletion fails
      }

      // 3. Delete the metadata from MongoDB
      await File.findByIdAndDelete(fileId);

      res.status(200).json({ message: "File deleted successfully" });
    });
  } catch (err) {
    console.error("Server error during file deletion:", err);
    res.status(500).json({ error: "Error deleting file" });
  }
});

// ================= FILE RETRIEVAL (PUBLIC) =================

// Get all uploaded files (metadata)
app.get("/api/files", async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));