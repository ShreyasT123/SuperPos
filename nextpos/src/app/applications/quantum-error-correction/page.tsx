/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"; // Directive for Next.js indicating client-side features

import React, { useState } from "react";
import Head from "next/head"; // Optional: For setting page title

export default function FaultToleranceSimulator() {
  // --- State Variables ---
  const [numQubits, setNumQubits] = useState<number>(3); // Number of physical qubits for the repetition code
  const [errors, setErrors] = useState<number[]>([]); // Array of indices of qubits with injected errors
  const [protocol, setProtocol] = useState<string>("non_ft"); // 'non_ft' or 'ft'
  const [syndromeRounds, setSyndromeRounds] = useState<number>(3); // Number of times syndrome measurement is repeated in FT mode
  const [measurementError, setMeasurementError] = useState<number>(0.0); // Probability of error during measurement

  // Define the structure for the simulation result from the backend
  interface SimulationResult {
    secret: string; // The originally encoded logical bit ('0' or '1')
    ideal_measurement: number[]; // Measurement outcome without errors or FT
    final_measurement: number[]; // Actual measurement outcome after errors/FT process
    syndrome_results?: any; // Optional: Detailed syndrome results if backend provides them
    syndrome_rounds?: number; // Optional: Number of syndrome rounds used in FT mode
    corrected_state: string | null; // Decoded logical state ('0', '1', or null if ambiguous)
    success: boolean; // Whether the decoded state matches the secret
    circuit_text: string; // ASCII representation of the quantum circuit used
    // Add other potential fields from backend if needed
  }

  const [simulationResult, setSimulationResult] =
    useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state for API call
  const [error, setError] = useState<string | null>(null); // Error message state

  // --- Event Handlers ---

  // Toggle whether an error is applied to a specific qubit index
  const toggleError = (qubitIndex: number) => {
    // Prevent changes while loading
    if (isLoading) return;
    setErrors(
      (prevErrors) =>
        prevErrors.includes(qubitIndex)
          ? prevErrors.filter((e) => e !== qubitIndex) // Remove if exists
          : [...prevErrors, qubitIndex] // Add if not exists
    );
    // Clear previous results when parameters change
    setSimulationResult(null);
  };

  // Validate and set number of qubits
  const handleNumQubitsChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 1 && num <= 10) {
      // Limit range for practical simulation
      // Ensure odd number for simple majority voting (can be relaxed for more complex codes)
      if (num % 2 === 0 && num > 1) {
        setError(
          "Number of qubits should ideally be odd for simple majority voting."
        );
      } else {
        setError(null);
      }
      setNumQubits(num);
      setErrors([]); // Reset errors when qubit count changes
      setSimulationResult(null);
    } else if (value === "") {
      setNumQubits(0); // Allow empty input temporarily
    }
  };

  // Update protocol state
  const handleProtocolChange = (value: string) => {
    setProtocol(value);
    setSimulationResult(null);
  };

  // Update syndrome rounds state
  const handleSyndromeRoundsChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 1 && num <= 10) {
      // Sensible limit
      setSyndromeRounds(num);
      setSimulationResult(null);
    } else if (value === "") {
      setSyndromeRounds(0);
    }
  };

  // Update measurement error probability state
  const handleMeasurementErrorChange = (value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0 && num <= 0.5) {
      // Probability range
      setMeasurementError(num);
      setSimulationResult(null);
    } else if (value === "") {
      setMeasurementError(0);
    }
  };

  // --- API Call ---
  const runSimulation = async () => {
    if (numQubits <= 0) {
      setError("Please set a valid number of qubits (e.g., 3 or more).");
      return;
    }
    if (protocol === "ft" && syndromeRounds <= 0) {
      setError("Please set a valid number of syndrome rounds for FT protocol.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSimulationResult(null); // Clear previous results

    try {
      const response = await fetch(
        "http://localhost:8000/superpos/run_fault_tolerance/",
        {
          // Ensure backend is running
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            num_qubits: numQubits, // Match backend expected key
            errors: errors,
            protocol: protocol,
            syndrome_rounds: syndromeRounds, // Match backend expected key
            measurement_error_prob: measurementError, // Match backend expected key
          }),
        }
      );

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (parseError) {
          /* Ignore */
        }
        throw new Error(
          errorData?.detail || `HTTP error! Status: ${response.status}`
        );
      }

      const data: SimulationResult = await response.json();
      setSimulationResult(data);
      // console.log("Simulation Result:", data); // Keep for debugging
    } catch (err: any) {
      console.error("Simulation API Error:", err);
      setError(
        err.message || "Failed to run simulation. Check backend connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render Component ---
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-6">
      {/* Optional: Set page title */}
      <Head>
        <title>Quantum Fault Tolerance Simulator</title>
      </Head>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
          Quantum Fault Tolerance Simulation 
        </h1>

        {/* Explanatory Text Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-md border border-gray-700">
          <h2 className="text-xl font-semibold text-teal-400 mb-3">
            Simulation Overview
          </h2>
          <p className="mb-3">
            This demonstration simulates fault tolerance in quantum circuits
            using a simple{" "}
            <strong className="text-yellow-400">repetition code</strong> (e.g.,
            encoding logical{" "}
            <code className="text-green-400 bg-gray-700 px-1 rounded">|0⟩</code>{" "}
            as{" "}
            <code className="text-green-400 bg-gray-700 px-1 rounded">
              |000⟩
            </code>{" "}
            and logical{" "}
            <code className="text-green-400 bg-gray-700 px-1 rounded">|1⟩</code>{" "}
            as{" "}
            <code className="text-green-400 bg-gray-700 px-1 rounded">
              |111⟩
            </code>
            ). It allows you to explore how errors affect quantum states and how
            fault-tolerant techniques attempt to mitigate them.
          </p>
          <h3 className="text-lg font-semibold text-gray-100 mt-4 mb-2">
            Key Concepts Illustrated:
          </h3>
          <ul className="list-disc list-inside space-y-1 pl-4 mb-3">
            <li>
              <strong className="text-cyan-400">Error Injection:</strong> You
              can manually introduce bit-flip (X) errors on specific physical
              qubits before measurement or processing.
            </li>
            <li>
              <strong className="text-cyan-400">
                Non-Fault-Tolerant (Non-FT) Mode:
              </strong>{" "}
              Simulates a basic scenario where the physical qubits encoding the
              logical state are measured directly. Errors present during
              measurement directly corrupt the result.
            </li>
            <li>
              <strong className="text-cyan-400">
                Fault-Tolerant (FT) Mode:
              </strong>{" "}
              Simulates a more robust approach involving:
              <ul className="list-circle list-inside pl-6 mt-1">
                <li>
                  <strong className="text-yellow-400">
                    Syndrome Measurement:
                  </strong>{" "}
                  Repeatedly measures parity information (syndromes) using
                  ancilla qubits without directly measuring the data qubits.
                  This helps identify errors.
                </li>
                <li>
                  <strong className="text-yellow-400">
                    Noisy Measurements:
                  </strong>{" "}
                  Allows simulating errors occurring during the syndrome
                  measurement process itself.
                </li>
                <li>
                  <strong className="text-yellow-400">Decoding:</strong> Uses a
                  classical{" "}
                  <strong className="text-lime-300">majority-vote</strong>{" "}
                  strategy based on the (potentially noisy) syndrome
                  measurements to infer the most likely error pattern.
                </li>
              </ul>
            </li>
            <li>
              <strong className="text-cyan-400">
                Correction & Verification:
              </strong>{" "}
              After measurement (direct or via FT syndrome decoding), classical
              post-processing applies corrections based on the inferred errors
              (or majority vote). The final decoded logical bit is compared to
              the originally encoded secret bit to determine if the correction
              was successful.
            </li>
          </ul>
          <p className="italic text-gray-500 text-sm">
            Note: This is a simplified simulation focusing on bit-flips and
            measurement errors with a repetition code. Real-world QEC involves
            more complex codes (like surface codes) handling both bit and phase
            flips, and errors during gate operations.
          </p>
        </div>

        {/* Configuration Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-md border border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Qubits, Errors, Protocol */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-3">
              Configuration
            </h3>
            <div className="mb-4">
              <label
                htmlFor="num-qubits"
                className="block text-sm font-medium mb-1"
              >
                Number of Physical Qubits (e.g., 3, 5):
              </label>
              <input
                id="num-qubits"
                type="number"
                min="1"
                max="9" // Keep reasonable for display/simulation
                step="2" // Encourage odd numbers for simple majority vote
                value={numQubits}
                onChange={(e) => handleNumQubitsChange(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-200 focus:ring-teal-500 focus:border-teal-500"
                disabled={isLoading}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Inject Bit-Flip Errors on Qubits:
              </label>
              <div className={`grid grid-cols-${Math.min(numQubits, 5)} gap-2`}>
                {" "}
                {/* Adjust grid columns */}
                {[...Array(numQubits).keys()].map((i) => (
                  <button
                    key={i}
                    onClick={() => toggleError(i)}
                    disabled={isLoading}
                    className={`px-3 py-1 border rounded text-sm transition duration-200 ${
                      errors.includes(i)
                        ? "bg-red-600 hover:bg-red-700 text-white border-red-500"
                        : "bg-gray-600 hover:bg-gray-500 text-gray-200 border-gray-500"
                    }`}
                  >
                    Q{i} {errors.includes(i) ? " (X)" : ""}
                  </button>
                ))}
              </div>
              {numQubits <= 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  Set number of qubits to enable error selection.
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="protocol-select"
                className="block text-sm font-medium mb-1"
              >
                Protocol:
              </label>
              <select
                id="protocol-select"
                value={protocol}
                onChange={(e) => handleProtocolChange(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-200 focus:ring-teal-500 focus:border-teal-500"
                disabled={isLoading}
              >
                <option value="non_ft">
                  Non-Fault Tolerant (Direct Measurement)
                </option>
                <option value="ft">
                  Fault Tolerant (Syndrome Measurement)
                </option>
              </select>
            </div>
          </div>

          {/* Column 2: FT Parameters */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-3 opacity-0 md:opacity-100">
              {" "}
              {/* Hidden title for spacing */}
              Fault-Tolerant Parameters
            </h3>
            {protocol === "ft" && (
              <div className="space-y-4 p-4 border border-dashed border-gray-600 rounded bg-gray-850">
                <h4 className="text-md font-semibold text-yellow-400 -mt-1">
                  FT Settings:
                </h4>
                <div>
                  <label
                    htmlFor="syndrome-rounds"
                    className="block text-sm font-medium mb-1"
                  >
                    Syndrome Measurement Rounds:
                  </label>
                  <input
                    id="syndrome-rounds"
                    type="number"
                    min="1"
                    max="10"
                    value={syndromeRounds}
                    onChange={(e) => handleSyndromeRoundsChange(e.target.value)}
                    className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-200 focus:ring-teal-500 focus:border-teal-500"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label
                    htmlFor="meas-error"
                    className="block text-sm font-medium mb-1"
                  >
                    Measurement Error Probability (0.0 to 0.5):
                  </label>
                  <input
                    id="meas-error"
                    type="number"
                    min="0"
                    max="0.5"
                    step="0.01"
                    value={measurementError}
                    onChange={(e) =>
                      handleMeasurementErrorChange(e.target.value)
                    }
                    className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-200 focus:ring-teal-500 focus:border-teal-500"
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}
            {protocol !== "ft" && (
              <div className="text-center text-gray-500 italic p-4 border border-dashed border-gray-700 rounded h-full flex items-center justify-center">
                FT parameters appear here when selected.
              </div>
            )}
          </div>
        </div>

        {/* Action Button & Status */}
        <div className="text-center my-6">
          {error && (
            <p className="text-center text-red-400 mb-4 bg-red-900/50 p-3 rounded border border-red-500">
              {error}
            </p>
          )}
          <button
            onClick={runSimulation}
            disabled={isLoading || numQubits <= 0}
            className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-md disabled:cursor-not-allowed"
          >
            {isLoading ? "Simulating..." : "Run Simulation"}
          </button>
          {isLoading && (
            <p className="text-sm text-yellow-400 mt-2">
              Simulation running...
            </p>
          )}
        </div>

        {/* Results Display */}
        {simulationResult && !isLoading && (
          <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-center text-teal-400 mb-5">
              Simulation Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-sm">
              <div className="space-y-2 bg-gray-900 p-4 rounded border border-gray-600">
                <p>
                  <strong className="text-gray-100">Encoded Secret Bit:</strong>{" "}
                  <span className="font-mono text-lime-300">
                    {simulationResult.secret}
                  </span>
                </p>
                <p>
                  <strong className="text-gray-100">
                    Injected Errors (Qubit Indices):
                  </strong>{" "}
                  <span className="font-mono text-red-400">
                    {errors.length > 0 ? errors.join(", ") : "None"}
                  </span>
                </p>
                <p>
                  <strong className="text-gray-100">Protocol Used:</strong>{" "}
                  <span className="font-mono text-cyan-300">
                    {protocol === "ft"
                      ? "Fault Tolerant"
                      : "Non-Fault Tolerant"}
                  </span>
                </p>
                {protocol === "ft" && (
                  <>
                    <p>
                      <strong className="text-gray-100">
                        Syndrome Rounds:
                      </strong>{" "}
                      <span className="font-mono text-yellow-300">
                        {simulationResult.syndrome_rounds ?? syndromeRounds}
                      </span>
                    </p>
                    <p>
                      <strong className="text-gray-100">
                        Measurement Error Prob:
                      </strong>{" "}
                      <span className="font-mono text-yellow-300">
                        {measurementError.toFixed(2)}
                      </span>
                    </p>
                  </>
                )}
              </div>
              <div className="space-y-2 bg-gray-900 p-4 rounded border border-gray-600">
                <p>
                  <strong className="text-gray-100">
                    Ideal Measurement (No Errors):
                  </strong>{" "}
                  <code className="text-gray-400 bg-gray-700 px-1 rounded">
                    {simulationResult.ideal_measurement.join("")}
                  </code>
                </p>
                <p>
                  <strong className="text-gray-100">
                    Actual Final Measurement:
                  </strong>{" "}
                  <code className="text-red-400 bg-gray-700 px-1 rounded">
                    {simulationResult.final_measurement.join("")}
                  </code>
                </p>
                <p>
                  <strong className="text-gray-100">
                    Decoded/Corrected State:
                  </strong>
                  <code
                    className={`font-mono px-1 rounded ml-1 ${
                      simulationResult.corrected_state !== null
                        ? "text-lime-300 bg-gray-700"
                        : "text-gray-500 bg-gray-700"
                    }`}
                  >
                    {simulationResult.corrected_state !== null
                      ? simulationResult.corrected_state
                      : "N/A"}
                  </code>
                  {simulationResult.corrected_state === null && (
                    <span className="text-xs text-gray-500">
                      {" "}
                      (Could not determine majority)
                    </span>
                  )}
                </p>
                <p>
                  <strong className="text-gray-100">
                    Correction Successful?
                  </strong>
                  <span
                    className={`ml-2 font-bold ${
                      simulationResult.success
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {simulationResult.success ? "Yes ✔" : "No ✘"}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-100 mb-2">
                Circuit Representation:
              </p>
              {/* Use <pre> for preserving formatting, add overflow-auto for scrolling */}
              <pre className="bg-gray-950 p-4 border border-gray-600 rounded overflow-auto text-xs font-mono">
                {simulationResult.circuit_text ||
                  "Circuit diagram not available."}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
