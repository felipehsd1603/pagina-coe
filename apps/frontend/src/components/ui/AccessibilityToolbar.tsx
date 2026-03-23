import { useState } from 'react';
import { Sun, Moon, Type, Eye, Pause, Play, Accessibility, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme, fontSize, setFontSize, highContrast, toggleHighContrast, reducedMotion, toggleReducedMotion } =
    useTheme();

  const fontLabel = fontSize === 'normal' ? 'Normal' : fontSize === 'large' ? 'Grande' : 'Extra Grande';

  const cycleFontSize = () => {
    const order = ['normal', 'large', 'x-large'] as const;
    const idx = order.indexOf(fontSize);
    setFontSize(order[(idx + 1) % order.length]);
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-500 text-white shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700 transition-all flex items-center justify-center"
        aria-label={isOpen ? 'Fechar painel de acessibilidade' : 'Abrir painel de acessibilidade'}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Accessibility className="w-5 h-5" />}
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          id="accessibility-panel"
          role="region"
          aria-label="Opcoes de acessibilidade"
          className="fixed bottom-20 right-6 z-50 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-4 animate-in"
        >
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
            Acessibilidade
          </h2>

          {/* Dark mode toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Modo Escuro</span>
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              style={{ backgroundColor: theme === 'dark' ? '#3b82f6' : '#d1d5db' }}
              role="switch"
              aria-checked={theme === 'dark'}
              aria-label="Alternar modo escuro"
            >
              <span
                className={`inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`}
              >
                {theme === 'dark' ? (
                  <Moon className="w-3 h-3 text-blue-600" />
                ) : (
                  <Sun className="w-3 h-3 text-amber-500" />
                )}
              </span>
            </button>
          </div>

          {/* Font size */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Tamanho: {fontLabel}</span>
            <button
              onClick={cycleFontSize}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label={`Tamanho da fonte: ${fontLabel}. Clique para alterar.`}
            >
              <Type className="w-4 h-4" />
              Aa
            </button>
          </div>

          {/* High contrast */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Alto Contraste</span>
            <button
              onClick={toggleHighContrast}
              className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              style={{ backgroundColor: highContrast ? '#3b82f6' : '#d1d5db' }}
              role="switch"
              aria-checked={highContrast}
              aria-label="Alternar alto contraste"
            >
              <span
                className={`inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow transition-transform ${
                  highContrast ? 'translate-x-6' : 'translate-x-1'
                }`}
              >
                <Eye className="w-3 h-3 text-gray-600" />
              </span>
            </button>
          </div>

          {/* Reduced motion */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Reduzir Animacoes</span>
            <button
              onClick={toggleReducedMotion}
              className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              style={{ backgroundColor: reducedMotion ? '#3b82f6' : '#d1d5db' }}
              role="switch"
              aria-checked={reducedMotion}
              aria-label="Reduzir animacoes"
            >
              <span
                className={`inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow transition-transform ${
                  reducedMotion ? 'translate-x-6' : 'translate-x-1'
                }`}
              >
                {reducedMotion ? (
                  <Pause className="w-3 h-3 text-gray-600" />
                ) : (
                  <Play className="w-3 h-3 text-gray-600" />
                )}
              </span>
            </button>
          </div>

          {/* Keyboard shortcut hint */}
          <p className="text-xs text-gray-400 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-700">
            Atalho: <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">Alt+T</kbd> alterna tema
          </p>
        </div>
      )}
    </>
  );
}
