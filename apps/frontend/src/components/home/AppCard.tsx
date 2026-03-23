import { Link } from 'react-router-dom';
import { ArrowRight, Rocket, CheckCircle2, Clock, Lightbulb, FileText } from 'lucide-react';
import type { IApp } from '@portal/shared';
import { APP_CATEGORIES, LIFECYCLE_PHASES } from '@portal/shared';

interface AppCardProps {
  app: IApp;
}

const gradientBgs = [
  'from-blue-500 to-blue-700',
  'from-green-500 to-green-700',
  'from-purple-500 to-purple-700',
  'from-amber-500 to-amber-700',
  'from-cyan-500 to-cyan-700',
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

const STATUS_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  Producao: CheckCircle2,
  Lancamento: Rocket,
  Iniciativa: Lightbulb,
  'Em Analise': Clock,
};

function getStatusIcon(statusDate?: string) {
  if (!statusDate) return null;
  const key = Object.keys(STATUS_ICON).find((k) => statusDate.startsWith(k));
  return key ? STATUS_ICON[key] : FileText;
}

function getStatusColor(statusDate?: string) {
  if (!statusDate) return '';
  if (statusDate.startsWith('Producao')) return 'bg-green-600';
  if (statusDate.startsWith('Lancamento')) return 'bg-blue-600';
  if (statusDate.startsWith('Iniciativa')) return 'bg-purple-600';
  return 'bg-gray-600';
}

export default function AppCard({ app }: AppCardProps) {
  const categoryMeta = APP_CATEGORIES[app.category];
  const gradientIdx =
    app.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % gradientBgs.length;

  const StatusIcon = getStatusIcon(app.statusDate);
  const statusColor = getStatusColor(app.statusDate);

  return (
    <Link
      to={`/app/${app.slug}`}
      className="block group"
      aria-label={`Ver detalhes de ${app.name}`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl dark:hover:shadow-gray-900/50 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer h-full flex flex-col">
        {/* Image area */}
        <div className="relative h-48 overflow-hidden">
          {app.bannerUrl ? (
            <img
              src={app.bannerUrl}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${gradientBgs[gradientIdx]} flex items-center justify-center`}
            >
              <span className="text-4xl font-bold text-white/60" aria-hidden="true">
                {getInitials(app.name)}
              </span>
            </div>
          )}

          {/* Gradient overlay at bottom for readability */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Status date badge */}
          {app.statusDate && StatusIcon && (
            <div
              className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-semibold ${statusColor} shadow-lg`}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              {app.statusDate}
            </div>
          )}

          {/* Category icon bubble */}
          <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center shadow-md">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400">
              {getInitials(app.name)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Category + subcategory */}
          <div className="flex items-center gap-2 text-sm mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium bg-white dark:bg-gray-700">
              {categoryMeta.label}
            </span>
            <span className="text-gray-400 dark:text-gray-500">·</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {app.owner}
            </span>
          </div>

          {/* App name */}
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
            {app.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">
            {app.shortDescription || app.description}
          </p>

          {/* "Ver também" link */}
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2.5 transition-all">
              Ver tambem
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
