import { format, formatDistance, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export function formatDate(date: Date | string, pattern = 'dd MMMM yyyy'): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, pattern, { locale: fr });
}

export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'dd/MM/yyyy', { locale: fr });
}

export function formatDateRange(start: Date | string, end: Date | string): string {
  const s = typeof start === 'string' ? parseISO(start) : start;
  const e = typeof end === 'string' ? parseISO(end) : end;
  return `${format(s, 'dd MMM', { locale: fr })} → ${format(e, 'dd MMM yyyy', { locale: fr })}`;
}

export function timeAgo(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDistance(d, new Date(), { addSuffix: true, locale: fr });
}
