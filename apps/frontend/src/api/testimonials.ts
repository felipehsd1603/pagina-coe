import api from './client';
import type { ITestimonial } from '@portal/shared';

export async function fetchTestimonials(appId?: string): Promise<ITestimonial[]> {
  const { data } = await api.get('/testimonials', { params: { appId } });
  return data;
}
