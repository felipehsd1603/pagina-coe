import { useParams, Link } from 'react-router-dom';
import { useAppDetail } from '@/hooks/useApps';
import AppHero from '@/components/app-detail/AppHero';
import AppBenefits from '@/components/app-detail/AppBenefits';
import AppDocsTabs from '@/components/app-detail/AppDocsTabs';
import AppTestimonials from '@/components/app-detail/AppTestimonials';
import Button from '@/components/ui/Button';

export default function AppDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: app, isLoading, error } = useAppDetail(slug || '');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-aegea-600 border-t-transparent mx-auto mb-4" />
          <p className="text-gray-500">Carregando solucao...</p>
        </div>
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Solucao nao encontrada</h2>
          <p className="text-gray-500 mb-6">A solucao que voce procura nao existe ou foi removida.</p>
          <Link to="/">
            <Button variant="primary">Voltar para Inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppHero app={app} />
      <AppBenefits benefits={app.benefits} painPoint={app.painPoint} objective={app.objective} />
      <AppDocsTabs documents={app.documents} />
      <AppTestimonials testimonials={app.testimonials} />

      <section className="py-12 px-4 text-center">
        <Link to="/#apps">
          <Button variant="primary">Ver Outras Solucoes</Button>
        </Link>
      </section>
    </div>
  );
}
