'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, NoteTag, CreateNoteData } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose?: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft(); 
      
      if (onClose) {
        onClose();
      } else {
        router.back(); 
      }
    },
  });

  const handleSubmit = (formData: FormData) => {
    const selectedTag = formData.get('tag') as NoteTag;
    
    const data: CreateNoteData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: selectedTag === 'all' ? 'Todo' : selectedTag, 
    };

    mutation.mutate(data);
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  if (!isHydrated) return null;

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          id="title"
          type="text"
          className={css.input}
          required
          minLength={3}
          maxLength={50}
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
          placeholder="Назва вашої нотатки..."
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          rows={5}
          className={css.textarea}
          maxLength={500}
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
          placeholder="Текст нотатки..."
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select 
          name="tag" 
          id="tag" 
          className={css.select} 
          required 
          value={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value as NoteTag })}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button 
          type="button" 
          className={css.cancelButton} 
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className={css.submitButton} 
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}