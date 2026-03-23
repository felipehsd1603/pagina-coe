import { CheckCircle } from 'lucide-react';
import type { IAppBenefit } from '@portal/shared';

interface AppBenefitsProps {
  benefits: IAppBenefit[];
  painPoint?: string;
  objective?: string;
}

export default function AppBenefits({ benefits, painPoint, objective }: AppBenefitsProps) {
  if (!benefits.length && !painPoint && !objective) return null;

  return (
    <section className="py-12 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        {(painPoint || objective) && (
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {painPoint && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">Dor / Problema</h3>
                <p className="text-red-700 dark:text-red-300">{painPoint}</p>
              </div>
            )}
            {objective && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">Objetivo</h3>
                <p className="text-green-700 dark:text-green-300">{objective}</p>
              </div>
            )}
          </div>
        )}

        {benefits.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Beneficios</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="flex items-start gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{benefit.title}</h4>
                    {benefit.description && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{benefit.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
