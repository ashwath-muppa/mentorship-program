import { useState, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import {
  Mail, ExternalLink, Menu, X, ChevronDown,
  ChevronLeft, ChevronRight, ArrowRight, ArrowDown,
  Play, Pause,
} from "lucide-react";
import { cn } from "./lib/utils";

/*
  THE LIBRARY RECORD — direction contract lives in index.html (seed 1ec49fef).
  Buckram cloth fields · paper card objects · rubber-stamp ink · typed records.
*/

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const IMAGE_ROOT = `${import.meta.env.BASE_URL}images/NextInResearch/optimized`;
const WORKSHOP_ROOT = `${import.meta.env.BASE_URL}images/NextInResearch/workshops`;

// Route table — each tab maps to a real URL path. /apply removed with Cohort One wrapping.
const NAV_TABS = [
  { id: "home", path: "/", label: "The Record" },
  { id: "timeline", path: "/timeline", label: "The Summer" },
  { id: "team", path: "/team", label: "Mentors" },
  { id: "schedule", path: "/schedule", label: "Schedule" },
  { id: "workshops", path: "/workshops", label: "Workshops" },
  { id: "students", path: "/students", label: "Student Work" },
  { id: "involved", path: "/getinvolved", label: "Get Involved" },
  { id: "faq", path: "/faq", label: "FAQ" },
  { id: "contact", path: "/contact", label: "Contact" },
];

const PATH_ALIASES = {
  "/home": "home",
  "/summerschedule": "schedule",
  "/team-and-mentors": "team",
  "/apply": "contact",
};

function pathToPage(pathname) {
  const clean = (pathname || "/").replace(/\/+$/, "") || "/";
  if (PATH_ALIASES[clean]) return PATH_ALIASES[clean];
  const match = NAV_TABS.find((r) => r.path === clean);
  return match ? match.id : "home";
}

function pageToPath(id) {
  const match = NAV_TABS.find((r) => r.id === id);
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
    a: "The program runs May through August. Cohort One met for introduction sessions at the end of May, then gathered for weekly workshops at Loudoun County public libraries — Ashburn and Brambleton — with weekly 1-on-1 Zoom sessions alongside. The program is hybrid: students work online with mentors as well as in person.",
  },
  {
    q: "What kind of projects do students work on?",
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
    a: "None at all! We do not prefer students with more experience. The goal is growth, not prior knowledge. Every student is supported at their own level from day one.",
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
    a: "By the end of Phase 3 (August), students have a finished, shareable product. Younger students may submit to competitions or create a blog post or video. Older students may submit research papers to journals like NHSJS, JEI, or IEEE.",
  },
  {
    q: "Are adults present at all meetings?",
    a: "Yes. An adult is present at every in-person meeting.",
  },
  {
    q: "How do I join the next cohort?",
    a: "Cohort One is wrapping up, and applications for Summer 2027 will open in the spring. Email the coordinators — see the Contact page — and we'll let you know the moment they do.",
  },
];

const PHASES = [
  {
    number: "01",
    phase: "Phase 1",
    title: "Planning",
    timeline: "April – June",
    description:
      "Students completed onboarding assignments to build core skills — coding, scientific method, brainstorming — and finalized a summer project tailored to their age and skill level.",
    details: [
      "Orientation #1 at Brambleton Library · April 28th, 5:30–6:30 PM",
      "Orientation sessions in LCPS and Fairfax at the end of May",
      "4 Pillars: Brainstorming, Research, Skills, and Presentation",
      "Optional Google Classroom assignments for early starters",
      "Projects finalized with mentor guidance by the end of June",
    ],
  },
  {
    number: "02",
    phase: "Phase 2",
    title: "Building",
    timeline: "June – July",
    description:
      "Mentors hosted weekly in-person skill-building workshops at Loudoun County libraries. Students also received weekly 1-on-1 Zoom calls for personalized feedback and guidance.",
    details: [
      "Weekly in-person workshops at Ashburn and Brambleton libraries",
      "Weekly 1-on-1 Zoom calls with assigned mentors",
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
      "Mentors guide students through preparing their work for public release — competition submissions, blog posts, journal papers, and presentations.",
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
    call: "621.3 SRI",
  },
  {
    name: "Deborah Torrico-Pardo",
    role: "Program Coordinator / Cofounder",
    school: "TJHSST",
    interest: "Neuroscience",
    email: "ctp.deborah@gmail.com",
    image: `${IMAGE_ROOT}/Mentor_Imgs/Deborah_Torrico_Pardo.jpg`,
    call: "612.8 TOR",
  },
];

const MENTOR_IMG = (file) => `${IMAGE_ROOT}/Mentor_Imgs/${file}`;
const DEFAULT_POS = "50% 25%";

// Mentor roster — bios sourced from the mentor intake form (Summer 2026 cohort).
// Call numbers are Dewey-style shelf marks derived from each mentor's focus.
const MENTORS = [
  {
    name: "Ashwath Muppa",
    grade: "Rising Senior",
    focus: "Machine Learning & Mathematical Modeling",
    call: "006.31 MUP",
    bio: "Hey everyone, my name is Ashwath Muppa and I'm a Rising Senior at TJ! I'm really passionate about machine learning and mathematical modeling, and in high school, I've worked on research ranging from mobile hand tremor classification to collaborative STEM applications. My favorite subjects are Computer Science and Math, and in my free time, I love playing strategic games, hitting the gym, and playing pickleball with my friends!",
    image: MENTOR_IMG("Ashwath_Muppa.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Gael Sanchez-Zubieta",
    grade: "Rising Senior",
    focus: "Public Health & Neuroscience",
    call: "614 SAN",
    bio: "Hi! My name is Gael Sanchez-Zubieta and I'm a rising senior at TJ! I'm extremely passionate about Public Health (especially policy!), Neuroscience, Biology, & Chemistry. I've done a variety of projects in these fields such as research on the biodegradability of plant-based plastics, written a paper on the role of the hippocampus on amnesia, and am currently beginning a biorisk cost-benefit analysis research project. Some of my favorite subjects are DNA Science and Neurobiology. In my free time I enjoy cooking, baking, and inventing new coffee recipes!",
    image: MENTOR_IMG("Gael_Sanchez_Zubieta.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Ishaan Kar",
    grade: "Rising Senior",
    focus: "Business, Finance & Entrepreneurship",
    call: "332 KAR",
    bio: "Hey everyone, my name is Ishaan Kar and I'm a rising senior at TJ! I'm really passionate about business, entrepreneurship, and finance, and in high school I've worked on projects ranging from market trend analysis to earnings call research. My favorite subjects are math and statistics, and in my free time I like going to the gym, eating, and playing sports!",
    image: MENTOR_IMG("Ishaan_Kar.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Arjun Kode",
    grade: "Rising Senior",
    focus: "Computational Neuroscience & Chemistry",
    call: "612.8 KOD",
    bio: "Hey everyone, my name is Arjun and I'm a student at TJ! I'm really passionate about computational research, especially in neuroscience and chemistry. I've worked on projects ranging from analyzing mouse ultrasonic vocalizations to studying air pollution's effects on the brain. My favorite subjects are AP Chemistry and AP Biology and in my free time I enjoy playing sports with my friends.",
    image: MENTOR_IMG("Arjun_Kode.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Aashka Doshi",
    grade: "Rising Senior",
    focus: "Neuroscience",
    call: "612.82 DOS",
    bio: "Hey everyone, my name is Aashka Doshi, and I am a rising senior at TJHSST! I am really interested in Neuroscience, and plan to major in it in college. I have conducted research in the past concerning water filtration methods and explored different lab skills in doing so. Outside of school, I love to read, get Chipotle, and hang out with my friends!",
    image: MENTOR_IMG("Aashka_Doshi.jpg"),
    pos: "50% 22%",
  },
  {
    name: "Akshaya Lokam",
    grade: "Rising Senior",
    focus: "Psychology & Neuroscience",
    call: "150 LOK",
    bio: "Hi everyone, my name is Akshaya Lokam and I'm a Rising Senior at TJ! I'm passionate about pursuing research and plan on majoring in psychology and neuroscience. I've done projects exploring the different sciences and am currently working on a paper on brain plasticity. My favorite subjects are Neurobiology and Psychology. In my free time I love to dance, hang out with my friends, and draw!",
    image: MENTOR_IMG("Akshaya_Lokam.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Bhargavi Shinde",
    grade: "Rising Senior",
    focus: "Psychology, Neuroscience & Healthcare",
    call: "610 SHI",
    bio: "Hi everyone! My name is Bhargavi Shinde, and I'm a Rising Senior at TJ. I'm passionate about psychology, neuroscience, and healthcare, and over the past few years I've had the opportunity to work on several research-based projects that have fueled my interest in science and medicine. In my free time, I enjoy playing guitar, doing henna, and hanging out with friends and family. I'm looking forward to meeting everyone this summer!",
    image: MENTOR_IMG("Bhargavi_Shinde.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Diana Soltani",
    grade: "Rising Sophomore",
    focus: "Neuroscience & AI in Medicine",
    call: "610.28 SOL",
    bio: "Hi, my name is Diana Soltani and I'm a Rising Sophomore at TJHSST! My favorite extracurriculars range from the Neuroscience Brain Bee, Live-Action Acting, International Congressional Debate, to projects concerning MRI development using AI. A fun fact about me is that I've never used a microwave in my life!",
    image: MENTOR_IMG("Diana_Soltani.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Tanya Chavan",
    grade: "Rising Junior",
    focus: "Engineering & Humanities",
    call: "620 CHA",
    bio: "Hi!! I'm Tanya Chavan, and I'm a rising junior at TJ. I love the humanities; I compete in debate, Mock Trial, and MUN about a wide range of topics ranging from scientific to moral and ethical issues. I also love engineering, specifically CAD, woodwork, and assembly. In my free time, I love to assemble 3D wooden models, hang out with my friends, and listen to music.",
    image: MENTOR_IMG("Tanya_Chavan.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Kalkidan Amare",
    grade: "Rising Junior",
    focus: "Engineering & Chemistry",
    call: "620.1 AMA",
    bio: "Hi all, my name is Kalkidan Amare and I'm a rising junior at TJ! I'm excited to work with students who want to pursue STEM research this summer as a student who is also interested in engineering and chemistry. I have always been curious about how technology works as I have taken many programming classes, I love reading mystery books, and enjoy playing soccer!",
    image: MENTOR_IMG("Kalkidan_Amare.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Emma Zurine",
    grade: "Rising Senior",
    focus: "Engineering & Public Policy",
    call: "628 ZUR",
    bio: "Hi! My name is Emma Zurine and I'm a rising senior at TJ! My main interests include engineering and public policy, especially projects involving robotics, sustainability, and space-related technology. I've had the chance to work on projects ranging from EV battery optimization to flood detection systems, and I'm always excited to explore new fields and ideas. Outside of school, you can usually find me singing or listening to music, trying new restaurants and cafes, playing volleyball, or spending time with friends and family!",
    image: MENTOR_IMG("Emma_Zurine.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Vishnuvardhini Arul Palaniraj",
    grade: "Rising Sophomore",
    focus: "Medical Science, Cancer Research & AI",
    call: "616.99 ARU",
    bio: "Hi everyone, my name is Vishnuvardhini Arul Palaniraj, and I am a rising sophomore at TJ! I have done numerous projects over the years for science fairs and other research, specializing in medical sciences, cancer research and AI. I love to dance, practice MMA, try new food, and read dystopian or sci-fi books in my free time!",
    image: MENTOR_IMG("Vishnuvardhini_Arul_Palaniraj.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Yogan Mahesh",
    grade: "Rising Junior",
    focus: "Biology & Chemistry",
    call: "570 MAH",
    bio: "Hello, my name is Yogan Mahesh, and I am a rising junior at TJHSST. I am interested in Biology and Chemistry, and have done various projects and labs relating to both fields, including gel electrophoresis and fly experimentation. Other than science, I am passionate about music, and I am currently an active member of my school's band program.",
    image: MENTOR_IMG("Yogan_Mahesh.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Tristan Raffo",
    grade: "Rising Senior",
    focus: "Economics & Public Policy",
    call: "330 RAF",
    bio: "Hi! My name is Tristan Raffo, and I'm a rising Senior at TJ! I love Economics and Public Policy, and I've done research which includes work on tax systems as well as on AI behavior in cooperative games. Outside of school, I enjoy cooking (and eating...), playing soccer, learning new things, and collecting perfume!",
    image: MENTOR_IMG("Tristan_Raffo.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Kossara Tabakova",
    grade: "Rising Junior",
    focus: "Medicine, Biology & Mathematics",
    call: "610.1 TAB",
    bio: "Hi! I'm Kossara Tabakova, and I'm a rising junior at TJHSST! My interests lie in the fields of medicine, biology, and mathematics, and I have completed projects in the medical and biological fields by combining the use of computer science and mathematical models and their real-world applications. My favorite subjects are math and biology, and in my free time I love playing the violin and the piano, solving problems, and teaching taekwondo.",
    image: MENTOR_IMG("Kossara_Tabakova.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Mahrukh Kiyani",
    grade: "Rising Senior",
    focus: "Chemistry & DNA Science",
    call: "572.8 KIY",
    bio: "Hi! My name is Kiyani and I'm a Rising Senior. I'm really interested in hands-on laboratory sciences, like Chemistry and DNA Science, and hope to help other people express their interest in them too! In my free time I volunteer at my local hospital, read, watercolor, and go out for forestry walks!",
    image: MENTOR_IMG("Mahrukh_Kiyani.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Rhea Desai",
    grade: "Rising Sophomore",
    focus: "Environmental Science",
    call: "577 DES",
    bio: "Hey, my name is Rhea Desai and I'm a rising sophomore at TJ. In the past, I have done a wide range of projects, such as how nitrate concentrations affect aquatic organisms and scientific papers. I enjoy English and History, and I love to play soccer and hang out with my friends!",
    image: MENTOR_IMG("Rhea_Desai.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Shritha Adapala",
    grade: "Rising Junior",
    focus: "Neuroscience & Biomechanics",
    call: "612.76 ADA",
    bio: "Hi, my name is Shritha Adapala and I'm a rising junior at TJ! I love everything biology related, especially neuroscience and biomechanics. I've done some projects in fields like tissue engineering, skin cancer, and neurodegenerative diseases. I'm also part of the tennis team and in my free time, I love playing the violin, watching movies, and sleeping!",
    image: MENTOR_IMG("Shritha_Adapala.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Juwon Kim",
    grade: "Rising Sophomore",
    focus: "Biomedical Engineering & Biotechnology",
    call: "660.6 KIM",
    bio: "Hi everyone! My name is Juwon Kim and I'm a rising Sophomore at TJ. As a member of TJ's Science Olympiad team, I have had the opportunity to explore so many different areas of science, and now I am planning on specializing in Biomedical Engineering and Biotechnology through independent research. Outside of all of that though, I love making cinematic videos, organizing class-wide events, and playing Roblox and Minecraft!",
    image: MENTOR_IMG("Juwon_Kim.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Fatma Hidara",
    grade: "Rising Junior",
    focus: "Epidemiology & Medicine",
    call: "614.4 HID",
    bio: "Hello! I'm Fatma Hidara, a rising junior at TJ. I love listening to music, watching new TV shows, and traveling. As a fun fact, I have Moroccan heritage, so Morocco is my most frequent destination, and this summer will mark my 14th trip there! I'm passionate about biology, especially epidemiology and medicine, and I look forward to diving even deeper into the fields during my remaining years at TJ.",
    image: MENTOR_IMG("Fatma_Hidara.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Rabiha Junaid",
    grade: "Rising Senior",
    focus: "Social Research (YPAR)",
    call: "300.72 JUN",
    bio: "Hi! My name is Rabiha and I'm about to enter my last year of high school! I love exploring new things, drawing, learning, and reading. Recently I've been doing a YPAR research project and teaching weekend school at my local Mosque. Idealistically I would like to work on a self-improvement journey and learn more about my all-encompassing religion, Islam.",
    image: MENTOR_IMG("Rabiha_Junaid.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Yuthee Thota",
    grade: "Rising Junior",
    focus: "Engineering & CAD",
    call: "620.004 THO",
    bio: "Hi! I'm Yuthee Thota, a rising junior at TJHSST with a passion for engineering and hands-on projects. I've worked on projects ranging from woodworking builds and gearbox design to chassis construction, TSA competitions, and even creating miniature dollhouses. Outside of engineering, I like CAD, gardening, baking, and swimming.",
    image: MENTOR_IMG("Yuthee_Thota.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Avni Khare",
    grade: "Rising Junior",
    focus: "AI & Competitive Programming",
    call: "005.1 KHA",
    bio: "Hi everyone, my name is Avni Khare and I'm a Rising Junior at TJ! I'm really interested in AI development and competitive programming, and I've done competitions since middle school. My favorite subjects are CS and Economics, and I like dancing, playing piano, and doing puzzles in my free time.",
    image: MENTOR_IMG("Avni_Khare.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Ava Liu",
    grade: "Rising Senior",
    focus: "Bioinformatics & Neuroscience",
    call: "570.285 LIU",
    bio: "Hi, I'm Ava and I'm a rising senior at TJ. I love anything biology, especially bioinformatics and neuroscience, and I've done research projects on neurodegenerative diseases using computer science and data analysis techniques. My favorite subject is Biology (obviously) and in my free time I love baking, reading, and going out with friends!",
    image: MENTOR_IMG("Ava_Liu.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Kedar Kalluri",
    grade: "Rising Junior",
    focus: "Aerospace & Mechanical Engineering",
    call: "629.1 KAL",
    bio: "Hello! My name is Kedar Kalluri and I am a rising Junior in TJ. I am mainly interested in aerospace, electrical, and mechanical engineering. I like biking, playing the guitar, and drawing.",
    image: MENTOR_IMG("Kedar_Kalluri.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Armaan Bajwa",
    grade: "Rising Sophomore",
    focus: "Chemistry & Engineering",
    call: "540 BAJ",
    bio: "Hey everyone, my name is Armaan Bajwa and I'm a rising sophomore at TJ! I'm really interested in chemistry and engineering, and I love getting hands-on with projects whether it's building something with my friends or crafting. In my free time I play basketball, hang out with my friends, and make things.",
    image: MENTOR_IMG("Armaan_Bajwa.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Bhavesh Adivi",
    grade: "Rising Junior",
    focus: "Oncology & Omics Data / AI",
    call: "616.994 ADI",
    bio: "Hey, I'm Bhavesh Adivi, a rising junior at TJ and I'm really interested in oncology, tumor dynamics, and omics data analysis. I've done projects related to artificial intelligence, computer vision, and predictive modeling for cancer, as well as cognitive impairment tracking. In my free time, I love to code, play chess, and build something new!",
    image: MENTOR_IMG("Bhavesh_Adivi.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Kate Russell",
    grade: "Rising Junior",
    focus: "Biochemistry",
    call: "572 RUS",
    bio: "Kate Russell is a rising junior at TJ who is interested in biochemistry. In her free time, she enjoys reading, creative writing, and taking walks outside!",
    image: MENTOR_IMG("Kate_Russell.jpg"),
    pos: DEFAULT_POS,
  },
  {
    name: "Prisha Hasija",
    grade: "Rising Sophomore",
    focus: "Engineering & Astronomy",
    call: "520 HAS",
    bio: "Hi! I'm Prisha Hasija, a rising sophomore at TJ. I'm especially interested in engineering, astronomy, and exploring how they can be applied to solve real-world problems. Through robotics and astronomy clubs here at TJ, I've had the opportunity to explore these passions, and I'm always excited to learn something new! Outside of academics, I enjoy reading, baking, and crocheting.",
    image: MENTOR_IMG("Prisha_Hasija.jpg"),
    pos: DEFAULT_POS,
  },
];

const GRADE_FILTERS = [
  { id: "All", label: "All mentors" },
  { id: "Rising Senior", label: "Rising Seniors" },
  { id: "Rising Junior", label: "Rising Juniors" },
  { id: "Rising Sophomore", label: "Rising Sophomores" },
];

const GRADE_ORDER = ["Rising Senior", "Rising Junior", "Rising Sophomore"];

function gradeRank(grade) {
  const rank = GRADE_ORDER.indexOf(grade);
  return rank === -1 ? GRADE_ORDER.length : rank;
}

// Introduction-session photos shown on the Timeline page.
const TIMELINE_PHOTOS = ["SMP_2.jpg", "SMP_4.jpg", "SMP_5.jpg"].map((file) => ({
  src: `${IMAGE_ROOT}/Misc_imgs/${file}`,
  alt: "Families at a Next In Research introduction session",
}));

const MISC_PHOTOS = [
  "Misc_1.jpg", "Misc_2.jpg", "Misc_3.jpg", "Misc_4.jpg", "Misc_5.jpg", "Misc_6.jpg",
  "Misc_7.jpg", "Misc_8.jpg", "Misc_9.jpg", "Misc_10.jpg", "Misc_11.jpg", "Misc_12.jpg",
].map((file) => ({
  src: `${IMAGE_ROOT}/Misc_imgs/${file}`,
  alt: "Mentor achievement photo",
}));

// Community links — student Discord and parent WhatsApp are intentionally
// NOT listed here for safety. Parents reach out by email first and receive
// invite links directly after contact.
const GOOGLE_CLASSROOM_URL =
  "https://classroom.google.com/c/ODU4OTg1MjM3NzQw?cjc=ucluu7jr";

// ── Summer 2026 workshop record ──
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
  { n: 1, iso: "2026-06-17", date: "Wednesday, June 17", time: "5:00 – 6:00 PM", title: "The Research Process", topic: "Foundations", loc: ASHBURN },
  { n: 2, iso: "2026-06-26", date: "Friday, June 26", time: "4:00 – 5:00 PM", title: "Refining Research Questions + Deliverable Introduction", topic: "Foundations", loc: ASHBURN },
  { n: 3, iso: "2026-07-01", date: "Wednesday, July 1", time: "4:30 – 5:30 PM", title: "Hypothesis Building + Materials and Methods Outlining", topic: "Skills", loc: BRAMBLETON },
  { n: 4, iso: "2026-07-09", date: "Thursday, July 9", time: "4:00 – 5:00 PM", title: "Data Analysis, Statistical Tests, and Applied Computer Science", topic: "Skills", loc: ASHBURN },
  { n: 5, iso: "2026-07-16", date: "Thursday, July 16", time: "4:00 – 5:00 PM", title: "Scientific Writing Part 1: Overview & Responsible AI Usage", topic: "Skills", loc: ASHBURN },
  { n: 6, iso: "2026-07-23", date: "Thursday, July 23", time: "4:00 – 5:00 PM", title: "Scientific Writing Part 2: Reading, Interpreting, and Summarizing Data", topic: "Skills", loc: ASHBURN },
  { n: 7, iso: "2026-07-30", date: "Thursday, July 30", time: "4:00 – 5:00 PM", title: "Skills Session", topic: "Skills", loc: BRAMBLETON },
  { n: 8, iso: "2026-08-06", date: "Thursday, August 6", time: "Time + Location TBD", title: "Finalizing Student Posters / Projects", topic: "Publishing", loc: null },
  { n: 9, iso: "2026-08-13", date: "Thursday, August 13", time: "Time + Location TBD", title: "Practicing Presentation", topic: "Publishing", loc: null },
];

function workshopHeld(w) {
  const end = new Date(`${w.iso}T23:59:59-04:00`);
  return Date.now() > end.getTime();
}

const STAMP_MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function stampDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${STAMP_MONTHS[m - 1]} ${d} ${y}`;
}

const WORKSHOP_GALLERIES = [
  {
    n: 1,
    photos: [
      `${WORKSHOP_ROOT}/workshop-1/photos/Thumbnail_img.jpg`,
      `${WORKSHOP_ROOT}/workshop-1/brochures/brochure1.jpg`,
      `${WORKSHOP_ROOT}/workshop-1/brochures/brochure2.jpg`,
      "IMG_0284.jpg", "IMG_0285.jpg", "IMG_0288.jpg", "IMG_0290.jpg", "IMG_0292.jpg",
      "IMG_0295.jpg", "IMG_0296.jpg", "IMG_0297.jpg", "IMG_0298.jpg", "IMG_6991.jpg",
      "IMG_6992.jpg", "IMG_6993.jpg", "IMG_6994.jpg", "IMG_6995.jpg",
    ].map((file) =>
      file.startsWith(WORKSHOP_ROOT) ? file : `${WORKSHOP_ROOT}/workshop-1/photos/${file}`
    ),
    homePicks: [0, 5, 13],
    slides: `${WORKSHOP_ROOT}/workshop-1/slides/the-research-process.pdf`,
  },
  {
    n: 2,
    photos: [
      "First.jpg", "Second.jpg", "IMG_0473.jpg", "IMG_0474.jpg", "IMG_0475.jpg",
      "IMG_0477.jpg", "IMG_0479.jpg", "IMG_0480.jpg", "IMG_0557.jpg", "IMG_0564.jpg",
      "IMG_0565.jpg", "IMG_0571.jpg", "IMG_0572.jpg", "IMG_0573.jpg", "IMG_0574.jpg",
      "IMG_0576.jpg", "IMG_0578.jpg",
    ].map((file) => `${WORKSHOP_ROOT}/workshop-2/photos/${file}`),
    homePicks: [1, 9, 13],
    slides: `${WORKSHOP_ROOT}/workshop-2/slides/slideshow-2.pdf`,
    handout: `${WORKSHOP_ROOT}/workshop-2/handouts/second.pdf`,
  },
  {
    n: 3,
    photos: [
      "Thumbnail.jpg", "Second.jpg", "IMG_0506.jpg", "IMG_0507.jpg", "IMG_0509.jpg",
      "IMG_0512.jpg", "IMG_0624.jpg", "IMG_0625.jpg", "IMG_0626.jpg", "IMG_0628.jpg",
      "IMG_0631.jpg", "IMG_0633.jpg", "IMG_0634.jpg", "IMG_0635.jpg", "IMG_0639.jpg",
      "IMG_0642.jpg", "IMG_0644.jpg", "IMG_0645.jpg", "IMG_0646.jpg", "IMG_0647.jpg",
      "IMG_0649.jpg",
    ].map((file) => `${WORKSHOP_ROOT}/workshop-3/photos/${file}`),
    homePicks: [0, 6, 14],
    slides: `${WORKSHOP_ROOT}/workshop-3/slides/workshop-3.pdf`,
  },
  {
    n: 4,
    photos: [
      "First.jpg", "Second.jpg", "Third.jpg", "Fourth.jpg", "Photo_01.jpg",
      "Photo_02.jpg", "Photo_03.jpg", "Photo_04.jpg", "Photo_05.jpg", "Photo_06.jpg",
      "Photo_07.jpg", "Photo_08.jpg", "Photo_09.jpg", "Photo_10.jpg",
    ].map((file) => `${WORKSHOP_ROOT}/workshop-4/photos/${file}`),
    homePicks: [0, 4, 9],
    slides: `${WORKSHOP_ROOT}/workshop-4/slides/slideshow.pdf`,
    handout: `${WORKSHOP_ROOT}/workshop-4/handouts/second.pdf`,
  },
  {
    n: 5,
    photos: [
      "First.jpg", "Second.jpg", "IMG_0850.jpg", "IMG_0853.jpg", "IMG_0854.jpg",
      "IMG_0855.jpg", "IMG_0856.jpg", "IMG_0858.jpg", "Photo_01.jpg", "Photo_02.jpg",
      "Photo_03.jpg", "Photo_04.jpg", "Photo_05.jpg", "Photo_06.jpg", "Photo_07.jpg",
    ].map((file) => `${WORKSHOP_ROOT}/workshop-5/photos/${file}`),
    homePicks: [0, 4, 10],
    slides: `${WORKSHOP_ROOT}/workshop-5/slides/slideshow-w5.pdf`,
    handout: `${WORKSHOP_ROOT}/workshop-5/handouts/second.pdf`,
  },
];

// One cover photo per workshop album — the hero carousel's reel.
const WORKSHOP_COVERS = WORKSHOP_GALLERIES.map((g) => {
  const w = WORKSHOPS.find((x) => x.n === g.n);
  return { src: g.photos[0], n: g.n, title: w.title };
});

// ── The Symposium & Expo (facts from the official flyer) ──
const SYMPOSIUM = {
  name: "NextInResearch Symposium & Expo",
  date: "August 22nd",
  time: "3:00 – 7:00 PM",
  address: "3625 Potomac Ave, Alexandria, VA 22305",
  agenda: [
    { time: "3:00 PM", item: "Student arrival & set-up — poster boards and props" },
    { time: "3:30 PM", item: "Doors open for families, friends, and guests" },
    { time: "3:45 PM", item: "Welcome, introductions, and a brief thank-you" },
    { time: "4:00 PM", item: "Symposium Expo — students present their research" },
    { time: "6:30 PM", item: "Social time — snacks and partner booths (Invention Convention, VJAS)" },
    { time: "7:00 PM", item: "Closing ceremony and guest speakers (runs to 8:00 PM)" },
  ],
  workingWith: [
    "Virginia Tech",
    "Fairfax County Public Schools",
    "Loudoun County Public Schools",
  ],
  flyerImg: `${import.meta.env.BASE_URL}images/NextInResearch/symposium/symposium-flyer.jpg`,
  flyerPdf: `${import.meta.env.BASE_URL}images/NextInResearch/symposium/symposium-flyer.pdf`,
};

const MISSION_PHOTO = {
  src: `${IMAGE_ROOT}/Misc_imgs/SMP_1.jpg`,
  alt: "Families filling the room at a Next In Research introduction session",
  caption: "Introduction session · Spring 2026",
};

const VOLUNTEER_SIGNUP_URL =
  "https://www.signupgenius.com/go/10C0A4BA4AA29A2FAC43-64530107-workshop#/";

const MENTOR_APPLICATION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdJbFPGDU8FRyottDfEDJQwSOIfFLhuafah0TjfgBVjAiHZyQ/viewform?usp=header";

const MENTOR_VIDEO_EMBED =
  "https://drive.google.com/file/d/1qm5lC6jQDy3LLs7C_SLQ52WUySAfspQN/preview";

// Google Classroom calendar (decoded from the shared cid) embedded read-only.
const CALENDAR_EMBED_SRC =
  "classroom114578935361340227206%40group.calendar.google.com";
const CALENDAR_PUBLIC_URL =
  "https://calendar.google.com/calendar/u/0/r?cid=Y2xhc3Nyb29tMTE0NTc4OTM1MzYxMzQwMjI3MjA2QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20";

// School roster — where students and mentors go to school. Attendance facts, not sponsorships.
const DISTRICTS = [
  "Loudoun County Public Schools",
  "Fairfax County Public Schools",
  "Thomas Jefferson HS for Science & Technology",
];

const SCHOOLS = [
  "Katherine Johnson Middle School",
  "Trailside Middle School",
  "Willard Middle School",
  "BASIS Independent School",
  "Stone Hill Middle School",
  "Watson Mountain Middle School",
  "Gum Spring Middle School",
  "Lakeside Middle School",
  "Eagle Ridge Middle School",
  "Rocky Run Middle School",
  "Brambleton Middle School",
  "Farmwell Station Middle School",
  "Belmont Ridge Middle School",
  "Woodrow Wilson Middle School",
  "Rachel Carson Middle School",
  "Seneca Ridge Middle School",
];

// ─────────────────────────────────────────────
// SHARED PIECES
// ─────────────────────────────────────────────

// The one authored motion moment: things arrive the way a rubber stamp lands.
const stampIn = (rotate = -3) => ({
  initial: { opacity: 0, scale: 1.45, rotate: rotate - 5 },
  whileInView: { opacity: 1, scale: 1, rotate },
  viewport: { once: true, margin: "-40px" },
  transition: { type: "spring", stiffness: 420, damping: 21 },
});

function Stamp({ children, color = "stamp", rotate = -3, animate = true, className }) {
  const palette = {
    stamp: "text-stamp border-stamp",
    blue: "text-stamp-blue border-stamp-blue",
    paper: "text-paper border-paper",
  }[color];
  const Tag = animate ? motion.span : "span";
  const motionProps = animate ? stampIn(rotate) : { style: { rotate: `${rotate}deg` } };
  return (
    <Tag
      {...motionProps}
      className={cn(
        "inline-block max-w-full whitespace-nowrap border-2 p-[3px] font-mono font-bold uppercase tracking-[0.14em] leading-none",
        palette,
        className
      )}
    >
      <span className="block border border-current px-2 py-1">
        {children}
      </span>
    </Tag>
  );
}

function PhotoPrint({ src, alt, caption, rotate = -1.5, className, imgClassName }) {
  return (
    <figure
      style={{ "--tilt": `${rotate}deg` }}
      className={cn(
        "bg-white p-2 pb-2.5 shadow-print rotate-[var(--tilt)] transition-transform duration-300 hover:rotate-0",
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn("block w-full object-cover", imgClassName)}
      />
      {caption && (
        <figcaption className="pt-2 font-mono text-[11px] leading-snug text-ink-soft">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// A paper card pocket — the card sits inside and pulls up on hover.
function CardPocket({ label, children }) {
  return (
    <div className="group relative pt-4">
      <div className="relative z-0 transition-transform duration-300 group-hover:-translate-y-3 group-focus-within:-translate-y-3">
        {children}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 border border-paper-shade bg-paper-shade/90 shadow-[0_-2px_8px_rgba(32,49,59,0.10)] [clip-path:polygon(0_18%,100%_0,100%_100%,0_100%)]"
      />
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-3 z-20 text-center font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-ink-soft"
      >
        {label}
      </p>
    </div>
  );
}

// The rod hole at the bottom of every catalog card.
function RodHole({ ground = "bg-paper" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border border-ink/25 shadow-[inset_0_1px_2px_rgba(32,49,59,0.3)]",
        ground
      )}
    />
  );
}

// The hero reel: one archival print, cycling through each workshop's cover photo.
function CoverCarousel() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  // Any manual interaction (arrows, dots, pause button) hands control to the visitor.
  const [playing, setPlaying] = useState(true);

  // Warm the reel so a crossfade never lands on an unloaded photo.
  useEffect(() => {
    WORKSHOP_COVERS.forEach((c) => {
      const img = new Image();
      img.src = c.src;
    });
  }, []);

  useEffect(() => {
    if (!playing || hovered) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const timer = setInterval(
      () => setActive((a) => (a + 1) % WORKSHOP_COVERS.length),
      4500
    );
    return () => clearInterval(timer);
  }, [playing, hovered]);

  const cover = WORKSHOP_COVERS[active];
  const show = (index) => {
    setPlaying(false);
    setActive((index + WORKSHOP_COVERS.length) % WORKSHOP_COVERS.length);
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Workshop cover photos"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="relative mx-auto w-full max-w-[640px]"
    >
      <figure className="rotate-[-1.2deg] bg-white p-2 pb-3 shadow-print-lg transition-transform duration-300 hover:rotate-0">
        <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
          <AnimatePresence initial={false}>
            <motion.img
              key={cover.src}
              src={cover.src}
              alt={`Workshop ${cover.n}: ${cover.title}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </div>
        <figcaption className="flex items-baseline justify-between gap-3 pt-2.5">
          <span className="min-w-0 truncate font-mono text-[11px] text-ink-soft">
            Workshop {cover.n} · {cover.title}
          </span>
          <span className="shrink-0 font-mono text-[11px] font-bold text-ink">
            {String(active + 1).padStart(2, "0")}/
            {String(WORKSHOP_COVERS.length).padStart(2, "0")}
          </span>
        </figcaption>
      </figure>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {WORKSHOP_COVERS.map((c, i) => (
            <button
              key={c.n}
              onClick={() => show(i)}
              aria-label={`Show workshop ${c.n} cover`}
              aria-current={i === active}
              className={cn(
                "h-2.5 w-2.5 rounded-full border border-paper-bright/70 transition-colors",
                i === active ? "bg-paper-bright" : "bg-transparent hover:bg-paper-bright/40"
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPlaying(!playing)}
            aria-pressed={!playing}
            aria-label={playing ? "Pause the photo reel" : "Play the photo reel"}
            className="flex h-10 w-10 items-center justify-center border border-paper-bright/50 text-paper-bright transition-colors hover:bg-paper-bright hover:text-flame"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            onClick={() => show(active - 1)}
            aria-label="Previous workshop photo"
            className="flex h-10 w-10 items-center justify-center border border-paper-bright/50 text-paper-bright transition-colors hover:bg-paper-bright hover:text-flame"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => show(active + 1)}
            aria-label="Next workshop photo"
            className="flex h-10 w-10 items-center justify-center border border-paper-bright/50 text-paper-bright transition-colors hover:bg-paper-bright hover:text-flame"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function PageShell({ children, className }) {
  return (
    <div className={cn("grain bg-paper pt-24 pb-24", className)}>
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
    </div>
  );
}

function PageTitle({ title, lead }) {
  return (
    <header className="mb-14 max-w-3xl">
      <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl">
        {title}
      </h1>
      {lead && (
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">{lead}</p>
      )}
    </header>
  );
}

// ─────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────

function Navigation({ activePage, setActivePage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    setActivePage(id);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-cloth-deep text-paper transition-shadow",
        scrolled && "shadow-[0_2px_12px_rgba(20,53,46,0.45)]"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <button
          onClick={() => go("home")}
          className="flex min-w-0 items-baseline gap-3 text-left"
        >
          <span className="whitespace-nowrap font-display text-lg font-bold tracking-tight text-paper-bright">
            Next In Research
          </span>
          <span className="hidden whitespace-nowrap font-mono text-[10px] tracking-[0.22em] text-paper/75 md:inline">
            PUBLIC RECORD · EST. 2026
          </span>
        </button>

        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {NAV_TABS.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => go(tab.id)}
                  aria-current={activePage === tab.id ? "page" : undefined}
                  className={cn(
                    "border-b-2 px-2.5 py-1.5 text-[13px] font-semibold transition-colors",
                    activePage === tab.id
                      ? "border-stamp text-paper-bright"
                      : "border-transparent text-paper/75 hover:border-paper/30 hover:text-paper-bright"
                  )}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center border border-paper/30 text-paper-bright lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            aria-label="Primary"
            className="grain fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-paper lg:hidden"
          >
            <ul className="relative px-6 py-8">
              {NAV_TABS.map((tab, i) => (
                <li key={tab.id} className="border-b border-ink/10">
                  <button
                    onClick={() => go(tab.id)}
                    aria-current={activePage === tab.id ? "page" : undefined}
                    className="flex w-full items-baseline justify-between py-4 text-left"
                  >
                    <span
                      className={cn(
                        "font-display text-2xl font-bold tracking-tight",
                        activePage === tab.id ? "text-stamp" : "text-ink"
                      )}
                    >
                      {tab.label}
                    </span>
                    <span className="font-mono text-xs text-ink-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="px-6 pb-10 font-mono text-[11px] leading-relaxed text-ink-soft">
              A free research mentorship program recorded at Ashburn &amp;
              Brambleton Public Libraries, Loudoun County, Virginia.
            </p>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─────────────────────────────────────────────
// HOME — THE RECORD
// ─────────────────────────────────────────────

function HomePage({ setActivePage }) {
  const heldCount = WORKSHOPS.filter(workshopHeld).length;

  return (
    <div>
      {/* ── First viewport: the symposium welcome ── */}
      <section className="grain bg-flame text-paper-bright">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pt-32 pb-20 sm:px-8 lg:grid-cols-[0.98fr_1.02fr] lg:gap-12 lg:pt-36 lg:pb-24">
          <div className="relative max-w-xl">
            <h1 className="font-display text-[2.9rem] font-extrabold leading-[0.98] tracking-tight text-paper-bright sm:text-6xl lg:text-[4.4rem]">
              Welcome to our Symposium&nbsp;&amp;&nbsp;Expo.
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-paper-bright/95 sm:text-xl">
              On <span className="font-semibold">{SYMPOSIUM.date}</span>, Cohort
              One's summer of real research goes public — poster boards up,
              partner booths open, guest speakers to close. {SYMPOSIUM.time} at{" "}
              {SYMPOSIUM.address}. Families, friends, and guests welcome.
            </p>
            <p className="mt-4 text-base leading-relaxed text-paper-bright/85">
              It caps Next In Research's first summer: {MENTORS.length} TJHSST
              student mentors and their middle schoolers doing research worth
              publishing, in our public libraries, free for every family. This
              site is the record.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#symposium"
                className="inline-flex items-center gap-2 bg-paper-bright px-6 py-3.5 font-semibold text-flame shadow-card transition-colors hover:bg-white"
              >
                Symposium details
                <ArrowDown className="h-4 w-4" />
              </a>
              <a
                href="#record"
                className="inline-flex items-center gap-2 border border-paper-bright/50 px-6 py-3.5 font-semibold text-paper-bright transition-colors hover:border-paper-bright"
              >
                Browse the record
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10">
              <Stamp color="paper" rotate={-2.5} className="whitespace-normal text-center">
                Free · No fees · No prerequisites
              </Stamp>
            </div>
          </div>

          <CoverCarousel />
        </div>
      </section>

      {/* ── The Symposium & Expo ── */}
      <section id="symposium" className="grain scroll-mt-16 border-t-8 border-flame-deep bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl">
              {SYMPOSIUM.date}: the work goes public.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              The {SYMPOSIUM.name} closes Cohort One's summer — every student
              presenting finished research to families, friends, and guests,
              with partner booths and a closing ceremony. Free and open, like
              everything we do.
            </p>
          </div>

          <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="red-rule relative border border-paper-shade bg-paper-bright p-7 pl-14 pb-12 shadow-print-lg sm:p-8 sm:pl-14">
              <Stamp rotate={-2}>
                {SYMPOSIUM.date} · {SYMPOSIUM.time}
              </Stamp>
              <p className="mt-4 font-mono text-[14px] font-bold text-ink">
                {SYMPOSIUM.address}
              </p>
              <ul className="mt-6">
                {SYMPOSIUM.agenda.map((slot) => (
                  <li
                    key={slot.time}
                    className="flex items-baseline gap-4 border-b border-ink/10 py-2.5"
                  >
                    <span className="w-20 shrink-0 font-mono text-[13px] font-bold text-stamp">
                      {slot.time}
                    </span>
                    <span className="font-mono text-[13px] leading-relaxed text-ink">
                      {slot.item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-[12px] leading-relaxed text-ink-soft">
                Working with {SYMPOSIUM.workingWith.join(" · ")}
              </p>
              <a
                href={SYMPOSIUM.flyerPdf}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 bg-flame px-6 py-3.5 font-semibold text-paper-bright transition-colors hover:bg-flame-deep"
              >
                Download the flyer (PDF)
                <ExternalLink className="h-4 w-4" />
              </a>
              <RodHole ground="bg-paper-bright" />
            </div>

            <PhotoPrint
              src={SYMPOSIUM.flyerImg}
              alt="NextInResearch Symposium & Expo flyer — August 22nd, 3 to 7 PM, 3625 Potomac Ave, Alexandria, VA"
              caption="The official flyer · share it with a friend"
              rotate={1.6}
              className="mx-auto w-full max-w-[420px]"
            />
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="grain border-t border-ink/10 bg-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl">
              Real research shouldn't wait for college — or cost a dime.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink">
              <p>
                Our mentors are TJHSST students — close enough in age to be
                believed, experienced enough to be useful. Each one works with
                just 1–3 middle schoolers, from first question to finished,
                shareable work: competition entries, blog posts, videos, and
                papers aimed at journals like NHSJS, JEI, and IEEE.
              </p>
              <p>
                No experience is required, and none is preferred. The goal is
                growth, not prior knowledge — and the whole thing is free,
                permanently, because the public library taught us what that
                makes possible.
              </p>
            </div>
            <button
              onClick={() => setActivePage("timeline")}
              className="mt-8 inline-flex items-center gap-2 font-semibold text-stamp transition-colors hover:text-ink"
            >
              How the summer ran, phase by phase
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <PhotoPrint
            src={MISSION_PHOTO.src}
            alt={MISSION_PHOTO.alt}
            caption={MISSION_PHOTO.caption}
            rotate={1.8}
            className="mx-auto w-full max-w-md"
            imgClassName="aspect-[4/3]"
          />
        </div>
      </section>

      {/* ── The record, workshop by workshop ── */}
      <section id="record" className="grain scroll-mt-16 border-t border-ink/10 bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl">
              What happened, week by week
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              {["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"][heldCount]}{" "}
              of nine workshops are stamped into the record so far —{" "}
              {WORKSHOP_GALLERIES.length} photo albums are shelved on the
              Workshops page, and the rest are in processing.
            </p>
          </div>

          <ol className="mt-14">
            {WORKSHOPS.map((w) => {
              const gallery = WORKSHOP_GALLERIES.find((g) => g.n === w.n);
              const held = workshopHeld(w);
              return (
                <li
                  key={w.n}
                  className="grid gap-6 border-t border-ink/15 py-10 md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr_auto]"
                >
                  <div>
                    {held ? (
                      <Stamp rotate={w.n % 2 ? -3 : 2}>{stampDate(w.iso)}</Stamp>
                    ) : (
                      <Stamp color="blue" rotate={1.5}>
                        DUE {stampDate(w.iso)}
                      </Stamp>
                    )}
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                      Workshop {w.n} · {w.topic}
                    </p>
                  </div>

                  <div className="max-w-xl">
                    <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink">
                      {w.title}
                    </h3>
                    <p className="mt-2 font-mono text-[13px] text-ink-soft">
                      {w.loc
                        ? `${w.loc.name} · ${w.loc.room} · ${w.time}`
                        : "Details shared with families directly"}
                    </p>
                    {gallery ? (
                      <button
                        onClick={() => setActivePage("workshops")}
                        className="mt-4 inline-flex items-center gap-2 font-semibold text-stamp transition-colors hover:text-ink"
                      >
                        View the album ({gallery.photos.length} photos)
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : held ? (
                      <p className="mt-4 font-mono text-[13px] text-stamp-blue">
                        Photos in processing — album coming soon.
                      </p>
                    ) : (
                      <p className="mt-4 font-mono text-[13px] text-stamp-blue">
                        The last session before the showcase.
                      </p>
                    )}
                  </div>

                  {gallery && (
                    <div className="flex items-start gap-3 md:col-span-2 lg:col-span-1 lg:w-[340px]">
                      {gallery.homePicks.map((idx, i) => (
                        <PhotoPrint
                          key={idx}
                          src={gallery.photos[idx]}
                          alt={`Workshop ${w.n} photo ${i + 1}`}
                          rotate={i === 1 ? 1.6 : -1.8}
                          className={cn("w-1/3", i === 1 && "mt-4")}
                          imgClassName="aspect-square"
                        />
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── The ledger ── */}
      <section className="grain bg-cloth text-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
          <div className="max-w-md">
            <h2 className="font-display text-3xl font-bold leading-[1.04] tracking-tight text-paper-bright sm:text-5xl">
              The collection, counted
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-paper/85">
              No inflated impact math here. Every number in this ledger is
              countable on this site — click a row and count for yourself.
              Student totals and volunteer hours join the record once the
              symposium closes the summer.
            </p>
          </div>

          <div className="ruled relative border border-paper-shade bg-paper-bright px-6 pt-6 pb-10 shadow-print-lg sm:px-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
              Accession ledger · Summer 2026
            </p>
            <ul className="mt-4">
              {[
                { label: "TJHSST student mentors", value: MENTORS.length, page: "team" },
                { label: "Workshop photo albums shelved", value: WORKSHOP_GALLERIES.length, page: "workshops" },
                { label: "Workshops in the series", value: WORKSHOPS.length, page: "workshops" },
                { label: "Public library branches", value: 2, page: "schedule" },
                { label: "Schools represented", value: SCHOOLS.length, page: null },
                { label: "Students per mentor", value: "1–3", page: "faq" },
                { label: "Cost to any family, ever", value: "$0", page: "faq" },
              ].map((row) => {
                const inner = (
                  <>
                    <span className="font-mono text-[15px] text-ink">{row.label}</span>
                    <span
                      aria-hidden="true"
                      className="mx-2 flex-1 border-b border-dotted border-ink/35"
                    />
                    <span className="font-mono text-xl font-bold text-stamp">
                      {row.value}
                    </span>
                  </>
                );
                return (
                  <li key={row.label}>
                    {row.page ? (
                      <button
                        onClick={() => setActivePage(row.page)}
                        className="flex w-full items-baseline py-2 text-left transition-colors hover:bg-paper"
                      >
                        {inner}
                      </button>
                    ) : (
                      <a
                        href="#schools"
                        className="flex w-full items-baseline py-2 text-left transition-colors hover:bg-paper"
                      >
                        {inner}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-ink-soft">
              Entry pending: students served &amp; mentor volunteer hours —
              stamped after the August 22 symposium.
            </p>
            <RodHole ground="bg-paper-bright" />
          </div>
        </div>
      </section>

      {/* ── Mentor catalog preview ── */}
      <section className="grain border-t-8 border-cloth-deep bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl">
              Twenty-nine mentors, catalogued
            </h2>
            <button
              onClick={() => setActivePage("team")}
              className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-semibold text-paper-bright transition-colors hover:bg-cloth"
            >
              Open the card catalog
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Every mentor is a TJHSST student with real research behind them —
            published papers, science fair placements, internships — filed
            here under their own call number.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[MENTORS[0], MENTORS[16], MENTORS[11]].map((m) => (
              <CardPocket key={m.name} label="Cohort One · Staff">
                <CatalogCard mentor={m} compact />
              </CardPocket>
            ))}
          </div>
        </div>
      </section>

      {/* ── Schools ── */}
      <section id="schools" className="grain scroll-mt-16 bg-cloth-deep text-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
          <h2 className="max-w-3xl font-display text-3xl font-bold leading-[1.04] tracking-tight text-paper-bright sm:text-5xl">
            Registered from sixteen schools
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/85">
            Where Cohort One's students and mentors go to school, across two
            counties. Listed as fact — these schools are our community, not our
            sponsors.
          </p>
          <ul className="mt-10 columns-1 gap-x-10 sm:columns-2 lg:columns-3">
            {SCHOOLS.map((school) => (
              <li
                key={school}
                className="flex items-baseline gap-3 border-b border-paper/15 py-2.5 font-mono text-[14px] text-paper/90"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-flame-bright" />
                {school}
              </li>
            ))}
          </ul>
          <p className="mt-8 font-mono text-[12px] tracking-[0.06em] text-paper/75">
            Districts: {DISTRICTS.join(" · ")}
          </p>
        </div>
      </section>

      {/* ── On hold: what's next ── */}
      <section className="grain bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <h2 className="max-w-3xl font-display text-3xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl">
            On hold for next summer
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Cohort One is the proof, not the finish line. Three reservations
            already on the shelf:
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                hold: "HOLD FOR: SUMMER 2027",
                title: "The next cohort",
                body: "Next In Research returns next summer. Applications open in spring 2027 — email us and you'll hear the moment they do.",
                rotate: -1.2,
              },
              {
                hold: "HOLD FOR: AUGUST 22",
                title: "The student collection",
                body: "After the Symposium & Expo on August 22, Cohort One's posters, papers, and projects get catalogued right here — the shelf this whole site was built for.",
                rotate: 1.4,
              },
              {
                hold: "HOLD FOR: MORE BRANCHES",
                title: "A bigger map",
                body: "More districts, more libraries, more mentors across more specialties — the same free, near-peer model, carried further.",
                rotate: -0.8,
              },
            ].map((slip) => (
              <div
                key={slip.title}
                style={{ "--tilt": `${slip.rotate}deg` }}
                className="relative rotate-[var(--tilt)] border border-paper-shade bg-paper-bright p-6 pb-12 shadow-card transition-transform duration-300 hover:rotate-0"
              >
                <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-stamp-blue">
                  {slip.hold}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">
                  {slip.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink">{slip.body}</p>
                <RodHole ground="bg-paper-bright" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Close ── */}
      <section className="grain bg-flame text-paper-bright">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 lg:py-32">
          <Stamp color="paper" rotate={-2}>
            The record stays open
          </Stamp>
          <h2 className="mt-8 font-display text-4xl font-bold leading-[1.02] tracking-tight text-paper-bright sm:text-6xl">
            Want the next chapter to include you?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper-bright/90">
            Families: email the coordinators and we'll keep you posted on
            Summer 2027. TJ students: the mentor desk is hiring.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${FOUNDERS[0].email},${FOUNDERS[1].email}`}
              className="inline-flex items-center gap-2 bg-paper-bright px-6 py-3.5 font-semibold text-flame shadow-card transition-colors hover:bg-white"
            >
              <Mail className="h-4 w-4" />
              Email the coordinators
            </a>
            <button
              onClick={() => setActivePage("involved")}
              className="inline-flex items-center gap-2 border border-paper-bright/50 px-6 py-3.5 font-semibold text-paper-bright transition-colors hover:border-paper-bright"
            >
              Become a mentor
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────
// TIMELINE — THE SUMMER
// ─────────────────────────────────────────────

function TimelinePage() {
  return (
    <PageShell>
      <PageTitle
        title="How the summer ran"
        lead="Three phases carried Cohort One from first brainstorm to publishable work — planning in spring, building through the library workshop series, publishing in August."
      />

      <div className="mb-14 flex flex-wrap items-start gap-5">
        {TIMELINE_PHOTOS.map((photo, i) => (
          <PhotoPrint
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            caption={i === 0 ? "Introduction sessions · Spring 2026" : undefined}
            rotate={i === 1 ? 1.6 : -1.4}
            className={cn("w-[220px] flex-1 basis-[180px] sm:flex-none", i === 1 && "mt-5")}
            imgClassName="aspect-[4/3]"
          />
        ))}
      </div>

      <ol className="space-y-10">
        {PHASES.map((phase) => (
          <li
            key={phase.phase}
            className="red-rule relative border border-paper-shade bg-paper-bright shadow-card"
          >
            <div className="grid gap-6 p-7 pl-14 sm:p-9 sm:pl-16 md:grid-cols-[160px_1fr]">
              <div>
                <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-stamp">
                  {phase.phase}
                </p>
                <p className="mt-1 font-display text-5xl font-extrabold leading-none tracking-tight text-ink/15">
                  {phase.number}
                </p>
                <p className="mt-4 font-mono text-[13px] text-ink-soft">
                  {phase.timeline} 2026
                </p>
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
                  {phase.title}
                </h2>
                <p className="mt-3 max-w-xl leading-relaxed text-ink">
                  {phase.description}
                </p>
                <ul className="mt-5 max-w-xl space-y-2">
                  {phase.details.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-stamp"
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-16 border-t-2 border-ink/20 pt-10">
        <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-tight text-ink sm:text-4xl">
          And after August?
        </h2>
        <div className="mt-5 max-w-2xl space-y-4 text-lg leading-relaxed text-ink">
          <p>
            The Symposium & Expo on August 22 closes the summer, and the work
            goes public: student posters, papers, and projects join this site's
            collection right after. Then the model grows — Summer 2027, more districts, more
            libraries, a larger mentor staff.
          </p>
          <p>
            Every student leaves with something real to point at — a
            publication, a competition entry, a live project — and a bench of
            mentors who believe in their potential.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

// ─────────────────────────────────────────────
// TEAM — THE CARD CATALOG
// ─────────────────────────────────────────────

function CatalogCard({ mentor, compact = false }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={cn(
        "relative flex flex-col border border-paper-shade bg-paper-bright shadow-card",
        compact ? "pb-24" : "pb-9"
      )}
    >
      {/* The portrait leads — a full-width print mounted at the top of the card. */}
      <div className="p-3 pb-0">
        <div className="bg-white p-1.5 pb-2 shadow-print">
          <img
            src={mentor.image}
            alt={`${mentor.name} portrait`}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: mentor.pos }}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </div>

      <div className="red-rule flex-1 px-4 pl-12 pt-4">
        <p className="font-mono text-[12px] text-stamp">{mentor.call}</p>
        <h3 className="mt-1 font-mono text-[15px] font-bold uppercase tracking-[0.06em] text-ink">
          {mentor.name}
        </h3>
        <p className="mt-1 font-mono text-[13px] leading-snug text-ink-soft">
          {mentor.focus}
        </p>
        {!compact && (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-stamp-blue">
            {mentor.grade} · TJHSST
          </p>
        )}
      </div>

      {!compact && (
        <>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className="mx-4 ml-12 mt-3 flex items-center justify-between border-t border-ink/15 py-2.5 text-left font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:text-stamp"
          >
            {open ? "Close card" : "Read card"}
            <ChevronDown
              className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")}
            />
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.24 }}
                className="overflow-hidden"
              >
                <p className="px-4 pb-4 pl-12 font-mono text-[13px] leading-relaxed text-ink">
                  {mentor.bio}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
      <RodHole ground="bg-paper-bright" />
    </article>
  );
}

function TeamPage() {
  const [gradeFilter, setGradeFilter] = useState("All");

  const ordered = [...MENTORS].sort(
    (a, b) => gradeRank(a.grade) - gradeRank(b.grade) || a.name.localeCompare(b.name)
  );
  const shown =
    gradeFilter === "All" ? ordered : ordered.filter((m) => m.grade === gradeFilter);

  return (
    <PageShell>
      <PageTitle
        title="The card catalog"
        lead="Two coordinators built the program; twenty-nine TJHSST mentors run it. Every card below is a real person who gave their summer to a middle schooler's first research project."
      />

      {/* Coordinators */}
      <div className="grid gap-6 md:grid-cols-2">
        {FOUNDERS.map((person) => (
          <article
            key={person.name}
            className="relative border border-paper-shade bg-paper-bright pb-10 shadow-card"
          >
            <div className="grid gap-4 p-4 sm:grid-cols-[200px_1fr] sm:gap-5">
              <div className="bg-white p-1.5 pb-2 shadow-print">
                <img
                  src={person.image}
                  alt={`${person.name} portrait`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover object-[50%_25%]"
                />
              </div>
              <div className="red-rule min-w-0 pl-12 pt-1">
                <p className="font-mono text-[12px] text-stamp">{person.call}</p>
                <h2 className="mt-1.5 break-words font-mono text-base font-bold uppercase tracking-[0.05em] text-ink sm:text-lg">
                  {person.name}
                </h2>
                <p className="mt-1 font-mono text-[13px] text-ink-soft">
                  {person.role}
                </p>
                <p className="mt-1 font-mono text-[13px] text-ink-soft">
                  {person.interest} · {person.school}
                </p>
                <a
                  href={`mailto:${person.email}`}
                  className="mt-4 inline-flex items-center gap-2 break-all text-left font-mono text-[13px] font-bold text-stamp transition-colors hover:text-ink"
                >
                  <Mail className="h-4 w-4" />
                  {person.email}
                </a>
              </div>
            </div>
            <RodHole ground="bg-paper-bright" />
          </article>
        ))}
      </div>

      {/* Drawer filters */}
      <div className="mt-20 mb-8 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          The mentor drawer
        </h2>
        <div role="group" aria-label="Filter mentors by grade" className="flex flex-wrap gap-2">
          {GRADE_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setGradeFilter(f.id)}
              aria-pressed={gradeFilter === f.id}
              className={cn(
                "border px-4 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em] transition-colors",
                gradeFilter === f.id
                  ? "border-ink bg-ink text-paper-bright"
                  : "border-ink/30 text-ink hover:border-ink"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((m) => (
          <CatalogCard key={m.name} mentor={m} />
        ))}
      </div>

      {/* Achievement wall */}
      <div className="mt-24">
        <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-tight text-ink sm:text-4xl">
          What the staff has done
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Science fair medals, published papers, competition podiums — the
          mentors' own research records, pinned up as prints.
        </p>
        <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4 [&>figure]:mb-4 [&>figure]:break-inside-avoid">
          {MISC_PHOTOS.map((photo, i) => (
            <PhotoPrint
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              rotate={i % 3 === 0 ? -1.5 : i % 3 === 1 ? 1.2 : -0.6}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}

// ─────────────────────────────────────────────
// SCHEDULE — THE CIRCULATION CARD
// ─────────────────────────────────────────────

function SchedulePage({ setActivePage }) {
  const goToSymposium = (e) => {
    e.preventDefault();
    setActivePage("home");
    // Let the home page paint, then bring the symposium section into view.
    setTimeout(() => {
      document.getElementById("symposium")?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  return (
    <PageShell>
      <PageTitle
        title="The circulation schedule"
        lead="Nine free workshops carry the series from the fundamentals of research to presenting finished work — hosted at Loudoun County public libraries, with the final sessions arranged with families directly."
      />

      {/* Desktop table */}
      <div className="relative hidden border border-paper-shade bg-paper-bright shadow-card md:block">
        <table className="w-full border-collapse">
          <caption className="sr-only">
            Summer 2026 workshop schedule with dates, locations, and status
          </caption>
          <thead>
            <tr className="border-b-2 border-ink/30 text-left">
              {["No.", "Date", "Workshop", "Location", "Status"].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {WORKSHOPS.map((w) => {
              const held = workshopHeld(w);
              return (
                <tr key={w.n} className="border-b border-ink/10 align-top">
                  <td className="px-5 py-4 font-mono text-[14px] font-bold text-ink">
                    {w.n}
                  </td>
                  <td className="px-5 py-4 font-mono text-[13px] text-ink">
                    {w.date}
                    <span className="block text-ink-soft">{w.time}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-semibold leading-snug text-ink">{w.title}</span>
                    <span className="block font-mono text-[12px] uppercase tracking-[0.14em] text-stamp-blue">
                      {w.topic}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-[13px] text-ink">
                    {w.loc ? (
                      <>
                        {w.loc.name}
                        <span className="block text-ink-soft">{w.loc.room}</span>
                      </>
                    ) : (
                      <span className="text-ink-soft">Announced to families</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {held ? (
                      <Stamp rotate={w.n % 2 ? -3 : 2} className="text-[11px]">
                        Held
                      </Stamp>
                    ) : (
                      <Stamp color="blue" rotate={1.5} className="text-[11px]">
                        Due
                      </Stamp>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ol className="space-y-4 md:hidden">
        {WORKSHOPS.map((w) => {
          const held = workshopHeld(w);
          return (
            <li
              key={w.n}
              className="border border-paper-shade bg-paper-bright p-5 shadow-card"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-soft">
                  Workshop {w.n} · {w.topic}
                </p>
                {held ? (
                  <Stamp rotate={-3} animate={false} className="text-[10px]">
                    Held
                  </Stamp>
                ) : (
                  <Stamp color="blue" rotate={2} animate={false} className="text-[10px]">
                    Due
                  </Stamp>
                )}
              </div>
              <h2 className="mt-2 font-display text-xl font-bold leading-tight tracking-tight text-ink">
                {w.title}
              </h2>
              <p className="mt-2 font-mono text-[13px] text-ink">
                {w.date} · {w.time}
              </p>
              <p className="mt-1 font-mono text-[13px] text-ink-soft">
                {w.loc ? `${w.loc.name} · ${w.loc.room}` : "Location announced to families"}
              </p>
            </li>
          );
        })}
      </ol>

      <p className="mt-6 max-w-2xl font-mono text-[13px] leading-relaxed text-ink-soft">
        Library addresses: {ASHBURN.name}, {ASHBURN.address} · {BRAMBLETON.name},{" "}
        {BRAMBLETON.address}
      </p>

      {/* Mentor volunteer slots */}
      {/* The finale */}
      <div className="relative mt-16 border border-paper-shade bg-paper-bright p-7 pb-12 shadow-print-lg sm:p-9">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-ink sm:text-4xl">
              Then the series ends where research should: in public.
            </h2>
            <p className="mt-4 leading-relaxed text-ink">
              The {SYMPOSIUM.name} — {SYMPOSIUM.date}, {SYMPOSIUM.time} at{" "}
              {SYMPOSIUM.address}. Students present their finished work;
              families, friends, and guests are welcome from 3:30 PM.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="/#symposium"
                onClick={goToSymposium}
                className="inline-flex items-center gap-2 bg-flame px-5 py-3 font-semibold text-paper-bright transition-colors hover:bg-flame-deep"
              >
                Full agenda
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={SYMPOSIUM.flyerPdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-ink/30 px-5 py-3 font-semibold text-ink transition-colors hover:border-ink"
              >
                The flyer (PDF)
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
          <Stamp rotate={2}>{SYMPOSIUM.date} · 3–7 PM</Stamp>
        </div>
        <RodHole ground="bg-paper-bright" />
      </div>

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="red-rule relative border border-paper-shade bg-paper-bright p-7 pl-14 pb-10 shadow-card">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
            Staff sign-up
          </h2>
          <p className="mt-3 leading-relaxed text-ink">
            Mentors claim workshop shifts through SignUpGenius — every session
            is staffed by TJHSST mentors plus a supervising adult.
          </p>
          <a
            href={VOLUNTEER_SIGNUP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 bg-ink px-5 py-3 font-semibold text-paper-bright transition-colors hover:bg-cloth"
          >
            Open the volunteer sheet
            <ExternalLink className="h-4 w-4" />
          </a>
          <RodHole ground="bg-paper-bright" />
        </div>

        <div className="border border-paper-shade bg-paper-bright p-4 shadow-card">
          <div className="flex items-center justify-between gap-4 px-2 pb-3 pt-1">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
              The program calendar
            </h2>
            <a
              href={CALENDAR_PUBLIC_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-stamp transition-colors hover:text-ink"
            >
              Add to yours
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <iframe
            title="Next In Research program calendar"
            src={`https://calendar.google.com/calendar/embed?src=${CALENDAR_EMBED_SRC}&ctz=America%2FNew_York&mode=AGENDA&showTitle=0&showPrint=0&showCalendars=0`}
            className="h-[420px] w-full border border-paper-shade bg-white"
            loading="lazy"
          />
        </div>
      </div>
    </PageShell>
  );
}

// ─────────────────────────────────────────────
// WORKSHOPS — THE ALBUMS
// ─────────────────────────────────────────────

function WorkshopAlbum({ photos, title }) {
  const [active, setActive] = useState(0);

  const prev = () => setActive((c) => (c - 1 + photos.length) % photos.length);
  const next = () => setActive((c) => (c + 1) % photos.length);

  return (
    <div className="flex h-full flex-col border border-paper-shade bg-paper-bright p-4 shadow-card">
      <div className="relative flex min-h-[380px] flex-1 items-center justify-center bg-ink/[0.045] p-3 sm:min-h-[460px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={photos[active]}
            src={photos[active]}
            alt={`${title} — photo ${active + 1} of ${photos.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            loading={active === 0 ? "lazy" : "eager"}
            decoding="async"
            className="max-h-[420px] max-w-full border-4 border-white object-contain shadow-print"
          />
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-between pt-3">
        <p className="font-mono text-[13px] font-bold text-ink">
          Print {String(active + 1).padStart(2, "0")} /{" "}
          {String(photos.length).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="flex h-10 w-10 items-center justify-center border border-ink/30 text-ink transition-colors hover:bg-ink hover:text-paper-bright"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next photo"
            className="flex h-10 w-10 items-center justify-center border border-ink/30 text-ink transition-colors hover:bg-ink hover:text-paper-bright"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function WorkshopsPage() {
  return (
    <PageShell>
      <PageTitle
        title="The albums"
        lead="Each workshop's photo album sits beside the slides and handouts the students actually used. New albums are shelved as sessions wrap."
      />

      <div className="space-y-16">
        {WORKSHOPS.map((w) => {
          const gallery = WORKSHOP_GALLERIES.find((g) => g.n === w.n);
          const held = workshopHeld(w);
          const title = `Workshop ${w.n}: ${w.title}`;

          if (!gallery) {
            return (
              <section
                key={w.n}
                className="border border-dashed border-ink/30 bg-paper-bright/50 p-7 sm:p-9"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-xl">
                    <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
                      {title}
                    </h2>
                    <p className="mt-2 font-mono text-[13px] text-ink-soft">
                      {w.date} · {w.time}
                      {w.loc ? ` · ${w.loc.name}` : ""}
                    </p>
                    <p className="mt-4 font-mono text-[13px] text-stamp-blue">
                      {held
                        ? "Photos in processing — album coming soon."
                        : "Album arrives after the session."}
                    </p>
                  </div>
                  {held ? (
                    <Stamp rotate={-3}>{stampDate(w.iso)}</Stamp>
                  ) : (
                    <Stamp color="blue" rotate={2}>
                      DUE {stampDate(w.iso)}
                    </Stamp>
                  )}
                </div>
              </section>
            );
          }

          return (
            <section key={w.n}>
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-2xl">
                  <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-ink sm:text-4xl">
                    {title}
                  </h2>
                  <p className="mt-2 font-mono text-[13px] text-ink-soft">
                    {w.date} · {w.time}
                    {w.loc ? ` · ${w.loc.name}, ${w.loc.room}` : ""}
                  </p>
                </div>
                <Stamp rotate={w.n % 2 ? -3 : 2}>{stampDate(w.iso)}</Stamp>
              </div>

              <div className="grid items-stretch gap-6 lg:grid-cols-2">
                <WorkshopAlbum photos={gallery.photos} title={title} />

                <div className="flex h-full flex-col border border-paper-shade bg-paper-bright p-4 shadow-card">
                  <div className="flex items-center justify-between gap-4 px-1 pb-3 pt-1">
                    <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                      The slides
                    </h3>
                    <div className="flex items-center gap-4">
                      {gallery.handout && (
                        <a
                          href={gallery.handout}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-stamp-blue transition-colors hover:text-ink"
                        >
                          Handout
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      <a
                        href={gallery.slides}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-stamp transition-colors hover:text-ink"
                      >
                        Open
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  <iframe
                    src={gallery.slides}
                    title={`${title} slides`}
                    className="min-h-[380px] w-full flex-1 border border-paper-shade bg-white sm:min-h-[460px]"
                    loading="lazy"
                  />
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </PageShell>
  );
}

// ─────────────────────────────────────────────
// STUDENTS — THE STUDENT COLLECTION
// ─────────────────────────────────────────────

function StudentsPage() {
  return (
    <PageShell>
      <PageTitle
        title="The student collection"
        lead="The shelf this site was built for — and the one honest gap in it, for a few more weeks."
      />

      <div className="red-rule relative max-w-3xl border border-paper-shade bg-paper-bright p-8 pl-14 pb-14 shadow-print-lg sm:p-10 sm:pl-16">
        <Stamp color="blue" rotate={-2}>
          In processing
        </Stamp>
        <h2 className="mt-6 font-display text-3xl font-bold leading-[1.05] tracking-tight text-ink sm:text-4xl">
          Cohort One's work goes public on August 22.
        </h2>
        <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink">
          <p>
            All summer, students have been building toward finished, shareable
            deliverables — research posters, papers aimed at journals like
            NHSJS, JEI, and IEEE, competition entries, blog posts, and videos.
          </p>
          <p>
            When the Symposium & Expo closes the summer on August 22, every finished project
            gets catalogued here: the student, the question they chased, and
            the thing they made. No samples, no placeholders — we'd rather show
            you an empty shelf than a fake one.
          </p>
        </div>
        <p className="mt-6 font-mono text-[13px] text-ink-soft">
          Filed under: HOLD FOR AUGUST 22 · see the record's ledger for what's
          already countable.
        </p>
        <RodHole ground="bg-paper-bright" />
      </div>
    </PageShell>
  );
}

// ─────────────────────────────────────────────
// GET INVOLVED — JOIN THE STAFF
// ─────────────────────────────────────────────

function GetInvolvedPage() {
  return (
    <PageShell>
      <PageTitle
        title="Join the staff"
        lead="Next In Research is run entirely by TJHSST students. If that's you, the mentor desk is hiring for the seasons ahead — lead a team of 1–3 middle school researchers and earn volunteer hours doing work that actually matters."
      />

      <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="red-rule relative border border-paper-shade bg-paper-bright p-7 pl-14 pb-12 shadow-card">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
            The mentor application
          </h2>
          <p className="mt-3 leading-relaxed text-ink">
            Tell us your research background and the fields you'd love to teach.
            Every mentor gets matched with students whose interests fit their
            own.
          </p>
          <a
            href={MENTOR_APPLICATION_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-stamp px-6 py-3.5 font-semibold text-paper-bright transition-colors hover:bg-ink"
          >
            Open the application
            <ExternalLink className="h-4 w-4" />
          </a>
          <p className="mt-6 border-t border-ink/15 pt-5 leading-relaxed text-ink">
            Already on staff? Workshop shifts are claimed on{" "}
            <a
              href={VOLUNTEER_SIGNUP_URL}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-stamp transition-colors hover:text-ink"
            >
              the volunteer sheet
            </a>
            .
          </p>
          <RodHole ground="bg-paper-bright" />
        </div>

        <div className="border border-paper-shade bg-paper-bright p-4 shadow-card">
          <h2 className="px-1 pb-3 pt-1 font-display text-2xl font-bold tracking-tight text-ink">
            Hear it from the coordinators
          </h2>
          <iframe
            src={MENTOR_VIDEO_EMBED}
            title="Next In Research mentor application video"
            allow="autoplay; fullscreen"
            allowFullScreen
            className="aspect-video w-full border border-paper-shade bg-white"
            loading="lazy"
          />
        </div>
      </div>
    </PageShell>
  );
}

// ─────────────────────────────────────────────
// FAQ — THE REFERENCE DESK
// ─────────────────────────────────────────────

function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <PageShell>
      <PageTitle
        title="The reference desk"
        lead="Everything families and students ask us, answered plainly."
      />

      <div className="max-w-3xl space-y-3">
        {FAQ_DATA.map((item, i) => {
          const open = openIndex === i;
          return (
            <div
              key={item.q}
              className={cn(
                "red-rule border bg-paper-bright shadow-card transition-colors",
                open ? "border-ink/40" : "border-paper-shade"
              )}
            >
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 pl-14 text-left"
              >
                <span
                  className={cn(
                    "font-semibold leading-snug",
                    open ? "text-stamp" : "text-ink"
                  )}
                >
                  {item.q}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-ink-soft transition-transform duration-200",
                    open && "rotate-180 text-stamp"
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 pl-14 leading-relaxed text-ink">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}

// ─────────────────────────────────────────────
// CONTACT — THE FRONT DESK
// ─────────────────────────────────────────────

function ContactPage() {
  return (
    <PageShell>
      <PageTitle
        title="The front desk"
        lead="Questions about the program, next summer, or anything in this record — the coordinators read every email."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {FOUNDERS.map((person) => (
          <a
            key={person.name}
            href={`mailto:${person.email}`}
            className="group relative border border-paper-shade bg-paper-bright pb-10 shadow-card transition-shadow hover:shadow-print-lg"
          >
            <div className="grid gap-4 p-4 sm:grid-cols-[200px_1fr] sm:gap-5">
              <div className="bg-white p-1.5 pb-2 shadow-print">
                <img
                  src={person.image}
                  alt={`${person.name} portrait`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover object-[50%_25%]"
                />
              </div>
              <div className="red-rule min-w-0 pl-12 pt-1">
                <p className="font-mono text-[12px] text-stamp">{person.call}</p>
                <h2 className="mt-1.5 break-words font-mono text-base font-bold uppercase tracking-[0.05em] text-ink sm:text-lg">
                  {person.name}
                </h2>
                <p className="mt-1 font-mono text-[13px] text-ink-soft">
                  {person.role}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 break-all font-mono text-[13px] font-bold text-stamp transition-colors group-hover:text-ink">
                  <Mail className="h-4 w-4" />
                  {person.email}
                </p>
              </div>
            </div>
            <RodHole ground="bg-paper-bright" />
          </a>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="red-rule relative border border-paper-shade bg-paper-bright p-7 pl-14 pb-10 shadow-card">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink">
            Google Classroom
          </h2>
          <p className="mt-2 leading-relaxed text-ink">
            Optional enrichment assignments for enrolled students who want a
            head start.
          </p>
          <a
            href={GOOGLE_CLASSROOM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 font-semibold text-stamp transition-colors hover:text-ink"
          >
            Open the classroom
            <ExternalLink className="h-4 w-4" />
          </a>
          <RodHole ground="bg-paper-bright" />
        </div>

        <div className="red-rule relative border border-paper-shade bg-paper-bright p-7 pl-14 pb-10 shadow-card">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink">
            About our private channels
          </h2>
          <p className="mt-2 leading-relaxed text-ink">
            Student and parent chat invites are shared personally after you
            email us — never posted publicly, for everyone's safety. An adult
            is present at every in-person meeting.
          </p>
          <RodHole ground="bg-paper-bright" />
        </div>
      </div>
    </PageShell>
  );
}

// ─────────────────────────────────────────────
// FOOTER — THE DESK, AFTER HOURS
// ─────────────────────────────────────────────

function Footer({ setActivePage }) {
  return (
    <footer className="grain bg-cloth-deep text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight text-paper-bright">
            Next In Research
          </p>
          <p className="mt-3 max-w-sm leading-relaxed text-paper/80">
            A free summer research mentorship program pairing TJHSST student
            mentors with middle schoolers — recorded at Ashburn &amp;
            Brambleton Public Libraries, Loudoun County, Virginia.
          </p>
          <p className="mt-6 font-mono text-[11px] tracking-[0.18em] text-paper/70">
            NO FEES · NO FINES · NO PREREQUISITES
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-paper/70">
            The collection
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {NAV_TABS.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActivePage(tab.id)}
                  className="py-1 text-[14px] text-paper/85 transition-colors hover:text-paper-bright"
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-paper/70">
            The desk
          </p>
          <ul className="mt-4 space-y-2">
            {FOUNDERS.map((person) => (
              <li key={person.email}>
                <a
                  href={`mailto:${person.email}`}
                  className="inline-flex items-center gap-2 text-[14px] text-paper/85 transition-colors hover:text-paper-bright"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {person.email}
                </a>
              </li>
            ))}
            <li>
              <a
                href={GOOGLE_CLASSROOM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[14px] text-paper/85 transition-colors hover:text-paper-bright"
              >
                <ExternalLink className="h-4 w-4 shrink-0" />
                Google Classroom
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <p className="mx-auto max-w-7xl px-5 py-5 font-mono text-[11px] tracking-[0.08em] text-paper/70 sm:px-8">
          Last stamped August 2026 · This record grows as the collection does —
          student work arrives after the August 22 symposium.
        </p>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────

export default function App() {
  const [activePage, setActivePageState] = useState(() =>
    pathToPage(window.location.pathname)
  );

  useEffect(() => {
    const onPop = () => setActivePageState(pathToPage(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const setActivePage = (id) => {
    const path = pageToPath(id);
    if (window.location.pathname !== path) {
      window.history.pushState(null, "", path);
    }
    setActivePageState(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const pages = {
    home: <HomePage setActivePage={setActivePage} />,
    timeline: <TimelinePage />,
    team: <TeamPage />,
    schedule: <SchedulePage setActivePage={setActivePage} />,
    workshops: <WorkshopsPage />,
    students: <StudentsPage />,
    involved: <GetInvolvedPage />,
    faq: <FAQPage />,
    contact: <ContactPage />,
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-cloth font-body text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper-bright focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <Navigation activePage={activePage} setActivePage={setActivePage} />
        <main id="main">{pages[activePage] || pages.home}</main>
        <Footer setActivePage={setActivePage} />
      </div>
    </MotionConfig>
  );
}
