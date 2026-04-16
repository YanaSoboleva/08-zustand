'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Note } from '@/types/note';
import { deleteNote } from '@/lib/api';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const { mutate: removeNote } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error: Error) => {
      console.error('Помилка при видаленні нотатки:', error.message);
      alert(`Не вдалося видалити нотатку: ${error.message}`);
    },
  });

  if (notes.length === 0) {
    return <p className={css.empty}>Список нотаток порожній.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <div className={css.content}>
            <h3 className={css.title}>{note.title}</h3>
            <p className={css.text}>{note.content}</p>
            <span className={css.tag}>{note.tag}</span>
          </div>
          
          <div className={css.actions}>
            <Link href={`/notes/${note.id}`} className={css.detailsLink}>
              View details
            </Link>
            
            <button 
              onClick={() => removeNote(note.id)} 
              className={css.deleteBtn}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};