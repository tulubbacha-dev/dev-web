import * as THREE from 'three'
import { Vector3, NeuralNode, Particle, AnimationConfig } from './types'
import { random, randomVector, distance, clamp, multiplyVector, addVectors, getDevicePixelRatio } from './utils'
import { COLORS, ANIMATION_CONFIG } from './constants'

export class ThreeScene {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private canvas: HTMLCanvasElement
  private animationFrameId: number = 0
  private isAnimating: boolean = false
  private config: AnimationConfig
  private neuralNodes: NeuralNode[] = []
  private particles: Particle[] = []
  private nodeGeometry!: THREE.BufferGeometry
  private nodeMaterial!: THREE.PointsMaterial
  private nodePoints!: THREE.Points
  private lineSegments!: THREE.LineSegments
  private hexagons: THREE.Mesh[] = []
  private energyCore!: THREE.Mesh
  private lastFrameTime: number = 0
  private frameCount: number = 0
  private fps: number = 60

  constructor(canvas: HTMLCanvasElement, config: Partial<AnimationConfig> = {}) {
    this.canvas = canvas
    this.config = {
      nodeCount: config.nodeCount || ANIMATION_CONFIG.defaultNodeCount,
      particleCount: config.particleCount || ANIMATION_CONFIG.defaultParticleCount,
      connectionDistance: config.connectionDistance || ANIMATION_CONFIG.connectionDistance,
      speed: config.speed || ANIMATION_CONFIG.baseSpeed,
      quality: config.quality || 'high',
      enableParticles: config.enableParticles !== false,
      enableGrid: config.enableGrid !== false,
      enableHexagons: config.enableHexagons !== false,
      fps: config.fps || ANIMATION_CONFIG.targetFPS,
    }

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(COLORS.dark)
    this.scene.fog = new THREE.Fog(COLORS.dark, 2000, 3500)

    const width = this.canvas.clientWidth
    const height = this.canvas.clientHeight
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000)
    this.camera.position.z = 300

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(getDevicePixelRatio())
    this.renderer.setClearColor(COLORS.dark, 1)

    this.initNeuralNetwork()
    this.initParticles()
    this.initGrid()
    this.initHexagons()
    this.initEnergyCore()
    this.setupLighting()

    window.addEventListener('resize', () => this.onWindowResize())
  }

  private initNeuralNetwork(): void {
    for (let i = 0; i < this.config.nodeCount; i++) {
      const node: NeuralNode = {
        position: randomVector(400),
        velocity: multiplyVector(randomVector(1), 0.5),
        radius: random(2, 8),
        color: [COLORS.blue, COLORS.cyan, COLORS.violet][Math.floor(Math.random() * 3)],
        intensity: random(0.5, 1),
        connections: [],
      }
      this.neuralNodes.push(node)
    }

    this.nodeGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(this.neuralNodes.length * 3)
    this.neuralNodes.forEach((node, i) => {
      positions[i * 3] = node.position.x
      positions[i * 3 + 1] = node.position.y
      positions[i * 3 + 2] = node.position.z
    })
    this.nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    this.nodeMaterial = new THREE.PointsMaterial({
      color: COLORS.blue,
      size: 3,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
    })

    this.nodePoints = new THREE.Points(this.nodeGeometry, this.nodeMaterial)
    this.scene.add(this.nodePoints)

    this.updateConnections()
  }

  private updateConnections(): void {
    if (this.lineSegments) {
      this.scene.remove(this.lineSegments)
    }

    const geometry = new THREE.BufferGeometry()
    const positions: number[] = []

    for (let i = 0; i < this.neuralNodes.length; i++) {
      for (let j = i + 1; j < this.neuralNodes.length; j++) {
        const dist = distance(this.neuralNodes[i].position, this.neuralNodes[j].position)
        if (dist < this.config.connectionDistance) {
          positions.push(
            this.neuralNodes[i].position.x,
            this.neuralNodes[i].position.y,
            this.neuralNodes[i].position.z,
            this.neuralNodes[j].position.x,
            this.neuralNodes[j].position.y,
            this.neuralNodes[j].position.z
          )
        }
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
    const lineMaterial = new THREE.LineBasicMaterial({
      color: COLORS.blue,
      transparent: true,
      opacity: 0.3,
    })
    this.lineSegments = new THREE.LineSegments(geometry, lineMaterial)
    this.scene.add(this.lineSegments)
  }

  private initParticles(): void {
    if (!this.config.enableParticles) return
    for (let i = 0; i < this.config.particleCount; i++) {
      const particle: Particle = {
        position: randomVector(500),
        velocity: multiplyVector(randomVector(1), 0.3),
        life: 1,
        maxLife: random(30, 100),
        size: random(0.5, 2),
        color: [COLORS.blue, COLORS.cyan][Math.floor(Math.random() * 2)],
      }
      this.particles.push(particle)
    }
  }

  private initGrid(): void {
    if (!this.config.enableGrid) return
    const gridSize = 1000
    const gridDivisions = 20
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, COLORS.violet, COLORS.navy)
    gridHelper.position.y = -200
    gridHelper.material.transparent = true
    gridHelper.material.opacity = 0.15
    this.scene.add(gridHelper)
  }

  private initHexagons(): void {
    if (!this.config.enableHexagons) return
    const hexagonCount = 6
    for (let i = 0; i < hexagonCount; i++) {
      const geometry = new THREE.CylinderGeometry(50 + i * 30, 50 + i * 30, 2, 6)
      const material = new THREE.MeshPhongMaterial({
        color: [COLORS.blue, COLORS.cyan, COLORS.violet][i % 3],
        emissive: [COLORS.blue, COLORS.cyan, COLORS.violet][i % 3],
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.1 + i * 0.05,
      })
      const hexagon = new THREE.Mesh(geometry, material)
      hexagon.rotation.x = Math.PI / 2
      hexagon.position.z = -50 - i * 20
      this.hexagons.push(hexagon)
      this.scene.add(hexagon)
    }
  }

  private initEnergyCore(): void {
    const geometry = new THREE.IcosahedronGeometry(30, 4)
    const material = new THREE.MeshPhongMaterial({
      color: COLORS.cyan,
      emissive: COLORS.cyan,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.7,
      wireframe: true,
    })
    this.energyCore = new THREE.Mesh(geometry, material)
    this.energyCore.position.z = -100
    this.scene.add(this.energyCore)
  }

  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(COLORS.white, 0.4)
    this.scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(COLORS.blue, 1, 1000)
    pointLight1.position.set(300, 300, 300)
    this.scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(COLORS.violet, 0.8, 1000)
    pointLight2.position.set(-300, -300, 300)
    this.scene.add(pointLight2)

    const pointLight3 = new THREE.PointLight(COLORS.cyan, 0.6, 1000)
    pointLight3.position.set(0, 0, 500)
    this.scene.add(pointLight3)
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate)

    const now = performance.now()
    if (this.lastFrameTime) {
      const delta = now - this.lastFrameTime
      this.fps = 1000 / delta
    }
    this.lastFrameTime = now

    this.updateNeuralNodes()
    if (this.config.enableParticles) {
      this.updateParticles()
    }

    if (this.config.enableHexagons) {
      this.hexagons.forEach((hex, i) => {
        hex.rotation.z += 0.0001 * (i + 1) * this.config.speed
        hex.rotation.x += 0.00005 * (i + 1) * this.config.speed
      })
    }

    this.energyCore.rotation.x += 0.0005 * this.config.speed
    this.energyCore.rotation.y += 0.0003 * this.config.speed
    this.energyCore.scale.set(
      1 + Math.sin(now * 0.0005) * 0.1,
      1 + Math.sin(now * 0.0005) * 0.1,
      1 + Math.sin(now * 0.0005) * 0.1
    )

    this.updateNodePositions()

    this.frameCount++
    if (this.frameCount % 10 === 0) {
      this.updateConnections()
    }

    this.renderer.render(this.scene, this.camera)
  }

  private updateNeuralNodes(): void {
    const boundarySize = 500
    const friction = 0.98
    const attraction = 0.001

    this.neuralNodes.forEach((node) => {
      node.velocity.x *= friction
      node.velocity.y *= friction
      node.velocity.z *= friction

      const toCenter = multiplyVector(node.position, -attraction)
      node.velocity = addVectors(node.velocity, toCenter)

      if (Math.random() < 0.02) {
        node.velocity.x += random(-0.1, 0.1)
        node.velocity.y += random(-0.1, 0.1)
        node.velocity.z += random(-0.1, 0.1)
      }

      node.position.x += node.velocity.x * this.config.speed
      node.position.y += node.velocity.y * this.config.speed
      node.position.z += node.velocity.z * this.config.speed

      if (Math.abs(node.position.x) > boundarySize) node.velocity.x *= -1
      if (Math.abs(node.position.y) > boundarySize) node.velocity.y *= -1
      if (Math.abs(node.position.z) > boundarySize) node.velocity.z *= -1

      node.position.x = clamp(node.position.x, -boundarySize, boundarySize)
      node.position.y = clamp(node.position.y, -boundarySize, boundarySize)
      node.position.z = clamp(node.position.z, -boundarySize, boundarySize)

      node.intensity = 0.5 + Math.sin(performance.now() * 0.001 + node.position.x * 0.01) * 0.5
    })
  }

  private updateParticles(): void {
    const boundarySize = 600

    this.particles = this.particles.filter((particle) => {
      particle.life -= 0.01
      return particle.life > 0
    })

    while (this.particles.length < this.config.particleCount) {
      const particle: Particle = {
        position: randomVector(500),
        velocity: multiplyVector(randomVector(1), 0.3),
        life: 1,
        maxLife: random(30, 100),
        size: random(0.5, 2),
        color: [COLORS.blue, COLORS.cyan][Math.floor(Math.random() * 2)],
      }
      this.particles.push(particle)
    }

    this.particles.forEach((particle) => {
      particle.position.x += particle.velocity.x * this.config.speed
      particle.position.y += particle.velocity.y * this.config.speed
      particle.position.z += particle.velocity.z * this.config.speed

      if (Math.abs(particle.position.x) > boundarySize) particle.position.x *= -0.9
      if (Math.abs(particle.position.y) > boundarySize) particle.position.y *= -0.9
      if (Math.abs(particle.position.z) > boundarySize) particle.position.z *= -0.9
    })
  }

  private updateNodePositions(): void {
    const positions = this.nodeGeometry.getAttribute('position') as THREE.BufferAttribute
    const posArray = positions.array as Float32Array

    this.neuralNodes.forEach((node, i) => {
      posArray[i * 3] = node.position.x
      posArray[i * 3 + 1] = node.position.y
      posArray[i * 3 + 2] = node.position.z
    })

    positions.needsUpdate = true
  }

  private onWindowResize = (): void => {
    const width = this.canvas.clientWidth
    const height = this.canvas.clientHeight

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(getDevicePixelRatio())
  }

  public start(): void {
    if (this.isAnimating) return
    this.isAnimating = true
    this.lastFrameTime = performance.now()
    this.animate()
  }

  public stop(): void {
    this.isAnimating = false
    cancelAnimationFrame(this.animationFrameId)
  }

  public getFPS(): number {
    return Math.round(this.fps)
  }

  public updateConfig(config: Partial<AnimationConfig>): void {
    this.config = { ...this.config, ...config }
  }

  public dispose(): void {
    this.stop()
    this.nodeGeometry.dispose()
    this.nodeMaterial.dispose()
    this.lineSegments.geometry.dispose()
    this.renderer.dispose()
    window.removeEventListener('resize', () => this.onWindowResize())
  }
}