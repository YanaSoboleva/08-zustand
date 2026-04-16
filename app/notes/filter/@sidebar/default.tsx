import Link from 'next/link';
import { NoteTag } from '@/lib/api';
import css from './SidebarNotes.module.css';

const TAGS: NoteTag[] = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

export default function SidebarNotes() {
  return (
    <nav className={css.sidebar}>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href="/notes/filter/all" className={css.menuLink}>All notes</Link>
        </li>
        {TAGS.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}