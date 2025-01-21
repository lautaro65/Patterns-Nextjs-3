"use client"

import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

const KaleidoscopePattern: React.FC = () => {

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const controls = useAnimation()

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', updateDimensions)
    updateDimensions()

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: { duration: 60, repeat: Infinity, ease: "linear" }
    })
  }, [controls])

  const triangleSize = Math.max(dimensions.width, dimensions.height) / 2

  const createTriangle = (rotation: number, color: string) => (
    <motion.path
      d={`M0,0 L${triangleSize},0 L${triangleSize / 2},${(triangleSize * Math.sqrt(3)) / 2} Z`}
      fill={color}
      initial={{ rotate: rotation, scale: 0 }}
      animate={{ scale: 1, opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
    />
  )

  if (dimensions.width === 0 || dimensions.height === 0) {
    return null // Return null or a loading state while dimensions are not set
  }

  return (
    <div className="fixed inset-0 bg-gray-900 overflow-hidden">
      <svg width="100%" height="100%" viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
        <defs>
          <radialGradient id="gradient1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id="gradient2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        <motion.g
          animate={controls}
          style={{ originX: "50%", originY: "50%" }}
          initial={false}
        >
          {createTriangle(0, "url(#gradient1)")}
          {createTriangle(60, "url(#gradient2)")}
          {createTriangle(120, "url(#gradient1)")}
          {createTriangle(180, "url(#gradient2)")}
          {createTriangle(240, "url(#gradient1)")}
          {createTriangle(300, "url(#gradient2)")}
        </motion.g>
      </svg>
      <div className="absolute inset-0 backdrop-blur-sm" />
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-screen"
          style={{
            width: `${10 + Math.random() * 20}px`,
            height: `${10 + Math.random() * 20}px`,
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}

export default KaleidoscopePattern

