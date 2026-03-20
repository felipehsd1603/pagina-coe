import { FlaskConical, TestTube, Rocket } from 'lucide-react';

const ENVS = [
  {
    name: 'Sandbox',
    icon: FlaskConical,
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
    purpose: 'POCs e aprendizado de citizen developers',
    connectors: 'Standard liberado, Premium restrito',
    access: 'Self-service (sem aprovacao)',
  },
  {
    name: 'Homologacao',
    icon: TestTube,
    color: 'bg-yellow-50 border-yellow-200',
    iconColor: 'text-yellow-600',
    purpose: 'Testes com usuarios-chave (UAT)',
    connectors: 'Mesmo perfil de Producao',
    access: 'Aprovacao do Owner + Area',
  },
  {
    name: 'Producao',
    icon: Rocket,
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
    purpose: 'Apps em uso pelos usuarios finais',
    connectors: 'Restritivo: standard + aprovados',
    access: 'CoE importa como managed solution',
  },
];

export default function EnvironmentTiers() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Segregacao de Ambientes</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Cada etapa do ciclo de vida utiliza um ambiente dedicado com politicas de seguranca especificas.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {ENVS.map((env) => {
            const Icon = env.icon;
            return (
              <div key={env.name} className={`rounded-xl border p-6 ${env.color}`}>
                <Icon className={`w-8 h-8 mb-3 ${env.iconColor}`} />
                <h3 className="text-lg font-bold text-gray-900 mb-3">{env.name}</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-700">Finalidade</p>
                    <p className="text-gray-600">{env.purpose}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Conectores</p>
                    <p className="text-gray-600">{env.connectors}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Acesso</p>
                    <p className="text-gray-600">{env.access}</p>
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
