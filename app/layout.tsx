import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mba.ega.edu.sg'),
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
    url: 'https://mba.ega.edu.sg',
    siteName: 'Educare Global Academy',
    locale: 'en_SG',
    type: 'website',
    images: [
      {
        url: '/125868.webp',
        width: 1200,
        height: 630,
        alt: 'Glasgow Caledonian University MBA Singapore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glasgow Caledonian University MBA — Singapore',
    description:
      'Twelve months. 100% coursework, no examinations. January, May and September intakes at Chinatown Point.',
    images: ['/125868.webp'],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* ----------------- Google Site Tag (gtag.js) ----------------- */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18043790314"
          strategy="afterInteractive"
        />
        <Script id="google-tag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18043790314');
          `}
        </Script>

        {/* ----------------- Meta Pixel Code ----------------- */}
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '217923235645137');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* ----------------- LinkedIn Insight Tag ----------------- */}
        <Script id="linkedin-insight-init" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "8962234";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);})(window.lintrk);
          `}
        </Script>

        {/* Meta Pixel Noscript */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=217923235645137&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* LinkedIn Noscript */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=8962234&fmt=gif"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
