import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MBA in Singapore | Glasgow Caledonian University | Educare Global Academy',
  description:
    'A full UK Master of Business Administration, taught face-to-face in Singapore in twelve months at Educare Global Academy. 100% coursework, no examinations.',
  icons: {
    icon: '/favicon-ega.png',
    shortcut: '/favicon-ega.png',
    apple: '/favicon-ega.png',
  },
  openGraph: {
    title: 'Glasgow Caledonian University MBA — Singapore',
    description:
      'Twelve months. 100% coursework, no examinations. January, May and September intakes at Chinatown Point.',
    type: 'website',
    locale: 'en_SG',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#FBF9F5',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon-ega.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon-ega.png" />
        {/*
          Loaded over the network rather than via next/font/google so the
          project builds in environments without access to fonts.googleapis.com.
          To self-host instead, delete these three tags and add to this file:

            import { Noto_Serif } from 'next/font/google';
            const noto = Noto_Serif({ subsets: ['latin'], weight: ['400','500','600','700'], style: ['normal','italic'], display: 'swap' });

          then put `className={noto.className}` on <html> and set
          `--font` in globals.css to `var(--next-font, inherit)`.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/*
          `no-page-custom-font` targets the Pages Router, where a font added
          outside _document.js loads per-page. This is the App Router root
          layout, so the stylesheet is shared across every route already.
        */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
