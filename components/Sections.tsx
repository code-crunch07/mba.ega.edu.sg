import Image from 'next/image';
import {
  CREDENTIALS,
  HERO_SPECS,
  IMAGES,
  OUTCOMES,
  SITE,
  STAGES,
  STATS,
} from '@/lib/content';
import Reveal from './Reveal';
import LeadForm from './LeadForm';
import { CredGlyph, ModuleGlyph, Star, Tick } from './Icons';

/* ---------------------------------------------------------------- hero */

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <h1>
            Lead the whole business. Become a{' '}
            <em className="hl">Master of Business Administration.</em>
          </h1>
          <p className="lede">
            A full UK MBA, taught face-to-face in Singapore in <strong>twelve months</strong> at{' '}
            {SITE.academy}. Assessed entirely by coursework — <strong>no written examinations</strong>.
            Built for people who cannot stop working in order to study.
          </p>
          <ul className="spec">
            {HERO_SPECS.map((spec) => (
              <li key={spec.strong}>
                <Tick className="tick" />
                <span>
                  <b>{spec.strong}</b>
                  {spec.rest}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <LeadForm />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ why now */

export function WhyNow() {
  return (
    <section className="band-dark" id="why">
      <div className="wrap">
        <div className="why-grid">
          <Reveal className="sec-head">
            <p className="kicker">Why now</p>
            <h2 className="big">
              Singapore is not short of managers. It is short of people ready to{' '}
              <em className="hl">run the whole thing.</em>
            </h2>
            <p>
              AI is absorbing the analytical middle of most jobs. What it does not absorb is judgment
              under pressure, capital allocation, and the ability to take responsibility for an
              outcome. That is what employers are now paying for — and what they screen for on a CV.
            </p>
          </Reveal>

          <Reveal as="figure" className="fig fig-why">
            <Image
              src={IMAGES.executiveLeader}
              alt="Singapore business executive leader in a modern office"
              fill
              sizes="(max-width: 980px) 100vw, 480px"
            />
          </Reveal>
        </div>

        <Reveal className="stats">
          {STATS.map((stat) => (
            <div className="stat" key={stat.num}>
              <div className="num">{stat.num}</div>
              <p className="txt">{stat.text}</p>
              <p className="src">{stat.src}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- image band */

/* --------------------------------------------------------- curriculum */

export function Curriculum() {
  return (
    <section className="band-paper" id="curriculum">
      <div className="wrap">
        <Reveal className="sec-head sec-head-split">
          <div>
            <p className="kicker">Curriculum</p>
            <h2 className="big">
              Nine modules, three stages, <em className="hl">one live business problem.</em>
            </h2>
          </div>
          <p>
            The sequence moves from reading a business accurately, to leading one under pressure, to
            proving you can do both on a real organisation — often your own employer.
          </p>
        </Reveal>

        {STAGES.map((stage) => (
          <div key={stage.stage}>
            <Reveal className="stage-head">
              <span className="sn">{stage.stage}</span>
              <h3>{stage.title}</h3>
              <p>{stage.blurb}</p>
            </Reveal>

            <Reveal as="ul" className="mods">
              {stage.modules.map((module) => (
                <li key={module.n}>
                  <div className="mod-top">
                    <span className="mod-ico">
                      <ModuleGlyph name={module.icon} />
                    </span>
                    <span className="mod-n">{module.n}</span>
                  </div>
                  <h4>{module.title}</h4>
                  <p>{module.desc}</p>
                </li>
              ))}
            </Reveal>
          </div>
        ))}

        <Reveal className="assess">
          <Star />
          <p>
            <b>Assessed by coursework only.</b> Business reports, case analyses, presentations and
            the final project — there are no written examinations anywhere in this MBA. Quality
            assured by {SITE.university}. Full module descriptors and credit weightings are in the
            brochure.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- image band */

export function ImageBand() {
  return (
    <Reveal as="figure" className="fig fig-band">
      <Image
        src={IMAGES.workplace}
        alt="Glasgow Caledonian University students on Glasgow campus"
        fill
        sizes="100vw"
      />
    </Reveal>
  );
}

/* ----------------------------------------------------------- outcomes */

export function Outcomes() {
  return (
    <section id="outcomes">
      <div className="wrap">
        <Reveal className="sec-head sec-head-split">
          <div>
            <p className="kicker">Outcomes</p>
            <h2 className="big">
              Where graduates go, and <em className="hl">what those seats pay here.</em>
            </h2>
          </div>
          <p>
            Indicative Singapore market ranges for the roles this programme most commonly opens.
            Read them as a market picture, not a promise.
          </p>
        </Reveal>

        <Reveal className="tbl-wrap">
          <div className="tbl-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Role</th>
                  <th scope="col">What you own</th>
                  <th scope="col">Indicative monthly</th>
                </tr>
              </thead>
              <tbody>
                {OUTCOMES.map((row) => (
                  <tr key={row.role}>
                    <td>{row.role}</td>
                    <td>{row.owns}</td>
                    <td>{row.pay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal as="p" className="disclaimer">
          Ranges reflect published Singapore market benchmarks for mid-to-senior commercial roles and
          vary considerably by sector, company size and individual track record.{' '}
          <b>
            These are market indications only and are not a guarantee of employment, promotion or
            earnings.
          </b>{' '}
          Source: Robert Half Singapore Salary Guide 2026 and published Singapore recruitment
          benchmarks.
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- award */

export function Award() {
  return (
    <section className="band-paper" id="university">
      <div className="wrap">
        <Reveal className="sec-head sec-head-wide">
          <p className="kicker">The award</p>
          <h2 className="big nobr-desktop">
            Glasgow Caledonian University, <em className="hl">Scotland.</em>
          </h2>
        </Reveal>

        <div className="uni">
          <Reveal className="uni-intro">
            <figure className="fig fig-side" style={{ marginBottom: 26 }}>
              <Image
                src={IMAGES.glasgowCampus}
                alt="Glasgow Caledonian University campus"
                fill
                sizes="(max-width: 980px) 100vw, 540px"
              />
            </figure>
            <p>
              The largest modern university in Scotland, with campuses in Glasgow and London, and a
              founding purpose it still publishes as its mission: to be a{' '}
              <em>University for the Common Good</em>.
            </p>
            <div className="quote">
              <p>
                &ldquo;The certificate you graduate with is awarded by Glasgow Caledonian University
                and is identical to the one awarded to students in Glasgow.&rdquo;
              </p>
              <span>Admission decisions rest with the awarding university.</span>
            </div>
          </Reveal>

          <Reveal as="ul" className="creds">
            {CREDENTIALS.map((cred) => (
              <li key={cred.num}>
                <div className="cred-top">
                  <span className="cred-ico">
                    <CredGlyph name={cred.icon} />
                  </span>
                  <span className="cred-n">{cred.num}</span>
                </div>
                <b>{cred.title}</b>
                <p>{cred.desc}</p>
                <span className="src">{cred.src}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- closing CTA */

export function ClosingCta() {
  return (
    <section className="band-dark">
      <div className="wrap">
        <Reveal className="close-cta">
          <h2>
            Get the brochure. Decide with the <em className="hl">real numbers</em> in front of you.
          </h2>
          <p>
            Full module descriptors, the class schedule, entry routes, and the complete fee schedule
            including instalments — in one PDF, sent immediately.
          </p>
          <a className="btn btn-brass btn-lg" href="#brochure">
            Get the brochure &amp; fees
          </a>

          <div className="contact-row">
            <div>
              <div className="cl">Call</div>
              <a className="cv" href={SITE.phoneHref}>
                {SITE.phone}
              </a>
            </div>
            <div>
              <div className="cl">Email</div>
              <a className="cv" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </div>
            <div>
              <div className="cl">Hours</div>
              <div className="cv">{SITE.hours}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
