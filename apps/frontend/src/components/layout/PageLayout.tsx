import { useEffect, type ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AccessibilityToolbar from '@/components/ui/AccessibilityToolbar';
import { useTheme } from '@/contexts/ThemeContext';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const { toggleTheme } = useTheme();

  // Alt+T keyboard shortcut for theme toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        toggleTheme();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggleTheme]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <a href="#main-content" className="skip-to-content">
        Pular para o conteudo principal
      </a>
      <Navbar />
      <main id="main-content" className="flex-1" role="main" aria-label="Conteudo principal">
        {children}
      </main>
      <Footer />
      <AccessibilityToolbar />
    </div>
  );
}
