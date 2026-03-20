import type { AppCategory } from '../types/app';

export const APP_CATEGORIES: Record<AppCategory, { label: string; color: string }> = {
  OPERACIONAL: { label: 'Operacional', color: 'blue' },
  COMERCIAL: { label: 'Comercial', color: 'green' },
  GESTAO: { label: 'Gestao', color: 'purple' },
  GOVERNANCA: { label: 'Governanca', color: 'amber' },
  FINANCEIRO: { label: 'Financeiro', color: 'cyan' },
};

export const CATEGORY_LIST = Object.entries(APP_CATEGORIES).map(([key, val]) => ({
  value: key as AppCategory,
  ...val,
}));
