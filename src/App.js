import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Layout for navigation and sidebar
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage'; // Replace with your actual home component path
import Lessons from './components/user/Lessons'; // User Lessons
import Quizzes from './components/user/Quizzes'; // User Quizzes
import AdminLessons from './components/admin/Lessons'; // Admin Lessons
import AdminQuizzes from './components/admin/Quizzes'; // Admin Quizzes
import UsersDashboard from './components/admin/UsersDashboard'; // Admin Dashboard
import UploadForm from './components/admin/UploadForm'; // Import the UploadForm component from admin folder

// New imports for quiz pages
import QuizPage from './components/user/QuizPage'; // New page for quiz content
import MatchingQuiz from './components/user/MatchingQuiz'; // Matching type quiz
import FillBlankQuiz from './components/user/FillBlankQuiz'; // Fill in the blank quiz

import './components/LoginPage.css';
import './App.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false); // State to toggle between Admin and User

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<LoginPage setIsAdmin={setIsAdmin} />} />
          
          {/* Admin Layout (Admin Routes) */}
          {isAdmin && (
            <Route path="/*" element={<Layout isAdmin={isAdmin} />}>
              <Route path="home" element={<HomePage />} />
              <Route path="lessons" element={<AdminLessons />} />
              <Route path="quizzes" element={<AdminQuizzes />} />
              <Route path="usersdashboard" element={<UsersDashboard />} />
              <Route path="upload" element={<UploadForm />} />
            </Route>
          )}
          
          {/* User Layout (User Routes) */}
          {!isAdmin && (
            <Route path="/*" element={<Layout isAdmin={isAdmin} />}>
              <Route path="home" element={<HomePage />} />
              <Route path="lessons" element={<Lessons />} />
              <Route path="quizzes" element={<Quizzes />} />
              <Route path="quiz/:quizId" element={<QuizPage />} />
              <Route path="quiz/match" element={<MatchingQuiz />} />
              <Route path="quiz/fillblank" element={<FillBlankQuiz />} />
            </Route>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
