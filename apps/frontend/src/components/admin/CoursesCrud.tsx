import { useState } from 'react';
import { Plus, Pencil, Trash2, Clock, GraduationCap, ExternalLink, AlertTriangle } from 'lucide-react';
import type { ICourse, CitizenTier } from '@portal/shared';
import { MOCK_COURSES } from '@/data/mockData';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const TIER_LABELS: Record<CitizenTier, string> = {
  T1_STARTER: 'Básico',
  T2_STANDARD: 'Intermediário',
  T3_ADVANCED: 'Avançado',
  T4_POWER_DEVELOPER: 'Power Developer',
};

const tierColorMap: Record<CitizenTier, 'green' | 'blue' | 'purple' | 'amber'> = {
  T1_STARTER: 'green',
  T2_STANDARD: 'blue',
  T3_ADVANCED: 'purple',
  T4_POWER_DEVELOPER: 'amber',
};

const tierOptions = Object.entries(TIER_LABELS).map(([value, label]) => ({ value, label }));

type CourseForm = Omit<ICourse, 'id'>;

const EMPTY_FORM: CourseForm = {
  title: '',
  description: '',
  tier: 'T1_STARTER',
  format: '',
  duration: '',
  provider: '',
  resourceUrl: '',
  isPublished: true,
};

interface FormErrors {
  title?: string;
  description?: string;
  format?: string;
  duration?: string;
}

export default function CoursesCrud() {
  const [items, setItems] = useState<ICourse[]>(MOCK_COURSES);
  const [editingItem, setEditingItem] = useState<ICourse | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [form, setForm] = useState<CourseForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  function openCreate() {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setIsFormOpen(true);
  }

  function openEdit(item: ICourse) {
    setEditingItem(item);
    setForm({
      title: item.title,
      description: item.description,
      tier: item.tier,
      format: item.format,
      duration: item.duration,
      provider: item.provider ?? '',
      resourceUrl: item.resourceUrl ?? '',
      isPublished: item.isPublished,
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
    if (!form.title.trim()) newErrors.title = 'Título é obrigatório.';
    if (!form.description.trim()) newErrors.description = 'Descrição é obrigatória.';
    if (!form.format.trim()) newErrors.format = 'Formato é obrigatório.';
    if (!form.duration.trim()) newErrors.duration = 'Duração é obrigatória.';
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
          Cursos ({items.length})
        </h2>
        <Button onClick={openCreate} aria-label="Criar novo curso">
          <Plus className="w-4 h-4 mr-1.5" aria-hidden="true" />
          Novo Curso
        </Button>
      </div>

      {/* Grid of course cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm col-span-3 text-center py-10">
            Nenhum curso cadastrado.
          </p>
        ) : (
          items.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm relative group"
            >
              {/* Actions */}
              <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEdit(course)}
                  className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  aria-label={`Editar curso ${course.title}`}
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(course.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  aria-label={`Excluir curso ${course.title}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between mb-3 pr-16">
                <Badge color={tierColorMap[course.tier]}>
                  {TIER_LABELS[course.tier]}
                </Badge>
                <span className="text-xs text-gray-400 dark:text-gray-500">{course.format}</span>
              </div>

              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{course.description}</p>

              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" aria-hidden="true" />
                  {course.provider || 'Equipe CoE'}
                </span>
              </div>

              {!course.isPublished && (
                <Badge color="yellow">Não publicado</Badge>
              )}

              {course.resourceUrl && (
                <a
                  href={course.resourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1"
                  aria-label={`Acessar recurso do curso ${course.title}`}
                >
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  Acessar curso
                </a>
              )}
            </div>
          ))
        )}
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        title={editingItem ? 'Editar Curso' : 'Novo Curso'}
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Título *"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            error={errors.title}
            placeholder="Ex: Introdução ao Power Apps"
          />

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descrição *
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              placeholder="Descreva o conteúdo do curso..."
              className={`w-full px-3 py-2 border rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              aria-invalid={errors.description ? 'true' : undefined}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">{errors.description}</p>
            )}
          </div>

          <Select
            label="Nível (Tier)"
            value={form.tier}
            onChange={(e) => setForm((prev) => ({ ...prev, tier: e.target.value as CitizenTier }))}
            options={tierOptions}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Formato *"
              value={form.format}
              onChange={(e) => setForm((prev) => ({ ...prev, format: e.target.value }))}
              error={errors.format}
              placeholder="Ex: Video, Leitura, Lab"
            />
            <Input
              label="Duração *"
              value={form.duration}
              onChange={(e) => setForm((prev) => ({ ...prev, duration: e.target.value }))}
              error={errors.duration}
              placeholder="Ex: 2h, 30min"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Provedor"
              value={form.provider ?? ''}
              onChange={(e) => setForm((prev) => ({ ...prev, provider: e.target.value }))}
              placeholder="Ex: Microsoft Learn"
            />
            <Input
              label="URL do Recurso"
              type="url"
              value={form.resourceUrl ?? ''}
              onChange={(e) => setForm((prev) => ({ ...prev, resourceUrl: e.target.value }))}
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="courseIsPublished"
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => setForm((prev) => ({ ...prev, isPublished: e.target.checked }))}
              className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="courseIsPublished" className="text-sm text-gray-700 dark:text-gray-300">
              Publicar curso no portal
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={closeForm}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {editingItem ? 'Salvar Alterações' : 'Criar Curso'}
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
              Tem certeza que deseja excluir este curso? Esta ação não pode ser desfeita.
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
