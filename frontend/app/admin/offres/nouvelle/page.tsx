'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Save, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/classnames';

const offerSchema = z.object({
  title: z.string().min(5, 'Titre trop court (min. 5 car.)'),
  subtitle: z.string().optional(),
  type: z.enum(['package', 'circuit', 'omra', 'hajj', 'hotel', 'flight'] as const),
  destinations: z.string().min(2, 'Indiquez au moins une destination'),
  durationDays: z.number().min(1, 'Durée invalide'),
  durationNights: z.number().min(0),
  basePrice: z.number().min(1000, 'Prix trop bas'),
  childPriceRatio: z.number().min(0).max(1),
  description: z.string().min(20, 'Description trop courte'),
  highlights: z.string().optional(),
  mainImageUrl: z.string().optional(),
  status: z.enum(['draft', 'published'] as const),
});

type OfferForm = z.infer<typeof offerSchema>;

function Section({
  title, children, defaultOpen = true,
}: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl border border-neutral-200">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <h2 className="font-semibold text-neutral-800">{title}</h2>
        {open ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-neutral-100 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}

export default function NewOfferPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const {
    register, handleSubmit, setValue, watch,
    formState: { errors },
  } = useForm<OfferForm>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      type: 'package',
      durationDays: 7,
      durationNights: 6,
      childPriceRatio: 0.7,
      status: 'draft',
    },
  });

  const currentType = watch('type');
  const currentStatus = watch('status');

  const onSubmit = (data: OfferForm) => {
    console.log('Offre créée (mock):', data);
    setSaved(true);
    setTimeout(() => {
      router.push(ROUTES.adminOffers);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push(ROUTES.adminOffers)}
          className="text-neutral-400 hover:text-neutral-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-neutral-800 flex-1">Nouvelle offre</h1>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" className="gap-2">
            <Eye className="w-4 h-4" />
            Aperçu
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="gap-2"
            disabled={saved}
          >
            <Save className="w-4 h-4" />
            {saved ? 'Enregistré !' : currentStatus === 'published' ? 'Publier' : 'Brouillon'}
          </Button>
        </div>
      </div>

      {/* Section 1 — Infos générales */}
      <Section title="Informations générales">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-xs font-medium mb-1.5 block">Titre *</Label>
            <Input
              id="title"
              placeholder="ex: Istanbul — La Ville aux Deux Continents"
              {...register('title')}
              className={cn(errors.title && 'border-error-400')}
            />
            {errors.title && <p className="text-xs text-error-600 mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="subtitle" className="text-xs font-medium mb-1.5 block">Sous-titre</Label>
            <Input
              id="subtitle"
              placeholder="ex: Bosphore, palais ottomans et saveurs orientales"
              {...register('subtitle')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-medium mb-1.5 block">Type d&apos;offre *</Label>
              <Select
                value={currentType}
                onValueChange={(v) => setValue('type', v as OfferForm['type'])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    ['package', 'Package'],
                    ['circuit', 'Circuit'],
                    ['omra', 'Omra'],
                    ['hajj', 'Hajj'],
                    ['hotel', 'Hôtel'],
                    ['flight', 'Vol'],
                  ].map(([v, l]) => (
                    <SelectItem key={v} value={v}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="destinations" className="text-xs font-medium mb-1.5 block">Destinations *</Label>
              <Input
                id="destinations"
                placeholder="ex: Istanbul, Turquie"
                {...register('destinations')}
                className={cn(errors.destinations && 'border-error-400')}
              />
              {errors.destinations && <p className="text-xs text-error-600 mt-1">{errors.destinations.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="durationDays" className="text-xs font-medium mb-1.5 block">Durée (jours) *</Label>
              <Input id="durationDays" type="number" min={1} {...register('durationDays', { valueAsNumber: true })} />
            </div>
            <div>
              <Label htmlFor="durationNights" className="text-xs font-medium mb-1.5 block">Durée (nuits)</Label>
              <Input id="durationNights" type="number" min={0} {...register('durationNights', { valueAsNumber: true })} />
            </div>
          </div>
        </div>
      </Section>

      {/* Section 2 — Contenu */}
      <Section title="Contenu et description">
        <div className="space-y-4">
          <div>
            <Label htmlFor="description" className="text-xs font-medium mb-1.5 block">Description *</Label>
            <Textarea
              id="description"
              rows={5}
              placeholder="Décrivez le voyage, l'ambiance, les points forts..."
              {...register('description')}
              className={cn(errors.description && 'border-error-400')}
            />
            {errors.description && <p className="text-xs text-error-600 mt-1">{errors.description.message}</p>}
          </div>
          <div>
            <Label htmlFor="highlights" className="text-xs font-medium mb-1.5 block">
              Points forts (un par ligne)
            </Label>
            <Textarea
              id="highlights"
              rows={4}
              placeholder={'Visite de Sainte-Sophie\nCroisière sur le Bosphore\nGrand Bazar'}
              {...register('highlights')}
            />
          </div>
        </div>
      </Section>

      {/* Section 3 — Tarification */}
      <Section title="Tarification">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="basePrice" className="text-xs font-medium mb-1.5 block">Prix adulte (DZD) *</Label>
              <Input
                id="basePrice"
                type="number"
                min={1000}
                step={500}
                placeholder="85000"
                {...register('basePrice', { valueAsNumber: true })}
                className={cn(errors.basePrice && 'border-error-400')}
              />
              {errors.basePrice && <p className="text-xs text-error-600 mt-1">{errors.basePrice.message}</p>}
            </div>
            <div>
              <Label htmlFor="childPriceRatio" className="text-xs font-medium mb-1.5 block">
                Ratio enfant (0–1)
              </Label>
              <Input
                id="childPriceRatio"
                type="number"
                min={0}
                max={1}
                step={0.05}
                {...register('childPriceRatio', { valueAsNumber: true })}
              />
              <p className="text-xs text-neutral-400 mt-1">0.7 = 70% du prix adulte</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 4 — Médias */}
      <Section title="Image principale" defaultOpen={false}>
        <div>
          <Label htmlFor="mainImageUrl" className="text-xs font-medium mb-1.5 block">URL de l&apos;image</Label>
          <Input
            id="mainImageUrl"
            placeholder="https://images.unsplash.com/..."
            {...register('mainImageUrl')}
          />
          <p className="text-xs text-neutral-400 mt-1">Utilisez une image Unsplash (format: ?w=800&q=80)</p>
        </div>
      </Section>

      {/* Section 5 — Publication */}
      <Section title="Publication" defaultOpen={false}>
        <div>
          <Label className="text-xs font-medium mb-1.5 block">Statut</Label>
          <div className="flex gap-3">
            {(['draft', 'published'] as const).map((s) => (
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
                {s === 'draft' ? 'Brouillon' : 'Publié'}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Submit */}
      <div className="flex gap-3">
        <Button type="submit" variant="primary" size="lg" className="gap-2" disabled={saved}>
          <Save className="w-4 h-4" />
          {saved ? 'Enregistré !' : 'Créer l\'offre'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push(ROUTES.adminOffers)}>
          Annuler
        </Button>
      </div>
    </form>
  );
}
