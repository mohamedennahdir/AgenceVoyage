import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Article' };

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-neutral-900">Article: {params.slug}</h1>
    </div>
  );
}
