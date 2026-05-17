import type { Metadata } from 'next';
import Link from 'next/link';
import { MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants/routes';

export const metadata: Metadata = {
  title: 'Vérification email',
};

export default function EmailVerificationPage() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
        <MailCheck className="w-8 h-8 text-primary-500" />
      </div>
      <h1 className="text-xl font-bold text-neutral-900 mb-2">Vérifiez votre email</h1>
      <p className="text-neutral-500 text-sm mb-6">
        Nous vous avons envoyé un lien de confirmation. Cliquez dessus pour activer votre compte.
        <br />
        Pensez à vérifier votre dossier spam.
      </p>
      <Link href={ROUTES.account}>
        <Button className="w-full" size="lg">
          Accéder à mon espace
        </Button>
      </Link>
    </div>
  );
}
