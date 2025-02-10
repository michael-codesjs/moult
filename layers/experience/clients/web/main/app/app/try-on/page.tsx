"use client"

import { useState, useEffect, useRef } from "react"
import { Glasses, Box, Shirt, Maximize2, Minimize2, Palette } from "lucide-react"
import * as THREE from 'three'
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls.js'

const COLORS = {
  shirt: [
    { name: 'Blue', hex: '#4A90E2', roughness: 0.9, metalness: 0.1 },
    { name: 'White', hex: '#FFFFFF', roughness: 0.8, metalness: 0.1 },
    { name: 'Black', hex: '#2C3E50', roughness: 0.7, metalness: 0.15 },
    { name: 'Red', hex: '#E74C3C', roughness: 0.85, metalness: 0.1 },
    { name: 'Green', hex: '#2ECC71', roughness: 0.8, metalness: 0.1 }
  ]
}

export default function TryOnPage() {
  const [viewMode, setViewMode] = useState<"3d" | "ar">("3d")
  const [shirtColor, setShirtColor] = useState(COLORS.shirt[0])
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControlsImpl;
    materials: {
      shirt: THREE.MeshStandardMaterial;
    };
    cleanup: () => void;
  } | null>(null)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    if (sceneRef.current) {
      sceneRef.current.materials.shirt.color.set(shirtColor.hex)
      sceneRef.current.materials.shirt.roughness = shirtColor.roughness
      sceneRef.current.materials.shirt.metalness = shirtColor.metalness
    }
  }, [shirtColor, isMounted])

  useEffect(() => {
    if (!isMounted) return
    if (!containerRef.current || sceneRef.current) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xcc3333) // Lighter red background
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    })
    
    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight
    
    renderer.setSize(width, height)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.5 // Increased exposure
    container.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControlsImpl(camera, renderer.domElement)
    controls.enablePan = false
    controls.minDistance = 2
    controls.maxDistance = 5
    controls.minPolarAngle = Math.PI/3
    controls.maxPolarAngle = Math.PI/2
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.target.set(0, 0, 0)

    // Enhanced Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    // Main spotlights with visible bulbs
    const createSpotlight = (x: number, y: number, z: number, intensity: number, color: number) => {
      const light = new THREE.SpotLight(color, intensity)
      light.position.set(x, y, z)
      light.angle = Math.PI / 4
      light.penumbra = 0.5
      light.decay = 1.5
      light.distance = 12
      light.target.position.set(0, 0, 0)
      scene.add(light)
      scene.add(light.target)

      // Add visible light source
      const bulb = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      )
      bulb.position.copy(light.position)
      scene.add(bulb)

      // Add light cone visualization
      const coneGeometry = new THREE.ConeGeometry(0.5, 1, 16)
      const coneMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide
      })
      const cone = new THREE.Mesh(coneGeometry, coneMaterial)
      cone.position.copy(light.position)
      cone.lookAt(0, 0, 0)
      scene.add(cone)
    }

    createSpotlight(3, 6, 3, 5, 0xffffff)
    createSpotlight(-3, 6, -3, 5, 0xffffff)
    createSpotlight(0, 6, 0, 5, 0xffffff)

    // T-Shirt Material with enhanced properties
    const shirtMaterial = new THREE.MeshStandardMaterial({
      color: shirtColor.hex,
      roughness: shirtColor.roughness,
      metalness: shirtColor.metalness,
      envMapIntensity: 1.5
    })

    // Create T-Shirt with larger dimensions
    const shirt = new THREE.Group()

    // Body - increased size
    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.45, 1, 32) // Increased from 0.4/0.35/0.8
    const body = new THREE.Mesh(bodyGeometry, shirtMaterial)
    shirt.add(body)

    // Sleeves - increased size
    const sleeveGeometry = new THREE.CylinderGeometry(0.15, 0.13, 0.5, 16) // Increased from 0.12/0.1/0.4
    
    const leftSleeve = new THREE.Mesh(sleeveGeometry, shirtMaterial)
    leftSleeve.position.set(-0.5, 0.1, 0) // Adjusted position for larger body
    leftSleeve.rotation.z = Math.PI / 4
    shirt.add(leftSleeve)

    const rightSleeve = new THREE.Mesh(sleeveGeometry, shirtMaterial)
    rightSleeve.position.set(0.5, 0.1, 0) // Adjusted position for larger body
    rightSleeve.rotation.z = -Math.PI / 4
    shirt.add(rightSleeve)

    // Logo - increased size
    const logoGeometry = new THREE.PlaneGeometry(0.4, 0.4) // Increased from 0.3
    const logoMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5,
      metalness: 0.1,
    })
    const logo = new THREE.Mesh(logoGeometry, logoMaterial)
    logo.position.set(0, 0.1, 0.51) // Adjusted z position for larger body
    logo.rotation.x = -0.1
    shirt.add(logo)

    // Position shirt
    shirt.position.y = 0.5
    scene.add(shirt)

    // Swinging animation
    let time = 0
    const animate = () => {
      time += 0.01
      
      // Add gentle swinging motion
      shirt.rotation.x = Math.sin(time) * 0.1
      shirt.rotation.z = Math.cos(time * 0.8) * 0.08
      shirt.position.y = 0.5 + Math.sin(time * 1.2) * 0.05 // Updated base position to match new height

      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Camera position
    camera.position.set(0, 1, 4) // Adjusted y position from 2 to 1
    camera.lookAt(0, 0.5, 0) // Updated to look at new shirt position

    // Handle resize for fullscreen
    function handleResize() {
      const width = isFullscreen ? window.innerWidth : container.clientWidth
      const height = isFullscreen ? window.innerHeight : container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      materials: {
        shirt: shirtMaterial
      },
      cleanup: () => {
        window.removeEventListener('resize', handleResize)
        container.removeChild(renderer.domElement)
        renderer.dispose()
      }
    }

    setIsLoading(false)

    return () => {
      if (sceneRef.current) {
        sceneRef.current.cleanup()
        sceneRef.current = null
      }
    }
  }, [isMounted])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Only show when not in fullscreen */}
      {!isFullscreen && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Virtual Try-On</h1>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("3d")}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                      viewMode === "3d"
                        ? "bg-purple-100 text-purple-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Box className="w-5 h-5" />
                    <span>3D View</span>
                  </button>
                  <button
                    onClick={() => setViewMode("ar")}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                      viewMode === "ar"
                        ? "bg-purple-100 text-purple-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Glasses className="w-5 h-5" />
                    <span>AR View</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
        <div className={`${isFullscreen ? '' : 'grid grid-cols-1 lg:grid-cols-4 gap-8'}`}>
          {/* 3D View */}
          <div className={`${isFullscreen ? 'w-full h-full' : 'lg:col-span-3'}`}>
            <div className={`${isFullscreen ? 'h-full' : 'bg-white rounded-2xl shadow-sm overflow-hidden'}`}>
              <div className="relative h-full">
                {isMounted && viewMode === "3d" && (
                  <div ref={containerRef} className={`${isFullscreen ? 'w-full h-full' : 'aspect-[4/3] w-full'}`}>
                    {/* Fullscreen Controls */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                      {/* Color Picker Button - Only in fullscreen */}
                      {isFullscreen && (
                        <div className="relative group">
                          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors">
                            <Palette className="w-5 h-5 text-gray-600" />
                          </button>
                          
                          {/* Color Picker Popover */}
                          <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="grid grid-cols-5 gap-2">
                              {COLORS.shirt.map((color) => (
                                <button
                                  key={color.hex}
                                  onClick={() => setShirtColor(color)}
                                  className={`w-full aspect-square rounded-full border-2 ${
                                    shirtColor === color ? 'border-purple-600' : 'border-transparent'
                                  } transition-all hover:scale-110`}
                                  style={{ backgroundColor: color.hex }}
                                  title={color.name}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <button
                        onClick={toggleFullscreen}
                        className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
                      >
                        {isFullscreen ? (
                          <Minimize2 className="w-5 h-5 text-gray-600" />
                        ) : (
                          <Maximize2 className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
                {viewMode === "ar" && (
                  <div className="aspect-[4/3] w-full bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <Glasses className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">AR view coming soon</p>
                    </div>
                  </div>
                )}
                {(isLoading || !isMounted) && viewMode === "3d" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm text-gray-600">Loading model...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Controls Panel - Only show when not in fullscreen */}
          {!isFullscreen && (
            <div className="space-y-6">
              {/* Shirt Colors */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Shirt className="w-5 h-5 text-gray-500" />
                  <h3 className="font-medium">Shirt Color</h3>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {COLORS.shirt.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setShirtColor(color)}
                      className={`w-full aspect-square rounded-full border-2 ${
                        shirtColor === color ? 'border-purple-600' : 'border-transparent'
                      } transition-all hover:scale-110`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 