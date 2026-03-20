import api from './client';
import type { IApp, IAppDetail, AppCategory, LifecyclePhase } from '@portal/shared';

interface AppsParams {
  category?: AppCategory;
  phase?: LifecyclePhase;
  search?: string;
  page?: number;
  limit?: number;
}

interface AppsResponse {
  data: IApp[];
  total: number;
  page: number;
  totalPages: number;
}

export async function fetchApps(params?: AppsParams): Promise<AppsResponse> {
  const { data } = await api.get('/apps', { params });
  return data;
}

export async function fetchAppBySlug(slug: string): Promise<IAppDetail> {
  const { data } = await api.get(`/apps/${slug}`);
  return data;
}
