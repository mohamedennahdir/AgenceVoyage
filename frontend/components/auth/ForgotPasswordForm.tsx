'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validators/auth.schema';
import { resetPassword } from '@/lib/firebase/auth';
import { ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/classnames';

export function ForgotPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await resetPassword(data.email);
      setIsSuccess(true);
    } catch {
      toast.error('Impossible d\'envoyer l\'email. Vérifiez l\'adresse saisie.');
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-success-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-success-500" />
        </div>
        <h2 className="text-xl font-bold text-neutral-900 mb-2">Email envoyé !</h2>
        <p className="text-neutral-500 text-sm mb-6">
          Un lien de réinitialisation a été envoyé à{' '}
          <strong className="text-neutral-700">{getValues('email')}</strong>.
          <br />
          Vérifiez votre boîte spam si vous ne le trouvez pas.
        </p>
        <Link href={ROUTES.login}>
          <Button variant="outline" className="w-full">
            Retour à la connexion
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Mot de passe oublié</h1>
        <p className="text-neutral-500 text-sm mt-1">
          Entrez votre email pour recevoir un lien de réinitialisation.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="email">Adresse email</Label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            autoComplete="email"
            {...register('email')}
            className={cn(errors.email && 'border-error-500')}
          />
          {errors.email && <p className="text-xs text-error-600">{errors.email.message}</p>}
        </div>

        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
          Envoyer le lien
        </Button>
      </form>

      <p className="text-center text-sm text-neutral-500 mt-6">
        <Link href={ROUTES.login} className="text-primary-500 font-semibold hover:underline">
          ← Retour à la connexion
        </Link>
      </p>
    </div>
  );
}
