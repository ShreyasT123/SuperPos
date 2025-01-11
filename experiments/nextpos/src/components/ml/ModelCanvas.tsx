import { useDroppable } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Layer } from '@/components/ml/types'
import { X } from 'lucide-react'

interface ModelCanvasProps {
  layers: Layer[]
  setSelectedLayer: (layer: Layer) => void
  removeLayer: (layerId: string) => void
}

function SortableLayer({ layer, setSelectedLayer, removeLayer }: { layer: Layer; setSelectedLayer: (layer: Layer) => void; removeLayer: (layerId: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: layer.id })
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-2 mb-2 rounded flex justify-between items-center cursor-move ${
        layer.type.startsWith('PQC') || layer.type.startsWith('Controlled') || layer.type === 'Sample' || layer.type === 'Expectation'
          ? 'bg-purple-500/20 hover:bg-purple-500/30'
          : 'bg-blue-500/20 hover:bg-blue-500/30'
      } transition-colors`}
      onClick={() => setSelectedLayer(layer)}
    >
      <span className="text-gray-200">{layer.type}</span>
      <button
        onClick={(e) => {
          e.stopPropagation()
          removeLayer(layer.id)
        }}
        className="text-red-400 hover:text-red-300"
      >
        <X size={16} />
      </button>
    </div>
  )
}

export default function ModelCanvas({ layers, setSelectedLayer, removeLayer }: ModelCanvasProps) {
  const { setNodeRef } = useDroppable({
    id: 'modelCanvas',
  })

  return (
    <div className="bg-black/50 border border-cyan-500/20 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Model Canvas</h2>
      <div
        ref={setNodeRef}
        className="bg-gray-800/50 p-4 min-h-[400px] rounded"
      >
        <SortableContext items={layers.map(l => l.id)} strategy={verticalListSortingStrategy}>
          {layers.map((layer) => (
            <SortableLayer
              key={layer.id}
              layer={layer}
              setSelectedLayer={setSelectedLayer}
              removeLayer={removeLayer}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

