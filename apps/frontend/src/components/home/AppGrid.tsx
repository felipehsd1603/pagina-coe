import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { CATEGORY_LIST, PHASE_LIST } from '@portal/shared';
import type { AppCategory, LifecyclePhase } from '@portal/shared';
import { useApps } from '@/hooks/useApps';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import AppCard from './AppCard';

export default function AppGrid() {
  const [category, setCategory] = useState<AppCategory | ''>('');
  const [phase, setPhase] = useState<LifecyclePhase | ''>('');
  const [search, setSearch] = useState('');

  const filters = {
    ...(category ? { category: category as AppCategory } : {}),
    ...(phase ? { phase: phase as LifecyclePhase } : {}),
    ...(search ? { search } : {}),
  };

  const { data: response, isLoading } = useApps(filters);
  const apps = response?.data;

  const hasFilters = category !== '' || phase !== '' || search !== '';

  const clearFilters = () => {
    setCategory('');
    setPhase('');
    setSearch('');
  };

  const categoryOptions = [
    { value: '', label: 'Todas as categorias' },
    ...CATEGORY_LIST.map((c) => ({ value: c.value, label: c.label })),
  ];

  const phaseOptions = [
    { value: '', label: 'Todas as fases' },
    ...PHASE_LIST.map((p) => ({ value: p.value, label: p.label })),
  ];

  return (
    <section id="apps" className="bg-white dark:bg-gray-950 py-16 md:py-20" aria-labelledby="apps-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="apps-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
          Solucoes Digitais
        </h2>

        {/* Filter row */}
        <div className="flex flex-col md:flex-row items-end gap-4 mb-10" role="search" aria-label="Filtrar solucoes">
          <div className="w-full md:w-56">
            <Select
              label="Categoria"
              options={categoryOptions}
              value={category}
              onChange={(e) => setCategory(e.target.value as AppCategory | '')}
            />
          </div>

          <div className="w-full md:w-56">
            <Select
              label="Fase do Ciclo"
              options={phaseOptions}
              value={phase}
              onChange={(e) => setPhase(e.target.value as LifecyclePhase | '')}
            />
          </div>

          <div className="w-full md:flex-1">
            <Input
              label="Buscar"
              placeholder="Buscar solucoes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium whitespace-nowrap pb-2"
            >
              Limpar Filtros
            </button>
          )}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-20" role="status">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <span className="sr-only">Carregando solucoes...</span>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && (!apps || apps.length === 0) && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhuma solucao encontrada.</p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Limpar filtros
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {!isLoading && apps && apps.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Lista de solucoes digitais">
            {apps.map((app) => (
              <div key={app.id} role="listitem">
                <AppCard app={app} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
