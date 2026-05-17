'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { cn } from '@/lib/utils/classnames';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  const displayed = images.slice(0, 5);
  const main = displayed[0] ?? '';
  const thumbs = displayed.slice(1, 5);

  return (
    <>
      {/* Desktop gallery grid */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[420px] rounded-2xl overflow-hidden">
        {/* Main image */}
        <button
          className="col-span-2 row-span-2 relative overflow-hidden group"
          onClick={() => openLightbox(0)}
        >
          <Image
            src={main}
            alt={title}
            fill
            priority
            sizes="50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </button>

        {/* Thumbnails */}
        {thumbs.map((img, i) => (
          <button
            key={i}
            className={cn('relative overflow-hidden group', i === thumbs.length - 1 && images.length > 5 && 'relative')}
            onClick={() => openLightbox(i + 1)}
          >
            <Image
              src={img}
              alt={`${title} — ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            {/* More photos overlay on last thumb */}
            {i === thumbs.length - 1 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                <Expand className="w-6 h-6 mb-1" />
                <span className="text-sm font-semibold">+{images.length - 5} photos</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Mobile carousel */}
      <div className="md:hidden relative aspect-[16/9] rounded-xl overflow-hidden">
        <Image
          src={images[activeIndex] ?? main}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-colors',
                    i === activeIndex ? 'bg-white' : 'bg-white/50',
                  )}
                />
              ))}
            </div>
          </>
        )}

        <button
          onClick={() => openLightbox(activeIndex)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center"
        >
          <Expand className="w-4 h-4" />
        </button>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {activeIndex + 1} / {images.length}
            </div>

            {/* Image */}
            <div className="relative w-full max-w-5xl aspect-[16/9]">
              <Image
                src={images[activeIndex] ?? ''}
                alt={`${title} — ${activeIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Thumbnails strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-lg px-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    'relative w-14 h-10 rounded overflow-hidden shrink-0 transition-all',
                    i === activeIndex ? 'ring-2 ring-white opacity-100' : 'opacity-50 hover:opacity-80',
                  )}
                >
                  <Image src={img} alt="" fill sizes="56px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
