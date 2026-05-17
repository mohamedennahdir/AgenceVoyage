'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Veuillez saisir une adresse email valide.');
      return;
    }
    setLoading(true);
    // TODO Sprint 6: Cloud Function subscribeNewsletter
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
    toast.success('Vous êtes inscrit à notre newsletter !');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-5">
          <Mail className="w-7 h-7 text-white" />
        </div>

        <h2 className="text-3xl font-bold text-white mb-3">
          Restez informé des meilleures offres
        </h2>
        <p className="text-white/75 mb-8 max-w-xl mx-auto">
          Recevez en avant-première nos promotions exclusives, destinations du moment
          et conseils de voyage directement dans votre boîte email.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 py-4">
            <CheckCircle className="w-6 h-6 text-success-400" />
            <span className="text-white font-semibold">Merci ! Vous êtes maintenant inscrit.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/60 focus:bg-white/15"
            />
            <Button
              type="submit"
              variant="accent"
              size="lg"
              loading={loading}
              className="whitespace-nowrap gap-2"
            >
              <Send className="w-4 h-4" />
              S&apos;inscrire
            </Button>
          </form>
        )}

        <p className="text-white/40 text-xs mt-4">
          Pas de spam. Désabonnement en un clic. Conformément à la loi 18-07 sur la protection des données.
        </p>
      </motion.div>
    </div>
  );
}
