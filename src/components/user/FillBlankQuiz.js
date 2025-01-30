import React, { useState } from 'react';

const FillBlankQuiz = () => {
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0); // Track the score
  const [quizCompleted, setQuizCompleted] = useState(false); // Track if quiz is completed

  const questions = [
    { question: 'The capital of India is __________.', correctAnswer: 'delhi' },
    { question: 'My father\'s brother is my __________.', correctAnswer: 'uncle' },
    { question: 'In Hindi, the word "friend" is __________.', correctAnswer: 'dost' },
    { question: 'The state of Telangana is in __________ India.', correctAnswer: 'south' },
    { question: '5 + 3 = __________.', correctAnswer: '8' },
    { question: 'The capital of Andhra Pradesh is __________.', correctAnswer: 'amaravati' },
    { question: 'In Telugu, the word "hello" is __________.', correctAnswer: 'namaskaram' },
  ];

  const currentQuestion = questions[questionIndex];

  const handleSubmit = () => {
    if (answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()) {
      setCorrect(true);
      setScore(score + 1); // Increase score for correct answer
    } else {
      setCorrect(false);
    }
  };

  const handleNext = () => {
    if (questionIndex === questions.length - 1) {
      setQuizCompleted(true);
    } else {
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setAnswer('');
      setCorrect(null);
    }
  };

  return (
    <div className="fill-blank-quiz">
      <h3>Fill in the blank</h3>
      {quizCompleted ? (
        <div className="congratulations">
          <h2>Congrats!</h2>
          <p>Your score: {score}/{questions.length}</p>
        </div>
      ) : (
        <div>
          <p className="question">{currentQuestion.question}</p>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer"
          />
          <button onClick={handleSubmit}>Submit</button>

          {correct !== null && (
            <div>
              {correct ? (
                <h4 className="correct">Correct! Well done!</h4>
              ) : (
                <h4 className="incorrect">Incorrect. Try again!</h4>
              )}
              <button onClick={handleNext}>Next Question</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FillBlankQuiz;
