export type Country = {
  /** ISO 3166-1 alpha-2 code */
  iso: string;
  name: string;
  /** E.164 country calling code, including the leading + */
  dial: string;
};

/**
 * Ordered so the markets EGA recruits from most sit at the top of the list.
 * Note: several countries legitimately share a dial code (US/CA = +1,
 * RU/KZ = +7), so `iso` — not `dial` — is the unique key.
 */
export const COUNTRIES: Country[] = [
  { iso: 'SG', name: 'Singapore', dial: '+65' },
  { iso: 'MY', name: 'Malaysia', dial: '+60' },
  { iso: 'ID', name: 'Indonesia', dial: '+62' },
  { iso: 'IN', name: 'India', dial: '+91' },
  { iso: 'PH', name: 'Philippines', dial: '+63' },
  { iso: 'VN', name: 'Vietnam', dial: '+84' },
  { iso: 'TH', name: 'Thailand', dial: '+66' },
  { iso: 'CN', name: 'China', dial: '+86' },
  { iso: 'HK', name: 'Hong Kong', dial: '+852' },
  { iso: 'TW', name: 'Taiwan', dial: '+886' },
  { iso: 'MM', name: 'Myanmar', dial: '+95' },
  { iso: 'KH', name: 'Cambodia', dial: '+855' },
  { iso: 'LA', name: 'Laos', dial: '+856' },
  { iso: 'BN', name: 'Brunei', dial: '+673' },
  { iso: 'BD', name: 'Bangladesh', dial: '+880' },
  { iso: 'LK', name: 'Sri Lanka', dial: '+94' },
  { iso: 'PK', name: 'Pakistan', dial: '+92' },
  { iso: 'NP', name: 'Nepal', dial: '+977' },
  { iso: 'BT', name: 'Bhutan', dial: '+975' },
  { iso: 'MV', name: 'Maldives', dial: '+960' },
  { iso: 'JP', name: 'Japan', dial: '+81' },
  { iso: 'KR', name: 'South Korea', dial: '+82' },
  { iso: 'AU', name: 'Australia', dial: '+61' },
  { iso: 'NZ', name: 'New Zealand', dial: '+64' },
  { iso: 'GB', name: 'United Kingdom', dial: '+44' },
  { iso: 'IE', name: 'Ireland', dial: '+353' },
  { iso: 'US', name: 'United States', dial: '+1' },
  { iso: 'CA', name: 'Canada', dial: '+1' },
  { iso: 'AE', name: 'United Arab Emirates', dial: '+971' },
  { iso: 'SA', name: 'Saudi Arabia', dial: '+966' },
  { iso: 'QA', name: 'Qatar', dial: '+974' },
  { iso: 'KW', name: 'Kuwait', dial: '+965' },
  { iso: 'BH', name: 'Bahrain', dial: '+973' },
  { iso: 'OM', name: 'Oman', dial: '+968' },
  { iso: 'NG', name: 'Nigeria', dial: '+234' },
  { iso: 'GH', name: 'Ghana', dial: '+233' },
  { iso: 'KE', name: 'Kenya', dial: '+254' },
  { iso: 'ZA', name: 'South Africa', dial: '+27' },
  { iso: 'EG', name: 'Egypt', dial: '+20' },
  { iso: 'DE', name: 'Germany', dial: '+49' },
  { iso: 'FR', name: 'France', dial: '+33' },
  { iso: 'NL', name: 'Netherlands', dial: '+31' },
  { iso: 'IT', name: 'Italy', dial: '+39' },
  { iso: 'ES', name: 'Spain', dial: '+34' },
  { iso: 'CH', name: 'Switzerland', dial: '+41' },
  { iso: 'SE', name: 'Sweden', dial: '+46' },
  { iso: 'TR', name: 'Turkey', dial: '+90' },
  { iso: 'RU', name: 'Russia', dial: '+7' },
  { iso: 'KZ', name: 'Kazakhstan', dial: '+7' },
  { iso: 'UZ', name: 'Uzbekistan', dial: '+998' },
  { iso: 'BR', name: 'Brazil', dial: '+55' },
  { iso: 'MX', name: 'Mexico', dial: '+52' },
];

export const DEFAULT_COUNTRY: Country =
  COUNTRIES.find((c) => c.iso === 'SG') ?? COUNTRIES[0];

export function flagUrl(iso: string): string {
  return `https://flagcdn.com/w40/${iso.toLowerCase()}.png`;
}

export function filterCountries(query: string): Country[] {
  const q = query.trim().toLowerCase().replace(/^\+/, '');
  if (!q) return COUNTRIES;
  return COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.dial.replace('+', '').startsWith(q) ||
      c.iso.toLowerCase() === q,
  );
}
