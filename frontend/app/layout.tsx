import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/components/providers';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Voyages Algérie — Billets, Hôtels, Omra, Circuits',
    template: '%s | Voyages Algérie',
  },
  description:
    'Réservez vos voyages en ligne depuis l\'Algérie : vols, hôtels, packages Omra & Hajj, circuits. Paiement CIB/Edahabia sécurisé.',
  keywords: ['voyages', 'algérie', 'omra', 'hajj', 'circuits', 'billets avion', 'hôtels', 'CIB', 'SATIM'],
  authors: [{ name: 'Voyages Algérie' }],
  creator: 'Voyages Algérie',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://voyages.dz'),
  openGraph: {
    type: 'website',
    locale: 'fr_DZ',
    url: '/',
    siteName: 'Voyages Algérie',
    title: 'Voyages Algérie — Billets, Hôtels, Omra, Circuits',
    description: 'Réservez vos voyages en ligne depuis l\'Algérie.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voyages Algérie',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
