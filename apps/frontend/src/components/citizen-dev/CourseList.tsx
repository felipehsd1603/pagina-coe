import { Clock, GraduationCap } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { MOCK_COURSES } from '@/data/mockData';

const TIER_LABELS: Record<string, string> = {
  T1_STARTER: 'Basico',
  T2_STANDARD: 'Intermediario',
  T3_ADVANCED: 'Avancado',
  T4_POWER_DEVELOPER: 'Avancado',
};

const TIER_COLORS: Record<string, 'green' | 'blue' | 'purple' | 'amber'> = {
  Basico: 'green',
  Intermediario: 'blue',
  Avancado: 'purple',
};

export default function CourseList() {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-950" aria-labelledby="courses-heading">
      <div className="max-w-6xl mx-auto">
        <h2 id="courses-heading" className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">Trilha de Capacitacao</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-10 max-w-2xl mx-auto">
          Cursos estruturados para cada nivel de maturidade, do basico ao avancado.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_COURSES.map((course) => {
            const tierLabel = TIER_LABELS[course.tier] || 'Basico';
            return (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge color={TIER_COLORS[tierLabel] || 'blue'}>{tierLabel}</Badge>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{course.format}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{course.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" aria-hidden="true" />
                    {course.provider || 'Equipe CoE'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
