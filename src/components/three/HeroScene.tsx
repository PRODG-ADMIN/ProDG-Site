'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Logomark } from '@/components/Logo'

const PARTICLE_COUNT = 50

function generateParticles() {
  const particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.35,
      duration: 18 + Math.random() * 22,
      delay: Math.random() * -30,
      driftX: (Math.random() - 0.5) * 25,
      driftY: (Math.random() - 0.5) * 18,
    })
  }
  return particles
}

function GridBlock({
  x,
  y,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof motion.path>, 'x' | 'y'> & {
  x: number
  y: number
}) {
  return (
    <motion.path
      transform={`translate(${-32 * y + 96 * x} ${160 * y})`}
      d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
      {...props}
    />
  )
}

function DarkGridPattern({ yOffset = 0 }: { yOffset?: number }) {
  const id = useId()
  const ref = useRef<SVGSVGElement>(null)
  const currentBlock = useRef<[x: number, y: number]>()
  const counter = useRef(0)
  const [hoveredBlocks, setHoveredBlocks] = useState<
    Array<[x: number, y: number, key: number]>
  >([])

  const staticBlocks = [
    [1, 1],
    [2, 2],
    [4, 3],
    [6, 2],
    [7, 4],
    [5, 5],
    [-1, 3],
    [3, 1],
    [8, 3],
  ]

  useEffect(function trackGridHover() {
    function onMouseMove(event: MouseEvent) {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      let x = event.clientX - rect.left
      let y = event.clientY - rect.top
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return

      x = x - rect.width / 2 - 32
      y = y - yOffset
      x += Math.tan(32 / 160) * y
      x = Math.floor(x / 96)
      y = Math.floor(y / 160)

      if (currentBlock.current?.[0] === x && currentBlock.current?.[1] === y) return

      currentBlock.current = [x, y]

      setHoveredBlocks(function addBlock(blocks) {
        const key = counter.current++
        const block = [x, y, key] as [number, number, number]
        return [...blocks, block].filter(function dedupe(b) {
          return !(b[0] === x && b[1] === y && b[2] !== key)
        })
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    return function cleanup() {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [yOffset])

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full fill-white/[0.03] stroke-white/[0.04]"
      style={{ maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)' }}
    >
      <rect width="100%" height="100%" fill={`url(#${id})`} strokeWidth="0" />
      <svg x="50%" y={yOffset} strokeWidth="0" className="overflow-visible">
        {staticBlocks.map(function renderStatic(block) {
          return (
            <GridBlock
              key={`${block}`}
              x={block[0]}
              y={block[1]}
              className="fill-white/[0.04]"
            />
          )
        })}
        {hoveredBlocks.map(function renderHovered(block) {
          return (
            <GridBlock
              key={block[2]}
              x={block[0]}
              y={block[1]}
              className="fill-white/[0.08]"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, times: [0, 0, 1] }}
              onAnimationComplete={function removeBlock() {
                setHoveredBlocks(function filter(blocks) {
                  return blocks.filter(function keep(b) {
                    return b[2] !== block[2]
                  })
                })
              }}
            />
          )
        })}
      </svg>
      <defs>
        <pattern
          id={id}
          width="96"
          height="480"
          x="50%"
          patternUnits="userSpaceOnUse"
          patternTransform={`translate(0 ${yOffset})`}
          fill="none"
        >
          <path d="M128 0 98.572 147.138A16 16 0 0 1 82.883 160H13.117a16 16 0 0 0-15.69 12.862l-26.855 134.276A16 16 0 0 1-45.117 320H-116M64-160 34.572-12.862A16 16 0 0 1 18.883 0h-69.766a16 16 0 0 0-15.69 12.862l-26.855 134.276A16 16 0 0 1-109.117 160H-180M192 160l-29.428 147.138A15.999 15.999 0 0 1 146.883 320H77.117a16 16 0 0 0-15.69 12.862L34.573 467.138A16 16 0 0 1 18.883 480H-52M-136 480h58.883a16 16 0 0 0 15.69-12.862l26.855-134.276A16 16 0 0 1-18.883 320h69.766a16 16 0 0 0 15.69-12.862l26.855-134.276A16 16 0 0 1 109.117 160H192M-72 640h58.883a16 16 0 0 0 15.69-12.862l26.855-134.276A16 16 0 0 1 45.117 480h69.766a15.999 15.999 0 0 0 15.689-12.862l26.856-134.276A15.999 15.999 0 0 1 173.117 320H256M-200 320h58.883a15.999 15.999 0 0 0 15.689-12.862l26.856-134.276A16 16 0 0 1-82.883 160h69.766a16 16 0 0 0 15.69-12.862L29.427 12.862A16 16 0 0 1 45.117 0H128" />
        </pattern>
      </defs>
    </svg>
  )
}

export function HeroScene() {
  const [particles] = useState(generateParticles)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particleLayerRef = useRef<HTMLDivElement>(null)

  useEffect(function parallaxParticles() {
    function handleMove(e: MouseEvent) {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }

    let raf: number
    function animate() {
      if (particleLayerRef.current) {
        const tx = mouseRef.current.x * -12
        const ty = mouseRef.current.y * -8
        particleLayerRef.current.style.transform = `translate(${tx}px, ${ty}px)`
      }
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove)
    raf = requestAnimationFrame(animate)
    return function cleanup() {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-neutral-950">
      {/* Interactive grid pattern -- dark inverted version */}
      <DarkGridPattern yOffset={-80} />

      {/* Floating particles layer -- parallax with mouse */}
      <div
        ref={particleLayerRef}
        className="absolute inset-[-40px] z-[2]"
        style={{ transition: 'transform 1.5s ease-out' }}
      >
        {particles.map(function renderParticle(p) {
          return (
            <span
              key={p.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                opacity: 0,
                animation: `particle-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
                '--drift-x': `${p.driftX}px`,
                '--drift-y': `${p.driftY}px`,
                '--peak-opacity': p.opacity,
              } as React.CSSProperties}
            />
          )
        })}
      </div>

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 25%, rgba(10,10,10,0.5) 65%, rgba(10,10,10,0.92) 100%)',
        }}
      />

      {/* Centre glow */}
      <div className="pointer-events-none absolute inset-0 z-[4]">
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.035]"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}
        />
      </div>

      {/* Logo + tagline */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform' }}
        >
          <Logomark animated delay={500} className="h-20 w-20 sm:h-28 sm:w-28" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2, ease: 'easeOut' }}
          className="mt-8 font-display text-lg tracking-widest text-white/60 sm:text-xl"
        >
          We build what&apos;s next.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="h-10 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent"
        />
      </motion.div>

      <style jsx global>{`
        @keyframes particle-drift {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
          }
          15% {
            opacity: var(--peak-opacity, 0.3);
          }
          50% {
            transform: translate(var(--drift-x, 10px), var(--drift-y, -10px));
            opacity: var(--peak-opacity, 0.3);
          }
          85% {
            opacity: var(--peak-opacity, 0.3);
          }
        }
      `}</style>
    </div>
  )
}
