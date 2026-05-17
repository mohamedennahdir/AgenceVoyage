'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PriceBreakdown } from '@/components/booking/PriceBreakdown';
import { TravelerForm, type TravelersFormData } from '@/components/booking/TravelerForm';
import { useBookingStore } from '@/store/bookingStore';
import { ROUTES } from '@/lib/constants/routes';

const travelerSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis (min. 2 caractères)'),
  lastName: z.string().min(2, 'Nom requis (min. 2 caractères)'),
  birthDate: z.string().min(1, 'Date de naissance requise'),
  gender: z.enum(['M', 'F'] as const),
  nationality: z.string().min(2, 'Nationalité requise'),
  passportNumber: z.string().optional(),
  passportExpiry: z.string().optional(),
  passportCountry: z.string().optional(),
});

const formSchema = z.object({ travelers: z.array(travelerSchema) });

export default function VoyageursPage() {
  const params = useParams();
  const router = useRouter();
  const offerId = params.offerId as string;
  const { adults, children, setTravelerData } = useBookingStore();

  const totalForms = adults + children;

  const defaultTraveler = {
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: 'M' as const,
    nationality: 'Algérienne',
    passportNumber: '',
    passportExpiry: '',
    passportCountry: 'Algérie',
  };

  const { register, handleSubmit, formState: { errors } } = useForm<TravelersFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      travelers: Array.from({ length: totalForms }, () => ({ ...defaultTraveler })),
    },
  });

  if (totalForms === 0) {
    router.push(ROUTES.reservationOptions(offerId));
    return null;
  }

  const onSubmit = (data: TravelersFormData) => {
    const stored = data.travelers.map((t, i) => ({
      type: i < adults ? ('adult' as const) : ('child' as const),
      firstName: t.firstName,
      lastName: t.lastName,
      birthDate: t.birthDate,
      gender: t.gender,
      nationality: t.nationality,
      ...(i < adults && t.passportNumber
        ? { passport: { number: t.passportNumber, expiryDate: t.passportExpiry ?? '', issueCountry: t.passportCountry ?? '' } }
        : {}),
    }));
    setTravelerData(stored);
    router.push(ROUTES.reservationRecap(offerId));
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-neutral-900">Informations voyageurs</h1>
            <p className="text-neutral-500 text-sm mt-1">
              Renseignez les informations de chaque voyageur telles qu&apos;elles apparaissent sur les passeports.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {Array.from({ length: adults }).map((_, i) => (
              <TravelerForm
                key={`adult-${i}`}
                index={i}
                label={`Adulte ${adults > 1 ? i + 1 : ''}`}
                isAdult
                register={register}
                errors={errors}
              />
            ))}
            {Array.from({ length: children }).map((_, i) => (
              <TravelerForm
                key={`child-${i}`}
                index={adults + i}
                label={`Enfant ${children > 1 ? i + 1 : ''}`}
                isAdult={false}
                register={register}
                errors={errors}
              />
            ))}

            {/* Navigation */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="gap-2"
                onClick={() => router.push(ROUTES.reservationOptions(offerId))}
              >
                <ArrowLeft className="w-4 h-4" />
                Retour
              </Button>
              <Button type="submit" variant="accent" size="lg" className="flex-1 gap-2">
                Continuer — Récapitulatif
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>

        <div className="hidden lg:block w-80 shrink-0">
          <PriceBreakdown />
        </div>
      </div>
    </div>
  );
}
