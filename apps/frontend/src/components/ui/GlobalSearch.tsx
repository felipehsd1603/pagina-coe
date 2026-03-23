import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { MOCK_APPS } from '@/data/mockData';
import { APP_CATEGORIES } from '@portal/shared';

/* ── gradient helpers (consistent with AppCard) ──────────────── */
const gradientBgs = [
  'from-blue-500 to-blue-700',
  'from-green-500 to-green-700',
  'from-purple-500 to-purple-700',
  'from-amber-500 to-amber-700',
  'from-cyan-500 to-cyan-700',
];

function appGradient(name: string) {
  const idx = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % gradientBgs.length;
  return gradientBgs[idx];
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

/* ── highlight matched text ──────────────────────────────────── */
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-blue-100 dark:bg-blue-900/60 text-inherit rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const results = useMemo(
    () =>
      query.trim().length >= 2
        ? MOCK_APPS.filter((app) => {
            const q = query.toLowerCase();
            return (
              app.name.toLowerCase().includes(q) ||
              app.description.toLowerCase().includes(q) ||
              (app.shortDescription || '').toLowerCase().includes(q) ||
              app.owner.toLowerCase().includes(q) ||
              APP_CATEGORIES[app.category]?.label.toLowerCase().includes(q)
            );
          }).slice(0, 6)
        : [],
    [query],
  );

  const open = useCallback(() => {
    setIsOpen(true);
    setIsAnimating(true);
    setTimeout(() => {
      inputRef.current?.focus();
      setIsAnimating(false);
    }, 50);
  }, []);

  const close = useCallback(() => {
    setIsAnimating(true);
    // Allow exit animation to play
    setTimeout(() => {
      setIsOpen(false);
      setQuery('');
      setHighlightedIndex(-1);
      setIsAnimating(false);
    }, 150);
  }, []);

  const goToApp = useCallback(
    (slug: string) => {
      setIsOpen(false);
      setQuery('');
      setHighlightedIndex(-1);
      navigate(`/app/${slug}`);
    },
    [navigate],
  );

  const goToAllResults = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setHighlightedIndex(-1);
    const el = document.getElementById('apps');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Keyboard shortcut: Ctrl+K or /
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? close() : open();
      }
      if (
        e.key === '/' &&
        !isOpen &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, open, close]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, close]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll('[role="option"]');
    items[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex]);

  // Keyboard navigation in results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, results.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, -1));
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && results[highlightedIndex]) {
        goToApp(results[highlightedIndex].slug);
      } else if (query.trim().length >= 2) {
        goToAllResults();
      }
    }
  };

  // Reset highlight when query changes
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [query]);

  const showDropdown = query.trim().length >= 2;
  const activeDescendant =
    highlightedIndex >= 0 && results[highlightedIndex]
      ? `search-result-${results[highlightedIndex].id}`
      : undefined;

  /* ── Closed state: trigger button ──────────────────────────── */
  if (!isOpen) {
    return (
      <button
        onClick={open}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900"
        aria-label="Buscar solucoes (Ctrl+K)"
      >
        <Search className="w-4 h-4" />
        <span className="hidden lg:inline">Buscar...</span>
        <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-mono text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-600">
          <span className="text-[9px]">Ctrl</span>K
        </kbd>
      </button>
    );
  }

  /* ── Open state: search input + dropdown ───────────────────── */
  return (
    <div
      ref={containerRef}
      className="relative"
      role="combobox"
      aria-expanded={showDropdown}
      aria-haspopup="listbox"
      aria-owns="search-results"
    >
      {/* Search input */}
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-400 dark:border-blue-500 bg-white dark:bg-gray-800 shadow-sm ring-2 ring-blue-100 dark:ring-blue-900/50 transition-all duration-200 ease-out ${
          isAnimating ? 'w-36 opacity-80' : 'w-52 lg:w-72 opacity-100'
        }`}
      >
        <Search className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none min-w-0"
          placeholder="Buscar apps, areas..."
          aria-label="Buscar solucoes"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-activedescendant={activeDescendant}
          role="searchbox"
        />
        <button
          onClick={close}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0 rounded p-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Fechar busca"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Results dropdown */}
      {showDropdown && (
        <div
          id="search-results"
          role="listbox"
          aria-label="Resultados da busca"
          className="absolute top-full right-0 mt-2 w-80 lg:w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl dark:shadow-gray-900/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2"
          style={{
            animation: 'searchDropdownIn 150ms ease-out',
          }}
        >
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <Search className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Nenhum resultado para &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Tente buscar por nome, area ou responsavel
              </p>
            </div>
          ) : (
            <>
              <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide">
                  {results.length} resultado{results.length !== 1 ? 's' : ''}
                </p>
              </div>
              <ul ref={listRef} className="py-1 max-h-72 overflow-y-auto overscroll-contain">
                {results.map((app, index) => {
                  const catMeta = APP_CATEGORIES[app.category];
                  const gradient = appGradient(app.name);
                  const isHighlighted = index === highlightedIndex;
                  return (
                    <li
                      key={app.id}
                      id={`search-result-${app.id}`}
                      role="option"
                      aria-selected={isHighlighted}
                      onClick={() => goToApp(app.slug)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors duration-100 ${
                        isHighlighted
                          ? 'bg-blue-50 dark:bg-blue-900/30'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      {/* Icon matching AppCard gradient */}
                      <div
                        className={`w-9 h-9 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}
                      >
                        {app.iconUrl ? (
                          <img src={app.iconUrl} alt="" className="w-5 h-5 rounded object-cover" />
                        ) : (
                          <span className="text-[10px] font-bold text-white/90">{getInitials(app.name)}</span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          <HighlightMatch text={app.name} query={query} />
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                          {catMeta?.label} · {app.owner}
                        </p>
                      </div>

                      {/* Arrow indicator */}
                      <ArrowRight
                        className={`w-4 h-4 flex-shrink-0 transition-all duration-150 ${
                          isHighlighted
                            ? 'text-blue-500 dark:text-blue-400 translate-x-0.5'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    </li>
                  );
                })}
              </ul>
              <button
                onClick={goToAllResults}
                className="w-full px-4 py-2.5 text-sm text-blue-600 dark:text-blue-400 font-medium border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                Ver todas as solucoes
              </button>
            </>
          )}
        </div>
      )}

      {/* Keyframe animation injected via style tag */}
      <style>{`
        @keyframes searchDropdownIn {
          from {
            opacity: 0;
            transform: translateY(-4px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
