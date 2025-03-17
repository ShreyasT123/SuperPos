import { useDraggable } from '@dnd-kit/core'

const tfqLayers = ["PQC", "AddCircuit", "Expectation", "Sample", "ControlledPQC", "State"]
const cnnLayers = ["Conv2D", "MaxPooling2D", "AveragePooling2D", "BatchNormalization", "Dropout", "Flatten", "ReLU", "Dense"]
const regressionLayers = ["Dense", "Dropout", "BatchNormalization", "Flatten", "Activation", "LeakyReLU"]

function DraggableLayer({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `new-${id}`,
  })
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  )
}

export default function LayerSelection() {
  return (
    <div className="bg-black/50 border border-cyan-500/20 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Layer Selection</h2>
      <div>
        <h3 className="font-medium mb-2 text-gray-300">TensorFlow Quantum Layers</h3>
        {tfqLayers.map((layer) => (
          <DraggableLayer key={layer} id={layer}>
            <div className="bg-purple-500/20 p-2 mb-2 rounded text-gray-200 hover:bg-purple-500/30 transition-colors cursor-move">
              {layer}
            </div>
          </DraggableLayer>
        ))}
        <h3 className="font-medium mb-2 mt-4 text-gray-300">CNN Layers</h3>
        {cnnLayers.map((layer) => (
          <DraggableLayer key={layer} id={layer}>
            <div className="bg-blue-500/20 p-2 mb-2 rounded text-gray-200 hover:bg-blue-500/30 transition-colors cursor-move">
              {layer}
            </div>
          </DraggableLayer>
        ))}
        <h3 className="font-medium mb-2 mt-4 text-gray-300">Regression Layers</h3>
        {regressionLayers.map((layer) => (
          <DraggableLayer key={layer} id={layer}>
            <div className="bg-green-500/20 p-2 mb-2 rounded text-gray-200 hover:bg-green-500/30 transition-colors cursor-move">
              {layer}
            </div>
          </DraggableLayer>
        ))}
      </div>
    </div>
  )
}

