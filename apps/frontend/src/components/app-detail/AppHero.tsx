import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '@/components/ui/Badge';
import { APP_CATEGORIES, LIFECYCLE_PHASES } from '@portal/shared';
import type { IAppDetail } from '@portal/shared';

interface AppHeroProps {
  app: IAppDetail;
}

const PHASE_COLORS: Record<string, 'green' | 'yellow' | 'blue' | 'purple'> = {
  INICIATIVA: 'green',
  DEMANDA: 'yellow',
  PROJETO: 'blue',
  MELHORIA_CONTINUA: 'purple',
};

export default function AppHero({ app }: AppHeroProps) {
  const categoryInfo = APP_CATEGORIES[app.category];
  const phaseInfo = LIFECYCLE_PHASES[app.lifecyclePhase];

  return (
    <section className="gradient-hero text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Solucoes
        </Link>

        <div className="flex flex-wrap gap-3 mb-4">
          <Badge color={categoryInfo?.color as 'blue' || 'blue'}>{categoryInfo?.label || app.category}</Badge>
          <Badge color={PHASE_COLORS[app.lifecyclePhase] || 'blue'}>{phaseInfo?.label || app.lifecyclePhase}</Badge>
          {app.platform && <Badge color="cyan">{app.platform}</Badge>}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{app.name}</h1>
        <p className="text-lg text-blue-100 max-w-3xl mb-6">{app.description}</p>

        {app.owner && (
          <p className="text-blue-200 text-sm">
            <span className="font-semibold">Responsavel:</span> {app.owner}
            {app.businessUnit && ` | ${app.businessUnit}`}
          </p>
        )}

        {app.metrics.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {app.metrics.map((metric) => (
              <div key={metric.id} className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-sm text-blue-200">{metric.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
