import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import './globals.css';

export default function RootLayout({ children, modal, }: { children: React.ReactNode;
  modal: React.ReactNode; }) {
  return (
    <html lang="uk">
      <body>
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