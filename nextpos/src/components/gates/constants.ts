import { Hash, Square, Combine, RotateCw, RotateCcw, Rotate3d, X as XIcon, Circle, ArrowDown, Sigma, Box,Plus } from 'lucide-react';
import { GateDefinition } from '../../types/circuit';

// GateType Enum for strong typing
export enum GateType {
  Hadamard = 'h',
  PauliX = 'x',
  CNOT = 'cnot',
  PhaseRotation = 'rz',
  RotationX = 'rx',
  RotationY = 'ry',
  Swap = 'swap',
  Toffoli = 'ccx',
  ControlledZ = 'cz',
  ControlledY = 'cy',
  ControlledRZ = 'crz',
  Measurement = 'measure',
}

// Centralized color palette
const gateColors = {
  blue: 'blue',
  red: 'red',
  green: 'green',
  cyan: 'cyan',
  magenta: 'magenta',
  purple: 'purple',
  orange: 'orange',
  indigo: 'indigo',
  pink: 'pink',
  teal: 'teal',
  amber: 'amber',
  gray: 'gray',
};

// Gate Icons
export const gateIcons = {
  [GateType.Hadamard]: Hash,
  [GateType.PauliX]: Square,
  [GateType.CNOT]: Combine,
  [GateType.PhaseRotation]: RotateCw,
  [GateType.RotationX]: RotateCcw,
  [GateType.RotationY]: Rotate3d,
  [GateType.Swap]: Plus,
  [GateType.Toffoli]: XIcon,
  [GateType.ControlledZ]: Circle,
  [GateType.ControlledY]: ArrowDown,
  [GateType.ControlledRZ]: Sigma,
  [GateType.Measurement]: Box,
} as const;

// Gate Definitions
export const gates: GateDefinition[] = [
  { id: GateType.Hadamard, name: 'H', icon: gateIcons[GateType.Hadamard], color: gateColors.blue, qubits: 1, description: 'Hadamard Gate: Creates superposition.' },
  { id: GateType.PauliX, name: 'X', icon: gateIcons[GateType.PauliX], color: gateColors.red, qubits: 1, description: 'Pauli-X Gate: Acts like a NOT gate.' },
  { id: GateType.PhaseRotation, name: 'RZ', icon: gateIcons[GateType.PhaseRotation], color: gateColors.green, qubits: 1, description: 'Phase Rotation Gate: Rotates qubit state around Z-axis.' },
  { id: GateType.RotationX, name: 'RX', icon: gateIcons[GateType.RotationX], color: gateColors.cyan, qubits: 1, description: 'RX Gate: Rotates qubit state around X-axis.' },
  { id: GateType.RotationY, name: 'RY', icon: gateIcons[GateType.RotationY], color: gateColors.magenta, qubits: 1, description: 'RY Gate: Rotates qubit state around Y-axis.' },
  { id: GateType.CNOT, name: 'CNOT', icon: gateIcons[GateType.CNOT], color: gateColors.purple, qubits: 2, controlPoints: 1, description: 'Controlled-NOT Gate.' },
  { id: GateType.Swap, name: 'SWAP', icon: gateIcons[GateType.Swap], color: gateColors.orange, qubits: 2, description: 'Swaps states of two qubits.' },
  { id: GateType.ControlledZ, name: 'CZ', icon: gateIcons[GateType.ControlledZ], color: gateColors.indigo, qubits: 2, controlPoints: 1, description: 'Controlled-Z Gate.' },
  { id: GateType.ControlledY, name: 'CY', icon: gateIcons[GateType.ControlledY], color: gateColors.pink, qubits: 2, controlPoints: 1, description: 'Controlled-Y Gate.' },
  { id: GateType.ControlledRZ, name: 'CRZ', icon: gateIcons[GateType.ControlledRZ], color: gateColors.teal, qubits: 2, controlPoints: 1, description: 'Controlled-RZ Gate.' },
  { id: GateType.Toffoli, name: 'CCX', icon: gateIcons[GateType.Toffoli], color: gateColors.amber, qubits: 3, controlPoints: 2, description: 'Toffoli Gate: Controlled-Controlled-NOT.' },
  { id: GateType.Measurement, name: 'Measure', icon: gateIcons[GateType.Measurement], color: gateColors.gray, qubits: 1, description: 'Measures qubit state.' },
];
