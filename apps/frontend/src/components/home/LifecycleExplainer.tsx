import { Lightbulb, FileText, Code, RefreshCw } from 'lucide-react';
import Card from '@/components/ui/Card';

const phases = [
  {
    icon: Lightbulb,
    title: 'Iniciativa',
    description:
      'Identificacao de oportunidades de automacao e produtos digitais. As ideias sao registradas, avaliadas e priorizadas conforme impacto e alinhamento estrategico.',
    borderColor: 'border-green-500',
    iconColor: 'text-green-600 dark:text-green-400',
    iconBg: 'bg-green-50 dark:bg-green-900/30',
  },
  {
    icon: FileText,
    title: 'Demanda',
    description:
      'Formalizacao da demanda com detalhamento do problema, usuarios impactados e resultados esperados. O CoE analisa viabilidade tecnica e de negocio.',
    borderColor: 'border-yellow-500',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    iconBg: 'bg-yellow-50 dark:bg-yellow-900/30',
  },
  {
    icon: Code,
    title: 'Projeto',
    description:
      'Desenvolvimento ativo da solucao com equipe designada, sprints de entrega, testes de qualidade e validacao com usuarios. Acompanhamento por KPIs.',
    borderColor: 'border-blue-500',
    iconColor: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-50 dark:bg-blue-900/30',
  },
  {
    icon: RefreshCw,
    title: 'Melhoria Continua',
    description:
      'Solucao em producao com monitoramento ativo, coleta de feedback, otimizacoes de performance e evolucoes incrementais baseadas em dados de uso.',
    borderColor: 'border-purple-500',
    iconColor: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-50 dark:bg-purple-900/30',
  },
];

export default function LifecycleExplainer() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-20" aria-labelledby="lifecycle-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="lifecycle-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Ciclo de Vida dos Produtos Digitais
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-label="Fases do ciclo de vida">
          {phases.map((phase) => {
            const Icon = phase.icon;
            return (
              <Card
                key={phase.title}
                className={`p-6 border-t-4 ${phase.borderColor} hover:scale-[1.03] transition-transform duration-300`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${phase.iconBg} ${phase.iconColor} mb-4`}
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{phase.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{phase.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
