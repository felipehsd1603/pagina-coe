import { Link } from 'react-router-dom';
import type { IApp } from '@portal/shared';
import { APP_CATEGORIES, LIFECYCLE_PHASES } from '@portal/shared';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface AppCardProps {
  app: IApp;
}

const phaseColorMap: Record<string, 'green' | 'yellow' | 'blue' | 'purple'> = {
  INICIATIVA: 'green',
  DEMANDA: 'yellow',
  PROJETO: 'blue',
  MELHORIA_CONTINUA: 'purple',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

const gradientBgs = [
  'from-blue-500 to-blue-700',
  'from-green-500 to-green-700',
  'from-purple-500 to-purple-700',
  'from-amber-500 to-amber-700',
  'from-cyan-500 to-cyan-700',
];

export default function AppCard({ app }: AppCardProps) {
  const categoryMeta = APP_CATEGORIES[app.category];
  const phaseMeta = LIFECYCLE_PHASES[app.lifecyclePhase];
  const gradientIdx =
    app.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % gradientBgs.length;

  return (
    <Link to={`/app/${app.slug}`} className="block group">
      <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
        {/* Image placeholder */}
        <div
          className={`h-40 bg-gradient-to-br ${gradientBgs[gradientIdx]} flex items-center justify-center`}
        >
          {app.iconUrl ? (
            <img
              src={app.iconUrl}
              alt={app.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-white/80">
              {getInitials(app.name)}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge color={categoryMeta.color as 'blue' | 'green' | 'purple' | 'amber' | 'cyan'}>
              {categoryMeta.label}
            </Badge>
            <Badge color={phaseColorMap[app.lifecyclePhase] ?? 'blue'}>
              {phaseMeta.label}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
            {app.name}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2">
            {app.shortDescription || app.description}
          </p>
        </div>
      </Card>
    </Link>
  );
}
