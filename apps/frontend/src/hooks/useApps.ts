import { useQuery } from '@tanstack/react-query';
import { MOCK_APPS, MOCK_APP_DETAILS } from '@/data/mockData';
import type { IApp, IAppDetail, AppCategory, LifecyclePhase } from '@portal/shared';

interface AppsResponse {
  data: IApp[];
  total: number;
  page: number;
  totalPages: number;
}

export function useApps(filters?: { category?: AppCategory; phase?: LifecyclePhase; search?: string }) {
  return useQuery({
    queryKey: ['apps', filters],
    queryFn: async (): Promise<AppsResponse> => {
      let filtered = [...MOCK_APPS];

      if (filters?.category) {
        filtered = filtered.filter((app) => app.category === filters.category);
      }
      if (filters?.phase) {
        filtered = filtered.filter((app) => app.lifecyclePhase === filters.phase);
      }
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(
          (app) =>
            app.name.toLowerCase().includes(searchLower) ||
            app.description.toLowerCase().includes(searchLower) ||
            (app.shortDescription && app.shortDescription.toLowerCase().includes(searchLower))
        );
      }

      return {
        data: filtered,
        total: filtered.length,
        page: 1,
        totalPages: 1,
      };
    },
  });
}

export function useAppDetail(slug: string) {
  return useQuery({
    queryKey: ['app', slug],
    queryFn: async (): Promise<IAppDetail> => {
      const detail = MOCK_APP_DETAILS[slug];
      if (!detail) {
        throw new Error(`App not found: ${slug}`);
      }
      return detail;
    },
    enabled: !!slug,
  });
}
