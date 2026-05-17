'use client';

import { useState } from 'react';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/classnames';

interface DateRangePickerProps {
  from?: Date;
  to?: Date;
  onChange?: (from?: Date, to?: Date) => void;
  placeholder?: string;
  className?: string;
  singleDate?: boolean;
}

export function DateRangePicker({
  from,
  to,
  onChange,
  placeholder = 'Dates de voyage',
  className,
  singleDate = false,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<{ from?: Date; to?: Date }>({ from, to });

  const formatDate = (date?: Date) =>
    date ? format(date, 'dd MMM', { locale: fr }) : '';

  const displayValue = () => {
    if (!range.from) return placeholder;
    if (singleDate) return format(range.from, 'dd MMMM yyyy', { locale: fr });
    if (!range.to) return formatDate(range.from);
    return `${formatDate(range.from)} → ${formatDate(range.to)}`;
  };

  const handleSelect = (selected: { from?: Date; to?: Date } | undefined) => {
    const newRange = selected ?? {};
    setRange(newRange);
    onChange?.(newRange.from, newRange.to);
    if (singleDate && newRange.from) setOpen(false);
    if (!singleDate && newRange.from && newRange.to) setOpen(false);
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRange({});
    onChange?.(undefined, undefined);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={cn(
        'flex items-center gap-2 w-full px-3 py-3 bg-white border border-neutral-200 rounded-lg',
        'text-sm hover:border-primary-400 transition-colors text-left',
        range.from ? 'text-neutral-900' : 'text-neutral-400',
        className,
      )}>
        <CalendarIcon className="w-4 h-4 text-neutral-400 shrink-0" />
        <span className="flex-1 truncate">{displayValue()}</span>
        {range.from && (
          <button onClick={clear} className="text-neutral-400 hover:text-neutral-600 shrink-0">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          {/* Raccourcis */}
          {!singleDate && (
            <div className="flex gap-2 mb-3">
              {[
                { label: 'Ce weekend', days: 2 },
                { label: 'Semaine pro', days: 7 },
                { label: '1 mois', days: 30 },
              ].map(({ label, days }) => (
                <Button
                  key={label}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => {
                    const start = new Date();
                    const end = new Date();
                    end.setDate(end.getDate() + days);
                    handleSelect({ from: start, to: end });
                  }}
                >
                  {label}
                </Button>
              ))}
            </div>
          )}
          {singleDate ? (
            <Calendar
              mode="single"
              selected={range.from}
              onSelect={(val) => handleSelect({ from: val })}
              disabled={{ before: new Date() }}
              numberOfMonths={1}
              locale={fr}
              />
          ) : (
            <Calendar
              mode="range"
              selected={range.from ? { from: range.from, to: range.to } : undefined}
              onSelect={(val) => handleSelect(val ? { from: val.from, to: val.to } : undefined)}
              disabled={{ before: new Date() }}
              numberOfMonths={2}
              locale={fr}
              />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
