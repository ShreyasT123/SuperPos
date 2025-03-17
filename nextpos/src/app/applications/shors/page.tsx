"use client"
import { useState } from "react";

export default function RSAEncryptionApp() {
    const [message, setMessage] = useState("");
    const [keys, setKeys] = useState(null);
    const [encryptedMessage, setEncryptedMessage] = useState("");
    const [decryptedMessage, setDecryptedMessage] = useState("");
    const [decryptInput, setDecryptInput] = useState({ encryptedMessage: "", n: "", e: "" });
    
    const generateKeys = async () => {
        const response = await fetch("http://localhost:8000/superpos/rsa_generate_keys/", {
            method: "POST",
        });
        const data = await response.json();
        setKeys(data);
    };

    const encryptMessage = async () => {
        if (!keys) return;
        const response = await fetch("http://localhost:8000/superpos/rsa_encrypt/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, n: keys.n, e: keys.e }),
        });
        const data = await response.json();
        setEncryptedMessage(data.encrypted_message);
    };

    const decryptMessage = async () => {
      console.log(decryptInput);
        const response = await fetch("http://localhost:8000/superpos/rsa_decrypt/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(decryptInput),
        });
        const data = await response.json();
        setDecryptedMessage(data.decrypted_message);
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-xl font-bold">RSA Encryption & Decryption</h1>
            
            {/* Encryption Section */}
            <div className="mt-6 p-4 border rounded">
                <h2 className="text-lg font-semibold">Encryption</h2>
                <button onClick={generateKeys} className="bg-blue-500 text-white px-4 py-2 mt-4">Generate RSA Keys</button>
                {keys && (
                    <div className="mt-4 p-2 border rounded">
                        <p><strong>Modulus (n):</strong> {keys.n}</p>
                        <p><strong>Public Exponent (e):</strong> {keys.e}</p>
                    </div>
                )}
                <textarea
                    className="w-full mt-4 p-2 border rounded"
                    placeholder="Enter message to encrypt"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={encryptMessage} className="bg-green-500 text-white px-4 py-2 mt-2">Encrypt</button>
                {encryptedMessage && (
                    <div className="mt-4 p-2 border rounded bg-black">
                        <p><strong>Encrypted (Base64):</strong></p>
                        <p className="break-words">{encryptedMessage}</p>
                    </div>
                )}
            </div>

            {/* Decryption Section */}
            <div className="mt-6 p-4 border rounded">
                <h2 className="text-lg font-semibold">Decryption</h2>
                <input
                    className="w-full mt-2 p-2 border rounded"
                    placeholder="Enter encrypted message"
                    value={decryptInput.encryptedMessage}
                    onChange={(e) => setDecryptInput({ ...decryptInput, encryptedMessage: e.target.value })}
                />
                <input
                    className="w-full mt-2 p-2 border rounded"
                    placeholder="Enter modulus (n)"
                    value={decryptInput.n}
                    onChange={(e) => setDecryptInput({ ...decryptInput, n: e.target.value })}
                />
                <input
                    className="w-full mt-2 p-2 border rounded"
                    placeholder="Enter public exponent (e)"
                    value={decryptInput.e}
                    onChange={(e) => setDecryptInput({ ...decryptInput, e: e.target.value })}
                />
                <button onClick={decryptMessage} className="bg-red-500 text-white px-4 py-2 mt-2">Decrypt</button>
                {decryptedMessage && (
                    <div className="mt-4 p-2 border rounded bg-black">
                        <p><strong>Decrypted Message:</strong> {decryptedMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
