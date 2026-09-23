# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

As of September 2026 the site is the **public record of a finished, successful first cohort** — and the program's front door for publicity and for support of Cohort Two. It is no longer a planning or recruiting site. Its first job is to make a visitor believe, within seconds, that this happened, at scale, and that it was real research rather than tutoring.

Four real audiences read it:

- **Press and the publicity it brings** — readers arriving from Virginia Tech News, LinkedIn, and (coming) Fox and CBS coverage. They need the story, the numbers, and the photographs immediately.
- **Supporters for Cohort Two (Summer 2027)** — potential hosts, sponsors, judges, speakers, school-district and university contacts, and grant reviewers. They need proof of scale and credibility, then one clear way to reach the directors.
- **Families for 2027** — middle school families (grades 6–8) across Northern Virginia deciding whether this is worth their child's summer.
- **Future mentors** — TJHSST students who want to join the 2027 staff.

## Product Purpose

Next In Research is a free, student-run summer research mentorship program founded in 2026 by Dev Srivastava and Deborah Torrico-Pardo (TJHSST, Class of 2027). It pairs middle schoolers with TJHSST student mentors in groups of one to three to design and complete an original research project over a single summer.

**Mission:** The research experience we wish we'd had — free, for every middle schooler.

**Vision:** A self-sustaining cycle: mentees grow into mentors, and near-peer research mentorship becomes as normal as tutoring — in every district.

Cohort One ran **April – August 2026** in three phases — **Plan** (April 28 kickoff, mentor matching), **Build** (nine free workshops at the Ashburn and Brambleton public libraries, June 17 – August 13, plus weekly one-on-one mentoring), **Publish** (paper review, conference submissions, and the August 22 Symposium & Expo at Virginia Tech).

Success for the *website* is that a first-time visitor understands in one viewport what Next In Research did, believes it, and knows how to help Cohort Two happen.

## Positioning

Near-peer research mentorship at a scale and price no formal program matches: current TJHSST students — close enough in age to be credible, experienced enough to be useful — mentoring **1–3 middle schoolers each**, for **free**, toward a **finished, presented research project** rather than a certificate of attendance. The thing a vague "summer tutoring" program cannot claim: 99 middle schoolers, real research questions, papers reviewed by a Virginia Tech scientist, and a public symposium at Virginia Tech's Institute for Advanced Computing.

## Operating Context

- **Program state (September 2026): Cohort One is complete and documented.** Planning for Cohort Two (Summer 2027) is under way; support and funding are being sought. The founders plan to incorporate as a 501(c)(3) — the site never claims that status until it is real.
- **Communication is email-first.** The directors are reached at devsrivastava@nextinresearch.org and deborah.ctp@nextinresearch.org. Private student/parent channels are shared individually, never posted.
- **The site's one ask is email.** No donation link (the GoFundMe was removed by the founders), no mentor application form (the 2026 form was retired). Hosts, sponsors, judges, speakers, 2027 mentors, and 2027 families all email the directors.
- Google Classroom remains the enrolled students' enrichment space; it is linked, not replaced.

## Capabilities and Constraints

**Live surfaces:** Home (`/`), the Cohort One archive (`/cohort-one` with subpages Symposium & Gallery, Student Projects, Workshops, Schedule (2026), The Summer), Team, News, Get Involved (Back Cohort Two), FAQ, Contact. Legacy paths (`/workshops`, `/schedule`, `/summerschedule`, `/students`, `/timeline`, `/team-and-mentors`, `/apply`) redirect.

**Stack:** React 18 + Vite 5 + Tailwind 3, Framer Motion, lucide-react. Components live in `src/App.jsx` with a hand-rolled path→page router; Cohort One facts, press, and photo lists live in `src/data/cohortOne.js`. Deployed on Vercel with SPA rewrites (`vercel.json`, `public/_redirects`). All content is hardcoded — no CMS, backend, database, or auth.

**Terminology:** "Next In Research" is the program name (the symposium flyer and Virginia Tech style it "NextInResearch"). Program stages are Plan / Build / Publish. The founders are "program directors" (older copy says "coordinators"). Mentors are described by rising grade.

## Brand Commitments

- **Theme color (user-pinned, Aug 2026):** brand flame orange (`#B93C15`; legacy coral `#EE6C4D`) leads; library green is the secondary register; clean paper neutrals, never manila.
- **Voice:** confident, specific, and proud — the program is "tuff," unlike any vague summer tutoring program — but never selective, elite, or gatekeeping. Beginners are welcome; most of Cohort One had never done research before. Confidence comes from facts, not superlatives.
- **Retired visual worlds:** the navy/steel/coral dark SaaS theme; the manila-forward rendition. Current world is recorded in DESIGN.md.

## Evidence on Hand

**Verified public figures** (Virginia Tech News, Sept 11, 2026, unless noted):

- 99 middle schoolers (grades 6–8) matched with 29 TJHSST mentors; 105 applications (program records).
- Students from 21 schools.
- 9 free workshops at the Ashburn and Brambleton public libraries (June 17 – August 13, 2026).
- 11 student papers reviewed by Dr. V. Andreea Sistrunk (Virginia Tech Technical Education and Workforce Development); 2 projects submitted to the IEEE MIT Undergraduate Research Technology Conference.
- August 22, 2026 Symposium & Expo, hosted by the Virginia Tech Institute for Advanced Computing in the Boeing Auditorium, Academic Building One, Alexandria: 60 student presenters, 250+ attendees (people, not students), partner booths from Invention Virginia, the Virginia Junior Academy of Science, and Bridge2Success Virginia. Opening remarks by Dr. Jim Egenrieder (Director, Virginia Tech Thinkabit Lab).
- Certificates of Achievement for every presenting student and every mentor (no ranked awards were given).
- $0 cost to any family.

**Assets:** 107 curated symposium photographs (event photography by Nagaraju Kashayi for Virginia Tech, plus program phone photos) in `public/images/NextInResearch/symposium/`, including the team's own Top 10; nine workshop albums with slides; 29 mentor profiles with portraits; press: Virginia Tech News article and the Virginia Tech in the D.C. Area LinkedIn post.

**Deliberately absent — never fabricate:**

- Student names — anywhere. Photos show the work; captions name the research, not the researcher. (Founders, mentors, and faculty may be named.)
- Volunteer-hour totals and money raised (no verified totals exist).
- Award winners or rankings (none were given).
- "Partnership" with Virginia Tech, FCPS, or LCPS — say "hosted by the Virginia Tech Institute for Advanced Computing" until a partnership is confirmed in writing.
- 501(c)(3) or tax-deductibility claims.
- Testimonials or quotes from students or parents without consent.

## Product Principles

1. **Proof, loudly.** Lead with what actually happened — the photograph, the numbers, the press — at full volume. Every claim traces to Virginia Tech News or the program's own records.
2. **Free is the position, not a promotion.** "Free for every family" is permanent and structural. The support ask never reads as a fee.
3. **Protect the students.** Middle schoolers are shown, never named; nothing from applications, rosters, or release forms reaches the site.
4. **No prerequisite gatekeeping.** Confidence about outcomes, openness about entry: no experience required, none preferred.
5. **One ask, clearly made.** Every page leads to the same place: email the directors to back Cohort Two.

## Accessibility & Inclusion

Readers include middle schoolers and parents on phones, and press readers skimming fast: plain language, generous touch targets, legible contrast on flame and cloth fields, meaningful alt text on every photograph, and full keyboard access to navigation, galleries, and embeds.
