import { ArrowRight, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import { CLIENT_SUPPORT_EMAIL } from '@/config/client';

export default function RegistrationCTA() {
  return (
    <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Quer participar do Programa Citizen Developers?
        </h2>
        <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
          Entre em contato com a equipe do CoE para iniciar sua jornada.
          O primeiro passo e aceitar o Termo de Uso e acessar o ambiente Sandbox.
        </p>
        <a
          href={`mailto:${CLIENT_SUPPORT_EMAIL}?subject=Interesse no Programa Citizen Developers`}
          className="inline-flex items-center gap-2 bg-white text-purple-900 font-semibold px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors"
        >
          <Mail className="w-5 h-5" />
          Entrar em Contato
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
