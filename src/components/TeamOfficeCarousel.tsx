'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const SLIDES = [
  { src: '/images/employers.jpg', alt: 'Our team' },
  { src: '/images/office.jpg', alt: 'Our office' },
  { src: '/images/building.jpg', alt: 'Our building' },
  { src: '/images/team.jpg', alt: 'Team collaboration' },
];

const INTERVAL_MS = 4500;

export default function TeamOfficeCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  function goTo(next: number) {
    setIndex((i) => {
      const n = i + next;
      if (n < 0) return SLIDES.length - 1;
      if (n >= SLIDES.length) return 0;
      return n;
    });
  }

  return (
    <div className="relative w-full max-w-md mx-auto rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-500 ${
              i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 448px"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => goTo(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button
        type="button"
        onClick={() => goTo(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-colors"
        aria-label="Next"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
      <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === index
                ? 'bg-primary-500 scale-110'
                : 'bg-white/80 dark:bg-gray-600 hover:bg-white dark:hover:bg-gray-500'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
