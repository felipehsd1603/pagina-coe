import { Sparkles, FileText, Code2 } from 'lucide-react';
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
      {/* Background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&w=1920&q=80")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/85 via-blue-800/80 to-blue-900/90" />

      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      {/* Decorative blur elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 mb-4 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            Centro de Excelência em Produtos Digitais
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white">
            Portal de Produtos Digitais e Automação
          </h1>

          <p className="text-base md:text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Somos a Gerência de Produtos Digitais e Automações. Centralizamos todas as ferramentas
            desenvolvidas para impulsionar produtividade, escala e qualidade através da transformação digital.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={scrollToApps}
              className="w-full sm:w-auto"
            >
              Explorar Soluções
            </Button>

            <Button
              variant="success"
              size="lg"
              onClick={onOpenDemand}
              className="w-full sm:w-auto"
            >
              <FileText className="w-4 h-4 mr-2" />
              Abrir Iniciativa
            </Button>

            <Button
              variant="primary"
              size="lg"
              href="/citizen-developers"
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
            >
              <Code2 className="w-4 h-4 mr-2" />
              Programa Citizen Developers
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
