/**
 * TypeScript 5.6+ with `moduleResolution: "bundler"` needs an explicit
 * declaration for side-effect stylesheet imports (e.g. `import './globals.css'`).
 * Next's webpack pipeline handles the actual loading.
 */
declare module '*.css';
declare module '*.scss';

interface Window {
  gtag?: (...args: any[]) => void;
  dataLayer?: any[];
  fbq?: (...args: any[]) => void;
  _fbq?: any;
  lintrk?: (...args: any[]) => void;
  _linkedin_data_partner_ids?: any[];
}
