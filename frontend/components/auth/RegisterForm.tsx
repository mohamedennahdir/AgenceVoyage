'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { SocialButtons } from './SocialButtons';
import { registerSchema, type RegisterFormData } from '@/lib/validators/auth.schema';
import { registerWithEmail, verifyEmail } from '@/lib/firebase/auth';
import { db, COLLECTIONS, doc, setDoc, serverTimestamp } from '@/lib/firebase/firestore';
import { ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/classnames';

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: '8+ caractères', ok: password.length >= 8 },
    { label: 'Majuscule', ok: /[A-Z]/.test(password) },
    { label: 'Chiffre', ok: /[0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const colors = ['bg-error-500', 'bg-warning-500', 'bg-warning-400', 'bg-success-500'];

  if (!password) return null;

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'flex-1 h-1 rounded-full transition-colors duration-300',
              i < score ? colors[score] : 'bg-neutral-200',
            )}
          />
        ))}
      </div>
      <div className="flex gap-3">
        {checks.map(({ label, ok }) => (
          <span key={label} className={cn('text-xs', ok ? 'text-success-600' : 'text-neutral-400')}>
            {ok ? '✓' : '○'} {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { acceptTerms: false },
  });

  const password = watch('password', '');
  const acceptTerms = watch('acceptTerms');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { user } = await registerWithEmail(data.email, data.password);

      // Créer profil Firestore
      await setDoc(doc(db, COLLECTIONS.users, user.uid), {
        id: user.uid,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: 'customer',
        status: 'active',
        emailVerified: false,
        phoneVerified: false,
        preferences: {
          language: 'fr',
          currency: 'DZD',
          notifications: { email: true, sms: true, push: true, whatsapp: false },
          newsletter: false,
        },
        stats: {
          totalBookings: 0,
          totalSpent: 0,
          memberSince: serverTimestamp(),
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Envoyer email de vérification
      await verifyEmail(user);

      toast.success('Compte créé ! Vérifiez votre email pour activer votre compte.');
      router.push(ROUTES.account);
    } catch (error: unknown) {
      const code = (error as { code?: string }).code;
      if (code === 'auth/email-already-in-use') {
        toast.error('Un compte existe déjà avec cet email.');
      } else {
        toast.error('Erreur lors de la création du compte. Réessayez.');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">Créer un compte</h1>
        <p className="text-neutral-500 text-sm mt-1">Rejoignez des milliers de voyageurs</p>
      </div>

      <SocialButtons />

      <div className="relative my-6">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-neutral-400">
          ou avec votre email
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              placeholder="Ahmed"
              autoComplete="given-name"
              {...register('firstName')}
              className={cn(errors.firstName && 'border-error-500')}
            />
            {errors.firstName && (
              <p className="text-xs text-error-600">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              placeholder="Benali"
              autoComplete="family-name"
              {...register('lastName')}
              className={cn(errors.lastName && 'border-error-500')}
            />
            {errors.lastName && (
              <p className="text-xs text-error-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
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

        <div className="space-y-1.5">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+213 6XX XX XX XX"
            autoComplete="tel"
            {...register('phone')}
            className={cn(errors.phone && 'border-error-500')}
          />
          {errors.phone && <p className="text-xs text-error-600">{errors.phone.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Mot de passe</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="new-password"
              {...register('password')}
              className={cn('pr-10', errors.password && 'border-error-500')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <PasswordStrength password={password} />
          {errors.password && <p className="text-xs text-error-600">{errors.password.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            {...register('confirmPassword')}
            className={cn(errors.confirmPassword && 'border-error-500')}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-error-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id="acceptTerms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setValue('acceptTerms', checked === true)}
            className="mt-0.5"
          />
          <Label htmlFor="acceptTerms" className="text-sm font-normal cursor-pointer leading-snug">
            J&apos;accepte les{' '}
            <Link href={ROUTES.cgv} className="text-primary-500 hover:underline" target="_blank">
              conditions générales de vente
            </Link>{' '}
            et la{' '}
            <Link href={ROUTES.privacy} className="text-primary-500 hover:underline" target="_blank">
              politique de confidentialité
            </Link>
          </Label>
        </div>
        {errors.acceptTerms && (
          <p className="text-xs text-error-600">{errors.acceptTerms.message}</p>
        )}

        <Button
          type="submit"
          className="w-full"
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Créer mon compte
        </Button>
      </form>

      <p className="text-center text-sm text-neutral-500 mt-6">
        Déjà un compte ?{' '}
        <Link href={ROUTES.login} className="text-primary-500 font-semibold hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
