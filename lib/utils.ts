/**
 * Utility functions for mathematical operations, animations, and helpers
 */

import { Vector3 } from './types'

export const random = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

export const randomVector = (range: number = 100): Vector3 => {
  return {
    x: random(-range, range),
    y: random(-range, range),
    z: random(-range, range),
  }
}

export const distance = (a: Vector3, b: Vector3): number => {
  const dx = a.x - b.x
  const dy = a.y - b.y
  const dz = a.z - b.z
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

export const multiplyVector = (v: Vector3, scalar: number): Vector3 => {
  return { x: v.x * scalar, y: v.y * scalar, z: v.z * scalar }
}

export const addVectors = (a: Vector3, b: Vector3): Vector3 => {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }
}

export const getDevicePixelRatio = (): number => {
  return Math.min(window.devicePixelRatio || 1, 2)
}

export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}
