import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Calendar, MapPin, Mail, ChevronRight,
  Sparkles, Menu, X, ChevronDown, Clock, Users,
  BookOpen, Award, MessageCircle, ExternalLink,
  Microscope, Code, FlaskConical, Star, Rocket,
  GraduationCap, Heart, Zap, Quote,
} from "lucide-react";
import { cn } from "./lib/utils";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const IMAGE_ROOT = `${import.meta.env.BASE_URL}images/NextInResearch/optimized`;

const NAV_TABS = [
  { id: "home", label: "Our Initiative" },
  { id: "timeline", label: "Timeline" },
  { id: "team", label: "Team" },
  { id: "involved", label: "Get Involved" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

const FAQ_DATA = [
  {
    q: "Who is this program for?",
    a: "The Summer Mentorship Program is designed for middle school students of all skill levels. Whether you've never written a line of code or already have research experience, we welcome everyone who is curious and motivated to learn.",
  },
  {
    q: "Is the program free?",
    a: "Yes — 100% free. There is no cost whatsoever to participate in the Summer Mentorship Program.",
  },
  {
    q: "When and where does the program take place?",
    a: "The program runs May through August 2026. LCPS students will meet for the introduction session at the end of May in Loudoun County, and FCPS students will meet in Fairfax. Weekly workshops during Phase 2 are held at a local library (depending on your County), with 1-on-1 Zoom sessions as well. This program is hybrid, where you can work online with mentors as well as in-person.",
  },
  {
    q: "What kind of projects will students work on?",
    a: "Projects are tailored to each student's age and skill level. Beginners might build a website or conduct a plant growth experiment. Intermediate students might build an automated plant-care system or write a meta-analysis paper. Advanced students could train neural networks on medical data or conduct biochar experiments. Mentors help every student find the right fit.",
  },
  {
    q: "Who are the mentors?",
    a: "All mentors are Rising Seniors at Thomas Jefferson High School for Science and Technology (TJHSST). Each has foundational research experience — published papers, science fair placements, internships — and specializes in a different STEM field.",
  },
  {
    q: "How many students per mentor?",
    a: "Mentors work with small groups of 1–3 students, ensuring highly personalized guidance and feedback throughout the summer.",
  },
  {
    q: "Is any prior experience required?",
    a: "None at all! We do not prefer students with more experience. The goal is growth, not prior knowledge. Every student will be supported at their own level from day one.",
  },
  {
    q: "How do students and parents communicate with the program?",
    a: "Students communicate via Discord. Parents have a dedicated WhatsApp group. Program coordinators are also reachable directly by email.",
  },
  {
    q: "What is the Google Classroom for?",
    a: "The Google Classroom has optional enrichment assignments — coding courses, scientific method introductions, brainstorming exercises — for students who want a head-start. Completing them is not required but may give students an advantage when being matched with advanced mentors.",
  },
  {
    q: "What happens at the end of the program?",
    a: "By the end of Phase 3 (August), students will have a finished, shareable product. Younger students may submit to competitions or create a blog post/video. Older students may submit research papers to journals like NHSJS, JEI, or IEEE.",
  },
  {
    q: "Will there be adults present at all meetings?",
    a: "Yes. An adult will be present at every in-person meeting.",
  },
  {
    q: "How do I apply?",
    a: "Fill out the Google Form linked on the Apply page to reserve your spot. Early applications are encouraged.",
  },
];

const PHASES = [
  {
    number: "01",
    phase: "Phase 1",
    title: "Planning",
    timeline: "May – June",
    description:
      "Students complete onboarding assignments to build core skills — coding, scientific method, brainstorming — and finalize a summer project tailored to their age and skill level.",
    details: [
      "Orientation #1 at Brambleton Library · April 28th, 5:30–6:30 PM",
      "Orientation #2 in LCPS · end of May (date TBD)",
      "Orientation #3 in Fairfax · end of May (date TBD)",
      "4 Pillars: Brainstorming, Research, Skills, and Presentation",
      "Optional Google Classroom assignments for early starters",
      "Project finalized with mentor guidance by end of June",
    ],
  },
  {
    number: "02",
    phase: "Phase 2",
    title: "Building",
    timeline: "June – July",
    description:
      "Mentors host weekly in-person skill-building workshops at a local library. Students also receive weekly 1-on-1 Zoom calls for personalized feedback and guidance.",
    details: [
      "Weekly in-person workshops at a local library",
      "Weekly 1-on-1 Zoom calls with assigned mentor",
      "Family check-ins and progress updates",
      "Iterative project development with real-time feedback",
      "Mid-summer milestone check-in",
    ],
  },
  {
    number: "03",
    phase: "Phase 3",
    title: "Publishing",
    timeline: "August",
    description:
      "Mentors guide students through preparing their work for public release — competition submission, blog posts, journal papers, or presentations.",
    details: [
      "Final project polish, revision, and quality review",
      "Younger students: competition prep, blog posts, video creation",
      "Older students: research paper editing and journal submission",
      "Target publications: NHSJS, JEI, IEEE",
      "Program showcase and celebration",
    ],
  },
];

const FOUNDERS = [
  {
    name: "Dev Srivastava",
    role: "Program Coordinator / Cofounder",
    school: "TJHSST",
    interest: "Electrical Engineering + Computer Science",
    email: "devsrivastava1221@gmail.com",
    image: `${IMAGE_ROOT}/Mentor_Imgs/Dev_Srivastava.jpg`,
    initials: "DS",
  },
  {
    name: "Deborah Torrico-Pardo",
    role: "Program Coordinator / Cofounder",
    school: "TJHSST",
    interest: "Neuroscience",
    email: "ctp.deborah@gmail.com",
    image: `${IMAGE_ROOT}/Mentor_Imgs/Deborah_Torrico_Pardo.jpg`,
    initials: "DT",
  },
];

const MENTORS = [
  {
    name: "Ashwath Muppa",
    school: "TJHSST",
    interest: "Computer Science and Machine Learning",
    image: `${IMAGE_ROOT}/Mentor_Imgs/Ashwath_Muppa.jpg`,
  },
  {
    name: "Gael Sanchez-Zubieta",
    school: "TJHSST",
    interest: "Public Health",
    image: `${IMAGE_ROOT}/Mentor_Imgs/Gael_Sanchez_Zubieta.jpg`,
  },
  {
    name: "Ishaan Kar",
    school: "TJHSST",
    interest: "Finance and Consulting",
    image: `${IMAGE_ROOT}/Mentor_Imgs/Ishaan_Kar.jpg`,
  },
  {
    name: "Aashka Doshi",
    school: "TJHSST",
    interest: "Neuroscience",
    image: `${IMAGE_ROOT}/Mentor_Imgs/Aashka_Doshi.jpg`,
  },
  {
    name: "Arjun Kode",
    school: "TJHSST",
    interest: "Neuroscience",
    image: `${IMAGE_ROOT}/Mentor_Imgs/Arjun_Kode.jpg`,
  },
];

const MENTOR_SPECIALTIES = [
  "Computer Science",
  "Neuroscience",
  "Economics",
  "Biomedical Research",
  "Environmental Science",
  "Machine Learning",
  "Chemistry",
  "Physics",
];

const SMP_PHOTOS = [
  "SMP_1.jpg",
  "SMP_2.jpg",
  "SMP_3.jpg",
  "SMP_4.jpg",
  "SMP_5.jpg",
  "SMP_6.jpg",
  "SMP_7.jpg",
  "SMP_8.jpg",
  "SMP_9.jpg",
  "SMP_10.jpg",
  "SMP_11.jpg",
  "SMP_13.jpg",
].map((file) => ({
  src: `${IMAGE_ROOT}/Misc_imgs/${file}`,
  alt: "Summer Mentorship Program",
}));

const MISC_PHOTOS = [
  "Misc_1.jpg",
  "Misc_2.jpg",
  "Misc_3.jpg",
  "Misc_4.jpg",
  "Misc_5.jpg",
  "Misc_6.jpg",
  "Misc_7.jpg",
  "Misc_8.jpg",
  "Misc_9.jpg",
  "Misc_10.jpg",
  "Misc_11.jpg",
  "Misc_12.jpg",
].map((file) => ({
  src: `${IMAGE_ROOT}/Misc_imgs/${file}`,
  alt: "Mentor achievement highlight",
}));

const COMMUNITY_LINKS = [
  {
    name: "Discord",
    label: "Students",
    desc: "Join the student community server",
    href: "https://discord.gg/r8xaD9xTA",
    color: "text-[#5865F2]",
    bg: "bg-[#5865F2]/10",
    border: "border-[#5865F2]/20 hover:border-[#5865F2]/40",
  },
  {
    name: "WhatsApp",
    label: "Parents",
    desc: "Parent communication group",
    href: "https://chat.whatsapp.com/IftxgwnHhtaDYdGvQbMz22?mode=gi_t",
    color: "text-[#25D366]",
    bg: "bg-[#25D366]/10",
    border: "border-[#25D366]/20 hover:border-[#25D366]/40",
  },
  {
    name: "Google Classroom",
    label: "Phase 1",
    desc: "Optional enrichment assignments",
    href: "https://classroom.google.com/c/ODU4OTg1MjM3NzQw?cjc=ucluu7jr",
    color: "text-[#EA4335]",
    bg: "bg-[#EA4335]/10",
    border: "border-[#EA4335]/20 hover:border-[#EA4335]/40",
  },
];

// ─────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <span className="block text-xs font-bold tracking-[0.25em] uppercase text-coral mb-4">
      {children}
    </span>
  );
}

function PageHeading({ label, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="mb-16"
    >
      <SectionLabel>{label}</SectionLabel>
      <h2 className="font-display text-4xl sm:text-5xl font-bold text-ice leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-steel-blue text-lg leading-relaxed max-w-2xl">{subtitle}</p>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────

function Navigation({ activePage, setActivePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const go = (id) => {
    setActivePage(id);
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-deep-navy/95 backdrop-blur-md border-b border-white/5 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => go("home")}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-coral flex items-center justify-center shadow-coral-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-ice text-sm sm:text-base tracking-tight">
              Next In Research
            </span>
          </button>

          {/* Desktop tabs */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => go(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  activePage === tab.id
                    ? "text-coral bg-coral/10"
                    : "text-steel-blue hover:text-ice hover:bg-white/5"
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go("apply")}
              className="hidden sm:inline-flex items-center gap-2 bg-coral hover:bg-coral/90 text-white text-sm font-bold px-5 py-2 rounded-full transition-all hover:shadow-coral-sm hover:scale-105 active:scale-95"
            >
              Apply Now
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-steel-blue hover:text-ice transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-deep-navy/98 border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {NAV_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => go(tab.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    activePage === tab.id
                      ? "text-coral bg-coral/10"
                      : "text-steel-blue hover:text-ice"
                  )}
                >
                  {tab.label}
                </button>
              ))}
              <button
                onClick={() => go("apply")}
                className="w-full mt-2 bg-coral text-white font-bold py-3 rounded-xl text-sm"
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─────────────────────────────────────────────
// PHOTO CAROUSEL
// ─────────────────────────────────────────────

const SLIDES = [
  {
    gradient: "from-[#3D5A80] via-[#293241] to-[#293241]",
    label: "Hands-On Learning",
    sub: "Students build real projects with dedicated mentor guidance",
    icon: <Code className="w-14 h-14 text-[#98C1D9]/50" />,
  },
  {
    gradient: "from-[#EE6C4D]/60 via-[#3D5A80] to-[#293241]",
    label: "Research at Every Level",
    sub: "From first experiments to published papers",
    icon: <Microscope className="w-14 h-14 text-[#E0FBFC]/50" />,
  },
  {
    gradient: "from-[#293241] via-[#3D5A80]/80 to-[#3D5A80]",
    label: "Expert Mentors",
    sub: "Rising Seniors from TJHSST, one of the top STEM schools in the nation",
    icon: <GraduationCap className="w-14 h-14 text-[#E0FBFC]/50" />,
  },
  {
    gradient: "from-[#293241] via-[#3D5A80] to-[#EE6C4D]/40",
    label: "100% Free",
    sub: "Accessible STEM education for every middle schooler",
    icon: <Heart className="w-14 h-14 text-[#EE6C4D]/50" />,
  },
];

function PhotoCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setActive((p) => (p + 1) % SLIDES.length),
      4200
    );
    return () => clearInterval(id);
  }, [paused]);

  const prev = () => setActive((active - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setActive((active + 1) % SLIDES.length);

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden aspect-video sm:aspect-[2/1] lg:aspect-[16/6] shadow-2xl select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        {SLIDES.map((slide, i) =>
          i === active ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
              className={cn(
                "absolute inset-0 bg-gradient-to-br flex flex-col items-center justify-center text-center p-10",
                slide.gradient
              )}
            >
              {/* subtle noise overlay */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />
              <div className="relative mb-6 opacity-80">{slide.icon}</div>
              <h3 className="relative font-display text-2xl sm:text-4xl font-bold text-white mb-3 leading-tight">
                {slide.label}
              </h3>
              <p className="relative text-white/60 text-sm sm:text-lg max-w-md">{slide.sub}</p>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 flex gap-1 p-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative h-1 flex-1 rounded-full overflow-hidden bg-white/20"
          >
            {i === active && (
              <motion.div
                key={active}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: paused ? 0 : 4.2, ease: "linear" }}
                className="absolute inset-y-0 left-0 bg-coral rounded-full"
              />
            )}
            {i !== active && (
              <div className={cn("absolute inset-0 rounded-full", i < active ? "bg-white/50" : "")} />
            )}
          </button>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-black/50 hover:text-white transition"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-black/50 hover:text-white transition"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function ImageCarousel({ photos, label }) {
  const scrollerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const atEnd =
        scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 8;

      if (atEnd) {
        scroller.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      scroller.scrollBy({
        left: scroller.clientWidth * 0.75,
        behavior: "smooth",
      });
    }, 4200);
    return () => clearInterval(id);
  }, [paused]);

  const slide = (direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollBy({
      left: direction * scroller.clientWidth * 0.82,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03] shadow-2xl select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute left-0 inset-y-0 w-16 z-10 bg-gradient-to-r from-deep-navy/90 to-transparent pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 z-10 bg-gradient-to-l from-deep-navy/90 to-transparent pointer-events-none" />

      <div
        ref={scrollerRef}
        className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-8 py-8 sm:px-10"
      >
        {photos.map((photo, i) => (
          <figure
            key={photo.src}
            className="snap-center flex-shrink-0 w-[78vw] sm:w-[440px] lg:w-[520px]"
          >
            <div className="h-[280px] sm:h-[340px] lg:h-[400px] rounded-2xl border border-white/8 bg-deep-navy/65 p-3 flex items-center justify-center shadow-xl">
              <img
                src={photo.src}
                alt={photo.alt}
                className="max-h-full max-w-full object-contain"
                loading={i < 4 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          </figure>
        ))}
      </div>

      <div className="pointer-events-none absolute left-6 bottom-5 right-6 z-20 flex items-end justify-between gap-4">
        <div className="rounded-2xl bg-deep-navy/75 px-4 py-3 backdrop-blur-sm border border-white/8">
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-coral mb-1">
            {label}
          </p>
          <p className="font-display text-ice font-bold text-lg sm:text-xl">
            {photos.length} photos
          </p>
        </div>
      </div>

      <button
        onClick={() => slide(-1)}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 w-10 h-10 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center text-white/75 hover:bg-black/55 hover:text-white transition"
      >
        <ChevronRight className="w-5 h-5 rotate-180" />
      </button>
      <button
        onClick={() => slide(1)}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 w-10 h-10 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center text-white/75 hover:bg-black/55 hover:text-white transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// LOGO MARQUEE
// ─────────────────────────────────────────────

const LOGOS = [
  { abbr: "LCPS", full: "Loudoun County Public Schools" },
  { abbr: "FCPS", full: "Fairfax County Public Schools" },
  { abbr: "Virginia Tech", full: "Virginia Polytechnic Institute" },
  { abbr: "TJHSST", full: "Thomas Jefferson HS for S&T" },
  { abbr: "Katherine Johnson MS", full: "Katherine Johnson Middle School" },
  { abbr: "Trailside MS", full: "Trailside Middle School" },
  { abbr: "Willard MS", full: "Willard Middle School" },
  { abbr: "BASIS Independent", full: "BASIS Independent School" },
  { abbr: "Stone Hill MS", full: "Stone Hill Middle School" },
  { abbr: "Watson Mountain MS", full: "Watson Mountain Middle School" },
  { abbr: "Gum Spring MS", full: "Gum Spring Middle School" },
  { abbr: "Lakeside MS", full: "Lakeside Middle School" },
  { abbr: "Eagle Ridge MS", full: "Eagle Ridge Middle School" },
  { abbr: "Rocky Run MS", full: "Rocky Run Middle School" },
  { abbr: "Brambleton MS", full: "Brambleton Middle School" },
  { abbr: "Farmwell Station MS", full: "Farmwell Station Middle School" },
  { abbr: "Belmont Ridge MS", full: "Belmont Ridge Middle School" },
  { abbr: "Woodrow Wilson MS", full: "Woodrow Wilson Middle School" },
  { abbr: "Rachel Carson MS", full: "Rachel Carson Middle School" },
  { abbr: "Seneca Ridge MS", full: "Seneca Ridge Middle School" },
];

function LogoMarquee() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 inset-y-0 w-20 z-10 bg-gradient-to-r from-deep-navy to-transparent pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-20 z-10 bg-gradient-to-l from-deep-navy to-transparent pointer-events-none" />
      <div className="flex gap-12 animate-marquee whitespace-nowrap py-2">
        {doubled.map((logo, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-0.5 flex-shrink-0 px-8 border-r border-white/5 last:border-0"
          >
            <span className="font-display font-bold text-base text-steel-blue/60 tracking-widest">
              {logo.abbr}
            </span>
            <span className="text-[10px] text-steel-blue/30 tracking-wide">{logo.full}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────

function HomePage({ setActivePage }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      >
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-deep-navy via-mid-blue/20 to-deep-navy" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_75%_20%,_rgba(61,90,128,0.35),_transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_10%_80%,_rgba(238,108,77,0.1),_transparent)]" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #98C1D9 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
        </motion.div>

        <motion.div
          style={{ opacity: opacityHero }}
          className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full py-20"
        >
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            {/* Left text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-coral mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-coral" />
                </span>
                Summer 2026 Cohort — Now Accepting Applications
              </span>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-ice leading-[1.07] tracking-tight mb-6">
                Where Middle Schoolers{" "}
                <em className="not-italic text-coral">Do Real STEM</em>
              </h1>

              <p className="text-steel-blue text-xl leading-relaxed max-w-lg mb-10">
                A free, mentorship-driven summer program pairing middle schoolers
                with TJHSST seniors to conduct research, build projects, and
                publish their work.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setActivePage("apply")}
                  className="group inline-flex items-center gap-2 bg-coral hover:bg-coral/90 text-white font-bold px-8 py-4 rounded-full text-base transition-all hover:shadow-coral hover:scale-105 active:scale-95"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setActivePage("timeline")}
                  className="inline-flex items-center gap-2 border border-steel-blue/30 text-steel-blue hover:text-ice hover:border-ice/40 font-semibold px-8 py-4 rounded-full text-base transition-all"
                >
                  See the Timeline
                </button>
              </div>

              {/* Stats */}
              <div className="mt-14 flex flex-wrap gap-10">
                {[
                  { value: "100%", label: "Free" },
                  { value: "1–3", label: "Students per Mentor" },
                  { value: "May–Aug", label: "2026" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col border-l-2 border-coral/40 pl-4"
                  >
                    <span className="font-display text-2xl font-bold text-ice">
                      {s.value}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-steel-blue/60 mt-0.5">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right info card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="hidden lg:block"
            >
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-8 overflow-hidden shadow-2xl">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-coral/60 to-transparent" />

                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="font-display text-lg font-bold text-ice mb-1">
                      Program Details
                    </h3>
                    <p className="text-sm text-steel-blue/60">May – August 2026</p>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-coral/10 border border-coral/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-coral" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-9 h-9 rounded-xl bg-steel-blue/10 border border-steel-blue/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-steel-blue" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ice">Orientation #1</p>
                      <p className="text-sm text-steel-blue/70 mt-0.5">
                        Brambleton Library · Meeting Room A
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-9 h-9 rounded-xl bg-coral/10 border border-coral/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-coral" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ice">Date & Time</p>
                      <p className="text-sm text-steel-blue/70 mt-0.5">
                        April 28th, 2026 · 5:30–6:30 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-9 h-9 rounded-xl bg-mid-blue/20 border border-mid-blue/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-steel-blue" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ice">Format</p>
                      <p className="text-sm text-steel-blue/70 mt-0.5">
                        Virtual + In-Person · All skill levels
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/8">
                  <p className="text-sm text-steel-blue/70 leading-relaxed">
                    <span className="font-semibold text-coral">Experience required:</span>{" "}
                    None at all. We welcome every middle schooler who wants to grow.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── SMP Photo Carousel ── */}
      <section className="py-20 bg-deep-navy border-y border-white/5">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <SectionLabel>Summer Mentorship Program</SectionLabel>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ice">
              Moments from the program
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <ImageCarousel photos={SMP_PHOTOS} label="SMP Gallery" />
          </motion.div>
        </div>
      </section>

      {/* ── Photo Carousel ── */}
      <section className="py-20 bg-mid-blue/10 border-y border-white/5">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <SectionLabel>Our Program</SectionLabel>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ice">
              A summer that changes everything
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <PhotoCarousel />
          </motion.div>
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SectionLabel>The Mentorship Value</SectionLabel>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-ice leading-tight mb-6">
                Built for curious beginners and ambitious young researchers
              </h2>
              <p className="text-steel-blue text-lg leading-relaxed">
                The program balances academic rigor with supportive mentorship,
                so students can stretch into real STEM work without feeling
                overwhelmed. No experience required — just curiosity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-3"
            >
              {[
                {
                  icon: <Users className="w-4 h-4" />,
                  text: "Small groups of 1–3 students ensure deeply personalized mentorship.",
                },
                {
                  icon: <BookOpen className="w-4 h-4" />,
                  text: "Projects tailored to each student's age, skill level, and interests.",
                },
                {
                  icon: <Award className="w-4 h-4" />,
                  text: "Finish with something real — published research, a competition entry, or a live project.",
                },
                {
                  icon: <Zap className="w-4 h-4" />,
                  text: "Weekly workshops and 1-on-1 Zoom calls keep momentum all summer long.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-coral/25 hover:bg-coral/5 transition-colors group"
                >
                  <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-coral/10 text-coral flex items-center justify-center group-hover:bg-coral/20 transition-colors">
                    {item.icon}
                  </div>
                  <p className="text-steel-blue leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Logo Marquee ── */}
      <section className="py-16 border-y border-white/5 bg-mid-blue/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-[10px] font-bold tracking-[0.3em] uppercase text-steel-blue/40 mb-8"
          >
            Affiliated With &amp; Serving Students From
          </motion.p>
          <LogoMarquee />
        </div>
      </section>

      {/* ── Mentor Highlights ── */}
      <section className="py-20 bg-deep-navy">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <SectionLabel>Mentor Highlights</SectionLabel>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ice">
              What our mentors have done
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <ImageCarousel photos={MISC_PHOTOS} label="Research & Impact" />
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,_rgba(238,108,77,0.1),_transparent)]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-ice mb-6">
              Ready to start your STEM journey?
            </h2>
            <p className="text-steel-blue text-lg mb-10 max-w-md mx-auto">
              Spots are given on a rolling basis. Apply now and take the first
              step toward a summer of research, mentorship, and real-world impact.
            </p>
            <button
              onClick={() => setActivePage("apply")}
              className="group inline-flex items-center gap-2 bg-coral hover:bg-coral/90 text-white font-bold px-10 py-5 rounded-full text-lg transition-all hover:shadow-coral hover:scale-105 active:scale-95"
            >
              Apply for Summer 2026
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────
// TIMELINE PAGE
// ─────────────────────────────────────────────

function TimelinePage() {
  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <PageHeading
          label="Program Roadmap"
          title="A structured summer, built for growth"
          subtitle="Three phases take students from skill-building to publishing their finished work — with mentor support at every step."
        />

        <div className="space-y-6 mb-24">
          {PHASES.map((phase, i) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              className="group grid md:grid-cols-[180px_1fr] rounded-3xl border border-white/8 overflow-hidden hover:border-coral/30 transition-colors"
            >
              {/* Sidebar */}
              <div className="flex flex-col justify-between p-7 bg-mid-blue/15 border-b md:border-b-0 md:border-r border-white/8">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-coral">
                    {phase.phase}
                  </span>
                  <div className="font-display text-7xl font-bold text-white/8 mt-1 leading-none">
                    {phase.number}
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-[10px] text-steel-blue/50 uppercase tracking-widest mb-1">
                    Timeline
                  </p>
                  <p className="font-display font-semibold text-steel-blue text-sm">
                    {phase.timeline}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 lg:p-10">
                <h3 className="font-display text-2xl font-bold text-ice mb-3">
                  {phase.title}
                </h3>
                <p className="text-steel-blue text-base leading-relaxed mb-6">
                  {phase.description}
                </p>
                <ul className="space-y-2.5">
                  {phase.details.map((d, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-sm text-steel-blue/80"
                    >
                      <ChevronRight className="w-4 h-4 text-coral mt-0.5 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Beyond the summer */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl p-10 lg:p-14 overflow-hidden border border-coral/20 bg-gradient-to-br from-coral/8 via-mid-blue/5 to-transparent"
        >
          <div className="absolute top-6 right-6 opacity-[0.08]">
            <Rocket className="w-28 h-28 text-coral" />
          </div>
          <SectionLabel>Beyond the Summer</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ice mb-5">
            What comes after August?
          </h2>
          <div className="space-y-4 text-steel-blue text-lg leading-relaxed max-w-2xl">
            <p>
              The Summer Mentorship Program is just the beginning. As our cohort
              grows, we envision expanding to serve more school districts,
              recruiting mentors across more STEM specialties, and building a
              lasting alumni network of young researchers.
            </p>
            <p>
              Students who complete the program leave with a real publication or
              project — a competitive advantage for high school research programs,
              science fairs, and college applications — and a network of mentors
              who believe in their potential.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TEAM PAGE
// ─────────────────────────────────────────────

function TeamPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <PageHeading
          label="The Team"
          title="Built by students, for students"
          subtitle="Our program is run by Rising Seniors at Thomas Jefferson High School for Science and Technology — one of the top-ranked STEM schools in the nation."
        />

        {/* Founders */}
        <section className="mb-20">
          <h3 className="font-display text-xl font-bold text-ice/70 mb-6 pb-4 border-b border-white/8 tracking-wide uppercase text-sm">
            Program Founders
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            {FOUNDERS.map((founder, i) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group rounded-3xl border border-white/8 bg-white/[0.03] p-8 hover:border-coral/30 hover:bg-coral/5 transition-all"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full sm:w-40 h-64 sm:h-44 rounded-2xl object-cover flex-shrink-0 border border-coral/20"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-display text-xl font-bold text-ice">
                      {founder.name}
                    </h4>
                    <p className="text-coral text-sm font-semibold mt-0.5">
                      {founder.role}
                    </p>
                    <p className="text-steel-blue/50 text-xs mt-0.5">
                      {founder.school}
                    </p>
                    <p className="text-steel-blue/70 text-sm mt-2">
                      {founder.interest}
                    </p>
                  </div>
                </div>
                <a
                  href={`mailto:${founder.email}`}
                  className="inline-flex items-center gap-2 text-sm text-steel-blue/60 hover:text-coral transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {founder.email}
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mentors */}
        <section>
          <h3 className="font-display text-xl font-bold text-ice/70 mb-4 pb-4 border-b border-white/8 tracking-wide uppercase text-sm">
            Our Mentors
          </h3>
          <p className="text-steel-blue text-base leading-relaxed mb-6 max-w-2xl">
            We will have a team of 5–10 mentors, each with a distinct STEM
            specialty. Mentors are assigned to students based on alignment with
            their project interests.
          </p>

          {/* Specialty tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {MENTOR_SPECIALTIES.map((spec) => (
              <span
                key={spec}
                className="px-4 py-1.5 rounded-full border border-steel-blue/15 bg-steel-blue/5 text-steel-blue text-xs font-semibold tracking-wide"
              >
                {spec}
              </span>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {MENTORS.map((mentor, i) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden hover:border-coral/30 hover:bg-coral/5 transition-all"
              >
                <div className="h-56 sm:h-60 overflow-hidden bg-mid-blue/15">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-display text-lg font-bold text-ice">
                    {mentor.name}
                  </h4>
                  <p className="text-coral text-xs font-semibold mt-1">
                    {mentor.school}
                  </p>
                  <p className="text-steel-blue/75 text-sm mt-3 leading-relaxed">
                    {mentor.interest}
                  </p>
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: MENTORS.length * 0.06 }}
              className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[130px]"
            >
              <div className="w-10 h-10 rounded-xl border border-white/8 bg-white/4 flex items-center justify-center">
                <Star className="w-5 h-5 text-steel-blue/30" />
              </div>
              <p className="text-xs text-steel-blue/35 font-medium">
                The rest: TBD
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl border border-steel-blue/15 bg-steel-blue/5"
          >
            <p className="text-steel-blue text-sm leading-relaxed">
              <span className="font-semibold text-ice">
                Mentor profiles will be published ahead of orientation.
              </span>{" "}
              Each mentor is a Rising Senior at TJHSST with published papers,
              science fair placements, internships, or research assistant
              experience. Full profiles and specialties will be shared at the
              April 28th/May end orientation.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// GET INVOLVED PAGE
// ─────────────────────────────────────────────

function GetInvolvedPage() {
  return (
    <div className="pt-24 pb-24 min-h-[80vh] flex items-center">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-coral/10 border border-coral/20 mb-8 mx-auto">
            <Zap className="w-10 h-10 text-coral" />
          </div>
          <SectionLabel>Get Involved</SectionLabel>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-ice leading-tight mb-5">
            Something exciting
            <br />
            is on its way.
          </h1>
          <p className="text-steel-blue text-xl leading-relaxed max-w-xl mx-auto mb-3">
            This section is under construction. We're building out ways for
            volunteers, community partners, and supporters to get involved with
            the program.
          </p>
          <p className="text-steel-blue/50 text-base mb-12">
            In the meantime, reach out to us directly via the Contact page.
          </p>

          <div className="inline-flex items-center gap-2 border border-coral/30 text-coral font-semibold px-7 py-3 rounded-full text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-coral" />
            </span>
            Check Back Soon
          </div>

          <div className="mt-16 flex justify-center gap-3">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 0.7, 0.2] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
                className="h-1.5 w-8 rounded-full bg-coral/40"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FAQ PAGE
// ─────────────────────────────────────────────

function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <PageHeading
          label="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything parents and students need to know before applying."
        />

        <div className="space-y-2.5">
          {FAQ_DATA.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className={cn(
                "rounded-2xl border transition-all duration-300 overflow-hidden",
                openIndex === i
                  ? "border-coral/40 bg-coral/5"
                  : "border-white/8 bg-white/[0.02] hover:border-white/14"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between text-left px-6 py-5 gap-4"
              >
                <span
                  className={cn(
                    "font-semibold text-base leading-snug",
                    openIndex === i ? "text-coral" : "text-ice"
                  )}
                >
                  {item.q}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 flex-shrink-0 text-steel-blue/50 transition-transform duration-300",
                    openIndex === i && "rotate-180 text-coral"
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                  >
                    <p className="px-6 pb-6 text-steel-blue leading-relaxed text-sm">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CONTACT PAGE
// ─────────────────────────────────────────────

function ContactPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <PageHeading
          label="Contact"
          title="Get in Touch"
          subtitle="Questions about the program? Reach out to the coordinators directly, or join our community platforms."
        />

        {/* Coordinator cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {FOUNDERS.map((person, i) => (
            <motion.a
              key={person.name}
              href={`mailto:${person.email}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group flex flex-col rounded-3xl border border-white/8 bg-white/[0.03] p-8 hover:border-coral/35 hover:bg-coral/5 hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-coral/12 border border-coral/20 flex items-center justify-center font-display font-bold text-xl text-coral mb-5">
                {person.initials}
              </div>
              <h3 className="font-display text-xl font-bold text-ice mb-0.5">
                {person.name}
              </h3>
              <p className="text-coral text-sm font-semibold mb-4">
                {person.role}
              </p>
              <div className="flex items-center gap-2 text-steel-blue/60 group-hover:text-coral transition-colors mt-auto">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{person.email}</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Community platforms */}
        <h3 className="font-display text-base font-bold text-ice/60 uppercase tracking-widest mb-5">
          Community Platforms
        </h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {COMMUNITY_LINKS.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "flex flex-col gap-3 rounded-2xl border p-6 transition-all hover:-translate-y-1",
                link.bg,
                link.border
              )}
            >
              <div className="flex items-center justify-between">
                <ExternalLink className={cn("w-4 h-4", link.color)} />
                <span className={cn("text-[10px] font-bold tracking-widest uppercase", link.color)}>
                  {link.label}
                </span>
              </div>
              <div>
                <p className={cn("font-bold text-sm", link.color)}>{link.name}</p>
                <p className="text-steel-blue/60 text-xs mt-0.5">{link.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Orientation card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-coral/20 bg-coral/5 p-8 flex flex-col sm:flex-row gap-5 items-start"
        >
          <div className="w-12 h-12 rounded-2xl bg-coral/15 border border-coral/20 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6 text-coral" />
          </div>
          <div>
            <h4 className="font-display text-lg font-bold text-ice mb-2">
              Orientation #1
            </h4>
            <p className="text-steel-blue text-sm mb-1">
              <span className="font-semibold text-ice">When:</span> Tuesday,
              April 28th, 2026 · 5:30–6:30 PM
            </p>
            <p className="text-steel-blue text-sm">
              <span className="font-semibold text-ice">Where:</span> Brambleton
              Library · Meeting Room A
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// APPLY PAGE
// ─────────────────────────────────────────────

function ApplyPage() {
  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-coral/10 border border-coral/20 mb-8 mx-auto">
            <Rocket className="w-10 h-10 text-coral" />
          </div>
          <SectionLabel>Apply</SectionLabel>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-ice leading-tight mb-4">
            Join Summer 2026
          </h1>
          <p className="text-steel-blue text-xl leading-relaxed mb-10 max-w-lg mx-auto">
            Fill out the application to reserve your spot. Early applications
            are encouraged.
          </p>

          <a
            href="https://forms.gle/JDvYsDrCmgJsgCLA8"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 bg-coral hover:bg-coral/90 text-white font-bold px-10 py-5 rounded-full text-lg transition-all hover:shadow-coral hover:scale-105 active:scale-95 mb-4"
          >
            Open Application Form
            <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>

          <p className="text-steel-blue/40 text-sm mb-16">
            Opens in a new tab · Google Forms · Free to apply
          </p>

          {/* Steps */}
          <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-8 text-left">
            <h3 className="font-display text-xl font-bold text-ice mb-6">
              What happens after you apply?
            </h3>
            <div className="space-y-5">
              {[
                "Your application is reviewed by the program coordinators.",
                "You'll receive a confirmation email (within 24 hours) with next steps and orientation details.",
                "Attend Orientation #2 on April 28th in LCPS or FCPS (depending on location) to officially join.",
                "Get matched with a mentor based on your interests and skill level.",
                "Begin your STEM journey — skill-building, project work, and mentorship all summer.",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-coral/12 border border-coral/25 flex items-center justify-center text-xs font-bold text-coral flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-steel-blue text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────

function Footer({ setActivePage }) {
  return (
    <footer className="border-t border-white/5 bg-deep-navy py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-coral flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-ice text-sm">
              Next In Research
            </span>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center">
            {NAV_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePage(tab.id)}
                className="text-sm text-steel-blue/50 hover:text-coral transition-colors"
              >
                {tab.label}
              </button>
            ))}
            <button
              onClick={() => setActivePage("apply")}
              className="text-sm text-steel-blue/50 hover:text-coral transition-colors"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-steel-blue/30">
            © {new Date().getFullYear()} Next In Research · All rights reserved.
          </p>
          <p className="text-xs text-steel-blue/30">
            Thomas Jefferson High School for Science and Technology
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────

export default function App() {
  const [activePage, setActivePage] = useState("home");

  const navigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-deep-navy font-body text-steel-blue overflow-x-hidden">
      <Navigation activePage={activePage} setActivePage={navigate} />

      <AnimatePresence mode="wait">
        <motion.main
          key={activePage}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {activePage === "home" && <HomePage setActivePage={navigate} />}
          {activePage === "timeline" && <TimelinePage />}
          {activePage === "team" && <TeamPage />}
          {activePage === "involved" && <GetInvolvedPage />}
          {activePage === "faq" && <FAQPage />}
          {activePage === "contact" && <ContactPage />}
          {activePage === "apply" && <ApplyPage />}
        </motion.main>
      </AnimatePresence>

      <Footer setActivePage={navigate} />
    </div>
  );
}
