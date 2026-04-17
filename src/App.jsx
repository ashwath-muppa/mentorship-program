import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Code, FlaskConical, Target, Quote, Mail, ChevronRight, Clock, Sparkles } from "lucide-react";
import { cn } from "./lib/utils";

const timeline = [
  {
    phase: "Phase 1",
    title: "Planning (May - June)",
    description:
      "Students complete onboarding assignments to build core skills (e.g., coding, scientific method) and finalize a summer project tailored to their age and skill level.",
  },
  {
    phase: "Phase 2",
    title: "Building (June - July)",
    description:
      "Mentors host weekly in-person skill-building workshops at a local library. Students also receive weekly 1-on-1 Zoom calls for personalized feedback and guidance.",
  },
  {
    phase: "Phase 3",
    title: "Publishing (August)",
    description:
      "Mentors guide students through the final steps of preparing their work for public release, whether that means submitting to a journal, creating a blog post, or entering a competition.",
  },
];

const projects = [
  {
    level: "Beginner",
    badgeColor: "text-brand-teal",
    bgBadge: "bg-brand-teal/10",
    borderGlow: "hover:border-brand-teal/50 hover:shadow-neonTeal",
    icon: <Code className="w-6 h-6 text-brand-teal" />,
    examples: [
      "Learn HTML/CSS/JS to code a website for a local business",
      "Design a plant growth experiment learning about IV/DV/Constants.",
    ],
  },
  {
    level: "Intermediate",
    badgeColor: "text-brand-gold",
    bgBadge: "bg-brand-gold/10",
    borderGlow: "hover:border-brand-gold/50 hover:shadow-neonGold",
    icon: <Target className="w-6 h-6 text-brand-gold" />,
    examples: [
      "Build an automated plant-care system using a Raspberry Pi",
      "Write a Meta-Analysis research paper on scientific topics like cancer treatments.",
    ],
  },
  {
    level: "Advanced",
    badgeColor: "text-brand-purple",
    bgBadge: "bg-brand-purple/10",
    borderGlow: "hover:border-brand-purple/50 hover:shadow-neonPurple",
    icon: <FlaskConical className="w-6 h-6 text-brand-purple" />,
    examples: [
      "Train Convolutional Neural Networks on medical data to classify brain tumors",
      "Experiment with how Biochar reduces heavy metal water contamination.",
    ],
  },
];

const stats = [
  { label: "Program Cost", value: "100% Free" },
  { label: "Learning Format", value: "Virtual + In-Person" },
  { label: "Mentor Group Size", value: "1-3 Students" },
];

const contacts = [
  {
    name: "Dev Srivastava",
    email: "devsrivastaval221@gmail.com",
  },
  {
    name: "Deborah Torrico-Pardo",
    email: "ctp.deborah@gmail.com",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

function SectionHeading({ eyebrow, title, description, dark = false }) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="max-w-3xl mb-12 sm:mb-16"
    >
      <span className="inline-block py-1 px-3 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-sm font-semibold tracking-widest uppercase mb-6">
        {eyebrow}
      </span>
      <h2 className={cn("text-4xl sm:text-5xl font-display font-bold tracking-tight mb-6", dark ? "text-white" : "text-slate-100")}>
        {title}
      </h2>
      {description && (
        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default function App() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-brand-navy font-body text-slate-200 overflow-x-hidden selection:bg-brand-teal/30 selection:text-white">
      {/* Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 backdrop-blur-md bg-transparent border-b border-white/5"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-teal" /> STEM Mentorship
            </span>
          </div>
          <a
            href="https://forms.gle/JDvYsDrCmgJsgCLA8"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-brand-navy bg-white/90 hover:bg-white hover:shadow-neonTeal transition-all hover:scale-105 active:scale-95"
          >
            Apply Now
          </a>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-10 pb-12 overflow-hidden -mt-[81px]">
        {/* Parallax Background */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(13,245,212,0.15),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(157,78,221,0.1),_transparent_40%),linear-gradient(180deg,_rgba(4,11,22,0.7),_rgba(11,15,25,1))]" />
          <div className="absolute inset-0 bg-grid opacity-[0.15]" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <motion.div style={{ opacity: opacityText }} className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-8 items-center pt-16">

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-2xl">
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-sm font-semibold tracking-wide mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple"></span>
                </span>
                Summer 2026 Cohort
              </motion.div>

              <motion.h1 variants={fadeIn} className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                Summer Mentorship <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-purple">Program</span>
              </motion.h1>

              <motion.p variants={fadeIn} className="mt-8 text-xl text-slate-400 leading-relaxed max-w-xl">
                An opportunity for middle schoolers to learn and participate in
                high-school level STEM research, competitions, and project-based
                learning.
              </motion.p>

              <motion.div variants={fadeIn} className="mt-10 flex flex-wrap gap-6 items-center">
                <a
                  href="https://forms.gle/JDvYsDrCmgJsgCLA8"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center justify-center rounded-full bg-brand-teal px-8 py-4 text-base font-bold text-brand-navy shadow-[0_0_20px_rgba(13,245,212,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(13,245,212,0.6)]"
                >
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>

              <motion.div variants={fadeIn} className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col border-l-2 border-brand-teal/20 pl-4 py-2">
                    <span className="text-2xl font-bold text-white tracking-tight">{stat.value}</span>
                    <span className="text-sm text-slate-500 uppercase tracking-wider mt-1">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Asymmetric Side Card */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="relative hidden lg:block perspective-1000"
            >
              <div className="absolute inset-0 bg-brand-teal/20 blur-3xl rounded-full opacity-40 scale-110" />
              <div className="relative glass-panel rounded-3xl p-8 overflow-hidden shadow-soft border-white/5">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-teal via-brand-purple to-brand-gold opacity-80" />

                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white mb-2">Program Details</h3>
                    <p className="text-sm text-slate-400">May - August 2026</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-brand-teal" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-brand-gold/10 p-2.5 rounded-xl border border-brand-gold/10">
                      <MapPin className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Orientation</p>
                      <p className="text-sm text-slate-400 mt-1">Brambleton Library<br />(Meeting Room A)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-brand-purple/10 p-2.5 rounded-xl border border-brand-purple/10">
                      <Clock className="w-5 h-5 text-brand-purple" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Date & Time</p>
                      <p className="text-sm text-slate-400 mt-1">April 28th, 2026<br />5:30 - 6:30 PM</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-sm leading-relaxed text-slate-300">
                    <span className="font-semibold text-brand-teal">Experience Level:</span> Absolutely none required! We welcome students of all skill levels.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why families choose this program */}
      <section className="relative py-24 bg-brand-ink/50 border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(13,245,212,0.05),_transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <SectionHeading
                eyebrow="The Mentorship Value"
                title="Built for curious beginners & ambitious young researchers"
                description="The program balances academic rigor with supportive mentorship, so students can stretch into real STEM work without feeling overwhelmed."
              />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4"
            >
              {[
                "Structured mentorship that makes advanced STEM approachable for middle school students.",
                "Weekly touchpoints that keep students supported, accountable, and excited to build.",
                "Projects designed to feel meaningful, polished, and ready to share publicly.",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  whileHover={{ x: 10 }}
                  className="flex gap-6 rounded-2xl glass-panel p-6 shadow-sm border border-white/5 hover:border-brand-teal/30 hover:bg-white/10 transition-colors cursor-default"
                >
                  <div className="mt-1 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-brand-teal/10 text-brand-teal border border-brand-teal/20">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                  <p className="text-lg leading-relaxed text-slate-300">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap / Timeline (Bento Layout) */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title="A summer roadmap with clear milestones"
            description="Students move from skill-building to project execution to final publication with support at every step."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {timeline.map((item, index) => (
              <motion.article
                key={item.phase}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className={cn(
                  "group relative glass-panel rounded-3xl p-8 lg:p-10 overflow-hidden transition-all duration-300",
                  "hover:border-white/20 hover:shadow-2xl hover:shadow-brand-purple/20 bg-white/[0.03]",
                  index === 2 && "md:col-span-2 lg:col-span-1"
                )}
              >
                <div className="absolute -top-6 -right-4 p-8 opacity-5 font-display text-9xl font-bold text-white transition-all group-hover:opacity-10 group-hover:-top-8 group-hover:-right-6 pointer-events-none">
                  0{index + 1}
                </div>

                <h3 className="font-display text-sm uppercase tracking-[0.25em] text-brand-teal font-semibold">
                  {item.phase}
                </h3>
                <h4 className="mt-4 font-display text-2xl font-bold text-white leading-tight">
                  {item.title}
                </h4>

                <p className="mt-6 text-lg leading-relaxed text-slate-400 relative z-10">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Gallery (Bento Layout) */}
      <section className="relative py-32 bg-brand-ink/40 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Sample Projects"
            title="Build at the level that fits you best"
            description="Each project path is designed to feel challenging, exciting, and achievable with mentor guidance."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, index) => (
              <motion.article
                key={project.level}
                variants={fadeIn}
                whileHover={{ y: -8 }}
                className={cn(
                  "group relative flex flex-col rounded-[2.5rem] p-8 glass-panel bg-white/[0.02] overflow-hidden transition-all duration-300 cursor-default",
                  project.borderGlow,
                  index === 0 && "md:col-span-2 lg:col-span-1"
                )}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={cn("p-4 rounded-2xl", project.bgBadge)}>
                    {project.icon}
                  </div>
                  <span className={cn("text-lg font-bold font-display uppercase tracking-widest", project.badgeColor)}>
                    {project.level}
                  </span>
                </div>

                <div className="space-y-4 flex-1">
                  {project.examples.map((example, idx) => (
                    <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-slate-500 shrink-0" />
                      <p className="text-base text-slate-300 leading-relaxed">
                        {example}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mentors / Achievements */}
      <section className="relative py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative glass-panel bg-white/[0.03] rounded-[3rem] p-10 md:p-14 overflow-hidden border-white/10 group hover:border-brand-teal/40 transition-colors"
            >
              <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-brand-teal to-brand-purple opacity-[0.15]" />
              </div>
              <SectionHeading
                eyebrow="Meet The Mentors"
                title="A small-group model with highly qualified mentors"
                description="Mentors oversee groups of 1-3 students. Each mentor is a Rising Senior at Thomas Jefferson High School for Science and Technology (TJHSST) with extensive foundational research and competition experience. An adult will be present at every in-person meeting."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-[3rem] p-10 md:p-12 border border-dashed border-slate-700 bg-brand-ink/30 backdrop-blur-sm overflow-hidden"
            >
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-brand-gold/10 text-brand-gold mb-6 border border-brand-gold/20">
                <Quote className="w-6 h-6" />
              </div>
              <h3 className="font-display text-3xl font-semibold text-white mb-4">
                Add your combined accomplishments here
              </h3>
              <p className="text-lg leading-relaxed text-slate-400 mb-10">
                This area is ready for awards, publications, competition results,
                research labs, leadership roles, or other credibility markers you
                want parents to see.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Research experience",
                  "Competition placements",
                  "Publications or presentations",
                  "Leadership and teaching roles",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/5 p-4 text-sm font-semibold text-slate-200"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 bg-brand-ink/50 pt-20 pb-12 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
                Questions before orientation?
              </h2>
              <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
                Parents are welcome to reach out to the program coordinators below.
                General program communication will be held on a community
                platform like Discord.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {contacts.map((contact) => (
                <motion.a
                  key={contact.email}
                  variants={fadeIn}
                  href={`mailto:${contact.email}`}
                  className="group flex flex-col justify-center rounded-[2rem] border border-white/10 bg-white/5 p-8 transition-all hover:border-brand-teal/40 hover:bg-brand-teal/5 hover:-translate-y-1"
                >
                  <Mail className="w-8 h-8 text-slate-500 group-hover:text-brand-teal transition-colors mb-4" />
                  <p className="font-display text-xl font-bold text-white mb-2">
                    {contact.name}
                  </p>
                  <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors break-all">
                    {contact.email}
                  </p>
                </motion.a>
              ))}
            </motion.div>
          </div>

          <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500 font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-teal" /> STEM Mentorship
            </p>
            <p className="text-sm text-slate-600">
              © {new Date().getFullYear()} Mentorship Program. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
