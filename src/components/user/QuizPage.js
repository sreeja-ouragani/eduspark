// src/QuizPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import MatchingQuiz from './MatchingQuiz';
import FillBlankQuiz from './FillBlankQuiz';

const QuizPage = () => {
  const { quizId } = useParams(); // Get the quiz id from the URL

  // Choose quiz type based on quizId
  const renderQuiz = () => {
    if (quizId === '0') {
      return <MatchingQuiz />;
    } else if (quizId === '1') {
      return <FillBlankQuiz />;
    }
    return <div>Quiz not found</div>;
  };

  return (
    <div className="quiz-page">
      <h2>Quiz: {quizId === '0' ? 'Match the Items' : 'Fill in the Blanks'}</h2>
      {renderQuiz()}
    </div>
  );
};

export default QuizPage;
