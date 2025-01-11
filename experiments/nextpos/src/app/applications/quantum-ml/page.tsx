/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { DndContext, DragEndEvent, DragStartEvent, useSensors, useSensor, PointerSensor } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { motion } from 'framer-motion'
import LayerSelection from '@/components/ml/LayerSelections'
import LayerConfiguration from '@/components/ml/LayerConfiguration'
import ModelCanvas from '@/components/ml/ModelCanvas'
import JsonOutput from '@/components/ml/JsonOutput'
import { Layer, ModelType } from '@/components/ml/types'

// Animated background component
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-cyan-500 rounded-full opacity-30"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 270, 270, 0],
              opacity: [0.3, 0.5, 0.5, 0.3, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [layers, setLayers] = useState<Layer[]>([])
  const [selectedLayer, setSelectedLayer] = useState<Layer | null>(null)
  const [modelType, setModelType] = useState<ModelType>('classification')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      if (typeof active.id === 'string' && active.id.startsWith('new-')) {
        // Add new layer
        const newLayer: Layer = {
          id: `${Date.now()}`,
          type: active.id.replace('new-', ''),
          args: {}
        }
        setLayers([...layers, newLayer])
      } else {
        // Reorder existing layers
        setLayers((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id)
          const newIndex = items.findIndex((item) => item.id === over.id)
          return arrayMove(items, oldIndex, newIndex)
        })
      }
    }

    setActiveId(null)
  }

  const updateLayerArgs = (layerId: string, args: Record<string, any>) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, args } : layer
    ))
  }

  const removeLayer = (layerId: string) => {
    setLayers(layers.filter(layer => layer.id !== layerId))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    const jsonOutput = {
      model_type: modelType,
      layers: layers.map(layer => ({
        type: layer.type,
        args: layer.args
      }))
    }

    try {
      const response = await fetch('http://localhost:8000/superpos/build-ml-model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonOutput),
      })

      if (!response.ok) {
        throw new Error('Failed to submit model')
      }

      const data = await response.json()
      console.log('Model built successfully:', data)
      setSubmitSuccess(true)
    } catch (error) {
      console.error('Error building model:', error)
      setSubmitError('Failed to submit model. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 dark:from-black dark:to-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
        <AnimatedBackground />
        <div className="fixed inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] pointer-events-none" />
        <div className="fixed inset-0 bg-gradient-to-br from-transparent to-cyan-500/20 pointer-events-none" />
        <div className="relative z-10 container mx-auto p-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-8 text-center">Quantum ML Model Builder</h1>
          <div className="flex space-x-4">
            <div className="w-1/4">
              <LayerSelection />
            </div>
            <div className="w-1/2">
              <ModelCanvas 
                layers={layers} 
                setSelectedLayer={setSelectedLayer} 
                removeLayer={removeLayer}
              />
            </div>
            <div className="w-1/4">
              <LayerConfiguration 
                layer={selectedLayer} 
                updateLayerArgs={updateLayerArgs}
              />
              <div className="mt-4">
                <label className="block mb-2 text-gray-200">Model Type:</label>
                <select
                  value={modelType}
                  onChange={(e) => setModelType(e.target.value as ModelType)}
                  className="w-full p-2 bg-black/50 border border-cyan-500/50 rounded text-gray-200"
                >
                  <option value="classification">Classification</option>
                  <option value="regression">Regression</option>
                </select>
              </div>
              <JsonOutput layers={layers} modelType={modelType} />
              <div className="mt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full p-2 rounded text-white font-semibold ${
                    isSubmitting
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit to Backend'}
                </button>
                {submitError && (
                  <p className="mt-2 text-red-500">{submitError}</p>
                )}
                {submitSuccess && (
                  <p className="mt-2 text-green-500">Model submitted successfully!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  )
}

