import { useQuery } from '@tanstack/react-query';
import { MOCK_COURSES } from '@/data/mockData';
import type { ICourse, CitizenTier } from '@portal/shared';

export function useCourses(tier?: CitizenTier) {
  return useQuery({
    queryKey: ['courses', tier],
    queryFn: async (): Promise<ICourse[]> => {
      if (tier) {
        return MOCK_COURSES.filter((c) => c.tier === tier);
      }
      return MOCK_COURSES;
    },
  });
}
