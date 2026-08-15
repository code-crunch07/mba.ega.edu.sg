/**
 * All page copy and data lives here so marketing can edit the landing page
 * without touching component code.
 */

export const SITE = {
  academy: 'Educare Global Academy',
  university: 'Glasgow Caledonian University',
  phone: '+65 8899 6180',
  phoneHref: 'tel:+6588996180',
  email: 'admissions@ega.edu.sg',
  hours: 'Mon–Fri, 9am–6pm',
  addresses: [
    'Chinatown Point, 133 New Bridge Road #25-10, Singapore 059413',
    'Mountbatten Block C, 231 Mountbatten Road, Singapore',
  ],
  cpe: 'CPE Registration No. 201505088M · Registration period 12 Nov 2024 – 11 Nov 2028 · EduTrust certified',
} as const;

export const IMAGES = {
  egaLogo: '/ega-logo.webp',
  gcuLogo:
    'https://mba.ega.edu.sg/wp-content/uploads/2025/11/GCU-Logo-with-strapline-svg-file_23404.svg',
  workplace: '/full-width.webp',
  glasgowCampus:
    'https://mba.ega.edu.sg/wp-content/uploads/2025/11/Quiet-Glasgow-campus_12487.webp',
  executiveLeader: '/125868.webp',
} as const;

export const NAV_LINKS = [
  { href: '#why', label: 'Why now' },
  { href: '#curriculum', label: 'Curriculum' },
  { href: '#outcomes', label: 'Outcomes' },
  { href: '#university', label: 'The award' },
] as const;

export const HERO_SPECS = [
  { strong: '12 months', rest: ' — full-time or part-time' },
  { strong: 'Three intakes', rest: ' — January, May, September' },
  { strong: '100% coursework', rest: ' — no examinations' },
  { strong: '9 modules', rest: ' including a live MBA project' },
  { strong: 'Chinatown Point', rest: ', Singapore — on campus' },
  { strong: 'Entry:', rest: ' a degree or senior management experience' },
] as const;

export const STATS = [
  {
    num: '60%+',
    text: 'of recruiters plan to maintain or increase hiring of business-school graduates — with the MBA holding the most positive outlook of any programme type.',
    src: 'GMAC Corporate Recruiters Survey, 2026',
  },
  {
    num: '1 in 3',
    text: 'of recruiters expect to replace entry-level roles with AI, pushing hiring value upward into judgment and leadership work.',
    src: 'GMAC Corporate Recruiters Survey, 2026',
  },
  {
    num: '65%',
    text: 'of professionals in Singapore believe switching employers offers greater earning potential. A credential widens what you can switch into.',
    src: 'Robert Half Singapore Salary Guide, 2026',
  },
  {
    num: '41%',
    text: 'of professionals in Singapore say their pay reflects the expertise and responsibility they already carry. The rest are carrying it unrecognised.',
    src: 'Robert Half Singapore Salary Guide, 2026',
  },
] as const;

export type ModuleIcon =
  | 'chart'
  | 'megaphone'
  | 'search'
  | 'target'
  | 'people'
  | 'shield'
  | 'bulb'
  | 'leaf'
  | 'medal';

export type Stage = {
  stage: string;
  title: string;
  blurb: string;
  modules: { n: string; icon: ModuleIcon; title: string; desc: string }[];
};

export const STAGES: Stage[] = [
  {
    stage: 'Stage one',
    title: 'Read the business',
    blurb:
      'The numbers, the market and the method — what is actually happening, before opinion is applied to it.',
    modules: [
      {
        n: '01',
        icon: 'chart',
        title: 'Financial and Business Data Analysis',
        desc: 'Read a set of accounts, model a decision and defend the numbers behind it.',
      },
      {
        n: '02',
        icon: 'megaphone',
        title: 'Marketing and Brand Management',
        desc: 'Positioning, demand generation and what a brand is actually worth on the balance sheet.',
      },
      {
        n: '03',
        icon: 'search',
        title: 'Methods for Business Research and Consultancy',
        desc: 'How to investigate a business problem properly, and produce evidence a board will act on.',
      },
    ],
  },
  {
    stage: 'Stage two',
    title: 'Lead it',
    blurb:
      'Direction, people and pressure — setting strategy and holding an organisation together when conditions turn.',
    modules: [
      {
        n: '04',
        icon: 'target',
        title: 'Strategic Management',
        desc: 'Where the business plays, where it wins, and what it must stop doing to get there.',
      },
      {
        n: '05',
        icon: 'people',
        title: 'Responsible Leadership in International Contexts',
        desc: 'Leading teams and negotiating across cultures, regulators and competing interests.',
      },
      {
        n: '06',
        icon: 'shield',
        title: 'Crisis and Operational Resilience',
        desc: 'Continuity planning, risk and the decisions that get made when the plan stops working.',
      },
    ],
  },
  {
    stage: 'Stage three',
    title: 'Prove it',
    blurb:
      'Sustainability, ethics and a consultancy-grade project applied to a real organisation.',
    modules: [
      {
        n: '07',
        icon: 'bulb',
        title: 'Social Innovation Solutions',
        desc: 'Building new models that create commercial and social value at the same time.',
      },
      {
        n: '08',
        icon: 'leaf',
        title: 'Corporate Social Responsibility for Sustainable Development',
        desc: 'Governance, ESG reporting and the standards your customers now audit you against.',
      },
      {
        n: '09',
        icon: 'medal',
        title: 'MBA Project',
        desc: 'A full consultancy project on a live organisation — very often the one you already work for.',
      },
    ],
  },
];

/**
 * ACTION FOR EGA: verify these five ranges against your own 2026 salary
 * source and swap in the exact figures before publishing.
 */
export const OUTCOMES = [
  {
    role: 'Operations Manager',
    owns: 'Delivery, cost, capacity and service levels across a function',
    pay: 'S$7–12k',
  },
  {
    role: 'Business Development Manager',
    owns: 'Pipeline, partnerships and new revenue lines',
    pay: 'S$8–14k',
  },
  {
    role: 'Marketing Manager / Head of Marketing',
    owns: 'Brand, demand generation and channel strategy',
    pay: 'S$8–15k',
  },
  {
    role: 'Finance / Commercial Manager',
    owns: 'Planning, margin analysis and investment cases',
    pay: 'S$9–16k',
  },
  {
    role: 'General Manager / Country Manager',
    owns: 'The whole P&L, the team and the market',
    pay: 'S$14–25k',
  },
] as const;

export type CredIcon = 'trophy' | 'bars' | 'briefcase' | 'trend';

export const CREDENTIALS: {
  icon: CredIcon;
  num: string;
  title: string;
  desc: string;
  src: string;
}[] = [
  {
    icon: 'trophy',
    num: '#1',
    title: 'Modern University of the Year',
    desc: "Named the UK's top modern university — the highest-ranked of the UK's 71 modern universities.",
    src: 'Daily Mail University Guide 2025',
  },
  {
    icon: 'bars',
    num: '40th',
    title: 'In the UK overall',
    desc: 'Ranked 40th among all UK universities in the same guide, ahead of a large part of the established sector.',
    src: 'Daily Mail University Guide 2025',
  },
  {
    icon: 'briefcase',
    num: '81.5%',
    title: 'Graduates in high-skilled jobs',
    desc: 'Joint 15th in the UK for the share of graduates entering high-skilled employment.',
    src: 'Daily Mail University Guide 2025',
  },
  {
    icon: 'trend',
    num: '9th',
    title: 'For “career on track”',
    desc: 'Ninth in the UK on graduates reporting their career is on track after study.',
    src: 'Daily Mail University Guide 2025',
  },
];

export const FORM_OPTIONS = {
  qualification: [
    "Bachelor's degree",
    'Professional qualification',
    'Diploma',
    'No degree — management experience',
    'Postgraduate degree',
  ],
  experience: [
    'Under 3 years',
    '3–5 years',
    '6–10 years',
    '11–15 years',
    'Over 15 years',
  ],
  mode: ["Part-time — I'm working full-time", 'Full-time', 'Not sure yet'],
} as const;
