import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import Card from '@/components/ui/Card';
import { MOCK_TESTIMONIALS } from '@/data/mockData';

function useItemsPerView() {
  const getItems = () => (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : 1);
  const [items, setItems] = useState(getItems);

  useEffect(() => {
    const onResize = () => setItems(getItems());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return items;
}

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerView = useItemsPerView();
  const maxIndex = Math.max(0, MOCK_TESTIMONIALS.length - itemsPerView);

  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsPerView]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [goNext]);

  const dots = Array.from({ length: maxIndex + 1 }, (_, i) => i);

  return (
    <section className="bg-white dark:bg-gray-950 py-16 md:py-20" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          O Que os Usuarios Dizem
        </h2>

        <div className="relative" role="region" aria-label="Carrossel de depoimentos" aria-roledescription="carousel">
          {/* Navigation buttons */}
          <button
            onClick={goPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg dark:shadow-gray-900/50 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg dark:shadow-gray-900/50 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Proximo depoimento"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel track */}
          <div className="overflow-hidden mx-6" aria-live="polite">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {MOCK_TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <Card className="p-6 h-full">
                    <Quote className="w-8 h-8 text-blue-200 dark:text-blue-800 mb-4" aria-hidden="true" />

                    <p className="text-gray-600 dark:text-gray-300 italic mb-4 leading-relaxed">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>

                    <div className="flex items-center gap-0.5 mb-4" aria-label={`Avaliacao: ${testimonial.rating || 0} de 5 estrelas`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (testimonial.rating || 0)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{testimonial.authorName}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.authorRole}</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">
                        {testimonial.appName}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Slides dos depoimentos">
            {dots.map((i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 ${
                  i === currentIndex ? 'bg-blue-600 w-6' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
