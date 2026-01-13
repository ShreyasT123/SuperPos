import json
import traceback
import cirq
import cirq_web
import plotly
from plotly import graph_objs as go
from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import os
import numpy as np
from django.conf import settings

# Import services
from .services import quantum, crypto, ai
from .serializers import FactorInputSerializer

# Configure AI
ai.configure_genai(os.environ.get("GENERATIVEAI_API_KEY"))


@csrf_exempt
def run_fault_tolerance(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = quantum.process_fault_tolerance(data)
            return JsonResponse(result)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)


@csrf_exempt
def rsa_generate_keys(request):
    """Generate RSA keys."""
    n, e, d = crypto.generate_rsa_keypair()
    return JsonResponse({"n": n, "e": e, "d": d})


@csrf_exempt
def rsa_encrypt(request):
    """Encrypt a message using RSA."""
    try:
        data = json.loads(request.body)
        message = data.get("message")
        n = int(data.get("n"))
        e = int(data.get("e"))
        encrypted_message = crypto.encrypt_message(message, e, n)
        return JsonResponse({"encrypted_message": encrypted_message})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def rsa_decrypt(request):
    """Decrypt a message using Shor's algorithm (simulated)."""
    try:
        data = json.loads(request.body)
        encrypted_message = data.get("encrypted_message")
        n = int(data.get("n"))
        e = int(data.get("e"))

        p, q = crypto.factor_n(n)
        if p is None:
            return JsonResponse({"error": "Failed to factor n"}, status=400)

        phi = (p - 1) * (q - 1)
        d = crypto.mod_inverse(e, phi)
        decrypted_message = crypto.decrypt_message(encrypted_message, d, n)
        return JsonResponse({"decrypted_message": decrypted_message})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


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
            return Response(
                {"error": "Number must be greater than 1"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Execute factoring algorithm
        result = quantum.factor_number(
            n, use_quantum=use_quantum, shots=shots, noise_model=noise_model
        )

        return Response(result)

    except ValueError:
        return Response(
            {"error": "Invalid input. Please provide a valid integer."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def chat(request):
    if request.method == "POST":
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body)
            input_message = data.get("message", "").strip()

            response_text, error = ai.get_chat_response(input_message)

            if error:
                if error == "No message provided":
                    return HttpResponseBadRequest("No message provided")
                return JsonResponse(
                    {"error": f"Failed to generate a response: {error}"}, status=500
                )

            return JsonResponse({"response": response_text})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse(
                {"error": f"Failed to generate a response: {str(e)}"}, status=500
            )
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=400)


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
        circuit = quantum.create_circuit_from_json(circuit_data)
        result = quantum.simulate_circuit(circuit)

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

        prob_plot_json = quantum.create_probability_plot(state_list)
        phase_plot_json = quantum.create_phase_plot(state_list)

        # Generate the 3D visualization
        ckt = cirq_web.Circuit3D(circuit)

        # Use dynamic path from settings
        templates_dir = os.path.join(settings.BASE_DIR, "Pos", "templates")
        os.makedirs(templates_dir, exist_ok=True)

        html_file = ckt.generate_html_file(output_directory=templates_dir)

        destination_file = os.path.join(templates_dir, "Ckt3d.html")

        # Note: cirq_web generates a file with a timestamp/random name, we might need to rename it
        # or just rely on the fact that we render "Ckt3d.html" in get_3d.
        # The previous code was overwriting Ckt3d.html with custom styling.
        # Let's replicate that logic but using safe paths.

        with open(html_file, "r") as f:
            html = f.readlines()

        # Write to the specific Ckt3d.html that get_3d renders
        with open(destination_file, "w+", encoding="utf-8") as f:
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
