"use client"
import React, { useState } from 'react';
import Head from 'next/head';

// Quiz Data (Structured from your input for Intermediate Level)
const quizData = {
  multipleChoice: [
    {
      id: 'mc1',
      question: 'What is a quantum circuit primarily composed of?',
      options: [
        { id: 'A', text: 'Processors and RAM' },
        { id: 'B', text: 'Wires and logic gates' },
        { id: 'C', text: 'Qubits and quantum gates' },
        { id: 'D', text: 'Registers and flip-flops' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 'mc2',
      question: 'Grover’s algorithm is designed to:',
      options: [
        { id: 'A', text: 'Factor large integers' },
        { id: 'B', text: 'Simulate atoms' },
        { id: 'C', text: 'Search unsorted databases faster' },
        { id: 'D', text: 'Encode classical data' },
      ],
      correctAnswer: 'C',
    },
    {
        id: 'mc3',
        question: 'Which quantum algorithm breaks RSA encryption?',
        options: [
            { id: 'A', text: 'HHL Algorithm' },
            { id: 'B', text: 'Grover’s Algorithm' },
            { id: 'C', text: 'Deutsch-Jozsa' },
            { id: 'D', text: 'Shor’s Algorithm' },
        ],
        correctAnswer: 'D',
    },
    {
        id: 'mc4',
        question: 'What is a key challenge in quantum computing?',
        options: [
            { id: 'A', text: 'Overclocking CPUs' },
            { id: 'B', text: 'Lack of cloud infrastructure' },
            { id: 'C', text: 'Decoherence and noise in qubits' },
            { id: 'D', text: 'Internet connectivity' },
        ],
        correctAnswer: 'C',
    },
     {
        id: 'mc5',
        question: 'What makes quantum error correction different from classical error correction?',
        options: [
            { id: 'A', text: 'It works by copying qubits' },
            { id: 'B', text: 'It uses entangled states to detect and fix errors' },
            { id: 'C', text: 'It resets qubits to zero' },
            { id: 'D', text: 'It ignores minor errors' },
        ],
        correctAnswer: 'B', // This is the most distinct feature related to QEC mechanism (syndrome measurement via ancillas often involves entanglement).
    },
  ],
  trueFalse: [
    {
      id: 'tf1',
      question: 'Quantum circuits must be linear.',
      // Note: Quantum evolution IS linear (described by unitary matrices). The user specified False as correct, so we use that for the quiz.
      correctAnswer: false,
    },
    {
      id: 'tf2',
      question: 'The no-cloning theorem prevents copying unknown quantum states.',
      correctAnswer: true,
    },
    {
      id: 'tf3',
      question: 'Grover’s algorithm provides exponential speedup.',
      correctAnswer: false, // It provides quadratic speedup O(sqrt(N))
    },
    {
      id: 'tf4',
      question: 'Quantum error correction is theoretical and has never been demonstrated.',
      correctAnswer: false, // Basic QEC principles have been demonstrated experimentally.
    },
     {
      id: 'tf5',
      question: 'Measurement collapses a qubit’s wavefunction.',
      correctAnswer: true, // This is a fundamental postulate of quantum measurement.
    },
  ],
};

export default function IntermediateQuizPage() {
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
    quizData.trueFalse.forEach((q) => {
       const userAnswer = userAnswers[q.id];
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
        <title>🟠 Intermediate Quiz | Quantum Computing Courses</title>
        <meta name="description" content="Test your knowledge of quantum circuits, foundational quantum algorithms (Grover's, Shor's), and quantum error correction concepts." />
      </Head>

      {/* Gradient Title - Using Orange/Red */}
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
        🟠 Intermediate Level Quiz
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Covers: Quantum Circuits, Quantum Algorithms, Quantum Error Correction
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
                        className="mr-3 accent-orange-500" // Changed accent color
                        disabled={showResults} // Disable after submit
                      />
                      <span className="font-mono mr-2 text-orange-400">{opt.id})</span> {/* Changed highlight color */}
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
               className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-md" // Changed button color
            >
              Check Answers
             </button>
          )}

          {showResults && (
            <div className="mt-6 bg-gray-900 p-6 rounded-lg shadow-xl border border-orange-500"> {/* Changed border color */}
              <h3 className="text-2xl font-bold text-orange-400 mb-3">Quiz Results</h3> {/* Changed highlight color */}
              <p className="text-xl text-white">
                You scored <span className="text-yellow-400 font-bold">{score}</span> out of <span className="text-yellow-400 font-bold">{totalQuestions}</span> correct.
              </p>
              {/* Optional: Add more feedback based on score */}
              {score === totalQuestions && <p className="mt-3 text-green-400">Excellent! You have a strong grasp of these intermediate topics.</p>}
              {score >= totalQuestions * 0.7 && score < totalQuestions && <p className="mt-3 text-yellow-400">Well done! Keep practicing.</p>}
               {score < totalQuestions * 0.7 && <p className="mt-3 text-red-400">Review the intermediate courses to solidify your understanding.</p>}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}