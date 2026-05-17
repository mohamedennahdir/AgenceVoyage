'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, BellOff, Tag, Calendar, FileText, AlertCircle, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_NOTIFICATIONS, type MockNotification } from '@/lib/data/mock-account';
import { cn } from '@/lib/utils/classnames';

export const dynamic = 'force-dynamic';

const NOTIF_ICONS: Record<MockNotification['type'], React.ElementType> = {
  booking_confirmed: Calendar,
  booking_cancelled: AlertCircle,
  promo: Tag,
  reminder: Bell,
  document: FileText,
};

const NOTIF_COLORS: Record<MockNotification['type'], string> = {
  booking_confirmed: 'bg-success-100 text-success-600',
  booking_cancelled: 'bg-error-100 text-error-600',
  promo: 'bg-accent-100 text-accent-600',
  reminder: 'bg-primary-100 text-primary-600',
  document: 'bg-neutral-100 text-neutral-600',
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'long', year: 'numeric' });

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Notifications</h1>
          <p className="text-neutral-500 text-sm mt-1">
            {unreadCount > 0 ? `${unreadCount} non lue${unreadCount > 1 ? 's' : ''}` : 'Tout est à jour'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" className="gap-2" onClick={markAllRead}>
            <CheckCheck className="w-4 h-4" />
            Tout marquer lu
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
          <BellOff className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <p className="text-neutral-500 text-sm">Aucune notification pour l&apos;instant.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notif) => {
            const Icon = NOTIF_ICONS[notif.type];
            const iconColor = NOTIF_COLORS[notif.type];

            const Content = (
              <div
                className={cn(
                  'flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer',
                  notif.read
                    ? 'bg-white border-neutral-200'
                    : 'bg-primary-50 border-primary-200',
                )}
                onClick={() => markRead(notif.id)}
              >
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', iconColor)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn('text-sm font-medium', notif.read ? 'text-neutral-700' : 'text-neutral-900')}>
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-sm text-neutral-500 mt-0.5 leading-relaxed">{notif.message}</p>
                  <p className="text-xs text-neutral-400 mt-1.5">{formatDate(notif.date)}</p>
                </div>
              </div>
            );

            return notif.link ? (
              <Link key={notif.id} href={notif.link} className="block">
                {Content}
              </Link>
            ) : (
              <div key={notif.id}>{Content}</div>
            );
          })}
        </div>
      )}
    </div>
  );
}
