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
    <section className="bg-white dark:bg-gray-950 py-12 md:py-16" aria-label="Metricas do CoE">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className="p-6 text-center border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${colors.bg} ${colors.color} mb-4`}
                  aria-hidden="true"
                >
                  <Icon className="w-7 h-7" />
                </div>
                <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
                  <AnimatedCounter value={displayValue} />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{metric.label}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
