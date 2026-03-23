import { useState } from 'react';
import { Plus, Pencil, Trash2, Quote, Star, AlertTriangle } from 'lucide-react';
import type { ITestimonial } from '@portal/shared';
import { MOCK_TESTIMONIALS } from '@/data/mockData';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const EMPTY_FORM: Omit<ITestimonial, 'id' | 'createdAt'> = {
  appId: '',
  appName: '',
  authorName: '',
  authorRole: '',
  authorUnit: '',
  content: '',
  rating: 5,
  isPublished: true,
};

interface FormErrors {
  authorName?: string;
  authorRole?: string;
  content?: string;
}

const ratingOptions = [
  { value: '1', label: '1 estrela' },
  { value: '2', label: '2 estrelas' },
  { value: '3', label: '3 estrelas' },
  { value: '4', label: '4 estrelas' },
  { value: '5', label: '5 estrelas' },
];

export default function TestimonialsCrud() {
  const [items, setItems] = useState<ITestimonial[]>(MOCK_TESTIMONIALS);
  const [editingItem, setEditingItem] = useState<ITestimonial | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<ITestimonial, 'id' | 'createdAt'>>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  function openCreate() {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setIsFormOpen(true);
  }

  function openEdit(item: ITestimonial) {
    setEditingItem(item);
    setForm({
      appId: item.appId ?? '',
      appName: item.appName ?? '',
      authorName: item.authorName,
      authorRole: item.authorRole,
      authorUnit: item.authorUnit ?? '',
      content: item.content,
      rating: item.rating ?? 5,
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
    if (!form.authorName.trim()) newErrors.authorName = 'Nome do autor é obrigatório.';
    if (!form.authorRole.trim()) newErrors.authorRole = 'Cargo do autor é obrigatório.';
    if (!form.content.trim()) newErrors.content = 'Conteúdo do depoimento é obrigatório.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    if (editingItem) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? { ...form, id: editingItem.id, createdAt: editingItem.createdAt }
            : item,
        ),
      );
    } else {
      setItems((prev) => [
        ...prev,
        {
          ...form,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
      ]);
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
          Depoimentos ({items.length})
        </h2>
        <Button onClick={openCreate} aria-label="Criar novo depoimento">
          <Plus className="w-4 h-4 mr-1.5" aria-hidden="true" />
          Novo Depoimento
        </Button>
      </div>

      {/* Grid of cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {items.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm col-span-2 text-center py-10">
            Nenhum depoimento cadastrado.
          </p>
        ) : (
          items.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm relative group"
            >
              {/* Actions */}
              <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEdit(t)}
                  className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  aria-label={`Editar depoimento de ${t.authorName}`}
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(t.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  aria-label={`Excluir depoimento de ${t.authorName}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-start gap-2 mb-3">
                <Quote className="w-6 h-6 text-blue-200 dark:text-blue-800 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex-1">
                  {!t.isPublished && (
                    <Badge color="yellow" className="mb-2">
                      Não publicado
                    </Badge>
                  )}
                  <p className="text-gray-700 dark:text-gray-300 italic text-sm">"{t.content}"</p>
                </div>
              </div>

              {t.rating !== undefined && (
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (t.rating ?? 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.authorName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.authorRole}</p>
                  {t.authorUnit && <p className="text-xs text-gray-400 dark:text-gray-500">{t.authorUnit}</p>}
                </div>
                {t.appName && (
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{t.appName}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        title={editingItem ? 'Editar Depoimento' : 'Novo Depoimento'}
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nome do Autor *"
              value={form.authorName}
              onChange={(e) => setForm((prev) => ({ ...prev, authorName: e.target.value }))}
              error={errors.authorName}
              placeholder="Ex: João Silva"
            />
            <Input
              label="Cargo *"
              value={form.authorRole}
              onChange={(e) => setForm((prev) => ({ ...prev, authorRole: e.target.value }))}
              error={errors.authorRole}
              placeholder="Ex: Analista de Operações"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Unidade"
              value={form.authorUnit ?? ''}
              onChange={(e) => setForm((prev) => ({ ...prev, authorUnit: e.target.value }))}
              placeholder="Ex: Regional Norte"
            />
            <Input
              label="App Relacionado"
              value={form.appName ?? ''}
              onChange={(e) => setForm((prev) => ({ ...prev, appName: e.target.value }))}
              placeholder="Ex: PipaeA"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Conteúdo do Depoimento *
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
              rows={4}
              placeholder="Texto do depoimento..."
              className={`w-full px-3 py-2 border rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${errors.content ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              aria-invalid={errors.content ? 'true' : undefined}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">{errors.content}</p>
            )}
          </div>

          <Select
            label="Avaliação"
            value={String(form.rating ?? 5)}
            onChange={(e) => setForm((prev) => ({ ...prev, rating: Number(e.target.value) }))}
            options={ratingOptions}
          />

          <div className="flex items-center gap-3">
            <input
              id="isPublished"
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => setForm((prev) => ({ ...prev, isPublished: e.target.checked }))}
              className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="isPublished" className="text-sm text-gray-700 dark:text-gray-300">
              Publicar depoimento no portal
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={closeForm}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {editingItem ? 'Salvar Alterações' : 'Criar Depoimento'}
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
              Tem certeza que deseja excluir este depoimento? Esta ação não pode ser desfeita.
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
