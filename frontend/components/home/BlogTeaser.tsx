'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';

const ARTICLES = [
  {
    id: '1',
    slug: 'guide-istanbul-algerie',
    title: 'Guide complet d\'Istanbul pour les voyageurs algériens',
    excerpt: 'Tout ce que vous devez savoir avant de partir : visa, change, transport, hôtels et incontournables.',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80',
    category: 'Guide voyage',
    readTime: 8,
    date: 'Mai 2026',
  },
  {
    id: '2',
    slug: 'omra-2026-conseils',
    title: 'Préparer son Omra 2026 : conseils et check-list',
    excerpt: 'Documents requis, préparation spirituelle, bagages essentiels et conseils pratiques pour un pèlerinage réussi.',
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80',
    category: 'Omra & Hajj',
    readTime: 10,
    date: 'Avril 2026',
  },
  {
    id: '3',
    slug: 'dubai-budget-algerien',
    title: 'Dubaï avec un budget algérien : c\'est possible !',
    excerpt: 'Nos astuces pour profiter de Dubaï sans se ruiner : bons plans hôtels, restaurants halal et activités gratuites.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    category: 'Conseils',
    readTime: 6,
    date: 'Mars 2026',
  },
];

export function BlogTeaser() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-accent-500 font-semibold text-sm uppercase tracking-wide mb-1">
            Inspiration & Conseils
          </p>
          <h2 className="text-3xl font-bold text-neutral-900">Le Blog Voyages</h2>
        </div>
        <Link
          href={ROUTES.blog}
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors"
        >
          Tous les articles <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {ARTICLES.map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={ROUTES.article(article.slug)} className="group block">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-100 mb-4">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-white/95 text-primary-600 text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-neutral-400 mb-2">
                <span>{article.date}</span>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime} min de lecture</span>
                </div>
              </div>

              <h3 className="font-semibold text-neutral-900 mb-2 leading-snug group-hover:text-primary-500 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
            </Link>
          </motion.article>
        ))}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link href={ROUTES.blog} className="text-sm font-semibold text-primary-500">
          Voir tous les articles →
        </Link>
      </div>
    </div>
  );
}
