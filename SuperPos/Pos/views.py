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


@api_view(["POST"])
def run_fault_tolerance(request):
    try:
        data = request.data
        result = quantum.process_fault_tolerance(data)
        return Response(result)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def rsa_generate_keys(request):
    """Generate RSA keys."""
    n, e, d = crypto.generate_rsa_keypair()
    return Response({"n": n, "e": e, "d": d})


@api_view(["POST"])
def rsa_encrypt(request):
    """Encrypt a message using RSA."""
    try:
        data = request.data
        message = data.get("message")
        n = int(data.get("n"))
        e = int(data.get("e"))
        encrypted_message = crypto.encrypt_message(message, e, n)
        return Response({"encrypted_message": encrypted_message})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def rsa_decrypt(request):
    """Decrypt a message using Shor's algorithm (simulated)."""
    try:
        data = request.data
        encrypted_message = data.get("encrypted_message")
        n = int(data.get("n"))
        e = int(data.get("e"))

        p, q = crypto.factor_n(n)
        if p is None:
            return Response(
                {"error": "Failed to factor n"}, status=status.HTTP_400_BAD_REQUEST
            )

        phi = (p - 1) * (q - 1)
        d = crypto.mod_inverse(e, phi)
        decrypted_message = crypto.decrypt_message(encrypted_message, d, n)
        return Response({"decrypted_message": decrypted_message})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
        shots = data.get("shots", 100)
        noise_model = data.get("noise_model", "ideal")

        if n <= 1:
            return Response(
                {"error": "Number must be greater than 1"},
                status=status.HTTP_400_BAD_REQUEST,
            )

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


@api_view(["POST"])
def chat(request):
    try:
        input_message = request.data.get("message", "").strip()
        response_text, error = ai.get_chat_response(input_message)

        if error:
            if error == "No message provided":
                return Response(
                    {"error": "No message provided"}, status=status.HTTP_400_BAD_REQUEST
                )
            return Response(
                {"error": f"Failed to generate a response: {error}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response({"response": response_text})
    except Exception as e:
        return Response(
            {"error": f"Failed to generate a response: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


def get_3d(request):
    """Legacy view for 36D circuit visualization."""
    return render(request, "Ckt3d.html")


@api_view(["POST"])
def simulate_custom_circuit(request):
    try:
        circuit_json = request.data
        if "circuit_data" not in circuit_json:
            raise ValueError("Invalid JSON payload. Missing 'circuit_data' key.")

        circuit_data_str = circuit_json["circuit_data"]
        circuit_data = json.loads(circuit_data_str)

        if "circuit" not in circuit_data:
            raise ValueError("Invalid JSON payload. Missing 'circuit' key.")

        # Create and simulate the circuit
        circuit = quantum.create_circuit_from_json(circuit_data)
        result = quantum.simulate_circuit(circuit)

        # Extract state vector
        state_vector = result.final_state_vector
        num_qubits = int(np.log2(max(len(state_vector), 1)))

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

        # 3D visualization handling
        try:
            ckt = cirq_web.Circuit3D(circuit)
            templates_dir = os.path.join(settings.BASE_DIR, "Pos", "templates")
            os.makedirs(templates_dir, exist_ok=True)

            html_file = ckt.generate_html_file(output_directory=templates_dir)
            destination_file = os.path.join(templates_dir, "Ckt3d.html")

            with open(html_file, "r", encoding="utf-8") as f:
                html_content = f.read()

            # Full template with custom styling
            template = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quantum Circuit Documentation</title>
    <style>
        :root {{
            --background: 222.2 84% 4.9%;
            --foreground: 210 40% 98%;
            --card: 222.2 84% 4.9%;
            --card-foreground: 210 40% 98%;
            --primary: 217.2 91.2% 59.8%;
            --secondary: 217.2 32.6% 17.5%;
            --muted: 217.2 32.6% 17.5%;
            --muted-foreground: 215 20.2% 65.1%;
            --accent: 217.2 32.6% 17.5%;
            --border: 217.2 32.6% 17.5%;
            --radius: 0.5rem;
        }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
            margin: 0; padding: 0;
        }}
        .container {{ max-width: 80rem; margin: 0 auto; padding: 2rem; }}
        .base {{ display: flex; gap: 2rem; width: 100%; margin-bottom: 2rem; }}
        .model, .documentation {{ flex: 1; background-color: hsl(var(--card)); border-radius: var(--radius); padding: 1.5rem; border: 1px solid hsl(var(--border)); }}
        h2 {{ color: hsl(var(--primary)); font-size: 1.5rem; margin-top: 0; }}
        pre {{ background-color: hsl(var(--secondary)); padding: 1rem; border-radius: var(--radius); overflow-x: auto; font-family: monospace; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="base">
            <div class="model">
                <h2>Model Content</h2>
                {html_content}
            </div>
            <div class="documentation">
                <h2>Technical Documentation</h2>
                <p>Circuit diagram and state vector information are generated dynamically from the simulation kernel.</p>
                <h3>Gate Set Applied:</h3>
                <pre>{circuit.to_text_diagram(transpose=True)}</pre>
            </div>
        </div>
    </div>
</body>
</html>"""
            with open(destination_file, "w", encoding="utf-8") as f:
                f.write(template)
        except Exception as sim_err:
            print(f"3D Generation Error: {sim_err}")

        return Response(
            {
                "state_vector": state_list,
                "circuit": circuit.to_text_diagram(transpose=True),
                "prob_plot": prob_plot_json,
                "phase_plot": phase_plot_json,
            }
        )

    except Exception as e:
        return Response(
            {"error": str(e), "traceback": traceback.format_exc()},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
