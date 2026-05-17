'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { ALL_OFFERS, OFFER_TYPE_LABELS } from '@/lib/data/offers';
import { getOfferDetail } from '@/lib/data/offer-details';
import { ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/classnames';

const offerSchema = z.object({
  title: z.string().min(5, 'Titre trop court'),
  subtitle: z.string().optional(),
  type: z.enum(['package', 'circuit', 'omra', 'hajj', 'hotel', 'flight'] as const),
  destinations: z.string().min(2, 'Destinations requises'),
  durationDays: z.number().min(1),
  durationNights: z.number().min(0),
  basePrice: z.number().min(1000),
  description: z.string().min(20),
  highlights: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived'] as const),
});

type OfferForm = z.infer<typeof offerSchema>;

export default function EditOfferPage() {
  const params = useParams();
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const offer = ALL_OFFERS.find((o) => o.id === params.id);
  const detail = offer ? getOfferDetail(offer.slug) : null;

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<OfferForm>({
    resolver: zodResolver(offerSchema),
    defaultValues: offer
      ? {
          title: offer.title,
          subtitle: detail?.subtitle ?? '',
          type: offer.type as OfferForm['type'],
          destinations: offer.destinations.join(', '),
          durationDays: offer.duration.days,
          durationNights: offer.duration.nights,
          basePrice: offer.pricing.basePrice,
          description: detail?.description ?? '',
          highlights: detail?.highlights.join('\n') ?? '',
          status: 'published',
        }
      : { type: 'package', durationDays: 7, durationNights: 6, status: 'published' },
  });

  const currentType = watch('type');
  const currentStatus = watch('status');

  if (!offer) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral-500 mb-4">Offre introuvable.</p>
        <Button variant="outline" onClick={() => router.push(ROUTES.adminOffers)}>Retour</Button>
      </div>
    );
  }

  const onSubmit = (data: OfferForm) => {
    console.log('Offre mise à jour (mock):', data);
    setSaved(true);
    setTimeout(() => router.push(ROUTES.adminOffers), 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => router.push(ROUTES.adminOffers)} className="text-neutral-400 hover:text-neutral-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-neutral-800 flex-1 truncate">Éditer : {offer.title}</h1>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" className="gap-2 border-error-300 text-error-600 hover:bg-error-50">
            <Trash2 className="w-4 h-4" />
            Supprimer
          </Button>
          <Button type="submit" variant="primary" size="sm" className="gap-2" disabled={saved}>
            <Save className="w-4 h-4" />
            {saved ? 'Enregistré !' : 'Enregistrer'}
          </Button>
        </div>
      </div>

      {/* Infos générales */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4">
        <h2 className="font-semibold text-neutral-800">Informations générales</h2>
        <div>
          <Label htmlFor="title" className="text-xs font-medium mb-1.5 block">Titre *</Label>
          <Input id="title" {...register('title')} className={cn(errors.title && 'border-error-400')} />
          {errors.title && <p className="text-xs text-error-600 mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <Label htmlFor="subtitle" className="text-xs font-medium mb-1.5 block">Sous-titre</Label>
          <Input id="subtitle" {...register('subtitle')} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-xs font-medium mb-1.5 block">Type</Label>
            <Select value={currentType} onValueChange={(v) => setValue('type', v as OfferForm['type'])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(OFFER_TYPE_LABELS).map(([v, l]) => (
                  <SelectItem key={v} value={v}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="destinations" className="text-xs font-medium mb-1.5 block">Destinations *</Label>
            <Input id="destinations" {...register('destinations')} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="durationDays" className="text-xs font-medium mb-1.5 block">Jours *</Label>
            <Input id="durationDays" type="number" min={1} {...register('durationDays', { valueAsNumber: true })} />
          </div>
          <div>
            <Label htmlFor="durationNights" className="text-xs font-medium mb-1.5 block">Nuits</Label>
            <Input id="durationNights" type="number" min={0} {...register('durationNights', { valueAsNumber: true })} />
          </div>
          <div>
            <Label htmlFor="basePrice" className="text-xs font-medium mb-1.5 block">Prix DZD *</Label>
            <Input id="basePrice" type="number" min={1000} {...register('basePrice', { valueAsNumber: true })} />
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4">
        <h2 className="font-semibold text-neutral-800">Contenu</h2>
        <div>
          <Label htmlFor="description" className="text-xs font-medium mb-1.5 block">Description *</Label>
          <Textarea id="description" rows={5} {...register('description')} className={cn(errors.description && 'border-error-400')} />
        </div>
        <div>
          <Label htmlFor="highlights" className="text-xs font-medium mb-1.5 block">Points forts (un par ligne)</Label>
          <Textarea id="highlights" rows={4} {...register('highlights')} />
        </div>
      </div>

      {/* Statut */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h2 className="font-semibold text-neutral-800 mb-3">Statut de publication</h2>
        <div className="flex gap-3">
          {(['draft', 'published', 'archived'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setValue('status', s)}
              className={cn(
                'px-4 py-2 rounded-lg border text-sm font-medium transition-all',
                currentStatus === s
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-neutral-200 text-neutral-600 hover:border-neutral-300',
              )}
            >
              {s === 'draft' ? 'Brouillon' : s === 'published' ? 'Publié' : 'Archivé'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" variant="primary" size="lg" disabled={saved}>
          {saved ? 'Enregistré !' : 'Sauvegarder les modifications'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push(ROUTES.adminOffers)}>Annuler</Button>
      </div>
    </form>
  );
}
