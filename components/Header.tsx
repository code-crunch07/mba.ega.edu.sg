'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IMAGES, NAV_LINKS, SITE } from '@/lib/content';

export default function Header() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 981px)');
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header className="site-head">
      <div className="wrap head-in">
        <a className="brand" href="#top">
          <Image
            src={IMAGES.egaLogo}
            alt={SITE.academy}
            width={180}
            height={44}
            className="ega-logo-img"
            priority
          />
          <span className="gcu-lock">
            <Image
              src={IMAGES.gcuLogo}
              alt={SITE.university}
              width={280}
              height={70}
              unoptimized
              priority
            />
          </span>
        </a>

        <nav className={`nav${open ? ' open' : ''}`} id="nav">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="btn btn-primary" href="#brochure" onClick={() => setOpen(false)}>
            Get the brochure
          </a>
        </nav>

        <div className="head-cta">
          <a className="btn btn-primary" href="#brochure">
            Get the brochure
          </a>
        </div>

        <button
          type="button"
          className={`burger${open ? ' on' : ''}`}
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
