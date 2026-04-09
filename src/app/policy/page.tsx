import { Metadata } from 'next'
import { PageIntro } from '@/components/PageIntro'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How ProDG handles your data as a service provider and technology partner.',
}

export default function Policy() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Privacy Policy">
        <p>
          At ProDG, we take privacy seriously. This policy explains how we handle data while delivering web and app development projects for our clients and interacting with talent in our network.
        </p>
      </PageIntro>

      <Container className="mt-20 space-y-12 text-base text-neutral-700">
        <section>
          <h2 className="text-xl font-semibold text-neutral-900">1. Information We Collect</h2>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li><strong>Client Information:</strong> Names, emails, project briefs, and feedback shared with us during engagements.</li>
            <li><strong>Talent Information:</strong> Developer profiles, skillsets, contact details, and project history within our pool.</li>
            <li><strong>Usage Data:</strong> Site visit logs, page views, and general browsing behavior on our website.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>To match clients with the right developers and project teams</li>
            <li>To communicate about projects, timelines, and updates</li>
            <li>To improve our service offerings and digital experiences</li>
            <li>To send occasional updates, if you’ve subscribed</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900">3. Who We Share Data With</h2>
          <p className="mt-2">
            We only share necessary data with:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>Developers and project teams working on your solution</li>
            <li>Trusted partners who help us run our business (e.g., hosting providers)</li>
            <li>Authorities, if legally required to do so</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900">4. Data Security</h2>
          <p className="mt-2">
            We apply modern security standards to protect client and developer information — including encryption, access controls, and secure backups.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900">5. Your Rights</h2>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>Access or update your information by contacting us</li>
            <li>Request that we delete your data from our systems</li>
            <li>Unsubscribe from communications at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900">6. Cookies & Tracking</h2>
          <p className="mt-2">
            Our site uses minimal cookies to enhance your experience and analyze performance. You can manage cookie settings in your browser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900">7. Data Retention</h2>
          <p className="mt-2">
            We retain project and developer data only as long as needed to support collaboration, legal, or operational purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900">8. Policy Updates</h2>
          <p className="mt-2">
            This policy may change occasionally. Significant updates will be shared on our website or via email.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900">9. Contact Us</h2>
          <p className="mt-2">
            If you have any questions about this policy, reach out to us at <a href="mailto:privacy@prodg.dev" className="text-blue-600 hover:underline">privacy@prodg.dev</a>.
          </p>
        </section>
      </Container>

      <ContactSection />
    </>
  )
}
