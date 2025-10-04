import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Penny - Smart Budget Tracking',
  description: 'Take control of your finances with Penny. Track expenses, manage budgets, and achieve your financial goals.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
        <Toaster theme="dark" />
      </body>
    </html>
  );
}
