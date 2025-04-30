/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Directive for Next.js indicating this component uses client-side features (hooks, event handlers)

import React, { useState } from "react";
import Head from "next/head"; // Optional: If you want to set the page title

export default function RSAEncryptionApp() {
  // --- State Variables ---
  const [message, setMessage] = useState(""); // Input message for encryption
  const [keys, setKeys] = useState<{ n: string; e: string } | null>(null); // Generated RSA keys (n: modulus, e: public exponent)
  const [encryptedMessage, setEncryptedMessage] = useState(""); // Result of encryption
  const [decryptedMessage, setDecryptedMessage] = useState(""); // Result of decryption
  // State object for decryption inputs to keep them grouped
  const [decryptInput, setDecryptInput] = useState({
    encryptedMessage: "",
    n: "",
    e: "", // Note: While 'e' isn't strictly needed for basic RSA decryption if 'd' is recalculated, it's included here matching the original code, perhaps for backend validation or Shor's simulation context.
  });
  const [isLoading, setIsLoading] = useState(false); // Optional: For loading indicators
  const [error, setError] = useState<string | null>(null); // Optional: For displaying errors

  // --- API Interaction Functions ---

  const handleApiCall = async (
    url: string,
    options: RequestInit,
    onSuccess: (data: any) => void
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        // Try to parse error message from backend if available
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          // Ignore if response body is not JSON
        }
        throw new Error(
          errorData?.detail || `HTTP error! Status: ${response.status}`
        );
      }
      const data = await response.json();
      onSuccess(data);
    } catch (err: any) {
      console.error("API Error:", err);
      setError(err.message || "An unexpected error occurred.");
      // Clear potentially stale results on error
      if (url.includes("generate")) setKeys(null);
      if (url.includes("encrypt")) setEncryptedMessage("");
      if (url.includes("decrypt")) setDecryptedMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  const generateKeys = () => {
    handleApiCall(
      "http://localhost:8000/superpos/rsa_generate_keys/", // Ensure backend is running at this address
      { method: "POST" },
      (data) => setKeys(data) // { n: "...", e: "..." }
    );
  };

  const encryptMessage = () => {
    if (!keys || !message) {
      setError("Please generate keys and enter a message first.");
      return;
    }
    handleApiCall(
      "http://localhost:8000/superpos/rsa_encrypt/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, n: keys.n, e: keys.e }),
      },
      (data) => setEncryptedMessage(data.encrypted_message)
    );
  };

  const decryptMessage = () => {
    if (!decryptInput.encryptedMessage || !decryptInput.n || !decryptInput.e) {
      setError(
        "Please provide the encrypted message, modulus (n), and public exponent (e) for decryption."
      );
      return;
    }
    // console.log("Sending for decryption:", decryptInput); // Keep for debugging if needed
    handleApiCall(
      "http://localhost:8000/superpos/rsa_decrypt/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Sending n and e, backend uses these to simulate Shor's (factor n) and find d
        body: JSON.stringify({
          encrypted_message: decryptInput.encryptedMessage,
          n: decryptInput.n,
          e: decryptInput.e, // Backend might need e to calculate d from factors of n
        }),
      },
      (data) => setDecryptedMessage(data.decrypted_message)
    );
  };

  // --- Render Component ---
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-6">
      {/* Optional: Set page title */}
      <Head>
        <title>RSA Encryption & Shor's Simulation</title>
      </Head>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          RSA Encryption, Decryption & Shor's Algorithm Simulation
        </h1>

        {/* Explanatory Text Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-md border border-gray-700">
          <h2 className="text-xl font-semibold text-cyan-400 mb-3">
            How This Demonstration Works
          </h2>
          <p className="mb-3">
            The demonstration below showcases standard RSA encryption and
            decryption while also illustrating the potential vulnerability of
            RSA to quantum attacks, specifically simulating the core idea behind{" "}
            <strong className="text-yellow-400">Shor’s algorithm</strong>.
          </p>
          <h3 className="text-lg font-semibold text-gray-100 mt-4 mb-2">
            Encryption Process:
          </h3>
          <ul className="list-disc list-inside space-y-1 pl-4 mb-3">
            <li>
              Two large random prime numbers (p and q) are generated on the
              backend to construct the modulus{" "}
              <code className="text-green-400 bg-gray-700 px-1 rounded">
                n = p * q
              </code>
              .
            </li>
            <li>
              Based on this modulus and Euler's totient function φ(n), the
              public exponent (
              <code className="text-green-400 bg-gray-700 px-1 rounded">e</code>
              ) and the private exponent (
              <code className="text-green-400 bg-gray-700 px-1 rounded">d</code>
              ) are derived.
            </li>
            <li>Your input message is segmented into chunks if necessary.</li>
            <li>
              Each chunk is converted into an integer and encrypted using the
              public key (
              <code className="text-green-400 bg-gray-700 px-1 rounded">n</code>
              ,{" "}
              <code className="text-green-400 bg-gray-700 px-1 rounded">e</code>
              ). The formula is{" "}
              <code className="text-green-400 bg-gray-700 px-1 rounded">
                ciphertext = message^e mod n
              </code>
              .
            </li>
            <li>
              The resulting encrypted integers are combined and encoded using{" "}
              <strong className="text-yellow-400">Base64</strong> for a standard
              text representation suitable for transmission.
            </li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-100 mt-4 mb-2">
            Decryption & Shor's Simulation:
          </h3>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>
              To decrypt, you provide the encrypted message, the modulus (
              <code className="text-green-400 bg-gray-700 px-1 rounded">n</code>
              ), and the public exponent (
              <code className="text-green-400 bg-gray-700 px-1 rounded">e</code>
              ).
            </li>
            <li>
              Crucially, the backend{" "}
              <strong className="text-red-400">
                simulates the *effect* of Shor’s quantum algorithm
              </strong>
              . Instead of using a pre-stored private key (
              <code className="text-green-400 bg-gray-700 px-1 rounded">d</code>
              ), it attempts to factorize the provided modulus{" "}
              <code className="text-green-400 bg-gray-700 px-1 rounded">n</code>{" "}
              back into its prime factors (p and q). (Note: This demo uses
              classical factorization for simulation purposes; a real quantum
              computer would use Shor's).
            </li>
            <li>
              Shor's algorithm's power lies in its ability to find these prime
              factors efficiently for large{" "}
              <code className="text-green-400 bg-gray-700 px-1 rounded">n</code>
              , something intractable for classical computers. This
              factorization is the step that breaks RSA.
            </li>
            <li>
              Once the factors (p, q) are found, the backend{" "}
              <strong className="text-yellow-400">
                recomputes the private key
              </strong>{" "}
              (
              <code className="text-green-400 bg-gray-700 px-1 rounded">d</code>
              ) using p, q, and e.
            </li>
            <li>The Base64 encrypted message is decoded.</li>
            <li>
              The ciphertext integers are decrypted using the reconstructed
              private key:{" "}
              <code className="text-green-400 bg-gray-700 px-1 rounded">
                message = ciphertext^d mod n
              </code>
              .
            </li>
            <li>
              The decrypted integers are converted back to the original
              plaintext message.
            </li>
          </ul>
        </div>

        {/* Status Messages */}
        {isLoading && (
          <p className="text-center text-yellow-400 my-4">Processing...</p>
        )}
        {error && (
          <p className="text-center text-red-400 my-4 bg-red-900/50 p-3 rounded border border-red-500">
            {error}
          </p>
        )}

        {/* Main Application Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Encryption Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
            <h2 className="text-2xl font-semibold text-center text-cyan-400 mb-4">
              1. Encryption
            </h2>
            <button
              onClick={generateKeys}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-4 py-2 rounded transition duration-200 mb-4 font-semibold"
            >
              {isLoading ? "Generating..." : "Generate New RSA Keys"}
            </button>
            {keys && (
              <div className="mb-4 p-3 border border-gray-600 rounded bg-gray-900 text-sm">
                <p className="font-semibold text-gray-100 mb-1">
                  Generated Keys:
                </p>
                <p className="break-words">
                  <strong className="text-cyan-300">Modulus (n):</strong>{" "}
                  {keys.n}
                </p>
                <p className="break-words">
                  <strong className="text-cyan-300">Public Exp (e):</strong>{" "}
                  {keys.e}
                </p>
              </div>
            )}
            <label
              htmlFor="encrypt-message"
              className="block text-sm font-medium mb-1"
            >
              Message to Encrypt:
            </label>
            <textarea
              id="encrypt-message"
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-200 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter message..."
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
            />
            <button
              onClick={encryptMessage}
              disabled={!keys || !message || isLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-4 py-2 mt-3 rounded transition duration-200 font-semibold"
            >
              {isLoading ? "Encrypting..." : "Encrypt Message"}
            </button>
            {encryptedMessage && (
              <div className="mt-4 p-3 border border-gray-600 rounded bg-gray-900">
                <p className="font-semibold text-gray-100 mb-1">
                  Encrypted (Base64):
                </p>
                <p className="text-sm break-words text-lime-300">
                  {encryptedMessage}
                </p>
              </div>
            )}
          </div>

          {/* Decryption Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
            <h2 className="text-2xl font-semibold text-center text-cyan-400 mb-4">
              2. Decryption (Simulating Shor's)
            </h2>

            <label
              htmlFor="decrypt-message"
              className="block text-sm font-medium mb-1"
            >
              Encrypted Message (Base64):
            </label>
            <textarea
              id="decrypt-message"
              className="w-full mb-2 p-2 border border-gray-600 rounded bg-gray-700 text-gray-200 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Paste Base64 encrypted message..."
              rows={4}
              value={decryptInput.encryptedMessage}
              onChange={(e) =>
                setDecryptInput({
                  ...decryptInput,
                  encryptedMessage: e.target.value,
                })
              }
              disabled={isLoading}
            />
            <label
              htmlFor="decrypt-n"
              className="block text-sm font-medium mb-1"
            >
              Modulus (n):
            </label>
            <input
              id="decrypt-n"
              type="text" // Keep as text to handle potentially large numbers as strings
              className="w-full mb-2 p-2 border border-gray-600 rounded bg-gray-700 text-gray-200 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter modulus (n) used for encryption"
              value={decryptInput.n}
              onChange={(e) =>
                setDecryptInput({ ...decryptInput, n: e.target.value })
              }
              disabled={isLoading}
            />
            <label
              htmlFor="decrypt-e"
              className="block text-sm font-medium mb-1"
            >
              Public Exponent (e):
            </label>
            <input
              id="decrypt-e"
              type="text" // Keep as text
              className="w-full mb-3 p-2 border border-gray-600 rounded bg-gray-700 text-gray-200 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter public exponent (e) used for encryption"
              value={decryptInput.e}
              onChange={(e) =>
                setDecryptInput({ ...decryptInput, e: e.target.value })
              }
              disabled={isLoading}
            />
            <button
              onClick={decryptMessage}
              disabled={
                !decryptInput.encryptedMessage ||
                !decryptInput.n ||
                !decryptInput.e ||
                isLoading
              }
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white px-4 py-2 rounded transition duration-200 font-semibold"
            >
              {isLoading
                ? "Decrypting..."
                : "Decrypt (via Simulated Factorization)"}
            </button>
            {decryptedMessage && (
              <div className="mt-4 p-3 border border-gray-600 rounded bg-gray-900">
                <p className="font-semibold text-gray-100 mb-1">
                  Decrypted Message:
                </p>
                <p className="text-lime-300">{decryptedMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
