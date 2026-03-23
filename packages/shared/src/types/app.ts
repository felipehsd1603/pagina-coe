export type AppCategory = 'OPERACIONAL' | 'COMERCIAL' | 'GESTAO' | 'GOVERNANCA' | 'FINANCEIRO';

export type LifecyclePhase = 'INICIATIVA' | 'DEMANDA' | 'PROJETO' | 'MELHORIA_CONTINUA';

export type AppClassification = 'PRIORITY' | 'RELEVANT' | 'LOW_IMPACT';

export type AppDirective = 'UNIFICAR' | 'DESCOMISSIONAR' | 'REFATORAR' | 'MANTER';

export type QualLevel = 'ALTO' | 'MEDIO' | 'BAIXO';

export interface IAppBenefit {
  id: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface IAppDocument {
  id: string;
  type: 'VIDEO' | 'MANUAL' | 'INSTRUCTION';
  title: string;
  url: string;
  description?: string;
}

export interface IAppMetric {
  id: string;
  label: string;
  value: string;
}

export interface IRelatedFlow {
  id: string;
  name: string;
  createdOn?: string;
  modifiedOn?: string;
}

export interface IApp {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: AppCategory;
  lifecyclePhase: LifecyclePhase;
  classification?: AppClassification;
  directive?: AppDirective;
  area?: string;
  owner: string;
  businessUnit?: string;
  platform: string;
  hasSensitiveData: boolean;
  iconUrl?: string;
  bannerUrl?: string;
  statusDate?: string;
  isPublished: boolean;
}

export interface IAppDetail extends IApp {
  processDescription?: string;
  monthlyVolume?: string;
  frequency?: string;
  usersCount?: string;
  kpisImpacted?: string;
  painPoint?: string;
  objective?: string;
  automationType?: string;
  hasParentChildArch: boolean;
  hasHumanInteraction: boolean;
  systemsInvolved?: string;
  relatedFlowsCount: number;
  solutionName?: string;
  securityLevel?: QualLevel;
  scalabilityLevel?: QualLevel;
  complianceLevel?: QualLevel;
  failureImpact?: string;
  processBenefit?: QualLevel;
  roiPotential?: QualLevel;
  strategicAlignment?: QualLevel;
  benefits: IAppBenefit[];
  documents: IAppDocument[];
  testimonials: ITestimonial[];
  metrics: IAppMetric[];
  relatedFlows: IRelatedFlow[];
}

// Re-export for convenience
import type { ITestimonial } from './testimonial';
