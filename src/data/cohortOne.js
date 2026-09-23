// ─────────────────────────────────────────────
// COHORT ONE — THE DOCUMENTED RECORD (Summer 2026)
// Every figure here traces to Virginia Tech News (Sept 11, 2026) or the
// program's own records. Students are never named: photos show the work,
// captions name the research, not the researcher.
// ─────────────────────────────────────────────

const BASE = import.meta.env.BASE_URL;
const SYMPOSIUM_ROOT = `${BASE}images/NextInResearch/symposium`;

export const MISSION =
  "The research experience we wish we’d had — free, for every middle schooler.";

export const VISION =
  "A self-sustaining cycle: mentees grow into mentors, and near-peer research mentorship becomes as normal as tutoring — in every district.";

export const HEADLINE =
  "99 middle schoolers built research projects this summer: 60 presented at Virginia Tech.";

// The flagship: the team's Top 10 #1 (IMG_0601).
export const HERO_PHOTO = {
  src: `${SYMPOSIUM_ROOT}/hero/cohort-one-staircase-1600.jpg`,
  srcSet: [960, 1600, 2400]
    .map((w) => `${SYMPOSIUM_ROOT}/hero/cohort-one-staircase-${w}.jpg ${w}w`)
    .join(", "),
  alt: "Program directors Dev Srivastava and Deborah Torrico-Pardo kneel front and center with Cohort One's families around them, while the students fill the orange staircase behind, each holding a Certificate of Achievement",
  caption:
    "Cohort One — students, mentors, families, and the program directors — on the staircase at Virginia Tech's Academic Building One, August 22, 2026.",
};

export const PHOTO_CREDIT = "Event photography by Nagaraju Kashayi for Virginia Tech";

// The front page's "By the numbers" box.
export const HEADLINE_NUMBERS = [
  { value: "99", label: "middle schoolers, grades 6–8" },
  { value: "29", label: "TJHSST student mentors" },
  { value: "21", label: "schools represented" },
  { value: "60", label: "students presented at Virginia Tech" },
  { value: "250+", label: "people at the symposium" },
  { value: "$0", label: "cost to any family" },
];

// What Cohort One did, in the program's own three phases.
export const COHORT_STORY = [
  {
    id: "plan",
    phase: "Phase 1",
    title: "Plan",
    when: "April – June",
    body: "Cohort One kicked off on April 28 at Brambleton Library. Most students had never done research before. Each was matched with a TJHSST mentor, in a group of one to three, around a question of their own.",
    ledger: [
      { label: "Applications", value: "105" },
      { label: "Students matched", value: "99" },
      { label: "TJHSST mentors", value: "29" },
    ],
    link: { page: "team", label: "Meet the mentors" },
  },
  {
    id: "build",
    phase: "Phase 2",
    title: "Build",
    when: "June – August",
    body: "Weekly sessions at the Ashburn and Brambleton libraries took students from a research question to methods, statistics, scientific writing, and presenting — with one-on-one mentoring every week in between.",
    ledger: [
      { label: "Free workshops", value: "9" },
      { label: "Public library branches", value: "2" },
      { label: "Cost to any family", value: "$0" },
    ],
    link: { page: "cohort-workshops", label: "Open the workshop albums" },
  },
  {
    id: "publish",
    phase: "Phase 3",
    title: "Publish",
    when: "August",
    body: "A Virginia Tech scientist reviewed student papers, two projects went to an IEEE conference at MIT, and on August 22 the cohort presented at Virginia Tech's Institute for Advanced Computing.",
    ledger: [
      { label: "Papers reviewed", value: "11" },
      { label: "IEEE MIT URTC submissions", value: "2" },
      { label: "Presenters at Virginia Tech", value: "60" },
    ],
    link: { page: "cohort-symposium", label: "See the symposium" },
  },
];

// ── Press ──
// VT News blocks framing (X-Frame-Options: SAMEORIGIN), so it runs as a link
// card. LinkedIn's /embed/ URL allows framing.
export const PRESS = [
  {
    id: "vt-news",
    outlet: "Virginia Tech News",
    dateLabel: "September 11, 2026",
    title:
      "Institute for Advanced Computing hosts symposium to showcase STEM learning for local middle school students",
    quote: "…the passion that these young engineers bring to STEM fields.",
    url: "https://news.vt.edu/articles/2026/09/STEM-symposium-IAC-2026.html",
    image: {
      src: `${SYMPOSIUM_ROOT}/gallery/full/20260822_153343.jpg`,
      alt: "The Boeing Auditorium filled with research posters, students, and families during the symposium",
    },
  },
  {
    id: "vt-dc-linkedin",
    outlet: "Virginia Tech in the D.C. Area · LinkedIn",
    dateLabel: "August 31, 2026",
    title: "Virginia Tech in the D.C. Area on the Cohort One symposium",
    url: "https://www.linkedin.com/posts/vtdcarea_virginia-tech-welcomed-more-than-250-attendees-activity-7500274151425818624-AVe4",
    embed: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7500274151425818624",
    summary:
      "Virginia Tech's D.C.-area team recapped the symposium: more than 250 attendees and 60 middle school presenters at Academic Building One.",
    image: {
      src: `${SYMPOSIUM_ROOT}/gallery/full/img_0582.jpg`,
      alt: "Cohort One students holding up their certificates on the staircase",
    },
  },
];

// ── The symposium ──
export const SYMPOSIUM_DAY = {
  name: "NextInResearch Symposium & Expo",
  dateLabel: "Saturday, August 22, 2026",
  host: "Virginia Tech Institute for Advanced Computing",
  venue: "Boeing Auditorium, Academic Building One",
  address: "3625 Potomac Ave, Alexandria, VA 22305",
  // Order of the day, as it ran.
  order: [
    "Students set up their posters in the Boeing Auditorium",
    "Families, friends, and guests arrive",
    "Opening remarks from Dr. Jim Egenrieder of Virginia Tech",
    "The expo: 60 students present their research, with partner booths from Invention Virginia, the Virginia Junior Academy of Science, and Bridge2Success Virginia",
    "Certificates of Achievement, handed out on the staircase",
    "The group photo: all of Cohort One, certificates up",
  ],
  flyerImg: `${SYMPOSIUM_ROOT}/symposium-flyer.jpg`,
  flyerPdf: `${SYMPOSIUM_ROOT}/symposium-flyer.pdf`,
};

// The founders, in their own words (as quoted by Virginia Tech News).
export const FOUNDER_QUOTES = [
  {
    quote: "Our motivation to start this program was to give middle schoolers the advice we wish we had when we were younger.",
    name: "Dev Srivastava",
  },
  {
    quote: "Seeing the kids having fun during these lessons and always bringing questions for the next week was one of our biggest motivators to keep going.",
    name: "Deborah Torrico-Pardo",
  },
];

// The one ask: every way to help ends in an email to the directors.
export const WAYS_TO_HELP = [
  {
    title: "Host",
    body: "A library, school, or campus space for the 2027 workshops or symposium.",
    subject: "Hosting Cohort Two",
  },
  {
    title: "Sponsor",
    body: "Posters, printing, and supplies — so the program stays free for every family.",
    subject: "Sponsoring Cohort Two",
  },
  {
    title: "Judge or speak",
    body: "Scientists, engineers, and educators for the 2027 symposium.",
    subject: "Judging or speaking at the Cohort Two symposium",
  },
  {
    title: "Mentor",
    body: "TJHSST students: join the 2027 mentor staff and lead one to three middle school researchers.",
    subject: "Mentoring in Cohort Two",
  },
];

export const THANKS = [
  { name: "Virginia Tech Institute for Advanced Computing", note: "hosted the symposium in Alexandria" },
  { name: "Dr. Jim Egenrieder", note: "Director, Virginia Tech Thinkabit Lab" },
  { name: "Dr. Andreea Sistrunk", note: "Virginia Tech Technical Education and Workforce Development — reviewed 11 student papers" },
  { name: "Dr. Catherine Scott", note: "TJHSST" },
  { name: "Ashburn & Brambleton Libraries", note: "Loudoun County Public Library — home of the workshop series" },
  { name: "Invention Virginia · Virginia Junior Academy of Science · Bridge2Success Virginia", note: "partner booths at the symposium" },
];

// ── What Cohort One researched ── a sample, by field, without names.
export const RESEARCH_FIELDS = [
  {
    field: "Medicine & neuroscience",
    topics: [
      "A systematic review of diabetic neuropathy",
      "Adaptive therapy and cancer survival",
      "Gene activity in the hippocampus in Alzheimer's disease",
      "Epigenetics",
      "Game theory as a model for cancer",
    ],
  },
  {
    field: "Health & behavior",
    topics: [
      "Rewards, mood, and habit consistency — with a self-built habit-tracking app",
      "Sugar-intake timing and sleep quality in teenagers",
      "Sleep and reaction time in young and adult athletes",
      "Academic stress and acne severity",
      "Auditory distractions and reading comprehension",
      "Machine learning for adolescent mental health",
    ],
  },
  {
    field: "Engineering & computing",
    topics: [
      "A low-cost bionic arm built from affordable parts",
      "Data-center cooling: efficiency, cost, and environmental impact",
      "An AI assistant for computer-aided design",
      "Paper-rocket fin size and flight distance",
      "What AI means for the job market",
    ],
  },
  {
    field: "Environment, materials & space",
    topics: [
      "Water temperature and microplastic production",
      "Water filtration methods for freshwater quality",
      "The freshwater footprint of AI",
      "Paint made from plant-pigment extracts",
      "Almond flour versus all-purpose flour",
      "Lessons from the Challenger explosion's data for future spaceflight",
    ],
  },
];

// ── Symposium photographs ──
export const GALLERY_CATEGORIES = [
  { id: "stairs", label: "On the stairs" },
  { id: "certificates", label: "Certificates" },
  { id: "expo", label: "The expo floor" },
  { id: "guests", label: "Guests & faculty" },
  { id: "setup", label: "Setting up" },
];

export function symposiumPhotoSrc(slug, size = "full") {
  return `${SYMPOSIUM_ROOT}/gallery/${size}/${slug}.jpg`;
}

export const SYMPOSIUM_PHOTOS = [
  { slug: "img_0589", cat: "stairs", w: 1800, h: 1200, alt: "Cohort One students holding their certificates on the staircase at Virginia Tech's Academic Building One" },
  { slug: "img_0594", cat: "stairs", w: 1200, h: 1800, alt: "Cohort One students holding their certificates on the staircase at Virginia Tech's Academic Building One" },
  { slug: "img_0585", cat: "stairs", w: 1200, h: 1800, alt: "Cohort One students holding their certificates on the staircase at Virginia Tech's Academic Building One" },
  { slug: "img_0601", cat: "stairs", w: 1800, h: 1200, alt: "Cohort One on the staircase with mentors, families, and the program directors" },
  { slug: "img_0604", cat: "stairs", w: 1800, h: 1200, alt: "Cohort One on the staircase with mentors, families, and the program directors" },
  { slug: "img_0578", cat: "stairs", w: 1800, h: 1200, alt: "Cohort One students holding their certificates on the staircase at Virginia Tech's Academic Building One" },
  { slug: "img_0580", cat: "stairs", w: 1800, h: 1200, alt: "Cohort One students holding their certificates on the staircase at Virginia Tech's Academic Building One" },
  { slug: "img_0582", cat: "stairs", w: 1800, h: 1200, alt: "Cohort One students holding their certificates on the staircase at Virginia Tech's Academic Building One" },
  { slug: "img_0583", cat: "stairs", w: 1800, h: 1200, alt: "Cohort One students holding their certificates on the staircase at Virginia Tech's Academic Building One" },
  { slug: "img_0606", cat: "stairs", w: 1800, h: 1200, alt: "Cohort One students holding their certificates on the staircase at Virginia Tech's Academic Building One" },
  { slug: "img_0474", cat: "stairs", w: 1800, h: 1200, alt: "The TJHSST mentor team on the staircase with Dr. Jim Egenrieder of Virginia Tech" },
  { slug: "img_0566", cat: "certificates", w: 1800, h: 1200, alt: "The program directors hand out Certificates of Achievement on the staircase" },
  { slug: "img_0569", cat: "certificates", w: 1800, h: 1200, alt: "The program directors hand out Certificates of Achievement on the staircase" },
  { slug: "img_0559", cat: "certificates", w: 1800, h: 1200, alt: "The program directors hand out Certificates of Achievement on the staircase" },
  { slug: "img_0565", cat: "certificates", w: 1800, h: 1200, alt: "The program directors hand out Certificates of Achievement on the staircase" },
  { slug: "img_0571", cat: "certificates", w: 1800, h: 1200, alt: "The program directors hand out Certificates of Achievement on the staircase" },
  { slug: "img_0572", cat: "certificates", w: 1800, h: 1200, alt: "The program directors hand out Certificates of Achievement on the staircase" },
  { slug: "img_0574", cat: "certificates", w: 1800, h: 1200, alt: "The program directors hand out Certificates of Achievement on the staircase" },
  { slug: "img_0575", cat: "certificates", w: 1800, h: 1200, alt: "The program directors hand out Certificates of Achievement on the staircase" },
  { slug: "img_0516", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0494", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0551", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0483", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0543", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0462", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0472", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0477", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0479", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0480", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0485", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0486", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0488", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0491", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0493", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0496", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0498", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0500", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0503", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0504", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0506", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0508", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0509", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0510", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0511", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0512", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0514", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0515", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0517", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0518", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0519", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0520", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0522", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0524", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0526", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0527", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0528", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0529", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0533", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0534", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0535", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0538", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0539", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0540", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0546", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0547", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0554", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0555", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0560", cat: "expo", w: 1800, h: 1200, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3073", cat: "expo", w: 1800, h: 1350, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3074", cat: "expo", w: 1800, h: 1350, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3079", cat: "expo", w: 1800, h: 1350, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3080", cat: "expo", w: 1350, h: 1800, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3083", cat: "expo", w: 1350, h: 1800, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3085", cat: "expo", w: 1350, h: 1800, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3088", cat: "expo", w: 1800, h: 1350, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3090", cat: "expo", w: 1800, h: 1350, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3091", cat: "expo", w: 1800, h: 1350, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3092", cat: "expo", w: 1350, h: 1800, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3094", cat: "expo", w: 1800, h: 1350, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3095", cat: "expo", w: 1350, h: 1800, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3096", cat: "expo", w: 1800, h: 1350, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3097", cat: "expo", w: 1800, h: 1350, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3098", cat: "expo", w: 1350, h: 1800, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3099", cat: "expo", w: 1800, h: 1350, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3100", cat: "expo", w: 1800, h: 1350, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3101", cat: "expo", w: 1350, h: 1800, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3102", cat: "expo", w: 1350, h: 1800, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3103", cat: "expo", w: 1800, h: 1350, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_3105", cat: "expo", w: 1350, h: 1800, alt: "A Cohort One student presents a research poster at the symposium expo" },
  { slug: "img_0946", cat: "guests", w: 1800, h: 1350, alt: "Dr. Jim Egenrieder, Dr. Catherine Scott, Deborah Torrico-Pardo, Dr. Andreea Sistrunk, and Dev Srivastava" },
  { slug: "img_0610", cat: "guests", w: 1800, h: 1200, alt: "Faculty and guests with the program directors at the symposium" },
  { slug: "img_0611", cat: "guests", w: 1800, h: 1200, alt: "Faculty and guests with the program directors at the symposium" },
  { slug: "img_0613", cat: "guests", w: 1800, h: 1200, alt: "Faculty and guests with the program directors at the symposium" },
  { slug: "img_0941", cat: "guests", w: 1800, h: 1350, alt: "Faculty and guests with the program directors at the symposium" },
  { slug: "img_0944", cat: "guests", w: 1800, h: 1350, alt: "Faculty and guests with the program directors at the symposium" },
  { slug: "img_0954", cat: "guests", w: 1350, h: 1800, alt: "Faculty and guests with the program directors at the symposium" },
  { slug: "img_0957", cat: "guests", w: 1350, h: 1800, alt: "Faculty and guests with the program directors at the symposium" },
  { slug: "img_0541", cat: "guests", w: 1800, h: 1200, alt: "Faculty and guests with the program directors at the symposium" },
  { slug: "img_0552", cat: "guests", w: 1800, h: 1200, alt: "Faculty and guests with the program directors at the symposium" },
  { slug: "auditorium-setup", cat: "setup", w: 1800, h: 1013, alt: "Students setting up their posters in the Boeing Auditorium before the doors opened" },
  { slug: "20260822_153343", cat: "setup", w: 1800, h: 1014, alt: "The Boeing Auditorium as the symposium gets underway" },
  { slug: "20260822_153353", cat: "setup", w: 1800, h: 1014, alt: "The Boeing Auditorium as the symposium gets underway" },
  { slug: "img_0550", cat: "setup", w: 1800, h: 1200, alt: "The Invention Virginia partner booth in the atrium" },
  { slug: "img_0557", cat: "setup", w: 1800, h: 1200, alt: "The Boeing Auditorium as the symposium gets underway" },
  { slug: "img_0558", cat: "setup", w: 1800, h: 1200, alt: "The Boeing Auditorium as the symposium gets underway" },
  { slug: "img_0561", cat: "setup", w: 1800, h: 1200, alt: "The Boeing Auditorium as the symposium gets underway" },
  { slug: "img_0562", cat: "setup", w: 1800, h: 1200, alt: "The Boeing Auditorium as the symposium gets underway" },
];

// The team's own Top 10 (Drive: Symposium Photos / Top 10 Photos), in their order.
// Captions name the research, never the student.
export const TOP_TEN = [
  { slug: "img_0601", caption: "Cohort One on the staircase at Virginia Tech's Academic Building One — students with their certificates, mentors, families, and the program directors." },
  { slug: "img_0516", caption: "A systematic review of diabetic neuropathy, explained poster-side." },
  { slug: "img_0494", caption: "Rewards, mood, and habit consistency — a study built around a habit-tracking app its sixth-grade author coded from scratch." },
  { slug: "img_0474", caption: "Dr. Jim Egenrieder of Virginia Tech opens the symposium, with the TJHSST mentor team on the stairs." },
  { slug: "img_0946", caption: "Dr. Jim Egenrieder, Dr. Catherine Scott, Deborah Torrico-Pardo, Dr. Andreea Sistrunk, and Dev Srivastava." },
  { slug: "img_0551", caption: "Adaptive therapy and cancer survival." },
  { slug: "img_0594", caption: "The program directors with Cohort One, certificates up." },
  { slug: "img_0483", caption: "Data-center cooling technologies, compared on efficiency, cost, and environmental impact." },
  { slug: "img_0543", caption: "Water filtration methods, compared for freshwater quality." },
  { slug: "auditorium-setup", caption: "Setting up in the Boeing Auditorium before the doors opened." },
].map((item) => ({
  ...item,
  ...SYMPOSIUM_PHOTOS.find((p) => p.slug === item.slug),
}));
