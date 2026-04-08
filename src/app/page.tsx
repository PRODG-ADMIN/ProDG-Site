//Home page

import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import { LogoCarousel } from '@/components/ui/logo-carousel'
import { WorldMap } from '@/components/ui/world-map'
import { Accordion } from '@/components/ui/accordion'
import vggLogo from '@/images/clients/vgg/vgg-logo.png'
import { ClientLogosDisplay } from '@/components/ClientLogos'
import logoIdiAfrica from '@/images/clients/idi-africa/idi-logomark.png'
import logoRenda from '@/images/clients/renda/logo.svg'
import logoActionLabs from '@/images/clients/action-labs/logomark.png'
import logoCommunityWolfW from '@/images/clients/community-wolf/LogoW.svg'
import logoKenyaParliament from '@/images/clients/kenya-parliament/Kenya Coat of Arms Official.svg'
import logoMsingi from '@/images/clients/Msingi/Logo.svg'
import logoNigeria from '@/images/clients/nigeria/Coat of Arms Nigeria.svg'
import logoStorefront from '@/images/clients/Storefront/Logo.svg'
import logoFibertime from '@/images/clients/fibertime/fibertime-logo.svg'
import logoLegends from '@/images/clients/legends/legends-logo.png'
import logoBaobab from '@/images/clients/baobab/logo.svg'
import imageLaptop from '@/images/laptop.jpg'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import imageMohamed from '@/app/work/deal-fuze/mohamed-hassan-al-sheraie.jpg'
import imageMichael from '@/app/work/CommunityWolf/michael-houghton.jpg'
import imageTom from '@/app/work/renda/tom-fairburn.jpg'
import imageToby from '@/app/work/baobab/toby-hanington.jpg'

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

// Define global connection dots for the WorldMap
const globalConnections = [
  // London to Nairobi
  {
    start: { lat: 51.5074, lng: -0.1278, label: "London" },
    end: { lat: -1.2921, lng: 36.8219, label: "Nairobi" }
  },
  // London to New York
  {
    start: { lat: 51.5074, lng: -0.1278, label: "London" },
    end: { lat: 40.7128, lng: -74.0060, label: "New York" }
  },
  // Nairobi to Cape Town
  {
    start: { lat: -1.2921, lng: 36.8219, label: "Nairobi" },
    end: { lat: -33.9249, lng: 18.4241, label: "Cape Town" }
  },
  // London to Singapore
  {
    start: { lat: 51.5074, lng: -0.1278, label: "London" },
    end: { lat: 1.3521, lng: 103.8198, label: "Singapore" }
  },
  // Abuja to London
  {
    start: { lat: 9.0765, lng: 7.3986, label: "Abuja" },
    end: { lat: 51.5074, lng: -0.1278, label: "London" }
  }
]

function Clients() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56 relative overflow-hidden">
      {/* World Map Background */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <WorldMap dots={globalConnections} lineColor="#FFFFFF" />
      </div>

      <Container className="relative z-10">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Our Esteemed Global Partners
            </h2>
            <div className="mt-4 h-px w-24 bg-neutral-800 mx-auto" />
          </div>

          <div className="mx-auto mt-6 max-w-4xl text-center">
            <p className="text-base text-neutral-300 leading-relaxed">
              We collaborate with pioneering organizations, forward-thinking government bodies,
              and visionary entrepreneurs across continents. Through these strategic alliances, we
              share a common goal: to push boundaries, harness the power of emerging
              technologies, and shape a brighter digital future.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 relative">
          <ClientLogosDisplay logos={clientLogos} layout="scroll" />
        </div>
      </Container>
    </div>
  )
}

function ProDGIntro() {
  return (
    <Container className="mt-24 sm:mt-32 md:mt-56">
      <FadeIn>
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-6xl font-bold tracking-tight text-neutral-950 [text-wrap:balance] sm:text-8xl">
            ProDG Studio
          </h1>
          <h2 className="mt-6 font-display text-3xl font-medium tracking-tight text-neutral-800 [text-wrap:balance] sm:text-4xl">
            Empowering Global Transformation
          </h2>
          <p className="mt-6 text-xl text-neutral-600 leading-relaxed">
            We combine advanced software development, strategic insights, and comprehensive business support to drive digital transformation and venture success for leading organizations around the world.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-base font-semibold text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
            >
              Work with Us
            </Link>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <>
      <SectionIntro
        title="Transforming Vision into Reality"
        className="mt-24 sm:mt-32 lg:mt-40"
        centered
      >
        <p>
          See how we've helped our clients achieve excellence, growth, and innovation
          through customized solutions. Our projects combine user-focused design,
          powerful technology, and strategic thinking to elevate organizations in
          the digital world. These success stories can inspire your own transformation.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={caseStudy.date.split('-')[0]}
                    className="font-semibold"
                  >
                    {caseStudy.date.split('-')[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function TestimonialsSection({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  const authorImageMap: Record<string, any> = {
    'Mohamed Hassan Al Sheraie': imageMohamed,
    'Michael Houghton': imageMichael,
    'Tom Fairburn': imageTom,
    'Toby Hanington': imageToby,
  };

  // Transform case studies into the format expected by AnimatedTestimonials
  const testimonials = caseStudies.map((study) => {
    const authorName = study.testimonial.author.name;
    // Get the appropriate image for this author or use the first one as default
    const testimonialImage = authorImageMap[authorName] || imageMohamed;

    return {
      quote: study.testimonial.content,
      name: authorName,
      designation: study.testimonial.author.role,
      src: testimonialImage.src, // Use the imported image's src property
    };
  });

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Hear directly from the businesses and organizations we've helped transform through strategic digital solutions.
          </p>
        </div>
        <div className="mx-auto max-w-5xl">
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </div>
      </FadeIn>
    </Container>
  )
}

function Services() {
  const serviceItems = [
    {
      title: "Ideation & Conceptualization",
      content: (
        <p className="text-neutral-600">
          We ignite your product lifecycle by uncovering untapped market opportunities
          and refining bold ideas into actionable blueprints — laying the groundwork for
          breakthrough solutions.
        </p>
      )
    },
    {
      title: "Bespoke Software & Digital Solutions",
      content: (
        <p className="text-neutral-600">
          Our expert team crafts compelling websites, custom applications, and robust
          digital platforms that elevate your brand, streamline operations, and keep you
          ahead of the competition.
        </p>
      )
    },
    {
      title: "Strategic Consultancy & Business Support",
      content: (
        <p className="text-neutral-600">
          Through tailored insights and hands-on guidance, we optimize performance,
          solve complex challenges, and help you build a resilient roadmap for
          sustainable growth.
        </p>
      )
    },
    {
      title: "Venture Incubation & Innovation",
      content: (
        <p className="text-neutral-600">
          We nurture high-potential startups with expert mentorship, global
          connections, and access to cutting-edge resources — transforming ambitious
          visions into market-leading ventures.
        </p>
      )
    }
  ];

  return (
    <>
      <SectionIntro
        eyebrow="Services"
        title="We Help You Discover, Design, and Deliver the Future."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          From bespoke software development and digital innovation to strategic consultancy and venture incubation, we deliver integrated solutions that accelerate business success.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageLaptop}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <div className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <FadeIn>
              <Accordion
                items={serviceItems}
                allowMultiple={true}
                className="bg-white rounded-2xl shadow-sm"
              />
            </FadeIn>
          </div>
        </div>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  title: 'ProDG Studio: Pioneering Digital Innovation',
  description:
    'Empowering businesses through bespoke software, strategic consultancy, and tailored business support across a global network.',
}

export default async function Home() {
  let caseStudies = (await loadCaseStudies()).slice(0, 3)

  return (
    <>
      <ProDGIntro />
      <Clients />

      <CaseStudies caseStudies={caseStudies} />

      <TestimonialsSection caseStudies={caseStudies} />

      <Services />

      <ContactSection />
    </>
  )
}
