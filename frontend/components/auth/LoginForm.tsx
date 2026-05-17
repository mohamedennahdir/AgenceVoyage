'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { SocialButtons } from './SocialButtons';
import { loginSchema, type LoginFormData } from '@/lib/validators/auth.schema';
import { loginWithEmail } from '@/lib/firebase/auth';
import { ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/classnames';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') ?? ROUTES.account;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginWithEmail(data.email, data.password);
      toast.success('Connexion réussie !');
      router.push(returnUrl);
    } catch (error: unknown) {
      const code = (error as { code?: string }).code;
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
        toast.error('Email ou mot de passe incorrect');
      } else if (code === 'auth/too-many-requests') {
        toast.error('Trop de tentatives. Réessayez dans quelques minutes.');
      } else {
        toast.error('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">Connexion</h1>
        <p className="text-neutral-500 text-sm mt-1">Accédez à votre espace personnel</p>
      </div>

      <SocialButtons returnUrl={returnUrl} />

      <div className="relative my-6">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-neutral-400">
          ou avec votre email
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            autoComplete="email"
            {...register('email')}
            className={cn(errors.email && 'border-error-500 focus-visible:ring-error-100')}
          />
          {errors.email && (
            <p className="text-xs text-error-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            <Link
              href={ROUTES.forgotPassword}
              className="text-xs text-primary-500 hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
              {...register('password')}
              className={cn(
                'pr-10',
                errors.password && 'border-error-500 focus-visible:ring-error-100',
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-error-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="rememberMe" {...register('rememberMe')} />
          <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
            Se souvenir de moi
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Connexion...
            </>
          ) : (
            'Se connecter'
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-neutral-500 mt-6">
        Pas encore de compte ?{' '}
        <Link href={ROUTES.register} className="text-primary-500 font-semibold hover:underline">
          S&apos;inscrire
        </Link>
      </p>
    </div>
  );
}
