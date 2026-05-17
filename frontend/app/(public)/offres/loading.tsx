import { Skeleton } from '@/components/ui/skeleton';

export default function OffresLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-6 w-32 mb-2" />
      <Skeleton className="h-8 w-64 mb-2" />
      <Skeleton className="h-4 w-80 mb-6" />

      <div className="flex gap-2 mb-6 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full shrink-0" />
        ))}
      </div>

      <div className="flex gap-8">
        <Skeleton className="hidden lg:block h-96 w-64 shrink-0 rounded-xl" />
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-white border border-neutral-100">
              <Skeleton className="aspect-[4/3]" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-5 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
