// import css from './not-found.module.css';

// export default function NotFound() {
//   return (
//     <div className={css.wrapper}>
//       <h1 className={css.title}>404 - Page not found</h1>
//       <p className={css.description}>
//         Sorry, the page you are looking for does not exist.
//       </p>
//     </div>
//   );
// }
import type { Metadata } from 'next';
import css from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Сторінку не знайдено | NoteHub',
  description: 'На жаль, сторінка, яку ви шукаєте, не існує на NoteHub. Перевірте адресу або поверніться на головну.',
  alternates: {
    canonical: '/not-found',
  },
  openGraph: {
    title: '404 - Сторінку не знайдено | NoteHub',
    description: 'Ой! Здається, ви потрапили в порожнечу. Цієї сторінки більше не існує.',
    url: 'https://vercel.com/yanasobolevas-projects/07-routing-nextjs/404', // Рекомендую вказувати повний шлях
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Error 404',
      },
    ],
    type: 'website',
  },
};

export default function NotFound() {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}