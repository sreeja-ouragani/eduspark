import React, { useState, useEffect } from "react";
import axios from "axios";
import './Lessons.css';

const Lessons = () => {
  const [videos, setVideos] = useState([]);
  const [folder, setFolder] = useState(""); // Default to no folder selected
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [videoUrl, setVideoUrl] = useState(''); // State to store the fetched video URL

  // Folder list for clickable options
  const folderList = [
    { name: "TELUGU", value: "telugu" },
    { name: "HINDI", value: "hindi" },
    { name: "ENGLISH", value: "english" },
    { name: "MATHS", value: "maths" },
    { name: "GENERAL KNOWLEDGE", value: "general-knowledge" },
  ];

  // Fetch videos whenever the folder changes
  useEffect(() => {
    if (!folder) return; // Don't fetch if no folder is selected
    const fetchVideos = async () => {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors
      try {
        const response = await axios.get(`http://localhost:5000/videos/${folder}`);
        setVideos(response.data.videos || []); // Handle case where no videos are returned
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Failed to fetch videos. Please try again."); // Set error message
      }
      setLoading(false); // End loading
    };

    fetchVideos();
  }, [folder]);

  // Handle folder click to set the folder state
  const handleFolderClick = (folderValue) => {
    setFolder(folderValue);
    setVideoUrl(""); // Clear the selected video URL when changing folders
  };

  // Fetch the presigned URL for a video file when clicked
  const handleVideoClick = async (fileName) => {
    setLoading(true); // Show loading state

    try {
      const response = await axios.get(`http://localhost:5000/videos/${folder}/${fileName}`);
      setVideoUrl(response.data.url); // Set the pre-signed URL received from the backend
      setError(''); // Clear any previous error
    } catch (err) {
      console.error('Error fetching video:', err);
      setError('Failed to load video.'); // Show error if fetching the URL fails
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="lessons-container">
      <h2>Lessons</h2>

      {/* Display folder options at the top */}
      <div className="folder-selection">
        <div className="folders">
          {folderList.map((folderItem) => (
            <div
              key={folderItem.value}
              className={`folder-item ${folderItem.value === folder ? 'active' : ''}`}
              onClick={() => handleFolderClick(folderItem.value)}
            >
              {folderItem.name}
            </div>
          ))}
        </div>
      </div>

      {/* Main content layout */}
      {!folder ? (
        <p className="instructions">Choose a folder to explore its lessons.</p>
      ) : (
        <>
          {loading ? (
            <p>Loading videos...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="lessons-grid">
              {/* Left: Video list */}
              <div className="video-list">
                {videos.length > 0 ? (
                  videos.map((fileName, index) => (
                    <div
                      key={index}
                      className="video-item"
                      onClick={() => handleVideoClick(fileName)}
                    >
                      {/* Video thumbnail */}
                      <video controls={false} muted>
                        <source
                          src={`http://localhost:5000/videos/${folder}/${fileName}`}
                          type="video/mp4"
                        />
                      </video>
                      
                      <p>{`Lesson ${index + 1}`}</p>
                    </div>
                  ))
                ) : (
                  <p>No videos available for the selected folder.</p>
                )}
              </div>

              {/* Right: Video player */}
              <div className="video-player">
                {videoUrl ? (
                  <>
                    <video controls>
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    {/* Extract only the filename from the URL */}
                    <p className="video-caption">
                      {`Playing: ${decodeURIComponent(videoUrl.split('?')[0].split('/').pop())}`}
                    </p>
                  </>
                ) : (
                  <p>Select a video to play.</p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Lessons;
