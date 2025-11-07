import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// --- Admin Upload Component ---
const AdminUploadSection = ({ fetchFiles }) => {
  const [message, setMessage] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem('adminToken');

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    
    if (res.status === 401) {
      setMessage("Session expired or unauthorized. Please log in again.");
      localStorage.removeItem('adminToken');
    } else if (res.ok) {
      setMessage(data.message);
      e.target.value = null;
      fetchFiles();
    } else {
      setMessage(data.error || "File upload failed.");
    }
  };

  return (
    <div style={{ marginBottom: "2rem", border: '1px solid #ccc', padding: '1rem', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
      <h2>📂 Upload File to Download Section (Admin Only)</h2>
      <input type="file" onChange={handleFileUpload} />
      {message && <p style={{ color: message.includes("successfully") ? 'green' : 'red', marginTop: '10px' }}>{message}</p>}
    </div>
  );
};
// --- End Admin Upload Component ---

export default function Download() {
  const [files, setFiles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('adminToken'));
  const [deleteMessage, setDeleteMessage] = useState('');

  // Checks for admin status on render/token change
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsAdmin(!!token);
    setDeleteMessage(''); 
  }, [localStorage.getItem('adminToken')]);


  // ✅ Fetch files from MongoDB
  const fetchFiles = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/files");
      const data = await res.json();
      setFiles(data);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  // 🗑️ DELETE HANDLER
  const handleDelete = async (fileId, fileName) => {
    if (!window.confirm(`Are you sure you want to delete the file: ${fileName}?`)) {
      return;
    }

    const token = localStorage.getItem('adminToken');
    setDeleteMessage(`Deleting ${fileName}...`);

    try {
      const res = await fetch(`http://localhost:5000/api/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setDeleteMessage(`✅ ${data.message}: ${fileName}`);
        fetchFiles(); // Refresh file list
      } else if (res.status === 401) {
        setDeleteMessage("❌ Access Denied: Admin session expired. Please log in.");
        localStorage.removeItem('adminToken');
        setIsAdmin(false);
      } else {
        setDeleteMessage(`❌ Failed to delete: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      setDeleteMessage(`❌ Network error while deleting file.`);
    }
    // Clear the message after 5 seconds
    setTimeout(() => setDeleteMessage(''), 5000);
  };

  // ✅ Load files on first render
  useEffect(() => {
    fetchFiles();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    setDeleteMessage('Admin logged out.');
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📁 Download Section</h1>
      
      {/* ⚠️ ADMIN-ONLY SECTION RENDER */}
      {isAdmin ? (
        <>
          <AdminUploadSection fetchFiles={fetchFiles} />
          <button onClick={handleLogout} style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '1rem' }}>Admin Logout</button>
        </>
      ) : (
        <div style={{ padding: '1rem', backgroundColor: '#ffe0b2', border: '1px solid #ff9800', borderRadius: '4px', marginBottom: '2rem' }}>
          <p>Only an administrator can upload new documents.</p>
          <Link to="/admin/login" style={{ color: '#8d0000', fontWeight: 'bold' }}>Click here to login as Admin</Link>
        </div>
      )}

      {deleteMessage && (
         <p style={{ color: deleteMessage.includes("✅") ? 'green' : 'red', marginBottom: '1rem' }}>
           {deleteMessage}
         </p>
      )}
      
      {/* List of Files (Publicly visible) */}
      <div style={{ marginTop: "2rem" }}>
        <h2>Uploaded Files</h2>
        {files.length === 0 ? (
          <p>No files uploaded yet.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {files.map((file) => (
              <li key={file._id} style={{ padding: '10px', borderBottom: '1px dotted #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a 
                  href={`http://localhost:5000${file.filepath}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ textDecoration: 'none', color: '#003366', fontWeight: '500' }}
                >
                  📄 {file.filename}
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    Uploaded: {new Date(file.uploadedAt).toLocaleDateString()}
                  </span>
                  {/* 🗑️ DELETE BUTTON (ADMIN ONLY) */}
                  {isAdmin && (
                    <button 
                      onClick={() => handleDelete(file._id, file.filename)} 
                      style={{ 
                        backgroundColor: '#dc3545', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        padding: '5px 10px', 
                        cursor: 'pointer', 
                        fontSize: '0.8rem'
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}