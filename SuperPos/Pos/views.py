import json
from pprint import pprint
import numpy as np
import traceback
import cirq
import cirq_web
import plotly
from plotly import graph_objs as go
from django.shortcuts import render
from django.http import JsonResponse
from django.http import JsonResponse, HttpResponseBadRequest
import google.generativeai as genai
import os

import fractions
import math
import random
from typing import Optional, Callable

import sympy
import cirq
import numpy as np
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import FactorInputSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import random
import math
import base64
from sympy import mod_inverse
import random
import cirq
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import json
import random
import cirq
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def run_fault_tolerance(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("data",data)
            num_qubits = data.get("num_qubits", 3)
            errors = data.get("errors", [])
            protocol = data.get("protocol", "non_ft")
            syndrome_rounds = data.get("syndrome_rounds", 3)
            meas_error_prob = data.get("measurement_error_prob", 0.0)
            print("meas_error_prob",meas_error_prob)
            explanation = []
            


            qubits = [cirq.LineQubit(i) for i in range(num_qubits)]

            secret = random.choice([0, 1])

            explanation.append(f"Secret encoded logical bit: {secret}")

            circuit = cirq.Circuit()
            if secret == 1:
                circuit.append(cirq.X(qubits[0]))
                explanation.append("Applied X gate on qubit 0 to encode logical 1.")
            else:
                explanation.append("No X gate applied; qubit 0 remains in |0> for logical 0.")


            if num_qubits > 1:
                for i in range(1, num_qubits):
                    circuit.append(cirq.CNOT(qubits[0], qubits[i]))
                explanation.append("Encoded logical qubit into all qubits using CNOT gates.")

            for idx in errors:
                circuit.append(cirq.X(qubits[idx]))
            explanation.append(f"Applied X error on qubit(s): {errors if errors else 'None'}")

            circuit.append(cirq.measure(*qubits, key='result'))
            explanation.append("Added measurement gates to all qubits.")

            circuit_text = str(circuit)  # Cirq's built-in textual representation
            explanation.append("Circuit constructed successfully.")


            simulator = cirq.Simulator()
            result = simulator.run(circuit, repetitions=1)
            ideal_meas = result.measurements['result'][0].tolist()
            explanation.append(f"Ideal measurement result: {ideal_meas}")


            final_meas = ideal_meas
            if protocol == 'ft':
                explanation.append(f"Protocol: Fault Tolerant with {syndrome_rounds} syndrome rounds.")
                rounds_results = []
                for _ in range(syndrome_rounds):
                    noisy_round = [1 - bit if random.random() < meas_error_prob else bit for bit in ideal_meas]
                    rounds_results.append(noisy_round)
                explanation.append(f"Noisy syndrome rounds: {rounds_results}")

                final_meas = [
                    1 if sum([rounds_results[r][q] for r in range(syndrome_rounds)]) > syndrome_rounds / 2 else 0
                    for q in range(num_qubits)
                ]
                explanation.append(f"Final measurement after majority vote: {final_meas}")

            sum_meas = sum(final_meas)
            corrected_state = None if num_qubits % 2 == 0 and sum_meas == num_qubits // 2 else (1 if sum_meas > num_qubits / 2 else 0)
            explanation.append(f"Corrected logical bit: {corrected_state if corrected_state is not None else 'Ambiguous (Tie)'}")

            success = corrected_state == secret if corrected_state is not None else False
            explanation.append("Fault tolerance successful!" if success else "Fault tolerance failed.")
            print("Success:")
            return JsonResponse({
                "secret": secret,
                "ideal_measurement": ideal_meas,
                "final_measurement": final_meas,
                "corrected_state": corrected_state,
                "success": success,
                "explanation": explanation,
                "circuit_text": circuit_text,  # Cirq's built-in circuit diagram
                "syndromeRounds":syndrome_rounds
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)
    
def is_prime(n):
    """Check if a number is prime."""
    if n < 2:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

def generate_prime(bit_length):
    """Generate a random prime number with the specified bit length."""
    while True:
        p = random.getrandbits(bit_length)
        if p % 2 == 0:
            p += 1
        if is_prime(p):
            return p

def generate_rsa_keypair():
    """Generate an RSA key pair."""
    bit_length = 16
    p = generate_prime(bit_length)
    q = generate_prime(bit_length)
    while q == p:
        q = generate_prime(bit_length)
    
    n = p * q
    phi = (p - 1) * (q - 1)
    e = 65537
    while math.gcd(e, phi) != 1:
        e += 1
    d = mod_inverse(e, phi)
    return n, e, d

def encrypt_message(message, e, n):
    """Encrypt the message using RSA."""
    chunk_size = (n.bit_length() - 1) // 8
    message_bytes = message.encode('utf-8')
    encrypted_chunks = []
    for i in range(0, len(message_bytes), chunk_size):
        chunk = message_bytes[i:i + chunk_size]
        chunk_int = int.from_bytes(chunk, byteorder='big')
        encrypted_int = pow(chunk_int, e, n)
        block_size = (n.bit_length() + 7) // 8
        encrypted_bytes = encrypted_int.to_bytes(block_size, byteorder='big')
        encrypted_chunks.append(encrypted_bytes)
    combined_encrypted = b''.join(encrypted_chunks)
    return base64.b64encode(combined_encrypted).decode('utf-8')

def factor_n(n):
    """Factor n using trial division (simulating Shor's algorithm)."""
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return i, n // i
    return None, None

def decrypt_message(encrypted_base64, d, n):
    """Decrypt the RSA-encrypted Base64 message."""
    print(type(encrypted_base64))
    encrypted_bytes = base64.b64decode(encrypted_base64)
    chunk_size = (n.bit_length() + 7) // 8  
    decrypted_chunks = []
    for i in range(0, len(encrypted_bytes), chunk_size):
        chunk = encrypted_bytes[i:i + chunk_size]
        chunk_int = int.from_bytes(chunk, byteorder='big')
        decrypted_int = pow(chunk_int, d, n)
        decrypted_bytes = decrypted_int.to_bytes((decrypted_int.bit_length() + 7) // 8, byteorder='big')
        decrypted_chunks.append(decrypted_bytes)
    return b''.join(decrypted_chunks).decode('utf-8')

@csrf_exempt
def rsa_generate_keys(request):
    """Generate RSA keys."""
    n, e, d = generate_rsa_keypair()
    return JsonResponse({'n': n, 'e': e, 'd': d})

@csrf_exempt
def rsa_encrypt(request):
    """Encrypt a message using RSA."""
    data = json.loads(request.body)
    message = data.get('message')
    n = int(data.get('n'))
    e = int(data.get('e'))
    encrypted_message = encrypt_message(message, e, n)
    return JsonResponse({'encrypted_message': encrypted_message})

@csrf_exempt
def rsa_decrypt(request):
    """Decrypt a message using Shor's algorithm (simulated)."""
    data = json.loads(request.body)
    # encrypted_message = data.get('encrypted_message')
    encrypted_message = data.get('encrypted_message')
    print("hwkegrk",encrypted_message)
    n = int(data.get('n'))
    e = int(data.get('e'))
    
    p, q = factor_n(n)
    if p is None:
        return JsonResponse({'error': 'Failed to factor n'}, status=400)
    
    phi = (p - 1) * (q - 1)
    d = mod_inverse(e, phi)
    decrypted_message = decrypt_message(encrypted_message, d, n)
    return JsonResponse({'decrypted_message': decrypted_message})

def multiplicative_group(n: int):
    """Returns the multiplicative group modulo n."""
    assert n > 1
    group = [1]
    for x in range(2, n):
        if math.gcd(x, n) == 1:
            group.append(x)
    return group


def classical_order_finder(x: int, n: int) -> Optional[int]:
    """Computes smallest positive r such that x**r mod n == 1."""
    # Make sure x is both valid and in Z_n.
    if x < 2 or x >= n or math.gcd(x, n) > 1:
        raise ValueError(f"Invalid x={x} for modulus n={n}.")

    # Determine the order.
    r, y = 1, x
    while y != 1:
        y = (x * y) % n
        r += 1
    return r


class ModularExp(cirq.ArithmeticGate):
    """Quantum modular exponentiation for Shor's algorithm."""

    def __init__(self, target, exponent, base, modulus):
        if len(target) < modulus.bit_length():
            raise ValueError(
                f"Register with {len(target)} qubits is too small for modulus {modulus}"
            )
        self.target = target
        self.exponent = exponent
        self.base = base
        self.modulus = modulus

    def registers(self):
        return self.target, self.exponent, self.base, self.modulus

    def with_registers(self, *new_registers):
        if len(new_registers) != 4:
            raise ValueError(
                f"Expected 4 registers (target, exponent, base, modulus), but got {len(new_registers)}"
            )
        target, exponent, base, modulus = new_registers
        return ModularExp(target, exponent, base, modulus)

    def apply(self, *register_values):
        assert len(register_values) == 4
        target, exponent, base, modulus = register_values
        if target >= modulus:
            return target
        return (target * base**exponent) % modulus

    def _circuit_diagram_info_(self, args):
        wire_symbols = [f"t{i}" for i in range(len(self.target))]
        e_str = str(self.exponent)
        if isinstance(self.exponent, list):
            e_str = "e"
            wire_symbols += [f"e{i}" for i in range(len(self.exponent))]
        wire_symbols[0] = f"ModularExp(t*{self.base}**{e_str} % {self.modulus})"
        return cirq.CircuitDiagramInfo(wire_symbols=tuple(wire_symbols))


def make_order_finding_circuit(x: int, n: int, shots: int = 100, noise_model: str = "ideal") -> cirq.Circuit:
    """Returns a quantum circuit that computes the order of x modulo n."""
    L = n.bit_length()
    target = cirq.LineQubit.range(L)
    exponent = cirq.LineQubit.range(L, 3 * L + 3)

    # Create a ModularExp gate sized for these registers.
    mod_exp = ModularExp([2] * L, [2] * (2 * L + 3), x, n)

    circuit = cirq.Circuit(
        cirq.X(target[L - 1]),
        cirq.H.on_each(*exponent),
        mod_exp.on(*target, *exponent),
        cirq.qft(*exponent, inverse=True),
        cirq.measure(*exponent, key="exponent"),
    )

    # Apply noise model
    if noise_model == "depolarizing":
        circuit = circuit.with_noise(cirq.depolarize(0.01))
    elif noise_model == "bitflip":
        circuit = circuit.with_noise(cirq.bit_flip(0.02))

    return circuit


def process_measurement(result: cirq.Result, x: int, n: int) -> Optional[int]:
    """Interprets the output of the order finding circuit."""
    # Read the output integer of the exponent register.
    exponent_as_integer = result.data["exponent"][0]
    exponent_num_bits = result.measurements["exponent"].shape[1]
    eigenphase = float(exponent_as_integer / 2**exponent_num_bits)

    # Run the continued fractions algorithm to determine f = s / r.
    f = fractions.Fraction.from_float(eigenphase).limit_denominator(n)

    # If the numerator is zero, the order finder failed.
    if f.numerator == 0:
        return None

    # Else, return the denominator if it is valid.
    r = f.denominator
    if x**r % n != 1:
        return None
    return r



def quantum_order_finder(x: int, n: int, shots: int = 100, noise_model: str = "ideal") -> Optional[int]:
    """Computes smallest positive r such that x**r mod n == 1 using quantum circuit simulation."""
    if x < 2 or n <= x or math.gcd(x, n) > 1:
        raise ValueError(f"Invalid x={x} for modulus n={n}.")

    # Create the order finding circuit
    circuit = make_order_finding_circuit(x, n, shots, noise_model)

    # Simulate the quantum circuit with specified shots
    simulator = cirq.Simulator()
    result = simulator.run(circuit, repetitions=shots)

    return process_measurement(result, x, n)

def find_factor_of_prime_power(n: int) -> Optional[int]:
    """Returns non-trivial factor of n if n is a prime power, else None."""
    for k in range(2, math.floor(math.log2(n)) + 1):
        c = math.pow(n, 1 / k)
        c1 = math.floor(c)
        if c1**k == n:
            return c1
        c2 = math.ceil(c)
        if c2**k == n:
            return c2
    return None


def find_factor(
    n: int, order_finder: Callable = quantum_order_finder, max_attempts: int = 30
) -> Optional[int]:
    """Returns a non-trivial factor of composite integer n."""
    # If the number is prime, there are no non-trivial factors.
    if sympy.isprime(n):
        return None

    # If the number is even, two is a non-trivial factor.
    if n % 2 == 0:
        return 2

    # If n is a prime power, we can find a non-trivial factor efficiently.
    c = find_factor_of_prime_power(n)
    if c is not None:
        return c

    for _ in range(max_attempts):
        # Choose a random number between 2 and n - 1.
        x = random.randint(2, n - 1)

        # Most likely x and n will be relatively prime.
        c = math.gcd(x, n)

        # If x and n are not relatively prime, we got lucky and found a non-trivial factor.
        if 1 < c < n:
            return c

        # Compute the order r of x modulo n using the order finder.
        try:
            r = order_finder(x, n)
        except Exception as e:
            continue

        # If the order finder failed, try again.
        if r is None:
            continue

        # If the order r is even, try again.
        if r % 2 != 0:
            continue

        # Compute the non-trivial factor.
        y = x ** (r // 2) % n
        if not (1 < y < n):
            continue

        c = math.gcd(y - 1, n)
        if 1 < c < n:
            return c

    return None

def factor_number(n: int, use_quantum: bool = False, shots: int = 100, noise_model: str = "ideal"):
    """Factor a number using either classical or quantum algorithm."""
    if n <= 1:
        return {"error": "Input must be greater than 1"}

    if sympy.isprime(n):
        return {"result": "prime", "factors": [n]}

    # Choose the order finder based on the requested algorithm
    order_finder = quantum_order_finder if use_quantum else classical_order_finder

    # Find first factor
    p = find_factor(n, order_finder=lambda x, n: order_finder(x, n, shots, noise_model))

    if p is None:
        return {"error": "Failed to find factors"}

    q = n // p

    # Check if the factors are prime, if not, factor them recursively
    factors = []
    for factor in [p, q]:
        if sympy.isprime(factor):
            factors.append(factor)
        else:
            subfactors = factor_number(factor, use_quantum=use_quantum, shots=shots, noise_model=noise_model)
            if "factors" in subfactors:
                factors.extend(subfactors["factors"])

    return {"result": "composite", "factors": sorted(factors)}




@api_view(["POST"])
def factor_view(request):
    """Django REST API view to factor a number with quantum circuit options."""
    try:
        serializer = FactorInputSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        n = data["number"]
        use_quantum = data["use_quantum"]
        shots = data.get("shots", 100)  # Default to 100
        noise_model = data.get("noise_model", "ideal")  # Default to "ideal"

        if n <= 1:
            return Response({"error": "Number must be greater than 1"}, status=status.HTTP_400_BAD_REQUEST)

        # Execute factoring algorithm
        result = factor_number(n, use_quantum=use_quantum, shots=shots, noise_model=noise_model)

        return Response(result)

    except ValueError:
        return Response({"error": "Invalid input. Please provide a valid integer."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Add your Google Generative AI API Key and Quantum context here
quantum_tool_context = """
Quantum Computing Educational Tool Overview:
- Purpose: The platform is designed to help users learn quantum computing by allowing them to interact with quantum circuits, experiment with quantum operations, and understand real-world applications of quantum principles. It aims to be an accessible educational tool for beginners, as well as a resource for advanced users to explore and simulate quantum concepts.
- Key Features:
  - Quantum Circuit Simulation: Users can build and simulate quantum circuits with various quantum gates and operations.
  - Drag-and-Drop Interface: Enables users to construct quantum circuits without requiring deep programming knowledge.
  - 3D Visualization of Quantum Circuits: Using Cirq Web, users can visualize their quantum circuits in a 3D space, helping them understand the flow and interaction of quantum gates.
  - Documentation on Quantum Gates and Operations: The platform includes detailed descriptions, examples, and corresponding code for quantum gates like X, Y, Z, Hadamard, CNOT, and more. Each gate is explained with its quantum behavior and practical usage.
  - Learning Resources and Tutorials: Educational content such as tutorials, guides, and video lessons on quantum concepts like superposition, entanglement, and quantum teleportation.
  - Community Interaction: A blog for discussing the latest developments in quantum computing, tutorials for specific quantum algorithms, and user-driven content sharing. The platform encourages collaboration among learners and educators.
  - Real-World Applications Simulations: The platform showcases how quantum computing can be applied in real-world scenarios, such as quantum machine learning, quantum cryptography, and simulating chemical reactions for drug discovery.
  - Quantum Algorithm Playground: Users can run quantum algorithms, such as Grover’s and Shor’s algorithms, on simulated quantum circuits.
  - Quantum State Measurement: A feature for users to measure quantum states and visualize the probabilities of outcomes.
  - Multi-Platform Access: The platform is available on both web and mobile devices for users to access their quantum simulations and resources anytime, anywhere.

Technologies and Frameworks:
- Backend: Flask, though there are plans to transition to Django or Node.js for scalability and performance improvements. The backend is responsible for handling user input, simulation requests, and serving educational content.
- Frontend: React is used for building the user interface, ensuring a dynamic and interactive experience. Tailwind CSS is used for styling, while ShadCN UI provides reusable components that improve the UI design.
- Quantum Simulation Framework: Cirq, a Python framework developed by Google for simulating quantum circuits, is used to handle the quantum circuit simulation.
- 3D Visualization Framework: Cirq Web, integrated with the platform, allows users to view their quantum circuits in 3D, providing a more intuitive understanding of quantum operations.
- Graph Plotting: Plotly is used for visualizing the results of quantum simulations, such as probability distributions or quantum state changes, helping users interpret complex outcomes.
- API Integration: Users input quantum circuits through a JSON interface, which the backend processes. The simulation results are returned to the user for visualization and analysis.

Platform Usage:
- User Interaction: Users interact with the platform via a graphical user interface that lets them input quantum circuit descriptions in JSON format or use the drag-and-drop interface. After input, users can visualize their circuits, simulate quantum operations, and receive real-time feedback.
- Learning: The platform provides extensive learning resources, including text-based tutorials, video lessons, and step-by-step guides. Topics cover both basic and advanced quantum concepts such as quantum mechanics, quantum gates, quantum algorithms, and quantum error correction.
- Simulations: Users can create and simulate various quantum circuits. They can explore quantum operations like superposition and entanglement and learn how different gates interact with quantum states.
- Measurements and Outcomes: After running simulations, users can measure quantum states and visualize the possible outcomes of their quantum operations. This helps them grasp the probabilistic nature of quantum systems.
- Educational Community: The blog serves as a platform for users to learn from and share their knowledge about quantum computing. It hosts articles on quantum algorithms, industry trends, and detailed walkthroughs of advanced topics.
- Real-World Applications: The platform enables users to explore real-world use cases of quantum computing, such as:
  - Quantum machine learning algorithms.
  - Applications in quantum cryptography (like quantum key distribution).
  - Drug discovery and molecular simulations using quantum computing.
  - Cybersecurity simulations using quantum encryption algorithms.
- Quantum Algorithm Playground: Users can experiment with popular quantum algorithms, test them on different circuits, and observe how quantum computing could transform industries like finance, healthcare, and AI.

Vision for Future:
- AI Integration: Future AI tools will assist in the learning process by providing personalized guidance based on the user’s progress, answering questions, and suggesting next steps. The AI assistant will also help users troubleshoot quantum circuits, provide explanations for quantum concepts, and suggest tutorials and resources.
- Community Expansion: As the platform grows, the community will play an essential role in providing feedback, contributing to educational content, and engaging with other learners. The platform will expand its resources to include live webinars, expert interviews, and advanced workshops.
- Real-World Collaborations: Future developments may include partnerships with academic institutions and tech companies to bring more advanced quantum computing simulations, real-time collaborations, and research capabilities to the platform.
"""
extra = "based on this answer foloowing question please and avoid using sentences like sure im ready to help and or give closure from your side "
# Initialize the Google Generative AI client
genai.configure(api_key=os.environ["GENERATIVEAI_API_KEY"])

# Define the model
model = genai.GenerativeModel("gemini-1.5-flash")


def chat(request):
    if request.method == "POST":
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body)
            input_message = data.get("message", "").strip()

            if not input_message:
                return HttpResponseBadRequest("No message provided")

            # Generate a response from the model
            response = model.generate_content(
                contents=quantum_tool_context + extra + input_message
            )
            return JsonResponse({"response": response.text})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse(
                {"error": f"Failed to generate a response: {str(e)}"}, status=500
            )
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=400)


def create_circuit_from_json(circuit_json):
    circuit_data = circuit_json
    # pprint(circuit_data)
    layout = circuit_data["circuit"]["layout"]
    qubits = {
        name: cirq.LineQubit(index)
        for index, name in enumerate(layout["qubits"].keys())
    }
    circuit = cirq.Circuit()

    for operation in circuit_data["circuit"]["operations"]:
        gate_type = operation["type"]
        targets = operation.get("targets", [])
        control = operation.get(
            "control"
        )  # Extract control qubits for controlled gates
        angle = operation.get("angle")  # Angle for CRZ gate

        # Map target and control qubits to cirq qubits
        target_qubits = [qubits.get(target) for target in targets]
        control_qubits = (
            [qubits.get(c) for c in control.split(",")] if control else []
        )  # Handle multiple control qubits

        # Validate qubits
        if None in target_qubits or any(cq is None for cq in control_qubits):
            raise ValueError(
                f"Invalid target or control qubits in operation {operation}"
            )

        # Gate logic
        if gate_type == "H":
            for target in target_qubits:
                circuit.append(cirq.H(target))
        elif gate_type == "MEASURE":
            for target in target_qubits:
                circuit.append(cirq.measure(target, key=str(target)))
        elif gate_type == "CNOT":
            if len(control_qubits) == 1 and len(target_qubits) == 1:
                circuit.append(cirq.CNOT(control_qubits[0], target_qubits[0]))
            else:
                raise ValueError(
                    "CNOT gate requires one control qubit and one target qubit"
                )
        elif gate_type == "SWAP":
            if len(target_qubits) == 2:
                target1, target2 = target_qubits
                circuit.append(cirq.SWAP(target1, target2))
            else:
                raise ValueError("SWAP gate requires exactly two target qubits")
        elif gate_type == "X":
            for target in target_qubits:
                circuit.append(cirq.X(target))
        elif gate_type == "Y":
            for target in target_qubits:
                circuit.append(cirq.Y(target))
        elif gate_type == "Z":
            for target in target_qubits:
                circuit.append(cirq.Z(target))
        elif gate_type == "RX" and angle:
            for target in target_qubits:
                circuit.append(cirq.rx(angle).on(target))
        elif gate_type == "RY" and angle:
            for target in target_qubits:
                circuit.append(cirq.ry(angle).on(target))
        elif gate_type == "RZ" and angle:
            for target in target_qubits:
                circuit.append(cirq.rz(angle).on(target))
        elif gate_type == "CRZ":
            if len(control_qubits) == 1 and len(target_qubits) == 1:
                # Use the angle provided in the JSON
                angle = operation.get("angle", 0)  # Default angle to 0 if not provided
                circuit.append(
                    cirq.ControlledGate(cirq.Z)(control_qubits[0], target_qubits[0])
                )
            else:
                raise ValueError(
                    "CRZ gate requires one control qubit and one target qubit"
                )

        elif gate_type == "CZ":
            if len(control_qubits) == 1 and len(target_qubits) == 1:
                circuit.append(cirq.CZ(control_qubits[0], target_qubits[0]))
            else:
                raise ValueError(
                    "CZ gate requires one control qubit and one target qubit"
                )
        elif gate_type == "CY":
            if len(control_qubits) == 1 and len(target_qubits) == 1:
                # Simulate controlled Y gate (CNOT - Y - CNOT)
                circuit.append(cirq.CNOT(control_qubits[0], target_qubits[0]))
                circuit.append(cirq.Y(target_qubits[0]))
                circuit.append(cirq.CNOT(control_qubits[0], target_qubits[0]))
            else:
                raise ValueError(
                    "CY gate requires one control qubit and one target qubit"
                )

        elif gate_type == "CCX":
            if len(control_qubits) == 2 and len(target_qubits) == 1:
                circuit.append(
                    cirq.CCX(control_qubits[0], control_qubits[1], target_qubits[0])
                )
            else:
                raise ValueError(
                    "CCX gate requires two control qubits and one target qubit"
                )
        elif gate_type == "CRX" and angle:
            if len(control_qubits) == 1 and len(target_qubits) == 1:
                circuit.append(cirq.CRX(angle).on(control_qubits[0], target_qubits[0]))
            else:
                raise ValueError(
                    "CRX gate requires one control qubit and one target qubit"
                )
        elif gate_type == "CRY" and angle:
            if len(control_qubits) == 1 and len(target_qubits) == 1:
                circuit.append(cirq.CRY(angle).on(control_qubits[0], target_qubits[0]))
            else:
                raise ValueError(
                    "CRY gate requires one control qubit and one target qubit"
                )
        else:
            raise ValueError(f"Unsupported gate type: {gate_type}")

    circuit.append(cirq.measure(*qubits.values(), key="result"))

    # Generate the 3D visualization
    ckt = cirq_web.Circuit3D(circuit)
    html_file = ckt.generate_html_file(
        output_directory=r"C:\Users\sstha\Desktop\WEB\FinalPos__\SuperPos\Pos\templates"
    )

    # Write the updated HTML content
    with open(html_file, "r") as f:
        html = f.readlines()
    with open(
        r"C:\Users\sstha\Desktop\WEB\FinalPos__\SuperPos\Pos\templates\Ckt3d.html",
        "w+",
        encoding="utf-8",
    ) as f:
        f.write(
            """
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quantum Circuit Documentation</title>
    <style>
        :root {
            --background: 222.2 84% 4.9%;
            --foreground: 210 40% 98%;
            --card: 222.2 84% 4.9%;
            --card-foreground: 210 40% 98%;
            --popover: 222.2 84% 4.9%;
            --popover-foreground: 210 40% 98%;
            --primary: 217.2 91.2% 59.8%;
            --primary-foreground: 222.2 47.4% 11.2%;
            --secondary: 217.2 32.6% 17.5%;
            --secondary-foreground: 210 40% 98%;
            --muted: 217.2 32.6% 17.5%;
            --muted-foreground: 215 20.2% 65.1%;
            --accent: 217.2 32.6% 17.5%;
            --accent-foreground: 210 40% 98%;
            --destructive: 0 62.8% 30.6%;
            --destructive-foreground: 210 40% 98%;
            --border: 217.2 32.6% 17.5%;
            --input: 217.2 32.6% 17.5%;
            --ring: 224.3 76.3% 48%;
            --radius: 0.5rem;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
            line-height: 1.5;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 80rem;
            margin: 0 auto;
            padding: 2rem;
        }

        .base {
            display: flex;
            gap: 2rem;
            width: 100%;
            margin-bottom: 2rem;
        }

        .model, .documentation {
            flex: 1;
            background-color: hsl(var(--card));
            border-radius: var(--radius);
            padding: 1.5rem;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }

        h2 {
            color: hsl(var(--primary));
            font-size: 1.5rem;
            margin-top: 0;
            margin-bottom: 1rem;
        }

        .gate-section {
            margin-bottom: 1.5rem;
        }

        h3 {
            color: hsl(var(--primary));
            font-size: 1.25rem;
            margin-top: 0;
            margin-bottom: 0.5rem;
        }

        .description {
            color: hsl(var(--muted-foreground));
            margin-bottom: 0.5rem;
        }

        pre {
            background-color: hsl(var(--secondary));
            color: hsl(var(--secondary-foreground));
            padding: 1rem;
            border-radius: var(--radius);
            overflow-x: auto;
            font-family: monospace;
        }

        @media (max-width: 768px) {
            .base {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="base">
            <div class="model">
<h2>Model Content</h2>
        """
        )
        for line in html:
            f.write(line)
        f.write(
            """
<!-- Add your model content here -->
            </div>
            <div class="documentation">
                <h2>Documentation Content</h2>
                
                <div class="gate-section">
                    <h3>Hadamard (H) Gate</h3>
                    <p class="description">The Hadamard gate creates a superposition state from a basis state.</p>
                    <pre>{
    "type": "H",
    "targets": ["q0"]
}</pre>
                </div>

                <div class="gate-section">
                    <h3>Pauli-X (X) Gate</h3>
                    <p class="description">The Pauli-X gate acts as a quantum bit flip, analogous to the NOT gate in classical computing.</p>
                    <pre>{
    "type": "X",
    "targets": ["q1"]
}</pre>
                </div>

                <div class="gate-section">
                    <h3>Pauli-Y (Y) Gate</h3>
                    <p class="description">The Pauli-Y gate is a combination of the X and Z gates, introducing a 90-degree phase shift.</p>
                    <pre>{
    "type": "Y",
    "targets": ["q0"]
}</pre>
                </div>

                <div class="gate-section">
                    <h3>Pauli-Z (Z) Gate</h3>
                    <p class="description">The Pauli-Z gate flips the phase of the qubit if it is in the state |1⟩.</p>
                    <pre>{
    "type": "Z",
    "targets": ["q0"]
}</pre>
                </div>

                <div class="gate-section">
                    <h3>CNOT Gate</h3>
                    <p class="description">The Controlled-NOT (CNOT) gate flips the target qubit if the control qubit is in state 1.</p>
                    <pre>{
    "type": "CNOT",
    "control": "q0",
    "targets": ["q1"]
}</pre>
                </div>

                <div class="gate-section">
                    <h3>SWAP Gate</h3>
                    <p class="description">The SWAP gate exchanges the states of two qubits.</p>
                    <pre>{
    "type": "SWAP",
    "targets": ["q1", "q2"]
}</pre>
                </div>

                <div class="gate-section">
                    <h3>T Gate</h3>
                    <p class="description">The T gate is a phase gate that applies a π/4 phase shift to the qubit.</p>
                    <pre>{
    "type": "T",
    "targets": ["q0"]
}</pre>
                </div>

                <div class="gate-section">
                    <h3>S Gate</h3>
                    <p class="description">The S gate, also called the phase gate, applies a π/2 phase shift to the qubit.</p>
                    <pre>{
    "type": "S",
    "targets": ["q0"]
}</pre>
                </div>

                <div class="gate-section">
                    <h3>Toffoli (CCX) Gate</h3>
                    <p class="description">The Toffoli gate, or CCX, is a three-qubit gate that flips the target qubit if both control qubits are in state 1.</p>
                    <pre>{
    "type": "CCX",
    "control1": "q0",
    "control2": "q1",
    "targets": ["q2"]
}</pre>
                </div>

                <div class="gate-section">
                    <h3>RX Gate</h3>
                    <p class="description">The RX gate rotates the qubit around the X-axis by the given angle θ.</p>
                    <pre>{
    "type": "RX",
    "targets": ["q0"],
    "theta": 1.57
}</pre>
                </div>

                <div class="gate-section">
                    <h3>RY Gate</h3>
                    <p class="description">The RY gate rotates the qubit around the Y-axis by the given angle θ.</p>
                    <pre>{
    "type": "RY",
    "targets": ["q0"],
    "theta": 1.57
}</pre>
                </div>

                <div class="gate-section">
                    <h3>RZ Gate</h3>
                    <p class="description">The RZ gate rotates the qubit around the Z-axis by the given angle θ.</p>
                    <pre>{
    "type": "RZ",
    "targets": ["q0"],
    "theta": 1.57
}</pre>
                </div>

                <div class="gate-section">
                    <h3>U3 Gate</h3>
                    <p class="description">The U3 gate applies a general rotation to a qubit with three parameters (θ, φ, λ).</p>
                    <pre>{
    "type": "U3",
    "targets": ["q0"],
    "theta": 1.57,
    "phi": 0.785,
    "lambda": 0.785
}</pre>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
        """
        )

    return circuit


def simulate_circuit(circuit):
    simulator = cirq.Simulator()
    return simulator.simulate(circuit)


def create_probability_plot(state_list):
    prob_data = go.Bar(
        x=[state["binary"] for state in state_list],
        y=[state["probability"] for state in state_list],
        name="Probability",
    )
    prob_layout = go.Layout(
        title="State Probabilities", xaxis_title="State", yaxis_title="Probability"
    )
    prob_plot = go.Figure(data=[prob_data], layout=prob_layout)
    return json.dumps(prob_plot, cls=plotly.utils.PlotlyJSONEncoder)


def create_phase_plot(state_list):
    phase_data = go.Scatterpolar(
        r=[state["magnitude"] for state in state_list],
        theta=[state["phase"] * 180 / np.pi for state in state_list],
        mode="markers",
        marker=dict(size=10),
        text=[state["binary"] for state in state_list],
        name="Phase",
    )
    phase_layout = go.Layout(
        title="State Phases", polar=dict(radialaxis=dict(visible=True, range=[0, 1]))
    )
    phase_plot = go.Figure(data=[phase_data], layout=phase_layout)
    return json.dumps(phase_plot, cls=plotly.utils.PlotlyJSONEncoder)


# Views


def get_3d(request):
    return render(request, "Ckt3d.html")


def simulate_custom_circuit(request):
    try:
        circuit_json = json.loads(request.body)

        if "circuit_data" not in circuit_json:
            raise ValueError("Invalid JSON payload. Missing 'circuit_data' key.")

        circuit_data_str = circuit_json["circuit_data"]
        circuit_data = json.loads(circuit_data_str)

        if "circuit" not in circuit_data:
            raise ValueError("Invalid JSON payload. Missing 'circuit' key.")

        # Create and simulate the circuit
        circuit = create_circuit_from_json(circuit_data)
        result = simulate_circuit(circuit)

        # Extract state vector and generate plots
        state_vector = result.final_state_vector
        num_qubits = int(np.log2(len(state_vector)))

        state_list = [
            {
                "index": i,
                "binary": f"{i:0{num_qubits}b}",
                "magnitude": float(abs(amplitude)),
                "phase": float(np.angle(amplitude)),
                "probability": float(abs(amplitude) ** 2),
                "real": float(amplitude.real),
                "imag": float(amplitude.imag),
            }
            for i, amplitude in enumerate(state_vector)
        ]

        prob_plot_json = create_probability_plot(state_list)
        phase_plot_json = create_phase_plot(state_list)

        return JsonResponse(
            {
                "state_vector": state_list,
                "circuit": circuit.to_text_diagram(transpose=True),
                "prob_plot": prob_plot_json,
                "phase_plot": phase_plot_json,
            }
        )

    except Exception as e:
        print("Error:", str(e))
        return JsonResponse(
            {"error": str(e), "traceback": traceback.format_exc()}, status=500
        )
