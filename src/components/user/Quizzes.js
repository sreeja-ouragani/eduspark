import React from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './Quizzes.css';


// Quiz Data
const quizData = [
  {
    title: 'Fill the Missing Alphabets',
    icon: 'fa-font',
  },
  {
    title: 'Guess the Starting Letter',
    icon: 'fa-question-circle',
  },
  {
    title: 'Count and Match',
    icon: 'fa-sort-numeric-up',
  },
  {
    title: 'Coloring',
    icon: 'fa-paint-brush',
  },
  {
    title: 'Match the States and Capitals of India',
    icon: 'fa-map-marker-alt',
  },
  {
    title: 'Time Traveler’s Quest',
    icon: 'fa-clock',
  },
  {
    title: 'Seed to Tree Challenge',
    icon: 'fa-leaf',
  },
  {
    title: 'Guess the Animal Sound',
    icon: 'fa-volume-up',
  },
];

const Quizzes = () => {
  return (
    <div className="quiz-app">
    {/* Container to display image and quiz cards */}
    <div className="quiz-layout">
      {/* Image Section */}
      <div className="image-section">
        {/* Add an image here if needed */}
      </div>

        <div className="cards-grid">
          {quizData.map((quiz, index) => (
            <Link
              key={index}
              to={`/quiz/${index}`}
              className="quiz-card"
            >
              <div className="icon-container">
                <i className={`fa ${quiz.icon} fa-3x`} />
              </div>
              <div className="quiz-title">{quiz.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
