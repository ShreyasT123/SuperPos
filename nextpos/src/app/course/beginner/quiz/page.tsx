'use client'
import React, { useState } from 'react';
import Head from 'next/head';

// Quiz Data (Structured from your input)
const quizData = {
  multipleChoice: [
    {
      id: 'mc1',
      question: 'What is the smallest unit of information in quantum computing?',
      options: [
        { id: 'A', text: 'Byte' },
        { id: 'B', text: 'Classical Bit' },
        { id: 'C', text: 'Qubit' },
        { id: 'D', text: 'Quantum Gate' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 'mc2',
      question: 'Which gate is responsible for putting a qubit into superposition?',
      options: [
        { id: 'A', text: 'X Gate' },
        { id: 'B', text: 'Hadamard Gate' },
        { id: 'C', text: 'Z Gate' },
        { id: 'D', text: 'CNOT Gate' },
      ],
      correctAnswer: 'B',
    },
    {
        id: 'mc3',
        question: 'Which of the following states represent a qubit in superposition?',
        options: [
            { id: 'A', text: '|0⟩' },
            { id: 'B', text: '|1⟩' },
            { id: 'C', text: '0.6|0⟩ + 0.8|1⟩' },
            { id: 'D', text: 'None of the above' },
        ],
        correctAnswer: 'C',
    },
    {
        id: 'mc4',
        question: 'Which gate flips the state of a qubit from |0⟩ to |1⟩ or vice versa?',
        options: [
            { id: 'A', text: 'H Gate' },
            { id: 'B', text: 'Z Gate' },
            { id: 'C', text: 'X Gate' },
            { id: 'D', text: 'T Gate' },
        ],
        correctAnswer: 'C',
    },
     {
        id: 'mc5',
        question: 'What does measurement in quantum computing do?',
        options: [
            { id: 'A', text: 'Runs a program' },
            { id: 'B', text: 'Creates entanglement' },
            { id: 'C', text: 'Collapses a qubit to |0⟩ or |1⟩' },
            { id: 'D', text: 'Encrypts the qubit' },
        ],
        correctAnswer: 'C',
    },
  ],
  trueFalse: [
    {
      id: 'tf1',
      question: 'A qubit can only be in one definite state at a time.',
      correctAnswer: false,
    },
    {
      id: 'tf2',
      question: 'Quantum gates are always irreversible.',
      correctAnswer: false,
    },
    {
      id: 'tf3',
      question: 'Classical computers can simulate basic quantum systems with enough resources.',
      correctAnswer: true,
    },
    {
      id: 'tf4',
      question: 'Applying the Hadamard gate twice returns the qubit to its original state.',
      correctAnswer: true, // H * H = I (Identity)
    },
     {
      id: 'tf5',
      question: 'Superposition violates the laws of classical physics.',
      correctAnswer: true, // Classical physics doesn't allow an object to be in multiple states simultaneously in this way.
    },
  ],
};

export default function BeginnerQuizPage() {
  // State to store user answers { questionId: answer }
  const [userAnswers, setUserAnswers] = useState<Record<string, string | boolean>>({});
  // State to track if the quiz results should be shown
  const [showResults, setShowResults] = useState(false);
  // State to store the calculated score
  const [score, setScore] = useState(0);

  const totalQuestions = quizData.multipleChoice.length + quizData.trueFalse.length;

  // Handle changes in radio button selections
  const handleAnswerChange = (questionId: string, answer: string | boolean) => {
    // Don't allow changes after submitting
    if (showResults) return;

    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // Calculate score and show results
  const handleSubmit = () => {
    if (showResults) return; // Prevent re-submission

    let calculatedScore = 0;
    // Check Multiple Choice Answers
    quizData.multipleChoice.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        calculatedScore++;
      }
    });
    // Check True/False Answers
    // Note: Comparing boolean strings/values carefully
    quizData.trueFalse.forEach((q) => {
       const userAnswer = userAnswers[q.id];
       // Convert string 'true'/'false' from radio value to boolean if necessary
       const userAnswerBool = typeof userAnswer === 'string' ? userAnswer === 'true' : userAnswer;
      if (userAnswerBool === q.correctAnswer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setShowResults(true); // Show feedback and results
  };

   // Helper function to get feedback class for options
  const getFeedbackClass = (question: { id: string; question?: string; options?: { id: string; text: string; }[]; correctAnswer: string | boolean; }, optionId: string | boolean) => {
    if (!showResults) return ''; // No feedback before submission

    const userAnswer = userAnswers[question.id];
    const isCorrect = question.correctAnswer === optionId;
    const isSelected = userAnswer === optionId;

    if (isCorrect) {
        return 'border-green-500 ring-2 ring-green-500'; // Highlight correct answer
    }
    if (isSelected && !isCorrect) {
        return 'border-red-500 ring-2 ring-red-500'; // Highlight wrong selected answer
    }
    return 'border-gray-600'; // Default border for unselected/non-correct
  };

   // Helper function for True/False feedback
   const getTFFeedbackClass = (question: { id: string; question?: string; correctAnswer: boolean; }, optionValue: boolean) => {
       if (!showResults) return '';

        const userAnswer = userAnswers[question.id];
        const userAnswerBool = typeof userAnswer === 'string' ? userAnswer === 'true' : userAnswer;
        const isCorrect = question.correctAnswer === optionValue;
        const isSelected = userAnswerBool === optionValue;

        if(isCorrect) {
             return 'border-green-500 ring-2 ring-green-500';
        }
        if(isSelected && !isCorrect) {
            return 'border-red-500 ring-2 ring-red-500';
        }
        return 'border-gray-600';
   }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-300">
      <Head>
        <title>🟢 Beginner Quiz | Quantum Computing Courses</title>
        <meta name="description" content="Test your knowledge of introductory quantum computing concepts, qubits, superposition, and basic quantum gates." />
      </Head>

      {/* Gradient Title */}
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        🟢 Beginner Level Quiz
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Covers: Intro to Quantum Computing, Qubits & Superposition, Quantum Gates
      </p>

      <div className="space-y-10">
        {/* Multiple Choice Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            📘 Multiple Choice Questions
          </h2>
          <div className="space-y-6">
            {quizData.multipleChoice.map((q, index) => (
              <div key={q.id} className="bg-gray-800 p-5 rounded-lg shadow-md">
                <p className="text-lg font-medium mb-3 text-gray-100">
                  {index + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <label
                      key={opt.id}
                      className={`block p-3 rounded border transition-all cursor-pointer ${
                        showResults
                        ? getFeedbackClass(q, opt.id)
                        : 'border-gray-600 hover:bg-gray-700'
                       } ${userAnswers[q.id] === opt.id ? 'bg-gray-700' : ''}`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.id}
                        checked={userAnswers[q.id] === opt.id}
                        onChange={() => handleAnswerChange(q.id, opt.id)}
                        className="mr-3 accent-cyan-500"
                        disabled={showResults} // Disable after submit
                      />
                      <span className="font-mono mr-2 text-cyan-400">{opt.id})</span>
                      {opt.text}
                      {showResults && q.correctAnswer === opt.id && <span className="ml-2 text-green-400 font-bold">(Correct)</span>}
                       {showResults && userAnswers[q.id] === opt.id && q.correctAnswer !== opt.id && <span className="ml-2 text-red-400 font-bold">(Your Answer - Incorrect)</span>}
                    </label>
                  ))}
                </div>
                 {/* Optional: Show correct answer text if user was wrong */}
                 {showResults && userAnswers[q.id] !== q.correctAnswer && (
                    <p className="mt-2 text-sm text-green-400">
                      Correct Answer: {q.correctAnswer}) {q.options.find(o => o.id === q.correctAnswer)?.text}
                    </p>
                 )}
              </div>
            ))}
          </div>
        </section>

        {/* True/False Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            ✅ True/False Questions
          </h2>
          <div className="space-y-6">
            {quizData.trueFalse.map((q, index) => (
              <div key={q.id} className="bg-gray-800 p-5 rounded-lg shadow-md">
                <p className="text-lg font-medium mb-3 text-gray-100">
                  {index + 1}. {q.question}
                </p>
                <div className="flex space-x-4">
                    {/* True Option */}
                     <label
                      className={`flex-1 p-3 rounded border text-center transition-all cursor-pointer ${
                        showResults ? getTFFeedbackClass(q, true) : 'border-gray-600 hover:bg-gray-700'
                      } ${userAnswers[q.id] === true || userAnswers[q.id] === 'true' ? 'bg-gray-700' : ''}`}
                     >
                        <input
                            type="radio"
                            name={q.id}
                            value="true" // Value is string 'true'
                            checked={userAnswers[q.id] === true || userAnswers[q.id] === 'true'}
                            onChange={() => handleAnswerChange(q.id, true)} // Store boolean true
                            className="mr-2 accent-green-500"
                            disabled={showResults}
                        />
                        True
                         {showResults && q.correctAnswer === true && <span className="ml-2 text-green-400 font-bold">(Correct)</span>}
                         {showResults && (userAnswers[q.id] === true || userAnswers[q.id] === 'true') && q.correctAnswer === false && <span className="ml-2 text-red-400 font-bold">(Your Answer - Incorrect)</span>}
                    </label>

                     {/* False Option */}
                    <label
                      className={`flex-1 p-3 rounded border text-center transition-all cursor-pointer ${
                        showResults ? getTFFeedbackClass(q, false) : 'border-gray-600 hover:bg-gray-700'
                      } ${userAnswers[q.id] === false || userAnswers[q.id] === 'false' ? 'bg-gray-700' : ''}`}
                     >
                        <input
                            type="radio"
                            name={q.id}
                            value="false" // Value is string 'false'
                            checked={userAnswers[q.id] === false || userAnswers[q.id] === 'false'}
                            onChange={() => handleAnswerChange(q.id, false)} // Store boolean false
                            className="mr-2 accent-red-500"
                            disabled={showResults}
                        />
                        False
                         {showResults && q.correctAnswer === false && <span className="ml-2 text-green-400 font-bold">(Correct)</span>}
                         {showResults && (userAnswers[q.id] === false || userAnswers[q.id] === 'false') && q.correctAnswer === true && <span className="ml-2 text-red-400 font-bold">(Your Answer - Incorrect)</span>}
                    </label>
                </div>
                 {/* Optional: Show correct answer text if user was wrong */}
                 {showResults && (userAnswers[q.id] === true || userAnswers[q.id] === 'true' ? true : userAnswers[q.id] === false || userAnswers[q.id] === 'false' ? false : undefined) !== q.correctAnswer && (
                     <p className="mt-2 text-sm text-green-400">
                        Correct Answer: {q.correctAnswer ? 'True' : 'False'}
                    </p>
                 )}
              </div>
            ))}
          </div>
        </section>

        {/* Submit Button and Results */}
        <section className="text-center mt-10">
          {!showResults && (
             <button
               onClick={handleSubmit}
               className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-md"
            >
              Check Answers
             </button>
          )}

          {showResults && (
            <div className="mt-6 bg-gray-900 p-6 rounded-lg shadow-xl border border-cyan-500">
              <h3 className="text-2xl font-bold text-cyan-400 mb-3">Quiz Results</h3>
              <p className="text-xl text-white">
                You scored <span className="text-yellow-400 font-bold">{score}</span> out of <span className="text-yellow-400 font-bold">{totalQuestions}</span> correct.
              </p>
              {/* Optional: Add more feedback based on score */}
              {score === totalQuestions && <p className="mt-3 text-green-400">Excellent work! You&apos;ve mastered the basics.</p>}
              {score >= totalQuestions * 0.7 && score < totalQuestions && <p className="mt-3 text-yellow-400">Good job! Solid understanding.</p>}
               {score < totalQuestions * 0.7 && <p className="mt-3 text-red-400">Keep reviewing the beginner material to strengthen your foundation!</p>}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}