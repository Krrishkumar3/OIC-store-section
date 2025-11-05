import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import File from "./models/File.js";

// 🔹 Configure storage
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

app.use("/uploads", express.static("uploads"));

// ================= FILE UPLOAD =================

// Upload a single file
app.post("/api/upload", upload.single("file"), async (req, res) => {
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

app.get("/api/files", async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch files" });
  }
});


// Get all uploaded files (metadata)
import fs from "fs";

app.get("/api/files", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) return res.status(500).json({ error: "Failed to read files" });
    res.json(files);
  });
});
