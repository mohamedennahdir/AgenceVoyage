import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Minimal header */}
      <header className="px-4 py-4 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <Link href={ROUTES.home} className="inline-flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-5 h-5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-display font-bold text-xl text-primary-500">Voyages</span>
          </Link>
        </div>
      </header>

      {/* Content centré */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">{children}</div>
      </div>

      <footer className="py-4 text-center text-sm text-neutral-400">
        © {new Date().getFullYear()} Voyages Algérie
      </footer>
    </div>
  );
}
