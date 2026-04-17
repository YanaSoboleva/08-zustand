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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
              {note.createdAt && (
                  <p className={css.dateText}>
                     <strong>Created in:</strong> {formatDate(note.createdAt)}
                  </p>
               )}
          </header>
          <div className={css.content}>
            <p className={css.text}>{note.content}</p>
          </div>

          {(note.tag || note.createdAt) && (
            <footer className={css.footer}>
              <div className={css.tags}>
                {note.tag && <span className={css.tag}>#{note.tag}</span>}
              </div>
            </footer>
          )}
        </article>
      )}
    </Modal>
  );
}