const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Load .env file

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret_key'; // CHANGE THIS

// --- MIDDLEWARE ---
app.use(cors()); 
app.use(express.json());
// Serve the uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/', (req, res) => res.send('OIC Store Backend is running 🚀'));

// --- MONGODB CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('🟢 MongoDB connected successfully'))
    .catch(err => console.error('🔴 MongoDB connection error:', err));

// --- FILE SCHEMA ---
const FileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    filepath: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});
const File = mongoose.model('File', FileSchema);

// --- MULTER CONFIG (File Storage) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Use the original name but ensure it's unique
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname.split('.')[0] + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

// --- ADMIN AUTH MIDDLEWARE ---
const isAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization token missing.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Bearer token missing.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Assuming a successful decode means a valid admin token for simplicity
        req.admin = decoded; 
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token.' });
    }
};

// ===================================
//              API ROUTES
// ===================================

// 1. ADMIN LOGIN (Public)
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Check environment variables for admin user/pass
    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASS = process.env.ADMIN_PASS;

    if (!ADMIN_USER || !ADMIN_PASS) {
        return res.status(500).json({ error: 'Server configuration error: Admin credentials not set.' });
    }

    // Simplified authentication: check username and unhashed password directly
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        const token = jwt.sign({ user: username, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ message: 'Login successful', token });
    } else {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
});

// 2. FILE UPLOAD (Admin Protected)
app.post('/api/upload', isAdmin, upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    try {
        // Construct the filepath relative to the server root for easy download URL creation
        const newFile = new File({
            filename: req.file.originalname,
            filepath: '/uploads/' + req.file.filename,
        });

        await newFile.save();
        res.status(201).json({ 
            message: 'File uploaded and saved successfully', 
            filename: req.file.originalname,
            fileId: newFile._id
        });
    } catch (error) {
        console.error('Database save error:', error);
        // Clean up the uploaded file if database save fails
        fs.unlinkSync(req.file.path); 
        res.status(500).json({ error: 'Failed to save file record.' });
    }
});

// 3. GET ALL FILES (Public - for Download page)
app.get('/api/files', async (req, res) => {
    try {
        // Sort by most recently uploaded
        const files = await File.find().sort({ uploadedAt: -1 });
        res.json(files);
    } catch (error) {
        console.error('File fetch error:', error);
        res.status(500).json({ error: 'Failed to retrieve files.' });
    }
});

// 4. DELETE FILE (Admin Protected)
app.delete('/api/files/:id', isAdmin, async (req, res) => {
    try {
        const fileId = req.params.id;
        const fileRecord = await File.findById(fileId);

        if (!fileRecord) {
            return res.status(404).json({ error: 'File not found in database.' });
        }

        // 1. Delete the physical file from the disk
        const filePathOnDisk = path.join(__dirname, fileRecord.filepath);
        if (fs.existsSync(filePathOnDisk)) {
            fs.unlinkSync(filePathOnDisk);
        } else {
            console.warn(`Physical file not found for path: ${filePathOnDisk}`);
        }

        // 2. Delete the record from the database
        await File.findByIdAndDelete(fileId);

        res.json({ message: 'File deleted successfully', filename: fileRecord.filename });
    } catch (error) {
        console.error('Deletion error:', error);
        res.status(500).json({ error: 'Failed to delete file.' });
    }
});


app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));