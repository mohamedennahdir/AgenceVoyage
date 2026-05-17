'use client';

import { useState } from 'react';
import { Check, X, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils/classnames';
import type { OfferDetail } from '@/lib/data/offer-details';

interface OfferContentProps {
  detail: OfferDetail;
  offerType?: string;
}

export function OfferContent({ detail, offerType }: OfferContentProps) {
  const [activeDay, setActiveDay] = useState(0);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([0]));

  const toggleDay = (index: number) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="space-y-8">
      {/* Description */}
      <section>
        <h2 className="text-xl font-bold text-neutral-900 mb-3">À propos de ce voyage</h2>
        <p className="text-neutral-600 leading-relaxed">{detail.description}</p>
      </section>

      <Separator />

      {/* Points forts */}
      <section>
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Les points forts</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {detail.highlights.map((hl, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-primary-600" />
              </span>
              <span className="text-neutral-700 text-sm leading-relaxed">{hl}</span>
            </li>
          ))}
        </ul>
      </section>

      <Separator />

      {/* Programme jour par jour */}
      <section>
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Programme détaillé</h2>

        {/* Desktop: tabs horizontales */}
        <div className="hidden sm:block">
          <div className="flex gap-1 overflow-x-auto pb-1 mb-5 no-scrollbar">
            {detail.itinerary.map((day, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className={cn(
                  'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                  activeDay === i
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200',
                )}
              >
                Jour {day.day}
              </button>
            ))}
          </div>

          {detail.itinerary[activeDay] && (
            <div className="bg-neutral-50 rounded-xl p-5">
              <h3 className="font-semibold text-neutral-900 text-base mb-2">
                Jour {detail.itinerary[activeDay].day} — {detail.itinerary[activeDay].title}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                {detail.itinerary[activeDay].description}
              </p>
              {detail.itinerary[activeDay].activities.length > 0 && (
                <ul className="space-y-1.5">
                  {detail.itinerary[activeDay].activities.map((act, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                      {act}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Mobile: accordion */}
        <div className="sm:hidden space-y-2">
          {detail.itinerary.map((day, i) => (
            <div key={i} className="border border-neutral-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleDay(i)}
                className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {day.day}
                  </span>
                  <span className="font-medium text-neutral-900 text-sm">{day.title}</span>
                </div>
                {expandedDays.has(i) ? (
                  <ChevronUp className="w-4 h-4 text-neutral-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                )}
              </button>
              {expandedDays.has(i) && (
                <div className="px-4 pb-4 border-t border-neutral-100">
                  <p className="text-neutral-600 text-sm leading-relaxed mt-3 mb-3">{day.description}</p>
                  {day.activities.length > 0 && (
                    <ul className="space-y-1.5">
                      {day.activities.map((act, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-neutral-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                          {act}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Hôtels */}
      {detail.hotels && detail.hotels.length > 0 && (
        <>
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Hébergements</h2>
            <div className="space-y-4">
              {detail.hotels.map((hotel, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border border-neutral-200 rounded-xl">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-neutral-900 text-sm">{hotel.name}</h3>
                      <div className="flex">
                        {Array.from({ length: hotel.stars }).map((_, j) => (
                          <Star key={j} className="w-3 h-3 fill-warning-500 text-warning-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500 mb-1">{hotel.city}</p>
                    <p className="text-sm text-neutral-600 leading-relaxed">{hotel.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <Separator />
        </>
      )}

      {/* Inclus / Non inclus */}
      <section>
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Ce qui est inclus</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-success-700 text-sm mb-3 flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              Inclus dans le prix
            </h3>
            <ul className="space-y-2">
              {detail.included.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                  <Check className="w-3.5 h-3.5 text-success-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-error-600 text-sm mb-3 flex items-center gap-1.5">
              <X className="w-4 h-4" />
              Non inclus
            </h3>
            <ul className="space-y-2">
              {detail.notIncluded.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-neutral-500">
                  <X className="w-3.5 h-3.5 text-error-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Conditions */}
      {detail.conditions && (
        <>
          <Separator />
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">Conditions & Annulation</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">{detail.conditions}</p>
          </section>
        </>
      )}
    </div>
  );
}
