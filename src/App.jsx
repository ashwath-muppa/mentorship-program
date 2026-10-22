import { useState, useEffect, useRef, createContext, useContext } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import {
  Mail, ExternalLink, Menu, X, ChevronDown,
  ChevronLeft, ChevronRight, ArrowRight,
} from "lucide-react";
import { cn } from "./lib/utils";
import {
  MISSION, VISION, HEADLINE, HERO_PHOTO, PHOTO_CREDIT, HEADLINE_NUMBERS,
  COHORT_STORY, PRESS, SYMPOSIUM_DAY, THANKS, RESEARCH_FIELDS,
  GALLERY_CATEGORIES, SYMPOSIUM_PHOTOS, TOP_TEN, FOUNDER_QUOTES, WAYS_TO_HELP,
  symposiumPhotoSrc,
} from "./data/cohortOne";

/*
  THE LIBRARY RECORD — world contract: seed 1ec49fef. The home page is
  "The Front Page" (seed afe8fa7a); both live in index.html.
  Flame fields · buckram cloth · paper objects · rubber-stamp ink · typed records.
*/

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const IMAGE_ROOT = `${import.meta.env.BASE_URL}images/NextInResearch/optimized`;
const WORKSHOP_ROOT = `${import.meta.env.BASE_URL}images/NextInResearch/workshops`;

// The Cohort One archive — one top-level tab, its pages always one click away.
const COHORT_PAGES = [
  { id: "cohort", path: "/cohort-one", label: "Cohort One", title: "Cohort One, Summer 2026" },
  { id: "cohort-symposium", path: "/cohort-one/symposium", label: "Symposium & Gallery", title: "The Symposium & Expo" },
  { id: "cohort-projects", path: "/cohort-one/projects", label: "Student Projects", title: "Student Projects" },
  { id: "cohort-workshops", path: "/cohort-one/workshops", label: "Workshops", title: "Workshop Albums" },
  { id: "cohort-schedule", path: "/cohort-one/schedule", label: "Schedule (2026)", title: "The 2026 Schedule" },
  { id: "cohort-summer", path: "/cohort-one/summer", label: "The Summer", title: "How the Summer Ran" },
];

// Route table — each tab maps to a real URL path.
const NAV_TABS = [
  { id: "home", path: "/", label: "Home" },
  { id: "cohort", path: "/cohort-one", label: "Cohort One", children: COHORT_PAGES },
  { id: "team", path: "/team", label: "Team", title: "The Team" },
  { id: "news", path: "/news", label: "News", title: "In the News" },
  { id: "involved", path: "/getinvolved", label: "Get Involved", title: "Back Cohort Two" },
  { id: "faq", path: "/faq", label: "FAQ", title: "FAQ" },
  { id: "contact", path: "/contact", label: "Contact", title: "Contact" },
];

const ROUTES = [...NAV_TABS.filter((tab) => !tab.children), ...COHORT_PAGES];

// Old addresses keep working — they land on the page's new home in the archive.
const PATH_ALIASES = {
  "/home": "home",
  "/team-and-mentors": "team",
  "/apply": "contact",
  "/press": "news",
  "/timeline": "cohort-summer",
  "/schedule": "cohort-schedule",
  "/summerschedule": "cohort-schedule",
  "/workshops": "cohort-workshops",
  "/students": "cohort-projects",
  "/symposium": "cohort-symposium",
};

function cleanPath(pathname) {
  return (pathname || "/").replace(/\/+$/, "") || "/";
}

function pathToPage(pathname) {
  const clean = cleanPath(pathname);
  if (PATH_ALIASES[clean]) return PATH_ALIASES[clean];
  const match = ROUTES.find((r) => r.path === clean);
  return match ? match.id : "home";
}

function pageToPath(id) {
  const match = ROUTES.find((r) => r.id === id);
  return match ? match.path : "/";
}

function isCohortPage(id) {
  return id === "cohort" || id.startsWith("cohort-");
}

const HOME_TITLE = "Next In Research — 99 middle schoolers. Real research. Free.";

function pageTitle(id) {
  const route = ROUTES.find((r) => r.id === id);
  return route?.title ? `${route.title} · Next In Research` : HOME_TITLE;
}

// In-app navigation, shared by every link on the site.
const NavigateContext = createContext(() => {});

// A real link (so cmd-click and "copy link" work) that routes in-app on a plain click.
function PageLink({ to, className, children, ...rest }) {
  const navigate = useContext(NavigateContext);
  const onClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={pageToPath(to)} onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  );
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
    a: "Cohort One ran April through August 2026: a kickoff on April 28 at Brambleton Library, nine free workshops at the Ashburn and Brambleton public libraries from June 17 to August 13, weekly one-on-one mentoring online, and a closing symposium at Virginia Tech's Institute for Advanced Computing in Alexandria on August 22.",
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
    a: "Parents and guardians reach out to the program directors directly by email. Once you've connected with us, we'll personally share access to our private student and parent communication channels — for everyone's safety, those invite links are never posted publicly on this website.",
  },
  {
    q: "What is the Google Classroom for?",
    a: "The Google Classroom has optional enrichment assignments — coding courses, scientific method introductions, brainstorming exercises — for students who want a head-start. Completing them is not required but may give students an advantage when being matched with advanced mentors.",
  },
  {
    q: "What happens at the end of the program?",
    a: "Every student finishes a real research project. In Cohort One, 60 students presented their work at the August 22 Symposium & Expo at Virginia Tech, 11 student papers were reviewed by a Virginia Tech scientist, and two projects were submitted to the IEEE MIT Undergraduate Research Technology Conference. Students are also encouraged to enter competitions and journals for young researchers.",
  },
  {
    q: "Are adults present at all meetings?",
    a: "Yes. An adult is present at every in-person meeting.",
  },
  {
    q: "How do I join the next cohort?",
    a: "Applications for Cohort Two (Summer 2027) open in the spring. Email the program directors — see the Contact page — and we'll let you know the moment they do.",
  },
  {
    q: "How can my school or organization support Cohort Two?",
    a: "Host a workshop or the symposium, sponsor posters and supplies, judge or speak, or connect us with a school district. Email the program directors — every note gets a reply.",
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
    role: "Program Director / Cofounder",
    school: "TJHSST",
    interest: "Electrical Engineering + Computer Science",
    email: "devsrivastava@nextinresearch.org",
    image: `${IMAGE_ROOT}/Mentor_Imgs/Dev_Srivastava.jpg`,
    call: "621.3 SRI",
  },
  {
    name: "Deborah Torrico-Pardo",
    role: "Program Director / Cofounder",
    school: "TJHSST",
    interest: "Neuroscience",
    email: "deborahctp@nextinresearch.org",
    image: `${IMAGE_ROOT}/Mentor_Imgs/Deborah_Torrico_Pardo.jpg`,
    call: "612.8 TOR",
  },
];

// Every ask on the site lands in both directors' inboxes.
const directorsMailto = (subject) =>
  `mailto:${FOUNDERS.map((f) => f.email).join(",")}${
    subject ? `?subject=${encodeURIComponent(subject)}` : ""
  }`;

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
  { n: 7, iso: "2026-07-30", date: "Thursday, July 30", time: "4:00 – 5:00 PM", title: "Mental Health & Time Management", topic: "Skills", loc: BRAMBLETON },
  { n: 8, iso: "2026-08-06", date: "Thursday, August 6", time: "5:00 – 6:00 PM", title: "Finalizing Student Posters / Projects", topic: "Publishing", loc: ASHBURN },
  { n: 9, iso: "2026-08-13", date: "Thursday, August 13", time: "5:00 – 6:00 PM", title: "Practicing Presentation", topic: "Publishing", loc: BRAMBLETON },
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
    slides: `${WORKSHOP_ROOT}/workshop-3/slides/workshop-3.pdf`,
  },
  {
    n: 4,
    photos: [
      "First.jpg", "Second.jpg", "Third.jpg", "Fourth.jpg", "Photo_01.jpg",
      "Photo_02.jpg", "Photo_03.jpg", "Photo_04.jpg", "Photo_05.jpg", "Photo_06.jpg",
      "Photo_07.jpg", "Photo_08.jpg", "Photo_09.jpg", "Photo_10.jpg",
    ].map((file) => `${WORKSHOP_ROOT}/workshop-4/photos/${file}`),
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
    slides: `${WORKSHOP_ROOT}/workshop-5/slides/slideshow-w5.pdf`,
    handout: `${WORKSHOP_ROOT}/workshop-5/handouts/second.pdf`,
  },
  {
    n: 6,
    photos: [
      "IMG_0807.jpg", "IMG_0804.jpg", "IMG_0805.jpg", "IMG_0810.jpg", "IMG_0812.jpg",
      "IMG_0813.jpg", "IMG_0815.jpg", "IMG_0817.jpg", "IMG_0820.jpg",
    ].map((file) => `${WORKSHOP_ROOT}/workshop-6/photos/${file}`),
    slides: `${WORKSHOP_ROOT}/workshop-6/slides/workshop-6-scientific-writing-part-2.pdf`,
  },
  {
    n: 7,
    photos: [
      "IMG_0831.jpg", "IMG_1037.jpg", "IMG_1038.jpg", "IMG_1041.jpg", "IMG_7646.jpg",
      "IMG_0839.jpg", "IMG_0841.jpg", "IMG_1046.jpg", "IMG_1047.jpg", "IMG_0845.jpg",
      "IMG_7656.jpg", "IMG_1052.jpg",
    ].map((file) => `${WORKSHOP_ROOT}/workshop-7/photos/${file}`),
    slides: `${WORKSHOP_ROOT}/workshop-7/slides/workshop-7-mental-health-time-management.pdf`,
  },
  {
    n: 8,
    photos: [
      "IMG_2258.jpg", "IMG_2228.jpg", "IMG_2232.jpg", "IMG_2233.jpg", "IMG_2254.jpg",
      "IMG_2256.jpg", "IMG_2262.jpg", "IMG_2266.jpg",
    ].map((file) => `${WORKSHOP_ROOT}/workshop-8/photos/${file}`),
    slides: `${WORKSHOP_ROOT}/workshop-8/slides/workshop-8-finalizing-projects-posters.pdf`,
  },
  {
    n: 9,
    photos: [
      "IMG_9013.jpg", "IMG_9024.jpg", "IMG_7835.jpg", "IMG_7836.jpg", "IMG_7839.jpg",
      "IMG_7841.jpg", "IMG_7843.jpg",
    ].map((file) => `${WORKSHOP_ROOT}/workshop-9/photos/${file}`),
    slides: `${WORKSHOP_ROOT}/workshop-9/slides/workshop-9-presentation-prep.pdf`,
  },
];

// School roster — where students and mentors go to school. Attendance facts, not sponsorships.
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

// Full-size viewer for the symposium photographs. Arrow keys and swipes page
// through, Escape or the backdrop closes, and focus returns to the opener.
function Lightbox({ photos, index, onIndex, onClose }) {
  const dialogRef = useRef(null);
  const touchX = useRef(null);
  const count = photos.length;
  const photo = photos[index];
  const step = (delta) => onIndex((i) => (i + delta + count) % count);

  useEffect(() => {
    const opener = document.activeElement;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector("[data-autofocus]")?.focus();
    return () => {
      document.body.style.overflow = "";
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        // Keep keyboard focus inside the viewer while it is open.
        const focusable = dialogRef.current?.querySelectorAll("button");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  // Warm the neighbors so paging never lands on an unloaded photo.
  useEffect(() => {
    [1, -1].forEach((d) => {
      const img = new Image();
      img.src = photos[(index + d + count) % count].src;
    });
  }, [index, photos, count]);

  const closeOnBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[70] flex flex-col bg-cloth-deep text-paper"
    >
      <div className="flex items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <p className="font-mono text-[13px] font-bold tabular-nums text-paper-bright">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <button
          data-autofocus
          onClick={onClose}
          aria-label="Close the photo viewer"
          className="flex h-11 w-11 items-center justify-center border border-paper/40 text-paper-bright transition-colors hover:bg-paper-bright hover:text-cloth-deep"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div
        onClick={closeOnBackdrop}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
        }}
        className="flex min-h-0 flex-1 items-center justify-center px-3 sm:px-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="max-h-[calc(100dvh-10rem)] max-w-full border-4 border-white object-contain shadow-print-lg"
          />
        </AnimatePresence>
      </div>

      <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-8">
        <p className="max-w-3xl font-mono text-[13px] leading-relaxed text-paper/90">
          {photo.caption || photo.alt}
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => step(-1)}
            aria-label="Previous photo"
            className="flex h-11 w-11 items-center justify-center border border-paper/40 text-paper-bright transition-colors hover:bg-paper-bright hover:text-cloth-deep"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => step(1)}
            aria-label="Next photo"
            className="flex h-11 w-11 items-center justify-center border border-paper/40 text-paper-bright transition-colors hover:bg-paper-bright hover:text-cloth-deep"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Lightbox-ready form of a symposium photo from the data file.
function toViewerPhoto(photo) {
  return {
    src: symposiumPhotoSrc(photo.slug, "full"),
    alt: photo.alt,
    caption: photo.caption,
  };
}

// One photo thumbnail that opens the viewer. The box is sized from the
// photo's own proportions, so the grid never jumps while images load.
function GalleryThumb({ photo, onOpen, className }) {
  return (
    <button
      onClick={onOpen}
      className={cn(
        "group block w-full bg-white p-1 shadow-card transition-shadow hover:shadow-print",
        className
      )}
    >
      <img
        src={symposiumPhotoSrc(photo.slug, "thumb")}
        alt={photo.alt}
        width={photo.w}
        height={photo.h}
        loading="lazy"
        decoding="async"
        style={{ aspectRatio: `${photo.w} / ${photo.h}` }}
        className="block h-auto w-full object-cover transition-opacity group-hover:opacity-90"
      />
    </button>
  );
}

// The archive's own tab strip: every Cohort One page is one click from the others.
function CohortSubnav({ active }) {
  const stripRef = useRef(null);

  // On a phone the strip scrolls sideways; bring the current page's tab into view.
  useEffect(() => {
    const strip = stripRef.current;
    const current = strip?.querySelector('[aria-current="page"]');
    if (strip && current && strip.scrollWidth > strip.clientWidth) {
      strip.scrollLeft = current.offsetLeft - 20;
    }
  }, [active]);

  return (
    <nav
      ref={stripRef}
      aria-label="Cohort One archive"
      className="-mx-5 mb-12 overflow-x-auto border-b border-ink/15 sm:mx-0"
    >
      <ul className="flex w-max gap-1 px-5 sm:px-0">
        {COHORT_PAGES.map((page) => (
          <li key={page.id}>
            <PageLink
              to={page.id}
              aria-current={active === page.id ? "page" : undefined}
              className={cn(
                "-mb-px block whitespace-nowrap border-b-2 px-3 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.12em] transition-colors",
                active === page.id
                  ? "border-stamp text-ink"
                  : "border-transparent text-ink-soft hover:border-ink/30 hover:text-ink"
              )}
            >
              {page.label}
            </PageLink>
          </li>
        ))}
      </ul>
    </nav>
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

function Navigation({ activePage }) {
  const [open, setOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const archiveRef = useRef(null);

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

  // Any page change closes both menus.
  useEffect(() => {
    setOpen(false);
    setArchiveOpen(false);
  }, [activePage]);

  // The archive menu closes on Escape or a click anywhere outside it.
  useEffect(() => {
    if (!archiveOpen) return undefined;
    const onPointer = (e) => {
      if (!archiveRef.current?.contains(e.target)) setArchiveOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setArchiveOpen(false);
        archiveRef.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [archiveOpen]);

  const inArchive = isCohortPage(activePage);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-cloth-deep text-paper transition-shadow",
        scrolled && "shadow-[0_2px_12px_rgba(20,53,46,0.45)]"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <PageLink to="home" className="flex min-w-0 items-baseline gap-3">
          <span className="whitespace-nowrap font-display text-lg font-bold tracking-tight text-paper-bright">
            Next In Research
          </span>
          <span className="hidden whitespace-nowrap font-mono text-[10px] tracking-[0.22em] text-paper/75 md:inline">
            PUBLIC RECORD · EST. 2026
          </span>
        </PageLink>

        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {NAV_TABS.map((tab) =>
              tab.children ? (
                <li key={tab.id} ref={archiveRef} className="relative">
                  <button
                    onClick={() => setArchiveOpen(!archiveOpen)}
                    aria-expanded={archiveOpen}
                    aria-controls="archive-menu"
                    className={cn(
                      "inline-flex items-center gap-1 border-b-2 px-2.5 py-1.5 text-[13px] font-semibold transition-colors",
                      inArchive
                        ? "border-stamp text-paper-bright"
                        : "border-transparent text-paper/75 hover:border-paper/30 hover:text-paper-bright"
                    )}
                  >
                    {tab.label}
                    <ChevronDown
                      className={cn("h-3.5 w-3.5 transition-transform duration-200", archiveOpen && "rotate-180")}
                    />
                  </button>
                  <AnimatePresence>
                    {archiveOpen && (
                      <motion.ul
                        id="archive-menu"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.16 }}
                        className="absolute left-0 top-full mt-3 w-64 border border-paper/15 bg-cloth-deep py-2 shadow-[0_10px_28px_rgba(20,53,46,0.5)]"
                      >
                        {tab.children.map((page) => (
                          <li key={page.id}>
                            <PageLink
                              to={page.id}
                              aria-current={activePage === page.id ? "page" : undefined}
                              className={cn(
                                "flex items-center justify-between gap-3 px-4 py-2.5 text-[14px] font-semibold transition-colors hover:bg-cloth",
                                activePage === page.id ? "text-paper-bright" : "text-paper/80 hover:text-paper-bright"
                              )}
                            >
                              {page.id === "cohort" ? "Overview" : page.label}
                              {activePage === page.id && (
                                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-flame-bright" />
                              )}
                            </PageLink>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={tab.id}>
                  <PageLink
                    to={tab.id}
                    aria-current={activePage === tab.id ? "page" : undefined}
                    className={cn(
                      "block border-b-2 px-2.5 py-1.5 text-[13px] font-semibold transition-colors",
                      activePage === tab.id
                        ? "border-stamp text-paper-bright"
                        : "border-transparent text-paper/75 hover:border-paper/30 hover:text-paper-bright"
                    )}
                  >
                    {tab.label}
                  </PageLink>
                </li>
              )
            )}
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
            <ul className="relative px-6 py-6">
              {NAV_TABS.map((tab, i) => (
                <li key={tab.id} className="border-b border-ink/10">
                  <PageLink
                    to={tab.id}
                    aria-current={activePage === tab.id ? "page" : undefined}
                    className="flex w-full items-baseline justify-between py-3.5"
                  >
                    <span
                      className={cn(
                        "font-display text-2xl font-bold tracking-tight",
                        (tab.children ? inArchive : activePage === tab.id)
                          ? "text-stamp"
                          : "text-ink"
                      )}
                    >
                      {tab.label}
                    </span>
                    <span className="font-mono text-xs text-ink-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </PageLink>
                  {tab.children && (
                    <ul className="-mt-1 mb-3 ml-1 border-l border-ink/15 pl-4">
                      {tab.children
                        .filter((page) => page.id !== "cohort")
                        .map((page) => (
                          <li key={page.id}>
                            <PageLink
                              to={page.id}
                              aria-current={activePage === page.id ? "page" : undefined}
                              className={cn(
                                "block py-2 font-mono text-[13px] font-bold uppercase tracking-[0.12em]",
                                activePage === page.id ? "text-stamp" : "text-ink-soft"
                              )}
                            >
                              {page.label}
                            </PageLink>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <p className="px-6 pb-10 font-mono text-[11px] leading-relaxed text-ink-soft">
              A free research mentorship program for middle schoolers, run by
              TJHSST students. Cohort One: Summer 2026.
            </p>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─────────────────────────────────────────────
// PRESS — shared by the front page and the News page
// ─────────────────────────────────────────────

// A story as a link card (most outlets refuse to be framed).
function PressStory({ item, large = false }) {
  return (
    <article className="group relative flex flex-col border border-paper-shade bg-paper-bright shadow-card transition-shadow hover:shadow-print-lg">
      <div className="relative p-3 pb-0">
        <img
          src={item.image.src}
          alt={item.image.alt}
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full object-cover object-[50%_40%]"
        />
        {item.image.credit && (
          <p className="absolute bottom-1 right-4 bg-paper-bright/90 px-1.5 py-0.5 font-mono text-[10px] text-ink">
            {item.image.credit}
          </p>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3
          className={cn(
            "font-display font-bold leading-[1.1] tracking-tight text-ink",
            large ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
          )}
        >
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="after:absolute after:inset-0 after:content-['']"
          >
            {item.title}
          </a>
        </h3>
        <p className="mt-3 font-mono text-[13px] text-ink-soft">
          {item.outlet} · {item.dateLabel}
        </p>
        {item.quote && (
          <figure className="mt-5">
            <blockquote className="font-display text-xl font-semibold leading-snug tracking-tight text-flame sm:text-2xl">
              “{item.quote}”
            </blockquote>
            {item.quoteBy && (
              <figcaption className="mt-2 font-mono text-[12px] text-ink-soft">{item.quoteBy}</figcaption>
            )}
          </figure>
        )}
        <p className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-stamp transition-colors group-hover:text-ink">
          {item.cta || `Read it on ${item.outlet.split(" · ")[0]}`}
          <ExternalLink className="h-4 w-4" />
        </p>
      </div>
    </article>
  );
}

// More coverage, one line per story, linking out to the original.
function PressLine({ item }) {
  return (
    <li className="border-b border-ink/15">
      <a href={item.url} target="_blank" rel="noreferrer" className="group block py-4">
        <span className="block font-display text-lg font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-stamp">
          {item.title}
        </span>
        <span className="mt-1.5 block font-mono text-[12px] leading-relaxed text-ink-soft">
          {item.outlet} · {item.dateLabel}{" "}
          <ExternalLink className="inline h-3.5 w-3.5 align-[-2px]" />
        </span>
      </a>
    </li>
  );
}

// ─────────────────────────────────────────────
// HOME — THE FRONT PAGE
// ─────────────────────────────────────────────

// The flagship photo is the team's Top 10 #1; the spread carries #2–#10.
// Where each sits in the spread (12 columns on desktop).
const SPREAD = [
  "col-span-2 lg:col-span-8 lg:row-span-2",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4 lg:row-span-2",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

function HomePage() {
  const [viewer, setViewer] = useState(null);
  // #1 is the flagship above; the opening on the stairs (#4) leads the spread.
  const spread = [TOP_TEN[3], ...TOP_TEN.slice(1).filter((_, i) => i !== 2)];
  const spreadPhotos = spread.map(toViewerPhoto);
  // PRESS always starts with Virginia Tech News (pinned in src/data/cohortOne.js),
  // then the featured story; those two lead side by side, and every other story
  // lists under More coverage, newest first.
  const topStories = PRESS.filter((p) => p.pinned || p.featured);
  const moreCoverage = PRESS.filter((p) => !p.pinned && !p.featured);

  return (
    <div>
      {/* ── First viewport: the front page ── */}
      <section className="grain bg-flame text-paper-bright">
        <div className="relative mx-auto max-w-7xl px-5 pt-[5.25rem] pb-16 sm:px-8 lg:pt-[5.75rem] lg:pb-20">
          <div className="flex items-center justify-between gap-6 border-y border-paper-bright/40 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper-bright/90">
            <span>Cohort One · Summer 2026</span>
            <span className="hidden md:inline">
              Symposium &amp; Expo · Aug. 22, 2026 · Virginia Tech, Alexandria
            </span>
            <span className="hidden lg:inline">Free for every family</span>
          </div>

          <div className="mt-6 grid gap-x-8 gap-y-6 lg:mt-7 lg:grid-cols-12 lg:gap-y-7">
            {/* Sized to the column, not the window: on desktop the banner always
                sets in two full-width lines and the mission in one. */}
            <header className="[container-type:inline-size] lg:col-span-12">
              <h1 className="font-display text-[2.3rem] font-extrabold leading-[1.02] tracking-tight text-paper-bright [text-wrap:balance] sm:text-[3.1rem] lg:text-[length:5cqi] lg:leading-[0.98]">
                {HEADLINE}
              </h1>
              <p className="mt-6 max-w-4xl text-lg leading-relaxed text-paper-bright/95 [text-wrap:pretty] sm:text-xl lg:max-w-none lg:text-[length:2.36cqi] lg:leading-snug">
                <span className="font-bold text-paper-bright">Our mission:</span>{" "}
                {MISSION}
              </p>
            </header>

            <figure className="order-first -mx-5 sm:mx-0 lg:order-none lg:col-span-8">
              <div className="relative sm:bg-white sm:p-2 sm:shadow-print-lg">
                <img
                  src={HERO_PHOTO.src}
                  srcSet={HERO_PHOTO.srcSet}
                  sizes="(min-width: 1280px) 840px, (min-width: 1024px) 64vw, 100vw"
                  alt={HERO_PHOTO.alt}
                  width={1600}
                  height={1067}
                  fetchpriority="high"
                  decoding="async"
                  className="block aspect-[4/3] w-full object-cover object-[50%_55%] sm:aspect-[16/9]"
                />
                <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                  <Stamp rotate={-4} className="bg-paper-bright/90 text-[11px] sm:text-[13px]">
                    Held · Aug 22 2026 · Virginia Tech
                  </Stamp>
                </div>
              </div>
              <figcaption className="mt-3 px-5 font-mono text-[11px] leading-relaxed text-paper-bright/95 sm:px-0 sm:text-[12px]">
                {HERO_PHOTO.caption} Photo: Nagaraju Kashayi for Virginia Tech.
              </figcaption>
            </figure>

            <aside
              aria-labelledby="by-the-numbers"
              className="red-rule relative self-start border border-paper-shade bg-paper-bright pb-11 pl-12 pr-5 pt-5 text-ink shadow-print-lg sm:pr-6 lg:col-span-4"
            >
              <h2
                id="by-the-numbers"
                className="border-b-2 border-ink pb-2 font-mono text-[13px] font-bold uppercase tracking-[0.16em]"
              >
                By the numbers · Cohort One
              </h2>
              <ul>
                {HEADLINE_NUMBERS.map((row) => (
                  <li
                    key={row.label}
                    className="grid grid-cols-[5.75rem_1fr] items-center gap-3 border-b border-ink/10 py-2 sm:grid-cols-[6.5rem_1fr]"
                  >
                    <span className="font-display text-[2.4rem] font-extrabold leading-none tracking-tight text-flame tabular-nums">
                      {row.value}
                    </span>
                    <span className="font-mono text-[13px] leading-snug text-ink">
                      {row.label}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 grid gap-2.5">
                <PageLink
                  to="involved"
                  className="inline-flex w-full items-center justify-center gap-2 bg-flame px-5 py-3.5 font-semibold text-paper-bright transition-colors hover:bg-flame-deep"
                >
                  Back Cohort Two
                  <ArrowRight className="h-4 w-4" />
                </PageLink>
                <PageLink
                  to="cohort"
                  className="inline-flex w-full items-center justify-center gap-2 border border-ink/30 px-5 py-3 font-semibold text-ink transition-colors hover:border-ink"
                >
                  See Cohort One
                </PageLink>
              </div>
              <RodHole ground="bg-paper-bright" />
            </aside>
          </div>
        </div>
      </section>

      {/* ── In the news ── */}
      <section className="grain border-t-8 border-flame-deep bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl">
              In the news
            </h2>
            <PageLink
              to="news"
              className="inline-flex items-center gap-2 font-semibold text-stamp transition-colors hover:text-ink"
            >
              All coverage
              <ArrowRight className="h-4 w-4" />
            </PageLink>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {topStories.map((item) => (
              <PressStory key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
            {moreCoverage.length > 0 && (
              <div>
                <h3 className="border-b-2 border-ink pb-2 font-display text-xl font-bold tracking-tight text-ink">
                  More coverage
                </h3>
                <ul>
                  {moreCoverage.map((item) => (
                    <PressLine key={item.id} item={item} />
                  ))}
                </ul>
              </div>
            )}
            <div className="border-t-2 border-ink pt-4">
              <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                Press inquiries
              </h3>
              <p className="mt-2 leading-relaxed text-ink">
                Interviews, photographs, and the full Cohort One story.
              </p>
              <a
                href={directorsMailto("Press inquiry")}
                className="mt-3 inline-flex items-center gap-2 font-semibold text-stamp transition-colors hover:text-ink"
              >
                <Mail className="h-4 w-4" />
                Email the program directors
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Cohort One did ── */}
      <section className="grain border-t border-ink/10 bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <h2 className="max-w-3xl font-display text-3xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl">
            What Cohort One did
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            From a kickoff in a public library to a symposium at Virginia Tech —
            one summer, three phases, free for every family.
          </p>
          <div className="relative mt-12 border border-paper-shade bg-paper-bright pb-4 shadow-print-lg">
            <p className="border-b border-ink/15 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft sm:px-8">
              Circulation record · Cohort One, 2026
            </p>
            <ol className="grid lg:grid-cols-3">
              {COHORT_STORY.map((step, i) => (
                <li
                  key={step.id}
                  className={cn(
                    "flex flex-col px-6 pb-8 pt-7 sm:px-8",
                    i > 0 && "border-t border-ink/15 lg:border-l lg:border-t-0"
                  )}
                >
                  <h3 className="font-display text-4xl font-bold tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 font-mono text-[12px] uppercase tracking-[0.16em] text-stamp">
                    {step.phase} · {step.when}
                  </p>
                  <p className="mt-4 leading-relaxed text-ink">{step.body}</p>
                  <ul className="mt-5 border-t border-ink/15">
                    {step.ledger.map((row) => (
                      <li key={row.label} className="flex items-baseline border-b border-ink/10 py-2">
                        <span className="font-mono text-[14px] text-ink">{row.label}</span>
                        <span
                          aria-hidden="true"
                          className="mx-2 min-w-[1rem] flex-1 border-b border-dotted border-ink/35"
                        />
                        <span className="font-mono text-xl font-bold tabular-nums text-stamp">
                          {row.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <PageLink
                    to={step.link.page}
                    className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-stamp transition-colors hover:text-ink"
                  >
                    {step.link.label}
                    <ArrowRight className="h-4 w-4" />
                  </PageLink>
                </li>
              ))}
            </ol>
            <RodHole ground="bg-paper-bright" />
          </div>
        </div>
      </section>

      {/* ── The Top 10 ── */}
      <section className="grain border-t border-ink/10 bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-3xl font-display text-3xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl">
              The day in photographs
            </h2>
            <PageLink
              to="cohort-symposium"
              className="inline-flex items-center gap-2 font-semibold text-stamp transition-colors hover:text-ink"
            >
              All {SYMPOSIUM_PHOTOS.length} photographs
              <ArrowRight className="h-4 w-4" />
            </PageLink>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-5 lg:grid-cols-12 lg:auto-rows-[15.5rem] lg:gap-y-5">
            {spread.map((photo, i) => (
              <li key={photo.slug} className={SPREAD[i]}>
                <figure className="flex h-full flex-col">
                  <button
                    onClick={() => setViewer(i)}
                    className="group block min-h-0 bg-white p-1 shadow-card transition-shadow hover:shadow-print lg:flex-1"
                  >
                    <img
                      src={symposiumPhotoSrc(photo.slug, i === 0 ? "full" : "thumb")}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      className="block aspect-[4/3] h-full w-full object-cover transition-opacity group-hover:opacity-90 lg:aspect-auto"
                    />
                  </button>
                  <figcaption className="mt-2 font-mono text-[12px] leading-snug text-ink-soft lg:line-clamp-3">
                    {photo.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
            <li className="col-span-2 lg:col-span-8">
              <PageLink
                to="cohort-symposium"
                className="group flex h-full min-h-[10rem] flex-col justify-between border border-ink/20 bg-paper-bright p-5 shadow-card transition-shadow hover:shadow-print"
              >
                <span>
                  <span className="block font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
                    {SYMPOSIUM_PHOTOS.length} photographs from the day
                  </span>
                  <span className="mt-3 hidden font-mono text-[12px] leading-relaxed text-ink-soft sm:block">
                    {GALLERY_CATEGORIES.map((c) => c.label).join(" · ")}
                  </span>
                </span>
                <span className="mt-4 inline-flex items-center gap-2 font-semibold text-stamp transition-colors group-hover:text-ink">
                  Open the gallery
                  <ArrowRight className="h-4 w-4" />
                </span>
              </PageLink>
            </li>
          </ul>
        </div>
      </section>

      {/* ── The vision ── */}
      <section className="grain bg-cloth text-paper">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16 lg:py-28">
          <div>
            <h2 className="font-display text-[2rem] font-semibold leading-[1.1] tracking-tight text-paper-bright [text-wrap:balance] sm:text-[2.6rem] lg:text-[3rem]">
              <span className="font-extrabold">Our vision:</span> {VISION}
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/85">
              Next comes Cohort Two — more students, more schools, the same free
              model. The founders are also writing up how it works with Virginia
              Tech's Dr. Jim Egenrieder, so other communities can run it too.
            </p>
            <div className="mt-10 grid gap-8 border-t border-paper/20 pt-8 md:grid-cols-2">
              {FOUNDER_QUOTES.map((q) => (
                <figure key={q.name}>
                  <blockquote className="leading-relaxed text-paper-bright">
                    “{q.quote}”
                  </blockquote>
                  <figcaption className="mt-3 font-mono text-[12px] tracking-[0.06em] text-paper/75">
                    {q.name}, cofounder · as told to Virginia Tech News
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold tracking-tight text-paper-bright">
              With thanks
            </h3>
            <ul className="mt-4 border-t border-paper/20">
              {THANKS.map((t) => (
                <li key={t.name} className="border-b border-paper/20 py-3.5">
                  <p className="font-semibold leading-snug text-paper-bright">{t.name}</p>
                  <p className="mt-1 font-mono text-[12px] leading-snug text-paper/75">
                    {t.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Close: the one ask ── */}
      <section className="grain bg-flame text-paper-bright">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <h2 className="font-display text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-7xl">
            Back Cohort Two.
          </h2>
          <div className="mt-8 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="max-w-lg text-lg leading-relaxed text-paper-bright/95 sm:text-xl">
                Cohort One proved the model. Summer 2027 grows it — more
                students, more districts, and still free for every family.
                Here's how to help it happen.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={directorsMailto("Supporting Cohort Two")}
                  className="inline-flex w-full items-center justify-center gap-2 bg-paper-bright px-6 py-3.5 font-semibold text-flame shadow-card transition-colors hover:bg-white sm:w-auto"
                >
                  <Mail className="h-4 w-4" />
                  Email the program directors
                </a>
                <PageLink
                  to="involved"
                  className="inline-flex w-full items-center justify-center gap-2 border border-paper-bright/50 px-6 py-3.5 font-semibold text-paper-bright transition-colors hover:border-paper-bright sm:w-auto"
                >
                  More ways to help
                  <ArrowRight className="h-4 w-4" />
                </PageLink>
              </div>
              <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-paper-bright/95">
                Families: applications for Summer 2027 open in the spring. Email
                us and you'll hear the moment they do.
              </p>
            </div>

            <div
              style={{ "--tilt": "-1deg" }}
              className="relative rotate-[var(--tilt)] border border-paper-shade bg-paper-bright p-6 pb-12 text-ink shadow-print-lg transition-transform duration-300 hover:rotate-0 sm:p-8 sm:pb-12"
            >
              <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-stamp-blue">
                HOLD FOR: COHORT TWO · SUMMER 2027
              </p>
              <ul className="mt-4 border-t border-ink/15">
                {WAYS_TO_HELP.map((way) => (
                  <li
                    key={way.title}
                    className="grid gap-1 border-b border-ink/10 py-3.5 sm:grid-cols-[8.5rem_1fr] sm:gap-4"
                  >
                    <span className="font-display text-lg font-bold tracking-tight">{way.title}</span>
                    <span className="leading-relaxed text-ink">{way.body}</span>
                  </li>
                ))}
              </ul>
              <RodHole ground="bg-paper-bright" />
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {viewer !== null && (
          <Lightbox
            photos={spreadPhotos}
            index={viewer}
            onIndex={setViewer}
            onClose={() => setViewer(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
// TIMELINE — THE SUMMER
// ─────────────────────────────────────────────

function TimelinePage() {
  return (
    <PageShell>
      <CohortSubnav active="cohort-summer" />
      <PageTitle
        title="How the summer ran"
        lead="Three phases carried Cohort One from first brainstorm to finished research — planning in spring, building through the library workshop series, publishing in August."
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
          And then, August 22
        </h2>
        <div className="mt-5 max-w-2xl space-y-4 text-lg leading-relaxed text-ink">
          <p>
            The summer closed in public: 60 students presented their research
            at Virginia Tech's Institute for Advanced Computing to more than
            250 people. Along the way, 11 student papers were reviewed by a
            Virginia Tech scientist and two projects were submitted to the IEEE
            MIT Undergraduate Research Technology Conference.
          </p>
          <p>
            Next comes Cohort Two in Summer 2027 — more students, more
            districts, the same free model.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <PageLink
            to="cohort-symposium"
            className="inline-flex items-center gap-2 bg-flame px-5 py-3 font-semibold text-paper-bright transition-colors hover:bg-flame-deep"
          >
            See the symposium
            <ArrowRight className="h-4 w-4" />
          </PageLink>
          <PageLink
            to="involved"
            className="inline-flex items-center gap-2 border border-ink/30 px-5 py-3 font-semibold text-ink transition-colors hover:border-ink"
          >
            Back Cohort Two
          </PageLink>
        </div>
      </div>
    </PageShell>
  );
}

// ─────────────────────────────────────────────
// TEAM — THE CARD CATALOG
// ─────────────────────────────────────────────

function CatalogCard({ mentor }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className="relative flex flex-col border border-paper-shade bg-paper-bright pb-9 shadow-card"
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
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-stamp-blue">
          {mentor.grade} · TJHSST
        </p>
      </div>

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
        lead="Two program directors built Next In Research; twenty-nine TJHSST mentors ran Cohort One with them. Every card below is a real person who gave their summer to a middle schooler's first research project."
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
    </PageShell>
  );
}

// ─────────────────────────────────────────────
// SCHEDULE — THE CIRCULATION CARD
// ─────────────────────────────────────────────

function SchedulePage() {
  return (
    <PageShell>
      <CohortSubnav active="cohort-schedule" />
      <PageTitle
        title="The 2026 schedule"
        lead="Nine free workshops carried Cohort One from the fundamentals of research to presenting finished work — every one hosted at a Loudoun County public library, in Ashburn or Brambleton."
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

      {/* The finale */}
      <div className="relative mt-16 border border-paper-shade bg-paper-bright p-7 pb-12 shadow-print-lg sm:p-9">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-ink sm:text-4xl">
              Then the series ended where research should: in public.
            </h2>
            <p className="mt-4 leading-relaxed text-ink">
              The {SYMPOSIUM_DAY.name} — {SYMPOSIUM_DAY.dateLabel}, hosted by the{" "}
              {SYMPOSIUM_DAY.host} in Alexandria. Sixty students presented their
              finished research to more than 250 people.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <PageLink
                to="cohort-symposium"
                className="inline-flex items-center gap-2 bg-flame px-5 py-3 font-semibold text-paper-bright transition-colors hover:bg-flame-deep"
              >
                See the symposium
                <ArrowRight className="h-4 w-4" />
              </PageLink>
              <a
                href={SYMPOSIUM_DAY.flyerPdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-ink/30 px-5 py-3 font-semibold text-ink transition-colors hover:border-ink"
              >
                The flyer (PDF)
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
          <Stamp rotate={2}>Held · Aug 22 2026</Stamp>
        </div>
        <RodHole ground="bg-paper-bright" />
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
      <CohortSubnav active="cohort-workshops" />
      <PageTitle
        title="The albums"
        lead="Each workshop's photo album sits beside the slides and handouts the students actually used — all nine sessions, June 17 through August 13."
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

              <div className={cn("grid items-stretch gap-6", gallery.slides && "lg:grid-cols-2")}>
                <WorkshopAlbum photos={gallery.photos} title={title} />

                {gallery.slides && (
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
                )}
              </div>
            </section>
          );
        })}
      </div>
    </PageShell>
  );
}

// ─────────────────────────────────────────────
// COHORT ONE — THE ARCHIVE
// ─────────────────────────────────────────────

function CohortOverviewPage() {
  const ledger = [
    { label: "Middle schoolers, grades 6–8", value: "99" },
    { label: "Applications", value: "105" },
    { label: "TJHSST student mentors", value: MENTORS.length, page: "team" },
    { label: "Schools represented", value: "21" },
    { label: "Free workshops", value: WORKSHOPS.length, page: "cohort-workshops" },
    { label: "Workshop photo albums", value: WORKSHOP_GALLERIES.length, page: "cohort-workshops" },
    { label: "Papers reviewed by a Virginia Tech scientist", value: "11", page: "cohort-projects" },
    { label: "Projects submitted to IEEE MIT URTC", value: "2", page: "cohort-projects" },
    { label: "Students presenting at Virginia Tech", value: "60", page: "cohort-symposium" },
    { label: "People at the symposium", value: "250+", page: "cohort-symposium" },
    { label: "Symposium photographs", value: SYMPOSIUM_PHOTOS.length, page: "cohort-symposium" },
    { label: "Cost to any family", value: "$0", page: "faq" },
  ];
  const shelves = [
    {
      id: "cohort-symposium",
      body: `August 22 at Virginia Tech — the order of the day and all ${SYMPOSIUM_PHOTOS.length} photographs.`,
      img: symposiumPhotoSrc("img_0589", "thumb"),
    },
    {
      id: "cohort-projects",
      body: "What Cohort One researched, by field — from diabetic neuropathy to a low-cost bionic arm.",
      img: symposiumPhotoSrc("img_0496", "thumb"),
    },
    {
      id: "cohort-workshops",
      body: "Nine photo albums, with the slides and handouts students actually used.",
      img: WORKSHOP_GALLERIES[0].photos[0],
    },
    {
      id: "cohort-schedule",
      body: "Every session's date, time, and library, June 17 through August 13.",
      img: WORKSHOP_GALLERIES[3].photos[0],
    },
    {
      id: "cohort-summer",
      body: "Plan, build, publish — how the three phases ran.",
      img: TIMELINE_PHOTOS[0].src,
    },
  ];

  return (
    <PageShell>
      <CohortSubnav active="cohort" />
      <PageTitle
        title="Cohort One, Summer 2026"
        lead="The first cohort of Next In Research, kept in one place: 99 middle schoolers, 29 TJHSST mentors, nine free workshops in public libraries, and a symposium at Virginia Tech."
      />

      <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="ruled relative border border-paper-shade bg-paper-bright px-6 pt-6 pb-10 shadow-print-lg sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            Accession ledger · Cohort One
          </p>
          <ul className="mt-4">
            {ledger.map((row) => {
              const inner = (
                <>
                  <span className="font-mono text-[14px] leading-snug text-ink sm:text-[15px]">
                    {row.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mx-2 min-w-[1rem] flex-1 border-b border-dotted border-ink/35"
                  />
                  <span className="font-mono text-xl font-bold tabular-nums text-stamp">
                    {row.value}
                  </span>
                </>
              );
              return (
                <li key={row.label}>
                  {row.page ? (
                    <PageLink
                      to={row.page}
                      className="flex w-full items-baseline py-2 transition-colors hover:bg-paper"
                    >
                      {inner}
                    </PageLink>
                  ) : (
                    <div className="flex w-full items-baseline py-2">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-4 font-mono text-[11px] leading-relaxed text-ink-soft">
            Sources: Virginia Tech News (Sept. 11, 2026) and the program's own
            records.
          </p>
          <RodHole ground="bg-paper-bright" />
        </div>

        <ul className="border-t border-ink/15">
          {shelves.map((shelf) => {
            const page = COHORT_PAGES.find((p) => p.id === shelf.id);
            return (
              <li key={shelf.id} className="border-b border-ink/15">
                <PageLink
                  to={shelf.id}
                  className="group grid grid-cols-[6.5rem_1fr] items-center gap-5 py-5 sm:grid-cols-[8.5rem_1fr_auto]"
                >
                  <span className="block bg-white p-1 shadow-card">
                    <img
                      src={shelf.img}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </span>
                  <span>
                    <span className="block font-display text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-stamp">
                      {page.label}
                    </span>
                    <span className="mt-1 block leading-relaxed text-ink-soft">
                      {shelf.body}
                    </span>
                  </span>
                  <ArrowRight className="hidden h-5 w-5 text-stamp sm:block" />
                </PageLink>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-20 border-t-2 border-ink/20 pt-10">
        <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-tight text-ink sm:text-4xl">
          Where Cohort One came from
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Students came from 21 schools across Northern Virginia and beyond —
          among them:
        </p>
        <ul className="mt-8 columns-1 gap-x-10 sm:columns-2 lg:columns-3">
          {SCHOOLS.map((school) => (
            <li
              key={school}
              className="flex items-baseline gap-3 border-b border-ink/10 py-2.5 font-mono text-[14px] text-ink"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-stamp" />
              {school}
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-[12px] text-ink-soft">
          Listed as fact — these schools are our community, not our sponsors.
        </p>
      </div>
    </PageShell>
  );
}

function SymposiumPage() {
  const [filter, setFilter] = useState("all");
  const [viewer, setViewer] = useState(null);
  const shown =
    filter === "all" ? SYMPOSIUM_PHOTOS : SYMPOSIUM_PHOTOS.filter((p) => p.cat === filter);
  const filters = [
    { id: "all", label: "All", count: SYMPOSIUM_PHOTOS.length },
    ...GALLERY_CATEGORIES.map((c) => ({
      ...c,
      count: SYMPOSIUM_PHOTOS.filter((p) => p.cat === c.id).length,
    })),
  ];

  return (
    <PageShell>
      <CohortSubnav active="cohort-symposium" />
      <PageTitle
        title="The Symposium & Expo"
        lead={`${SYMPOSIUM_DAY.dateLabel}, hosted by the ${SYMPOSIUM_DAY.host} in the ${SYMPOSIUM_DAY.venue}, Alexandria. Sixty middle schoolers presented their research to more than 250 people.`}
      />

      <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="red-rule relative border border-paper-shade bg-paper-bright p-7 pl-14 pb-12 shadow-print-lg sm:p-8 sm:pl-14">
          <Stamp rotate={-2}>Held · Aug 22 2026</Stamp>
          <p className="mt-4 font-mono text-[14px] font-bold leading-relaxed text-ink">
            {SYMPOSIUM_DAY.venue} · {SYMPOSIUM_DAY.address}
          </p>
          <h2 className="mt-7 font-display text-2xl font-bold tracking-tight text-ink">
            The order of the day
          </h2>
          <ol className="mt-3">
            {SYMPOSIUM_DAY.order.map((item, i) => (
              <li
                key={item}
                className="flex items-baseline gap-4 border-b border-ink/10 py-2.5"
              >
                <span className="w-7 shrink-0 font-mono text-[13px] font-bold text-stamp">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[13px] leading-relaxed text-ink">{item}</span>
              </li>
            ))}
          </ol>
          <a
            href={SYMPOSIUM_DAY.flyerPdf}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-stamp transition-colors hover:text-ink"
          >
            The original flyer (PDF)
            <ExternalLink className="h-4 w-4" />
          </a>
          <RodHole ground="bg-paper-bright" />
        </div>

        <PhotoPrint
          src={symposiumPhotoSrc("img_0474", "full")}
          alt="The TJHSST mentor team on the staircase with Dr. Jim Egenrieder of Virginia Tech"
          caption="Dr. Jim Egenrieder of Virginia Tech opens the symposium, with the TJHSST mentor team on the stairs."
          rotate={1.4}
          className="mx-auto w-full max-w-[520px]"
          imgClassName="aspect-[4/3]"
        />
      </div>

      <section className="mt-20" aria-labelledby="photographs">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2
            id="photographs"
            className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            The photographs
          </h2>
          <div role="group" aria-label="Filter the photographs" className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={cn(
                  "border px-4 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em] transition-colors",
                  filter === f.id
                    ? "border-ink bg-ink text-paper-bright"
                    : "border-ink/30 text-ink hover:border-ink"
                )}
              >
                {f.label} <span className="font-normal tabular-nums">{f.count}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="mt-4 max-w-3xl font-mono text-[12px] leading-relaxed text-ink-soft">
          {PHOTO_CREDIT}, with additional photos by the Next In Research team.
          Students are not named on this site.
        </p>
        <ul className="mt-8 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>li]:mb-4 [&>li]:break-inside-avoid">
          {shown.map((photo, i) => (
            <li key={photo.slug}>
              <GalleryThumb photo={photo} onOpen={() => setViewer(i)} />
            </li>
          ))}
        </ul>
      </section>

      <AnimatePresence>
        {viewer !== null && (
          <Lightbox
            photos={shown.map(toViewerPhoto)}
            index={viewer}
            onIndex={setViewer}
            onClose={() => setViewer(null)}
          />
        )}
      </AnimatePresence>
    </PageShell>
  );
}

function ProjectsPage() {
  const [viewer, setViewer] = useState(null);
  const posters = SYMPOSIUM_PHOTOS.filter((p) => p.cat === "expo").slice(0, 12);
  const results = [
    { label: "Students presenting at Virginia Tech", value: "60" },
    { label: "Papers reviewed by Dr. Andreea Sistrunk, Virginia Tech", value: "11" },
    { label: "Projects submitted to IEEE MIT URTC", value: "2" },
  ];

  return (
    <PageShell>
      <CohortSubnav active="cohort-projects" />
      <PageTitle
        title="What Cohort One researched"
        lead="Most of Cohort One had never done research before. By August, they were presenting it. Here's a sample of their questions, by field — students aren't named on this site; the work speaks for them."
      />

      <div className="ruled relative max-w-3xl border border-paper-shade bg-paper-bright px-6 pt-6 pb-10 shadow-print-lg sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
          Results ledger · Cohort One
        </p>
        <ul className="mt-4">
          {results.map((row) => (
            <li key={row.label} className="flex items-baseline py-2">
              <span className="font-mono text-[14px] leading-snug text-ink sm:text-[15px]">
                {row.label}
              </span>
              <span
                aria-hidden="true"
                className="mx-2 min-w-[1rem] flex-1 border-b border-dotted border-ink/35"
              />
              <span className="font-mono text-xl font-bold tabular-nums text-stamp">
                {row.value}
              </span>
            </li>
          ))}
        </ul>
        <RodHole ground="bg-paper-bright" />
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {RESEARCH_FIELDS.map((field) => (
          <section
            key={field.field}
            className="red-rule relative border border-paper-shade bg-paper-bright p-7 pl-14 pb-12 shadow-card"
          >
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
              {field.field}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {field.topics.map((topic) => (
                <li key={topic} className="flex items-start gap-3 leading-relaxed text-ink">
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-stamp"
                  />
                  {topic}
                </li>
              ))}
            </ul>
            <RodHole ground="bg-paper-bright" />
          </section>
        ))}
      </div>
      <p className="mt-6 max-w-3xl font-mono text-[12px] leading-relaxed text-ink-soft">
        A sample drawn from the symposium posters and program records, not the
        full list. As students publish papers and enter competitions, their
        work will be linked here.
      </p>

      <section className="mt-20" aria-labelledby="at-the-posters">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="at-the-posters"
            className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            At the posters
          </h2>
          <PageLink
            to="cohort-symposium"
            className="inline-flex items-center gap-2 font-semibold text-stamp transition-colors hover:text-ink"
          >
            All {SYMPOSIUM_PHOTOS.length} photographs
            <ArrowRight className="h-4 w-4" />
          </PageLink>
        </div>
        <ul className="mt-8 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>li]:mb-4 [&>li]:break-inside-avoid">
          {posters.map((photo, i) => (
            <li key={photo.slug}>
              <GalleryThumb photo={photo} onOpen={() => setViewer(i)} />
            </li>
          ))}
        </ul>
      </section>

      <AnimatePresence>
        {viewer !== null && (
          <Lightbox
            photos={posters.map(toViewerPhoto)}
            index={viewer}
            onIndex={setViewer}
            onClose={() => setViewer(null)}
          />
        )}
      </AnimatePresence>
    </PageShell>
  );
}

// ─────────────────────────────────────────────
// NEWS — IN THE NEWS
// ─────────────────────────────────────────────

function NewsPage() {
  // Virginia Tech News is always the first card (pinned in src/data/cohortOne.js),
  // with the featured story right beside it.
  const topStories = PRESS.filter((p) => p.pinned || p.featured);
  const articles = PRESS.filter((p) => !p.embed && !p.pinned && !p.featured);
  const posts = PRESS.filter((p) => p.embed);

  return (
    <PageShell>
      <PageTitle
        title="In the news"
        lead="Coverage of Next In Research and the Cohort One Symposium & Expo at Virginia Tech."
      />

      <div className="mb-8 grid gap-8 md:grid-cols-2">
        {topStories.map((item) => (
          <PressStory key={item.id} item={item} large />
        ))}
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-8">
          {articles.map((item) => (
            <PressStory key={item.id} item={item} large />
          ))}

          <div className="red-rule relative border border-paper-shade bg-paper-bright p-7 pl-14 pb-12 shadow-card sm:p-9 sm:pl-14">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Press inquiries
            </h2>
            <p className="mt-3 leading-relaxed text-ink">
              Interviews, photographs, and the full Cohort One story — the program
              directors answer every email.
            </p>
            <a
              href={directorsMailto("Press inquiry")}
              className="mt-6 inline-flex items-center gap-2 bg-flame px-6 py-3.5 font-semibold text-paper-bright transition-colors hover:bg-flame-deep"
            >
              <Mail className="h-4 w-4" />
              Email the program directors
            </a>
            <p className="mt-6 font-mono text-[12px] leading-relaxed text-ink-soft">
              {PHOTO_CREDIT}.
            </p>
            <RodHole ground="bg-paper-bright" />
          </div>
        </div>

        <div className="grid gap-8">
          {posts.map((post) => {
            const [author, network] = post.outlet.split(" · ");
            return (
              <article key={post.id} className="border border-paper-shade bg-paper-bright p-4 shadow-card">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-1 pb-3 pt-1">
                  <h2 className="font-display text-xl font-bold tracking-tight text-ink">{author}</h2>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-stamp transition-colors hover:text-ink"
                  >
                    On {network || "the original site"}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <p className="px-1 pb-3 font-mono text-[12px] text-ink-soft">{post.dateLabel}</p>
                <iframe
                  src={post.embed}
                  title={`${author}'s post about the Cohort One symposium`}
                  loading="lazy"
                  className="h-[780px] w-full border border-paper-shade bg-white"
                />
              </article>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}

// ─────────────────────────────────────────────
// GET INVOLVED — BACK COHORT TWO
// ─────────────────────────────────────────────

function GetInvolvedPage() {
  const ways = [
    ...WAYS_TO_HELP,
    {
      title: "Join Cohort Two",
      body: "Middle schoolers entering grades 6–8: applications open in spring 2027. No experience required — most of Cohort One had never done research before.",
      subject: "Cohort Two applications",
    },
  ];

  return (
    <PageShell>
      <PageTitle
        title="Back Cohort Two"
        lead="Cohort One proved the model: 99 middle schoolers, 29 TJHSST mentors, and 60 presenters at Virginia Tech — free for every family. Summer 2027 grows it, and it grows with help."
      />

      <ul className="max-w-5xl border-t border-ink/15">
        {ways.map((way) => (
          <li
            key={way.title}
            className="grid gap-3 border-b border-ink/15 py-7 sm:grid-cols-[11rem_1fr_auto] sm:items-baseline sm:gap-8"
          >
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
              {way.title}
            </h2>
            <p className="max-w-xl leading-relaxed text-ink">{way.body}</p>
            <a
              href={directorsMailto(way.subject)}
              className="inline-flex items-center gap-2 font-semibold text-stamp transition-colors hover:text-ink"
            >
              <Mail className="h-4 w-4" />
              Email us
            </a>
          </li>
        ))}
      </ul>

      <div className="relative mt-14 max-w-3xl border border-paper-shade bg-paper-bright p-7 pb-12 shadow-print-lg sm:p-9">
        <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-ink">
          One inbox for everything
        </h2>
        <p className="mt-3 leading-relaxed text-ink">
          Every note reaches both program directors, Dev Srivastava and Deborah
          Torrico-Pardo.
        </p>
        <a
          href={directorsMailto("Supporting Cohort Two")}
          className="mt-6 inline-flex items-center gap-2 bg-flame px-6 py-3.5 font-semibold text-paper-bright transition-colors hover:bg-flame-deep"
        >
          <Mail className="h-4 w-4" />
          Email the program directors
        </a>
        <ul className="mt-6 space-y-1">
          {FOUNDERS.map((person) => (
            <li key={person.email} className="break-all font-mono text-[13px] text-ink-soft">
              {person.email}
            </li>
          ))}
        </ul>
        <RodHole ground="bg-paper-bright" />
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
        lead="Press, partnerships, Cohort Two, or anything in this record — the program directors read every email."
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

function Footer() {
  return (
    <footer className="grain bg-cloth-deep text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.1fr_1.1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight text-paper-bright">
            Next In Research
          </p>
          <p className="mt-3 max-w-sm leading-relaxed text-paper/80">
            A free, student-run summer research mentorship program pairing
            TJHSST mentors with middle schoolers. Cohort One, Summer 2026: 99
            students, nine library workshops, and a symposium at Virginia Tech.
          </p>
          <p className="mt-6 font-mono text-[11px] tracking-[0.18em] text-paper/70">
            NO FEES · NO FINES · NO PREREQUISITES
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-paper/70">
              The site
            </p>
            <ul className="mt-4 space-y-2">
              {ROUTES.filter((r) => !isCohortPage(r.id)).map((route) => (
                <li key={route.id}>
                  <PageLink
                    to={route.id}
                    className="py-1 text-[14px] text-paper/85 transition-colors hover:text-paper-bright"
                  >
                    {NAV_TABS.find((t) => t.id === route.id)?.label}
                  </PageLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-paper/70">
              Cohort One
            </p>
            <ul className="mt-4 space-y-2">
              {COHORT_PAGES.map((page) => (
                <li key={page.id}>
                  <PageLink
                    to={page.id}
                    className="py-1 text-[14px] text-paper/85 transition-colors hover:text-paper-bright"
                  >
                    {page.id === "cohort" ? "Overview" : page.label}
                  </PageLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-paper/70">
            The directors
          </p>
          <ul className="mt-4 space-y-2">
            {FOUNDERS.map((person) => (
              <li key={person.email}>
                <a
                  href={`mailto:${person.email}`}
                  className="inline-flex items-center gap-2 break-all text-[14px] text-paper/85 transition-colors hover:text-paper-bright"
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
        <p className="mx-auto max-w-7xl px-5 py-5 font-mono text-[11px] leading-relaxed tracking-[0.08em] text-paper/70 sm:px-8">
          Last stamped October 2026 · {PHOTO_CREDIT}.
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

  // Old addresses (and the pre-archive paths) settle on their canonical URL.
  useEffect(() => {
    const canonical = pageToPath(activePage);
    if (cleanPath(window.location.pathname) !== canonical) {
      window.history.replaceState(null, "", canonical + window.location.hash);
    }
  }, []);

  useEffect(() => {
    const onPop = () => setActivePageState(pathToPage(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    document.title = pageTitle(activePage);
  }, [activePage]);

  const setActivePage = (id) => {
    const path = pageToPath(id);
    if (window.location.pathname !== path) {
      window.history.pushState(null, "", path);
    }
    setActivePageState(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const pages = {
    home: <HomePage />,
    cohort: <CohortOverviewPage />,
    "cohort-symposium": <SymposiumPage />,
    "cohort-projects": <ProjectsPage />,
    "cohort-workshops": <WorkshopsPage />,
    "cohort-schedule": <SchedulePage />,
    "cohort-summer": <TimelinePage />,
    team: <TeamPage />,
    news: <NewsPage />,
    involved: <GetInvolvedPage />,
    faq: <FAQPage />,
    contact: <ContactPage />,
  };

  return (
    <NavigateContext.Provider value={setActivePage}>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-cloth font-body text-ink">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper-bright focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
          >
            Skip to content
          </a>
          <Navigation activePage={activePage} />
          <main id="main">{pages[activePage] || pages.home}</main>
          <Footer />
        </div>
      </MotionConfig>
    </NavigateContext.Provider>
  );
}
