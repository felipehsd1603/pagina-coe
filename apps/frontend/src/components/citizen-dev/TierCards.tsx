import { UserCheck, Code2, Rocket, Crown } from 'lucide-react';

const TIERS = [
  {
    name: 'T1 — Starter',
    icon: UserCheck,
    color: 'green',
    estimate: '~269 pessoas',
    description: 'Formularios e apps pessoais. Aceita Termo de Uso, acesso ao Sandbox.',
    skills: ['Power Apps basico', 'Formularios simples', 'Apps pessoais'],
    progression: 'Aceitar Termo de Uso + Acesso ao Sandbox',
  },
  {
    name: 'T2 — Standard Maker',
    icon: Code2,
    color: 'blue',
    estimate: '~50 pessoas',
    description: 'Canvas Apps + Power Automate com conectores standard.',
    skills: ['Canvas Apps', 'Power Automate', 'Conectores standard'],
    progression: 'Onboarding + Assessment + PL-900',
  },
  {
    name: 'T3 — Advanced Maker',
    icon: Rocket,
    color: 'purple',
    estimate: '~20 pessoas',
    description: 'Premium connectors, RPA, Dataverse e integracoes.',
    skills: ['Conectores premium', 'RPA', 'Dataverse', 'Integracoes'],
    progression: 'Certificacao PL-100 + Aprovacao CoE',
  },
  {
    name: 'T4 — Power Developer',
    icon: Crown,
    color: 'amber',
    estimate: '5-10 pessoas',
    description: 'ALM, CI/CD, managed solutions e mentoring.',
    skills: ['ALM', 'CI/CD', 'Managed Solutions', 'PCF Components'],
    progression: 'Certificacao PL-400 + Mentoring + Portfolio',
  },
];

const COLOR_MAP: Record<string, string> = {
  green: 'border-green-500 bg-green-50',
  blue: 'border-blue-500 bg-blue-50',
  purple: 'border-purple-500 bg-purple-50',
  amber: 'border-amber-500 bg-amber-50',
};

const ICON_COLOR: Record<string, string> = {
  green: 'text-green-600',
  blue: 'text-blue-600',
  purple: 'text-purple-600',
  amber: 'text-amber-600',
};

export default function TierCards() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Niveis de Maturidade</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          O programa possui 4 niveis progressivos. Cada nivel desbloqueia novas capacidades e responsabilidades.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIERS.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.name}
                className={`rounded-xl border-t-4 p-6 shadow-sm hover:shadow-md transition-shadow ${COLOR_MAP[tier.color]}`}
              >
                <Icon className={`w-8 h-8 mb-3 ${ICON_COLOR[tier.color]}`} />
                <h3 className="text-lg font-bold text-gray-900 mb-1">{tier.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{tier.estimate}</p>
                <p className="text-sm text-gray-700 mb-4">{tier.description}</p>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Competencias</p>
                  <div className="flex flex-wrap gap-1">
                    {tier.skills.map((s) => (
                      <span key={s} className="text-xs bg-white/80 border border-gray-200 rounded px-2 py-0.5">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Progressao</p>
                  <p className="text-xs text-gray-600">{tier.progression}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
