'use client'

import clsx from 'clsx'
import Image, { type StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'

import frame368 from '@/assets/logo-gif/Frame 368.png'
import frame370 from '@/assets/logo-gif/Frame 370.png'
import frame371 from '@/assets/logo-gif/Frame 371.png'
import frame372 from '@/assets/logo-gif/Frame 372.png'
import frame373 from '@/assets/logo-gif/Frame 373.png'
import frame374 from '@/assets/logo-gif/Frame 374.png'
import frame375 from '@/assets/logo-gif/Frame 375.png'
import frame376 from '@/assets/logo-gif/Frame 376.png'
import frame377 from '@/assets/logo-gif/Frame 377.png'
import frame378 from '@/assets/logo-gif/Frame 378.png'
import frame379 from '@/assets/logo-gif/Frame 379.png'
import frame380 from '@/assets/logo-gif/Frame 380.png'
import frame381 from '@/assets/logo-gif/Frame 381.png'
import frame382 from '@/assets/logo-gif/Frame 382.png'
import frame383 from '@/assets/logo-gif/Frame 383.png'
import frame384 from '@/assets/logo-gif/Frame 384.png'
import frame385 from '@/assets/logo-gif/Frame 385.png'
import frame386 from '@/assets/logo-gif/Frame 386.png'
import frame387 from '@/assets/logo-gif/Frame 387.png'
import frame388 from '@/assets/logo-gif/Frame 388.png'
import frame389 from '@/assets/logo-gif/Frame 389.png'
import frame390 from '@/assets/logo-gif/Frame 390.png'
import frame391 from '@/assets/logo-gif/Frame 391.png'
import frame392 from '@/assets/logo-gif/Frame 392.png'
import frame393 from '@/assets/logo-gif/Frame 393.png'
import frame394 from '@/assets/logo-gif/Frame 394.png'
import frame395 from '@/assets/logo-gif/Frame 395.png'
import frame396 from '@/assets/logo-gif/Frame 396.png'

const FRAMES: StaticImageData[] = [
  frame368, frame370, frame371, frame372, frame373, frame374, frame375,
  frame376, frame377, frame378, frame379, frame380, frame381, frame382,
  frame383, frame384, frame385, frame386, frame387, frame388, frame389,
  frame390, frame391, frame392, frame393, frame394, frame395, frame396,
]

const LAST_FRAME = FRAMES[FRAMES.length - 1]

// Per-frame durations in ms — varies the pacing across the animation.
// Indices 0–27 map to frames 368–396.
const FRAME_DURATIONS: number[] = [
  // 0-4 (368–373): opening — let the first strokes register
  50, 55, 60, 60, 65,
  // 5-9 (374–378): picks up speed
  30, 30, 30, 25, 25,
  // 10-14 (379–383): fast through the body
  25, 25, 25, 25, 25,
  // 15-19 (384–388): stays quick
  25, 25, 30, 30, 30,
  // 20-24 (389–393): easing out
  35, 40, 45, 50, 60,
  // 25-27 (394–396): gentle land
  80, 100, 120,
]

function buildCumulativeTimestamps(durations: number[]): number[] {
  const timestamps: number[] = [0]
  for (let i = 0; i < durations.length; i++) {
    timestamps.push(timestamps[i] + durations[i])
  }
  return timestamps
}

const FRAME_TIMESTAMPS = buildCumulativeTimestamps(FRAME_DURATIONS)

export function Logomark({
  className,
  animated = false,
  delay = 0,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  animated?: boolean
  delay?: number
}) {
  const [frameIndex, setFrameIndex] = useState(animated ? 0 : FRAMES.length - 1)
  const [started, setStarted] = useState(!animated)
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(function startDelay() {
    if (!animated) return

    const timeout = setTimeout(function onDelayComplete() {
      setStarted(true)
    }, delay)

    return function cleanup() {
      clearTimeout(timeout)
    }
  }, [animated, delay])

  useEffect(function animateFrames() {
    if (!started || !animated) return

    function tick(timestamp: number) {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      let nextIndex = frameIndex
      for (let i = FRAMES.length - 1; i >= 0; i--) {
        if (elapsed >= FRAME_TIMESTAMPS[i]) {
          nextIndex = i
          break
        }
      }
      nextIndex = Math.min(nextIndex, FRAMES.length - 1)

      setFrameIndex(nextIndex)

      if (nextIndex < FRAMES.length - 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return function cleanup() {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [started, animated])

  return (
    <div className={clsx('relative', className)} aria-hidden="true" {...props}>
      <Image
        src={FRAMES[frameIndex]}
        alt=""
        fill
        sizes="(min-width: 640px) 112px, 80px"
        priority={frameIndex === 0}
        className="object-contain"
      />
    </div>
  )
}

export function LogomarkStatic({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={clsx('relative', className)} aria-hidden="true" {...props}>
      <Image
        src={LAST_FRAME}
        alt=""
        fill
        sizes="32px"
        className="object-contain"
      />
    </div>
  )
}

export function Logo({
  className,
  invert = false,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  invert?: boolean
}) {
  return (
    <div
      className={clsx('flex items-center gap-2', className)}
      aria-hidden="true"
      {...props}
    >
      <div className="relative h-8 w-8 shrink-0">
        <Image
          src={LAST_FRAME}
          alt=""
          fill
          sizes="32px"
          className="object-contain"
        />
      </div>
      <span
        className={clsx(
          'text-sm font-semibold tracking-wide',
          invert ? 'text-white' : 'text-neutral-950',
        )}
        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
      >
        ProDG Studio.
      </span>
    </div>
  )
}
