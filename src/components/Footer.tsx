//Footer component

import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { socialMediaProfiles } from '@/components/SocialMedia'
import { NewsletterForm } from '@/components/NewsletterForm'

const navigation = [
  {
    title: 'Work',
    links: [
      { title: 'Community Wolf', href: '/work/CommunityWolf' },
      { title: 'DealFuze', href: '/work/deal-fuze' },
      { title: 'Renda', href: '/work/renda' },
      { title: 'Baobab', href: '/work/baobab' },
      {
        title: (
          <>
            See all <span aria-hidden="true">&rarr;</span>
          </>
        ),
        href: '/work',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'About', href: '/about' },
      { title: 'Process', href: '/process' },
      // { title: 'Blog', href: '/blog' },
      { title: 'Contact us', href: '/contact' },
    ],
  },
  {
    title: 'Connect',
    links: [
      ...socialMediaProfiles,
      { title: 'Join the Community', href: 'https://forms.gle/dAoiN31hTm9UVT1R9' }
    ],
  },
]

function Navigation({ invert = false }: { invert?: boolean }) {
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className={clsx(
              'font-display text-sm font-semibold tracking-wider',
              invert ? 'text-white' : 'text-neutral-950',
            )}>
              {section.title}
            </div>
            <ul role="list" className={clsx('mt-4 text-sm', invert ? 'text-neutral-400' : 'text-neutral-700')}>
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <Link
                    href={link.href}
                    className={clsx('transition', invert ? 'hover:text-white' : 'hover:text-neutral-950')}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

export function Footer({ invert = false }: { invert?: boolean }) {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation invert={invert} />
          <div className="flex lg:justify-end">
            <NewsletterForm invert={invert} />
          </div>
        </div>
        <div className={clsx(
          'mb-20 mt-24 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t pt-12',
          invert ? 'border-white/10' : 'border-neutral-950/10',
        )}>
          <Link href="/" aria-label="Home">
            <Logo className="h-8" invert={invert} />
          </Link>
          <p className={clsx('text-sm', invert ? 'text-neutral-400' : 'text-neutral-700')}>
            &copy; ProDG Studio Inc. {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
