'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants/config';

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber.replace(/\+/, '')}?text=${encodeURIComponent('Bonjour, je souhaite avoir des informations sur vos voyages.')}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter avec un conseiller sur WhatsApp"
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg cursor-pointer"
      >
        <MessageCircle className="w-7 h-7" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      </motion.div>
    </a>
  );
}
