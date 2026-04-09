'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { WorldMap } from '@/components/ui/world-map'

const words = ['Software.', 'Strategy.', 'Ventures.']

const globalConnections = [
  {
    start: { lat: 51.5074, lng: -0.1278 },
    end: { lat: -1.2921, lng: 36.8219 },
  },
  {
    start: { lat: 51.5074, lng: -0.1278 },
    end: { lat: 40.7128, lng: -74.006 },
  },
  {
    start: { lat: -1.2921, lng: 36.8219 },
    end: { lat: -33.9249, lng: 18.4241 },
  },
  {
    start: { lat: 51.5074, lng: -0.1278 },
    end: { lat: 1.3521, lng: 103.8198 },
  },
  {
    start: { lat: 9.0765, lng: 7.3986 },
    end: { lat: 51.5074, lng: -0.1278 },
  },
]

function ManifestoWord({ word, index }: { word: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' })

  return (
    <div ref={ref} className="flex min-h-[30vh] items-center justify-center">
      <motion.span
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 40, filter: 'blur(10px)' }
        }
        transition={{
          duration: 1.2,
          delay: index * 0.05,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="font-display text-6xl font-bold tracking-tight text-white sm:text-8xl lg:text-9xl"
      >
        {word}
      </motion.span>
    </div>
  )
}

function WorldwideReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })

  return (
    <div ref={ref} className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          isInView
            ? { opacity: 0.4, scale: 1 }
            : { opacity: 0, scale: 0.9 }
        }
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-full max-w-5xl">
          <WorldMap dots={isInView ? globalConnections : []} lineColor="#FFFFFF" />
        </div>
      </motion.div>

      <motion.span
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 40, filter: 'blur(10px)' }
        }
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-10 font-display text-6xl font-bold tracking-tight text-white sm:text-8xl lg:text-9xl"
      >
        Worldwide.
      </motion.span>
    </div>
  )
}

export function ManifestoReveal() {
  return (
    <section className="bg-neutral-950 py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {words.map(function renderWord(word, index) {
          return <ManifestoWord key={word} word={word} index={index} />
        })}
        <WorldwideReveal />
      </div>
    </section>
  )
}
