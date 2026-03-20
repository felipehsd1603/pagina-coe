import Button from '@/components/ui/Button';

interface DemandCTAProps {
  onOpenDemand: () => void;
}

export default function DemandCTA({ onOpenDemand }: DemandCTAProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-aegea-900 to-blue-800 py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Pronto para Transformar seus Processos?
        </h2>

        <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
          Submeta sua ideia de automacao ou produto digital. Nossa equipe do Centro de Excelencia
          vai avaliar a viabilidade, priorizar e acompanhar o desenvolvimento da sua solucao do
          inicio ao fim.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={onOpenDemand}
          >
            Abrir Iniciativa
          </Button>

          <Button
            variant="primary"
            size="lg"
            href="/citizen-developers"
            className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
          >
            Conhecer Programa Citizen
          </Button>
        </div>
      </div>
    </section>
  );
}
