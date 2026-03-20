export type CitizenTier = 'T1_STARTER' | 'T2_STANDARD' | 'T3_ADVANCED' | 'T4_POWER_DEVELOPER';

export interface ICourse {
  id: string;
  title: string;
  description: string;
  tier: CitizenTier;
  format: string;
  duration: string;
  resourceUrl?: string;
  provider?: string;
  isPublished: boolean;
}
