"use client";
import React, { useState } from "react";
import Head from "next/head";

const quizData = {
  multipleChoice: [
    {
      id: "mc1",
      question:
        "In Quantum Machine Learning (QML), which encoding method is commonly used to map classical data into quantum states?",
      options: [
        { id: "A", text: "Fourier encoding" },
        { id: "B", text: "Amplitude encoding" },
        { id: "C", text: "Classical mapping" },
        { id: "D", text: "Phase encoding" },
      ],
      correctAnswer: "B",
    },
    {
      id: "mc2",
      question:
        "Which of the following quantum algorithms is best suited for finding optimal solutions to combinatorial problems, such as MaxCut?",
      options: [
        { id: "A", text: "Grover’s Algorithm" },
        { id: "B", text: "Quantum Approximate Optimization Algorithm (QAOA)" },
        { id: "C", text: "Quantum Fourier Transform (QFT)" },
        { id: "D", text: "Shor’s Algorithm" },
      ],
      correctAnswer: "B",
    },
    {
      id: "mc3",
      question:
        "Which cryptographic protocol uses quantum mechanics to enable secure key distribution?",
      options: [
        { id: "A", text: "RSA encryption" },
        { id: "B", text: "Quantum Key Distribution (QKD)" },
        { id: "C", text: "Lattice-based encryption" },
        { id: "D", text: "AES encryption" },
      ],
      correctAnswer: "B",
    },
    {
      id: "mc4",
      question:
        "In Quantum Machine Learning, which concept refers to a hybrid quantum-classical model that optimizes quantum parameters using classical techniques?",
      options: [
        { id: "A", text: "Variational Quantum Circuits (VQC)" },
        { id: "B", text: "Quantum Walk" },
        { id: "C", text: "Grover’s Algorithm" },
        { id: "D", text: "Quantum Key Distribution (QKD)" },
      ],
      correctAnswer: "A",
    },
    {
      id: "mc5",
      question:
        "Which quantum algorithm aims to simulate quantum systems by evolving Hamiltonians over time?",
      options: [
        { id: "A", text: "Quantum Fourier Transform" },
        { id: "B", text: "Trotterization" }, // Trotterization is a TECHNIQUE for Hamiltonian sim, not the algorithm category itself
        { id: "C", text: "Hamiltonian Simulation" },
        { id: "D", text: "HHL Algorithm" },
      ],
      correctAnswer: "C",
    },
    {
      id: "mc6",
      question: "Quantum cryptography guarantees secrecy based on:",
      options: [
        { id: "A", text: "Mathematical difficulty" },
        { id: "B", text: "Classical encryption techniques" },
        { id: "C", text: "The laws of physics" },
        { id: "D", text: "Random number generation" },
      ],
      correctAnswer: "C",
    },
    {
      id: "mc7",
      question:
        "Which quantum algorithm can be used to solve systems of linear equations exponentially faster than classical methods (under ideal conditions)?", // Added clarification
      options: [
        { id: "A", text: "Quantum Fourier Transform" },
        { id: "B", text: "HHL Algorithm" },
        { id: "C", text: "Quantum Walk" },
        { id: "D", text: "Quantum Approximate Optimization Algorithm (QAOA)" },
      ],
      correctAnswer: "B",
    },
    {
      id: "mc8",
      // Rephrased slightly for clarity
      question:
        "In Quantum Machine Learning, how do quantum kernels primarily offer potential enhancement?",
      options: [
        // Rephrased option A to be more specific to kernels
        {
          id: "A",
          text: "By mapping data to high-dimensional quantum feature spaces for better pattern recognition (e.g., in QSVM)",
        },
        {
          id: "B",
          text: "By improving the accuracy of quantum chemistry simulations",
        },
        {
          id: "C",
          text: "By directly strengthening classical cryptographic keys",
        },
        { id: "D", text: "By reducing the decoherence time of qubits" },
      ],
      // Assuming the original intent was about feature mapping
      correctAnswer: "A",
    },
    {
      id: "mc9",
      question:
        "The BB84 protocol in quantum cryptography helps detect eavesdropping primarily by leveraging:",
      options: [
        { id: "A", text: "Pre-shared secret keys for authentication" },
        {
          id: "B",
          text: "The disturbance caused by measuring unknown quantum states",
        },
        {
          id: "C",
          text: "Complex classical algorithms immune to quantum attacks",
        },
        {
          id: "D",
          text: "Rapidly changing encryption algorithms during transmission",
        },
      ],
      correctAnswer: "B", // More precise mechanism than original option
    },
    {
      id: "mc10",
      question:
        "The structure and training process of Variational Quantum Circuits (VQCs) in Quantum Machine Learning share similarities with:",
      options: [
        {
          id: "A",
          text: "Classical neural networks (parameterized layers + optimization)",
        },
        { id: "B", text: "Quantum Key Distribution protocols" },
        { id: "C", text: "Shor’s algorithm for factorization" },
        { id: "D", text: "Quantum phase estimation subroutines" },
      ],
      correctAnswer: "A",
    },
  ],
  trueFalse: [
    {
      id: "tf1",
      question:
        "Quantum Machine Learning (QML) explores using quantum computing principles to potentially enhance classical machine learning tasks.", // Slightly rephrased
      correctAnswer: true,
    },
    {
      id: "tf2",
      question:
        "Ideal Quantum Key Distribution (QKD) protocols offer security based on physics, making them theoretically secure against any eavesdropper, regardless of computational power.", // Added "Ideal" qualifier
      correctAnswer: true,
    },
    {
      id: "tf3",
      // Clarified the type of speedup for Quantum Walks
      question:
        "Quantum Walks can offer polynomial speedups (sometimes quadratic) over classical random walks for certain graph-based problems.",
      correctAnswer: true, // Original answer was True, maintaining it with clarification.
    },
    {
      id: "tf4",
      question:
        "The Quantum Approximate Optimization Algorithm (QAOA) guarantees finding the absolute optimal solution for all combinatorial optimization problems.",
      correctAnswer: false, // It's approximate.
    },
    {
      id: "tf5",
      question:
        "Hamiltonian simulation algorithms are crucial for modeling the time evolution of quantum systems in fields like chemistry and materials science.",
      correctAnswer: true,
    },
    {
      id: "tf6",
      // Rephrased for clarity
      question:
        "Encoding classical data into quantum states for QML requires specific transformation techniques; it's not just a direct mapping.",
      correctAnswer: true, // Original answer was False, but encoding IS a transformation. Corrected based on likely intent. If intent was "doesn't lose info", that's different.
    },
    {
      id: "tf7",
      // Added important qualifiers
      question:
        "The HHL algorithm provides an exponential speedup for solving linear systems, but its practical advantage depends on specific conditions like matrix sparsity and efficient state preparation/readout.",
      correctAnswer: false, // Original was False, keeping it due to the stringent conditions needed for practical advantage.
    },
    {
      id: "tf8",
      question:
        "Quantum Key Distribution (QKD) relies on quantum mechanics principles, ensuring its theoretical security even against attacks using quantum computers.",
      correctAnswer: true,
    },
    {
      id: "tf9",
      // Rephrased
      question:
        "Training Variational Quantum Circuits (VQCs) in QML typically requires classical optimization algorithms to update the circuit parameters.",
      correctAnswer: true, // Original was False, corrected as classical optimizers ARE needed.
    },
    {
      id: "tf10",
      question:
        "QAOA is a hybrid quantum-classical algorithm primarily designed for tackling combinatorial optimization problems like MaxCut.",
      correctAnswer: true,
    },
  ],
};

export default function AdvancedQuizPage() {
  // State to store user answers { questionId: answer }
  const [userAnswers, setUserAnswers] = useState<{
    [key: string]: string | boolean;
  }>({}); // Explicit type
  // State to track if the quiz results should be shown
  const [showResults, setShowResults] = useState(false);
  // State to store the calculated score
  const [score, setScore] = useState(0);

  const totalQuestions =
    quizData.multipleChoice.length + quizData.trueFalse.length;

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
      // Convert string 'true'/'false' from radio value to boolean if necessary for comparison
      const userAnswerBool =
        typeof userAnswer === "string" ? userAnswer === "true" : userAnswer;
      if (userAnswerBool === q.correctAnswer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setShowResults(true); // Show feedback and results
  };

  // Helper function to get feedback class for options
  const getFeedbackClass = (
    question: (typeof quizData.multipleChoice)[0],
    optionId: string
  ): string => {
    if (!showResults) return ""; // No feedback before submission

    const userAnswer = userAnswers[question.id];
    const isCorrect = question.correctAnswer === optionId;
    const isSelected = userAnswer === optionId;

    if (isCorrect) {
      return "border-green-500 ring-2 ring-green-500"; // Highlight correct answer
    }
    if (isSelected && !isCorrect) {
      return "border-red-500 ring-2 ring-red-500"; // Highlight wrong selected answer
    }
    return "border-gray-600"; // Default border for unselected/non-correct
  };

  // Helper function for True/False feedback
  const getTFFeedbackClass = (
    question: (typeof quizData.trueFalse)[0],
    optionValue: boolean
  ): string => {
    if (!showResults) return "";

    const userAnswer = userAnswers[question.id];
    const userAnswerBool =
      typeof userAnswer === "string" ? userAnswer === "true" : userAnswer;
    const isCorrect = question.correctAnswer === optionValue;
    const isSelected = userAnswerBool === optionValue;

    if (isCorrect) {
      return "border-green-500 ring-2 ring-green-500";
    }
    if (isSelected && !isCorrect) {
      return "border-red-500 ring-2 ring-red-500";
    }
    return "border-gray-600";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-300">
      <Head>
        <title>
          Advanced Quantum Concepts Quiz | Quantum Computing Courses
        </title>
        <meta
          name="description"
          content="Test your knowledge of advanced quantum computing topics: Quantum Machine Learning (QML), Quantum Cryptography (QKD), and Advanced Algorithms (QPE, HHL, VQE, QAOA)."
        />
      </Head>

      {/* Gradient Title - Using Red/Orange */}
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
        Advanced Quantum Concepts Quiz
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Covers: Quantum Machine Learning, Quantum Cryptography, Advanced
        Algorithms
      </p>

      <div className="space-y-10">
        {/* Section A: Multiple Choice */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            Section A: Multiple Choice Questions
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
                          : "border-gray-600 hover:bg-gray-700"
                      } ${userAnswers[q.id] === opt.id ? "bg-gray-700" : ""}`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.id}
                        checked={userAnswers[q.id] === opt.id}
                        onChange={() => handleAnswerChange(q.id, opt.id)}
                        className="mr-3 accent-red-500" // Changed accent color
                        disabled={showResults} // Disable after submit
                      />
                      <span className="font-mono mr-2 text-orange-400">
                        {opt.id})
                      </span>{" "}
                      {/* Changed highlight color */}
                      {opt.text}
                      {showResults && q.correctAnswer === opt.id && (
                        <span className="ml-2 text-green-400 font-bold">
                          (Correct)
                        </span>
                      )}
                      {showResults &&
                        userAnswers[q.id] === opt.id &&
                        q.correctAnswer !== opt.id && (
                          <span className="ml-2 text-red-400 font-bold">
                            (Your Answer - Incorrect)
                          </span>
                        )}
                    </label>
                  ))}
                </div>
                {/* Show correct answer text if user was wrong */}
                {showResults && userAnswers[q.id] !== q.correctAnswer && (
                  <p className="mt-2 text-sm text-green-400">
                    Correct Answer: {q.correctAnswer}){" "}
                    {q.options.find((o) => o.id === q.correctAnswer)?.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section B: True/False */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            Section B: True or False
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
                      showResults
                        ? getTFFeedbackClass(q, true)
                        : "border-gray-600 hover:bg-gray-700"
                    } ${
                      userAnswers[q.id] === true || userAnswers[q.id] === "true"
                        ? "bg-gray-700"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value="true" // Value is string 'true'
                      checked={
                        userAnswers[q.id] === true ||
                        userAnswers[q.id] === "true"
                      }
                      onChange={() => handleAnswerChange(q.id, true)} // Store boolean true
                      className="mr-2 accent-green-500"
                      disabled={showResults}
                    />
                    True
                    {showResults && q.correctAnswer === true && (
                      <span className="ml-2 text-green-400 font-bold">
                        (Correct)
                      </span>
                    )}
                    {showResults &&
                      (userAnswers[q.id] === true ||
                        userAnswers[q.id] === "true") &&
                      q.correctAnswer === false && (
                        <span className="ml-2 text-red-400 font-bold">
                          (Your Answer - Incorrect)
                        </span>
                      )}
                  </label>

                  {/* False Option */}
                  <label
                    className={`flex-1 p-3 rounded border text-center transition-all cursor-pointer ${
                      showResults
                        ? getTFFeedbackClass(q, false)
                        : "border-gray-600 hover:bg-gray-700"
                    } ${
                      userAnswers[q.id] === false ||
                      userAnswers[q.id] === "false"
                        ? "bg-gray-700"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value="false" // Value is string 'false'
                      checked={
                        userAnswers[q.id] === false ||
                        userAnswers[q.id] === "false"
                      }
                      onChange={() => handleAnswerChange(q.id, false)} // Store boolean false
                      className="mr-2 accent-red-500"
                      disabled={showResults}
                    />
                    False
                    {showResults && q.correctAnswer === false && (
                      <span className="ml-2 text-green-400 font-bold">
                        (Correct)
                      </span>
                    )}
                    {showResults &&
                      (userAnswers[q.id] === false ||
                        userAnswers[q.id] === "false") &&
                      q.correctAnswer === true && (
                        <span className="ml-2 text-red-400 font-bold">
                          (Your Answer - Incorrect)
                        </span>
                      )}
                  </label>
                </div>
                {/* Show correct answer text if user was wrong */}
                {showResults &&
                  (userAnswers[q.id] === true || userAnswers[q.id] === "true"
                    ? true
                    : userAnswers[q.id] === false ||
                      userAnswers[q.id] === "false"
                    ? false
                    : undefined) !== q.correctAnswer && (
                    <p className="mt-2 text-sm text-green-400">
                      Correct Answer: {q.correctAnswer ? "True" : "False"}
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
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-md" // Changed button color
            >
              Check Answers
            </button>
          )}

          {showResults && (
            <div className="mt-6 bg-gray-900 p-6 rounded-lg shadow-xl border border-red-500">
              {" "}
              {/* Changed border color */}
              <h3 className="text-2xl font-bold text-orange-400 mb-3">
                Quiz Results
              </h3>{" "}
              {/* Changed highlight color */}
              <p className="text-xl text-white">
                You scored{" "}
                <span className="text-yellow-400 font-bold">{score}</span> out
                of{" "}
                <span className="text-yellow-400 font-bold">
                  {totalQuestions}
                </span>{" "}
                correct.
              </p>
              {/* Optional: Add more feedback based on score */}
              {score === totalQuestions && (
                <p className="mt-3 text-green-400">
                  Outstanding! You have a deep understanding of these advanced
                  concepts.
                </p>
              )}
              {score >= totalQuestions * 0.7 && score < totalQuestions && (
                <p className="mt-3 text-yellow-400">
                  Great job! You're well-versed in advanced quantum topics.
                </p>
              )}
              {score < totalQuestions * 0.7 && (
                <p className="mt-3 text-red-400">
                  These topics are challenging. Review the advanced courses to
                  solidify your knowledge!
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
