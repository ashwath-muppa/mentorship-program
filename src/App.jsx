import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Calendar, MapPin, Mail, ChevronRight,
  Sparkles, Menu, X, ChevronDown, Clock, Users,
  BookOpen, Award, MessageCircle, ExternalLink,
  Microscope, Code, FlaskConical, Star, Rocket,
  GraduationCap, Heart, Zap, Quote, Filter,
  CalendarDays, FileText, ShieldCheck, Target,
  TrendingUp, Presentation, Beaker, Link2, Lightbulb,
  Globe, Building2, Trophy, Compass, UserCheck, Construction,
} from "lucide-react";
import { cn } from "./lib/utils";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const IMAGE_ROOT = `${import.meta.env.BASE_URL}images/NextInResearch/optimized`;
const WORKSHOP_ROOT = `${import.meta.env.BASE_URL}images/NextInResearch/workshops`;

// Route table — each tab maps to a real URL path.
const NAV_TABS = [
  { id: "home", path: "/", label: "Our Initiative" },
  { id: "timeline", path: "/timeline", label: "Timeline" },
  { id: "team", path: "/team", label: "Team" },
  { id: "schedule", path: "/schedule", label: "Schedule" },
  { id: "workshops", path: "/workshops", label: "Workshops" },
  { id: "students", path: "/students", label: "Our Students" },
  { id: "involved", path: "/getinvolved", label: "Get Involved" },
  { id: "faq", path: "/faq", label: "FAQ" },
  { id: "contact", path: "/contact", label: "Contact" },
];

// Additional routes not shown as primary tabs + path aliases.
const EXTRA_ROUTES = [{ id: "apply", path: "/apply" }];
const PATH_ALIASES = {
  "/home": "home",
  "/summerschedule": "schedule",
  "/team-and-mentors": "team",
};

const ALL_ROUTES = [...NAV_TABS, ...EXTRA_ROUTES];

function pathToPage(pathname) {
  const clean = (pathname || "/").replace(/\/+$/, "") || "/";
  if (PATH_ALIASES[clean]) return PATH_ALIASES[clean];
  const match = ALL_ROUTES.find((r) => r.path === clean);
  return match ? match.id : "home";
}

function pageToPath(id) {
  const match = ALL_ROUTES.find((r) => r.id === id);
  return match ? match.path : "/";
}

const FAQ_DATA = [
  {
    q: "Who is this program for?",
    a: "Next In Research is designed for middle school students of all skill levels. Whether you've never written a line of code or already have research experience, we welcome everyone who is curious and motivated to learn.",
  },
  {
    q: "Is the program free?",
    a: "Yes — 100% free. There is no cost whatsoever to participate in Next In Research.",
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
    a: "All mentors are students at Thomas Jefferson High School for Science and Technology (TJHSST). Each has foundational research experience — published papers, science fair placements, internships — and specializes in a different STEM field.",
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
    a: "Parents and guardians reach out to the program coordinators directly by email. Once you've connected with us, we'll personally share access to our private student and parent communication channels — for everyone's safety, those invite links are never posted publicly on this website.",
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

const MENTOR_IMG = (file) => `${IMAGE_ROOT}/Mentor_Imgs/${file}`;
const DEFAULT_POS = "50% 25%";

// Mentor roster — bios sourced from the mentor intake form (Summer 2026 cohort).
const MENTORS = [
  {
    name: "Ashwath Muppa",
    grade: "Rising Senior",
    focus: "Machine Learning & Mathematical Modeling",
    bio: "Hey everyone, my name is Ashwath Muppa and I'm a Rising Senior at TJ! I'm really passionate about machine learning and mathematical modeling, and in high school, I've worked on research ranging from mobile hand tremor classification to collaborative STEM applications. My favorite subjects are Computer Science and Math, and in my free time, I love playing strategic games, hitting the gym, and playing pickleball with my friends!",
    image: MENTOR_IMG("Ashwath_Muppa.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Gael Sanchez-Zubieta",
    grade: "Rising Senior",
    focus: "Public Health & Neuroscience",
    bio: "Hi! My name is Gael Sanchez-Zubieta and I'm a rising senior at TJ! I'm extremely passionate about Public Health (especially policy!), Neuroscience, Biology, & Chemistry. I've done a variety of projects in these fields such as research on the biodegradability of plant-based plastics, written a paper on the role of the hippocampus on amnesia, and am currently beginning a biorisk cost-benefit analysis research project. Some of my favorite subjects are DNA Science and Neurobiology. In my free time I enjoy cooking, baking, and inventing new coffee recipes!",
    image: MENTOR_IMG("Gael_Sanchez_Zubieta.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Ishaan Kar",
    grade: "Rising Senior",
    focus: "Business, Finance & Entrepreneurship",
    bio: "Hey everyone, my name is Ishaan Kar and I'm a rising senior at TJ! I'm really passionate about business, entrepreneurship, and finance, and in high school I've worked on projects ranging from market trend analysis to earnings call research. My favorite subjects are math and statistics, and in my free time I like going to the gym, eating, and playing sports!",
    image: MENTOR_IMG("Ishaan_Kar.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Arjun Kode",
    grade: "Rising Senior",
    focus: "Computational Neuroscience & Chemistry",
    bio: "Hey everyone, my name is Arjun and I'm a student at TJ! I'm really passionate about computational research, especially in neuroscience and chemistry. I've worked on projects ranging from analyzing mouse ultrasonic vocalizations to studying air pollution's effects on the brain. My favorite subjects are AP Chemistry and AP Biology and in my free time I enjoy playing sports with my friends.",
    image: MENTOR_IMG("Arjun_Kode.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Aashka Doshi",
    grade: "Rising Senior",
    focus: "Neuroscience",
    bio: "Hey everyone, my name is Aashka Doshi, and I am a rising senior at TJHSST! I am really interested in Neuroscience, and plan to major in it in college. I have conducted research in the past concerning water filtration methods and explored different lab skills in doing so. Outside of school, I love to read, get Chipotle, and hang out with my friends!",
    image: MENTOR_IMG("Aashka_Doshi.jpg"),
    pos: "50% 22%",
  },
  {
    name: "Diana Soltani",
    grade: "Rising Sophomore",
    focus: "Neuroscience & AI in Medicine",
    bio: "Hi, my name is Diana Soltani and I'm a Rising Sophomore at TJHSST! My favorite extracurriculars range from the Neuroscience Brain Bee, Live-Action Acting, International Congressional Debate, to projects concerning MRI development using AI. A fun fact about me is that I've never used a microwave in my life!",
    image: MENTOR_IMG("Diana_Soltani.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Tanya Chavan",
    grade: "Rising Junior",
    focus: "Engineering & Humanities",
    bio: "Hi!! I'm Tanya Chavan, and I'm a rising junior at TJ. I love the humanities; I compete in debate, Mock Trial, and MUN about a wide range of topics ranging from scientific to moral and ethical issues. I also love engineering, specifically CAD, woodwork, and assembly. In my free time, I love to assemble 3D wooden models, hang out with my friends, and listen to music.",
    image: MENTOR_IMG("Tanya_Chavan.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Kalkidan Amare",
    grade: "Rising Junior",
    focus: "Engineering & Chemistry",
    bio: "Hi all, my name is Kalkidan Amare and I'm a rising junior at TJ! I'm excited to work with students who want to pursue STEM research this summer as a student who is also interested in engineering and chemistry. I have always been curious about how technology works as I have taken many programming classes, I love reading mystery books, and enjoy playing soccer!",
    image: MENTOR_IMG("Kalkidan_Amare.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Emma Zurine",
    grade: "Rising Senior",
    focus: "Engineering & Public Policy",
    bio: "Hi! My name is Emma Zurine and I'm a rising senior at TJ! My main interests include engineering and public policy, especially projects involving robotics, sustainability, and space-related technology. I've had the chance to work on projects ranging from EV battery optimization to flood detection systems, and I'm always excited to explore new fields and ideas. Outside of school, you can usually find me singing or listening to music, trying new restaurants and cafes, playing volleyball, or spending time with friends and family!",
    image: MENTOR_IMG("Emma_Zurine.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Vishnuvardhini Arul Palaniraj",
    grade: "Rising Sophomore",
    focus: "Medical Science, Cancer Research & AI",
    bio: "Hi everyone, my name is Vishnuvardhini Arul Palaniraj, and I am a rising sophomore at TJ! I have done numerous projects over the years for science fairs and other research, specializing in medical sciences, cancer research and AI. I love to dance, practice MMA, try new food, and read dystopian or sci-fi books in my free time!",
    image: MENTOR_IMG("Vishnuvardhini_Arul_Palaniraj.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Yogan Mahesh",
    grade: "Rising Junior",
    focus: "Biology & Chemistry",
    bio: "Hello, my name is Yogan Mahesh, and I am a rising junior at TJHSST. I am interested in Biology and Chemistry, and have done various projects and labs relating to both fields, including gel electrophoresis and fly experimentation. Other than science, I am passionate about music, and I am currently an active member of my school's band program.",
    image: MENTOR_IMG("Yogan_Mahesh.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Tristan Raffo",
    grade: "Rising Senior",
    focus: "Economics & Public Policy",
    bio: "Hi! My name is Tristan Raffo, and I'm a rising Senior at TJ! I love Economics and Public Policy, and I've done research which includes work on tax systems as well as on AI behavior in cooperative games. Outside of school, I enjoy cooking (and eating...), playing soccer, learning new things, and collecting perfume!",
    image: MENTOR_IMG("Tristan_Raffo.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Kossara Tabakova",
    grade: "Rising Junior",
    focus: "Medicine, Biology & Mathematics",
    bio: "Hi! I'm Kossara Tabakova, and I'm a rising junior at TJHSST! My interests lie in the fields of medicine, biology, and mathematics, and I have completed projects in the medical and biological fields by combining the use of computer science and mathematical models and their real-world applications. My favorite subjects are math and biology, and in my free time I love playing the violin and the piano, solving problems, and teaching taekwondo.",
    image: MENTOR_IMG("Kossara_Tabakova.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Mahrukh Kiyani",
    grade: "Rising Senior",
    focus: "Chemistry & DNA Science",
    bio: "Hi! My name is Kiyani and I'm a Rising Senior. I'm really interested in hands-on laboratory sciences, like Chemistry and DNA Science, and hope to help other people express their interest in them too! In my free time I volunteer at my local hospital, read, watercolor, and go out for forestry walks!",
    image: MENTOR_IMG("Mahrukh_Kiyani.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Rhea Desai",
    grade: "Rising Sophomore",
    focus: "Environmental Science",
    bio: "Hey, my name is Rhea Desai and I'm a rising sophomore at TJ. In the past, I have done a wide range of projects, such as how nitrate concentrations affect aquatic organisms and scientific papers. I enjoy English and History, and I love to play soccer and hang out with my friends!",
    image: MENTOR_IMG("Rhea_Desai.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Shritha Adapala",
    grade: "Rising Junior",
    focus: "Neuroscience & Biomechanics",
    bio: "Hi, my name is Shritha Adapala and I'm a rising junior at TJ! I love everything biology related, especially neuroscience and biomechanics. I've done some projects in fields like tissue engineering, skin cancer, and neurodegenerative diseases. I'm also part of the tennis team and in my free time, I love playing the violin, watching movies, and sleeping!",
    image: MENTOR_IMG("Shritha_Adapala.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Juwon Kim",
    grade: "Rising Sophomore",
    focus: "Biomedical Engineering & Biotechnology",
    bio: "Hi everyone! My name is Juwon Kim and I'm a rising Sophomore at TJ. As a member of TJ's Science Olympiad team, I have had the opportunity to explore so many different areas of science, and now I am planning on specializing in Biomedical Engineering and Biotechnology through independent research. Outside of all of that though, I love making cinematic videos, organizing class-wide events, and playing Roblox and Minecraft!",
    image: MENTOR_IMG("Juwon_Kim.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Fatma Hidara",
    grade: "Rising Junior",
    focus: "Epidemiology & Medicine",
    bio: "Hello! I'm Fatma Hidara, a rising junior at TJ. I love listening to music, watching new TV shows, and traveling. As a fun fact, I have Moroccan heritage, so Morocco is my most frequent destination, and this summer will mark my 14th trip there! I'm passionate about biology, especially epidemiology and medicine, and I look forward to diving even deeper into the fields during my remaining years at TJ.",
    image: MENTOR_IMG("Fatma_Hidara.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Rabiha Junaid",
    grade: "Rising Senior",
    focus: "Social Research (YPAR)",
    bio: "Hi! My name is Rabiha and I'm about to enter my last year of high school! I love exploring new things, drawing, learning, and reading. Recently I've been doing a YPAR research project and teaching weekend school at my local Mosque. Idealistically I would like to work on a self-improvement journey and learn more about my all-encompassing religion, Islam.",
    image: MENTOR_IMG("Rabiha_Junaid.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Yuthee Thota",
    grade: "Rising Junior",
    focus: "Engineering & CAD",
    bio: "Hi! I'm Yuthee Thota, a rising junior at TJHSST with a passion for engineering and hands-on projects. I've worked on projects ranging from woodworking builds and gearbox design to chassis construction, TSA competitions, and even creating miniature dollhouses. Outside of engineering, I like CAD, gardening, baking, and swimming.",
    image: MENTOR_IMG("Yuthee_Thota.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Avni Khare",
    grade: "Rising Junior",
    focus: "AI & Competitive Programming",
    bio: "Hi everyone, my name is Avni Khare and I'm a Rising Junior at TJ! I'm really interested in AI development and competitive programming, and I've done competitions since middle school. My favorite subjects are CS and Economics, and I like dancing, playing piano, and doing puzzles in my free time.",
    image: MENTOR_IMG("Avni_Khare.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Ava Liu",
    grade: "Rising Senior",
    focus: "Bioinformatics & Neuroscience",
    bio: "Hi, I'm Ava and I'm a rising senior at TJ. I love anything biology, especially bioinformatics and neuroscience, and I've done research projects on neurodegenerative diseases using computer science and data analysis techniques. My favorite subject is Biology (obviously) and in my free time I love baking, reading, and going out with friends!",
    image: MENTOR_IMG("Ava_Liu.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Kedar Kalluri",
    grade: "Rising Junior",
    focus: "Aerospace & Mechanical Engineering",
    bio: "Hello! My name is Kedar Kalluri and I am a rising Junior in TJ. I am mainly interested in aerospace, electrical, and mechanical engineering. I like biking, playing the guitar, and drawing.",
    image: MENTOR_IMG("Kedar_Kalluri.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Armaan Bajwa",
    grade: "Rising Sophomore",
    focus: "Chemistry & Engineering",
    bio: "Hey everyone, my name is Armaan Bajwa and I'm a rising sophomore at TJ! I'm really interested in chemistry and engineering, and I love getting hands-on with projects whether it's building something with my friends or crafting. In my free time I play basketball, hang out with my friends, and make things.",
    image: MENTOR_IMG("Armaan_Bajwa.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Bhavesh Adivi",
    grade: "Rising Junior",
    focus: "Oncology & Omics Data / AI",
    bio: "Hey, I'm Bhavesh Adivi, a rising junior at TJ and I'm really interested in oncology, tumor dynamics, and omics data analysis. I've done projects related to artificial intelligence, computer vision, and predictive modeling for cancer, as well as cognitive impairment tracking. In my free time, I love to code, play chess, and build something new!",
    image: MENTOR_IMG("Bhavesh_Adivi.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Kate Russell",
    grade: "Rising Junior",
    focus: "Biochemistry",
    bio: "Kate Russell is a rising junior at TJ who is interested in biochemistry. In her free time, she enjoys reading, creative writing, and taking walks outside!",
    image: MENTOR_IMG("Kate_Russell.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Prisha Hasija",
    grade: "Rising Sophomore",
    focus: "Engineering & Astronomy",
    bio: "Hi! I'm Prisha Hasija, a rising sophomore at TJ. I'm especially interested in engineering, astronomy, and exploring how they can be applied to solve real-world problems. Through robotics and astronomy clubs here at TJ, I've had the opportunity to explore these passions, and I'm always excited to learn something new! Outside of academics, I enjoy reading, baking, and crocheting.",
    image: MENTOR_IMG("Prisha_Hasija.jpg"),
    pos: DEFAULT_POS,
  },
];

const MENTOR_SPECIALTIES = [
  "Computer Science & ML",
  "Neuroscience",
  "Public Health & Policy",
  "Biology & Chemistry",
  "Biomedical Engineering",
  "Bioinformatics",
  "Aerospace & Mechanical Eng.",
  "Economics & Finance",
  "Cancer Research",
  "Mathematics",
  "Environmental Science",
  "Astronomy",
];

const GRADE_FILTERS = [
  { id: "All", label: "All Mentors" },
  { id: "Rising Senior", label: "Rising Seniors" },
  { id: "Rising Junior", label: "Rising Juniors" },
  { id: "Rising Sophomore", label: "Rising Sophomores" },
];

const GRADE_ORDER = ["Rising Senior", "Rising Junior", "Rising Sophomore"];

function gradeRank(grade) {
  const rank = GRADE_ORDER.indexOf(grade);
  return rank === -1 ? GRADE_ORDER.length : rank;
}

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
  alt: "Next In Research",
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

// Community links — student Discord and parent WhatsApp are intentionally
// NOT listed here for safety. Parents reach out by email first and receive
// invite links directly after contact.
const COMMUNITY_LINKS = [
  {
    name: "Google Classroom",
    href: "https://classroom.google.com/c/ODU4OTg1MjM3NzQw?cjc=ucluu7jr",
    color: "text-[#EA4335]",
    bg: "bg-[#EA4335]/10",
    border: "border-[#EA4335]/20 hover:border-[#EA4335]/40",
  },
];

// ── Summer 2026 workshop schedule ──
const ASHBURN = {
  name: "Ashburn Library",
  room: "Meeting Rooms A + B + C",
  address: "43316 Hay Road, Ashburn, VA 20147",
};
const BRAMBLETON = {
  name: "Brambleton Library",
  room: "Meeting Room A",
  address: "22850 Brambleton Plaza, Brambleton, VA 20148",
};

const WORKSHOPS = [
  { n: 1, date: "Wednesday, June 17", time: "5:00 – 6:00 PM", title: "The Research Process", topic: "Foundations", loc: ASHBURN, tbd: false },
  { n: 2, date: "Friday, June 26", time: "4:00 – 5:00 PM", title: "Deliverable Introduction", topic: "Foundations", loc: ASHBURN, tbd: false },
  { n: 3, date: "Wednesday, July 1", time: "4:30 – 5:30 PM", title: "Responsible AI Usage", topic: "Skills", loc: BRAMBLETON, tbd: false },
  { n: 4, date: "Thursday, July 9", time: "4:00 – 5:00 PM", title: "Applied Computer Science", topic: "Skills", loc: ASHBURN, tbd: false },
  { n: 5, date: "Thursday, July 16", time: "4:00 – 5:00 PM", title: "Topic to be announced", topic: "Skills", loc: ASHBURN, tbd: true },
  { n: 6, date: "Thursday, July 23", time: "4:00 – 5:00 PM", title: "Topic to be announced", topic: "Skills", loc: ASHBURN, tbd: true },
  { n: 7, date: "Thursday, July 30", time: "4:00 – 5:00 PM", title: "Topic to be announced", topic: "Skills", loc: BRAMBLETON, tbd: true },
  { n: 8, date: "Thursday, August 6", time: "Time TBD", title: "Finalizing Student Posters / Projects", topic: "Publishing", loc: null, tbd: false },
  { n: 9, date: "Thursday, August 13", time: "Time TBD", title: "Practicing Presentation", topic: "Publishing", loc: null, tbd: false },
];

const WORKSHOP_GALLERIES = [
  {
    n: 1,
    photos: [
      `${WORKSHOP_ROOT}/workshop-1/photos/Thumbnail_img.jpg`,
      `${WORKSHOP_ROOT}/workshop-1/brochures/brochure1.jpg`,
      `${WORKSHOP_ROOT}/workshop-1/brochures/brochure2.jpg`,
      "IMG_0284.jpg",
      "IMG_0285.jpg",
      "IMG_0288.jpg",
      "IMG_0290.jpg",
      "IMG_0292.jpg",
      "IMG_0295.jpg",
      "IMG_0296.jpg",
      "IMG_0297.jpg",
      "IMG_0298.jpg",
      "IMG_6991.jpg",
      "IMG_6992.jpg",
      "IMG_6993.jpg",
      "IMG_6994.jpg",
      "IMG_6995.jpg",
    ].map((file) =>
      file.startsWith(WORKSHOP_ROOT) ? file : `${WORKSHOP_ROOT}/workshop-1/photos/${file}`
    ),
    slides: `${WORKSHOP_ROOT}/workshop-1/slides/the-research-process.pdf`,
  },
];

const VOLUNTEER_SIGNUP_URL =
  "https://www.signupgenius.com/go/10C0A4BA4AA29A2FAC43-64530107-workshop#/";

// Google Classroom calendar (decoded from the shared cid) embedded read-only.
const CALENDAR_EMBED_SRC =
  "classroom114578935361340227206%40group.calendar.google.com";
const CALENDAR_PUBLIC_URL =
  "https://calendar.google.com/calendar/u/0/r?cid=Y2xhc3Nyb29tMTE0NTc4OTM1MzYxMzQwMjI3MjA2QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20";

// ── Our Students (placeholder showcase) ──
const GRADE_LEVELS = ["All", "6th Grade", "7th Grade", "8th Grade", "9th Grade"];

const STUDENT_PROJECTS = [
  {
    name: "Sample Student Project",
    grade: "7th Grade",
    blurb:
      "This is a placeholder for a future student showcase. Soon, each card here will introduce a student (or project group), describe their interests, display a gallery of their work, and link to their finished deliverables.",
    tags: ["Coming Soon"],
    gallery: 3,
    deliverables: [
      { label: "Research Poster", type: "poster" },
      { label: "Project Write-up", type: "doc" },
    ],
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
  const itemRefs = useRef([]);
  const wrapTimerRef = useRef(null);
  const loopedPhotos = [...photos, ...photos, ...photos];

  const getSetWidth = () => {
    const first = itemRefs.current[0];
    const secondSet = itemRefs.current[photos.length];
    if (!first || !secondSet) return 0;
    return secondSet.offsetLeft - first.offsetLeft;
  };

  const normalizeScroll = (behavior = "auto") => {
    const scroller = scrollerRef.current;
    const setWidth = getSetWidth();
    if (!scroller || !setWidth) return;

    if (scroller.scrollLeft < setWidth * 0.4) {
      scroller.scrollTo({ left: scroller.scrollLeft + setWidth, behavior });
    } else if (scroller.scrollLeft > setWidth * 1.6) {
      scroller.scrollTo({ left: scroller.scrollLeft - setWidth, behavior });
    }
  };

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      const scroller = scrollerRef.current;
      const setWidth = getSetWidth();
      if (!scroller || !setWidth) return;
      scroller.scrollLeft = setWidth;
    });
    return () => cancelAnimationFrame(rafId);
  }, [photos.length]);

  useEffect(() => {
    return () => window.clearTimeout(wrapTimerRef.current);
  }, []);

  const slide = (direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    window.clearTimeout(wrapTimerRef.current);

    scroller.scrollBy({
      left: direction * Math.min(scroller.clientWidth * 0.86, 520),
      behavior: "smooth",
    });

    wrapTimerRef.current = window.setTimeout(() => normalizeScroll(), 650);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03] shadow-2xl select-none">
      <div className="absolute left-0 inset-y-0 w-16 z-10 bg-gradient-to-r from-deep-navy/90 to-transparent pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 z-10 bg-gradient-to-l from-deep-navy/90 to-transparent pointer-events-none" />

      <div
        ref={scrollerRef}
        className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-8 py-8 sm:px-10"
      >
        {loopedPhotos.map((photo, i) => (
          <figure
            key={`${photo.src}-${i}`}
            ref={(node) => {
              itemRefs.current[i] = node;
            }}
            className="snap-center flex-shrink-0 w-[78vw] sm:w-[440px] lg:w-[520px]"
          >
            <div className="h-[280px] sm:h-[340px] lg:h-[400px] rounded-2xl border border-white/8 bg-white/[0.04] p-3 flex items-center justify-center shadow-xl">
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
                      <p className="text-sm font-semibold text-ice">Orientation #2</p>
                      <p className="text-sm text-steel-blue/70 mt-0.5">
                        Brambleton Library · Meeting Room A (LCPS)
                      </p>
                      <p className="text-sm text-steel-blue/70 mt-0.5">
                        Fairfax County · Location TBD (FCPS)
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
                        End of May, TBD
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
            <SectionLabel>Next In Research</SectionLabel>
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

      {/* ── By the Numbers + Values ── */}
      <section className="py-24 bg-deep-navy border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <SectionLabel>By the Numbers</SectionLabel>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ice">
              A serious program, built on access
            </h2>
          </motion.div>

          {/* Stat band */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { value: `${MENTORS.length}`, label: "TJHSST Mentors" },
              { value: `${MENTOR_SPECIALTIES.length}+`, label: "STEM Specialties" },
              { value: "100%", label: "Free — No Cost Ever" },
              { value: `${LOGOS.length}+`, label: "Schools Served" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl border border-white/8 bg-white/[0.03] px-6 py-8 text-center"
              >
                <div className="font-display text-4xl sm:text-5xl font-bold text-coral">
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-steel-blue/60 mt-2">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Values / what sets us apart */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <ShieldCheck className="w-5 h-5" />,
                title: "Safe & Supervised",
                text: "An adult is present at every in-person session, and community invite links are shared privately — never posted online.",
              },
              {
                icon: <GraduationCap className="w-5 h-5" />,
                title: "Top-Tier Mentors",
                text: "Mentors are students at TJHSST, the #1-ranked public high school in the nation, each with real research experience.",
              },
              {
                icon: <Award className="w-5 h-5" />,
                title: "Publishable Outcomes",
                text: "Students finish with something real — a competition entry, a live project, or a paper submitted to journals like NHSJS, JEI, or IEEE.",
              },
              {
                icon: <Heart className="w-5 h-5" />,
                title: "Open to Everyone",
                text: "No experience required and no cost to participate. We welcome every curious middle schooler, at every skill level.",
              },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl border border-white/8 bg-white/[0.02] p-6 hover:border-coral/25 hover:bg-coral/5 transition-colors"
              >
                <div className="w-11 h-11 rounded-2xl bg-coral/10 border border-coral/20 text-coral flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-ice mb-2">
                  {v.title}
                </h3>
                <p className="text-steel-blue/75 text-sm leading-relaxed">
                  {v.text}
                </p>
              </motion.div>
            ))}
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
            Serving Students From
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
              Ready to start your journey with Next In Research?
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
              Next In Research is just the beginning. As our cohort
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
  const [mentorGradeFilter, setMentorGradeFilter] = useState("All");
  const [openMentor, setOpenMentor] = useState(null);

  const orderedMentors = [...MENTORS].sort((a, b) => {
    const gradeDelta = gradeRank(a.grade) - gradeRank(b.grade);
    return gradeDelta || a.name.localeCompare(b.name);
  });

  const visibleMentors =
    mentorGradeFilter === "All"
      ? orderedMentors
      : orderedMentors.filter((mentor) => mentor.grade === mentorGradeFilter);

  const mentorCountFor = (grade) =>
    grade === "All"
      ? MENTORS.length
      : MENTORS.filter((mentor) => mentor.grade === grade).length;

  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <PageHeading
          label="About Us"
          title="Built by students, for students"
          subtitle="Next In Research is run entirely by students at Thomas Jefferson High School for Science and Technology (TJHSST) — consistently ranked the #1 public high school in the nation. We've assembled a team of mentors across more than a dozen STEM disciplines, each bringing real research and project experience to the students they guide."
        />

        {/* At-a-glance stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-20">
          {[
            { value: `${MENTORS.length}`, label: "Mentors" },
            { value: `${MENTOR_SPECIALTIES.length}+`, label: "STEM Specialties" },
            { value: "1", label: "Top-Ranked School" },
            { value: "1–3", label: "Students / Mentor" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-6 text-center"
            >
              <div className="font-display text-3xl font-bold text-coral">
                {s.value}
              </div>
              <div className="text-[11px] uppercase tracking-widest text-steel-blue/60 mt-1.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>

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
                className="group rounded-3xl border border-white/8 bg-white/[0.03] p-8 hover:border-coral/25 transition-all duration-500"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full sm:w-40 h-64 sm:h-44 rounded-2xl object-cover object-top flex-shrink-0 border border-white/10 saturate-[0.8] brightness-95 opacity-90 transition-all duration-700 ease-out group-hover:saturate-100 group-hover:brightness-100 group-hover:opacity-100"
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
            Meet the {MENTORS.length} TJHSST mentors guiding our Summer 2026
            cohort. Each brings hands-on research and project experience, and
            students are matched with a mentor based on their interests and
            goals.
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

          {/* Grade filters */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-steel-blue/60 mr-1">
              <Filter className="w-4 h-4" />
              Filter by grade
            </span>
            {GRADE_FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setMentorGradeFilter(filter.id);
                  setOpenMentor(null);
                }}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold transition-all",
                  mentorGradeFilter === filter.id
                    ? "border-coral/45 bg-coral/12 text-coral"
                    : "border-white/10 bg-white/[0.03] text-steel-blue/60 hover:text-ice hover:border-white/20"
                )}
              >
                {filter.label}
                <span className="text-[10px] opacity-60">
                  {mentorCountFor(filter.id)}
                </span>
              </button>
            ))}
          </div>

          {/* Uniform mentor cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {visibleMentors.map((mentor, i) => {
              const isOpen = openMentor === mentor.name;
              return (
                <motion.div
                  key={mentor.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.04 }}
                  className="group rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden hover:border-coral/25 transition-all duration-500"
                >
                  <div className="h-72 sm:h-80 bg-mid-blue/15 p-4 flex items-center justify-center">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="max-h-full max-w-full object-contain saturate-[0.82] brightness-95 opacity-95 transition-all duration-700 ease-out group-hover:saturate-100 group-hover:brightness-100 group-hover:opacity-100"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-display text-lg font-bold text-ice leading-tight">
                      {mentor.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5">
                      {mentor.grade && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-steel-blue/50">
                          {mentor.grade} · TJHSST
                        </span>
                      )}
                    </div>
                    <p className="text-coral text-xs font-semibold mt-2">
                      {mentor.focus}
                    </p>
                    <button
                      onClick={() => setOpenMentor(isOpen ? null : mentor.name)}
                      className="mt-4 w-full flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left text-sm font-semibold text-steel-blue/70 hover:text-ice hover:border-coral/25 transition-colors"
                    >
                      <span>{isOpen ? "Hide description" : "View description"}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          isOpen && "rotate-180 text-coral"
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24 }}
                          className="overflow-hidden"
                        >
                          <p className="text-steel-blue/75 text-sm mt-4 leading-relaxed">
                            {mentor.bio || "Description coming soon."}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl border border-steel-blue/15 bg-steel-blue/5"
          >
            <p className="text-steel-blue text-sm leading-relaxed">
              <span className="font-semibold text-ice">
                Our roster keeps growing.
              </span>{" "}
              Every mentor is a current TJHSST student with experience in
              published papers, science fair placements, internships, or
              research-assistant work. Students are paired with their mentor
              after orientation based on shared interests.
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
    <div className="pt-24 pb-24 min-h-[80vh]">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 w-full text-center">
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
            We're looking for high school mentors
          </h1>
          <p className="text-steel-blue text-xl leading-relaxed max-w-xl mx-auto mb-10">
            Apply for an opportunity to lead a team of middle school researchers
            and earn volunteer hours while doing meaningful mentorship work.
          </p>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdJbFPGDU8FRyottDfEDJQwSOIfFLhuafah0TjfgBVjAiHZyQ/viewform?usp=header"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 bg-coral hover:bg-coral/90 text-white font-bold px-9 py-4 rounded-full text-base transition-all hover:shadow-coral hover:scale-105 active:scale-95 mb-14"
          >
            High School Mentor Application
            <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>

          <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-5 sm:p-7 mb-8">
            <iframe
              src="https://drive.google.com/file/d/1qm5lC6jQDy3LLs7C_SLQ52WUySAfspQN/preview"
              title="Next In Research mentor application video"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="aspect-video w-full rounded-2xl border border-white/12 bg-mid-blue/15"
            />
          </div>

          <p className="text-steel-blue/50 text-base">
            The rest is under construction.
          </p>
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
                {link.label && (
                  <span className={cn("text-[10px] font-bold tracking-widest uppercase", link.color)}>
                    {link.label}
                  </span>
                )}
              </div>
              <div>
                <p className={cn("font-bold text-sm", link.color)}>{link.name}</p>
                {link.desc && (
                  <p className="text-steel-blue/60 text-xs mt-0.5">{link.desc}</p>
                )}
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
                "Attend Orientation #2 at the end of May in LCPS or FCPS (depending on location) to be onboarded into the program.",
                "Get matched with a mentor based on your interests and skill level.",
                "Begin your Next In Research journey — skill-building, project work, and mentorship all summer.",
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
// WORKSHOPS PAGE  (/workshops)
// ─────────────────────────────────────────────

function WorkshopPhotoAlbum({ photos, title }) {
  const [active, setActive] = useState(0);

  const prev = () =>
    setActive((current) => (current - 1 + photos.length) % photos.length);
  const next = () => setActive((current) => (current + 1) % photos.length);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03] shadow-2xl h-full">
      <div className="h-[520px] bg-mid-blue/15 p-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={photos[active]}
            src={photos[active]}
            alt={`${title} photo ${active + 1}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.28 }}
            className="max-h-full max-w-full object-contain rounded-2xl"
            loading={active === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        </AnimatePresence>
      </div>

      <div className="absolute left-5 bottom-5 z-20 rounded-2xl bg-deep-navy/75 px-4 py-3 backdrop-blur-sm border border-white/8">
        <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-coral mb-1">
          Photo Album
        </p>
        <p className="font-display text-ice font-bold text-lg">
          {String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </p>
      </div>

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 w-10 h-10 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center text-white/75 hover:bg-black/55 hover:text-white transition"
      >
        <ChevronRight className="w-5 h-5 rotate-180" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 w-10 h-10 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center text-white/75 hover:bg-black/55 hover:text-white transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function WorkshopsPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <PageHeading
          label="Workshops"
          title="Workshop galleries and materials"
          subtitle="Each workshop page pairs a photo album from the session with the slides and handouts students used. New workshops can be added here as soon as each session wraps."
        />

        <div className="space-y-10">
          {WORKSHOPS.map((workshop) => {
            const gallery = WORKSHOP_GALLERIES.find((item) => item.n === workshop.n);
            const title = `Workshop #${workshop.n}: ${workshop.title}`;

            if (!gallery) {
              return (
                <motion.section
                  key={workshop.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-8"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-coral mb-3">
                        Coming Soon
                      </p>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-ice">
                        {title}
                      </h2>
                      <p className="text-steel-blue/70 text-sm mt-3">
                        Coming after {workshop.date}.
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl border border-white/8 bg-white/[0.03] flex items-center justify-center">
                      <CalendarDays className="w-7 h-7 text-steel-blue/35" />
                    </div>
                  </div>
                </motion.section>
              );
            }

            return (
              <motion.section
                key={workshop.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                className="rounded-3xl border border-white/8 bg-white/[0.02] p-5 sm:p-7"
              >
                <div className="mb-7">
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-coral mb-3">
                    {workshop.date} · {workshop.time}
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-ice">
                    {title}
                  </h2>
                  {workshop.loc && (
                    <p className="text-steel-blue/65 text-sm mt-3">
                      {workshop.loc.name} · {workshop.loc.room}
                    </p>
                  )}
                </div>

                <div className="grid lg:grid-cols-2 gap-6 items-stretch">
                  <WorkshopPhotoAlbum photos={gallery.photos} title={title} />

                  <aside className="rounded-3xl border border-white/8 bg-white/[0.03] p-4 h-full shadow-2xl">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-coral">
                          Slideshow
                        </p>
                        <h3 className="font-display text-xl font-bold text-ice mt-1">
                          Workshop Slides
                        </h3>
                      </div>
                      <a
                        href={gallery.slides}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-coral hover:text-coral/80 transition-colors"
                      >
                        Open
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <iframe
                      src={gallery.slides}
                      title={`${title} slideshow`}
                      className="w-full h-[520px] rounded-2xl border border-white/8 bg-mid-blue/15"
                      loading="lazy"
                    />
                  </aside>
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SCHEDULE PAGE  (/schedule + /summerschedule)
// ─────────────────────────────────────────────

const TOPIC_STYLES = {
  Foundations: "text-coral bg-coral/10 border-coral/20",
  Skills: "text-steel-blue bg-steel-blue/10 border-steel-blue/20",
  Publishing: "text-[#98C1D9] bg-mid-blue/20 border-mid-blue/30",
};

function SchedulePage() {
  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <PageHeading
          label="Summer Schedule"
          title="Summer Mentorship Program — Workshop Series"
          subtitle="Nine in-person workshops across the summer take students from the fundamentals of research all the way through presenting their finished work. All workshops are free and held at Loudoun County public libraries."
        />

        {/* Volunteer sign-up callout */}
        <motion.a
          href={VOLUNTEER_SIGNUP_URL}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-coral/25 bg-coral/5 p-6 mb-12 hover:border-coral/45 hover:bg-coral/10 transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-coral/15 border border-coral/20 flex items-center justify-center flex-shrink-0">
              <UserCheck className="w-6 h-6 text-coral" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-ice">
                Mentors &amp; volunteers — sign up to lead a workshop
              </h3>
              <p className="text-steel-blue/70 text-sm mt-1">
                Claim a session on our SignUpGenius volunteer sheet.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-coral font-bold text-sm whitespace-nowrap self-start sm:self-center">
            Open Sign-Up
            <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </span>
        </motion.a>

        {/* Workshop timeline */}
        <div className="space-y-4 mb-20">
          {WORKSHOPS.map((w, i) => (
            <motion.div
              key={w.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group grid sm:grid-cols-[auto_1fr] gap-5 rounded-2xl border border-white/8 bg-white/[0.03] p-6 hover:border-coral/30 transition-colors"
            >
              {/* Number badge */}
              <div className="flex sm:flex-col items-center sm:items-start gap-3">
                <div className="w-14 h-14 rounded-2xl bg-mid-blue/20 border border-white/8 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-[9px] uppercase tracking-widest text-steel-blue/50 leading-none">
                    No.
                  </span>
                  <span className="font-display text-2xl font-bold text-ice leading-none mt-0.5">
                    {w.n}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                      TOPIC_STYLES[w.topic]
                    )}
                  >
                    {w.topic}
                  </span>
                  {w.tbd && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 text-steel-blue/50">
                      Topic TBD
                    </span>
                  )}
                </div>
                <h3 className="font-display text-xl font-bold text-ice mb-3">
                  Workshop #{w.n}: {w.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-2 text-sm">
                  <span className="inline-flex items-center gap-2 text-steel-blue/80">
                    <CalendarDays className="w-4 h-4 text-coral flex-shrink-0" />
                    {w.date}
                  </span>
                  <span className="inline-flex items-center gap-2 text-steel-blue/80">
                    <Clock className="w-4 h-4 text-coral flex-shrink-0" />
                    {w.time}
                  </span>
                </div>
                {w.loc ? (
                  <div className="flex items-start gap-2 mt-2 text-sm text-steel-blue/70">
                    <MapPin className="w-4 h-4 text-coral flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="text-ice font-medium">{w.loc.name}</span>
                      {" · "}
                      {w.loc.room}
                      <br />
                      <span className="text-steel-blue/50">{w.loc.address}</span>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mt-2 text-sm text-steel-blue/50">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    Location to be announced
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Embedded Google Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <SectionLabel>Program Calendar</SectionLabel>
              <h2 className="font-display text-3xl font-bold text-ice">
                Everything in one place
              </h2>
              <p className="text-steel-blue/70 text-sm mt-2 max-w-xl">
                Workshops, orientations, and 1-on-1 sessions sync straight from
                our shared Google Calendar below.
              </p>
            </div>
            <a
              href={CALENDAR_PUBLIC_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-coral hover:text-coral/80 transition-colors whitespace-nowrap"
            >
              Add to your calendar
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-2 sm:p-3 shadow-2xl overflow-hidden">
            <iframe
              title="Next In Research Program Calendar"
              src={`https://calendar.google.com/calendar/embed?src=${CALENDAR_EMBED_SRC}&ctz=America%2FNew_York&mode=AGENDA&showTitle=0&showPrint=0&showCalendars=0&bgcolor=%23293241`}
              className="w-full rounded-2xl h-[480px] sm:h-[560px]"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// OUR STUDENTS PAGE  (/students)
// ─────────────────────────────────────────────

function StudentsPage() {
  const [grade, setGrade] = useState("All");

  const filtered =
    grade === "All"
      ? STUDENT_PROJECTS
      : STUDENT_PROJECTS.filter((p) => p.grade === grade);

  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <PageHeading
          label="Our Students"
          title="Meet the projects of all of our students"
          subtitle="This is where our students shine. Each profile introduces a student or project group, shares a bit about who they are, and showcases a gallery of their work alongside links to their finished deliverables."
        />

        {/* Under construction banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 rounded-2xl border border-coral/25 bg-coral/5 px-6 py-5 mb-10"
        >
          <Construction className="w-6 h-6 text-coral flex-shrink-0" />
          <p className="text-steel-blue text-sm leading-relaxed">
            <span className="font-semibold text-ice">Under construction.</span>{" "}
            Student showcases will be published as the Summer 2026 cohort
            completes their projects. The example below is a placeholder preview
            of what's coming.
          </p>
        </motion.div>

        {/* Grade filter */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-steel-blue/60 mr-1">
            <Filter className="w-4 h-4" />
            Filter by grade level
          </span>
          {GRADE_LEVELS.map((g) => (
            <button
              key={g}
              onClick={() => setGrade(g)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-semibold border transition-all",
                grade === g
                  ? "border-coral bg-coral text-white"
                  : "border-steel-blue/15 bg-steel-blue/5 text-steel-blue hover:border-coral/40 hover:text-ice"
              )}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Student cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <StudentCard key={p.name} project={p} />
          ))}

          {/* Always-present "your project here" slot */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-dashed border-white/12 bg-white/[0.02] p-8 flex flex-col items-center justify-center text-center gap-3 min-h-[320px]"
          >
            <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-coral/60" />
            </div>
            <p className="font-display text-lg font-bold text-ice">
              Your project here
            </p>
            <p className="text-steel-blue/50 text-sm">
              Apply, build something real this summer, and earn your spot in the
              showcase.
            </p>
          </motion.div>
        </div>

        {filtered.length === 0 && (
          <p className="text-steel-blue/50 text-center py-16">
            No projects in this grade level yet — check back soon!
          </p>
        )}
      </div>
    </div>
  );
}

function StudentCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-white/8 bg-white/[0.03] overflow-hidden hover:border-coral/30 transition-all"
    >
      {/* Photo placeholder */}
      <div className="relative h-44 bg-gradient-to-br from-mid-blue/30 to-deep-navy flex items-center justify-center">
        <Users className="w-10 h-10 text-steel-blue/30" />
        <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-deep-navy/70 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-steel-blue">
          {project.grade}
        </span>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-ice mb-2">
          {project.name}
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-full bg-coral/10 border border-coral/20 text-coral text-[10px] font-bold uppercase tracking-wider"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="text-steel-blue/75 text-sm leading-relaxed mb-5">
          {project.blurb}
        </p>

        {/* Gallery placeholder */}
        <p className="text-[10px] font-bold uppercase tracking-widest text-steel-blue/40 mb-2">
          Gallery
        </p>
        <div className="grid grid-cols-3 gap-2 mb-5">
          {Array.from({ length: project.gallery }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl border border-white/8 bg-white/[0.04] flex items-center justify-center"
            >
              <Microscope className="w-5 h-5 text-steel-blue/20" />
            </div>
          ))}
        </div>

        {/* Deliverables */}
        <p className="text-[10px] font-bold uppercase tracking-widest text-steel-blue/40 mb-2">
          Deliverables
        </p>
        <div className="space-y-2">
          {project.deliverables.map((d) => (
            <span
              key={d.label}
              className="flex items-center gap-2 text-sm text-steel-blue/50 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2 cursor-not-allowed"
            >
              {d.type === "poster" ? (
                <Presentation className="w-4 h-4 text-steel-blue/40" />
              ) : (
                <FileText className="w-4 h-4 text-steel-blue/40" />
              )}
              {d.label}
              <span className="ml-auto text-[10px] uppercase tracking-widest text-steel-blue/30">
                Soon
              </span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
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
  const [activePage, setActivePage] = useState(() =>
    pathToPage(typeof window !== "undefined" ? window.location.pathname : "/")
  );

  // Keep state in sync with browser back/forward navigation.
  useEffect(() => {
    const onPop = () => setActivePage(pathToPage(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (page) => {
    const path = pageToPath(page);
    if (window.location.pathname !== path) {
      window.history.pushState({ page }, "", path);
    }
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
          {activePage === "schedule" && <SchedulePage />}
          {activePage === "workshops" && <WorkshopsPage />}
          {activePage === "students" && <StudentsPage />}
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
