'use client'

import { useEffect, useRef } from 'react'
import { ThreeScene } from '@/lib/three-scene'

interface AnimatedBackgroundProps {
  className?: string
}

export default function AnimatedBackground({ className = '' }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<ThreeScene | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Initialize Three.js scene
    sceneRef.current = new ThreeScene(canvasRef.current, {
      nodeCount: 80,
      particleCount: 200,
      quality: 'high',
      enableParticles: true,
      enableGrid: true,
      enableHexagons: true,
    })

    sceneRef.current.start()

    return () => {
      sceneRef.current?.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    />
  )
}