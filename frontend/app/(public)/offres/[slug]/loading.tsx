import { Skeleton } from '@/components/ui/skeleton';

export default function OfferDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <Skeleton className="h-4 w-48 mb-5" />

      {/* Title */}
      <div className="mb-5 space-y-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-4 mt-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      {/* Gallery */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[420px] rounded-2xl overflow-hidden mb-8">
        <Skeleton className="col-span-2 row-span-2" />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
      <Skeleton className="md:hidden aspect-[16/9] rounded-xl mb-8" />

      {/* Content + Booking card */}
      <div className="flex gap-8">
        <div className="flex-1 space-y-6">
          <Skeleton className="h-5 w-48" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 rounded-lg" />
            ))}
          </div>
        </div>
        <Skeleton className="hidden md:block w-96 h-80 rounded-2xl shrink-0" />
      </div>
    </div>
  );
}
