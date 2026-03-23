import { useState } from 'react';
import { Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import type { IDemand, DemandPriority, DemandStatus } from '@portal/shared';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const MOCK_DEMANDS: IDemand[] = [
  {
    id: 'd1b2c3d4-e5f6-7890-abcd-ef1234567801',
    requesterName: 'Carlos Eduardo Lima',
    requesterEmail: 'carlos.lima@aegea.com.br',
    requesterUnit: 'Regional Norte',
    requesterArea: 'Operações',
    title: 'Automação de Leitura de Hidrômetros',
    description:
      'Automatizar o processo de leitura e registro de hidrômetros, eliminando planilhas manuais e reduzindo erros de digitação.',
    problemToSolve:
      'Processo manual de leitura consome 40% do tempo dos agentes de campo e gera erros de registro.',
    estimatedUsers: 120,
    priority: 'ALTA',
    status: 'NOVA',
    createdAt: '2026-02-10T10:00:00Z',
    updatedAt: '2026-02-10T10:00:00Z',
  },
  {
    id: 'd1b2c3d4-e5f6-7890-abcd-ef1234567802',
    requesterName: 'Ana Paula Souza',
    requesterEmail: 'ana.souza@aegea.com.br',
    requesterUnit: 'Corporativo',
    requesterArea: 'Comercial',
    title: 'Dashboard de Perdas Comerciais',
    description:
      'Dashboard interativo para monitoramento em tempo real das perdas comerciais por regional, com alertas automáticos.',
    problemToSolve:
      'Falta de visibilidade centralizada das perdas comerciais impede ações corretivas rápidas.',
    estimatedUsers: 35,
    priority: 'MEDIA',
    status: 'EM_ANALISE',
    createdAt: '2026-02-15T14:30:00Z',
    updatedAt: '2026-02-18T09:00:00Z',
  },
  {
    id: 'd1b2c3d4-e5f6-7890-abcd-ef1234567803',
    requesterName: 'Marcos Vinícius Costa',
    requesterEmail: 'marcos.costa@aegea.com.br',
    requesterUnit: 'Regional Sul',
    requesterArea: 'Tratamento de Água',
    title: 'App Controle de Reagentes',
    description:
      'Aplicativo para controle de estoque e consumo de reagentes químicos nas estações de tratamento de água.',
    problemToSolve:
      'Falta de controle preciso de estoque leva a desabastecimento ou desperdício de reagentes.',
    estimatedUsers: 60,
    priority: 'ALTA',
    status: 'APROVADA',
    createdAt: '2026-01-20T08:00:00Z',
    updatedAt: '2026-02-20T16:00:00Z',
  },
  {
    id: 'd1b2c3d4-e5f6-7890-abcd-ef1234567804',
    requesterName: 'Juliana Ferreira',
    requesterEmail: 'juliana.ferreira@aegea.com.br',
    requesterUnit: 'Corporativo',
    requesterArea: 'Recursos Humanos',
    title: 'Portal de Treinamentos',
    description:
      'Portal centralizado para acesso a treinamentos internos, trilhas de aprendizagem e certificações da AEGEA.',
    problemToSolve:
      'Treinamentos dispersos em múltiplas plataformas dificultam o acompanhamento e engajamento dos colaboradores.',
    estimatedUsers: 2500,
    priority: 'BAIXA',
    status: 'EM_DESENVOLVIMENTO',
    createdAt: '2025-12-01T10:00:00Z',
    updatedAt: '2026-01-15T11:00:00Z',
  },
];

const PRIORITY_LABELS: Record<DemandPriority, string> = {
  BAIXA: 'Baixa',
  MEDIA: 'Média',
  ALTA: 'Alta',
  CRITICA: 'Crítica',
};

const STATUS_LABELS: Record<DemandStatus, string> = {
  NOVA: 'Nova',
  EM_ANALISE: 'Em Análise',
  APROVADA: 'Aprovada',
  EM_DESENVOLVIMENTO: 'Em Desenvolvimento',
  CONCLUIDA: 'Concluída',
  REJEITADA: 'Rejeitada',
};

const priorityColorMap: Record<DemandPriority, 'green' | 'yellow' | 'amber' | 'red'> = {
  BAIXA: 'green',
  MEDIA: 'yellow',
  ALTA: 'amber',
  CRITICA: 'red',
};

const statusColorMap: Record<DemandStatus, 'blue' | 'yellow' | 'green' | 'purple' | 'cyan' | 'red'> = {
  NOVA: 'blue',
  EM_ANALISE: 'yellow',
  APROVADA: 'green',
  EM_DESENVOLVIMENTO: 'purple',
  CONCLUIDA: 'cyan',
  REJEITADA: 'red',
};

const priorityOptions = Object.entries(PRIORITY_LABELS).map(([value, label]) => ({ value, label }));
const statusOptions = Object.entries(STATUS_LABELS).map(([value, label]) => ({ value, label }));

type DemandForm = Omit<IDemand, 'id' | 'createdAt' | 'updatedAt'>;

const EMPTY_FORM: DemandForm = {
  requesterName: '',
  requesterEmail: '',
  requesterUnit: '',
  requesterArea: '',
  title: '',
  description: '',
  problemToSolve: '',
  estimatedUsers: undefined,
  priority: 'MEDIA',
  status: 'NOVA',
};

interface FormErrors {
  requesterName?: string;
  requesterEmail?: string;
  requesterUnit?: string;
  requesterArea?: string;
  title?: string;
  description?: string;
  problemToSolve?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function DemandsCrud() {
  const [items, setItems] = useState<IDemand[]>(MOCK_DEMANDS);
  const [editingItem, setEditingItem] = useState<IDemand | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [form, setForm] = useState<DemandForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  function openCreate() {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setIsFormOpen(true);
  }

  function openEdit(item: IDemand) {
    setEditingItem(item);
    setForm({
      requesterName: item.requesterName,
      requesterEmail: item.requesterEmail,
      requesterUnit: item.requesterUnit,
      requesterArea: item.requesterArea,
      title: item.title,
      description: item.description,
      problemToSolve: item.problemToSolve,
      estimatedUsers: item.estimatedUsers,
      priority: item.priority,
      status: item.status,
    });
    setErrors({});
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingItem(null);
    setErrors({});
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.requesterName.trim()) newErrors.requesterName = 'Nome é obrigatório.';
    if (!form.requesterEmail.trim()) {
      newErrors.requesterEmail = 'E-mail é obrigatório.';
    } else if (!EMAIL_RE.test(form.requesterEmail)) {
      newErrors.requesterEmail = 'E-mail inválido.';
    }
    if (!form.requesterUnit.trim()) newErrors.requesterUnit = 'Unidade é obrigatória.';
    if (!form.requesterArea.trim()) newErrors.requesterArea = 'Área é obrigatória.';
    if (!form.title.trim()) newErrors.title = 'Título é obrigatório.';
    if (!form.description.trim()) newErrors.description = 'Descrição é obrigatória.';
    if (!form.problemToSolve.trim()) newErrors.problemToSolve = 'Problema a resolver é obrigatório.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    const now = new Date().toISOString();
    if (editingItem) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? { ...form, id: editingItem.id, createdAt: editingItem.createdAt, updatedAt: now }
            : item,
        ),
      );
    } else {
      setItems((prev) => [
        ...prev,
        { ...form, id: crypto.randomUUID(), createdAt: now, updatedAt: now },
      ]);
    }
    closeForm();
  }

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setDeleteConfirm(null);
  }

  function handleInlineStatusChange(id: string, status: DemandStatus) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item,
      ),
    );
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('pt-BR');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Demandas ({items.length})
        </h2>
        <Button onClick={openCreate} aria-label="Criar nova demanda">
          <Plus className="w-4 h-4 mr-1.5" aria-hidden="true" />
          Nova Demanda
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" role="table" aria-label="Lista de demandas">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Título</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Solicitante</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Área</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Prioridade</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400 text-sm">
                    Nenhuma demanda cadastrada.
                  </td>
                </tr>
              ) : (
                items.map((demand) => (
                  <tr key={demand.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{demand.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                        {demand.description}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 dark:text-white">{demand.requesterName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{demand.requesterUnit}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {demand.requesterArea}
                    </td>
                    <td className="px-6 py-4">
                      <Badge color={priorityColorMap[demand.priority]}>
                        {PRIORITY_LABELS[demand.priority]}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={demand.status}
                        onChange={(e) => handleInlineStatusChange(demand.id, e.target.value as DemandStatus)}
                        className="text-xs border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        aria-label={`Alterar status da demanda ${demand.title}`}
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {formatDate(demand.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(demand)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          aria-label={`Editar demanda ${demand.title}`}
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(demand.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          aria-label={`Excluir demanda ${demand.title}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        title={editingItem ? 'Editar Demanda' : 'Nova Demanda'}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Título *"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            error={errors.title}
            placeholder="Ex: Automação de Leitura de Hidrômetros"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nome do Solicitante *"
              value={form.requesterName}
              onChange={(e) => setForm((prev) => ({ ...prev, requesterName: e.target.value }))}
              error={errors.requesterName}
              placeholder="Nome completo"
            />
            <Input
              label="E-mail *"
              type="email"
              value={form.requesterEmail}
              onChange={(e) => setForm((prev) => ({ ...prev, requesterEmail: e.target.value }))}
              error={errors.requesterEmail}
              placeholder="nome@aegea.com.br"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Unidade *"
              value={form.requesterUnit}
              onChange={(e) => setForm((prev) => ({ ...prev, requesterUnit: e.target.value }))}
              error={errors.requesterUnit}
              placeholder="Ex: Regional Norte"
            />
            <Input
              label="Área *"
              value={form.requesterArea}
              onChange={(e) => setForm((prev) => ({ ...prev, requesterArea: e.target.value }))}
              error={errors.requesterArea}
              placeholder="Ex: Operações"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descrição *
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              placeholder="Descreva a demanda em detalhes..."
              className={`w-full px-3 py-2 border rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              aria-invalid={errors.description ? 'true' : undefined}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">{errors.description}</p>
            )}
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Problema a Resolver *
            </label>
            <textarea
              value={form.problemToSolve}
              onChange={(e) => setForm((prev) => ({ ...prev, problemToSolve: e.target.value }))}
              rows={2}
              placeholder="Qual dor ou problema essa demanda resolve?"
              className={`w-full px-3 py-2 border rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${errors.problemToSolve ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              aria-invalid={errors.problemToSolve ? 'true' : undefined}
            />
            {errors.problemToSolve && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">{errors.problemToSolve}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Usuários Estimados"
              type="number"
              value={form.estimatedUsers ?? ''}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  estimatedUsers: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              placeholder="Ex: 100"
              min="0"
            />
            <Select
              label="Prioridade"
              value={form.priority}
              onChange={(e) => setForm((prev) => ({ ...prev, priority: e.target.value as DemandPriority }))}
              options={priorityOptions}
            />
            <Select
              label="Status"
              value={form.status}
              onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as DemandStatus }))}
              options={statusOptions}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={closeForm}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {editingItem ? 'Salvar Alterações' : 'Criar Demanda'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Confirmar Exclusão"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Tem certeza que deseja excluir esta demanda? Esta ação não pode ser desfeita.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setDeleteConfirm(null)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
