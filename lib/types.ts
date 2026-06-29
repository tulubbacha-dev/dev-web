/**
 * Type definitions for TTB Technology LLC website
 * Provides TypeScript interfaces for 3D scene, animations, and components
 */

export interface Vector3 {
  x: number
  y: number
  z: number
}

export interface NeuralNode {
  position: Vector3
  velocity: Vector3
  radius: number
  color: string
  intensity: number
  connections: number[]
}

export interface Particle {
  position: Vector3
  velocity: Vector3
  life: number
  maxLife: number
  size: number
  color: string
}

export interface AnimationConfig {
  nodeCount: number
  particleCount: number
  connectionDistance: number
  speed: number
  quality: 'low' | 'medium' | 'high'
  enableParticles: boolean
  enableGrid: boolean
  enableHexagons: boolean
  fps: number
}

export interface SceneState {
  isInitialized: boolean
  isAnimating: boolean
  quality: 'low' | 'medium' | 'high'
  fps: number
  drawCalls: number
}

export interface ServiceCard {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface IndustryItem {
  id: string
  name: string
  description: string
  icon: string
  solutions: string[]
}

export interface CaseStudy {
  id: string
  title: string
  description: string
  industry: string
  challenge: string
  solution: string
  results: string[]
  image: string
}

export interface TeamMember {
  id: string
  name: string
  title: string
  bio: string
  image: string
  socials?: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  tags: string[]
  image: string
  readTime: number
}
