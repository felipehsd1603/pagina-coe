import { useQuery } from '@tanstack/react-query';
import { MOCK_METRICS } from '@/data/mockData';
import type { IGlobalMetric } from '@portal/shared';

export function useMetrics() {
  return useQuery({
    queryKey: ['metrics'],
    queryFn: async (): Promise<IGlobalMetric[]> => {
      return MOCK_METRICS;
    },
  });
}
