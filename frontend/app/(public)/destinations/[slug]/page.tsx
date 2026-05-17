import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Destination' };

export default function DestinationPage({ params }: { params: { slug: string } }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-neutral-900">Destination: {params.slug}</h1>
    </div>
  );
}
