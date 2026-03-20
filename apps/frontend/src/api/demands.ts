import api from './client';
import type { IDemand, IDemandCreate } from '@portal/shared';

export async function submitDemand(demand: IDemandCreate): Promise<IDemand> {
  const { data } = await api.post('/demands', demand);
  return data;
}
