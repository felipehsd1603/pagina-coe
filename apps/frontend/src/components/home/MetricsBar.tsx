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
  users: { color: 'text-blue-600', bg: 'bg-blue-50' },
  layers: { color: 'text-green-600', bg: 'bg-green-50' },
  server: { color: 'text-purple-600', bg: 'bg-purple-50' },
  building: { color: 'text-amber-600', bg: 'bg-amber-50' },
};

export default function MetricsBar() {
  return (
    <section className="bg-white py-12 md:py-16">
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
                className="p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${colors.bg} ${colors.color} mb-4`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  <AnimatedCounter value={displayValue} />
                </div>
                <p className="text-sm text-gray-500 font-medium">{metric.label}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
