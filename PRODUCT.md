# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The site is an **information and documentation site**, not a conversion funnel. Its job is to explain the mission, show what the program has actually done, and state where it is going. No visitor is being pushed toward a decision right now.

Three real audiences read it, none of them being "converted":

- **Prospective and enrolled middle school families** (LCPS and FCPS, Loudoun and Fairfax County, Virginia) — students entering roughly 6th–9th grade and their parents/guardians. They read to understand what the program is, who runs it, and what happens over the summer.
- **Prospective TJHSST high school mentors** — the one live recruiting ask on the site (`/getinvolved`, mentor application form + intro video). This page is explicitly self-described as partially "under construction."
- **Schools, libraries, and community observers** — people checking that the program is real and credible before hosting, referring, or partnering.

## Product Purpose

Next In Research is a free summer mentorship program that pairs middle school students with TJHSST (Thomas Jefferson High School for Science and Technology) student mentors to conduct real research, build real projects, and publish the result.

The program runs **May – August 2026** in three phases:

1. **Phase 1 · Planning** (May–June) — orientation, onboarding assignments, project selection.
2. **Phase 2 · Building** (June–July) — weekly in-person workshops at Loudoun County libraries plus weekly 1-on-1 Zoom sessions.
3. **Phase 3 · Publishing** (August) — final polish and public release: competition submissions, blog posts, videos, or journal papers (NHSJS, JEI, IEEE named as targets).

Success for the *program* is a finished, shareable deliverable in every student's hands by the end of August. Success for the *website* is that a reader comes away understanding the mission, seeing evidence of the work done, and knowing what comes next.

## Positioning

Near-peer mentorship at a scale and price a formal program cannot match: mentors are current TJHSST students — close enough in age to be credible, credentialed enough to be useful (published papers, science fair placements, internships) — working with **1–3 students each**, for **free**, toward a **published** outcome rather than a certificate.

The specific combination a neighboring program could not truthfully copy: a 29-mentor TJHSST roster spanning 12 STEM specialties, hosted in public county libraries, producing publishable middle school research at zero cost.

## Operating Context

- **Program state (as of August 2026): mid-cohort, wrapping up.** Summer 2026 is running and finishing in August. The near-term job is documenting this cohort and publishing student work — not recruiting.
- **Hybrid delivery.** In-person workshops at Ashburn Library (Meeting Rooms A+B+C) and Brambleton Library (Meeting Room A); 1-on-1 mentorship over Zoom.
- **Nine-workshop summer curriculum**, Workshop 1 (June 17) through Workshop 9 (August 13), moving from the research process → hypothesis and methods → data analysis and statistics → scientific writing (incl. responsible AI usage) → poster finalization → presentation practice.
- **Google Classroom** carries optional enrichment assignments (coding courses, scientific method, brainstorming). Optional, not required; may influence advanced-mentor matching.
- **Google Forms and Google Calendar** are the operational backbone — student application, mentor application, mentor intake, and the shared program calendar all live in Google tools. The site links or embeds them rather than replacing them.
- **SignUpGenius** handles mentor workshop volunteer slots.
- **Communication is email-first.** Parents and guardians contact the two coordinators directly by email; private student/parent channels are shared individually after that contact rather than posted on the site.

## Capabilities and Constraints

**Live surfaces:** Our Initiative (`/`), Timeline, Team, Schedule, Workshops, Our Students, Get Involved, FAQ, Contact, Apply. Path aliases exist for `/home`, `/summerschedule`, `/team-and-mentors`.

**Stack:** React 18 + Vite 5 + Tailwind 3, Framer Motion, lucide-react. Single-file app (`src/App.jsx`, ~2,800 lines) with a hand-rolled path→page router; deployed on Vercel with SPA rewrites (`vercel.json`, `public/_redirects`). All content is hardcoded in-file — there is no CMS, backend, database, or auth.

**Terminology:** "Next In Research" is the program name (the repo and package name `SMP` / `mentorship-program` are legacy and not user-facing). Mentors are described by rising grade — Rising Senior / Junior / Sophomore. Program stages are "Phase 1/2/3," not "weeks" or "modules."

**Explicitly undecided / open:**

- Whether the student Apply page and the "Now Accepting Applications" hero badge should remain live now that the cohort is mid-flight and wrapping up. Not yet decided — do not silently remove or silently keep; raise it.
- The Our Students showcase is a single placeholder card ("Sample Student Project"). Real student work has not been published to the site yet. Future goals for the site include filling this in.
- `/getinvolved` is self-described as partially "under construction" beyond the mentor application form and video.
- Workshops 7–9 have TBD titles, times, or locations in the schedule data.

## Brand Commitments

- **Name:** Next In Research (the symposium flyer styles it "NextInResearch").
- **Theme color (user-pinned, Aug 2026):** the brand orange — the coral/flame family (`#EE6C4D` legacy coral; deep `#B93C15` for fields) is the primary theme color. Library green stays as a secondary register (the founder likes it), but orange leads. No warm-manila/yellowed paper grounds — clean paper neutrals instead.
- **Retired visual worlds:** the original navy/steel/coral dark SaaS theme (Fraunces + DM Sans), and the Aug 2026 redesign's manila-forward rendition. Current world is recorded in DESIGN.md.
- **Voice:** warm, plain, and non-gatekeeping. The FAQ answers a beginner's anxiety directly ("None at all! We do not prefer students with more experience. The goal is growth, not prior knowledge."). Never adopt selective, elite, or competitive framing — it contradicts the program's actual admissions posture.

## Evidence on Hand

**Real, usable:**

- 29 mentor profiles with real headshots (`public/images/NextInResearch/optimized/Mentor_Imgs/`) and first-person bios sourced from the mentor intake form.
- Source of those bios: `Mentor Website Information (Responses) - Form Responses 1.csv` in the repo root.
- 2 coordinator/cofounder profiles: Dev Srivastava and Deborah Torrico-Pardo, both TJHSST, with real emails.
- 5 completed workshop galleries with real photos, brochures, and slide PDFs (`public/images/NextInResearch/workshops/workshop-1` … `workshop-5`).
- ~24 program and mentor-achievement photos (`Misc_imgs/`, `SMP_*.jpg`, `Misc_*.jpg`).
- 19 real school affiliations in the marquee (LCPS, FCPS, TJHSST, and 16 named middle schools) — **these are where students and mentors come from, not sponsors or endorsers.**
- **The Symposium & Expo (official flyer, Aug 2026):** "NextInResearch Symposium & Expo" — August 22nd, 3–7 PM, 3625 Potomac Ave, Alexandria, VA 22305. Agenda: student set-up 3:00, guest arrival 3:30, welcome 3:45, expo 4:00–5:30, social time with partner booths (Invention Convention, VJAS) 6:30, closing ceremony and guest speakers 7:00. The flyer credits "Working with" Virginia Tech, Fairfax County Public Schools, and Loudoun County Public Schools. Assets: `public/images/NextInResearch/symposium/symposium-flyer.{pdf,jpg}`.
- Live external links: student application form, mentor application form, Google Classroom, mentor intake video, embedded program calendar, SignUpGenius volunteer sheet.

**Deliberately absent — never fabricate:**

- No testimonials, quotes, or endorsements from students, parents, or schools.
- No outcome statistics, cohort sizes, acceptance rates, publication counts, or success metrics.
- No sponsor or funder relationships. (The symposium flyer's "Working with" credits — Virginia Tech, FCPS, LCPS — are the one citable institutional collaboration, scoped to the symposium; do not inflate them into program-wide partnerships.)
- No published student projects yet.

## Product Principles

1. **Inform, don't sell.** The site's job right now is to explain the mission and show the work. Persuasion architecture — urgency, scarcity, social proof, conversion pressure — is off-brief until the program says otherwise.
2. **Free is the position, not a promotion.** "100% free" is permanent and structural. Never introduce pricing, tiers, paid add-ons, or a donation ask that could be misread as a fee.
3. **Only real proof.** Every claim traces to something that actually happened. No invented testimonials, metrics, partnerships, or endorsements — and school names are attendance facts, not sponsorships.
4. **No prerequisite gatekeeping.** Every surface must read as open to a beginner. Prior experience is explicitly not preferred.
5. **The evidence is the argument.** Real mentor faces, real workshop photos, real slide decks, real library rooms. Where proof doesn't exist yet, say "coming" rather than filling the space.

## Accessibility & Inclusion

No project-specific standard has been established. Note the real audience floor: primary readers include middle schoolers and parents on phones, so plain language, generous touch targets, and legible contrast on the dark theme are baseline expectations rather than enhancements.
