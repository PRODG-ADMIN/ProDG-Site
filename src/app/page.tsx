import { type Metadata } from 'next'

import { HomeContent } from '@/components/HomeContent'
import { loadCaseStudies } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'ProDG Studio',
  description:
    'We build what\u2019s next. Software, strategy, ventures \u2014 worldwide.',
}

export default async function Home() {
  const caseStudies = (await loadCaseStudies()).slice(0, 3)

  return <HomeContent caseStudies={caseStudies} />
}
