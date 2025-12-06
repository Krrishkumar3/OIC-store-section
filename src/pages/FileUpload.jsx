import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FileUpload.css'; 

// Define the base URL for the backend API
const API_BASE_URL = 'https://oic-store-backend.onrender.com';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // Check for authentication on load
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            // A simple token check is sufficient for client-side rendering protection
            setIsAuthenticated(true);
        } else {
            // Redirect if no token is found
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadMessage('');
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadMessage({ type: 'error', text: 'Please select a file first.' });
            return;
        }

        const token = localStorage.getItem('adminToken');
        // We re-check the token just in case
        if (!token) {
            setUploadMessage({ type: 'error', text: 'Authentication failed. Redirecting...' });
            setTimeout(() => navigate('/admin/login'), 500);
            return;
        }

        setIsUploading(true);
        setUploadMessage({ type: 'info', text: `Uploading file: ${selectedFile.name}...` });

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch(`${API_BASE_URL}/api/upload`, { // Use API_BASE_URL
                method: 'POST',
                headers: {
                    // Send the token in the Authorization header
                    'Authorization': `Bearer ${token}`, 
                },
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setUploadMessage({ type: 'success', text: `Success! ${result.filename} uploaded and live.` });
                setSelectedFile(null); 
                document.getElementById('file-input').value = null; // Clear input field
            } else {
                setUploadMessage({ type: 'error', text: `Upload Failed: ${result.error || 'Server rejected the file.'}` });
            }
        } catch (error) {
            console.error('Network Error:', error);
            setUploadMessage({ type: 'error', text: 'A network error occurred. Check server connection.' });
        } finally {
            setIsUploading(false);
        }
    };

    if (!isAuthenticated) {
        return <div className="login-container"><p>Checking authentication...</p></div>;
    }

    return (
        <div className="upload-container">
            <h2>Admin File Upload</h2>
            <p className="note">Upload documents here to make them visible on the public /download page.</p>
            
            <div className="upload-box">
                <input 
                    type="file" 
                    id="file-input"
                    onChange={handleFileChange} 
                    className="file-input"
                    disabled={isUploading}
                />
                
                <button 
                    onClick={handleUpload} 
                    disabled={!selectedFile || isUploading}
                    className={`upload-btn ${isUploading ? 'uploading' : ''}`}
                >
                    {isUploading ? 'Uploading...' : 'Upload Document'}
                </button>
            </div>
            
            {uploadMessage.text && (
                <div className={`message ${uploadMessage.type}`}>
                    {uploadMessage.text}
                </div>
            )}

            <div className="admin-links">
                <a href="/download" target="_blank" className="view-link">
                    View Public Downloads Page 🔗
                </a>
            </div>
        </div>
    );
};

export default FileUpload;