import type { LifecyclePhase } from '../types/app';

export const LIFECYCLE_PHASES: Record<LifecyclePhase, { label: string; color: string; description: string }> = {
  INICIATIVA: {
    label: 'Iniciativa',
    color: 'green',
    description: 'Ideia identificada, aguardando priorizacao e avaliacao inicial.',
  },
  DEMANDA: {
    label: 'Demanda',
    color: 'yellow',
    description: 'Demanda formalizada, em analise pelo CoE para viabilidade.',
  },
  PROJETO: {
    label: 'Projeto',
    color: 'blue',
    description: 'Em desenvolvimento ativo com equipe designada.',
  },
  MELHORIA_CONTINUA: {
    label: 'Melhoria Continua',
    color: 'purple',
    description: 'Em producao, com evolucoes e otimizacoes contínuas.',
  },
};

export const PHASE_LIST = Object.entries(LIFECYCLE_PHASES).map(([key, val]) => ({
  value: key as LifecyclePhase,
  ...val,
}));
