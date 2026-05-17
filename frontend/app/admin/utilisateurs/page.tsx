'use client';

import { useState } from 'react';
import { Plus, Pencil, Shield, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ADMIN_USERS, type AdminUser } from '@/lib/data/mock-admin-extra';
import { cn } from '@/lib/utils/classnames';

const ROLE_CONFIG: Record<AdminUser['role'], { label: string; color: string }> = {
  super_admin: { label: 'Super Admin', color: 'bg-primary-100 text-primary-700' },
  admin:       { label: 'Admin', color: 'bg-accent-100 text-accent-700' },
  agent:       { label: 'Agent', color: 'bg-neutral-100 text-neutral-600' },
};

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleString('fr-DZ', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—';

export default function AdminUsersPage() {
  const [users, setUsers] = useState(ADMIN_USERS);

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' as const : 'active' as const } : u
    ));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Utilisateurs internes</h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            {users.filter(u => u.status === 'active').length} actifs sur {users.length}
          </p>
        </div>
        <Button variant="primary" size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Nouvel utilisateur
        </Button>
      </div>

      <div className="space-y-3">
        {users.map(user => {
          const role = ROLE_CONFIG[user.role];
          return (
            <div key={user.id} className={cn(
              'bg-white rounded-xl border border-neutral-200 p-5 flex items-center gap-4',
              user.status !== 'active' && 'opacity-60'
            )}>
              {/* Avatar */}
              <div className={cn(
                'w-11 h-11 rounded-full flex items-center justify-center shrink-0 font-bold text-sm',
                user.role === 'super_admin' ? 'bg-primary-500 text-white' :
                user.role === 'admin' ? 'bg-accent-100 text-accent-700' : 'bg-neutral-100 text-neutral-600'
              )}>
                {user.firstName[0]}{user.lastName[0]}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-semibold text-neutral-900">{user.firstName} {user.lastName}</p>
                  <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', role.color)}>
                    {role.label}
                  </span>
                  {user.status !== 'active' && (
                    <Badge variant="secondary" className="text-xs text-error-600">Suspendu</Badge>
                  )}
                </div>
                <p className="text-sm text-neutral-500">{user.email}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {user.permissions.includes('all') ? (
                    <span className="text-xs bg-primary-50 text-primary-600 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Tous les accès
                    </span>
                  ) : user.permissions.map(p => (
                    <span key={p} className="text-xs bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded capitalize">{p}</span>
                  ))}
                </div>
              </div>

              {/* Last login */}
              <div className="hidden md:block text-right shrink-0">
                <p className="text-xs text-neutral-400">Dernière connexion</p>
                <p className="text-xs font-medium text-neutral-700">{formatDate(user.lastLogin)}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:border-warning-300 hover:text-warning-500 transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                {user.role !== 'super_admin' && (
                  <button
                    onClick={() => toggleStatus(user.id)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors',
                      user.status === 'active'
                        ? 'border-error-300 text-error-600 hover:bg-error-50'
                        : 'border-success-300 text-success-600 hover:bg-success-50'
                    )}
                  >
                    {user.status === 'active' ? 'Suspendre' : 'Réactiver'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
