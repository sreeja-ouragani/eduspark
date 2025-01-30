import React, { useState } from "react";
import axios from "axios";
import './UploadForm.css';

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [folder, setFolder] = useState("telugu");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);  // Add error state

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle video upload to S3 (AWS)
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);  // Clear any previous error

    // Create a form data object to send the file to backend
    const formData = new FormData();
    formData.append("video", selectedFile);
    formData.append("folder", folder);

    try {
      // Call backend API to upload the video to S3
      const response = await axios.post('http://localhost:5000/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Include the token in the Authorization header
        },
      });

      if (response.status === 200) {
        alert("Video uploaded successfully!");
        setSelectedFile(null);  // Reset the file input
      }
    } catch (error) {
      console.error("Error uploading video", error);
      setError("Video upload failed! Please try again.");  // Display the error message
    }

    setIsUploading(false);
  };

  return (
    <div className="upload-form-container">
      <h2>Upload Video</h2>
      <form onSubmit={handleUpload}>
        <div className="form-group">
          <label htmlFor="folder">Choose Subject Folder:</label>
          <select
            id="folder"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
          >
            <option value="telugu">Telugu</option>
            <option value="hindi">Hindi</option>
            <option value="english">English</option>
            <option value="maths">Maths</option>
            <option value="general-knowledge">General Knowledge</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="file">Select Video File:</label>
          <input
            type="file"
            id="file"
            accept="video/*"
            onChange={handleFileChange}
          />
        </div>
        {error && <div className="error">{error}</div>}  {/* Display the error message */}
        <button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
