import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Usuario ou senha invalidos');
      }
    } catch {
      setError('Erro ao realizar login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 dark:from-gray-900 dark:to-gray-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
            <span className="text-white font-bold text-xl">AE</span>
          </div>
        </div>

        <h1 className="text-center text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Acesso Administrativo
        </h1>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
          Portal de Produtos Digitais e Automacoes
        </p>

        <form onSubmit={handleSubmit} className="space-y-5" aria-label="Formulario de login">
          <Input
            label="Usuario"
            type="text"
            placeholder="Digite seu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />

          <Input
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm rounded-lg px-4 py-3" role="alert">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="flex-1"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="flex-1"
              onClick={() => navigate('/')}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
