import { Users, Sparkles } from 'lucide-react';

export default function ProgramHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white py-20 px-4">
      {/* Decorative blur elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-pink-400/15 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Programa de Capacitacao</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Programa Citizen Developers</h1>
        <p className="text-lg text-purple-100 max-w-3xl mx-auto mb-8">
          Capacite-se para criar solucoes digitais com a Power Platform.
          Nosso programa estruturado guia voce desde os primeiros passos ate o nivel avancado,
          com trilhas de aprendizado, certificacoes e suporte do CoE.
        </p>
        <div className="inline-flex items-center gap-2 text-purple-200">
          <Users className="w-5 h-5" />
          <span>~269 participantes no programa</span>
        </div>
      </div>
    </section>
  );
}
