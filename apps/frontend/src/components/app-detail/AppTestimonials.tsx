import { Quote, Star } from 'lucide-react';
import type { ITestimonial } from '@portal/shared';

interface AppTestimonialsProps {
  testimonials: ITestimonial[];
}

export default function AppTestimonials({ testimonials }: AppTestimonialsProps) {
  if (!testimonials.length) return null;

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Depoimentos</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <Quote className="w-8 h-8 text-aegea-200 mb-3" />
              <p className="text-gray-700 italic mb-4">"{t.content}"</p>
              {t.rating && (
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < t.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900">{t.authorName}</p>
                <p className="text-sm text-gray-500">{t.authorRole}</p>
                {t.authorUnit && <p className="text-sm text-gray-400">{t.authorUnit}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
