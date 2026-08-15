import type { ReactElement } from 'react';
import type { CredIcon, ModuleIcon } from '@/lib/content';

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function Tick({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2 8.6 6 12.5 14 3.5"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Chevron({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 8" fill="none" aria-hidden="true">
      <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
    </svg>
  );
}

export function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...strokeProps}>
      <path d="M12 2.8 14.6 8l5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 8.9 9.4 8z" />
    </svg>
  );
}

export function CheckCircle() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" style={{ margin: '0 auto' }} aria-hidden="true">
      <circle cx="23" cy="23" r="22" stroke="#9A6F28" strokeWidth={1.5} />
      <path
        d="M14 23.5 20.5 30 32 17.5"
        stroke="#9A6F28"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MODULE_PATHS: Record<ModuleIcon, ReactElement> = {
  chart: (
    <>
      <path d="M3 21h18" />
      <rect x="5" y="12" width="3.5" height="6" />
      <rect x="10.25" y="8" width="3.5" height="10" />
      <rect x="15.5" y="4" width="3.5" height="14" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 11v3a1 1 0 0 0 1 1h2.5L13 20V4L6.5 9H4a1 1 0 0 0-1 1z" />
      <path d="M17 9.5a4 4 0 0 1 0 5" />
      <path d="M19.8 7a8 8 0 0 1 0 10" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.4 15.4 21 21" />
      <path d="M8 10.5h5M10.5 8v5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.8 19.5a6.2 6.2 0 0 1 12.4 0" />
      <circle cx="17.5" cy="7" r="2.6" />
      <path d="M17 14.2a5.6 5.6 0 0 1 4.2 5.3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v6c0 4.4 3.1 8.2 7.5 9.3 4.4-1.1 7.5-4.9 7.5-9.3V6z" />
      <path d="m9.2 12.2 2 2 3.6-4" />
    </>
  ),
  bulb: (
    <>
      <path d="M12 3a5.5 5.5 0 0 0-3.2 10v2.2h6.4V13A5.5 5.5 0 0 0 12 3z" />
      <path d="M9.6 18.5h4.8M10.4 21h3.2" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4c0 8.5-4.3 12.8-9.5 12.8A4.9 4.9 0 0 1 5.6 12C5.6 7.2 11.4 4 20 4z" />
      <path d="M4.5 20c1-4.2 3.4-7.2 6.6-9.2" />
    </>
  ),
  medal: (
    <>
      <circle cx="12" cy="9" r="5.2" />
      <path d="M8.4 13.4 7 21l5-2.6L17 21l-1.4-7.6" />
    </>
  ),
};

export function ModuleGlyph({ name }: { name: ModuleIcon }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps}>
      {MODULE_PATHS[name]}
    </svg>
  );
}

const CRED_PATHS: Record<CredIcon, ReactElement> = {
  trophy: (
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0z" />
      <path d="M7 5.5H4.5V7a3.5 3.5 0 0 0 3 3.4M17 5.5h2.5V7a3.5 3.5 0 0 1-3 3.4" />
      <path d="M12 14v3M9 20h6M10 17h4l.6 3H9.4z" />
    </>
  ),
  bars: (
    <>
      <path d="M3 20h18" />
      <rect x="9.5" y="6" width="5" height="14" />
      <rect x="3.5" y="11" width="5" height="9" />
      <rect x="15.5" y="9" width="5" height="11" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="12.5" rx="2" />
      <path d="M8.5 7.5V5.6A1.6 1.6 0 0 1 10.1 4h3.8a1.6 1.6 0 0 1 1.6 1.6v1.9" />
      <path d="M3 12.5h18" />
    </>
  ),
  trend: (
    <>
      <path d="M3 17.5 9 11l4 4 8-8.5" />
      <path d="M15.5 6.5H21v5.5" />
    </>
  ),
};

export function CredGlyph({ name }: { name: CredIcon }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps}>
      {CRED_PATHS[name]}
    </svg>
  );
}
