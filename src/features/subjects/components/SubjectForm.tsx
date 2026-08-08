import { useState } from 'react';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import type { Subject } from '../../../types/models';

interface SubjectFormProps {
  initial?: Partial<Subject>;
  onSubmit: (data: { name: string; description: string }) => void;
  isLoading?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
}

export function SubjectForm({ initial, onSubmit, isLoading, onCancel, submitLabel = 'Lưu' }: SubjectFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), description: description.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="subject-name"
        label="Tên môn học"
        placeholder="Cơ sở dữ liệu, Lập trình Web,..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoFocus
      />
      <Textarea
        id="subject-description"
        label="Mô tả (tuỳ chọn)"
        placeholder="Mô tả ngắn về môn học..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex gap-3 justify-end">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>Huỷ</Button>
        )}
        <Button type="submit" variant="primary" isLoading={isLoading}>{submitLabel}</Button>
      </div>
    </form>
  );
}
