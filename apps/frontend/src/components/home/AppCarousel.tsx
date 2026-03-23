import { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_APPS } from '@/data/mockData';
import AppCard from './AppCard';

export default function AppCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    // Scroll by one card width (~300px or the first child width)
    const cardWidth = el.querySelector<HTMLElement>('[data-carousel-item]')?.offsetWidth || 320;
    el.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        // Reached end, scroll back to start smoothly
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const cardWidth = el.querySelector<HTMLElement>('[data-carousel-item]')?.offsetWidth || 320;
        el.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-20" aria-labelledby="featured-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 id="featured-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Destaques
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-sm disabled:hover:text-gray-600"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-sm disabled:hover:text-gray-600"
              aria-label="Proximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel with native smooth scroll + snap */}
        <div className="relative group/carousel">
          {/* Fade edges */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mb-4 scrollbar-hide"
            role="region"
            aria-label="Carrossel de apps em destaque"
            aria-roledescription="carousel"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {MOCK_APPS.map((app) => (
              <div
                key={app.id}
                data-carousel-item
                className="flex-shrink-0 snap-start w-[280px] sm:w-[300px] lg:w-[320px]"
              >
                <AppCard app={app} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
