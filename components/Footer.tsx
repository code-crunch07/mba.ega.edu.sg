import { NAV_LINKS, SITE } from '@/lib/content';

const INSTITUTION_LINKS = [
  { href: '/about', label: 'About EGA' },
  { href: '/edutrust', label: 'EduTrust certification' },
  { href: '/fee-protection', label: 'Fee Protection Scheme' },
  { href: '/privacy', label: 'Privacy policy' },
  { href: '/student-contract', label: 'Student contract' },
];

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <b>{SITE.academy}</b>
            {SITE.addresses.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div>
            <h4>Programme</h4>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
              <li>
                <a href="#brochure">Get the brochure</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Institution</h4>
            <ul>
              {INSTITUTION_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>{SITE.hours}</li>
            </ul>
          </div>
        </div>

        <div className="legal">
          <p>
            © {new Date().getFullYear()} {SITE.academy} Pte Ltd. All rights reserved.
          </p>
          <p>{SITE.cpe}</p>
        </div>
      </div>
    </footer>
  );
}
