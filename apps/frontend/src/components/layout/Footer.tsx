import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer role="contentinfo" aria-label="Rodape" className="bg-gray-900 dark:bg-gray-950 text-gray-300 border-t border-gray-800 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <span className="text-white font-bold text-sm">AE</span>
              </div>
              <span className="font-semibold text-white">Produtos Digitais</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Portal de solucoes digitais e automacoes da AEGEA. Governanca, transparencia e
              eficiencia operacional atraves da Power Platform.
            </p>
          </div>

          {/* Links Rapidos */}
          <nav aria-label="Links rapidos do rodape">
            <h3 className="text-white font-semibold mb-4">Links Rapidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <a href="#apps" className="hover:text-white transition-colors">
                  Solucoes
                </a>
              </li>
              <li>
                <Link to="/citizen-developers" className="hover:text-white transition-colors">
                  Citizen Developers
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-white transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <a
              href="mailto:EficienciaAutomacao@aegea.com.br"
              className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              EficienciaAutomacao@aegea.com.br
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-xs text-gray-500">
            &copy; 2026 AEGEA - Gerencia de Produtos Digitais e Automacoes
          </p>
        </div>
      </div>
    </footer>
  );
}
