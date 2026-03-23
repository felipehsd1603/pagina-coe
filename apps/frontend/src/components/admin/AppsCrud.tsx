import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, AlertTriangle } from 'lucide-react';
import type { IApp, AppCategory, LifecyclePhase } from '@portal/shared';
import { APP_CATEGORIES, LIFECYCLE_PHASES, CATEGORY_LIST, PHASE_LIST } from '@portal/shared';
import { MOCK_APPS } from '@/data/mockData';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const phaseColorMap: Record<string, 'green' | 'yellow' | 'blue' | 'purple'> = {
  INICIATIVA: 'green',
  DEMANDA: 'yellow',
  PROJETO: 'blue',
  MELHORIA_CONTINUA: 'purple',
};

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const EMPTY_FORM: Omit<IApp, 'id'> = {
  name: '',
  slug: '',
  description: '',
  shortDescription: '',
  category: 'OPERACIONAL',
  lifecyclePhase: 'INICIATIVA',
  owner: '',
  businessUnit: '',
  platform: '',
  hasSensitiveData: false,
  bannerUrl: '',
  statusDate: '',
  isPublished: true,
};

interface FormErrors {
  name?: string;
  description?: string;
  owner?: string;
  platform?: string;
}

export default function AppsCrud() {
  const [items, setItems] = useState<IApp[]>(MOCK_APPS);
  const [editingItem, setEditingItem] = useState<IApp | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<IApp, 'id'>>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [search, setSearch] = useState('');

  const filtered = items.filter(
    (app) =>
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.owner.toLowerCase().includes(search.toLowerCase()) ||
      app.platform.toLowerCase().includes(search.toLowerCase()),
  );

  function openCreate() {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setIsFormOpen(true);
  }

  function openEdit(app: IApp) {
    setEditingItem(app);
    setForm({
      name: app.name,
      slug: app.slug,
      description: app.description,
      shortDescription: app.shortDescription ?? '',
      category: app.category,
      lifecyclePhase: app.lifecyclePhase,
      owner: app.owner,
      businessUnit: app.businessUnit ?? '',
      platform: app.platform,
      hasSensitiveData: app.hasSensitiveData,
      bannerUrl: app.bannerUrl ?? '',
      statusDate: app.statusDate ?? '',
      isPublished: app.isPublished,
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
    if (!form.name.trim()) newErrors.name = 'Nome é obrigatório.';
    if (!form.description.trim()) newErrors.description = 'Descrição é obrigatória.';
    if (!form.owner.trim()) newErrors.owner = 'Responsável é obrigatório.';
    if (!form.platform.trim()) newErrors.platform = 'Plataforma é obrigatória.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    if (editingItem) {
      setItems((prev) => prev.map((item) => (item.id === editingItem.id ? { ...form, id: editingItem.id } : item)));
    } else {
      setItems((prev) => [...prev, { ...form, id: crypto.randomUUID() }]);
    }
    closeForm();
  }

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setDeleteConfirm(null);
  }

  function handleNameChange(value: string) {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: editingItem ? prev.slug : slugify(value),
    }));
  }

  const categoryOptions = CATEGORY_LIST.map((c) => ({ value: c.value, label: c.label }));
  const phaseOptions = PHASE_LIST.map((p) => ({ value: p.value, label: p.label }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Apps ({filtered.length})
        </h2>
        <Button onClick={openCreate} aria-label="Criar novo app">
          <Plus className="w-4 h-4 mr-1.5" aria-hidden="true" />
          Novo App
        </Button>
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome, responsável ou plataforma..."
          className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          aria-label="Buscar apps"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" role="table" aria-label="Lista de apps">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fase</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Responsável</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Plataforma</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400 text-sm">
                    Nenhum app encontrado.
                  </td>
                </tr>
              ) : (
                filtered.map((app) => {
                  const catMeta = APP_CATEGORIES[app.category];
                  const phaseMeta = LIFECYCLE_PHASES[app.lifecyclePhase];
                  return (
                    <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{app.name}</p>
                        {app.shortDescription && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{app.shortDescription}</p>
                        )}
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
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{app.owner}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{app.platform}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(app)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            aria-label={`Editar app ${app.name}`}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(app.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            aria-label={`Excluir app ${app.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        title={editingItem ? 'Editar App' : 'Novo App'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nome *"
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              error={errors.name}
              placeholder="Ex: PipaeA"
            />
            <Input
              label="Slug"
              value={form.slug}
              onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
              placeholder="gerado-automaticamente"
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
              placeholder="Descrição completa do app..."
              className={`w-full px-3 py-2 border rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              aria-invalid={errors.description ? 'true' : undefined}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">{errors.description}</p>
            )}
          </div>

          <Input
            label="Descrição curta"
            value={form.shortDescription ?? ''}
            onChange={(e) => setForm((prev) => ({ ...prev, shortDescription: e.target.value }))}
            placeholder="Resumo em uma linha"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Categoria"
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as AppCategory }))}
              options={categoryOptions}
            />
            <Select
              label="Fase do Ciclo de Vida"
              value={form.lifecyclePhase}
              onChange={(e) => setForm((prev) => ({ ...prev, lifecyclePhase: e.target.value as LifecyclePhase }))}
              options={phaseOptions}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Responsável *"
              value={form.owner}
              onChange={(e) => setForm((prev) => ({ ...prev, owner: e.target.value }))}
              error={errors.owner}
              placeholder="Ex: Gerência de Operações"
            />
            <Input
              label="Unidade de Negócio"
              value={form.businessUnit ?? ''}
              onChange={(e) => setForm((prev) => ({ ...prev, businessUnit: e.target.value }))}
              placeholder="Ex: Corporativo"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Plataforma *"
              value={form.platform}
              onChange={(e) => setForm((prev) => ({ ...prev, platform: e.target.value }))}
              error={errors.platform}
              placeholder="Ex: Power Apps"
            />
            <Input
              label="Data de Status"
              value={form.statusDate ?? ''}
              onChange={(e) => setForm((prev) => ({ ...prev, statusDate: e.target.value }))}
              placeholder="Ex: Produção: 15/01"
            />
          </div>

          <Input
            label="URL do Banner"
            value={form.bannerUrl ?? ''}
            onChange={(e) => setForm((prev) => ({ ...prev, bannerUrl: e.target.value }))}
            placeholder="https://..."
            type="url"
          />

          <div className="flex items-center gap-3">
            <input
              id="hasSensitiveData"
              type="checkbox"
              checked={form.hasSensitiveData}
              onChange={(e) => setForm((prev) => ({ ...prev, hasSensitiveData: e.target.checked }))}
              className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="hasSensitiveData" className="text-sm text-gray-700 dark:text-gray-300">
              Contém dados sensíveis
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={closeForm}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {editingItem ? 'Salvar Alterações' : 'Criar App'}
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
          <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Tem certeza que deseja excluir este app? Esta ação não pode ser desfeita.
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
