import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { auth } from '../auth';
import AuthProvider from '../components/providers/AuthProvider';

export const metadata = {
  title: 'FIFA World Cup 2026™',
  description: 'The official portal for the FIFA World Cup 2026™ in Canada, Mexico, and USA.',
};

export default async function RootLayout({ children }) {
  const session = await auth();
  
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <AuthProvider>
          <Header session={session} />
          <main style={{ minHeight: 'calc(100vh - 48px - 52px)' }}>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
