import { useState } from 'react';
import { Plus, Pencil, Trash2, Users, Layers, Server, Building, AlertTriangle } from 'lucide-react';
import type { IGlobalMetric } from '@portal/shared';
import { MOCK_METRICS } from '@/data/mockData';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

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

const iconOptions = [
  { value: 'users', label: 'Usuários (people)' },
  { value: 'layers', label: 'Camadas (layers)' },
  { value: 'server', label: 'Servidor (server)' },
  { value: 'building', label: 'Prédio (building)' },
];

type MetricForm = Omit<IGlobalMetric, 'id'>;

const EMPTY_FORM: MetricForm = {
  key: '',
  label: '',
  value: '',
  suffix: '',
  icon: 'users',
};

interface FormErrors {
  key?: string;
  label?: string;
  value?: string;
}

export default function MetricsCrud() {
  const [items, setItems] = useState<IGlobalMetric[]>(MOCK_METRICS);
  const [editingItem, setEditingItem] = useState<IGlobalMetric | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [form, setForm] = useState<MetricForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  function openCreate() {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setIsFormOpen(true);
  }

  function openEdit(item: IGlobalMetric) {
    setEditingItem(item);
    setForm({
      key: item.key,
      label: item.label,
      value: item.value,
      suffix: item.suffix ?? '',
      icon: item.icon ?? 'users',
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
    if (!form.key.trim()) {
      newErrors.key = 'Chave é obrigatória.';
    } else if (
      !editingItem &&
      items.some((item) => item.key === form.key.trim())
    ) {
      newErrors.key = 'Esta chave já existe.';
    }
    if (!form.label.trim()) newErrors.label = 'Rótulo é obrigatório.';
    if (!form.value.trim()) newErrors.value = 'Valor é obrigatório.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    if (editingItem) {
      setItems((prev) =>
        prev.map((item) => (item.id === editingItem.id ? { ...form, id: editingItem.id } : item)),
      );
    } else {
      setItems((prev) => [...prev, { ...form, id: crypto.randomUUID() }]);
    }
    closeForm();
  }

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setDeleteConfirm(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Métricas ({items.length})
        </h2>
        <Button onClick={openCreate} aria-label="Criar nova métrica">
          <Plus className="w-4 h-4 mr-1.5" aria-hidden="true" />
          Nova Métrica
        </Button>
      </div>

      {/* Grid of metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm col-span-4 text-center py-10">
            Nenhuma métrica cadastrada.
          </p>
        ) : (
          items.map((metric) => {
            const iconKey = metric.icon || 'users';
            const Icon = METRIC_ICONS[iconKey] || Users;
            const colors = METRIC_COLORS[iconKey] || METRIC_COLORS.users;
            return (
              <div
                key={metric.id}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm text-center relative group"
              >
                {/* Actions */}
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(metric)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    aria-label={`Editar métrica ${metric.label}`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(metric.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    aria-label={`Excluir métrica ${metric.label}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.bg} ${colors.color} mb-3`}
                >
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {metric.value}
                  {metric.suffix || ''}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</p>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-1 font-mono">{metric.key}</p>
              </div>
            );
          })
        )}
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        title={editingItem ? 'Editar Métrica' : 'Nova Métrica'}
        size="sm"
      >
        <div className="space-y-4">
          <Input
            label="Chave (key) *"
            value={form.key}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                key: e.target.value.toLowerCase().replace(/\s+/g, '_'),
              }))
            }
            error={errors.key}
            placeholder="Ex: active_users"
            disabled={!!editingItem}
          />

          <Input
            label="Rótulo *"
            value={form.label}
            onChange={(e) => setForm((prev) => ({ ...prev, label: e.target.value }))}
            error={errors.label}
            placeholder="Ex: Makers Ativos"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Valor *"
              value={form.value}
              onChange={(e) => setForm((prev) => ({ ...prev, value: e.target.value }))}
              error={errors.value}
              placeholder="Ex: 339"
            />
            <Input
              label="Sufixo"
              value={form.suffix ?? ''}
              onChange={(e) => setForm((prev) => ({ ...prev, suffix: e.target.value }))}
              placeholder="Ex: +"
            />
          </div>

          <Select
            label="Ícone"
            value={form.icon ?? 'users'}
            onChange={(e) => setForm((prev) => ({ ...prev, icon: e.target.value }))}
            options={iconOptions}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={closeForm}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {editingItem ? 'Salvar Alterações' : 'Criar Métrica'}
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
              Tem certeza que deseja excluir esta métrica? Esta ação não pode ser desfeita.
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
