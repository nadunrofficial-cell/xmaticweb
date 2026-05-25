'use client'

import { Canvas } from '@react-three/fiber'
import { Stars, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useEffect } from 'react'

export function GalaxyBg() {
  const ref = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!ref.current) return

    const animate = () => {
      if (ref.current) {
        ref.current.rotation.x += 0.00005
        ref.current.rotation.y += 0.0001
      }
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <Canvas 
      className="fixed inset-0 -z-10"
      camera={{ position: [0, 0, 15], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#070913']} />
      
      <group ref={ref}>
        {/* Stars background */}
        <Stars radius={100} depth={50} count={5000} factor={4} />
        
        {/* Nebula-like particles */}
        <Sparkles 
          count={100} 
          scale={100} 
          size={3} 
          speed={0.5}
          color="#38bdf8"
          opacity={0.3}
        />
        
        {/* Additional blue nebula particles */}
        <Sparkles 
          count={50} 
          scale={120} 
          size={2} 
          speed={0.3}
          color="#a855f7"
          opacity={0.2}
        />
      </group>

      {/* Ambient light for subtle illumination */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#38bdf8" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a855f7" />
    </Canvas>
  )
}
