'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal'; 
import css from './NoteDetails.client.module.css';

interface NoteDetailsClientProps {
  id: string; 
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, 
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      {isLoading && <div className={css.loader}>Завантаження...</div>}

      {isError && (
        <div className={css.error}>
          <p>Нотатку не знайдено</p>
        </div>
      )}

      {note && (
        <article className={css.container}>
          <header className={css.header}>
            <h1 className={css.title}>{note.title}</h1>
          </header>
          
          <div className={css.content}>
            <p className={css.text}>{note.content}</p>
          </div>

          {note.tag && (
            <footer className={css.footer}>
              <div className={css.tags}>
                <span className={css.tag}>#{note.tag}</span>
              </div>
            </footer>
          )}
        </article>
      )}
    </Modal>
  );
}