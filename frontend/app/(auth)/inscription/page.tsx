import type { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Créer un compte',
  description: 'Rejoignez Voyages Algérie et réservez vos voyages en toute simplicité.',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
