---
name: Next In Research — The Library Record
description: Public-library ephemera system, now running a front page. Flame announcement fields, library-green chrome, clean paper objects, straight keylined press photographs, rubber-stamp ink, typed catalog data.
colors:
  flame: "#B93C15"
  flame-deep: "#9E3211"
  flame-bright: "#EE6C4D"
  cloth: "#1D4A40"
  cloth-deep: "#14352E"
  stamp: "#BE3A27"
  stamp-blue: "#2F5A77"
  paper: "#F3F1EC"
  paper-bright: "#FDFCFA"
  paper-shade: "#E1DED6"
  ink: "#20313B"
  ink-soft: "#51616B"
  print-white: "#FFFFFF"
typography:
  scale:
    label-2xs: "0.625rem"
    label-xs: "0.6875rem"
    label-sm: "0.75rem"
    data-sm: "0.8125rem"
    data: "0.875rem"
    data-lg: "0.9375rem"
    body: "1rem"
    lead: "1.125rem"
    deck: "1.25rem"
    title: "1.5rem"
    headline-sm: "1.875rem"
    statement-sm: "2rem"
    headline-md: "2.25rem"
    display-sm: "2.3rem"
    numeral: "2.4rem"
    statement-md: "2.6rem"
    headline-lg: "3rem"
    display-md: "3.1rem"
    headline-xl: "3.75rem"
    close: "4.5rem"
  display:
    fontFamily: '"Bricolage Grotesque", Georgia, serif'
    fontSize: "2.3rem / 3.1rem (sm) / 5cqi of the front-page column (lg)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  headline:
    fontFamily: '"Bricolage Grotesque", Georgia, serif'
    fontSize: "1.875rem / 3rem (sm)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  title:
    fontFamily: '"Bricolage Grotesque", Georgia, serif'
    fontSize: "1.25rem–1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  numeral:
    fontFamily: '"Bricolage Grotesque", Georgia, serif'
    fontSize: "2.4rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
    fontFeature: '"tnum"'
  body:
    fontFamily: '"Public Sans", system-ui, sans-serif'
    fontSize: "1rem (1.125rem leads; deck 1.125–1.25rem, 2.36cqi at lg)"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: '"Courier Prime", Courier, monospace'
    fontSize: "0.625rem–0.8125rem"
    fontWeight: 700
    letterSpacing: "0.12em–0.22em"
  data:
    fontFamily: '"Courier Prime", Courier, monospace'
    fontSize: "0.6875rem–0.9375rem"
    fontWeight: 400
    lineHeight: 1.375
rounded:
  none: "0px"
  hole: "9999px"
spacing:
  gutter: "20px"
  gutter-sm: "32px"
  gap: "24px"
  card: "20px"
  card-lg: "28px"
  section: "80px"
  section-lg: "112px"
  nav: "64px"
components:
  button-light:
    backgroundColor: "{colors.paper-bright}"
    textColor: "{colors.flame}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  button-light-hover:
    backgroundColor: "{colors.print-white}"
  button-outline-light:
    textColor: "{colors.paper-bright}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  button-flame:
    backgroundColor: "{colors.flame}"
    textColor: "{colors.paper-bright}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  button-flame-hover:
    backgroundColor: "{colors.flame-deep}"
  button-outline-ink:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-square-light:
    textColor: "{colors.paper-bright}"
    rounded: "{rounded.none}"
    size: "44px"
  button-square-light-hover:
    backgroundColor: "{colors.paper-bright}"
    textColor: "{colors.cloth-deep}"
  chip-filter:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  chip-filter-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-bright}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  subnav-tab:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 12px"
  subnav-tab-active:
    textColor: "{colors.ink}"
  archive-menu:
    backgroundColor: "{colors.cloth-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    width: "256px"
  archive-menu-item-hover:
    backgroundColor: "{colors.cloth}"
    textColor: "{colors.paper-bright}"
  catalog-card:
    backgroundColor: "{colors.paper-bright}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  numbers-box:
    backgroundColor: "{colors.paper-bright}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px 24px 44px 48px"
  gallery-thumb:
    backgroundColor: "{colors.print-white}"
    rounded: "{rounded.none}"
    padding: "4px"
  lightbox:
    backgroundColor: "{colors.cloth-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
---

# Design System: Next In Research — The Library Record

## Overview

**Creative North Star: "The Library Record"**

The site is a public library's own record of a finished summer, and since September 2026 that record opens as a front page. Flame-orange fields (user-pinned, Aug 2026) open and close it like a broadsheet pasted to the library door. Buckram-cloth green is the institution's furniture: the nav bar and its archive menu, the vision band, the photo viewer, and the footer. Between the two, clean paper neutrals carry the evidence as physical objects: catalog cards, a circulation sheet, an accession ledger, a hold slip, and, new with the Front Page, straight press photographs with white keylines and typed cutlines. Evidence is the aesthetic. A date is stamped, a mentor is filed under a call number, a photograph carries its credit. The world still refuses both the dark SaaS gradient hero and the sterile white nonprofit template (world contract seed 1ec49fef), and the home contract (seed afe8fa7a, first comment in `<body>` of `index.html`) adds a third refusal: the stat-tile SaaS hero.

The mood is civic, proud, and matter-of-fact: a well-run county institution reporting what happened. Density is generous but orderly. A flame band announces, paper bands present the evidence, cloth does the bookkeeping. Two photographic registers coexist: *press photographs* (the home page and every gallery) sit straight in thin white keylines, like prints on a newspaper page, while *archival prints* on the archive's interior pages still rest slightly tilted as if just set down. Typography splits into three voices: poster capitals for announcements, plain civic sans for talking to families, and typewriter mono for anything a librarian would type, stamp, or caption.

**Key Characteristics:**
- Two colored registers over one paper ground: flame announces (front page, close, primary buttons, headline numerals), cloth administers (nav, archive menu, vision band, photo viewer, footer). Never a plain white page.
- Clean paper neutrals (#F3F1EC family) as the card stock; the warm manila rendition is retired.
- Ephemera as components: catalog cards, the By-the-numbers card, the circulation sheet, the accession ledger, the hold slip, rod holes, and press photographs with Courier cutlines.
- Two stamp inks carry all status: red for what happened, blue for what is pending.
- Strictly rectilinear edges; the only circles are drilled holes and dots.
- One authored motion: things arrive the way a rubber stamp lands.
- A single light world with no dark mode; the cloth greens are the dark register.

## Colors

An institutional materials palette with a brand voice on top: one announcement family (flame), one institutional family (cloth), one clean card stock (paper), one reading ink, and two stamp inks for status.

### Primary
- **Brand Flame** (`flame`): the theme color, deep enough for near-white text (AA). Ground of the front-page and closing fields; fill of the primary action on paper ("Back Cohort Two", "See the symposium", "Email the program directors"); the ink of headline numerals in the By-the-numbers card and of the pull quote in the lead press story; the base of the text-selection ink.
- **Deep Flame** (`flame-deep`): flame's pressed state (the hover of every flame button) and the 8px seam where the front page hands off to paper.
- **Bright Flame** (`flame-bright`): the legacy coral, the scarcest color. Observed only as the 6px current-page dot in the desktop Cohort One menu on cloth-deep. Small punctuation on cloth; never text, never on paper.

### Secondary
- **Buckram Cloth** (`cloth`): ground of the home vision band and the app's root backdrop; the hover fill of archive-menu rows.
- **Deep Cloth** (`cloth-deep`): the darkest register. Fixed navigation bar, the Cohort One dropdown panel, the full-screen photo viewer, the footer, and the browser `theme-color`.

### Tertiary
- **Rubber-Stamp Red** (`stamp`): the louder stamp ink. Marks what has *happened* (HELD stamps, stamped dates) plus call numbers, text links, the active tab underline in both the primary nav and the archive subnav, ledger and circulation values, phase lines, list dots on paper, and the default focus outline. It is a stamp ink, not a danger color.
- **Stamp Blue** (`stamp-blue`): the quieter ink. Marks what is *pending*: DUE stamps, "HOLD FOR: COHORT TWO · SUMMER 2027", "in processing" notes, grade lines on catalog cards, topic tags, handout links. It also draws the faint rules of the `.ruled` ledger sheet.

### Neutral
- **Clean Paper** (`paper`): the content-band field (`PageShell`, every paper band on home), the mobile menu sheet, the `html`/`body` background, and secondary text on cloth at /70–/90 opacity.
- **Paper Bright** (`paper-bright`): the surface of every ephemera object (cards, sheets, slips, tables, the numbers box) and high-emphasis text on flame and cloth (secondary text on flame at /90–/95).
- **Paper Shade** (`paper-shade`): the 1px border around every paper object and embed.
- **Catalog Ink** (`ink`): blue-black reading ink for all body text and headings on paper, the selected-chip fill, the 2px rule under the numbers-box heading, and (at rgba opacities) every hairline, dot leader, and shadow tint.
- **Soft Ink** (`ink-soft`): secondary text: leads, cutlines and captions on paper, bylines, table headers, inactive subnav tabs.
- **Print White** (`print-white`): reserved for photographic keylines and mounts, the photo viewer's 4px frame, and third-party iframe grounds. Never a page or card background.

### Named Rules
**The Two Registers Rule.** Flame announces, cloth administers. Flame fields open and close the home page and fill the primary action on paper; cloth is the institution's furniture: nav, archive menu, vision band, photo viewer, footer. Paper bands carry the evidence between them. Neither register grounds a whole interior page; those are paper.

**The Two Inks Rule.** Status is always a stamp, and the ink states the tense: red for what happened (HELD, a stamped date), blue for what is pending (DUE, HOLD FOR, in processing). No green, amber, or gray status pills exist in this world.

**The Card, Not Page Rule.** Paper-bright surfaces are always bounded objects (bordered in paper-shade, ink-shadowed, often rod-holed) sitting on a paper, cloth, or flame field. There is no edge-to-edge white or off-white page.

**Interaction ink.** Text selection is flame at 85% (`rgba(185,60,21,0.85)`) with paper-bright text. `:focus-visible` is a 2px stamp-red outline offset 2px, swapping to paper-bright inside `.bg-flame`, `.bg-flame-deep`, `.bg-cloth`, and `.bg-cloth-deep` fields (`src/index.css`).

## Typography

**Display Font:** Bricolage Grotesque (with Georgia, serif)
**Body Font:** Public Sans (with system-ui, sans-serif)
**Label/Mono Font:** Courier Prime (with Courier, monospace)

The complete size ramp is enumerated in the frontmatter as `typography.scale` (20 fixed steps, 10px Courier labels through the 4.5rem closing banner); every literal size in the build is one of those steps. The front-page banner and deck are the two deliberate exceptions: at `lg:` they are sized in `cqi` against their column (see Display and Deck).

**Character:** Poster capitals over civic plainness over typewriter fact. Bricolage announces, Public Sans explains, Courier Prime records. All three load from Google Fonts (`index.html`); headings always track tight.

### Hierarchy
- **Display** (800, 2.3rem → 3.1rem sm → `5cqi` lg, line-height 1.02 → 0.98 at lg, balanced wrap): the front-page banner h1 only, set across the full 12-column measure in paper-bright on flame. At `lg:` it is sized to its column, not the window (the header is an inline-size container), so it always sets in exactly two lines filling ~96–98% of the measure at every desktop width (≈48px at a 960px column, ≈61px at the 1216px max) — the banner never leaves a ragged right. The closing "Back Cohort Two." uses the same weight at 3rem → 4.5rem sm.
- **Headline** (700, 1.875rem → 3rem sm, line-height 1.04; page titles 2.25rem → 3.75rem sm at 1.02): section and page openers. Headings begin sections directly; nothing floats above them.
- **Title** (700, 1.25–1.5rem, tight): card, slip, and press-brief headings; lead press headlines step up to 1.875rem → 2.25rem.
- **Numeral** (Bricolage 800, 2.4rem, leading 1, tabular, flame): the figures in the By-the-numbers card, each in a fixed 5.75rem (6.5rem sm) column beside its Courier label.
- **Body** (400, 1rem; leads 1.125rem, line-height 1.625): Public Sans for all narrative prose; columns cap near `max-w-xl`–`max-w-4xl`. Semibold (600) is the button and link weight.
- **Deck** (Public Sans 400, 1.125rem → 1.25rem sm → `2.36cqi` lg, leading-snug at lg): the front-page mission paragraph under the banner, at paper-bright/95. At `lg:` it is column-sized like the banner and sets as one full-measure line (~97%), so dateline, banner, and deck read as one justified block.
- **Label** (Courier Prime 700, 10–13px, uppercase, tracking 0.12em–0.22em): the printed parts of objects and chrome. The dateline strip, "By the numbers · Cohort One", "Circulation record · Cohort One, 2026", "Accession ledger · Cohort One", "HOLD FOR:", table headers, filter chips, subnav tabs, footer column heads.
- **Data** (Courier Prime 400, 11–15px): typed facts: call numbers, dates, times, addresses, bylines, cutlines, photo credits, numbers-box labels, mentor names and bios. Ledger and circulation totals are the bold step-up at 20px in stamp red.

### Named Rules
**The Typed Data Rule.** Courier Prime is reserved for what a librarian or a news desk would type: identifiers, dates, bylines, cutlines, credits, statuses, labels, and the contents of catalog cards. It never sets narrative prose paragraphs or display headings.

**The Run-In Rule.** The program's two standing statements are set as run-ins, never as labels: "Our mission:" in bold paper-bright leading the front-page deck, and "Our vision:" in Bricolage 800 opening the cloth band's h2 (the rest of that heading in 600). The lead-in belongs to the sentence it starts.

**The No Floating Label Rule.** Small mono labels exist only as printed parts of objects (a card's header, a sheet's caption, a slip's hold line) or as the front page's dateline strip, which spans the full measure between two paper-bright/40 rules and carries only typed facts (cohort, date, place, "Free for every family"). No eyebrow or kicker label floats above a section heading.

## Layout

A single-column sequence of full-width material bands. The home page runs flame (front page) → paper (In the news) → paper (What Cohort One did) → paper (the Top 10 spread) → cloth (vision) → flame (close) → cloth-deep footer. Interior pages are one long paper band (`PageShell`, `pt-24 pb-24`) with a `PageTitle` header 56px above content; every Cohort One archive page opens with the `CohortSubnav` strip before its title. Where the front page hands off to paper the seam is an 8px rule in the field's deep tone (`border-t-8 border-flame-deep`); consecutive paper bands are separated by an `ink/10` hairline; the paper → cloth → flame transitions at the foot of home abut without a seam.

- **Containers:** content sits in `max-w-6xl`; the front page, the photo spread, nav, and footer widen to `max-w-7xl`. Gutters are 20px (`px-5`), 32px from `sm:` up.
- **Vertical rhythm:** bands run 80px padding (`py-20`), 96–112px at `lg:` (`py-24`/`py-28`). The front page clears the fixed nav with 84px top (92px at `lg:`) and 64–80px bottom.
- **The front page grid:** a 12-column grid at `lg:` (32px column gap). The header (h1 plus deck) spans 12; the press photograph spans 8; the By-the-numbers card spans 4 and aligns to its top. Below `lg` everything stacks and the photograph is ordered first (`order-first`), bleeding to the viewport edge on phones.
- **Other grids:** object grids are `gap-6` (24px), 1 → 2 → 3 columns. Feature splits are deliberately asymmetric: `1.4fr/0.6fr` (lead story + brief), `1.3fr/0.7fr` (vision + thanks), `1.15fr/0.85fr` (news), `1.1fr/0.9fr` (symposium order + print), `0.95fr/1.05fr` (ledger + shelves). The circulation sheet is three equal phase columns at `lg:`, hairline-divided.
- **The photo spread:** the team's Top 10 #1 is the front-page photograph, so the home spread carries #2–#10 (led by #4, the opening on the stairs) in a 12-column grid with fixed 15.5rem rows (`lg:auto-rows-[15.5rem]`); the lead photo spans 8×2, the portrait (#7) spans 4×2, the rest 4×1, and the last cell is an 8-column paper "Open the gallery" card. Below `lg` it is two columns with the lead and the gallery card spanning both and photos cropped 4:3. Captions clamp to three lines at `lg:`.
- **Galleries:** the symposium gallery and "At the posters" are CSS-column masonry (`columns-2` → `sm:3` → `lg:4`, 16px gap, `break-inside-avoid`), each thumbnail sized from its photo's own aspect ratio so nothing jumps while loading.
- **Navigation:** fixed 64px (`h-16`) cloth-deep bar; below `lg` it collapses to a full-screen paper sheet. Page changes jump to top instantly; in-page scrolling is smooth with a reduced-motion fallback.
- **Routing:** every page has a real path. Top level: `/`, `/cohort-one`, `/team`, `/news`, `/getinvolved`, `/faq`, `/contact`; the archive lives at `/cohort-one` plus `/symposium`, `/projects`, `/workshops`, `/schedule`, `/summer` beneath it. Legacy paths (`/workshops`, `/schedule`, `/summerschedule`, `/students`, `/symposium`, `/timeline`, `/team-and-mentors`, `/apply`, `/press`, `/home`) resolve to their new page and are rewritten to the canonical URL with `history.replaceState`.
- **Responsive:** `min-width: 320px` on body; the schedule table becomes stacked cards below `md`; the dateline strip drops to one item on phones, two at `md`, three at `lg`; the archive subnav scrolls sideways on phones and scrolls its current tab into view.
- **Overflow discipline:** `html, body { overflow-x: clip }` stays load-bearing: tilted prints and slips and pre-animation stamps (which enter at scale 1.45) would otherwise widen the page.
- **Utility cascade note:** `.grain`, `.ruled`, and `.red-rule` live in `@layer components` (`src/index.css`), so Tailwind utilities on the same element still win the cascade.

## Elevation & Depth

Depth is paper physics: objects rest *on* fields, so shadows lift a sheet off a desk, never glow. Every shadow is tinted with catalog ink, rgba(32,49,59,…), or with deep cloth in the chrome; there is no pure black and no colored glow. Texture does the rest: the `.grain` overlay (a 5%-opacity SVG fractal-noise tile) sits on flame, cloth, and paper fields alike; `.ruled` draws 28px-spaced stamp-blue ledger lines (rgba(47,90,119,0.22)); `.red-rule` draws a catalog card's vertical red margin line at 2.25rem (rgba(190,58,39,0.5), 1.5px).

### Shadow Vocabulary
- **card** (`0 1px 1px rgba(32,49,59,0.12), 0 4px 10px rgba(32,49,59,0.14)`): the resting shadow of catalog cards, press cards, tables, albums, and every gallery thumbnail.
- **print** (`0 1px 2px rgba(32,49,59,0.18), 0 6px 16px rgba(32,49,59,0.22)`): archival prints, portrait mounts inside cards, and the hover state of every clickable photograph.
- **print-lg** (`0 2px 4px rgba(32,49,59,0.16), 0 14px 34px rgba(32,49,59,0.28)`): a band's single hero object (the front-page photograph's keyline mount from `sm:`, the By-the-numbers card, the circulation sheet, the hold slip, the accession ledger, the symposium order card, the schedule finale) and the hover state of press and contact cards; also under the photo in the viewer.
- **nav-scrolled** (`0 2px 12px rgba(20,53,46,0.45)`): under the fixed bar only after 12px of scroll.
- **menu-drop** (`0 10px 28px rgba(20,53,46,0.5)`): under the desktop Cohort One dropdown.
- **hole-punch** (`inset 0 1px 2px rgba(32,49,59,0.3)`): the drilled depth inside every rod hole.

### Named Rules
**The Ink-Shadow Rule.** Shadows are diffuse, downward, and ink-tinted. Elevation is reserved: `card` at rest, `print` for photographs, `print-lg` only for a band's single hero object. Hover may step one level (`card` → `print` on photographs, `card` → `print-lg` on press and contact cards) but never invents a new shadow.

## Shapes

Rectilinear, guillotine-cut paper. No element carries a border radius: cards, slips, buttons, chips, tabs, menus, iframes, and photos are all square-cornered. The only circles in the build are drilled or punched: the 16px catalog rod hole and the 6px dot markers (stamp red on paper, flame-bright in the cloth-deep archive menu).

Form language beyond the rectangle comes from three devices:
- **The keyline.** Press photographs sit straight inside a white border: 8px on the front-page photograph (from `sm:`), 4px on gallery thumbnails and the Top 10 spread, 4px around the photo in the viewer. Press-card images sit in the card's own paper margin (12px).
- **The tilt.** Standalone archival prints (`PhotoPrint`, on The Summer and Symposium pages) and the home hold slip rest at −1.4° to +1.6° via a `--tilt` custom property and straighten to 0° on hover. Portraits mounted inside cards, and all press photographs, sit square.
- **The double ring** of the rubber stamp: a 2px outer border, 3px gap, and 1px inner border in the same ink.

**The Guillotine Rule.** Corners are square because paper is cut, not molded. The only permitted circles are holes and dots. Rounding anything else breaks the material.

**The Press-Print Rule.** A photograph that reports (home, galleries, the viewer) is straight and keylined in white; a photograph that is kept (the archive's standalone prints) may tilt. Never tilt a press photograph, and never frame one with anything but white.

## Components

### Buttons
- **Shape:** square-cornered (0px radius); Public Sans semibold (600); `inline-flex` with a 16px lucide arrow, mail, or external icon at an 8px gap.
- **Light (on flame):** paper-bright fill, flame text, 14px × 24px padding, `card` shadow; hovers to pure white. Full width on phones.
- **Outline light (on flame):** transparent with a 1px `paper-bright/50` border; the border brightens to paper-bright on hover.
- **Flame (the primary action on paper):** flame fill, paper-bright text, 12–14px × 20–24px; hovers to flame-deep. In the By-the-numbers card it runs full width ("Back Cohort Two").
- **Outline ink (secondary on paper):** transparent with a 1px `ink/30` border, ink text; the border darkens to ink on hover ("See Cohort One", the flyer PDF).
- **Square icon buttons:** 40px (album, `ink/30` border, fills ink on hover) or 44px (viewer, `paper/40` border on cloth-deep, fills paper-bright with cloth-deep icon on hover), 20px chevron or X.
- **Text links:** semibold stamp-red with trailing arrow, hover to ink. Mono metadata links (12px uppercase, 0.12–0.14em) in stamp or stamp-blue, hover to ink.
- **Hover grammar:** color, background, and border transitions only (150ms default); buttons never lift, scale, or cast new shadows.

### Chips (filters)
- **Style:** Courier Prime 700, 12px, uppercase, tracking 0.12em; 1px `ink/30` border, transparent fill, 8px × 16px padding; grouped with `role="group"` and an aria-label.
- **State:** hover darkens the border to ink; selected (`aria-pressed`) fills ink with paper-bright text.
- **Counts:** on the symposium gallery each chip carries its photo count after the label in regular weight, tabular figures ("The expo floor 70").

### Cards / Containers (the ephemera family)
- **Catalog Card** (`CatalogCard`): paper-bright, 1px paper-shade border, `card` shadow, no tilt. A full-width white portrait mount (`p-1.5 pb-2`, `print`) crops the photo 4:5 with a per-mentor `object-position`. Below it, a text block carrying its own `.red-rule` (48px indent): stamp-red call number, bold uppercase mono name (15px, 0.06em), focus line in soft ink, stamp-blue grade line. "Read card" toggles the bio under a hairline (240ms reveal). A rod hole is punched bottom-center.
- **Director Card:** a `200px/1fr` grid pairing the 4:5 portrait mount with a red-ruled text block (call number, name, role, mono email link). On Contact the whole card is a mailto link that lifts `card` → `print-lg` on hover.
- **By the numbers** (front page): the sidebar box built as a catalog card. `.red-rule`, 1px paper-shade border, `print-lg`, padding 20px top, 48px left, 44px bottom. Its h2 is a Courier 13px uppercase label over a 2px ink rule; six rows pair a flame Bricolage numeral with a Courier 13px label, divided by `ink/10` hairlines; a full-width Flame button and a full-width Outline-ink button sit at its foot, then the rod hole.
- **Circulation Record sheet** (home, "What Cohort One did"): one paper-bright sheet at `print-lg` with a Courier 11px caption strip ruled off the top, three phase columns (Bricolage 36px title, stamp-red Courier phase line, body, dot-leader ledger rows, stamp-red text link at the foot), and a rod hole.
- **Accession Ledger** (Cohort One overview): a `.ruled` paper-bright sheet whose rows are real links: mono 14–15px label, a dotted `ink/35` dot leader, a bold 20px stamp-red total. Linked rows tint `bg-paper` on hover. The dot-leader row is shared with the circulation sheet.
- **Hold Slip** (home close): paper-bright, tilted −1° with hover-straighten, `print-lg`; a stamp-blue Courier "HOLD FOR: COHORT TWO · SUMMER 2027" line over hairline rows (Bricolage title in an 8.5rem column, body beside it); rod hole.
- **Press Story / Press Line** (`PressStory`, `PressLine`): a story is a paper-bright card, 1px paper-shade border, `card` → `print-lg` on hover, its 16:9 image in a 12px paper margin. The headline comes first (Bricolage bold; 1.875rem → 2.25rem when large), then a Courier 13px byline in soft ink ("outlet · date"). It may carry a flame Bricolage 600 pull quote, with a Courier 12px attribution when the words are someone else's (`quoteBy`). The whole card is one link via a stretched `::after`; a stamp-red "Read it on …" line with an external icon closes it. A press line is the compact form for "More coverage": a Bricolage 18px headline that turns stamp red on hover, over a Courier 12px byline with an inline external icon, ruled off by ink/15 hairlines under a 2px ink rule. Virginia Tech News is pinned first everywhere (`pinned: true` in `src/data/cohortOne.js`, and `PRESS` sorts pinned stories first): it is the home page's lead story and the News page's first card. Every other story follows newest first, under More coverage on the home page; the News page gives every article a card and frames posts that have an `embed` URL.
- **Empty state:** a dashed `ink/30` border on `paper-bright/50`, for albums still in processing.

### Photographs
- **Front-page press photograph:** straight, 16:9 from `sm:` (4:3 and edge-to-edge on phones, where it comes first), mounted in an 8px white keyline at `print-lg`, carrying the single HELD stamp at top-left. The cutline below it is Courier 11–12px in paper-bright/95, caption then photo credit.
- **Top 10 spread and gallery thumbnails** (`GalleryThumb`): buttons in a 4px white mat at `card`, lifting to `print` with the image fading to 90% opacity on hover. Spread cells carry Courier 12px cutlines in soft ink.
- **Archival print** (`PhotoPrint`): white ground, 8px border (10px bottom), `print`, resting tilt that straightens over 300ms on hover, optional Courier 11px caption. Used for kept photos on the archive's interior pages.
- **Album viewer** (`WorkshopAlbum`): a paper-bright card with a faint `ink/[0.045]` well; photos in a 4px white border crossfade over 220ms; a Courier "Print 01 / 09" counter and two 40px square buttons below.

### Lightbox
A full-screen `role="dialog"` viewer on cloth-deep, fading in over 180ms. A Courier 13px bold tabular counter ("03 / 10") sits top-left and a 44px square close button top-right; the photo sits centered at up to `100dvh − 10rem`, 4px white keyline, `print-lg`, crossfading 200ms between photos; the Courier 13px caption and previous/next buttons sit along the bottom. Arrow keys page, a 48px horizontal swipe pages, Escape or a backdrop click closes, Tab is trapped inside, body scroll locks, neighbors preload, and focus returns to the opening thumbnail on close.

### Stamps (`Stamp`), the signature component and the site's one authored motion
Double-ring rubber stamp: Courier Prime bold uppercase, tracking 0.14em, a 2px outer border plus a 1px inner border in the same ink, rotated −4° to +2°. Red (`stamp`, HELD and past dates) and blue (`stamp-blue`, DUE and pending). On the front page the one HELD stamp sits on the photograph over a `paper-bright/90` backing so the ink reads on the image. Entrance is the **stamp-in**: from opacity 0, scale 1.45, and 5° past its resting rotation, springing to rest (`type: "spring", stiffness: 420, damping: 21`), once, at `whileInView` with a −40px margin. The mobile schedule cards use static stamps (`animate={false}`).

Everything else that moves is functional: 300ms straighten, 240ms accordion reveals, 220ms album and 200ms viewer crossfades, 180ms viewer and mobile-menu fades, a 160ms dropdown fade with a 4px drop, and 200ms chevron rotations. The app is wrapped in `MotionConfig reducedMotion="user"` and the stylesheet collapses every transition and animation to ~0ms under `prefers-reduced-motion`.

### Navigation
- **Bar:** fixed, 64px, cloth-deep, paper text; a Bricolage bold wordmark in paper-bright and a Courier "PUBLIC RECORD · EST. 2026" annotation (10px, 0.22em, hidden below `md`).
- **Tabs:** Home, Cohort One (a menu, lucide chevron), Team, News, Get Involved, FAQ, Contact. 13px semibold Public Sans; inactive `paper/75` over a transparent 2px underline (hover `paper/30`); active paper-bright over a stamp-red underline with `aria-current="page"`. "Cohort One" is a button (`aria-expanded`, `aria-controls`) that wears the active underline on any archive page; its chevron flips 180°.
- **Cohort One dropdown:** a 256px cloth-deep panel with a 1px `paper/15` border and the menu-drop shadow, 12px below the tab. Rows are 14px semibold (`paper/80`, hover paper-bright on a cloth fill); the current page carries a 6px flame-bright dot at the row's end. Escape closes it and returns focus to the tab; a pointer-down outside closes it; any page change closes it.
- **Mobile menu:** a square outlined menu button opens a full-screen grained paper sheet. Top-level tabs are Bricolage 24px bold in ink (stamp red when current) with Courier two-digit index numbers, ruled by `ink/10` hairlines. The Cohort One entry nests its five archive pages in a left-ruled (`ink/15`) group of Courier 13px bold uppercase links (stamp red when current).
- **Archive subnav** (`CohortSubnav`): at the top of every Cohort One page, a strip of Courier 12px bold uppercase tabs (0.12em) over an `ink/15` bottom rule; the current tab is ink over a 2px stamp-red underline, the others soft ink with an `ink/30` hover underline. On phones it bleeds to the gutters and scrolls sideways.
- **Links** (`PageLink`): every internal link is a real `<a href>` to the page's path, so new-tab and copy-link work; a plain left click routes in-app with `pushState` and jumps to top.
- **Skip link:** a paper-bright block with ink text, top-left, on focus.
- **Footer:** a cloth-deep mirror of the bar with three columns (the program, the site + Cohort One link lists, the directors). Courier 11px uppercase column heads (0.22em, `paper/70`), `paper/85` links, and a Courier colophon ("Last stamped September 2026 · …", 0.08em).

### Tables (schedule)
A paper-bright sheet at `card`; Courier 11px uppercase headers (0.2em) over a 2px `ink/30` head rule; `ink/10` row rules; typed mono cells; a status column of real stamps (Held red, Due blue). Below `md` it reflows into stacked cards with static stamps.

### Third-party embeds
Drive slide PDFs and the LinkedIn post sit in white iframes framed by a paper-bright card with a 1px paper-shade border: foreign documents in the library's own folder.

## Do's and Don'ts

### Do:
- **Do** keep the two registers straight: flame grounds the front page, the close, and primary buttons; cloth grounds the chrome (nav, archive menu, vision band, viewer, footer); paper grounds content. Seam the flame front page to paper with an 8px flame-deep rule and paper to paper with an `ink/10` hairline.
- **Do** set press photographs straight in a white keyline (8px on the lead, 4px on thumbnails) with a Courier cutline and, on the lead, the photo credit. Hover lifts `card` → `print` and fades the image to 90%.
- **Do** reserve tilt for kept objects: archival `PhotoPrint`s on interior archive pages and the hold slip, at −1.4° to +1.6°, straightening on hover.
- **Do** carry status with stamps in the right ink (red happened, blue pending) using the double-ring `Stamp` and its spring (stiffness 420, damping 21). One stamp per first viewport.
- **Do** build figure boxes as catalog cards: red-rule margin, paper-shade border, rod hole, Courier labels, flame Bricolage numerals.
- **Do** open every Cohort One archive page with `CohortSubnav`, and route every internal link through `PageLink` so it is a real anchor.
- **Do** give every photo gallery the `Lightbox`: counter, arrow keys, swipe, Escape, focus trap, and focus return.
- **Do** size thumbnails from the photo's own width and height so masonry never jumps.
- **Do** honor reduced motion at both layers: `MotionConfig reducedMotion="user"` and the global CSS kill switch.
- **Do** keep Courier Prime for typed data, labels, bylines, and cutlines; Public Sans for prose; Bricolage for headings and numerals. Three voices, never swapped.
- **Do** limit icons to functional lucide strokes (arrows, chevrons, mail, external-link, menu, X) at 16–20px.

### Don't:
- **Don't** round a corner. Only rod holes and dot markers are circles (The Guillotine Rule).
- **Don't** tilt a press photograph or frame one in anything but white (The Press-Print Rule).
- **Don't** warm the neutrals back toward manila or cream. The card stock is the clean paper trio (#F3F1EC / #FDFCFA / #E1DED6).
- **Don't** set flame-bright (#EE6C4D) as text or on paper; it is a small dot on cloth-deep only.
- **Don't** float eyebrow or kicker labels above headings. Mono labels belong inside objects, and the only strip above a heading is the front-page dateline between rules.
- **Don't** lay out figures as bare stat tiles; numbers live inside a catalog-card box or a dot-leader ledger.
- **Don't** introduce a dark mode or new dark surfaces; the cloth greens are this light world's entire dark register.
- **Don't** author new entrance animations. The stamp-in spring is the only arrival; everything else is a functional fade, reveal, lift, or straighten at 160–300ms.
- **Don't** use pure-black or colored shadows; every shadow tints from catalog ink or deep cloth.
- **Don't** let transformed objects widen the page; `overflow-x: clip` on `html`/`body` is load-bearing.
- **Don't** name students in captions, cutlines, or alt text; captions name the research, not the researcher.
