import React from "react";
import Head from "next/head";
// Import relevant icons
import {
  LockKeyhole,
  ShieldOff,
  Lightbulb,
  Users,
  Eye,
  CheckCircle,
  XCircle,
  ArrowRightLeft,
  Satellite,
  Building,
  Globe,
  Share2,
  Box,
  Coins,
  FlaskConical,
} from "lucide-react";


export default function QuantumCryptographyPage() {
  return (
    // Using dark theme
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-300">
      <Head>
        <title>
          🔐 Course 8: Advanced – Quantum Cryptography | Quantum Course
        </title>
        <meta
          name="description"
          content="Learn how quantum mechanics enables secure communication through Quantum Key Distribution (QKD) and its contrast with classical cryptography vulnerabilities like RSA."
        />
      </Head>
      {/* Gradient Title - Using Blue/Indigo */}
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
        🔐 Course 8: Advanced – Quantum Cryptography
      </h1>
      {/* Intro Quote */}
      <p className="text-center italic text-lg text-gray-400 mb-10">
        "In the quantum world, secrecy isn’t based on math—it’s guaranteed by
        the laws of physics."
      </p>
      {/* Main Content Area */}
      <div className="space-y-10">

        {/* What is Quantum Cryptography? */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2 flex items-center">
            🧭 What is Quantum Cryptography?
          </h2>
          <p className="mb-3">
            Quantum Cryptography leverages the principles of{" "}
            <strong className="text-cyan-400">quantum mechanics</strong> to
            perform cryptographic tasks, most notably achieving provably secure
            communication. Unlike traditional (classical) cryptography, which
            often relies on the assumed{" "}
            <strong className="text-yellow-400">
              computational difficulty
            </strong>{" "}
            of mathematical problems (like factoring large numbers), quantum
            cryptography's security is rooted in the fundamental{" "}
            <strong className="text-lime-300">laws of physics</strong>.
          </p>
          <p className="mb-4">
            This physical foundation means its security holds true even against
            adversaries with unlimited computational power, including future
            quantum computers.
          </p>
          <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded text-center">
            <p className="text-lg font-semibold text-blue-300">
              🎯 The flagship application is{" "}
              <strong className="text-white">
                Quantum Key Distribution (QKD)
              </strong>
              .
            </p>
            <p className="text-sm text-blue-400 mt-1">
              QKD protocols allow two parties (conventionally Alice and Bob) to
              generate and share a secret cryptographic key, with the guarantee
              that any attempt by an eavesdropper (Eve) to intercept the key
              will inevitably disturb the quantum transmission and be detected.
            </p>
          </div>
        </section>

        {/* Why Classical Cryptography Falls Short */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-red-700/50">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-red-700 pb-2 flex items-center">
            <ShieldOff className="mr-3 h-7 w-7 text-red-400" /> 🔓 Why Classical
            Cryptography Falls Short
          </h2>
          <p className="mb-3">
            Much of today's secure digital communication (HTTPS, SSH, VPNs)
            relies on public-key cryptography, with protocols like{" "}
            <strong className="text-yellow-400">RSA</strong> and Elliptic Curve
            Cryptography (ECC) being cornerstones. Their security hinges on the
            fact that certain mathematical problems are extremely hard for{" "}
            <strong className="text-gray-400">classical computers</strong> to
            solve within a reasonable timeframe.
          </p>
          <p className="mb-4 text-red-300">
            However, the advent of quantum computing changes the game.{" "}
            <strong className="text-red-200">Shor's Algorithm</strong>,
            specifically designed for quantum computers, can solve the integer
            factorization and discrete logarithm problems (which underpin RSA
            and ECC respectively) exponentially faster than any known classical
            algorithm.
          </p>
          <div className="p-4 bg-red-900/30 border border-red-500/40 rounded text-sm italic text-red-200">
            Analogy: Current cryptography is like a strong steel safe with a
            complex combination lock (hard math problem). A powerful quantum
            computer running Shor's algorithm is like having a master key or
            blueprint that bypasses the lock mechanism entirely.
          </div>
          <p className="mt-4">
            This necessitates new approaches. Quantum cryptography offers
            security based on physics, while{" "}
            <strong className="text-orange-400">
              Post-Quantum Cryptography (PQC)
            </strong>{" "}
            or{" "}
            <strong className="text-orange-400">
              Quantum-Safe Cryptography
            </strong>{" "}
            develops classical algorithms believed to be resistant to quantum
            attacks.
          </p>
        </section>

        {/* How QKD Works (BB84) */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2 flex items-center">
            <Lightbulb className="mr-3 h-7 w-7 text-yellow-400" /> 💡 How Does
            Quantum Key Distribution (QKD) Work? (BB84 Example)
          </h2>
          <p className="mb-4">
            The Bennett-Brassard 1984 (BB84) protocol is the pioneering QKD
            scheme. It uses individual photons and their polarization states:
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-2 flex items-center">
              <Users className="mr-2 h-5 w-5 text-cyan-300" /> Alice and Bob's
              Key Exchange:
            </h3>
            <ol className="list-decimal list-inside space-y-2 pl-4 text-sm text-gray-400 bg-gray-900 p-4 rounded">
              <li>
                <strong className="text-gray-200">Alice Sends Photons:</strong>{" "}
                Alice generates a random sequence of classical bits. For each
                bit, she randomly chooses one of two preparation bases:
                <ul className="list-disc list-inside pl-6 text-xs mt-1">
                  <li>
                    Rectilinear Basis (
                    <code className="bg-gray-700 px-1 rounded text-green-300">
                      +
                    </code>
                    ): Encodes '0' as horizontal polarization (↔) and '1' as
                    vertical (↕).
                  </li>
                  <li>
                    Diagonal Basis (
                    <code className="bg-gray-700 px-1 rounded text-green-300">
                      ×
                    </code>
                    ): Encodes '0' as 45° polarization (↖) and '1' as 135° (↘).
                  </li>
                </ul>
                She sends a single photon encoded according to her random bit
                and basis choice to Bob.
              </li>
              <li>
                <strong className="text-gray-200">Bob Measures Photons:</strong>{" "}
                For each incoming photon, Bob randomly chooses a measurement
                basis (
                <code className="bg-gray-700 px-1 rounded text-green-300">
                  +
                </code>{" "}
                or{" "}
                <code className="bg-gray-700 px-1 rounded text-green-300">
                  ×
                </code>
                ) and measures the photon's polarization in that basis,
                recording the outcome (0 or 1).
              </li>
              <li>
                <strong className="text-gray-200">
                  Public Basis Comparison:
                </strong>{" "}
                Alice and Bob communicate over an open (classical) channel and
                reveal *only* the sequence of bases they used for each photon
                (e.g., Alice: "+ × × + ...", Bob: "+ + × × ..."). They do{" "}
                <strong className="text-red-400">not</strong> reveal their bit
                values or measurement outcomes.
              </li>
              <li>
                <strong className="text-gray-200">Key Sifting:</strong> They
                discard the results where their chosen bases did not match. On
                average, they will match bases 50% of the time. The remaining
                sequence of bits (where bases matched) forms their initial
                shared secret key (the "sifted key").
              </li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-2 flex items-center">
              <Eye className="mr-2 h-5 w-5 text-red-300" /> Enter Eve (The
              Eavesdropper):
            </h3>
            <div className="p-4 bg-gray-900 rounded border border-gray-600 text-sm text-gray-400 space-y-2">
              <p>
                If Eve tries to intercept and measure the photons Alice sends:
              </p>
              <ul className="list-disc list-inside pl-4 text-xs">
                <li>
                  Eve doesn't know which basis Alice used for each photon. She
                  must guess a basis to measure.
                </li>
                <li>
                  According to quantum mechanics, measuring a quantum state can
                  disturb it, especially if measured in an incompatible basis
                  (e.g., measuring a{" "}
                  <code className="bg-gray-700 px-1 rounded text-green-300">
                    ×
                  </code>{" "}
                  basis photon in the{" "}
                  <code className="bg-gray-700 px-1 rounded text-green-300">
                    +
                  </code>{" "}
                  basis).
                </li>
                <li>
                  If Eve measures in the wrong basis and re-sends a photon to
                  Bob, there's a high probability she introduces an error in the
                  bit Bob measures *even when Bob uses the same basis as Alice*.
                </li>
              </ul>
              <p className="mt-2">
                <strong className="text-gray-200">Error Detection:</strong>{" "}
                After sifting, Alice and Bob publicly compare a random subset of
                their sifted key bits. If the error rate is higher than expected
                (due to noise alone), they detect Eve's presence and abort the
                protocol, discarding the key. If the error rate is low, they
                perform error correction and privacy amplification on the
                remaining bits to obtain a final, secure shared key.
              </p>
            </div>
          </div>

          <div className="mt-6 p-3 bg-green-900/30 border border-green-500/40 rounded text-center">
            <p className="text-md font-semibold text-green-300">
              Outcome: Security is guaranteed by the observer effect in quantum
              mechanics. Any eavesdropping attempt introduces detectable
              disturbances.
            </p>
          </div>
        </section>

        {/* Quantum-Safe vs Quantum Crypto */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2 flex items-center">
            <ArrowRightLeft className="mr-3 h-7 w-7 text-orange-400" /> 🔐
            Quantum-Safe vs. Quantum Cryptography
          </h2>
          <p className="mb-4 text-gray-400">
            It's important to distinguish these two related but different
            concepts:
          </p>
          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-900 text-orange-300">
                <tr>
                  <th className="border border-gray-700 px-4 py-2">Feature</th>
                  <th className="border border-gray-700 px-4 py-2">
                    Quantum-Safe Cryptography (PQC)
                  </th>
                  <th className="border border-gray-700 px-4 py-2">
                    Quantum Cryptography (e.g., QKD)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-850 text-sm">
                <tr>
                  <td className="border border-gray-700 px-4 py-2 font-semibold">
                    Security Basis
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Complex mathematical problems believed hard for *both*
                    classical and quantum computers.
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Fundamental laws of quantum mechanics (e.g., no-cloning,
                    measurement disturbance).
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 px-4 py-2 font-semibold">
                    Hardware Requirement
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Runs on existing classical computers and infrastructure.
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Requires specialized quantum hardware (photon sources,
                    detectors, quantum channels).
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 px-4 py-2 font-semibold">
                    Examples
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Lattice-based cryptography (e.g., CRYSTALS-Kyber),
                    hash-based signatures, code-based crypto.
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Quantum Key Distribution (BB84, E91), Quantum Secret
                    Sharing.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 px-4 py-2 font-semibold">
                    Vulnerable to Quantum Computers?
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Designed to be No.
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    No (security based on physics).
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 px-4 py-2 font-semibold">
                    Implementation & Scalability
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Relatively easier to deploy widely using existing networks
                    (software upgrade). Standardization in progress (NIST PQC).
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Harder to scale globally due to hardware needs (e.g.,
                    limited distance, need for trusted nodes or quantum
                    repeaters). Practical for point-to-point high-security
                    links.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 italic text-gray-400 text-sm">
            PQC provides near-term solutions deployable on classical hardware,
            while Quantum Cryptography offers long-term, physics-based security
            but requires new infrastructure.
          </p>
        </section>

        {/* Real World Applications */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2 flex items-center">
            <Satellite className="mr-3 h-7 w-7 text-cyan-400" /> 📡 Real-World
            Applications & Developments
          </h2>
          <p className="mb-4 text-gray-400">
            While still niche, QKD and related quantum communication
            technologies are being actively developed and deployed:
          </p>
          <ul className="list-disc list-inside space-y-3 pl-4 text-sm">
            <li>
              <strong className="text-cyan-300 flex items-center">
                <Satellite className="inline h-4 w-4 mr-1" /> China’s Micius
                Satellite:
              </strong>{" "}
              Demonstrated the feasibility of satellite-based QKD, enabling
              secure intercontinental communication links (e.g., secure video
              conferencing over thousands of kilometers).
            </li>
            <li>
              <strong className="text-cyan-300 flex items-center">
                <Building className="inline h-4 w-4 mr-1" /> Commercial QKD
                Systems:
              </strong>{" "}
              Companies like ID Quantique (IDQ), Toshiba, QuantumCTek offer
              commercial QKD products used by governments, financial
              institutions, and critical infrastructure for high-security
              point-to-point links.
            </li>
            <li>
              <strong className="text-cyan-300 flex items-center">
                <Globe className="inline h-4 w-4 mr-1" /> Quantum Internet
                Initiatives:
              </strong>{" "}
              Research networks and projects (e.g., in the EU, US, China) are
              working towards building larger-scale quantum networks based on
              entanglement distribution and the development of quantum repeaters
              to overcome distance limitations.
            </li>
          </ul>
        </section>

        {/* Other Protocols */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2 flex items-center">
            <FlaskConical className="mr-3 h-7 w-7 text-purple-400" /> 🧪 Other
            Quantum Security Protocols
          </h2>
          <p className="mb-4 text-gray-400">
            Beyond QKD, quantum mechanics enables other cryptographic
            primitives:
          </p>
          <ul className="list-none space-y-3 pl-4 text-sm">
            <li className="flex items-start">
              <Share2
                size={18}
                className="mr-2 mt-0.5 text-purple-300 flex-shrink-0"
              />
              <div>
                <strong className="text-gray-100">
                  Quantum Secret Sharing (QSS):
                </strong>{" "}
                A secret is encoded into an entangled quantum state and
                distributed among multiple parties. The secret can only be
                reconstructed if a sufficient number of parties collaborate and
                combine their shares.
              </div>
            </li>
            <li className="flex items-start">
              <Box
                size={18}
                className="mr-2 mt-0.5 text-purple-300 flex-shrink-0"
              />
              <div>
                <strong className="text-gray-100">
                  Quantum Bit Commitment:
                </strong>{" "}
                Allows one party (Alice) to commit to a bit value (0 or 1) sent
                to another party (Bob), without revealing the value immediately.
                Alice cannot change her commitment later, and Bob cannot learn
                the value before Alice decides to reveal it. Secure
                implementations are tricky.
              </div>
            </li>
            <li className="flex items-start">
              <Coins
                size={18}
                className="mr-2 mt-0.5 text-purple-300 flex-shrink-0"
              />
              <div>
                <strong className="text-gray-100">
                  Quantum Coin Flipping (or Tossing):
                </strong>{" "}
                Protocols allowing two distrustful parties to remotely agree on
                a random bit sequence, where neither party can bias the outcome
                significantly more than the other.
              </div>
            </li>
            {/* Add more if relevant */}
          </ul>
        </section>
      </div>{" "}
      {/* End Main Content Area */}
      {/* Footer/Metadata */}
      <div className="mt-12 pt-6 border-t border-gray-700 text-center">
        <p className="text-gray-400 italic text-sm">
          Estimated Duration: ~2 Lessons | Difficulty: Advanced | Prerequisites:
          Intermediate Courses, Basic Cryptography Knowledge Recommended
        </p>
      </div>
    </div>
  );
}
