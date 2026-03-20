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

  // Reset index when view size changes
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
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          O Que os Usuarios Dizem
        </h2>

        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={goPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all"
            aria-label="Proximo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel track */}
          <div className="overflow-hidden mx-6">
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
                    <Quote className="w-8 h-8 text-blue-200 mb-4" />

                    <p className="text-gray-600 italic mb-4 leading-relaxed">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>

                    <div className="flex items-center gap-0.5 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (testimonial.rating || 0)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.authorName}</p>
                      <p className="text-sm text-gray-500">{testimonial.authorRole}</p>
                      <p className="text-sm text-blue-600 font-medium mt-1">
                        {testimonial.appName}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {dots.map((i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentIndex ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir para slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
