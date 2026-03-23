import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  AppWindow,
  MessageSquareQuote,
  ClipboardList,
  BarChart3,
  GraduationCap,
  LogOut,
  Users,
  Layers,
  Server,
  Building,
  Quote,
  Star,
  Sun,
  Moon,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { MOCK_METRICS, MOCK_APPS, MOCK_TESTIMONIALS } from '@/data/mockData';
import { LIFECYCLE_PHASES } from '@portal/shared';
import Badge from '@/components/ui/Badge';
import AppsCrud from '@/components/admin/AppsCrud';
import TestimonialsCrud from '@/components/admin/TestimonialsCrud';
import DemandsCrud from '@/components/admin/DemandsCrud';
import MetricsCrud from '@/components/admin/MetricsCrud';
import CoursesCrud from '@/components/admin/CoursesCrud';

const sidebarLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/apps', label: 'Apps', icon: AppWindow },
  { to: '/admin/depoimentos', label: 'Depoimentos', icon: MessageSquareQuote },
  { to: '/admin/demandas', label: 'Demandas', icon: ClipboardList },
  { to: '/admin/metricas', label: 'Metricas', icon: BarChart3 },
  { to: '/admin/cursos', label: 'Cursos', icon: GraduationCap },
];

const METRIC_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  layers: Layers,
  server: Server,
  building: Building,
};

const METRIC_COLORS: Record<string, { color: string; bg: string }> = {
  users: { color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30' },
  layers: { color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/30' },
  server: { color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/30' },
  building: { color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/30' },
};

const phaseColorMap: Record<string, 'green' | 'yellow' | 'blue' | 'purple'> = {
  INICIATIVA: 'green',
  DEMANDA: 'yellow',
  PROJETO: 'blue',
  MELHORIA_CONTINUA: 'purple',
};

// --- Dashboard Home (overview only, no CRUD needed) ---

function DashboardHome() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Visao Geral</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {MOCK_METRICS.map((metric) => {
          const iconKey = metric.icon || 'users';
          const Icon = METRIC_ICONS[iconKey] || Users;
          const colors = METRIC_COLORS[iconKey] || METRIC_COLORS.users;
          return (
            <div
              key={metric.id}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-lg ${colors.bg} ${colors.color} flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {metric.value}
                {metric.suffix || ''}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Apps Recentes</h3>
          <div className="space-y-3">
            {MOCK_APPS.slice(0, 4).map((app) => (
              <div key={app.id} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-700 last:border-0">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{app.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{app.owner}</p>
                </div>
                <Badge color={phaseColorMap[app.lifecyclePhase] || 'blue'}>
                  {LIFECYCLE_PHASES[app.lifecyclePhase]?.label || app.lifecyclePhase}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Depoimentos Recentes</h3>
          <div className="space-y-3">
            {MOCK_TESTIMONIALS.slice(0, 4).map((t) => (
              <div key={t.id} className="py-2 border-b border-gray-50 dark:border-gray-700 last:border-0">
                <div className="flex items-start gap-2">
                  <Quote className="w-3.5 h-3.5 text-blue-300 dark:text-blue-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic line-clamp-2">"{t.content}"</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-5">
                  {t.authorName} - {t.appName}
                </p>
                {t.rating !== undefined && (
                  <div className="flex gap-0.5 mt-1 ml-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < (t.rating ?? 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Admin Page ---

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col" role="navigation" aria-label="Menu administrativo">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AE</span>
            </div>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Admin</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors w-full"
            aria-label="Sair da conta"
          >
            <LogOut className="w-5 h-5" aria-hidden="true" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Painel Administrativo</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">{user?.displayName}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              aria-label="Sair da conta"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              Sair
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="apps" element={<AppsCrud />} />
            <Route path="depoimentos" element={<TestimonialsCrud />} />
            <Route path="demandas" element={<DemandsCrud />} />
            <Route path="metricas" element={<MetricsCrud />} />
            <Route path="cursos" element={<CoursesCrud />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
