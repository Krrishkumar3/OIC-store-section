import { useState, useEffect } from "react";

export default function Download() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  // ✅ Upload file handler
  const handleFileUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message);
    fetchFiles(); // refresh file list
  };

  // ✅ Fetch files from MongoDB
  const fetchFiles = async () => {
    const res = await fetch("http://localhost:5000/api/files");
    const data = await res.json();
    setFiles(data);
  };

  // ✅ Load files on first render
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2>📂 Upload File to Download Section</h2>

      <input
        type="file"
        onChange={handleFileUpload}
        accept=".pdf,.docx,.jpg,.png"
        style={{ marginTop: "10px" }}
      />
      <p>{message}</p>

      <hr style={{ margin: "20px 0" }} />

      <h3>📜 Uploaded Files</h3>
      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {files.map((file) => (
            <li
              key={file._id}
              style={{
                margin: "10px 0",
                padding: "10px",
                background: "#f8f8f8",
                borderRadius: "8px",
              }}
            >
              <a
                href={`http://localhost:5000${file.filepath}`}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                {file.filename}
              </a>
              <br />
              <small>
                Uploaded:{" "}
                {new Date(file.uploadedAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
