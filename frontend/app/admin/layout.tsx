export const dynamic = 'force-dynamic';

import { AdminSidebar } from '@/components/layout/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-neutral-200 px-6 py-3 flex items-center justify-between">
          <h1 className="font-semibold text-neutral-800 text-sm">Administration</h1>
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <span className="w-2 h-2 rounded-full bg-success-500 inline-block" />
            Connecté en tant qu&apos;admin
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
