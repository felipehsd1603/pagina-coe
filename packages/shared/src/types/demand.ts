export type DemandPriority = 'BAIXA' | 'MEDIA' | 'ALTA' | 'CRITICA';

export type DemandStatus = 'NOVA' | 'EM_ANALISE' | 'APROVADA' | 'EM_DESENVOLVIMENTO' | 'CONCLUIDA' | 'REJEITADA';

export interface IDemand {
  id: string;
  requesterName: string;
  requesterEmail: string;
  requesterUnit: string;
  requesterArea: string;
  title: string;
  description: string;
  problemToSolve: string;
  estimatedUsers?: number;
  priority: DemandPriority;
  status: DemandStatus;
  attachmentUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDemandCreate {
  requesterName: string;
  requesterEmail: string;
  requesterUnit: string;
  requesterArea: string;
  title: string;
  description: string;
  problemToSolve: string;
  estimatedUsers?: number;
  priority?: DemandPriority;
}
