import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="flex items-center gap-1 text-sm text-neutral-500">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />}
          {item.href && index < items.length - 1 ? (
            <Link href={item.href} className="hover:text-primary-500 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className={index === items.length - 1 ? 'text-neutral-900 font-medium' : ''}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
