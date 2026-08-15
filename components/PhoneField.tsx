'use client';

import Image from 'next/image';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  COUNTRIES,
  DEFAULT_COUNTRY,
  filterCountries,
  flagUrl,
  type Country,
} from '@/lib/countries';
import { Chevron } from './Icons';

/**
 * Country calling code selector + national number input.
 *
 * Uses a button/listbox rather than a native <select> so each country can
 * show its flag — native option elements cannot render images. The selected
 * dial code and ISO code are mirrored into hidden inputs so a plain form
 * POST carries them.
 */
export default function PhoneField() {
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const listId = useId();
  const results = useMemo(() => filterCountries(query), [query]);

  // Close on outside click and on Escape.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  // Focus the search box when the menu opens.
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => searchRef.current?.focus(), 10);
      return () => window.clearTimeout(id);
    }
    setQuery('');
    return undefined;
  }, [open]);

  const choose = (next: Country) => {
    setCountry(next);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const optionButtons = () =>
    Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>('.cc-opt') ?? []);

  const onSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (results.length > 0) choose(results[0]);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      optionButtons()[0]?.focus();
    }
  };

  const onListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const items = optionButtons();
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === 'ArrowDown') {
      items[index + 1]?.focus();
    } else if (index <= 0) {
      searchRef.current?.focus();
    } else {
      items[index - 1]?.focus();
    }
  };

  return (
    <>
      <div className="phone">
        <div className="cc-wrap" ref={wrapRef}>
          <button
            type="button"
            className="cc"
            ref={buttonRef}
            onClick={() => setOpen((value) => !value)}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? listId : undefined}
            aria-label={`Country calling code, currently ${country.name} ${country.dial}`}
          >
            <Image
              className="flag"
              src={flagUrl(country.iso)}
              alt=""
              width={22}
              height={15}
              unoptimized
            />
            <span className="dial">{country.dial}</span>
            <Chevron className="chev" />
          </button>

          <div className={`cc-menu${open ? ' open' : ''}`}>
            <input
              type="text"
              className="cc-search"
              ref={searchRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onSearchKeyDown}
              placeholder="Search country or code"
              autoComplete="off"
              aria-label="Search country"
              tabIndex={open ? 0 : -1}
            />
            <ul
              className="cc-list"
              id={listId}
              ref={listRef}
              role="listbox"
              aria-label="Country calling codes"
              onKeyDown={onListKeyDown}
            >
              {results.length === 0 ? (
                <li className="cc-empty">No match</li>
              ) : (
                results.map((item) => (
                  <li key={item.iso}>
                    <button
                      type="button"
                      className="cc-opt"
                      role="option"
                      aria-selected={item.iso === country.iso}
                      tabIndex={open ? 0 : -1}
                      onClick={() => choose(item)}
                    >
                      <Image
                        className="flag"
                        src={flagUrl(item.iso)}
                        alt=""
                        width={22}
                        height={15}
                        unoptimized
                      />
                      <span className="nm">{item.name}</span>
                      <span className="dc">{item.dial}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        <input
          id="mobile"
          name="mobile"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="8123 4567"
          required
        />
      </div>

      <input type="hidden" name="dialCode" value={country.dial} />
      <input type="hidden" name="country" value={country.iso} />
    </>
  );
}

/** Exposed for tests / analytics that need the full list. */
export { COUNTRIES };
