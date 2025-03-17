/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { Layer } from './types'

interface LayerConfigurationProps {
  layer: Layer | null
  updateLayerArgs: (layerId: string, args: Record<string, any>) => void
}

export default function LayerConfiguration({ layer, updateLayerArgs }: LayerConfigurationProps) {
  const [args, setArgs] = useState<Record<string, any>>({})

  useEffect(() => {
    if (layer) {
      setArgs(layer.args)
    } else {
      setArgs({})
    }
  }, [layer])

  if (!layer) {
    return <div className="text-gray-400">Select a layer to configure</div>
  }

  const handleArgChange = (key: string, value: any) => {
    const newArgs = { ...args, [key]: value }
    setArgs(newArgs)
    updateLayerArgs(layer.id, newArgs)
  }

  return (
    <div className="bg-black/50 border border-cyan-500/20 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Layer Configuration</h2>
      <h3 className="font-medium mb-2 text-gray-300">{layer.type}</h3>
      <div className="space-y-2">
        {getLayerArgs(layer.type).map((arg) => (
          <div key={arg.name}>
            <label className="block text-sm font-medium text-gray-300">{arg.name}</label>
            <input
              type={arg.type}
              value={args[arg.name] || ''}
              onChange={(e) => handleArgChange(arg.name, e.target.value)}
              className="mt-1 block w-full rounded-md bg-black/30 border border-cyan-500/50 text-gray-200 focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function getLayerArgs(layerType: string): { name: string; type: string }[] {
  switch (layerType) {
    // TensorFlow Quantum Layers
    case 'PQC':
      return [
        { name: 'model_circuit', type: 'text' },
        { name: 'differentiator', type: 'text' },
        { name: 'observable', type: 'text' },
      ]
    case 'AddCircuit':
      return [
        { name: 'circuit', type: 'text' },
      ]
    case 'Expectation':
      return [
        { name: 'operators', type: 'text' },
      ]
    case 'Sample':
      return [
        { name: 'operators', type: 'text' },
      ]
    case 'ControlledPQC':
      return [
        { name: 'model_circuit', type: 'text' },
        { name: 'control_inputs', type: 'number' },
        { name: 'operator', type: 'text' },
      ]
    case 'State':
      return [
        { name: 'state_preparation', type: 'text' },
      ]

    // CNN Layers
    case 'Conv2D':
      return [
        { name: 'filters', type: 'number' },
        { name: 'kernel_size', type: 'text' },
        { name: 'strides', type: 'text' },
        { name: 'padding', type: 'text' },
        { name: 'activation', type: 'text' },
      ]
    case 'MaxPooling2D':
      return [
        { name: 'pool_size', type: 'text' },
        { name: 'strides', type: 'text' },
        { name: 'padding', type: 'text' },
      ]
    case 'AveragePooling2D':
      return [
        { name: 'pool_size', type: 'text' },
        { name: 'strides', type: 'text' },
        { name: 'padding', type: 'text' },
      ]
    case 'BatchNormalization':
      return [
        { name: 'axis', type: 'number' },
        { name: 'momentum', type: 'number' },
        { name: 'epsilon', type: 'number' },
      ]
    case 'Dropout':
      return [
        { name: 'rate', type: 'number' },
      ]
    case 'Flatten':
      return []
    case 'ReLU':
      return [
        { name: 'max_value', type: 'number' },
        { name: 'negative_slope', type: 'number' },
        { name: 'threshold', type: 'number' },
      ]
    case 'Dense':
      return [
        { name: 'units', type: 'number' },
        { name: 'activation', type: 'text' },
      ]

    // Regression Layers
    case 'Activation':
      return [
        { name: 'activation', type: 'text' },
      ]
    case 'LeakyReLU':
      return [
        { name: 'alpha', type: 'number' },
      ]

    default:
      return []
  }
}

