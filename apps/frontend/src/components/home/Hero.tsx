import { Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

interface HeroProps {
  onOpenDemand: () => void;
}

export default function Hero({ onOpenDemand }: HeroProps) {
  const scrollToApps = () => {
    document.getElementById('apps')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      {/* Decorative blur elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center md:text-left max-w-3xl">
          <span className="inline-flex items-center gap-1.5 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            Centro de Excelencia em Produtos Digitais
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Transformando Processos com{' '}
            <span className="text-cyan-300">Produtos Digitais</span> e{' '}
            <span className="text-cyan-300">Automacoes</span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl">
            O Centro de Excelencia (CoE) da AEGEA promove a governanca, padronizacao e
            evolucao continua das solucoes digitais na Power Platform, acelerando a
            transformacao digital em todas as regionais.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={scrollToApps}
              className="w-full sm:w-auto"
            >
              Explorar Solucoes
            </Button>

            <Button
              variant="success"
              size="lg"
              onClick={onOpenDemand}
              className="w-full sm:w-auto"
            >
              Abrir Iniciativa
            </Button>

            <Button
              variant="primary"
              size="lg"
              href="/citizen-developers"
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
            >
              Programa Citizen Developers
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
