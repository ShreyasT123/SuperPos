import React, { useState } from 'react';
import { GateDefinition } from '../../types/circuit';
import { AngleInput } from '../gates/AngleInput';
import { GateGroup } from '../gates/GateGroup';
import { useGateGroups } from '../gates/useGateGroup';

export const GatesPalette: React.FC = () => {
  const [angle, setAngle] = useState<number>(0);
  const groupedGates = useGateGroups();

  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAngle(Number(e.target.value));
  };

  const handleDragStart = (e: React.DragEvent, gate: GateDefinition) => {
    if (gate.id === 'rz' || gate.id === 'rx' || gate.id === 'ry' || gate.id === 'crz') {
      if (angle === 0) {
        alert('Please specify an angle for the gate');
        e.preventDefault();
        return;
      }
      gate.defaultParams = { angle };
    }
    e.dataTransfer.setData('gate', JSON.stringify(gate));
  };

  return (
    <div className="p-4 bg-black/50 border border-cyan-500/20 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-500">
        Quantum Gates
      </h3>

      {/* Angle Input */}
      <AngleInput angle={angle} onChange={handleAngleChange} />

      {/* Gate Groups */}
      {Object.keys(groupedGates).map((key) => (
        <GateGroup
          key={key}
          title={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize first letter
          gates={groupedGates[key]}
          onDragStart={handleDragStart}
        />
      ))}
    </div>
  );
};
