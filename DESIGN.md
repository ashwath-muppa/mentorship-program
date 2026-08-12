---
name: Next In Research — The Library Record
description: Public-library ephemera system — flame-orange announcement fields, library-green chrome, clean paper card objects, rubber-stamp ink, typed catalog data.
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
  display:
    fontFamily: '"Bricolage Grotesque", Georgia, serif'
    fontSize: "2.9rem / 3.75rem (sm) / 4.4rem (lg)"
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
  body:
    fontFamily: '"Public Sans", system-ui, sans-serif'
    fontSize: "1rem (1.125rem for leads)"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: '"Courier Prime", Courier, monospace'
    fontSize: "0.625rem–0.75rem"
    fontWeight: 700
    letterSpacing: "0.12em–0.24em"
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
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-bright}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-ink-hover:
    backgroundColor: "{colors.cloth}"
  button-stamp:
    backgroundColor: "{colors.stamp}"
    textColor: "{colors.paper-bright}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  button-stamp-hover:
    backgroundColor: "{colors.ink}"
  chip-filter:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  chip-filter-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-bright}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  catalog-card:
    backgroundColor: "{colors.paper-bright}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
---

# Design System: Next In Research — The Library Record

## Overview

**Creative North Star: "The Library Record"**

The site is a public library's own record of a summer — but the record is now dressed in the program's own brand color. Flame-orange fields (user-pinned, Aug 2026) open and close the record like a poster pasted to the library door; buckram-cloth green remains as the institution's furniture — the nav bar, the footer, the ledger and schools bands; and between them, clean paper neutrals carry the content as physical objects: a card, a slip, a print, a ledger, a pocket. Evidence is the aesthetic. A date is stamped, a mentor is filed under a call number, a photo is a white-bordered archival print with a typed caption. The world explicitly refuses both the dark SaaS gradient hero and the sterile white nonprofit template (direction contract, `index.html`, seed 1ec49fef, rev. 2), and it retired the warm manila card stock of the first rendition — the paper is clean now, not yellowed.

The mood is civic, warm, and matter-of-fact — a well-run county institution with something to announce, not a startup. Density is generous but orderly: a flame band announces, paper bands present the evidence, cloth bands do the bookkeeping, and objects sit slightly tilted as if just set down. The typography splits cleanly into three voices — poster capitals for announcements, plain civic sans for talking to families, and typewriter mono for anything a librarian would type or stamp.

**Key Characteristics:**
- Two colored registers over one paper ground: flame orange announces (hero, closing field, primary buttons), cloth green administers (nav, footer, ledger, schools band). Never a plain white page.
- Clean paper neutrals (#F3F1EC family) as the card stock — the warm manila is retired.
- Ephemera as components: catalog cards, hold slips, the accession ledger, card pockets, rod holes, archival prints, and one autoplaying reel of prints (the hero carousel).
- Two stamp inks carry all status: red for what happened, blue for what is pending.
- Strictly rectilinear paper edges; the only circles are drilled holes and dots.
- One authored motion: things arrive the way a rubber stamp lands.
- A single light world — no dark mode; the cloth greens are the dark register.

## Colors

An institutional materials palette with a brand voice on top: one announcement family (flame), one institutional family (cloth), one clean card stock (paper), one reading ink, and two stamp inks for status.

### Primary
- **Brand Flame** (`flame` #B93C15): the theme color, deep enough for near-white text (AA). Ground for the hero and closing fields, fill of the primary action buttons on paper bands (flyer download, "Full agenda"), and the base of the text-selection ink.
- **Deep Flame** (`flame-deep` #9E3211): flame's pressed state — the hover of every flame button — and the thick 8px seam under the flame hero.
- **Bright Flame** (`flame-bright` #EE6C4D): the legacy coral, kept as the scarcest color. Observed only as the dot markers in the schools list on the deep-cloth band. Small punctuation on cloth grounds; too light to be text on paper.

### Secondary
- **Buckram Cloth** (`cloth` #1D4A40): the library's binding material, demoted to the secondary register. Ground for the ledger band and the app's root backdrop; the hover fill of ink buttons.
- **Deep Cloth** (`cloth-deep` #14352E): the darkest register — fixed navigation bar, footer, the schools band, and the 8px seam above the mentor-catalog band.

### Tertiary
- **Rubber-Stamp Red** (`stamp` #BE3A27): the louder of the two stamp inks. Marks what has *happened* — HELD stamps and stamped dates — plus call numbers, text links, the active nav underline, ledger values, agenda times, phase labels, list dots on paper, and the default focus outline. It is a stamp ink, not a danger color.
- **Stamp Blue** (`stamp-blue` #2F5A77): the quieter ink. Marks what is *pending* — DUE stamps, "HOLD FOR:" labels, "In processing" notes, topic tags — and draws the faint rules of the `.ruled` ledger sheet.

### Neutral
- **Clean Paper** (`paper` #F3F1EC): the content-band field (`PageShell`, mission/record bands), the mobile nav sheet, the page background on `html`/`body`, and the default text tint on cloth fields (at /70–/90 opacities for secondary text on green).
- **Paper Bright** (`paper-bright` #FDFCFA): the surface of every ephemera object — catalog cards, slips, the ledger, the agenda card, the table — and high-emphasis text on both flame and cloth fields (at /85–/95 opacities for secondary text on flame).
- **Paper Shade** (`paper-shade` #E1DED6): 1px borders around every paper object, and the card-pocket material.
- **Catalog Ink** (`ink` #20313B): blue-black reading ink — all body text and headings on paper, the dark button fill, and (at rgba opacities) every hairline, dot leader, and shadow tint.
- **Soft Ink** (`ink-soft` #51616B): secondary text — captions, metadata, table headers, leads on paper.
- **Print White** (`print-white` #FFFFFF): reserved for photo-print borders and third-party embed frames (used via Tailwind's default `white`); never a page or card background.

### Named Rules
**The Two Registers Rule.** Flame announces, cloth administers. Flame fields open and close the record (hero and closing band) and fill the primary action on paper; cloth is the institution's furniture — nav, footer, ledger band, schools band. Paper bands carry the evidence between them. Neither register ever grounds a whole interior page; those are paper.

**The Two Inks Rule.** Status is always a stamp, and the ink states the tense: red (#BE3A27) for what happened (HELD, a stamped date), blue (#2F5A77) for what's pending (DUE, HOLD FOR, in processing). No green/amber/gray status pills exist in this world.

**The Card, Not Page Rule.** Paper-bright surfaces are always bounded objects — bordered in paper-shade, shadowed, often tilted or rod-holed — sitting on a paper, cloth, or flame field. There is no edge-to-edge white or off-white "page."

**Interaction ink.** Text selection is flame at 85% — `rgba(185,60,21,0.85)` — with paper-bright text. `:focus-visible` is a 2px stamp-red outline, offset 2px, swapping to paper-bright (#FDFCFA) inside `.bg-flame`, `.bg-flame-deep`, `.bg-cloth`, and `.bg-cloth-deep` fields (`src/index.css`).

## Typography

**Display Font:** Bricolage Grotesque (with Georgia, serif)
**Body Font:** Public Sans (with system-ui, sans-serif)
**Label/Mono Font:** Courier Prime (with Courier, monospace)

**Character:** Poster capitals over civic plainness over typewriter fact. Bricolage announces, Public Sans explains, Courier Prime records. All three load from Google Fonts (`index.html`); headings always track tight (`tracking-tight`).

### Hierarchy
- **Display** (800, 2.9rem → 3.75rem sm → 4.4rem lg, line-height 0.98): the hero masthead only — extrabold on the flame field, set in paper-bright.
- **Headline** (700, 1.875rem → 3rem sm; page titles 2.25rem → 3.75rem sm, line-height 1.02–1.05): section and page openers. Headings begin sections directly — nothing sits above them.
- **Title** (700, 1.25–1.5rem, tight): card and slip headings on ephemera objects.
- **Body** (400, 1rem; leads at 1.125rem, line-height 1.625): Public Sans for all narrative prose; content columns cap near `max-w-xl`–`max-w-3xl` (~65ch). Semibold (600) Public Sans is the button/link weight.
- **Label** (Courier Prime 700, 10–12px, uppercase, tracking 0.12em–0.24em): typed document labels — "Accession ledger · Summer 2026", "HOLD FOR:", "PUBLIC RECORD · EST. 2026", table headers, pocket labels, filter chips.
- **Data** (Courier Prime 400, 11–15px): typed catalog facts — call numbers, dates, times, locations, captions, agenda rows, mentor names and bios on cards. The ledger's bold red totals are the lone step-up, at 20px.

### Named Rules
**The Typed Data Rule.** Courier Prime is reserved for what a librarian would type or stamp: identifiers, dates, statuses, captions, labels, and the contents of catalog cards. It never sets narrative prose paragraphs or display headings.

**The No Floating Label Rule.** Small mono labels exist only as printed parts of ephemera objects (a slip's header, a ledger's caption, a pocket's label). No eyebrow/kicker labels float above display headings; sections open with the heading itself.

## Layout

A single-column sequence of full-width material bands. On the home page the sequence is flame → paper → cloth → paper → cloth-deep → paper → flame; interior pages are one long paper band (`PageShell`). Where a colored field hands off to paper, the seam is a thick 8px rule in that field's deep tone (`border-t-8 border-flame-deep` under the hero, `border-t-8 border-cloth-deep` after the ledger); consecutive paper bands are separated by a faint ink hairline (`border-ink/10`–`/15`).

- **Containers:** content sits in `max-w-6xl` (hero grid, nav, and footer use `max-w-7xl`) with gutters of 20px (`px-5`), 32px from `sm:` up.
- **Vertical rhythm:** bands run 80px padding (`py-20`), 112px at `lg:` (`py-28`); the hero runs 128px top (144px at `lg:`) to clear the fixed nav. Interior pages use `PageShell` (`pt-24 pb-24` on paper — the 96px top clears the nav) with a `PageTitle` header margined 56px below.
- **Grids:** object grids are `gap-6` (24px), 1 → 2 → 3 columns (`sm:` / `lg:`). Two-column feature splits are deliberately asymmetric: `0.98fr/1.02fr` (hero — carousel side slightly wider), `1.05fr/0.95fr` (agenda card + flyer), `1.1fr/0.9fr` (mission), `0.9fr/1.1fr` (form + embed). The record list rows run `220px/1fr/auto` at `lg:`; the mentor achievement wall is CSS-columns masonry (`columns-2` → `lg:columns-4`); the schools list is `columns-1` → `sm:2` → `lg:3` with hairline-ruled rows.
- **Navigation:** fixed 64px (`h-16`) cloth-deep bar; tabs collapse below `lg` into a full-screen paper sheet with numbered entries. Anchor targets (`#symposium`, `#record`, `#schools`) carry `scroll-mt-16` so the fixed bar never hides them; scrolling is `scroll-behavior: smooth` with a reduced-motion fallback, and page changes jump to top instantly.
- **Responsive:** `min-width: 320px` on body; the schedule table becomes stacked cards below `md`; the hero stacks masthead over carousel below `lg`; coordinator cards stack the 200px portrait above the text below `sm`.
- **Overflow discipline:** `html, body { overflow-x: clip }` (`src/index.css`) — required because tilted prints and pre-animation stamps (which enter at scale 1.45) would otherwise widen the page.
- **Utility cascade note:** `.grain`, `.ruled`, and `.red-rule` are defined in `@layer components` (`src/index.css`) rather than as plain global classes, so Tailwind utilities on the same element (backgrounds, borders, padding) still win the cascade — they compose as base material treatments instead of fighting the utility layer.

## Elevation & Depth

Depth is paper physics: objects rest *on* fields, so shadows exist to lift a slip off a desk, never to glow. Every shadow is tinted with catalog ink — rgba(32,49,59, …) — or deep cloth in the nav; there is no pure black and no colored glow. Texture does the rest: the `.grain` overlay (a 5%-opacity SVG fractal-noise tile) sits on flame, cloth, and paper fields alike, `.ruled` draws 28px-spaced stamp-blue ledger lines (rgba(47,90,119,0.22)), and `.red-rule` draws a catalog card's vertical red margin line at 2.25rem (rgba(190,58,39,0.5), 1.5px).

### Shadow Vocabulary
- **card** (`0 1px 1px rgba(32,49,59,0.12), 0 4px 10px rgba(32,49,59,0.14)`): the resting shadow of catalog cards, slips, table, and albums.
- **print** (`0 1px 2px rgba(32,49,59,0.18), 0 6px 16px rgba(32,49,59,0.22)`): photo prints and the portrait prints mounted on catalog and coordinator cards.
- **print-lg** (`0 2px 4px rgba(32,49,59,0.16), 0 14px 34px rgba(32,49,59,0.28)`): the most-lifted objects — the hero carousel frame, the symposium agenda card, the ledger, the schedule finale card, the students-page feature card.
- **nav-scrolled** (`0 2px 12px rgba(20,53,46,0.45)`): appears under the fixed bar only after 12px of scroll.
- **pocket-lip** (`0 -2px 8px rgba(32,49,59,0.10)`): upward shadow on the card-pocket front.
- **hole-punch** (`inset 0 1px 2px rgba(32,49,59,0.3)`): the drilled depth inside every rod hole.

### Named Rules
**The Ink-Shadow Rule.** Shadows are diffuse, downward, and ink-tinted (rgba(32,49,59,…)). Elevation is reserved: `card` at rest, `print` for photographs, `print-lg` only for a band's single hero object. Hover may swap `card` → `print-lg` (contact cards) but never invents new shadows.

## Shapes

Rectilinear, guillotine-cut paper. No element carries a border radius — cards, slips, buttons, chips, iframes, and photos are all square-cornered. The only circles in the build are drilled or punched: the 16px catalog rod hole, the 6px dot markers (flame-bright on deep cloth, stamp red on paper), and the carousel's 10px reel dots.

Form language beyond the rectangle comes from three devices: the **tilt** (standalone prints and slips rest at −3° to +2°, set via a `--tilt` custom property, and straighten to 0° on hover — while portraits mounted inside catalog and coordinator cards sit square), the **angled pocket** (a `clip-path: polygon(0 18%, 100% 0, 100% 100%, 0 100%)` cut across the card-pocket front), and the **double ring** of the rubber stamp (2px outer border, 3px gap, 1px inner border in the same ink).

**The Guillotine Rule.** Corners are square because paper is cut, not molded. The only permitted circles are holes and dots. Rounding anything else breaks the material.

## Components

### Buttons
- **Shape:** square-cornered (0px radius); Public Sans semibold (600); `inline-flex` with a 16px lucide arrow/mail/external icon at 8px gap.
- **Light (on flame):** paper-bright fill, flame text, 14px × 24px padding, `shadow-card`; hovers to pure white.
- **Outline (on flame):** transparent with 1px `paper-bright/50` border, paper-bright text; border brightens to paper-bright on hover.
- **Flame (the primary action on paper):** flame fill, paper-bright text; hovers to flame-deep. Used for the flyer download and "Full agenda."
- **Ink (utility action on paper):** ink fill, paper-bright text, 12px × 20px padding; hovers to cloth green.
- **Stamp (the one loud action — Get Involved's application button):** stamp-red fill, paper-bright text; hovers to ink.
- **Outline ink (on paper):** transparent with 1px `ink/30` border, ink text; border darkens to ink on hover.
- **Text links:** semibold stamp-red with trailing arrow, hover to ink. Mono metadata links are uppercase 12px in stamp or stamp-blue, hover to ink.
- **Hover grammar:** color/background transitions only (~150ms default); buttons never lift, scale, or cast new shadows.

### Chips (grade filters)
- **Style:** Courier Prime 700, 12px, uppercase, tracking 0.12em; 1px `ink/30` border, transparent fill, 8px × 16px padding.
- **State:** hover darkens the border to ink; selected (`aria-pressed`) fills ink with paper-bright text.

### Cards / Containers (the ephemera family)
- **Catalog Card** (`CatalogCard`): paper-bright, 1px paper-shade border, `shadow-card`, no tilt. The portrait now leads — a full-card-width white print (`p-1.5 pb-2`, `shadow-print`) mounted square at the top, cropping the photo to 4:5 with a per-mentor `object-position`. The typed details sit below in a text block that carries the `.red-rule` margin line scoped to itself (`pl-12` indent): stamp-red Dewey-style call number (e.g. "006.31 MUP"), bold uppercase mono name (15px, 0.06em), focus line in soft ink, stamp-blue grade line. An expandable "Read card" bio toggles under a hairline (mono 12px label, 240ms height reveal); a `RodHole` is punched bottom-center. The compact variant (deep bottom padding, no grade/bio) sits inside a `CardPocket`.
- **Coordinator Card:** the two-coordinator variant — a `200px/1fr` grid pairing the 4:5 portrait print with a red-ruled text block (call number, name, role, interest, mono email link). On the Contact page the whole card is a mailto link that lifts `shadow-card` → `shadow-print-lg` on hover.
- **Symposium Agenda Card:** the home page's proof object for August 22 — a red-ruled paper-bright card at `shadow-print-lg` opening with a stamped date/time, the address in bold mono, agenda rows (stamp-red time in a fixed 80px column, mono 13px item) separated by ink/10 hairlines, a mono "Working with …" credit line, a flame button for the flyer PDF, and a rod hole. The official flyer hangs beside it as a tilted `PhotoPrint`.
- **Card Pocket** (`CardPocket`): a paper-shade front panel clipped at an angle across the card's lower third, with a centered mono label (10px, tracking 0.24em); the card pulls up 12px on hover/focus-within.
- **Hold Slip:** paper-bright card with stamp-blue "HOLD FOR:" mono label, display title, body text, tilt + hover-straighten, rod hole.
- **Accession Ledger:** a `.ruled` paper-bright sheet (`shadow-print-lg`, rod hole) whose rows are a `ul` of real links/buttons: mono 15px label, a dotted-ink dot leader (`border-dotted border-ink/35`) stretching between, and a bold stamp-red total (20px). Rows tint `bg-paper` on hover.
- **Empty state:** dashed `ink/30` border on `paper-bright/50` — the "album coming soon" placeholder.

### Photo Prints (`PhotoPrint`)
Every standalone photograph on the site: white ground, 8px border padding (10px bottom), `shadow-print`, resting tilt (±0.6–3°) that straightens over 300ms on hover, optional typed caption (Courier Prime 11px, soft ink). Portraits mounted inside cards use the same white mount but sit square. Album images inside the workshop viewers wear a lighter 4px white border.

### Cover Carousel (`CoverCarousel`) — the hero reel
One archival print that cycles through the five workshop cover photos, mounted at −1.2° in a white `shadow-print-lg` frame on the flame field, with a typed caption ("Workshop N · title") and a padded mono counter (01/05). Photos crossfade over 550ms; the reel advances every 4.5s. Controls sit below the print: five 10px dot buttons (paper-bright when active) and three 40px square outline buttons (play/pause, previous, next) that fill paper-bright with flame icons on hover. All cover images are preloaded on mount so a crossfade never lands on an unloaded photo.

**The Handed-Reel Rule.** Autoplay is a courtesy, never a takeover: the reel pauses while hovered or focused, any manual control (dot, arrow, or the `aria-pressed` pause toggle) stops autoplay for good, and under `prefers-reduced-motion` the reel never advances on its own.

### Stamps (`Stamp`) — the signature component and the site's one authored motion
Double-ring rubber stamp: Courier Prime bold uppercase, tracking 0.14em, 2px outer border + 1px inner border in the same ink, rotated −3° to +2°. Three inks: `stamp` red (default, HELD/past), `blue` (DUE/pending), `paper` (on flame and cloth fields — the hero's "Free · No fees · No prerequisites"). Entrance is the **stamp-in**: from opacity 0, scale 1.45, 5° past its resting rotation, springing to rest (`type: "spring", stiffness: 420, damping: 21`), triggered once at `whileInView` (−40px margin). All other motion in the build is functional: 300ms straighten/lift, 240ms accordion reveals, 220ms album crossfades (550ms in the hero reel), 180ms mobile-nav fade. The whole app is wrapped in `MotionConfig reducedMotion="user"`, the stylesheet collapses all animation to ~0ms under `prefers-reduced-motion`, and the carousel checks the same media query before autoplaying.

### Navigation
- **Bar:** fixed, 64px, cloth-deep, paper text; Bricolage bold wordmark in paper-bright + mono "PUBLIC RECORD · EST. 2026" annotation (10px, 0.22em, hidden below `md`).
- **Tabs:** 13px semibold Public Sans; inactive `paper/75` with transparent 2px underline, hover `paper/30` underline; active paper-bright over a stamp-red underline with `aria-current="page"`.
- **Mobile:** square outlined menu button; full-screen grained paper sheet, tabs as ink display type (active = stamp red) with mono index numbers, hairline-ruled.
- **Skip link:** appears on focus as a paper-bright block with ink text, top-left above the bar.
- **Footer:** cloth-deep mirror of the bar — mono uppercase column labels (11px, 0.22em, `paper/70`), `paper/85` links, mono colophon line ("Last stamped August 2026 …", 0.08em).

### Tables (schedule)
Paper-bright sheet, `shadow-card`; mono uppercase 11px headers (tracking 0.2em) over a 2px `ink/30` head rule; `ink/10` row rules; typed mono cells; status column uses real `Stamp` components (Held red / Due blue). Below `md` it reflows into stacked cards with static (non-animated) stamps.

### Third-party embeds
Google Calendar, Drive slide PDFs, and the mentor video sit in white iframes framed by a paper-bright card with a 1px paper-shade border — foreign documents in the library's own folder.

## Do's and Don'ts

### Do:
- **Do** keep the two registers straight: flame (#B93C15) grounds announcement fields and primary buttons, cloth (#1D4A40/#14352E) grounds the institutional chrome (nav, footer, ledger, schools), and paper (#F3F1EC) grounds content bands. Seam a colored field to paper with an 8px rule in that field's deep tone; seam paper to paper with an `ink/10` hairline.
- **Do** render every standalone photograph as a `PhotoPrint`: white border, `shadow-print`, slight tilt, hover-straighten, typed mono caption. Portraits mounted inside catalog and coordinator cards keep the white mount but sit square and full-width (4:5 crop).
- **Do** carry status with stamps in the correct ink — red = happened, blue = pending — using the double-ring `Stamp` and its spring entrance (stiffness 420, damping 21).
- **Do** honor reduced motion at all three layers: `MotionConfig reducedMotion="user"` around the app, the global CSS kill switch, and a `matchMedia` guard before any autoplay.
- **Do** give autoplaying media the Handed-Reel treatment: pause on hover/focus, a visible `aria-pressed` pause control, and permanent stop on any manual navigation.
- **Do** put `scroll-mt-16` on any in-page anchor target; the 64px nav is fixed.
- **Do** keep Courier Prime for typed data and labels, Public Sans for prose, Bricolage for headings — three voices, never swapped.
- **Do** give each paper object its full kit: 1px paper-shade border, ink-tinted shadow, square corners, and a rod hole when it's a catalog record.
- **Do** limit icons to functional wayfinding lucide strokes (arrows, chevrons, mail, external-link, menu/x, play/pause) at 16–20px.

### Don't:
- **Don't** round a corner. Only rod holes, dot markers, and the reel dots are circles (The Guillotine Rule).
- **Don't** warm the neutrals back toward manila or cream — the card stock is the clean paper trio (#F3F1EC / #FDFCFA / #E1DED6); the manila rendition is retired by the user.
- **Don't** set flame-bright (#EE6C4D) as text or accents on paper surfaces — it lives as small punctuation on cloth grounds, and the contrast fails anywhere lighter.
- **Don't** float eyebrow/kicker labels above headings; mono labels belong inside ephemera objects only.
- **Don't** introduce a dark mode or new dark surfaces; the cloth greens are this light civic world's entire dark register.
- **Don't** author new entrance animations — the stamp-in spring is the only arrival; everything else is a functional fade, reveal, or straighten at 180–550ms.
- **Don't** use pure-black or colored shadows; every shadow tints from catalog ink rgba(32,49,59,…).
- **Don't** let transformed objects widen the page — tilts and pre-animation scale are why `overflow-x: clip` is load-bearing on `html`/`body`.
