// import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
// import { Header } from '@/components/Header/Header';
// import { Footer } from '@/components/Footer/Footer';
// import './globals.css';

// export default function RootLayout({ children, modal, }: { children: React.ReactNode;
//   modal: React.ReactNode; }) {
//   return (
//     <html lang="uk">
//       <body>
//         <TanStackProvider>
//           <Header />
//           <main>
//             {children}
//             {modal}
//           </main>
//           <Footer />
//         </TanStackProvider>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'NoteHub — Розумне керування вашими нотатками',
  description: 'NoteHub — це сучасний застосунок для організації ваших думок, робочих завдань та особистих заміток у зручному форматі.',
  openGraph: {
    title: 'NoteHub — Розумне керування вашими нотатками',
    description: 'Організовуйте свої ідеї та завдання швидко та ефективно за допомогою NoteHub.',
    url: 'https://notehub-yana.vercel.app', // Замініть на ваш реальний URL після деплою
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Прев’ю застосунку NoteHub',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="uk" className={roboto.variable}>
      <body className={roboto.className}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}