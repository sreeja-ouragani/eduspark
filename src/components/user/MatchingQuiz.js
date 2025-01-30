import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MatchingQuiz.css';

const sampleQuizData = {
  matchQuiz: [
    { question: 'Match the capital of France', options: ['Paris', 'London', 'Berlin', 'Rome'], answer: 'Paris' },
    { question: 'Match the capital of Italy', options: ['Paris', 'London', 'Berlin', 'Rome'], answer: 'Rome' },
    { question: 'Match the capital of Germany', options: ['Paris', 'London', 'Berlin', 'Rome'], answer: 'Berlin' },
    { question: 'Match the capital of England', options: ['Paris', 'London', 'Berlin', 'Rome'], answer: 'London' },
    { question: 'Match the capital of Spain', options: ['Madrid', 'London', 'Berlin', 'Rome'], answer: 'Madrid' },
  ],
};

const MatchingQuiz = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0); // Track score
  const [feedback, setFeedback] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false); // Track if quiz is completed
   // eslint-disable-next-line
  const navigate = useNavigate();

  useEffect(() => {
    if (quizId) {
      setQuizData(sampleQuizData.matchQuiz);
    }
  }, [quizId]);

  if (!quizData) {
    return <div>Loading quiz...</div>;
  }

  const currentQuestion = quizData[currentQuestionIndex];

  const handleOptionClick = (option) => {
    const updatedQuizData = [...quizData];
    updatedQuizData[currentQuestionIndex].userAnswer = option;

    setQuizData(updatedQuizData);

    const correctAnswer = updatedQuizData[currentQuestionIndex].answer;
    if (option === correctAnswer) {
      setFeedback({ message: 'Correct!', isCorrect: true });
      setScore(score + 1); // Increase score for correct answer
    } else {
      setFeedback({ message: 'Incorrect. Try again.', isCorrect: false });
    }

    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setFeedback(null);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">Matching Quiz</h2>
      {quizCompleted ? (
        <div className="congratulations">
          <h2>Congrats!</h2>
          <p>Your score: {score}/{quizData.length}</p>
        </div>
      ) : (
        <div>
          <h3 className="question">{currentQuestion.question}</h3>
          <ul>
            {currentQuestion.options.map((option, idx) => (
              <li
                key={idx}
                className={`option-item ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option)}
                style={{ cursor: 'pointer' }}
              >
                {option}
              </li>
            ))}
          </ul>
          {feedback && <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>{feedback.message}</div>}
          <button onClick={handleNextQuestion} disabled={!currentQuestion.userAnswer}>Next Question</button>
        </div>
      )}
    </div>
  );
};

export default MatchingQuiz;
