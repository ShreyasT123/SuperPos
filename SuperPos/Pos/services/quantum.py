import random
import cirq
import cirq_web
import fractions
import math
import sympy
import os
import json
import plotly
from plotly import graph_objs as go
import numpy as np
from typing import Optional, Callable


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


def make_order_finding_circuit(
    x: int, n: int, shots: int = 100, noise_model: str = "ideal"
) -> cirq.Circuit:
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


def quantum_order_finder(
    x: int, n: int, shots: int = 100, noise_model: str = "ideal"
) -> Optional[int]:
    """Computes smallest positive r such that x**r mod n == 1 using quantum circuit simulation."""
    if x < 2 or n <= x or math.gcd(x, n) > 1:
        raise ValueError(f"Invalid x={x} for modulus n={n}.")

    # Create the order finding circuit
    circuit = make_order_finding_circuit(x, n, shots, noise_model)

    # Simulate the quantum circuit with specified shots
    simulator = cirq.Simulator()
    result = simulator.run(circuit, repetitions=shots)

    return process_measurement(result, x, n)


def classical_order_finder(
    x: int, n: int, shots: int = 100, noise_model: str = "ideal"
) -> Optional[int]:
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


def factor_number(
    n: int, use_quantum: bool = False, shots: int = 100, noise_model: str = "ideal"
):
    """Factor a number using either classical or quantum algorithm."""
    if n <= 1:
        return {"error": "Input must be greater than 1"}

    if sympy.isprime(n):
        return {"result": "prime", "factors": [n]}

    # Choose the order finder based on the requested algorithm
    # Note: classical_order_finder signature needs to match quantum one or be wrapped if we use the lambda below consistently
    # The original code extracted order_finder and then wrapped it in a lambda inside find_factor.

    # Correct approach:
    # If use_quantum is True, we use quantum_order_finder.
    # If False, classical_order_finder.
    # But classical_order_finder doesn't take shots/noise_model in original, but let's make it consistent.
    # I added shots/noise_model to classical_order_finder signature to match usage.

    order_finder_func = quantum_order_finder if use_quantum else classical_order_finder

    # Find first factor
    p = find_factor(
        n, order_finder=lambda x, n: order_finder_func(x, n, shots, noise_model)
    )

    if p is None:
        return {"error": "Failed to find factors"}

    q = n // p

    # Check if the factors are prime, if not, factor them recursively
    factors = []
    for factor in [p, q]:
        if sympy.isprime(factor):
            factors.append(factor)
        else:
            subfactors = factor_number(
                factor, use_quantum=use_quantum, shots=shots, noise_model=noise_model
            )
            if "factors" in subfactors:
                factors.extend(subfactors["factors"])

    return {"result": "composite", "factors": sorted(factors)}


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
    return circuit


def process_fault_tolerance(data):
    num_qubits = data.get("num_qubits", 3)
    errors = data.get("errors", [])
    protocol = data.get("protocol", "non_ft")
    syndrome_rounds = data.get("syndrome_rounds", 3)
    meas_error_prob = data.get("measurement_error_prob", 0.0)

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

    circuit.append(cirq.measure(*qubits, key="result"))
    explanation.append("Added measurement gates to all qubits.")

    circuit_text = str(circuit)  # Cirq's built-in textual representation
    explanation.append("Circuit constructed successfully.")

    simulator = cirq.Simulator()
    result = simulator.run(circuit, repetitions=1)
    ideal_meas = result.measurements["result"][0].tolist()
    explanation.append(f"Ideal measurement result: {ideal_meas}")

    final_meas = ideal_meas
    if protocol == "ft":
        explanation.append(
            f"Protocol: Fault Tolerant with {syndrome_rounds} syndrome rounds."
        )
        rounds_results = []
        for _ in range(syndrome_rounds):
            noisy_round = [
                1 - bit if random.random() < meas_error_prob else bit
                for bit in ideal_meas
            ]
            rounds_results.append(noisy_round)
        explanation.append(f"Noisy syndrome rounds: {rounds_results}")

        final_meas = [
            (
                1
                if sum([rounds_results[r][q] for r in range(syndrome_rounds)])
                > syndrome_rounds / 2
                else 0
            )
            for q in range(num_qubits)
        ]
        explanation.append(f"Final measurement after majority vote: {final_meas}")

    sum_meas = sum(final_meas)
    corrected_state = (
        None
        if num_qubits % 2 == 0 and sum_meas == num_qubits // 2
        else (1 if sum_meas > num_qubits / 2 else 0)
    )
    explanation.append(
        f"Corrected logical bit: {corrected_state if corrected_state is not None else 'Ambiguous (Tie)'}"
    )

    success = corrected_state == secret if corrected_state is not None else False
    explanation.append(
        "Fault tolerance successful!" if success else "Fault tolerance failed."
    )

    return {
        "secret": secret,
        "ideal_measurement": ideal_meas,
        "final_measurement": final_meas,
        "corrected_state": corrected_state,
        "success": success,
        "explanation": explanation,
        "circuit_text": circuit_text,
        "syndromeRounds": syndrome_rounds,
    }


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
