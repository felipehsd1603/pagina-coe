import { useQuery } from '@tanstack/react-query';
import { MOCK_TESTIMONIALS } from '@/data/mockData';
import type { ITestimonial } from '@portal/shared';

export function useTestimonials(appId?: string) {
  return useQuery({
    queryKey: ['testimonials', appId],
    queryFn: async (): Promise<ITestimonial[]> => {
      if (appId) {
        return MOCK_TESTIMONIALS.filter((t) => t.appId === appId);
      }
      return MOCK_TESTIMONIALS;
    },
  });
}
