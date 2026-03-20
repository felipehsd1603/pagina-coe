import api from './client';
import type { ICourse, CitizenTier } from '@portal/shared';

export async function fetchCourses(tier?: CitizenTier): Promise<ICourse[]> {
  const { data } = await api.get('/courses', { params: { tier } });
  return data;
}
