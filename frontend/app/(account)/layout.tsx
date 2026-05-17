export const dynamic = 'force-dynamic';

import { Header } from '@/components/layout/Header';
import { AccountSidebar } from '@/components/layout/AccountSidebar';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <AccountSidebar />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </>
  );
}
