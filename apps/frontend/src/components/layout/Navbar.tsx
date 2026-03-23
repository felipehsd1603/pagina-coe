import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Menu, X, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import GlobalSearch from '@/components/ui/GlobalSearch';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const scrollToApps = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById('apps');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const navLinks = (
    <>
      <Link
        to="/"
        onClick={() => setMobileOpen(false)}
        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
      >
        Inicio
      </Link>
      <a
        href="#apps"
        onClick={scrollToApps}
        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
      >
        Solucoes
      </a>
      <Link
        to="/citizen-developers"
        onClick={() => setMobileOpen(false)}
        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
      >
        Citizen
      </Link>
      {isAuthenticated ? (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">{user?.displayName}</span>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
            title="Sair"
            aria-label="Sair da conta"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <Link
          to="/admin/login"
          onClick={() => setMobileOpen(false)}
          className="inline-flex items-center gap-1.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
        >
          <Lock className="w-4 h-4" />
          Login
        </Link>
      )}
    </>
  );

  return (
    <nav
      role="navigation"
      aria-label="Navegacao principal"
      className={`sticky top-0 z-50 bg-white dark:bg-gray-900 transition-all duration-300 ${scrolled ? 'shadow-md dark:shadow-gray-800/50' : 'shadow-none'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0" aria-label="Pagina inicial - AEGEA Produtos Digitais">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AE</span>
            </div>
            <span className="hidden sm:block text-sm font-semibold text-gray-800 dark:text-gray-200">
              Produtos Digitais e Automacoes
            </span>
          </Link>

          {/* Desktop links + search + theme toggle */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks}
            <GlobalSearch />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile: search + theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-1.5">
            <GlobalSearch />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="text-gray-700 dark:text-gray-300"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          {navLinks}
        </div>
      </div>
    </nav>
  );
}
