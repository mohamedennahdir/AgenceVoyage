'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants/routes';

const FEATURES = [
  'Vols directs depuis Alger, Oran, Constantine',
  'Hébergements 4★ et 5★ à La Mecque et Médine',
  'Encadrement par des guides agréés',
  'Assurance voyage incluse',
  'Visa Omra pris en charge',
];

const PACKAGES = [
  { label: 'Economique', price: 185000, badge: null },
  { label: 'Confort', price: 245000, badge: 'Populaire' },
  { label: 'Luxe', price: 385000, badge: 'Premium' },
];

export function OmraSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1920&q=80"
          alt="La Mecque"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary-900/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-4">
              <span className="text-accent-300 text-sm font-semibold">Saison Omra 2026</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Vivez votre pèlerinage
              <br />
              <span className="text-accent-300">en toute sérénité</span>
            </h2>
            <p className="text-white/75 text-lg mb-6 leading-relaxed">
              Nos packages Omra et Hajj sont conçus pour vous offrir une expérience spirituelle
              inoubliable. Agréés par le Ministère des Affaires Religieuses.
            </p>

            <ul className="space-y-3 mb-8">
              {FEATURES.map((feat) => (
                <li key={feat} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-success-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-success-400" />
                  </div>
                  <span className="text-white/85 text-sm">{feat}</span>
                </li>
              ))}
            </ul>

            <Link href={ROUTES.omra}>
              <Button size="lg" variant="accent" className="gap-2">
                Découvrir les packages
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="grid grid-cols-3 gap-3"
          >
            {PACKAGES.map(({ label, price, badge }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center hover:bg-white/15 transition-colors cursor-pointer"
              >
                {badge && (
                  <span className="inline-block px-2 py-0.5 bg-accent-500 text-white text-xs font-semibold rounded-full mb-2">
                    {badge}
                  </span>
                )}
                <p className="font-semibold text-white text-sm mb-2">{label}</p>
                <p className="text-xs text-white/60 mb-1">À partir de</p>
                <p className="font-bold text-accent-300 text-lg">
                  {new Intl.NumberFormat('fr-DZ').format(price)}
                </p>
                <p className="text-white/50 text-xs">DZD / personne</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
