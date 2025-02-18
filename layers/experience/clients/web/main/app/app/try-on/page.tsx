"use client"

import { useState, useEffect, useRef } from "react"
import { Shirt, Ruler, Maximize2, Minimize2 } from "lucide-react"
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

type BodyMeasurements = {
  height: number
  chest: number
  waist: number
}

export default function TryOnPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [measurements, setMeasurements] = useState<BodyMeasurements>({
    height: 170,
    chest: 90,
    waist: 75
  })
  const [selectedClothing, setSelectedClothing] = useState<'shirt' | 'pants' | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Scene references
  const scene = useRef<THREE.Scene>(new THREE.Scene())
  const camera = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera(45, 1, 0.1, 1000))
  const renderer = useRef<THREE.WebGLRenderer>()
  const controls = useRef<OrbitControls>()
  const figure = useRef<THREE.Group>()
  const clothing = useRef<THREE.Mesh>()

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize scene
    const initScene = () => {
      // Setup renderer
      renderer.current = new THREE.WebGLRenderer({ antialias: true })
      renderer.current.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight)
      renderer.current.setClearColor(0xffffff)
      containerRef.current!.appendChild(renderer.current.domElement)

      // Setup camera
      camera.current.position.set(0, 1.5, 2.5)
      
      // Setup controls
      controls.current = new OrbitControls(camera.current, renderer.current.domElement)
      controls.current.target.set(0, 0.8, 0)
      controls.current.update()

      // Setup lighting
      scene.current.add(new THREE.AmbientLight(0xffffff, 0.5))
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(1, 2, 3)
      scene.current.add(directionalLight)

      // Create figure
      figure.current = createBasicFigure()
      scene.current.add(figure.current)

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate)
        renderer.current!.render(scene.current, camera.current)
      }
      animate()

      // Handle cleanup
      return () => {
        containerRef.current?.removeChild(renderer.current!.domElement)
        renderer.current?.dispose()
        controls.current?.dispose()
      }
    }

    const cleanup = initScene()
    setIsInitialized(true)

    return cleanup
  }, [])

  const createBasicFigure = () => {
    const group = new THREE.Group()

    // Torso
    const torso = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 1, 8),
      new THREE.MeshBasicMaterial({ color: 0xcccccc, wireframe: true })
    )
    torso.position.y = 0.5
    group.add(torso)

    // Head
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0xcccccc, wireframe: true })
    )
    head.position.y = 1.1
    group.add(head)

    return group
  }

  const updateClothing = () => {
    if (!clothing.current) return

    // Remove existing clothing
    scene.current.remove(clothing.current)

    if (!selectedClothing) return

    // Create new clothing
    const geometry = selectedClothing === 'shirt' 
      ? new THREE.CylinderGeometry(
          measurements.chest / 100,
          measurements.chest / 100,
          0.6,
          16
        )
      : new THREE.CylinderGeometry(
          measurements.waist / 100,
          measurements.waist / 100,
          0.7,
          16
        )

    clothing.current = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ 
        color: selectedClothing === 'shirt' ? 0xff0000 : 0x0000ff,
        wireframe: true,
        transparent: true,
        opacity: 0.7
      })
    )
    
    clothing.current.position.y = selectedClothing === 'shirt' ? 0.8 : 0.35
    scene.current.add(clothing.current)
  }

  useEffect(() => {
    if (!isInitialized) return
    updateClothing()
  }, [selectedClothing, measurements, isInitialized])

  return (
    <div className="h-screen w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-xl shadow-xl bg-white aspect-[16/9] relative" ref={containerRef}>
          
          {/* Controls */}
          <div className="absolute left-4 top-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md space-y-4">
            <h2 className="font-semibold flex items-center gap-2">
              <Ruler className="w-5 h-5 text-purple-600" />
              Measurements
            </h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Height (cm)</label>
              <input
                type="range"
                min="150"
                max="200"
                value={measurements.height}
                onChange={(e) => setMeasurements(prev => ({...prev, height: Number(e.target.value)}))}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Chest (cm)</label>
              <input
                type="range"
                min="80"
                max="120"
                value={measurements.chest}
                onChange={(e) => setMeasurements(prev => ({...prev, chest: Number(e.target.value)}))}
                className="w-full"
              />
            </div>
          </div>

          {/* Clothing Selector */}
          <div className="absolute right-4 top-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md space-y-2">
            <button
              onClick={() => setSelectedClothing(prev => prev === 'shirt' ? null : 'shirt')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                selectedClothing === 'shirt' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Shirt className="w-4 h-4" />
              T-Shirt
            </button>
            
            <button
              onClick={() => setSelectedClothing(prev => prev === 'pants' ? null : 'pants')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                selectedClothing === 'pants' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Shirt className="w-4 h-4" />
              Pants
            </button>
          </div>

          {!isInitialized && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-600">Initializing...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}