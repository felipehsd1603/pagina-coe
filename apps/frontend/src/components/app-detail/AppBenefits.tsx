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
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {(painPoint || objective) && (
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {painPoint && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Dor / Problema</h3>
                <p className="text-red-700">{painPoint}</p>
              </div>
            )}
            {objective && (
              <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Objetivo</h3>
                <p className="text-green-700">{objective}</p>
              </div>
            )}
          </div>
        )}

        {benefits.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Beneficios</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="flex items-start gap-3 bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                    {benefit.description && <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>}
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
