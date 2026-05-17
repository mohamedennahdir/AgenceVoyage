'use client';

import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
// SheetTrigger uses @base-ui render prop (no asChild support)
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FiltersSidebar } from '@/components/search/FiltersSidebar';
import type { SearchState } from '@/lib/hooks/useSearch';

interface FiltersMobileProps {
  filters: SearchState;
  onChange: (updates: Partial<SearchState>) => void;
  onReset: () => void;
  resultCount?: number;
  activeFilterCount?: number;
}

export function FiltersMobile({
  filters,
  onChange,
  onReset,
  resultCount,
  activeFilterCount = 0,
}: FiltersMobileProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={<Button variant="outline" size="sm" className="gap-2 relative" />}
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filtres
        {activeFilterCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
            {activeFilterCount}
          </span>
        )}
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] overflow-y-auto rounded-t-2xl">
        <SheetHeader className="mb-4">
          <SheetTitle>Filtres</SheetTitle>
        </SheetHeader>
        <FiltersSidebar
          filters={filters}
          onChange={onChange}
          onReset={onReset}
          resultCount={resultCount}
        />
      </SheetContent>
    </Sheet>
  );
}
