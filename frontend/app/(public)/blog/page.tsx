import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Blog Voyages' };

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-neutral-900">Blog Voyages</h1>
    </div>
  );
}
