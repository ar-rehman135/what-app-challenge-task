import { ThemeProvider } from 'next-themes';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';

import '@/styles/globals.css';
import '@/styles/tailwind.css';
import StoreProvider from '@/store/store-provider';

const popins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'what.',
  description: 'what.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={popins.className}>
        <NextTopLoader
          color="linear-gradient(112.71deg, #CE3228 -43.98%, #e34949 14.19%, #e7d2d3 101.45%)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={2000}
          shadow="0 0 10px #CE3228,0 0 5px #CE3228"
        />
        <StoreProvider>
          <ThemeProvider attribute="class" enableSystem>
            <Toaster />
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
