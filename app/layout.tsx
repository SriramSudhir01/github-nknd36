import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "sonner";
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://bgremoval.in'),
  title: {
    default: 'BGRemoval.in - Free AI Background Remover | Remove Background from Images & Videos Instantly',
    template: '%s | BGRemoval.in'
  },
  description: 'Free online AI background remover. Remove backgrounds from images and videos instantly with our advanced AI technology. Perfect for product photos, portraits, videos, and design work. No signup required.',
  keywords: ['background remover', 'remove background', 'free background removal', 'AI background eraser', 'video background removal', 'transparent background maker', 'photo editor', 'image background remover', 'video background remover', 'online background removal', 'free photo editor', 'AI image tool', 'transparent image maker'],
  authors: [{ name: 'BGRemoval.in' }],
  creator: 'BGRemoval.in',
  publisher: 'BGRemoval.in',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'BGRemoval.in - Free AI Background Remover',
    description: 'Remove backgrounds from images and videos instantly with our advanced AI technology. No signup required.',
    url: 'https://bgremoval.in',
    siteName: 'BGRemoval.in',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BGRemoval.in - Free Background Removal Tool',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BGRemoval.in - Free AI Background Remover',
    description: 'Remove backgrounds from images and videos instantly with our advanced AI technology. No signup required.',
    images: ['/twitter-image.jpg'],
    creator: '@bgremoval',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://bgremoval.in',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: [
      { url: '/icons/icon-192x192.png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: '#3b82f6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="canonical" href="https://bgremoval.in" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID" crossOrigin="anonymous"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (adsbygoogle = window.adsbygoogle || []).push({});
              (adsbygoogle = window.adsbygoogle || []).push({});
              (adsbygoogle = window.adsbygoogle || []).push({});
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}