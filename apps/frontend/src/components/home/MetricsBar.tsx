import { Users, TrendingUp, DollarSign, Heart } from 'lucide-react';
import Card from '@/components/ui/Card';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { MOCK_METRICS } from '@/data/mockData';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  layers: TrendingUp,
  server: DollarSign,
  building: Heart,
};

const COLOR_MAP: Record<string, { color: string; bg: string }> = {
  users: { color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  layers: { color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
  server: { color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-100 dark:bg-cyan-900/30' },
  building: { color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-100 dark:bg-rose-900/30' },
};

export default function MetricsBar() {
  return (
    <section className="bg-white dark:bg-gray-950 py-6 md:py-8" aria-label="Metricas do CoE">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_METRICS.map((metric) => {
            const iconKey = metric.icon || 'users';
            const Icon = ICON_MAP[iconKey] || Users;
            const colors = COLOR_MAP[iconKey] || COLOR_MAP.users;
            const displayValue = metric.suffix
              ? `${metric.value}${metric.suffix}`
              : metric.value;

            return (
              <Card
                key={metric.id}
                className="p-4 text-center border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${colors.bg} ${colors.color} mb-2`}
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-0.5">
                  <AnimatedCounter value={displayValue} />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{metric.label}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
