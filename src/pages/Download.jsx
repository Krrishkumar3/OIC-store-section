import React, { useState, useEffect } from 'react';
// Assuming the CSS file is named Download.css or similar
import './Download.css'; 

const API_BASE_URL = 'https://oic-store-backend.onrender.com'; 

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
                            {/* DETAILS SECTION: Fixed alignment for text */}
                            <div className="document-details"> 
                                <strong>{file.filename}</strong>
                                <small>Uploaded: {new Date(file.uploadedAt).toLocaleDateString()}</small>
                            </div>
                            
                            {/* BUTTONS SECTION: Aligned to the right */}
                            <div className="document-actions">
                                {/* VIEW BUTTON: Opens file in a new tab */}
                                <a 
                                    href={`${API_BASE_URL}${file.filepath}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="action-btn view-btn" // Added view-btn class
                                >
                                    View
                                </a>
                                
                                {/* DOWNLOAD BUTTON: Uses the 'download' attribute to prompt a file save */}
                                <a 
                                    href={`${API_BASE_URL}${file.filepath}`} 
                                    download={file.filename} // Prompts the browser to download the file with its original name
                                    className="action-btn download-btn" // Added download-btn class
                                >
                                    Download
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Download;