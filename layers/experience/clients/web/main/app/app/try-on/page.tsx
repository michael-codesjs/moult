"use client"

import { useState, useEffect, useRef } from "react"
import { Glasses, Box, Maximize2, Minimize2 } from "lucide-react"
import * as THREE from 'three'
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls.js'

export default function TryOnPage() {
  const [viewMode, setViewMode] = useState<"3d" | "ar">("3d")
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControlsImpl;
    earth?: THREE.Group;
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
    if (!containerRef.current || sceneRef.current) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    
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
    renderer.toneMappingExposure = 1.5
    container.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControlsImpl(camera, renderer.domElement)
    controls.enablePan = false
    controls.minDistance = 2
    controls.maxDistance = 10
    controls.minPolarAngle = 0
    controls.maxPolarAngle = Math.PI
    controls.autoRotate = true
    controls.autoRotateSpeed = 2
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.target.set(0, 0, 0)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 3, 5)
    scene.add(directionalLight)

    // Create Earth Group
    const earth = new THREE.Group()

    // Base sphere (ocean)
    const oceanGeometry = new THREE.SphereGeometry(1, 64, 32)
    const oceanMaterial = new THREE.MeshPhongMaterial({
      color: 0x1e40af,
      shininess: 50,
    })
    const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial)
    earth.add(ocean)

    // Add latitude lines
    const latitudeCount = 20
    for (let i = 0; i < latitudeCount; i++) {
      const latitude = (Math.PI * i) / latitudeCount
      const radius = Math.sin(latitude)
      const y = Math.cos(latitude)
      
      const lineGeometry = new THREE.CircleGeometry(radius, 64, 0, Math.PI * 2)
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.15
      })
      const line = new THREE.LineLoop(lineGeometry, lineMaterial)
      line.rotation.x = Math.PI / 2
      line.position.y = y
      earth.add(line)
      
      // Add southern hemisphere lines
      if (i > 0) {
        const southLine = line.clone()
        southLine.position.y = -y
        earth.add(southLine)
      }
    }

    // Add longitude lines
    const longitudeCount = 24
    for (let i = 0; i < longitudeCount; i++) {
      const curve = new THREE.EllipseCurve(
        0, 0,
        1, 1,
        0, Math.PI * 2,
        false,
        0
      )
      const points = curve.getPoints(50)
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.15
      })
      const line = new THREE.Line(lineGeometry, lineMaterial)
      line.rotation.y = (i * Math.PI * 2) / longitudeCount
      earth.add(line)
    }

    scene.add(earth)
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    camera.position.set(0, 2, 5)
    camera.lookAt(0, 0, 0)

    function handleResize() {
      const width = isFullscreen ? window.innerWidth : container.clientWidth
      const height = isFullscreen ? window.innerHeight : container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      earth,
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
                <h1 className="text-2xl font-bold text-gray-900">Earth Viewer</h1>
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
          <div className={`${isFullscreen ? 'w-full h-full' : 'lg:col-span-4'}`}>
            <div className={`${isFullscreen ? 'h-full' : 'bg-white rounded-2xl shadow-sm overflow-hidden'}`}>
              <div className="relative h-full">
                {isMounted && viewMode === "3d" && (
                  <div ref={containerRef} className={`${isFullscreen ? 'w-full h-full' : 'aspect-[21/9] w-full'}`}>
                    {/* Controls */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                      {/* Fullscreen Button */}
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
                  <div className="aspect-[21/9] w-full bg-gray-100 flex items-center justify-center">
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
                      <p className="text-sm text-gray-600">Loading Earth...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 