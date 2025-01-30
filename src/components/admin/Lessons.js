import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Lessons.css';
import UploadForm from './UploadForm';  // Import the UploadForm component

const LessonsAdmin = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);  // State to control visibility of UploadForm

  const handleAddLessonClick = () => {
    setShowUploadForm(true);  // Show the upload form when the "ADD Lessons" button is clicked
  };

  return (
    <div className="lessons-container">
      <div className="lessons-cards">
        {/* Admin Lesson Cards */}
        <Link to="/lesson/1" className="lesson-card">
          <h3>Lesson 1</h3>
          <p>Intro to Learning</p>
        </Link>
        <Link to="/lesson/2" className="lesson-card">
          <h3>Lesson 2</h3>
          <p>Advanced Topics</p>
        </Link>
        <Link to="/lesson/3" className="lesson-card">
          <h3>Lesson 3</h3>
          <p>Interactive Activities</p>
        </Link>
        {/* Additional Lesson Cards */}
      </div>

      {/* Button to show the Upload Form */}
      <button onClick={handleAddLessonClick}>ADD Lessons</button>

      {/* Conditionally render the UploadForm */}
      {showUploadForm && <UploadForm />}
    </div>
  );
};

export default LessonsAdmin;
