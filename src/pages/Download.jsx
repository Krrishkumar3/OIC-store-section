import React, { useState, useEffect } from 'react';
import './Download.css';

const API_BASE_URL = 'http://localhost:5000'; // Make sure this is correct

const Download = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/files`);
            if (!response.ok) {
                throw new Error('Failed to fetch files');
            }
            const data = await response.json();
            setFiles(data);
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="download-container"><h2>Loading Downloads...</h2></div>;
    }

    return (
        <div className="download-container">
            <h2>DOWNLOADS & RESOURCES</h2>
            {files.length === 0 ? (
                <div className="no-docs">
                    <p>No documents available at the moment.</p>
                </div>
            ) : (
                <div className="documents-list">
                    {files.map((file) => (
                        <div key={file._id} className="document-item">
                            <div className="document-details">
                                <strong>{file.filename}</strong>
                                <small>Uploaded: {new Date(file.uploadedAt).toLocaleDateString()}</small>
                            </div>
                            {/* The download link uses the relative path saved in the database */}
                            <a 
                                href={`${API_BASE_URL}${file.filepath}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="download-btn"
                            >
                                Download
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Download;