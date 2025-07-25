//Work page

import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Blockquote } from '@/components/Blockquote'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Testimonial } from '@/components/Testimonial'
import { LogoCarousel } from '@/components/ui/logo-carousel'
import logoDealFuze from '@/images/clients/dealfuze/logo.svg'
import logoRenda from '@/images/clients/renda/logo.svg'
import logoCommunityWolf from '@/images/clients/community-wolf/logo.svg'
import logoCommunityWolfW from '@/images/clients/community-wolf/LogoW.svg'
import logoKenyaParliament from '@/images/clients/kenya-parliament/Kenya Coat of Arms Official.svg'
import logoMsingi from '@/images/clients/Msingi/Logo.svg'
import logoWordAndLearn from '@/images/clients/wordandlearn/WordandLearn Logo.svg'
import logoNigeria from '@/images/clients/nigeria/Coat of Arms Nigeria.svg'
import logoStorefront from '@/images/clients/Storefront/Logo.svg'
import logoBaobab from '@/images/clients/baobab/logo.svg'
import { formatDate } from '@/lib/formatDate'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <Container className="mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          Case studies
        </h2>
      </FadeIn>
      <div className="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
        {caseStudies.map((caseStudy) => (
          <FadeIn key={caseStudy.client}>
            <article>
              <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
                <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                  <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                    <Image
                      src={caseStudy.logo}
                      alt=""
                      className="h-16 w-16 flex-none"
                      unoptimized
                    />
                    <h3 className="mt-6 text-sm font-semibold text-neutral-950 sm:mt-0 lg:mt-8">
                      {caseStudy.client}
                    </h3>
                  </div>
                  <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                    <p className="text-sm tracking-tight text-neutral-950 after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] lg:mt-2 lg:after:hidden">
                      {caseStudy.service}
                    </p>
                    <p className="text-sm text-neutral-950 lg:mt-2">
                      <time dateTime={caseStudy.date}>
                        {formatDate(caseStudy.date)}
                      </time>
                    </p>
                  </div>
                </div>
                <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
                  <p className="font-display text-4xl font-medium text-neutral-950">
                    <Link href={caseStudy.href}>{caseStudy.title}</Link>
                  </p>
                  <div className="mt-6 space-y-6 text-base text-neutral-600">
                    {caseStudy.summary.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-8 flex">
                    <Button
                      href={caseStudy.href}
                      aria-label={`Read case study: ${caseStudy.client}`}
                    >
                      Read case study
                    </Button>
                  </div>
                  {caseStudy.testimonial && (
                    <Blockquote
                      author={caseStudy.testimonial.author}
                      className="mt-12"
                    >
                      {caseStudy.testimonial.content}
                    </Blockquote>
                  )}
                </div>
              </Border>
            </article>
          </FadeIn>
        ))}
      </div>
    </Container>
  )
}

const clientLogos = [
  { name: 'DealFuze', id: 1, src: logoDealFuze },
  { name: 'Renda', id: 2, src: logoRenda },
  { name: 'Community Wolf', id: 3, src: logoCommunityWolfW },
  { name: 'Baobab', id: 4, src: logoBaobab },
  { name: 'Kenya Parliament', id: 5, src: logoKenyaParliament },
  { name: 'Msingi', id: 6, src: logoMsingi },
  { name: 'Word and Learn', id: 7, src: logoWordAndLearn },
  { name: 'Nigeria', id: 8, src: logoNigeria },
  { name: 'Storefront', id: 9, src: logoStorefront }
]

function Clients() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          Trusted by Leading Organizations
        </h2>
      </FadeIn>
      <div className="mt-10">
        <LogoCarousel logos={clientLogos} columnCount={4} />
      </div>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'Our Impact',
  description:
    'Explore case studies that showcase how ProDG Studio drives digital innovation and delivers transformative solutions for global clients.',
}

export default async function Work() {
  let caseStudies = await loadCaseStudies()

  return (
    <>
      <PageIntro
        eyebrow="Our Work"
        title="Transforming Vision into Reality"
      >
        <p>
          At ProDG Studio, we deliver results through a unique blend of technological expertise and strategic insight. Our case studies illustrate how we empower organizations to achieve excellence and sustainable growth.
        </p>
      </PageIntro>

      <CaseStudies caseStudies={caseStudies} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'DealFuze', logo: logoDealFuze }}
      >
        The ProDG team delivered an exceptional AI solution that transformed our matching process. Their technical expertise and innovative approach helped us create a platform that truly understands the nuances of investor-founder relationships.
      </Testimonial>

      <Clients />

      <ContactSection />
    </>
  )
}
