import { Metadata } from 'next';
import CreateNoteClient from './CreateNote';

export const metadata: Metadata = {
  title: 'Створити нотатку | NoteHub',
  description: 'Створіть нову нотатку в NoteHub. Зберігайте свої ідеї, завдання та плани в одному місці.',
  openGraph: {
    title: 'Створити нову нотатку — NoteHub',
    description: 'Зручний редактор для ваших думок. Додавайте теги та структуруйте свої записи.',
    url: 'https://notehub-yana.vercel.app/notes/action/create',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Створення нотатки в NoteHub',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
};

export default function CreateNotePage() {
  return <CreateNoteClient />;
}