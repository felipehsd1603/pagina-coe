import api from './client';
import type { IGlobalMetric } from '@portal/shared';

export async function fetchMetrics(): Promise<IGlobalMetric[]> {
  const { data } = await api.get('/metrics');
  return data;
}
