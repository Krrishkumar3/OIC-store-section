import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; 

const API_BASE_URL = 'https://oic-store-backend.onrender.com';

const AdminDashboard = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    // --- Authentication Check and File Fetch ---
    useEffect(() => {
        // If no token is found in localStorage, redirect to login
        if (!token) {
            navigate('/admin/login');
        } else {
            fetchFiles();
        }
    }, [token, navigate]); // Dependencies trigger useEffect if token changes

    // Fetches all uploaded files (Public API endpoint: /api/files)
    const fetchFiles = async () => {
        setLoading(true);
        try {
            // This API call is usually public for the Download page, but we use it here too.
            const response = await fetch(`${API_BASE_URL}/api/files`);
            if (response.ok) {
                const data = await response.json();
                setFiles(data);
                setMessage({}); // Clear any old errors on successful fetch
            } else {
                setMessage({ type: 'error', text: 'Failed to fetch files from server. Check server console.' });
            }
        } catch (error) {
            // Catch network issues (server not running)
            setMessage({ type: 'error', text: 'Network error during file fetch. Is the backend server running?' });
        } finally {
            setLoading(false);
        }
    };

    // --- Delete File (Admin Protected API: DELETE /api/files/:id) ---
    const handleDelete = async (fileId, filename) => {
        if (!window.confirm(`Are you sure you want to delete "${filename}"? This action is irreversible.`)) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/files/${fileId}`, {
                method: 'DELETE',
                headers: {
                    // CRITICAL: Send the stored JWT token for authorization
                    'Authorization': `Bearer ${token}`, 
                },
            });

            if (response.ok) {
                // Update the UI immediately by filtering out the deleted file
                setFiles(files.filter(file => file._id !== fileId));
                setMessage({ type: 'success', text: `File "${filename}" deleted successfully.` });
            } else {
                const errorData = await response.json();
                setMessage({ type: 'error', text: `Deletion failed: ${errorData.error || 'Check authorization/permissions.'}` });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Network error during file deletion.' });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    // Show loading state if the component is busy fetching data
    if (loading && token) {
        return <div style={{textAlign: 'center', margin: '50px', fontSize: '20px'}}>Loading Admin Dashboard...</div>;
    }

    // --- Main Render ---
    return (
        <div className="admin-dashboard-container">
            <header className="dashboard-header">
                <h2>Admin Document Manager 📂</h2>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </header>

            <div className="admin-controls">
                <button className="upload-link" onClick={() => navigate('/admin/upload')}>
                    + Upload New Document
                </button>
                <a href="/download" target="_blank" className="view-public-link">
                    View Public Page 🔗
                </a>
            </div>

            {/* Display status or error messages */}
            {message.text && (
                <div className={`admin-message ${message.type}`}>
                    {message.text}
                </div>
            )}
            
            <h3 className="list-title">Live Documents ({files.length})</h3>
            <div className="file-admin-list">
                {files.length === 0 ? (
                    <p className="no-files">No documents are currently published.</p>
                ) : (
                    files.map((file) => (
                        <div key={file._id} className="file-admin-item">
                            <div className="file-details">
                                <strong>{file.filename}</strong>
                                <small>
                                    Uploaded: {new Date(file.uploadedAt).toLocaleDateString()}
                                </small>
                            </div>
                            <div className="file-actions">
                                <a 
                                    href={`${API_BASE_URL}${file.filepath}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="action-btn preview-btn"
                                >
                                    Preview
                                </a>
                                <button 
                                    onClick={() => handleDelete(file._id, file.filename)} 
                                    className="action-btn delete-btn"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;