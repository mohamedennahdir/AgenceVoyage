'use client';

import { motion, type Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Headphones, CreditCard, Award, MapPin, Clock } from 'lucide-react';

const REASONS = [
  {
    icon: Award,
    title: 'AgrÃ©Ã© officiellement',
    desc: 'Licence agence catÃ©gorie A et agrÃ©ment Omra/Hajj du MinistÃ¨re des Affaires Religieuses.',
    color: 'bg-primary-50 text-primary-500',
  },
  {
    icon: CreditCard,
    title: 'Paiement 100% sÃ©curisÃ©',
    desc: 'Paiement par carte CIB et Edahabia via SATIM. Vos donnÃ©es bancaires sont protÃ©gÃ©es.',
    color: 'bg-success-50 text-success-600',
  },
  {
    icon: Headphones,
    title: 'Support 7j/7',
    desc: 'Notre Ã©quipe est disponible par tÃ©lÃ©phone, WhatsApp et email pour vous accompagner.',
    color: 'bg-accent-50 text-accent-600',
  },
  {
    icon: ShieldCheck,
    title: 'Meilleur prix garanti',
    desc: 'Nous nous alignons sur tout prix concurrent identifiÃ© pour la mÃªme offre et dates.',
    color: 'bg-warning-50 text-warning-600',
  },
  {
    icon: MapPin,
    title: '+50 destinations',
    desc: 'Une sÃ©lection soigneuse des meilleures destinations, packages et hÃ´tels du monde.',
    color: 'bg-primary-50 text-primary-600',
  },
  {
    icon: Clock,
    title: 'RÃ©servation en 3 minutes',
    desc: 'Processus de rÃ©servation simplifiÃ©. Confirmation immÃ©diate par email et SMS.',
    color: 'bg-info-50 text-info-600',
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="text-center mb-10">
        <p className="text-accent-500 font-semibold text-sm uppercase tracking-wide mb-1">
          Pourquoi nous ?
        </p>
        <h2 className="text-3xl font-bold text-neutral-900">
          Votre voyage, notre prioritÃ©
        </h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {REASONS.map(({ icon: Icon, title, desc, color }) => (
          <motion.div
            key={title}
            variants={item}
            className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-primary-200 hover:shadow-md transition-all group"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}>
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">{title}</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
