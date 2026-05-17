'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { MOCK_USER } from '@/lib/data/mock-account';
import { cn } from '@/lib/utils/classnames';

export const dynamic = 'force-dynamic';

const profileSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(9, 'Téléphone requis'),
  birthDate: z.string().optional(),
  nationality: z.string().optional(),
  wilaya: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfilPage() {
  const [saved, setSaved] = useState(false);

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: MOCK_USER.firstName,
      lastName: MOCK_USER.lastName,
      email: MOCK_USER.email,
      phone: MOCK_USER.phone,
      birthDate: MOCK_USER.birthDate,
      nationality: MOCK_USER.nationality,
      wilaya: MOCK_USER.wilaya,
    },
  });

  const onSubmit = (_data: ProfileForm) => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Mon profil</h1>
        <p className="text-neutral-500 text-sm mt-1">Gérez vos informations personnelles.</p>
      </div>

      {/* Avatar */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center text-white text-xl font-bold shrink-0">
          {MOCK_USER.firstName[0]}{MOCK_USER.lastName[0]}
        </div>
        <div>
          <p className="font-semibold text-neutral-900">{MOCK_USER.firstName} {MOCK_USER.lastName}</p>
          <p className="text-sm text-neutral-500">{MOCK_USER.email}</p>
          <button className="text-xs text-primary-500 hover:underline mt-1">
            Changer la photo de profil
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-neutral-200 p-5 space-y-5">
        <h2 className="font-semibold text-neutral-900">Informations personnelles</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-xs font-medium mb-1.5 block">Prénom</Label>
            <Input id="firstName" {...register('firstName')} className={cn(errors.firstName && 'border-error-400')} />
            {errors.firstName && <p className="text-xs text-error-600 mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <Label htmlFor="lastName" className="text-xs font-medium mb-1.5 block">Nom</Label>
            <Input id="lastName" {...register('lastName')} className={cn(errors.lastName && 'border-error-400')} />
            {errors.lastName && <p className="text-xs text-error-600 mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="text-xs font-medium mb-1.5 block">Email</Label>
          <Input id="email" type="email" {...register('email')} className={cn(errors.email && 'border-error-400')} />
          {errors.email && <p className="text-xs text-error-600 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <Label htmlFor="phone" className="text-xs font-medium mb-1.5 block">Téléphone</Label>
          <Input id="phone" placeholder="+213 XXX XXX XXX" {...register('phone')} />
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="birthDate" className="text-xs font-medium mb-1.5 block">Date de naissance</Label>
            <Input id="birthDate" type="date" {...register('birthDate')} />
          </div>
          <div>
            <Label htmlFor="nationality" className="text-xs font-medium mb-1.5 block">Nationalité</Label>
            <Input id="nationality" {...register('nationality')} />
          </div>
        </div>

        <div>
          <Label htmlFor="wilaya" className="text-xs font-medium mb-1.5 block">Wilaya</Label>
          <Input id="wilaya" placeholder="ex: Alger" {...register('wilaya')} />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" variant="primary" size="md" className="gap-2" disabled={!isDirty && !saved}>
            {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? 'Enregistré !' : 'Enregistrer'}
          </Button>
          {saved && <p className="text-sm text-success-600">Profil mis à jour avec succès.</p>}
        </div>
      </form>
    </div>
  );
}
