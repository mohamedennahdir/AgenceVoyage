'use client';

import type { UseFormRegister, FieldErrors, Path } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils/classnames';

export interface TravelerInput {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: 'M' | 'F';
  nationality: string;
  passportNumber?: string;
  passportExpiry?: string;
  passportCountry?: string;
}

export interface TravelersFormData {
  travelers: TravelerInput[];
}

interface TravelerFormProps {
  index: number;
  label: string;
  isAdult: boolean;
  register: UseFormRegister<TravelersFormData>;
  errors: FieldErrors<TravelersFormData>;
}

function field(index: number, name: keyof TravelerInput): Path<TravelersFormData> {
  return `travelers.${index}.${name}` as Path<TravelersFormData>;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-error-600 mt-1">{message}</p>;
}

export function TravelerForm({ index, label, isAdult, register, errors }: TravelerFormProps) {
  const te = errors.travelers?.[index];

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-neutral-50 border-b border-neutral-200">
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
          <User className="w-4 h-4 text-primary-600" />
        </div>
        <h3 className="font-semibold text-neutral-900 text-sm">{label}</h3>
      </div>

      {/* Fields */}
      <div className="p-5 space-y-4">
        {/* Nom / Prénom */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`fn-${index}`} className="text-xs font-medium mb-1.5 block">
              Prénom *
            </Label>
            <Input
              id={`fn-${index}`}
              placeholder="ex: Mohammed"
              {...register(field(index, 'firstName'))}
              className={cn(te?.firstName && 'border-error-400')}
            />
            <FieldError message={te?.firstName?.message} />
          </div>
          <div>
            <Label htmlFor={`ln-${index}`} className="text-xs font-medium mb-1.5 block">
              Nom *
            </Label>
            <Input
              id={`ln-${index}`}
              placeholder="ex: Benali"
              {...register(field(index, 'lastName'))}
              className={cn(te?.lastName && 'border-error-400')}
            />
            <FieldError message={te?.lastName?.message} />
          </div>
        </div>

        {/* Date de naissance / Genre */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`bd-${index}`} className="text-xs font-medium mb-1.5 block">
              Date de naissance *
            </Label>
            <Input
              id={`bd-${index}`}
              type="date"
              {...register(field(index, 'birthDate'))}
              className={cn(te?.birthDate && 'border-error-400')}
            />
            <FieldError message={te?.birthDate?.message} />
          </div>
          <div>
            <Label className="text-xs font-medium mb-1.5 block">Genre *</Label>
            <div className="flex gap-3 mt-2">
              {(['M', 'F'] as const).map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-1.5 text-sm cursor-pointer"
                >
                  <input
                    type="radio"
                    value={g}
                    {...register(field(index, 'gender'))}
                    className="accent-primary-500"
                  />
                  {g === 'M' ? 'Masculin' : 'Féminin'}
                </label>
              ))}
            </div>
            <FieldError message={te?.gender?.message} />
          </div>
        </div>

        {/* Nationalité */}
        <div>
          <Label htmlFor={`nat-${index}`} className="text-xs font-medium mb-1.5 block">
            Nationalité *
          </Label>
          <Input
            id={`nat-${index}`}
            placeholder="ex: Algérienne"
            defaultValue="Algérienne"
            {...register(field(index, 'nationality'))}
            className={cn(te?.nationality && 'border-error-400')}
          />
          <FieldError message={te?.nationality?.message} />
        </div>

        {/* Passeport (adultes) */}
        {isAdult && (
          <>
            <Separator />
            <p className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">
              Informations passeport
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`pp-${index}`} className="text-xs font-medium mb-1.5 block">
                  N° passeport *
                </Label>
                <Input
                  id={`pp-${index}`}
                  placeholder="ex: 123456789"
                  {...register(field(index, 'passportNumber'))}
                  className={cn(te?.passportNumber && 'border-error-400')}
                />
                <FieldError message={te?.passportNumber?.message} />
              </div>
              <div>
                <Label htmlFor={`pe-${index}`} className="text-xs font-medium mb-1.5 block">
                  Date d&apos;expiration *
                </Label>
                <Input
                  id={`pe-${index}`}
                  type="date"
                  {...register(field(index, 'passportExpiry'))}
                  className={cn(te?.passportExpiry && 'border-error-400')}
                />
                <FieldError message={te?.passportExpiry?.message} />
              </div>
            </div>
            <div>
              <Label htmlFor={`pc-${index}`} className="text-xs font-medium mb-1.5 block">
                Pays d&apos;émission *
              </Label>
              <Input
                id={`pc-${index}`}
                placeholder="ex: Algérie"
                defaultValue="Algérie"
                {...register(field(index, 'passportCountry'))}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
