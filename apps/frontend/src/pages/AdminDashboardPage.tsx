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
  Star,
  Quote,
  Clock,
  Inbox,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { MOCK_METRICS, MOCK_APPS, MOCK_TESTIMONIALS, MOCK_COURSES } from '@/data/mockData';
import { APP_CATEGORIES, LIFECYCLE_PHASES } from '@portal/shared';
import Badge from '@/components/ui/Badge';

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
  users: { color: 'text-blue-600', bg: 'bg-blue-50' },
  layers: { color: 'text-green-600', bg: 'bg-green-50' },
  server: { color: 'text-purple-600', bg: 'bg-purple-50' },
  building: { color: 'text-amber-600', bg: 'bg-amber-50' },
};

const phaseColorMap: Record<string, 'green' | 'yellow' | 'blue' | 'purple'> = {
  INICIATIVA: 'green',
  DEMANDA: 'yellow',
  PROJETO: 'blue',
  MELHORIA_CONTINUA: 'purple',
};

const TIER_LABELS: Record<string, string> = {
  T1_STARTER: 'Basico',
  T2_STANDARD: 'Intermediario',
  T3_ADVANCED: 'Avancado',
  T4_POWER_DEVELOPER: 'Avancado',
};

// --- Sub-pages ---

function DashboardHome() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Visao Geral</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {MOCK_METRICS.map((metric) => {
          const iconKey = metric.icon || 'users';
          const Icon = METRIC_ICONS[iconKey] || Users;
          const colors = METRIC_COLORS[iconKey] || METRIC_COLORS.users;
          return (
            <div
              key={metric.id}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-lg ${colors.bg} ${colors.color} flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm text-gray-500">{metric.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {metric.value}
                {metric.suffix || ''}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Apps Recentes</h3>
          <div className="space-y-3">
            {MOCK_APPS.slice(0, 4).map((app) => (
              <div key={app.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{app.name}</p>
                  <p className="text-xs text-gray-500">{app.owner}</p>
                </div>
                <Badge color={phaseColorMap[app.lifecyclePhase] || 'blue'}>
                  {LIFECYCLE_PHASES[app.lifecyclePhase]?.label || app.lifecyclePhase}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Depoimentos Recentes</h3>
          <div className="space-y-3">
            {MOCK_TESTIMONIALS.slice(0, 4).map((t) => (
              <div key={t.id} className="py-2 border-b border-gray-50 last:border-0">
                <p className="text-sm text-gray-600 italic line-clamp-2">"{t.content}"</p>
                <p className="text-xs text-gray-500 mt-1">
                  {t.authorName} - {t.appName}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AppsSection() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Apps ({MOCK_APPS.length})</h2>
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fase</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Responsavel</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plataforma</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_APPS.map((app) => {
              const catMeta = APP_CATEGORIES[app.category];
              const phaseMeta = LIFECYCLE_PHASES[app.lifecyclePhase];
              return (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 text-sm">{app.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{app.shortDescription}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge color={catMeta?.color as 'blue' | 'green' | 'purple' | 'amber' | 'cyan'}>
                      {catMeta?.label || app.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge color={phaseColorMap[app.lifecyclePhase] || 'blue'}>
                      {phaseMeta?.label || app.lifecyclePhase}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{app.owner}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{app.platform}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Depoimentos ({MOCK_TESTIMONIALS.length})
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {MOCK_TESTIMONIALS.map((t) => (
          <div key={t.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <Quote className="w-6 h-6 text-blue-200 mb-3" />
            <p className="text-gray-700 italic mb-4 text-sm">"{t.content}"</p>
            {t.rating && (
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < t.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 text-sm">{t.authorName}</p>
                <p className="text-xs text-gray-500">{t.authorRole}</p>
                {t.authorUnit && <p className="text-xs text-gray-400">{t.authorUnit}</p>}
              </div>
              <span className="text-xs text-blue-600 font-medium">{t.appName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DemandsSection() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Demandas</h2>
      <div className="bg-white border border-gray-100 rounded-xl p-12 shadow-sm text-center">
        <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg font-medium">Nenhuma demanda recebida</p>
        <p className="text-gray-400 text-sm mt-1">
          As demandas enviadas pelo portal aparecerão aqui.
        </p>
      </div>
    </div>
  );
}

function MetricsSection() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Metricas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_METRICS.map((metric) => {
          const iconKey = metric.icon || 'users';
          const Icon = METRIC_ICONS[iconKey] || Users;
          const colors = METRIC_COLORS[iconKey] || METRIC_COLORS.users;
          return (
            <div
              key={metric.id}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm text-center"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.bg} ${colors.color} mb-3`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {metric.value}
                {metric.suffix || ''}
              </div>
              <p className="text-sm text-gray-500">{metric.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CoursesSection() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Cursos ({MOCK_COURSES.length})</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_COURSES.map((course) => {
          const tierLabel = TIER_LABELS[course.tier] || 'Basico';
          return (
            <div
              key={course.id}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <Badge
                  color={
                    tierLabel === 'Basico'
                      ? 'green'
                      : tierLabel === 'Intermediario'
                        ? 'blue'
                        : 'purple'
                  }
                >
                  {tierLabel}
                </Badge>
                <span className="text-xs text-gray-400">{course.format}</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-xs text-gray-600 mb-3">{course.description}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />
                  {course.provider || 'Equipe CoE'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Main Admin Page ---

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AE</span>
            </div>
            <span className="text-sm font-semibold text-gray-800">Admin</span>
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
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-gray-900">Painel Administrativo</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.displayName}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="apps" element={<AppsSection />} />
            <Route path="depoimentos" element={<TestimonialsSection />} />
            <Route path="demandas" element={<DemandsSection />} />
            <Route path="metricas" element={<MetricsSection />} />
            <Route path="cursos" element={<CoursesSection />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
