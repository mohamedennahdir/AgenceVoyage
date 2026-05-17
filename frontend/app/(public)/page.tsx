import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { PopularDestinations } from '@/components/home/PopularDestinations';
import { FeaturedOffers } from '@/components/home/FeaturedOffers';
import { OmraSection } from '@/components/home/OmraSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Testimonials } from '@/components/home/Testimonials';
import { BlogTeaser } from '@/components/home/BlogTeaser';
import { Newsletter } from '@/components/home/Newsletter';
import { JsonLd, organizationSchema, websiteSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Voyages Algérie — Billets, Hôtels, Omra, Circuits',
  description:
    'Réservez vos voyages depuis l\'Algérie : vols, hôtels, packages Omra & Hajj, circuits. Paiement CIB/Edahabia sécurisé via SATIM.',
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
      <Hero />

      <section className="section-padding bg-neutral-50">
        <PopularDestinations />
      </section>

      <section className="section-padding bg-white">
        <FeaturedOffers />
      </section>

      <OmraSection />

      <section className="section-padding bg-neutral-50">
        <WhyChooseUs />
      </section>

      <section className="section-padding bg-white">
        <Testimonials />
      </section>

      <section className="section-padding bg-neutral-50">
        <BlogTeaser />
      </section>

      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800">
        <Newsletter />
      </section>
    </>
  );
}
