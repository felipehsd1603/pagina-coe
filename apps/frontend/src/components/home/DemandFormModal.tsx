import { useState } from 'react';
import { Download } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { submitDemand } from '@/api/demands';

interface DemandFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  requesterName: string;
  requesterEmail: string;
  requesterUnit: string;
  requesterArea: string;
  title: string;
  description: string;
  problemToSolve: string;
  estimatedUsers: string;
}

interface FormErrors {
  [key: string]: string;
}

const areaOptions = [
  { value: 'Operacoes', label: 'Operacoes' },
  { value: 'Comercial', label: 'Comercial' },
  { value: 'Financeiro', label: 'Financeiro' },
  { value: 'TI', label: 'TI' },
  { value: 'Engenharia', label: 'Engenharia' },
  { value: 'RH', label: 'RH' },
  { value: 'Juridico', label: 'Juridico' },
];

const initialFormData: FormData = {
  requesterName: '',
  requesterEmail: '',
  requesterUnit: '',
  requesterArea: '',
  title: '',
  description: '',
  problemToSolve: '',
  estimatedUsers: '',
};

export default function DemandFormModal({ isOpen, onClose }: DemandFormModalProps) {
  const [form, setForm] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.requesterName.trim()) newErrors.requesterName = 'Nome e obrigatorio';
    if (!form.requesterEmail.trim()) {
      newErrors.requesterEmail = 'Email e obrigatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.requesterEmail)) {
      newErrors.requesterEmail = 'Email invalido';
    }
    if (!form.requesterUnit.trim()) newErrors.requesterUnit = 'Unidade e obrigatoria';
    if (!form.requesterArea) newErrors.requesterArea = 'Area e obrigatoria';
    if (!form.title.trim()) newErrors.title = 'Titulo e obrigatorio';
    if (!form.description.trim()) newErrors.description = 'Descricao e obrigatoria';
    if (!form.problemToSolve.trim()) newErrors.problemToSolve = 'Campo obrigatorio';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await submitDemand({
        requesterName: form.requesterName,
        requesterEmail: form.requesterEmail,
        requesterUnit: form.requesterUnit,
        requesterArea: form.requesterArea,
        title: form.title,
        description: form.description,
        problemToSolve: form.problemToSolve,
        estimatedUsers: form.estimatedUsers ? parseInt(form.estimatedUsers, 10) : undefined,
      });

      setToast('Demanda enviada com sucesso!');
      setForm(initialFormData);
      setTimeout(() => {
        setToast(null);
        onClose();
      }, 2000);
    } catch {
      setToast('Erro ao enviar demanda. Tente novamente.');
      setTimeout(() => setToast(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setForm(initialFormData);
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Abrir Nova Iniciativa" size="lg">
      {/* Toast */}
      {toast && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm font-medium ${
            toast.includes('sucesso')
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {toast}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nome"
            placeholder="Seu nome completo"
            value={form.requesterName}
            onChange={(e) => updateField('requesterName', e.target.value)}
            error={errors.requesterName}
          />
          <Input
            label="Email"
            type="email"
            placeholder="seu.email@aegea.com.br"
            value={form.requesterEmail}
            onChange={(e) => updateField('requesterEmail', e.target.value)}
            error={errors.requesterEmail}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Unidade"
            placeholder="Ex: Aguas do Rio, Prolagos"
            value={form.requesterUnit}
            onChange={(e) => updateField('requesterUnit', e.target.value)}
            error={errors.requesterUnit}
          />
          <Select
            label="Area"
            options={areaOptions}
            placeholder="Selecione a area"
            value={form.requesterArea}
            onChange={(e) => updateField('requesterArea', e.target.value)}
            error={errors.requesterArea}
          />
        </div>

        <Input
          label="Titulo da Demanda"
          placeholder="Titulo claro e objetivo"
          value={form.title}
          onChange={(e) => updateField('title', e.target.value)}
          error={errors.title}
        />

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descricao</label>
          <textarea
            className={`w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-h-[100px] ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Descreva a solucao desejada em detalhes"
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Problema a Resolver
          </label>
          <textarea
            className={`w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-h-[100px] ${
              errors.problemToSolve ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Qual problema ou dor este produto resolve?"
            value={form.problemToSolve}
            onChange={(e) => updateField('problemToSolve', e.target.value)}
          />
          {errors.problemToSolve && (
            <p className="mt-1 text-sm text-red-600">{errors.problemToSolve}</p>
          )}
        </div>

        <Input
          label="Usuarios Estimados"
          type="number"
          placeholder="Quantidade estimada de usuarios"
          value={form.estimatedUsers}
          onChange={(e) => updateField('estimatedUsers', e.target.value)}
        />

        {/* Excel template download */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Download className="w-4 h-4" />
          <a
            href="/templates/template-demanda.xlsx"
            className="text-blue-600 hover:text-blue-800 underline"
            download
          >
            Baixar template Excel para demandas
          </a>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <Button variant="secondary" type="button" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar Demanda'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
