import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
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
        className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
      >
        Inicio
      </Link>
      <a
        href="#apps"
        onClick={scrollToApps}
        className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
      >
        Solucoes
      </a>
      <Link
        to="/citizen-developers"
        onClick={() => setMobileOpen(false)}
        className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
      >
        Citizen
      </Link>
      {isAuthenticated ? (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{user?.displayName}</span>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-600 transition-colors"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <Link
          to="/admin/login"
          onClick={() => setMobileOpen(false)}
          className="inline-flex items-center gap-1.5 text-gray-700 hover:text-blue-600 transition-colors font-medium"
        >
          <Lock className="w-4 h-4" />
          Login
        </Link>
      )}
    </>
  );

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-none'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AE</span>
            </div>
            <span className="hidden sm:block text-sm font-semibold text-gray-800">
              Produtos Digitais e Automacoes
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">{navLinks}</div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-4 border-t border-gray-100 bg-white">
          {navLinks}
        </div>
      </div>
    </nav>
  );
}
