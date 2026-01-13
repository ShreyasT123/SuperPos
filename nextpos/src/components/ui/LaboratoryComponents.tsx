'use client'

import React, { createContext, useContext, useState, useMemo } from 'react';
import {
    Code, Hash, Square, Combine,
    RotateCw, RotateCcw, Rotate3d, X as XIcon, Circle,
    ArrowDown, Sigma, Box, Plus
} from 'lucide-react';
import Plot from 'react-plotly.js';
import { Gate, GateDefinition, GateType } from '../../types/circuit';
import { transformCircuit } from '../../utils/circuitTransformer';

// --- TYPES & CONSTANTS ---

export enum GateTypeEnum {
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

export const gateIcons = {
    [GateTypeEnum.Hadamard]: Hash,
    [GateTypeEnum.PauliX]: Square,
    [GateTypeEnum.CNOT]: Combine,
    [GateTypeEnum.PhaseRotation]: RotateCw,
    [GateTypeEnum.RotationX]: RotateCcw,
    [GateTypeEnum.RotationY]: Rotate3d,
    [GateTypeEnum.Swap]: Plus,
    [GateTypeEnum.Toffoli]: XIcon,
    [GateTypeEnum.ControlledZ]: Circle,
    [GateTypeEnum.ControlledY]: ArrowDown,
    [GateTypeEnum.ControlledRZ]: Sigma,
    [GateTypeEnum.Measurement]: Box,
} as const;

export const gates: GateDefinition[] = [
    { id: 'h' as GateType, name: 'H', icon: Hash, color: 'white', qubits: 1, description: 'Hadamard Gate: Creates superposition.' },
    { id: 'x' as GateType, name: 'X', icon: Square, color: 'white', qubits: 1, description: 'Pauli-X Gate: Acts like a NOT gate.' },
    { id: 'rz' as GateType, name: 'RZ', icon: RotateCw, color: 'white', qubits: 1, description: 'Phase Rotation Gate: Rotates qubit state around Z-axis.' },
    { id: 'rx' as GateType, name: 'RX', icon: RotateCcw, color: 'white', qubits: 1, description: 'RX Gate: Rotates qubit state around X-axis.' },
    { id: 'ry' as GateType, name: 'RY', icon: Rotate3d, color: 'white', qubits: 1, description: 'RY Gate: Rotates qubit state around Y-axis.' },
    { id: 'cnot' as GateType, name: 'CNOT', icon: Combine, color: 'white', qubits: 2, controlPoints: 1, description: 'Controlled-NOT Gate.' },
    { id: 'swap' as GateType, name: 'SWAP', icon: Plus, color: 'white', qubits: 2, description: 'Swaps states of two qubits.' },
    { id: 'cz' as GateType, name: 'CZ', icon: Circle, color: 'white', qubits: 2, controlPoints: 1, description: 'Controlled-Z Gate.' },
    { id: 'cy' as GateType, name: 'CY', icon: ArrowDown, color: 'white', qubits: 2, controlPoints: 1, description: 'Controlled-Y Gate.' },
    { id: 'crz' as GateType, name: 'CRZ', icon: Sigma, color: 'white', qubits: 2, controlPoints: 1, description: 'Controlled-RZ Gate.' },
    { id: 'ccx' as GateType, name: 'CCX', icon: XIcon, color: 'white', qubits: 3, controlPoints: 2, description: 'Toffoli Gate: Controlled-Controlled-NOT.' },
    { id: 'measure' as GateType, name: 'Measure', icon: Box, color: 'white', qubits: 1, description: 'Measures qubit state.' },
];

// --- CONTEXT ---

interface SimulatorContextType {
    circuit: Gate[];
    qubits: number;
    steps: number;
    simResults: any;
    setCircuit: React.Dispatch<React.SetStateAction<Gate[]>>;
    setQubits: React.Dispatch<React.SetStateAction<number>>;
    setSteps: React.Dispatch<React.SetStateAction<number>>;
    setSimResults: React.Dispatch<React.SetStateAction<any>>;
    handleGateAdd: (newGate: Gate) => void;
    handleStepsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleQubitsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSimulationResults: (results: any) => void;
    handleGateRemove: (gate: Gate) => void;
}

const SimulatorContext = createContext<SimulatorContextType | undefined>(undefined);

export const SimulatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [circuit, setCircuit] = useState<Gate[]>([]);
    const [qubits, setQubits] = useState(3);
    const [steps, setSteps] = useState(8);
    const [simResults, setSimResults] = useState<any>(null);

    const handleGateAdd = (newGate: Gate) => setCircuit([...circuit, newGate]);
    const handleStepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(10, Math.max(1, parseInt(e.target.value) || 1));
        setSteps(value);
        setCircuit([]);
    };
    const handleQubitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setQubits(value);
        setCircuit([]);
    };
    const handleSimulationResults = (results: any) => setSimResults(results);
    const handleGateRemove = (gateToRemove: Gate) => {
        setCircuit(prev => prev.filter(g => g !== gateToRemove));
    };
    return (
        <SimulatorContext.Provider value={{
            circuit, qubits, steps, simResults,
            setCircuit, setQubits, setSteps, setSimResults,
            handleGateAdd, handleStepsChange, handleQubitsChange, handleSimulationResults, handleGateRemove
        }}>
            {children}
        </SimulatorContext.Provider>
    );
};

export const useSimulator = () => {
    const context = useContext(SimulatorContext);
    if (!context) throw new Error('useSimulator must be used within a SimulatorProvider');
    return context;
};

// --- RESKINNED SUB-COMPONENTS ---

// 1. AngleInput (Hardware Parameter Style)
export const AngleInput: React.FC<{ angle: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ angle, onChange }) => (
    <div className="mb-8 p-6 bg-white/[0.02] border border-white/5 rounded-[32px] hover:border-white/10 transition-colors group">
        <label className="block text-[7px] font-mono uppercase tracking-[0.4em] text-zinc-600 mb-3 group-hover:text-zinc-400 transition-colors">
            Rotation_Angle (RAD)
        </label>
        <input
            type="number"
            value={angle}
            onChange={onChange}
            step="0.1"
            className="w-full bg-transparent border-b border-white/5 py-2 font-mono text-xl focus:border-white/30 outline-none transition-all placeholder:text-zinc-800"
            placeholder="0.0"
        />
    </div>
);
// 3. GateGroup
export const GateGroup: React.FC<{ title: string; gates: GateDefinition[]; onDragStart: (e: React.DragEvent, gate: GateDefinition) => void }> = ({ title, gates, onDragStart }) => (
    <div className="mb-10">
        <h4 className="text-[9px] font-mono tracking-[0.4em] text-zinc-600 uppercase mb-4 border-b border-white/5 pb-2">{title}</h4>
        <div className="grid grid-cols-2 gap-3">
            {gates.map((gate) => <GateButton key={gate.id} gate={gate} onDragStart={onDragStart} />)}
        </div>
    </div>
);
// Updated GateButton with much higher opacity
export const GateButton: React.FC<{ gate: GateDefinition; onDragStart: (e: React.DragEvent, gate: GateDefinition) => void }> = ({ gate, onDragStart }) => {
    const Icon = gate.icon;

    const internalOnDragStart = (e: React.DragEvent) => {
        e.dataTransfer.effectAllowed = "move";
        onDragStart(e, gate);
    };

    return (
        /* Outer wrapper allows tooltip to pop out */
        <div className="relative group">

            {/* 1. THE TOOLTIP (Restored & Matched) */}
            <div className="
                absolute z-[200] bottom-full left-1/2 -translate-x-1/2 mb-3 
                px-3 py-2 rounded-lg pointer-events-none
                bg-zinc-950/90 border border-white/10 backdrop-blur-xl
                opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300
                shadow-[0_10px_30px_rgba(0,0,0,0.8)]
                min-w-[120px] text-center
            ">
                <p className="text-[8px] font-mono leading-tight uppercase tracking-tighter text-zinc-400">
                    {gate.description}
                </p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-8 border-transparent border-t-zinc-950/90" />
            </div>

            {/* 2. THE BUTTON (Using panel-glass styles) */}
            {/* The overflow-hidden wrapper remains to fix the "drag artifact" bug */}
            <div className="overflow-hidden rounded-2xl">
                <div
                    draggable
                    onDragStart={internalOnDragStart}
                    className="
                        relative h-20 w-full flex flex-col items-center justify-center gap-2
                        cursor-grab active:cursor-grabbing transition-all duration-500
                        /* THE FIX: Applying panel-glass and config-field hover logic */
                        panel-glass rounded-2xl
                        hover:border-white/20 hover:bg-white/[0.04]
                    "
                >
                    <Icon className="w-5 h-5 opacity-30 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500" />

                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-500 group-hover:text-white transition-colors">
                        {gate.name}
                    </span>

                    {/* Technical hardware detail (small dot) */}
                    <div className="absolute bottom-2 w-1 h-1 rounded-full bg-white/5 group-hover:bg-white/20 transition-colors" />
                </div>
            </div>
        </div>
    );
};
export const GatesPalette: React.FC = () => {
    const { qubits, steps, handleQubitsChange, handleStepsChange } = useSimulator();
    const [angle, setAngle] = useState<number>(0);

    const groupedGates = useMemo(() => {
        return gates.reduce((acc, gate) => {
            const key = gate.qubits === 1 ? 'Single_Qubit' : gate.qubits === 2 ? 'Two_Qubit' : 'Multi_Qubit';
            if (!acc[key]) acc[key] = [];
            acc[key].push(gate);
            return acc;
        }, {} as Record<string, GateDefinition[]>);
    }, []);

    return (
        <div className="flex flex-col h-full max-h-[calc(100vh-250px)] overflow-y-auto pr-4 lab-scroll">

            {/* 1. CONFIGURATION SECTION (Now inside the scroll) */}
            <div className="mb-10 space-y-4">
                <h4 className="text-[9px] font-mono tracking-[0.4em] text-white/60 uppercase mb-4 border-b border-white/5 pb-2 text-glow">
                    Configuration
                </h4>
                <div className="grid grid-cols-2 gap-3">
                    <div className="panel-glass p-4 rounded-2xl group hover:border-white/20 transition-all">
                        <label className="block text-[7px] font-mono text-zinc-500 uppercase mb-2">Qubits</label>
                        <input type="number" value={qubits} onChange={handleQubitsChange} className="w-full bg-transparent font-mono text-lg outline-none" />
                    </div>
                    <div className="panel-glass p-4 rounded-2xl group hover:border-white/20 transition-all">
                        <label className="block text-[7px] font-mono text-zinc-500 uppercase mb-2">Steps</label>
                        <input type="number" value={steps} onChange={handleStepsChange} className="w-full bg-transparent font-mono text-lg outline-none" />
                    </div>
                </div>

                {/* Angle Input moved here too */}
                <div className="panel-glass p-4 rounded-2xl group hover:border-white/20 transition-all">
                    <label className="block text-[7px] font-mono text-zinc-500 uppercase mb-2">Rotation_Angle (RAD)</label>
                    <input
                        type="number" value={angle}
                        onChange={(e) => setAngle(Number(e.target.value))}
                        step="0.1"
                        className="w-full bg-transparent font-mono text-lg outline-none"
                    />
                </div>
            </div>

            {/* 2. GATE GROUPS */}
            {Object.keys(groupedGates).map((key) => (
                <div key={key} className="mb-10">
                    <h4 className="text-[9px] font-mono tracking-[0.4em] text-zinc-500 uppercase mb-4 border-b border-white/5 pb-2">
                        {key}
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                        {groupedGates[key].map((gate) => (
                            <GateButton key={gate.id} gate={gate} onDragStart={(e) => {
                                if (['rz', 'rx', 'ry', 'crz'].includes(gate.id) && angle === 0) {
                                    alert('Specify Angle'); e.preventDefault(); return;
                                }
                                gate.defaultParams = { angle };
                                e.dataTransfer.setData('gate', JSON.stringify(gate));
                            }} />
                        ))}
                    </div>
                </div>
            ))}

            {/* End of Stream Decoration */}
            <div className="py-20 flex flex-col items-center gap-4 opacity-10">
                <div className="w-[1px] h-12 bg-white" />
                <span className="font-mono text-[7px] uppercase tracking-[1em]">EOF_INVENTORY</span>
            </div>
        </div>
    );
};
// 5. CircuitCell (Updated with Deletion Logic)
export const CircuitCell: React.FC<{
    qubit: number;
    step: number;
    gate: Gate | undefined;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    isSelected: boolean;
    onRemove: (gate: Gate) => void; // <--- Prop for removal
}> = ({ gate, onDragOver, onDrop, isSelected, onRemove }) => {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`
                w-20 h-20 border-r border-b border-white/[0.03] flex items-center justify-center relative group/cell transition-colors
                ${isSelected ? 'bg-white/[0.05]' : 'hover:bg-white/[0.01]'}
            `}
            onDragOver={(e) => { onDragOver(e); setIsHovered(true); }}
            onDragLeave={() => setIsHovered(false)}
            onDrop={(e) => { onDrop(e); setIsHovered(false); }}

            // Allow Right-Click anywhere in the cell if it's crowded
            onContextMenu={(e) => {
                if (gate) {
                    e.preventDefault();
                    onRemove(gate);
                }
            }}
        >
            {/* Drafting Line */}
            <div className="absolute w-full h-[1px] bg-white/[0.07] z-0" />

            {/* Gate Box */}
            <div
                className={`
                    w-14 h-14 z-10 rounded-xl border flex items-center justify-center transition-all duration-300
                    ${gate
                        ? 'bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.4)] cursor-pointer hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]'
                        : 'border-dashed border-white/10 opacity-10 group-hover/cell:opacity-40 group-hover/cell:border-white/30'}
                    ${isHovered && !gate ? 'scale-110 opacity-100 bg-white/5 border-solid' : ''}
                `}
                // Right Click to Delete
                onContextMenu={(e) => {
                    if (gate) {
                        e.preventDefault(); // Stop browser menu
                        onRemove(gate);     // Delete gate
                    }
                }}
                // Double Click to Delete (Alternative for trackpads)
                onDoubleClick={(e) => {
                    if (gate) onRemove(gate);
                }}
            >
                {gate ? (
                    <span className="text-[14px] font-mono font-bold tracking-tighter">
                        {gate.type.toUpperCase()}
                    </span>
                ) : (
                    <Plus size={10} />
                )}
            </div>
        </div>
    );
};


// 6. CircuitConnections (Dynamic Hardware Wiring)
export const CircuitConnections: React.FC<{ circuit: Gate[] }> = ({ circuit }) => {
    const cellSize = 80;
    const leftOffset = 80;

    return (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {circuit.map((gate, idx) => {
                // Collect all involved qubits for this gate
                const controls = gate.controls || [];
                const targets = gate.targets || [];
                const allInvolvedQubits = [...controls, ...targets];

                // Only draw lines for multi-qubit gates
                if (allInvolvedQubits.length < 2) return null;

                const step = gate.step;
                const x = leftOffset + step * cellSize + cellSize / 2;

                // Calculate the vertical span of the connection
                const minY = Math.min(...allInvolvedQubits) * cellSize + cellSize / 2;
                const maxY = Math.max(...allInvolvedQubits) * cellSize + cellSize / 2;

                return (
                    <g key={idx} className="opacity-80">
                        {/* 1. Draw the vertical backbone connecting the qubits */}
                        <line
                            x1={x} y1={minY}
                            x2={x} y2={maxY}
                            stroke="white"
                            strokeWidth="1"
                            strokeDasharray={gate.type === 'swap' ? "4,4" : "0"}
                        />

                        {/* 2. Draw Control Dots */}
                        {controls.map(q => (
                            <circle key={`ctrl-${q}`} cx={x} cy={q * cellSize + cellSize / 2} r="3" fill="white" className="text-glow" />
                        ))}

                        {/* 3. Draw Target Symbols based on Gate Type */}
                        {targets.map(q => {
                            const y = q * cellSize + cellSize / 2;

                            if (gate.type === 'cnot' || gate.type === 'ccx') {
                                // Target circle for CNOT or Toffoli
                                return (
                                    <g key={`target-${q}`}>
                                        <circle cx={x} cy={y} r="10" stroke="white" strokeWidth="1" fill="none" />
                                        <line x1={x - 6} y1={y} x2={x + 6} y2={y} stroke="white" strokeWidth="1" />
                                        <line x1={x} y1={y - 6} x2={x} y2={y + 6} stroke="white" strokeWidth="1" />
                                    </g>
                                );
                            }

                            if (gate.type === 'swap') {
                                // 'X' marks for SWAP
                                return (
                                    <g key={`target-${q}`}>
                                        <line x1={x - 5} y1={y - 5} x2={x + 5} y2={y + 5} stroke="white" strokeWidth="1.5" />
                                        <line x1={x + 5} y1={y - 5} x2={x - 5} y2={y + 5} stroke="white" strokeWidth="1.5" />
                                    </g>
                                );
                            }

                            return null;
                        })}
                    </g>
                );
            })}
        </svg>
    );
};

// 7. CircuitGrid
export const CircuitGrid: React.FC = () => {
    const { qubits, steps, circuit, handleGateAdd, handleGateRemove } = useSimulator(); // <--- Get handler
    const [selectedCells, setSelectedCells] = useState<{ qubit: number; step: number }[]>([]);
    const handleDragOver = (e: React.DragEvent) => e.preventDefault();

    const handleDrop = (qubit: number, step: number, e: React.DragEvent) => {
        e.preventDefault();
        const gateData = e.dataTransfer.getData('gate');
        if (!gateData) return;
        const gate: GateDefinition = JSON.parse(gateData);

        // 1. Handle Single Qubit Gates
        if (gate.qubits === 1) {
            handleGateAdd({
                type: gate.id,
                targets: [qubit],
                controls: [],
                step,
                params: gate.defaultParams
            });
            setSelectedCells([]);
            return;
        }

        // 2. Handle Multi-Qubit Gates (CNOT, SWAP, CCX, etc.)
        const currentSelection = [...selectedCells];

        // Ensure we are working on the same time step (Column)
        if (currentSelection.length > 0 && currentSelection[0].step !== step) {
            // If user drops on a different column, reset selection to the new column
            setSelectedCells([{ qubit, step }]);
            return;
        }

        // Prevent selecting the same qubit twice for the same multi-qubit gate
        if (currentSelection.some(c => c.qubit === qubit)) return;

        const newSelection = [...currentSelection, { qubit, step }];

        // Check if we have collected enough qubits for this specific gate
        if (newSelection.length === gate.qubits) {
            const qubitsArray = newSelection.map(s => s.qubit);

            // Logic mapping based on gate type
            if (gate.id === 'cnot') {
                handleGateAdd({
                    type: gate.id,
                    controls: [qubitsArray[0]],
                    targets: [qubitsArray[1]],
                    step,
                    params: gate.defaultParams
                });
            } else if (gate.id === 'swap') {
                handleGateAdd({
                    type: gate.id,
                    targets: [qubitsArray[0], qubitsArray[1]],
                    controls: [],
                    step,
                    params: gate.defaultParams
                });
            } else if (gate.id === 'ccx') {
                handleGateAdd({
                    type: gate.id,
                    controls: [qubitsArray[0], qubitsArray[1]],
                    targets: [qubitsArray[2]],
                    step,
                    params: gate.defaultParams
                });
            } else {
                // Fallback for generic multi-qubit gates
                handleGateAdd({
                    type: gate.id,
                    controls: qubitsArray.slice(0, -1),
                    targets: [qubitsArray[qubitsArray.length - 1]],
                    step,
                    params: gate.defaultParams
                });
            }
            setSelectedCells([]); // Clear selection after successful drop
        } else {
            // Still waiting for more qubit drops in this column
            setSelectedCells(newSelection);
        }
    };

    const getGateAtPosition = (qubit: number, step: number) =>
        circuit.find(g => (g.targets?.includes(qubit) || g.controls?.includes(qubit)) && g.step === step);

    return (
        <div className="relative overflow-x-auto scrollbar-hide">
            <div className="min-w-max">
                {Array.from({ length: qubits }).map((_, qubit) => (
                    <div key={qubit} className="flex">
                        <div className="w-20 bg-white/[0.05] flex items-center justify-center border-r border-b border-white/5 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                            q[{qubit}]
                        </div>
                        <div className="flex">
                            {Array.from({ length: steps }).map((_, step) => (
                                <CircuitCell
                                    key={step}
                                    qubit={qubit}
                                    step={step}
                                    gate={getGateAtPosition(qubit, step)}
                                    // Pass the removal logic here
                                    onRemove={handleGateRemove}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(qubit, step, e)}
                                    isSelected={selectedCells.some(c => c.qubit === qubit && c.step === step)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
                <CircuitConnections circuit={circuit} />
            </div>
        </div>
    );
};

// 8. JsonOutput (Glass Code Editor Style)
export const JsonOutput: React.FC = () => {
    const { circuit, qubits, handleSimulationResults } = useSimulator();
    const circuitData = transformCircuit(circuit, qubits);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/superpos/simulate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ circuit_data: JSON.stringify(circuitData) })
            });
            const data = await response.json();
            handleSimulationResults(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-[40px] border border-white/5 bg-zinc-950/20 backdrop-blur-2xl p-10 space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <div className="flex items-center gap-3 opacity-40 font-mono text-[10px] uppercase tracking-widest">
                    <Code size={14} />
                    <span>Source_Definition</span>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-8 py-2 rounded-full border border-white/20 text-[9px] font-mono uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"
                >
                    {loading ? 'Executing...' : 'Run Simulation'}
                </button>
            </div>
            <pre className="font-mono text-[11px] text-zinc-500 leading-relaxed overflow-auto max-h-[300px] scrollbar-hide">
                {JSON.stringify(circuitData, null, 2)}
            </pre>
        </div>
    );
};

// 9. SimulationResults (Editorial Plot Style)
export const SimulationResults: React.FC = () => {
    const { simResults } = useSimulator();
    if (!simResults) return null;
    const probPlot = JSON.parse(simResults.prob_plot);
    const phasePlot = JSON.parse(simResults.phase_plot);

    const layoutDefaults = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: 'rgba(255,255,255,0.4)', family: 'JetBrains Mono', size: 9 },
        xaxis: { gridcolor: 'rgba(255,255,255,0.05)', zerolinecolor: 'rgba(255,255,255,0.1)' },
        yaxis: { gridcolor: 'rgba(255,255,255,0.05)', zerolinecolor: 'rgba(255,255,255,0.1)' },
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-[40px] border border-white/5 bg-zinc-950/20 p-10">
                <h3 className="text-xl font-serif italic mb-8 opacity-80 text-glow">Probability Distribution</h3>
                <Plot
                    data={probPlot.data.map((d: any) => ({ ...d, marker: { color: 'white' } }))}
                    layout={{ ...probPlot.layout, ...layoutDefaults }}
                    config={{ responsive: true, displayModeBar: false }}
                    className="w-full h-[400px]"
                />
            </div>
            <div className="rounded-[40px] border border-white/5 bg-zinc-950/20 p-10">
                <h3 className="text-xl font-serif italic mb-8 opacity-80 text-glow">State Phase Projections</h3>
                <Plot
                    data={phasePlot.data.map((d: any) => ({ ...d, line: { color: 'white', width: 1 } }))}
                    layout={{ ...phasePlot.layout, ...layoutDefaults }}
                    config={{ responsive: true, displayModeBar: false }}
                    className="w-full h-[400px]"
                />
            </div>
        </div>
    );
};

// 10. SimulationTextResults
export const SimulationTextResults: React.FC = () => {
    const { simResults } = useSimulator();
    if (!simResults) return null;
    return (
        <div className="rounded-[40px] border border-white/5 bg-white/[0.05] p-12">
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600 mb-6">Circuit Schematic</h4>
                    <pre className="text-[11px] font-mono text-zinc-400 opacity-60 overflow-auto">{simResults.circuit}</pre>
                </div>
                <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600 mb-6">StateVector Log</h4>
                    <div className="space-y-2">
                        {simResults.state_vector.map((s: any, i: number) => (
                            <div key={i} className="flex justify-between border-b border-white/5 pb-2 font-mono text-[10px] uppercase">
                                <span className="text-zinc-500">|{s.binary}⟩</span>
                                <span className="text-white">{(s.probability * 100).toFixed(2)}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};