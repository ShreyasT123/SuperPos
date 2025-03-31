
"use client";
import { useState } from "react";

export default function FaultToleranceSimulator() {
    const [numQubits, setNumQubits] = useState(3);
    const [errors, setErrors] = useState<number[]>([]);
    const [protocol, setProtocol] = useState("non_ft");
    const [syndromeRounds, setSyndromeRounds] = useState(3);
    const [measurementError, setMeasurementError] = useState(0.0);
    interface SimulationResult {
        secret: string;
        ideal_measurement: number[];
        final_measurement: number[];
        syndromeRounds: number;
        corrected_state: string | null;
        success: boolean;
        circuit_text: string;
    }

    const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

    const toggleError = (qubit: number) => {
        setErrors((prevErrors) =>
            prevErrors.includes(qubit)
                ? prevErrors.filter((e) => e !== qubit)
                : [...prevErrors, qubit]
        );
    };

    const runSimulation = async () => {
        const response = await fetch("http://localhost:8000/superpos/run_fault_tolerance/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ numQubits, errors, protocol, syndromeRounds, measurementError }),
        });
        const data = await response.json();
        setSimulationResult(data);
        console.log(data);
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-xl font-bold">Quantum Fault Tolerance Simulation</h1>
            <label className="block mt-4">Number of Qubits:</label>
            <input
                type="number"
                min="1"
                max="10"
                value={numQubits}
                onChange={(e) => setNumQubits(parseInt(e.target.value))}
                className="border p-2 w-full"
            />
            <label className="block mt-4">Errors on Qubits:</label>
            <div className="grid grid-cols-5 gap-2">
                {[...Array(numQubits).keys()].map((i) => (
                    <button
                        key={i}
                        onClick={() => toggleError(i)}
                        className={`px-4 py-2 border rounded ${errors.includes(i) ? 'bg-red-500 text-white' : 'bg-gray-200 text-black' }`}
                    >
                        Q{i}
                    </button>
                ))}
            </div>
            <label className="block mt-4">Fault Tolerance Protocol:</label>
            <select
                value={protocol}
                onChange={(e) => setProtocol(e.target.value)}
                className="border p-2 w-full"
            >
                <option value="non_ft">Non Fault Tolerant</option>
                <option value="ft">Fault Tolerant</option>
            </select>
            {protocol === "ft" && (
                <>
                    <label className="block mt-4">Syndrome Rounds:</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={syndromeRounds}
                        onChange={(e) => setSyndromeRounds(parseInt(e.target.value))}
                        className="border p-2 w-full"
                    />
                    <label className="block mt-4">Measurement Error Probability:</label>
                    <input
                        type="number"
                        min="0"
                        max="0.5"
                        step="0.01"
                        value={measurementError}
                        onChange={(e) => setMeasurementError(parseFloat(e.target.value))}
                        className="border p-2 w-full"
                    />
                </>
            )}
            <button onClick={runSimulation} className="bg-blue-500 text-white">Run Simulation</button>
            {simulationResult && (
                <div className="mt-4 p-2 h-200 w-800 border rounded bg-gray-100 text-black">
                    <p><strong>Simulation Result:</strong></p>
                    <p>Secret: {simulationResult.secret}</p>
                    <p>Ideal Measurement: {simulationResult.ideal_measurement.join(", ")}</p>
                    <p>Final Measurement: {simulationResult.final_measurement.join(", ")}</p>
                    <p>Syndrome Rounds: {simulationResult.syndromeRounds}</p>
                    <p>Corrected State: {simulationResult.corrected_state !== null ? simulationResult.corrected_state : "Ambiguous"}</p>
                    <p>Success: {simulationResult.success ? "Yes" : "No"}</p>
                    <p><strong>Circuit Representation:</strong></p>
                    <pre className="bg-white p-2 border rounded overflow-auto">{simulationResult.circuit_text}</pre>
                </div>
            )}
        </div>
    );
}
