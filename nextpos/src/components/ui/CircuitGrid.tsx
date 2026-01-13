import React, { useState } from 'react';
import { Gate, GateDefinition } from '../../types/circuit';
import { CircuitCell } from './CircuitCell';
import { CircuitConnections } from './CircuitConnections';

interface CircuitGridProps {
  qubits: number;
  steps: number;
  circuit: Gate[];
  onGateAdd: (gate: Gate) => void;
}

export const CircuitGrid: React.FC<CircuitGridProps> = ({
  qubits,
  steps,
  circuit,
  onGateAdd,
}) => {
  const [selectedCells, setSelectedCells] = useState<{ qubit: number; step: number }[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (qubit: number, step: number, e: React.DragEvent) => {
    e.preventDefault();
    const gateData = e.dataTransfer.getData('gate');
    const gate: GateDefinition = JSON.parse(gateData);

    if (gate.qubits === 1) {
      // Single qubit gate
      onGateAdd({
        type: gate.id,
        targets: [qubit],
        controls: [],
        step,
        params: gate.defaultParams,
      });
      setSelectedCells([]);
    } else if (gate.id.toLowerCase() === 'cnot') {
      if (selectedCells.length === 0) {
        // First drop - select control qubit
        setSelectedCells([{ qubit, step }]);
      } else if (selectedCells.length === 1 && selectedCells[0].step === step) {
        // Second drop - add target qubit and create gate
        const controlQubit = selectedCells[0].qubit;
        if (controlQubit !== qubit) {
          onGateAdd({
            type: gate.id,
            controls: [controlQubit],
            targets: [qubit],
            step,
            params: gate.defaultParams,
          });
          setSelectedCells([]);
        } else {
          alert('Control and target qubits must be different');
        }
      } else {
        // Reset if steps don't match
        setSelectedCells([{ qubit, step }]);
      }
    } else if (gate.id.toLowerCase() === 'ccx') {
      if (selectedCells.length < 2) {
        // First or second drop - select control qubits
        setSelectedCells([...selectedCells, { qubit, step }]);
      } else if (selectedCells.length === 2 && selectedCells[0].step === step && selectedCells[1].step === step) {
        // Third drop - add target qubit and create gate
        const controlQubits = selectedCells.map(cell => cell.qubit);
        if (!controlQubits.includes(qubit)) {
          onGateAdd({
            type: gate.id,
            controls: controlQubits,
            targets: [qubit],
            step,
            params: gate.defaultParams,
          });
          setSelectedCells([]);
        } else {
          alert('Control and target qubits must be different');
        }
      } else {
        // Reset if steps don't match
        setSelectedCells([{ qubit, step }]);
      }
    } else if (gate.qubits === 2) {
      // Other two-qubit gates
      if (selectedCells.length === 0) {
        setSelectedCells([{ qubit, step }]);
      } else if (selectedCells.length === 1 && selectedCells[0].step === step) {
        const firstQubit = selectedCells[0].qubit;
        if (firstQubit !== qubit) {
          onGateAdd({
            type: gate.id,
            controls: gate.controlPoints ? [firstQubit] : [],
            targets: gate.controlPoints ? [qubit] : [firstQubit, qubit],
            step,
            params: gate.defaultParams,
          });
          setSelectedCells([]);
        }
      } else {
        setSelectedCells([{ qubit, step }]);
      }
    }
  };

  const getGateAtPosition = (qubit: number, step: number) => {
    return circuit.find(
      (gate) =>
        (gate.targets?.includes(qubit) || gate.controls?.includes(qubit)) &&
        gate.step === step
    );
  };

  return (
    <div className="relative border border-cyan-500/20 rounded-lg overflow-hidden bg-black/30">
      {Array.from({ length: qubits }).map((_, qubit) => (
        <div key={qubit} className="flex">
          <div className="w-20 bg-black/50 flex items-center justify-center border-r border-b border-cyan-500/20">
            <span className="text-sm font-medium text-gray-300">q[{qubit}]</span>
          </div>
          <div className="flex flex-1">
            {Array.from({ length: steps }).map((_, step) => (
              <CircuitCell
                key={step}
                qubit={qubit}
                step={step}
                gate={getGateAtPosition(qubit, step)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(qubit, step, e)}
                isSelected={selectedCells.some(
                  (cell) => cell.qubit === qubit && cell.step === step
                )}
              />
            ))}
          </div>
        </div>
      ))}
      <CircuitConnections circuit={circuit} />
    </div>
  );
};