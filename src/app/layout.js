import NprogressProvider from '@/lib/NprogressProvider';
import TanstackProvider from '@/lib/TanstackProvider';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { Inter, Plus_Jakarta_Sans, Poppins } from 'next/font/google';
import './globals.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import NextAuthProvider from '@/lib/NextAuthProvider';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--plus-jakarta',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${plusJakarta.variable}`}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <NextAuthProvider>
          <MantineProvider theme={{ fontFamily: poppins.style.fontFamily }}>
            <TanstackProvider>
              <Notifications position="top-right" />
              <NprogressProvider>{children}</NprogressProvider>
            </TanstackProvider>
            {/* <section id="kiwimi-footer">
            <Footer />
            </section> */}
          </MantineProvider>
        </NextAuthProvider>
      </body>
      <GoogleAnalytics gaId="G-YCJ7D8GCBE" />
      <GoogleTagManager id="AW-10820733422" />
    </html>
  );
}
