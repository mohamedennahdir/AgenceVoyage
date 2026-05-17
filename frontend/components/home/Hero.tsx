'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SearchEngine } from './SearchEngine';

const HERO_STATS = [
  { icon: 'ðŸ›¡ï¸', label: 'AgrÃ©Ã© MinistÃ¨re du Tourisme' },
  { icon: 'â­', label: '+5 000 voyageurs satisfaits' },
  { icon: 'ðŸ’³', label: 'Paiement CIB/Edahabia' },
];

export function Hero() {
  return (
    <section className="relative min-h-[700px] lg:min-h-[820px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85"
          alt="Destination de voyage"
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-neutral-900/40 to-neutral-900/70" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-5"
          >
            Votre prochaine aventure
            <br />
            <span className="text-accent-300">commence ici</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed"
          >
            RÃ©servez vos voyages depuis l&apos;AlgÃ©rie â€” vols, hÃ´tels, circuits et packages Omra
            en toute sÃ©rÃ©nitÃ©, paiement CIB/Edahabia sÃ©curisÃ©.
          </motion.p>
        </div>

        {/* Moteur de recherche */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
        >
          <SearchEngine />
        </motion.div>

        {/* Badges de confiance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8"
        >
          {HERO_STATS.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/85 text-sm">
              <span className="text-xl">{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
