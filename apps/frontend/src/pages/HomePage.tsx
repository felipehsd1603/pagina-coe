import { useState } from 'react';
import Hero from '@/components/home/Hero';
import MetricsBar from '@/components/home/MetricsBar';
import AboutSection from '@/components/home/AboutSection';
import AppGrid from '@/components/home/AppGrid';
import LifecycleExplainer from '@/components/home/LifecycleExplainer';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import DemandCTA from '@/components/home/DemandCTA';
import DemandFormModal from '@/components/home/DemandFormModal';

export default function HomePage() {
  const [isDemandOpen, setIsDemandOpen] = useState(false);

  const openDemand = () => setIsDemandOpen(true);
  const closeDemand = () => setIsDemandOpen(false);

  return (
    <>
      <Hero onOpenDemand={openDemand} />
      <MetricsBar />
      <AboutSection />
      <AppGrid />
      <LifecycleExplainer />
      <TestimonialsCarousel />
      <DemandCTA onOpenDemand={openDemand} />
      <DemandFormModal isOpen={isDemandOpen} onClose={closeDemand} />
    </>
  );
}
