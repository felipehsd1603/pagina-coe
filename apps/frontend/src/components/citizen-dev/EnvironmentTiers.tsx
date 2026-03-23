import { FlaskConical, TestTube, Rocket } from 'lucide-react';

const ENVS = [
  {
    name: 'Sandbox',
    icon: FlaskConical,
    color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    iconColor: 'text-green-600 dark:text-green-400',
    purpose: 'POCs e aprendizado de citizen developers',
    connectors: 'Standard liberado, Premium restrito',
    access: 'Self-service (sem aprovacao)',
  },
  {
    name: 'Homologacao',
    icon: TestTube,
    color: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    purpose: 'Testes com usuarios-chave (UAT)',
    connectors: 'Mesmo perfil de Producao',
    access: 'Aprovacao do Owner + Area',
  },
  {
    name: 'Producao',
    icon: Rocket,
    color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-400',
    purpose: 'Apps em uso pelos usuarios finais',
    connectors: 'Restritivo: standard + aprovados',
    access: 'CoE importa como managed solution',
  },
];

export default function EnvironmentTiers() {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900" aria-labelledby="envs-heading">
      <div className="max-w-6xl mx-auto">
        <h2 id="envs-heading" className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">Segregacao de Ambientes</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-10 max-w-2xl mx-auto">
          Cada etapa do ciclo de vida utiliza um ambiente dedicado com politicas de seguranca especificas.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {ENVS.map((env) => {
            const Icon = env.icon;
            return (
              <div key={env.name} className={`rounded-xl border p-6 ${env.color}`}>
                <Icon className={`w-8 h-8 mb-3 ${env.iconColor}`} aria-hidden="true" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{env.name}</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">Finalidade</p>
                    <p className="text-gray-600 dark:text-gray-400">{env.purpose}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">Conectores</p>
                    <p className="text-gray-600 dark:text-gray-400">{env.connectors}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">Acesso</p>
                    <p className="text-gray-600 dark:text-gray-400">{env.access}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
