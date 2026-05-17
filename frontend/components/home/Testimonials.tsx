'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: '1',
    name: 'Amina Khelifi',
    city: 'Alger',
    avatar: 'AK',
    rating: 5,
    date: 'Janvier 2026',
    trip: 'Istanbul 7 jours',
    comment:
      "Experience incroyable ! L'organisation etait parfaite du debut a la fin. L'hotel etait magnifique et le guide parlait francais couramment. Je recommande vivement !",
  },
  {
    id: '2',
    name: 'Karim Benmalek',
    city: 'Oran',
    avatar: 'KB',
    rating: 5,
    date: 'Decembre 2025',
    trip: 'Omra Decembre 2025',
    comment:
      "Package Omra de qualite exceptionnelle. Hotel 5 etoiles a 200m de la Mosquee. L'equipe a gere tout le processus visa sans aucun probleme. Merci infiniment.",
  },
  {
    id: '3',
    name: 'Fatima Zahra Bouali',
    city: 'Constantine',
    avatar: 'FZ',
    rating: 5,
    date: 'Novembre 2025',
    trip: 'Dubai 5 jours',
    comment:
      "Voyage parfait pour notre anniversaire de mariage. Tout etait inclus, aucune surprise desagreable. Le prix etait tres correct compare aux autres agences.",
  },
  {
    id: '4',
    name: 'Youcef Driss',
    city: 'Annaba',
    avatar: 'YD',
    rating: 4,
    date: 'Octobre 2025',
    trip: 'Le Caire 4 jours',
    comment:
      "Tres belle decouverte de l'Egypte. Programme bien rempli, guide competent. Je retire une etoile car un vol avait un retard de 2h, mais l'agence nous a bien informes.",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="text-center mb-10">
        <p className="text-accent-500 font-semibold text-sm uppercase tracking-wide mb-1">
          Ils nous font confiance
        </p>
        <h2 className="text-3xl font-bold text-neutral-900">Ce que disent nos clients</h2>
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-warning-500 text-warning-500" />
            ))}
          </div>
          <span className="font-semibold text-neutral-900">4.8</span>
          <span className="text-neutral-500 text-sm">· 5 000+ avis verifies</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {REVIEWS.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
            className="bg-white rounded-xl border border-neutral-200 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow"
          >
            <Quote className="w-6 h-6 text-primary-200" />

            <p className="text-neutral-600 text-sm leading-relaxed flex-1 line-clamp-5">
              &ldquo;{review.comment}&rdquo;
            </p>

            <div className="flex items-center gap-1 pt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-warning-500 text-warning-500' : 'fill-neutral-200 text-neutral-200'}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3 border-t border-neutral-100 pt-3">
              <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">{review.avatar}</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-neutral-900 text-sm truncate">{review.name}</p>
                <p className="text-neutral-400 text-xs truncate">
                  {review.city} · {review.trip}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
