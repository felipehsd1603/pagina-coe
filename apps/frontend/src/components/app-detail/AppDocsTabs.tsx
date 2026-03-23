import { useState } from 'react';
import { Play, FileText, BookOpen } from 'lucide-react';
import Tabs from '@/components/ui/Tabs';
import type { IAppDocument } from '@portal/shared';

interface AppDocsTabsProps {
  documents: IAppDocument[];
}

const DOC_TABS = [
  { key: 'VIDEO', label: 'Videos' },
  { key: 'MANUAL', label: 'Manuais' },
  { key: 'INSTRUCTION', label: 'Instrucoes' },
];

const ICONS = {
  VIDEO: Play,
  MANUAL: FileText,
  INSTRUCTION: BookOpen,
};

export default function AppDocsTabs({ documents }: AppDocsTabsProps) {
  const [activeTab, setActiveTab] = useState('VIDEO');

  if (!documents.length) return null;

  const filtered = documents.filter((d) => d.type === activeTab);

  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Documentacao</h2>
        <Tabs tabs={DOC_TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 col-span-full text-center py-8">
              Nenhum conteudo disponivel nesta categoria.
            </p>
          ) : (
            filtered.map((doc) => {
              const Icon = ICONS[doc.type];
              return (
                <a
                  key={doc.id}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <Icon className="w-5 h-5 text-aegea-600 dark:text-aegea-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{doc.title}</h4>
                    {doc.description && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{doc.description}</p>}
                  </div>
                </a>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
