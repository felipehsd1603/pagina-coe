import { Target, Award, Shield, Zap, Wrench, TrendingUp } from 'lucide-react';
import Card from '@/components/ui/Card';
import { CLIENT_NAME } from '@/config/client';

const pillars = [
  {
    icon: Shield,
    label: 'Governanca',
    color: 'text-blue-400',
  },
  {
    icon: Zap,
    label: 'Automacao Inteligente',
    color: 'text-yellow-400',
  },
  {
    icon: Wrench,
    label: 'Sustentacao',
    color: 'text-green-400',
  },
  {
    icon: TrendingUp,
    label: 'Ganhos Mensuraveis',
    color: 'text-cyan-400',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-gray-50 dark:bg-gray-900 py-16 md:py-20" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="about-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Gerencia de Produtos Digitais e Automacoes
        </h2>

        {/* Mission and CoE cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Missao</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Promover a transformacao digital na {CLIENT_NAME} por meio de produtos digitais e automacoes
              que otimizam processos, reduzem custos operacionais e geram valor mensuravel para
              todas as regionais. Atuamos como facilitadores entre as areas de negocio e a
              tecnologia, garantindo solucoes alinhadas a estrategia corporativa.
            </p>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Centro de Excelencia</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              O CoE de Power Platform estabelece padroes de governanca, seguranca e qualidade
              para todas as solucoes digitais. Gerenciamos o ciclo de vida completo dos produtos,
              desde a concepcao ate a melhoria continua, capacitando Citizen Developers e
              garantindo conformidade com as politicas corporativas.
            </p>
          </Card>
        </div>

        {/* Pillars banner */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-2xl p-8 md:p-12" role="list" aria-label="Pilares de atuacao">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.label} className="text-center group" role="listitem">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Icon className={`w-7 h-7 ${pillar.color}`} aria-hidden="true" />
                    </div>
                  </div>
                  <p className="text-white font-semibold text-sm md:text-base">
                    {pillar.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
