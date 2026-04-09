'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { HeroScene } from '@/components/three/HeroScene'
import { ManifestoReveal } from '@/components/ManifestoReveal'
import { ClientLogosDisplay } from '@/components/ClientLogos'
import { type CaseStudy, type MDXEntry } from '@/lib/mdx'

import logoActionLabs from '@/images/clients/action-labs/logomark.png'
import logoRenda from '@/images/clients/renda/logo.svg'
import logoCommunityWolfW from '@/images/clients/community-wolf/LogoW.svg'
import logoKenyaParliament from '@/images/clients/kenya-parliament/Kenya Coat of Arms Official.svg'
import logoMsingi from '@/images/clients/Msingi/Logo.svg'
import logoNigeria from '@/images/clients/nigeria/Coat of Arms Nigeria.svg'
import logoStorefront from '@/images/clients/Storefront/Logo.svg'
import logoFibertime from '@/images/clients/fibertime/fibertime-logo.svg'
import logoLegends from '@/images/clients/legends/legends-logo.png'
import logoBaobab from '@/images/clients/baobab/logo.svg'
import vggLogo from '@/images/clients/vgg/vgg-logo.png'
import logoIdiAfrica from '@/images/clients/idi-africa/idi-logomark.png'

const clientLogos = [
  { name: 'Action Labs', id: 1, src: logoActionLabs },
  { name: 'Renda', id: 2, src: logoRenda },
  { name: 'Fibertime', id: 11, src: logoFibertime },
  { name: 'Community Wolf', id: 3, src: logoCommunityWolfW },
  { name: 'IDI Africa', id: 4, src: logoIdiAfrica },
  { name: 'VGG', id: 5, src: vggLogo },
  { name: 'Baobab', id: 6, src: logoBaobab },
  { name: 'Legends', id: 12, src: logoLegends },
  { name: 'Kenya Parliament', id: 7, src: logoKenyaParliament },
  { name: 'Msingi', id: 8, src: logoMsingi },
  { name: 'Nigeria', id: 9, src: logoNigeria },
  { name: 'Storefront', id: 10, src: logoStorefront },
]

function Clients() {
  return (
    <section className="bg-neutral-950 py-24 sm:py-32">
      <Container>
        <FadeIn>
          <p className="text-center text-sm tracking-[0.3em] text-white/30 uppercase">
            Trusted by
          </p>
          <div className="mt-10">
            <ClientLogosDisplay logos={clientLogos} layout="scroll" />
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

function CaseStudyCard({ caseStudy }: { caseStudy: MDXEntry<CaseStudy> }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link href={caseStudy.href} className="block">
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04] sm:p-10">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
          </div>

          <div className="relative">
            <Image
              src={caseStudy.logo}
              alt={caseStudy.client}
              className="h-10 w-10 brightness-0 invert opacity-60"
              unoptimized
            />
            <h3 className="mt-8 font-display text-2xl font-semibold text-white sm:text-3xl">
              {caseStudy.title}
            </h3>
            <p className="mt-3 text-base text-white/40 leading-relaxed line-clamp-2">
              {caseStudy.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

function CaseStudies({ caseStudies }: { caseStudies: Array<MDXEntry<CaseStudy>> }) {
  return (
    <section className="bg-neutral-950 py-24 sm:py-32">
      <Container>
        <FadeIn>
          <p className="text-center text-sm tracking-[0.3em] text-white/30 uppercase">
            Selected work
          </p>
        </FadeIn>
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {caseStudies.map(function renderStudy(caseStudy) {
            return <CaseStudyCard key={caseStudy.href} caseStudy={caseStudy} />
          })}
        </div>
      </Container>
    </section>
  )
}

const services = [
  {
    number: '01',
    title: 'Ideation',
    description:
      'We unearth the opportunity before the product exists. Market gaps, user pain, untested hypotheses \u2014 distilled into a blueprint worth building.',
  },
  {
    number: '02',
    title: 'Engineering',
    description:
      'Bespoke systems built to last. We architect and ship software that scales \u2014 web platforms, mobile, APIs, infrastructure \u2014 from first commit to production.',
  },
  {
    number: '03',
    title: 'Consultancy',
    description:
      'Strategic clarity when it matters. We embed with leadership teams to untangle complexity, optimise operations, and chart the path forward.',
  },
  {
    number: '04',
    title: 'Ventures',
    description:
      'We don\u2019t just advise \u2014 we build. High-conviction ideas become companies through our studio, backed by capital, talent, and a global network.',
  },
]

function ServiceRow({
  number,
  title,
  description,
  index,
}: {
  number: string
  title: string
  description: string
  index: number
}) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group border-b border-white/[0.06] last:border-b-0"
      onMouseEnter={function enter() { setExpanded(true) }}
      onMouseLeave={function leave() { setExpanded(false) }}
    >
      <div className="flex cursor-default items-baseline gap-6 py-8 sm:gap-10 sm:py-10">
        <span className="font-display text-sm tabular-nums tracking-widest text-white/20 transition-colors duration-500 group-hover:text-white/50">
          {number}
        </span>
        <div className="flex-1">
          <h3 className="font-display text-3xl font-semibold tracking-tight text-white/70 transition-colors duration-500 group-hover:text-white sm:text-4xl lg:text-5xl">
            {title}
          </h3>
          <motion.div
            initial={false}
            animate={{
              height: expanded ? 'auto' : 0,
              opacity: expanded ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-base leading-relaxed text-white/40 sm:max-w-lg sm:text-lg">
              {description}
            </p>
          </motion.div>
        </div>
        <motion.span
          initial={false}
          animate={{ rotate: expanded ? 45 : 0, opacity: expanded ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
          className="hidden text-2xl text-white/30 sm:block"
          aria-hidden="true"
        >
          +
        </motion.span>
      </div>
    </motion.div>
  )
}

function Services() {
  return (
    <section className="bg-neutral-950 py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <p className="mb-16 text-center text-sm tracking-[0.3em] text-white/30 uppercase">
              What we do
            </p>
          </FadeIn>
          {services.map(function renderService(item, index) {
            return (
              <ServiceRow
                key={item.number}
                number={item.number}
                title={item.title}
                description={item.description}
                index={index}
              />
            )
          })}
        </div>
      </Container>
    </section>
  )
}

function RotatingTestimonial({ caseStudies }: { caseStudies: Array<MDXEntry<CaseStudy>> }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(function autoRotate() {
    const interval = setInterval(function next() {
      setActiveIndex(function increment(prev) {
        return (prev + 1) % caseStudies.length
      })
    }, 6000)
    return function cleanup() { clearInterval(interval) }
  }, [caseStudies.length])

  const study = caseStudies[activeIndex]
  if (!study) return null

  return (
    <section className="bg-neutral-950 py-32 sm:py-40">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
            >
              <blockquote className="font-display text-xl italic leading-relaxed text-white/70 sm:text-2xl">
                &ldquo;{study.testimonial.content}&rdquo;
              </blockquote>
              <p className="mt-8 text-sm tracking-wide text-white/30">
                {study.testimonial.author.name}
                <span className="mx-2 text-white/10">|</span>
                {study.testimonial.author.role}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}

function SignalCTA() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <section ref={ref} className="bg-neutral-950 py-40 sm:py-52">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <p className="font-display text-5xl font-bold tracking-tight text-white sm:text-7xl">
            Ready?
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block text-lg text-white/50 underline decoration-white/20 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-white/60"
          >
            Get in touch
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export function HomeContent({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <div className="bg-neutral-950">
      <HeroScene />
      <ManifestoReveal />
      <Clients />
      {caseStudies.length > 0 && <CaseStudies caseStudies={caseStudies} />}
      {caseStudies.length > 0 && <RotatingTestimonial caseStudies={caseStudies} />}
      <Services />
      <SignalCTA />
    </div>
  )
}
