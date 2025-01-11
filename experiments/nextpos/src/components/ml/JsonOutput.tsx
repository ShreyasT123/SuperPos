import { Layer, ModelType } from '@/components/ml/types'

interface JsonOutputProps {
  layers: Layer[]
  modelType: ModelType
}

export default function JsonOutput({ layers, modelType }: JsonOutputProps) {
  const jsonOutput = {
    model_type: modelType,
    layers: layers.map(layer => ({
      type: layer.type,
      args: layer.args
    }))
  }

  return (
    <div className="mt-4 bg-black/50 border border-cyan-500/20 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">JSON Output</h2>
      <pre className="bg-gray-800/50 p-4 rounded overflow-x-auto text-gray-300 text-sm">
        {JSON.stringify(jsonOutput, null, 2)}
      </pre>
    </div>
  )
}

