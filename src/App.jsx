
import {useState, useMemo, useEffect, useRef } from 'react';
  Home as HomeIcon,
  CheckCircle2,
  Eye,
  LifeBuoy,
  Compass,
  History as HistoryIcon,
  Lock,
  Mic,
  Anchor as AnchorIcon,
  Check,
  Bookmark,
  ChevronLeft,
  Shuffle,
  Trash2,
  Feather,
  Leaf,
  Moon,
  Waves,
  Sun,
  Flower2,
  Shell,
  Mountain,
} from 'lucide-react';

/* ───────────────────────── styles ───────────────────────── */

const css = `
.anc{--ink:#3A1424;--fog:#F6ECEF;--paper:#FCF7F8;--deep:#7A2342;--sea:#7FA3D6;--lamp:#E79BB5;--dusk:#9B3257;--muted:#7A5A66;--line:#E6D3D9;--sel:#F7DCE5;--burg:#6B1F3A;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif;color:var(--ink);background:var(--fog);
  display:flex;justify-content:center;min-height:100vh;-webkit-font-smoothing:antialiased}
.anc *{box-sizing:border-box}
:where(.anc button){font-family:inherit;color:inherit}
.phone{width:100%;max-width:430px;height:100vh;height:100dvh;display:flex;flex-direction:column;background:var(--fog);position:relative;overflow:hidden}
@media (min-width:480px){
  .anc{background:#EAD9DF;padding:24px 0;align-items:center}
  .phone{height:min(880px,calc(100vh - 48px));border-radius:40px;box-shadow:0 40px 70px -40px rgba(107,31,58,.35)}
}
.scroll{flex:1;overflow-y:auto;padding:calc(18px + env(safe-area-inset-top)) 20px 32px;scroll-behavior:smooth}
.view{animation:rise .28s ease both}
@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

.serif{font-family:"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif}
.h1{font-family:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;font-size:34px;line-height:1.1;font-weight:500;letter-spacing:-.01em;margin:0}
.h2{font-family:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;font-size:26px;line-height:1.2;font-weight:500;margin:0}
.h3{font-family:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;font-size:21px;line-height:1.25;font-weight:500;margin:0}
.muted{color:var(--muted)}
.p{font-size:16px;line-height:1.5;margin:0}
.small{font-size:13.5px;line-height:1.45}
.stack>*+*{margin-top:14px}
.stack-lg>*+*{margin-top:24px}

.top{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}
.brand{display:flex;align-items:center;gap:8px;font-family:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;font-size:22px;font-weight:500}
.pill{display:inline-flex;align-items:center;gap:6px;background:var(--paper);border:1px solid var(--line);border-radius:999px;padding:7px 12px;font-size:12.5px;color:var(--muted)}
.card{background:var(--paper);border-radius:26px;padding:20px;border:1px solid var(--line)}
.card-tint{background:var(--sel);border-radius:26px;padding:20px}

.btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:58px;border-radius:20px;border:1.5px solid transparent;font-size:17px;font-weight:600;cursor:pointer;transition:transform .15s,background .2s,opacity .2s;padding:0 20px}
.btn:active{transform:scale(.985)}
.btn[disabled]{opacity:.4;cursor:not-allowed}
.btn-primary{background:var(--burg);color:#fff;box-shadow:0 14px 24px -16px rgba(107,31,58,.6)}
.btn-ghost{background:transparent;border-color:rgba(107,31,58,.35)}
.btn-quiet{background:transparent;color:var(--muted);font-weight:500;min-height:48px}
.link{background:none;border:none;color:var(--muted);font-size:14.5px;cursor:pointer;display:inline-flex;align-items:center;gap:2px;padding:10px 4px;min-height:44px}

.opt{display:flex;align-items:center;gap:12px;width:100%;text-align:left;min-height:58px;padding:14px 16px;border-radius:18px;background:var(--paper);border:1.5px solid var(--line);font-size:16px;line-height:1.35;cursor:pointer;transition:background .2s,border-color .2s}
.opt[aria-pressed=true]{background:var(--sel);border-color:var(--deep)}
.opt[disabled]{opacity:.45;cursor:not-allowed}
.tick{flex:none;width:22px;height:22px;border-radius:50%;border:1.5px solid #B79AA5;display:grid;place-items:center;color:transparent}
.opt[aria-pressed=true] .tick{background:var(--deep);border-color:var(--deep);color:#fff}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.tile{min-height:64px;border-radius:18px;background:var(--paper);border:1.5px solid var(--line);padding:12px 14px;font-size:15.5px;font-weight:500;text-align:left;cursor:pointer;line-height:1.3;transition:background .2s,border-color .2s,transform .15s}
.tile:active{transform:scale(.98)}
.tile:hover{border-color:var(--deep)}
.moods{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
.mood{min-height:88px;border-radius:18px;background:var(--paper);border:1.5px solid var(--line);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font-size:12px;cursor:pointer;padding:4px 0;transition:background .2s,border-color .2s}
.mood .e{font-size:28px;line-height:1}
.mood[aria-pressed=true]{background:var(--sel);border-color:var(--deep);font-weight:600}
.seg{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.seg button{min-height:56px;border-radius:16px;background:var(--paper);border:1.5px solid var(--line);font-size:16px;cursor:pointer}
.seg button[aria-pressed=true]{background:var(--sel);border-color:var(--deep);font-weight:600}
.range{width:100%;height:44px;accent-color:var(--deep);cursor:pointer}
.field{width:100%;border-radius:16px;border:1.5px solid var(--line);background:var(--paper);padding:14px 16px;font:inherit;font-size:16px;color:var(--ink);resize:none}

.status{display:inline-block;border-radius:999px;font-size:12.5px;padding:4px 10px;font-weight:600}
.s-processed{background:#DCE7F7;color:#24407A}
.s-pending{background:#F9DCE5;color:#7A1F3F}
.s-noted{background:#EADFE3;color:#5A4650}
.row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0}
.row+.row{border-top:1px solid var(--line)}

.nav{display:grid;grid-template-columns:repeat(6,1fr);padding:8px 6px calc(12px + env(safe-area-inset-bottom));background:var(--paper);border-top:1px solid var(--line)}
.nav button{background:none;border:none;display:flex;flex-direction:column;align-items:center;gap:3px;font-size:11px;color:var(--muted);cursor:pointer;padding:2px 0;min-height:52px}
.nav .ic{width:50px;height:30px;border-radius:15px;display:grid;place-items:center;transition:background .2s}
.nav button[aria-current=page]{color:var(--ink);font-weight:600}
.nav button[aria-current=page] .ic{background:var(--sel);color:var(--deep)}

.avatar{display:grid;place-items:center;border-radius:50%;flex:none}
.avbtn{background:none;border:none;padding:0;cursor:pointer;border-radius:50%;line-height:0}
.sheet-back{position:absolute;inset:0;background:rgba(58,20,36,.45);display:flex;align-items:flex-end;z-index:20;animation:fade .2s ease both}
.sheet{width:100%;background:var(--paper);border-radius:28px 28px 0 0;padding:22px 20px calc(24px + env(safe-area-inset-bottom));animation:rise .28s ease both}
@keyframes fade{from{opacity:0}to{opacity:1}}
.anc :focus-visible{outline:3px solid var(--deep);outline-offset:2px}

.wave1{animation:drift 7s linear infinite}
.wave2{animation:drift 11s linear infinite reverse}
@keyframes drift{to{transform:translateX(-116px)}}
.breath{animation:breathe 8s ease-in-out infinite}
@keyframes breathe{0%,100%{transform:scale(.72);opacity:.7}50%{transform:scale(1);opacity:1}}
.dots{display:flex;gap:6px;justify-content:center}
.dots i{width:7px;height:7px;border-radius:50%;background:#D9C3CB}
.dots i.on{background:var(--deep);width:20px;border-radius:4px}
@media (prefers-reduced-motion:reduce){
  .anc *{animation:none!important;transition:none!important;scroll-behavior:auto!important}
}
`;

/* ───────────────────────── data & helpers ───────────────────────── */

const MOODS = [
  { id: "good", emoji: "😌", label: "Good" },
  { id: "okay", emoji: "😐", label: "Okay" },
  { id: "draining", emoji: "😮‍💨", label: "Draining" },
  { id: "heavy", emoji: "😣", label: "Heavy" },
  { id: "exhausting", emoji: "🫠", label: "Exhausting" },
];
const moodOf = (id) => MOODS.find((m) => m.id === id) || MOODS[1];

const EVENTS = [
  { t: "Verbal abuse", did: "You experienced verbal abuse.", about: "the verbal abuse you experienced" },
  { t: "Lost a patient", did: "You lost a patient.", about: "losing a patient" },
  { t: "Difficult case", did: "You had a difficult case.", about: "a difficult case" },
  { t: "Strict punishment", did: "You were given a strict punishment.", about: "the strict punishment you received" },
  { t: "Brutal shift", did: "You had a brutal shift.", about: "a brutal shift" },
  { t: "Conflict with colleague", did: "You had a conflict with a colleague.", about: "a conflict with a colleague" },
  { t: "Made a mistake", did: "You made a mistake.", about: "a mistake you made" },
  { t: "Overwhelming workload", did: "Your workload was overwhelming.", about: "an overwhelming workload" },
  { t: "Something else", did: "Something heavy happened.", about: "something heavy" },
];
const evMeta = (t) => EVENTS.find((e) => e.t === t) || EVENTS[8];

const DAY = 86400000;
const sod = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};
const at = (n, h = 21, m = 0) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};
const fmtDay = (iso) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
const fmtTime = (iso) => new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
const dayDiff = (iso) => Math.round((sod(new Date()) - sod(iso)) / DAY);
const whenPast = (iso) => {
  const d = dayDiff(iso);
  return d <= 0 ? "Earlier today" : d === 1 ? "Yesterday" : `On ${fmtDay(iso)}`;
};
const whenFuture = (iso) => {
  const d = Math.round((sod(iso) - sod(new Date())) / DAY);
  const t = fmtTime(iso);
  return d <= 0 ? `today at ${t}` : d === 1 ? `tomorrow at ${t}` : `${fmtDay(iso)} at ${t}`;
};
const clamp = (n, a = 0, b = 100) => Math.max(a, Math.min(b, n));

const seedCheckIns = [
  { id: "c1", date: at(5), mood: "good", heavy: "no", left: 74, voice: false },
  { id: "c2", date: at(4), mood: "okay", heavy: "no", left: 61, voice: false },
  { id: "c3", date: at(3), mood: "draining", heavy: "yes", left: 48, voice: false },
  { id: "c4", date: at(2), mood: "heavy", heavy: "very", left: 46, voice: false },
  { id: "c5", date: at(1), mood: "draining", heavy: "yes", left: 40, voice: false },
];
const seedEvents = [
  { id: "e1", type: "Verbal abuse", createdAt: at(2, 14, 30), status: "processed", processedAt: at(2, 21, 15) },
  { id: "e2", type: "Difficult case", createdAt: at(1, 15, 10), status: "pending", followUpAt: at(0, 20, 0) },
];
const seedFollowUps = [{ id: "f1", eventId: "e2", at: at(0, 20, 0), label: "After my shift" }];
const seedResponses = [
  {
    eventId: "e1",
    feeling: "A little lighter",
    carrying: ["I keep replaying what they said"],
    control: ["How I communicated"],
    notControl: ["Someone else's behavior"],
    statements: ["It makes sense that this hurts."],
    note: "",
    outcome: "lighter",
    completedAt: at(2, 21, 15),
  },
];

/* capacity trend: weighted blend of the last three check-ins, nudged down by difficult moments logged that day (mock logic, not clinical) */
function computeCapacity(checkIns, events = []) {
  const sorted = [...checkIns].sort((a, b) => new Date(a.date) - new Date(b.date));
  const w = [0.5, 0.3, 0.2];
  const adj = (c) => {
    const moments = events.filter((e) => dayDiff(e.createdAt) === dayDiff(c.date)).length;
    return clamp(c.left - (c.heavy === "very" ? 5 : 0) - Math.min(6, moments * 3));
  };
  const series = sorted.map((_, i) => {
    let t = 0,
      ws = 0;
    for (let k = 0; k < 3 && i - k >= 0; k++) {
      t += w[k] * adj(sorted[i - k]);
      ws += w[k];
    }
    return Math.round(t / ws);
  });
  return { sorted, series };
}
const fallingDays = (series) => {
  let n = 0;
  for (let i = series.length - 1; i > 0; i--) {
    if (series[i] < series[i - 1]) n++;
    else break;
  }
  return n;
};
const trendOf = (series) => {
  const n = fallingDays(series);
  if (n >= 2) return { word: "Falling", n };
  const l = series[series.length - 1],
    pr = series[series.length - 2];
  if (series.length > 1 && l - pr >= 3) return { word: "Rising", n: 0 };
  return { word: "Steady", n: 0 };
};

/* ─────────── DECIDE data ───────────
   Pathways are listed alphabetically and never ranked. `facts` are typical patterns only
   (they vary by country, institution and role): [hours, emergencies, patient contact, schedule flexibility]. */

const st = (text, short) => ({ text, short });
const FACT_LABELS = ["Hours", "Emergencies", "Patient contact", "Schedule flexibility"];

/* two practical next steps per pathway type (a pathway can override with its own `steps`) */
const NEXT_STEPS = {
  specialty: [
    st("Ask someone working in it for a 20-minute chat about what a normal week really looks like.", "20-minute chat"),
    st("Look into a short elective, shadowing day, or attachment if your institution offers one.", "Shadowing or elective"),
  ],
  setting: [
    st("Ask someone who works there what the hours and on-call load actually look like.", "Ask about real hours"),
    st("Find out how transfers or posting requests work at your institution.", "Check how transfers work"),
  ],
  role: [
    st("Read one job description or programme page for this area.", "Read one job description"),
    st("Ask someone working in it for a 20-minute chat. Alumni or your career office can often connect you.", "20-minute chat"),
  ],
  explore: [
    st("Look for one short volunteering, placement, or shadowing opportunity near you.", "Find one short placement"),
    st("Ask one person involved what a first month would look like.", "Ask about a first month"),
  ],
  workload: [
    st("Write down the one change that would help most, then find out who handles rota or posting concerns.", "Name the one change"),
    st("Check what your institution already offers: a supervisor, chief resident, or occupational health.", "Check institutional options"),
  ],
  support: [
    st("Find out who offers this at your institution and how to reach them.", "Find who offers it"),
    st("Send one short message to one person, or save this for later.", "Message one person"),
  ],
};

const A = (n, g, kind, d, facts, tags = [], steps = null) => ({ n, g, kind, d, facts, tags, steps });

const AREAS = [
  /* change my environment: settings */
  A("A different hospital or team", "env", "setting", "The same clinical work with a different culture, rota, and team.", null, ["Less emotional strain", "Predictable schedules", "Organisation"]),
  A("Day-case and ambulatory care", "env", "setting", "Care and procedures that finish the same day.", ["Mostly predictable", "Rare", "A lot", "Some"], ["Clinical work"]),
  A("Locum or flexible-shift work", "env", "setting", "You choose when and where you work.", ["Mixed", "Some", "A lot", "Good"], ["More financial stability"], [
    st("Ask a colleague who has done locum or agency work how it is arranged, paid, and covered.", "Ask a locum colleague"),
    st("Check what registration or credentialing short-term work would need.", "Check registration needs"),
  ]),
  A("Occupational health", "env", "setting", "Looking after the health of people at their workplace.", ["Mostly predictable", "Rare", "Some", "Some"], ["Shorter working hours", "Explaining", "Communication", "Clinical work"]),
  A("Outpatient clinics", "env", "setting", "Scheduled clinic hours and longer relationships with patients.", ["Mostly predictable", "Rare", "A lot", "Some"], ["Shorter working hours", "More rest", "Listening"]),
  A("Practice in another region or country", "env", "setting", "A different setting inside a different health system.", null, ["International opportunities", "More financial stability", "More flexibility"], [
    st("Check the registration and licensing route for one country that interests you.", "Check licensing route"),
    st("Talk to someone who has made the move about their first year.", "Talk to someone who moved"),
  ]),
  A("Rehabilitation and chronic care", "env", "setting", "Slower-paced care with long-term relationships.", ["Mostly predictable", "Rare", "A lot", "Some"], ["Listening", "Clinical work"]),
  A("Telehealth and remote care", "env", "setting", "Care delivered by phone or video.", ["Mixed", "Rare", "Some", "Good"], ["Technology", "Communication", "Shorter working hours"], [
    st("Ask someone who does remote consultations what a normal session load looks like.", "Ask a telehealth clinician"),
    st("Check what your registration body says about remote practice.", "Check remote-practice rules"),
  ]),

  /* change my environment: clinical specialties */
  A("Acute medicine", "env", "specialty", "Fast assessment and treatment of patients who arrive unwell.", ["Mixed", "Frequent", "A lot", "Some"], ["Clinical work", "Analysing information"]),
  A("Anaesthesia", "env", "specialty", "Keeping patients safe through surgery and procedures.", ["Mixed", "Some", "Some", "Some"], ["Clinical work", "Technology", "Analysing information"]),
  A("Critical care", "env", "specialty", "Looking after the sickest patients, alongside a large team.", ["Long or on-call", "Frequent", "A lot", "Limited"], ["Clinical work", "Analysing information", "More research/problem-solving"]),
  A("Dermatology", "env", "specialty", "Mostly clinic-based care of skin conditions. Entry is often competitive.", ["Mostly predictable", "Rare", "A lot", "Good"], ["Clinical work"]),
  A("Emergency medicine", "env", "specialty", "Fast, varied, shift-based work with a team around you.", ["Mixed", "Frequent", "A lot", "Some"], ["Clinical work", "International opportunities"]),
  A("Family medicine and primary care", "env", "specialty", "Continuing care for people and families close to where they live.", ["Mostly predictable", "Some", "A lot", "Good"], ["Listening", "Communication", "Explaining", "Shorter working hours"]),
  A("Geriatrics", "env", "specialty", "Care of older adults, often with long-term relationships.", ["Mostly predictable", "Some", "A lot", "Some"], ["Listening", "Communication"]),
  A("Obstetrics and gynaecology", "env", "specialty", "Women's health, pregnancy, and birth, including urgent cases.", ["Long or on-call", "Frequent", "A lot", "Limited"], ["Clinical work"]),
  A("Ophthalmology", "env", "specialty", "Eye care, mixing clinic work with procedures.", ["Mostly predictable", "Some", "A lot", "Some"], ["Clinical work", "Technology"]),
  A("Paediatrics", "env", "specialty", "Care of children and families across many settings.", ["Mixed", "Some", "A lot", "Some"], ["Communication", "Explaining", "Clinical work"]),
  A("Palliative care", "env", "specialty", "Comfort-focused care alongside patients and families. Emotionally close work.", ["Mostly predictable", "Some", "A lot", "Some"], ["Listening", "Communication", "Clinical work"]),
  A("Pathology", "env", "specialty", "Diagnosis through laboratory and tissue analysis, with little direct patient contact.", ["Mostly predictable", "Rare", "Little", "Some"], ["Analysing information", "Research", "More research/problem-solving", "Technology"]),
  A("Psychiatry", "env", "specialty", "Mental-health care built around conversation and long-term follow-up.", ["Mixed", "Some", "A lot", "Some"], ["Listening", "Communication", "Clinical work"]),
  A("Radiography and medical imaging", "env", "specialty", "Operating imaging equipment. A different training path from medicine.", ["Mostly predictable", "Some", "Some", "Some"], ["Technology", "Clinical work"], [
    st("Look up the training route and entry requirements for radiography in your region.", "Check the training route"),
    st("Ask a radiographer at your hospital what a normal shift involves.", "Ask a radiographer"),
  ]),
  A("Radiology", "env", "specialty", "Interpreting scans to guide diagnosis, with limited direct patient contact.", ["Mostly predictable", "Some", "Little", "Good"], ["Analysing information", "Technology", "More research/problem-solving"]),
  A("Surgery", "env", "specialty", "Operating and procedural work with demanding hours.", ["Long or on-call", "Frequent", "A lot", "Limited"], ["Clinical work", "More financial stability"]),

  /* change my role: non-clinical or less patient-facing */
  A("Health administration", "role", "role", "Running services, teams, and systems.", ["Mostly predictable", "Some", "Little", "Limited"], ["Organisation", "More financial stability", "Less emotional strain"]),
  A("Health communication", "role", "role", "Making health information clear and trusted.", ["Mixed", "Rare", "None", "Good"], ["Communication/advocacy", "Writing", "Communication", "Educational content", "Explaining"]),
  A("Health education", "role", "role", "Teaching patients, students, or communities.", ["Mostly predictable", "Rare", "Some", "Some"], ["Teaching/education", "Teaching", "Explaining", "Educational content", "Public speaking"]),
  A("Health policy", "role", "role", "Shaping how health systems make decisions.", ["Mostly predictable", "Rare", "None", "Some"], ["More public-health impact", "Communication/advocacy", "Writing", "Advocacy", "Analysing information"]),
  A("Health research", "role", "role", "Studying the questions that change practice.", ["Mostly predictable", "Rare", "Little", "Good"], ["More research/problem-solving", "Research", "Analysing information", "Writing"]),
  A("Health technology and informatics", "role", "role", "Building and improving the tools clinicians use.", ["Mostly predictable", "Rare", "Little", "Good"], ["More research/problem-solving", "Technology", "Analysing information"]),
  A("Medical writing and editing", "role", "role", "Writing for journals, industry, or patients.", ["Mixed", "Rare", "None", "Good"], ["Writing", "Educational content", "Analysing information"], [
    st("Read two pieces of published medical writing and note what the job involves.", "Read two examples"),
    st("Ask one medical writer or editor for a 20-minute chat.", "20-minute chat"),
  ]),
  A("Public health", "role", "role", "Prevention, surveillance, and programmes at population level.", ["Mostly predictable", "Rare", "None", "Some"], ["More public-health impact", "Analysing information", "Research", "Communication/advocacy"]),

  /* explore before committing */
  A("Advocacy work", "explore", "explore", "Speak up for patients, colleagues, or policy.", null, ["Communication/advocacy", "Advocacy", "Public speaking", "Writing"]),
  A("Community programmes", "explore", "explore", "Short, local projects with people you can see.", null, ["More time with people", "More public-health impact", "Communication", "Organisation"]),
  A("Fellowships", "explore", "explore", "Structured time to try a new area.", null, ["Teaching/education", "More research/problem-solving", "International opportunities", "Research"]),
  A("Placements and shadowing", "explore", "explore", "Spend a day or a week inside another role.", null, ["More flexibility", "Listening", "International opportunities", "More acute, fast-paced work"]),
  A("Short-term projects", "explore", "explore", "Time-limited work in an area you're curious about.", null, ["More flexibility", "Organisation", "More research/problem-solving"]),
  A("Teaching or mentoring on the side", "explore", "explore", "Share what you know with students or peers.", null, ["Teaching/education", "Teaching", "Explaining", "Educational content"]),
  A("Volunteering", "explore", "explore", "Give time to a cause without changing your job.", null, ["More time with people", "More public-health impact", "Listening"]),

  /* my workload */
  A("A different unit or rotation", "workload", "workload", "Similar work with a different pace or patient mix.", null, ["Less emergency pressure", "Less emotional strain", "Predictable schedules"]),
  A("A rota or workload conversation", "workload", "workload", "Raise hours, on-call load, or patient volume with someone you trust.", null, ["Shorter working hours", "Predictable schedules", "Less emergency pressure", "More rest"]),
  A("Planned time off", "workload", "workload", "A protected break or lighter stretch between postings.", null, ["More rest", "Shorter working hours", "Less emotional strain"]),
  A("Reduced-hours or part-time training", "workload", "workload", "Some programmes allow a lighter weekly load.", null, ["Shorter working hours", "More rest", "More flexibility", "Predictable schedules"], [
    st("Ask your training programme or supervisor whether less-than-full-time options exist.", "Ask about reduced hours"),
    st("Find out how it would affect your timeline and pay before deciding anything.", "Check timeline and pay"),
  ]),
  A("Shift swaps and flexible rotas", "workload", "workload", "Find out which shift patterns you can actually choose.", null, ["More flexibility", "More rest", "Predictable schedules"]),

  /* my support system */
  A("A conversation with a counsellor or other professional", "support", "support", "Optional, and on your terms. Anchor is not a substitute for it.", null, ["Less emotional strain", "Listening", "More rest"]),
  A("A mentor or senior you trust", "support", "support", "Someone a step ahead who can help you read your situation.", null, ["Listening", "More time with people", "Less emotional strain", "Teaching"]),
  A("Peers in the same posting", "support", "support", "A small group who understand the same shifts.", null, ["More time with people", "Listening", "Less emotional strain"]),
  A("Student or staff support office", "support", "support", "Practical help with timetables, postings, or concerns.", null, ["Organisation", "Predictable schedules", "Less emotional strain"]),
  A("Welfare or occupational health services", "support", "support", "Support that may already exist at your institution.", null, ["Less emotional strain", "More rest", "Listening"]),
];

const NEEDS = ["Shorter working hours", "More rest", "Predictable schedules", "Less emergency pressure", "More acute, fast-paced work", "Less emotional strain", "Less intense patient contact", "More flexibility", "More financial stability", "More public-health impact", "More time with people", "More research/problem-solving", "Teaching/education", "Communication/advocacy", "International opportunities"];
const SKILLS = ["Listening", "Explaining", "Teaching", "Clinical work", "Research", "Analysing information", "Writing", "Public speaking", "Communication", "Advocacy", "Organisation", "Technology", "Educational content"];

const CAUSES = [
  { id: "env", label: "My environment", sub: "The setting, location, or team." },
  { id: "workload", label: "My workload", sub: "Hours, rota, volume, or pressure." },
  { id: "support", label: "My support system", sub: "The people and structures around me." },
  { id: "role", label: "My role", sub: "The work itself." },
  { id: "unknown", label: "I'm not sure", sub: "That's okay. You don't have to decide today." },
];

/* the needs a pathway's typical pattern speaks to, derived from its facts so the two never disagree */
const factNeeds = (f) =>
  !f
    ? []
    : [
        f[0] === "Mostly predictable" && "Predictable schedules",
        f[1] === "Rare" && "Less emergency pressure",
        f[1] === "Frequent" && "More acute, fast-paced work",
        (f[2] === "None" || f[2] === "Little") && "Less intense patient contact",
        f[2] === "A lot" && "More time with people",
        f[3] === "Good" && "More flexibility",
      ].filter(Boolean);

/* 4-6 matches from the chosen group, shown alphabetically so nothing reads as a ranking */
function pickAreas(change, needs, skills) {
  const picks = [...needs, ...skills];
  const pool = change === "unknown" ? AREAS : AREAS.filter((a) => a.g === change);
  const scored = pool
    .map((a) => ({ a, s: new Set([...a.tags, ...factNeeds(a.facts)].filter((t) => picks.includes(t))).size }))
    .sort((x, y) => y.s - x.s || x.a.n.localeCompare(y.a.n));
  const out = scored.filter((x) => x.s > 0).slice(0, 6);
  for (const x of scored) {
    if (out.length >= 4) break;
    if (!out.includes(x)) out.push(x);
  }
  return out.map((x) => x.a).sort((a, b) => a.n.localeCompare(b.n));
}

/* ───────────────────────── small pieces ───────────────────────── */

function Privacy({ children }) {
  return (
    <div className="small muted" style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <Lock size={16} style={{ flex: "none", marginTop: 2 }} aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

function Opt({ selected, onClick, children, disabled }) {
  return (
    <button className="opt" aria-pressed={selected} onClick={onClick} disabled={disabled}>
      <span className="tick">
        <Check size={14} strokeWidth={3} />
      </span>
      <span>{children}</span>
    </button>
  );
}

function Spark({ values, h = 64, color = "#7A2342", label = "Capacity trend" }) {
  if (values.length < 2) return null;
  const w = 300,
    pad = 8;
  const xs = values.map((_, i) => pad + (i * (w - 2 * pad)) / (values.length - 1));
  const ys = values.map((v) => pad + (1 - v / 100) * (h - 2 * pad));
  const d = xs.map((x, i) => `${i ? "L" : "M"}${x.toFixed(1)} ${ys[i].toFixed(1)}`).join(" ");
  const last = values.length - 1;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} role="img" aria-label={label}>
      <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity=".85" />
      {values.map((_, i) => (
        <circle key={i} cx={xs[i]} cy={ys[i]} r={i === last ? 5.5 : 3} fill={i === last ? color : "#FCF7F8"} stroke={color} strokeWidth="2" />
      ))}
    </svg>
  );
}

/* The memorable element: capacity as a tide level inside a ring. */
function Tide({ pct, word }) {
  const color = pct >= 65 ? "#7FA3D6" : pct >= 35 ? "#E79BB5" : "#9B3257";
  const y = 224 - (pct / 100) * 216;
  const wave = () => {
    let d = "M0 0";
    for (let i = 0; i < 4; i++) d += " q 29 -7 58 0 t 58 0";
    return d + " L464 260 L0 260 Z";
  };
  return (
    <div style={{ position: "relative", width: "min(232px,64vw)", margin: "0 auto" }}>
      <svg viewBox="0 0 232 232" width="100%" role="img" aria-label={`Capacity trend: ${word}`}>
        <defs>
          <clipPath id="tideclip">
            <circle cx="116" cy="116" r="108" />
          </clipPath>
        </defs>
        <circle cx="116" cy="116" r="108" fill="#FCF7F8" />
        <g clipPath="url(#tideclip)">
          <g style={{ transform: `translateY(${y}px)`, transition: "transform 1.4s cubic-bezier(.3,.7,.2,1), fill .6s" }}>
            <g className="wave2" opacity=".4">
              <path d={wave()} fill={color} transform="translate(-40 -4)" />
            </g>
            <g className="wave1">
              <path d={wave()} fill={color} opacity=".75" />
            </g>
          </g>
        </g>
        <circle cx="116" cy="116" r="108" fill="none" stroke="#3A1424" strokeOpacity=".16" strokeWidth="2" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>
        <div>
          <div className="serif" style={{ fontSize: 44, lineHeight: 1, fontWeight: 500 }}>
            {word}
          </div>
          <div style={{ fontSize: 14, marginTop: 6, fontWeight: 600 }}>Capacity trend</div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── storage, identity, login ───────────────────────── */

/* Saves to the device (localStorage) when deployed, or to Claude's artifact storage, or memory as a last resort. */
const STORE_KEY = "anchor:v1";
const store = (() => {
  let mode = null;
  let mem = null;
  const detect = () => {
    if (mode) return mode;
    try {
      window.localStorage.setItem("__anchor_probe", "1");
      window.localStorage.removeItem("__anchor_probe");
      mode = "local";
    } catch (e) {
      mode = typeof window !== "undefined" && window.storage ? "artifact" : "memory";
    }
    return mode;
  };
  return {
    mode: () => detect(),
    async load() {
      const m = detect();
      try {
        if (m === "local") {
          const v = window.localStorage.getItem(STORE_KEY);
          return v ? JSON.parse(v) : null;
        }
        if (m === "artifact") {
          const r = await window.storage.get(STORE_KEY);
          return r && r.value ? JSON.parse(r.value) : null;
        }
      } catch (e) {
        /* nothing saved yet */
      }
      return mem;
    },
    async save(data) {
      const m = detect();
      mem = data;
      try {
        const str = JSON.stringify(data);
        if (m === "local") window.localStorage.setItem(STORE_KEY, str);
        else if (m === "artifact") await window.storage.set(STORE_KEY, str);
      } catch (e) {
        /* keep going; the app still works for this session */
      }
    },
    async clear() {
      const m = detect();
      mem = null;
      try {
        if (m === "local") window.localStorage.removeItem(STORE_KEY);
        else if (m === "artifact") await window.storage.delete(STORE_KEY);
      } catch (e) {
        /* nothing to clear */
      }
    },
  };
})();
const storageNote = () => (store.mode() === "local" ? "Saved on this device only." : "Saved privately for you.");

const AVATARS = [
  { id: "feather", Icon: Feather, bg: "#F7DCE5", fg: "#7A2342" },
  { id: "leaf", Icon: Leaf, bg: "#DCE7F7", fg: "#24407A" },
  { id: "moon", Icon: Moon, bg: "#7A2342", fg: "#F7DCE5" },
  { id: "waves", Icon: Waves, bg: "#7FA3D6", fg: "#24407A" },
  { id: "sun", Icon: Sun, bg: "#E79BB5", fg: "#3A1424" },
  { id: "flower", Icon: Flower2, bg: "#F7DCE5", fg: "#9B3257" },
  { id: "shell", Icon: Shell, bg: "#DCE7F7", fg: "#7A2342" },
  { id: "mountain", Icon: Mountain, bg: "#3A1424", fg: "#E79BB5" },
];
const NAME_ADJ = ["Calm", "Steady", "Gentle", "Brave", "Quiet", "Bright", "Patient", "Kind", "Warm", "Hopeful", "Sure", "Still"];
const NAME_NOUN = ["Heron", "Lantern", "Harbor", "Tide", "Willow", "Ember", "Compass", "Sparrow", "River", "Cedar", "Meadow", "Falcon"];
const pickOne = (a) => a[Math.floor(Math.random() * a.length)];
function makeOptions(n = 3) {
  const avs = [...AVATARS].sort(() => Math.random() - 0.5).slice(0, n);
  const used = new Set();
  return avs.map((a) => {
    let name;
    do name = `${pickOne(NAME_ADJ)} ${pickOne(NAME_NOUN)}`;
    while (used.has(name));
    used.add(name);
    return { name, avatar: a.id };
  });
}

function Avatar({ id, size = 44 }) {
  const a = AVATARS.find((x) => x.id === id) || AVATARS[0];
  const I = a.Icon;
  return (
    <span className="avatar" style={{ width: size, height: size, background: a.bg, color: a.fg }} aria-hidden="true">
      <I size={Math.round(size * 0.5)} />
    </span>
  );
}

function Login({ existing, current, onEnter, onCancel }) {
  const [opts, setOpts] = useState(makeOptions);
  const [pick, setPick] = useState(0);
  const [sample, setSample] = useState(true);
  return (
    <div className="view stack-lg" style={{ paddingTop: 12 }}>
      <div className="brand">
        <AnchorIcon size={22} aria-hidden="true" /> Anchor
      </div>
      <div className="stack">
        <h1 className="h1">{existing ? "Pick a new identity." : "Pick who you are here."}</h1>
        <p className="p muted" style={{ fontSize: 17 }}>
          No email, no phone number, no real name. Just a name only you know.
        </p>
      </div>
      <div className="stack" style={{ gap: 10 }} role="group" aria-label="Choose an identity">
        {opts.map((o, i) => (
          <button key={o.name} className="opt" aria-pressed={pick === i} onClick={() => setPick(i)} style={{ minHeight: 72 }}>
            <Avatar id={o.avatar} size={48} />
            <span className="h3" style={{ flex: 1 }}>
              {o.name}
            </span>
            <span className="tick">
              <Check size={14} strokeWidth={3} />
            </span>
          </button>
        ))}
      </div>
      <div className="stack">
        <button
          className="btn btn-ghost"
          onClick={() => {
            setOpts(makeOptions());
            setPick(0);
          }}
        >
          <Shuffle size={18} aria-hidden="true" /> Show me others
        </button>
        {!existing && (
          <Opt selected={sample} onClick={() => setSample((v) => !v)}>
            Start with sample data (good for demos)
          </Opt>
        )}
        <button className="btn btn-primary" onClick={() => onEnter(opts[pick], sample)}>
          {existing ? "Switch identity" : "Enter Anchor"}
        </button>
        {existing && (
          <button className="btn btn-quiet" onClick={onCancel}>
            Keep {current.name}
          </button>
        )}
      </div>
      <Privacy>Your Anchor activity is private. {storageNote()}</Privacy>
    </div>
  );
}

function ProfileSheet({ profile, onClose, onSwitch, onErase }) {
  const [confirm, setConfirm] = useState(false);
  return (
    <div className="sheet-back" onClick={onClose}>
      <div className="sheet stack-lg" role="dialog" aria-label="Your profile" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Avatar id={profile.avatar} size={64} />
          <div>
            <div className="h3">{profile.name}</div>
            <div className="small muted">Only you know this name.</div>
          </div>
        </div>
        {!confirm ? (
          <div className="stack">
            <button className="btn btn-ghost" onClick={onSwitch}>
              <Shuffle size={18} aria-hidden="true" /> Switch identity
            </button>
            <button className="btn btn-ghost" onClick={() => setConfirm(true)}>
              <Trash2 size={18} aria-hidden="true" /> Erase everything and start over
            </button>
            <button className="btn btn-quiet" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <div className="stack">
            <p className="p">This deletes your check-ins, difficult moments, reflections, and saved pathways. It can't be undone.</p>
            <button className="btn btn-primary" onClick={onErase}>
              Yes, erase everything
            </button>
            <button className="btn btn-quiet" onClick={() => setConfirm(false)}>
              Cancel
            </button>
          </div>
        )}
        <Privacy>{storageNote()}</Privacy>
      </div>
    </div>
  );
}

/* ───────────────────────── HOME ───────────────────────── */

function Home({ capacity, series, goCheckIn, profile, onProfile, empty }) {
  const n = fallingDays(series);
  const tr = trendOf(series);
  const msg =
    capacity >= 70 ? "You have room right now." : capacity >= 40 ? "You're managing, but you're running low." : "You're running very low. Go gently.";
  const trend =
    n >= 2
      ? `Your capacity has been falling over the last ${n} days.`
      : series.length > 1 && series[series.length - 1] > series[series.length - 2]
      ? "Your capacity has picked up since your last check-in."
      : "Your capacity has been steady lately.";
  return (
    <div className="view stack-lg">
      <div className="top" style={{ marginBottom: 0 }}>
        <div className="brand">
          <AnchorIcon size={22} aria-hidden="true" /> Anchor
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="pill">
            <Lock size={13} aria-hidden="true" /> Private to you
          </span>
          <button className="avbtn" aria-label={`Profile: ${profile.name}`} onClick={onProfile}>
            <Avatar id={profile.avatar} size={40} />
          </button>
        </div>
      </div>

      <div style={{ textAlign: "center" }} className="stack">
        <Tide pct={capacity} word={empty ? "Ready" : tr.word} />
        <h1 className="h2" style={{ marginTop: 20 }}>
          {empty ? "Nothing logged yet." : msg}
        </h1>
        <p className="small muted">Based on your recent check-ins and difficult moments.</p>
      </div>

      <div className="card stack">
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Recent pattern</div>
          <p className="p muted" style={{ marginTop: 4 }}>
            {empty ? "Check in once and your pattern starts here." : trend}
          </p>
        </div>
        <Spark values={series.slice(-7)} />
      </div>

      <button className="btn btn-primary" onClick={goCheckIn}>
        Check in
      </button>

      <button className="card" onClick={goCheckIn} style={{ width: "100%", textAlign: "left", cursor: "pointer", display: "block" }}>
        <div className="h3">How was your day?</div>
        <p className="small muted" style={{ marginTop: 4 }}>
          A gentle reminder at 8 PM. It takes about 15 seconds.
        </p>
      </button>

      <Privacy>Your employer or university does not have access to your Anchor activity.</Privacy>
    </div>
  );
}

/* ───────────────────────── CHECK-IN ───────────────────────── */

function CheckIn({ capacityNow, onSubmit, goHome, goReset }) {
  const [mood, setMood] = useState(null);
  const [heavy, setHeavy] = useState(null);
  const [left, setLeft] = useState(50);
  const [voice, setVoice] = useState(false);
  const [done, setDone] = useState(null);

  if (done) {
    return (
      <div className="view stack-lg" style={{ paddingTop: 24 }}>
        <div className="stack">
          <h1 className="h1">Got it.</h1>
          <p className="p muted" style={{ fontSize: 18 }}>
            We'll keep an eye on your pattern.
          </p>
        </div>
        <div className="card-tint">
          <div className="small muted">Your capacity trend</div>
          <div className="serif" style={{ fontSize: 44, lineHeight: 1.1 }}>
            {done.trend}
          </div>
          <div className="small muted">Based on your recent check-ins and difficult moments.</div>
        </div>
        <div className="stack">
          {done.heavy !== "no" && (
            <button className="btn btn-ghost" onClick={goReset}>
              Note what was heavy
            </button>
          )}
          <button className="btn btn-primary" onClick={goHome}>
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="view stack-lg">
      <div className="stack">
        <h1 className="h1">How did today feel?</h1>
      </div>
      <div className="moods" role="group" aria-label="How did today feel?">
        {MOODS.map((m) => (
          <button key={m.id} className="mood" aria-pressed={mood === m.id} onClick={() => setMood(m.id)}>
            <span className="e">{m.emoji}</span>
            {m.label}
          </button>
        ))}
      </div>

      <div className="stack">
        <h2 className="h3">Anything heavy today?</h2>
        <div className="seg" role="group" aria-label="Anything heavy today?">
          {[
            ["no", "No"],
            ["yes", "Yes"],
            ["very", "Very heavy"],
          ].map(([v, l]) => (
            <button key={v} aria-pressed={heavy === v} onClick={() => setHeavy(v)}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="stack">
        <h2 className="h3">How much do you have left?</h2>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span className="small muted">Running on empty</span>
          <span className="serif" style={{ fontSize: 30 }}>
            {left}
          </span>
          <span className="small muted">Plenty left</span>
        </div>
        <input className="range" type="range" min="0" max="100" value={left} onChange={(e) => setLeft(+e.target.value)} aria-label="How much do you have left, 0 to 100" />
      </div>

      <button className="btn btn-ghost" onClick={() => setVoice((v) => !v)} aria-pressed={voice}>
        <Mic size={20} aria-hidden="true" /> {voice ? "Voice note added (demo only, nothing recorded)" : "Add a voice note (optional)"}
      </button>

      <button
        className="btn btn-primary"
        disabled={!mood || !heavy}
        onClick={() => {
          const r = onSubmit({ mood, heavy, left, voice });
          setDone({ trend: r.trend, heavy });
        }}
      >
        Done
      </button>
    </div>
  );
}

/* ───────────────────────── NOTICE ───────────────────────── */

function Notice({ checkIns, sorted, series, processed, goReset, goDecide, goCheckIn }) {
  const [open, setOpen] = useState(false);
  if (!sorted.length)
    return (
      <div className="view stack-lg">
        <div className="stack">
          <h1 className="h1">Notice</h1>
          <p className="p muted">Your pattern shows up here once you've checked in a few times.</p>
        </div>
        <div className="card-tint">
          <p className="h3">Two or three check-ins are enough to start seeing it.</p>
        </div>
        <div className="stack">
          <button className="btn btn-primary" onClick={goCheckIn}>
            Check in
          </button>
          <button className="btn btn-ghost" onClick={goReset}>
            I need a reset
          </button>
        </div>
      </div>
    );
  const week = sorted.filter((c) => dayDiff(c.date) <= 6);
  const heavyDays = week.filter((c) => c.heavy !== "no").length;
  const cap = series[series.length - 1] ?? 0;
  const n = fallingDays(series);
  const lastProcessed = processed[0];
  return (
    <div className="view stack-lg">
      <div className="stack">
        <h1 className="h1">Notice</h1>
        <p className="p muted">{cap < 60 ? "Your recent check-ins show a pattern of low capacity." : "Your recent check-ins show you have some room right now."}</p>
      </div>

      <div className="stack">
        <div className="card">
          <div className="small muted">Pattern</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 4 }}>
            <span className="serif" style={{ fontSize: 56, lineHeight: 1 }}>
              {heavyDays}
            </span>
            <span className="h3">heavy {heavyDays === 1 ? "day" : "days"} this week</span>
          </div>
        </div>

        <div className="card stack">
          <div>
            <div className="small muted">Capacity trend</div>
            <p className="h3" style={{ marginTop: 4 }}>
              {n >= 2 ? `Your capacity has been falling for ${n} days.` : "Your capacity has held fairly steady."}
            </p>
          </div>
          <Spark values={series.slice(-7)} />
          <p className="small muted">Based on your recent check-ins and difficult moments.</p>
        </div>

        <div className="card">
          <div className="small muted">Recovery</div>
          <p className="h3" style={{ marginTop: 4 }}>
            {lastProcessed ? `You recovered after your last difficult shift. You came back to ${evMeta(lastProcessed.type).about} and worked through it.` : "Recovery shows up here once you return to a difficult moment."}
          </p>
        </div>

        <div className="card-tint">
          <div className="small muted">Reflection</div>
          <p className="h3" style={{ marginTop: 4, fontStyle: "italic" }}>
            "I didn't realize this had been happening repeatedly."
          </p>
        </div>
      </div>

      {open && (
        <div className="card view">
          <div className="h3" style={{ marginBottom: 6 }}>
            The last 7 days
          </div>
          {week
            .slice()
            .reverse()
            .map((c) => (
              <div className="row" key={c.id}>
                <span>
                  {fmtDay(c.date)} &nbsp;{moodOf(c.mood).emoji} {moodOf(c.mood).label}
                </span>
                <span className="muted small">
                  {c.heavy === "no" ? "Nothing heavy" : c.heavy === "yes" ? "Heavy" : "Very heavy"}, {c.left} left
                </span>
              </div>
            ))}
          <p className="small muted" style={{ marginTop: 10 }}>
            This is a pattern in what you told us. It is not a diagnosis.
          </p>
        </div>
      )}

      <div className="stack">
        <button className="btn btn-primary" onClick={() => setOpen((o) => !o)}>
          {open ? "Hide my pattern" : "See my pattern"}
        </button>
        <button className="btn btn-ghost" onClick={goReset}>
          I need a reset
        </button>
        <button className="btn btn-quiet" onClick={goDecide}>
          Something needs to change? Look at my options
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── RESET (Triage Tap lives here) ───────────────────────── */

const CARRY = ["I keep replaying what they said", "I feel like I did something wrong", "I'm angry", "I feel embarrassed", "I'm exhausted", "I don't know"];
const CONTROL = ["My actions", "How I communicated", "Asking for help", "Following procedure", "I did what I could"];
const NOTCONTROL = ["Someone else's behavior", "The outcome", "The workload", "Other people's decisions", "Things I didn't know at the time"];
const SAY = ["You did what you could with what you had.", "That wasn't yours to carry alone.", "It makes sense that this hurts.", "You're allowed to ask for help.", "One hard moment doesn't define your work."];
const FEELINGS = [
  ["😔", "Worse"],
  ["😐", "Still heavy"],
  ["🙂", "A little lighter"],
  ["💛", "Much lighter"],
];

const afterShift = () => {
  const d = new Date();
  d.setHours(20, 0, 0, 0);
  if (d <= new Date()) d.setTime(Date.now() + 2 * 3600000);
  return d;
};
const tomorrow9 = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(9, 0, 0, 0);
  return d;
};
const fromInput = (v) => {
  const [h, m] = v.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  if (d <= new Date()) d.setDate(d.getDate() + 1);
  return d;
};

function Reset({ events, followUps, reset, setReset, createEvent, removeEvent, scheduleFollowUp, finishReset, goHome }) {
  const ev = events.find((e) => e.id === reset.eventId);
  const meta = ev ? evMeta(ev.type) : null;
  const { stage, fu } = reset;
  const upd = (patch) => setReset((r) => ({ ...r, ...patch }));
  const updFu = (patch) => setReset((r) => ({ ...r, fu: { ...r.fu, ...patch } }));
  const toggle = (key, val) => updFu({ [key]: fu[key].includes(val) ? fu[key].filter((x) => x !== val) : [...fu[key], val] });
  const openFollowUp = (id) => setReset({ ...reset, stage: "followup", eventId: id, fu: { feeling: null, carrying: [], control: [], notControl: [], statements: [], note: "" } });
  const back = (to) => (
    <button className="link" onClick={() => upd({ stage: to })}>
      <ChevronLeft size={18} aria-hidden="true" /> Back
    </button>
  );
  const dots = (i) => (
    <div className="dots" aria-hidden="true">
      {[0, 1, 2, 3].map((k) => (
        <i key={k} className={k === i ? "on" : ""} />
      ))}
    </div>
  );

  /* SELECT: the one-tap start */
  if (stage === "select") {
    const waiting = events.filter((e) => e.status !== "processed");
    return (
      <div key="select" className="view stack-lg">
        <div className="stack">
          <h1 className="h1">Reset</h1>
          <h2 className="h2">Something heavy happened?</h2>
          <p className="p muted">You don't have to process everything right now.</p>
        </div>
        <div className="grid2">
          {EVENTS.map((e, i) => (
            <button key={e.t} className="tile" style={i === EVENTS.length - 1 ? { gridColumn: "1 / -1" } : null} onClick={() => createEvent(e.t)}>
              {e.t}
            </button>
          ))}
        </div>

        {waiting.length > 0 && (
          <div className="stack">
            <h2 className="h3">Waiting for you</h2>
            {waiting.map((e) => {
              const f = followUps.find((x) => x.eventId === e.id);
              return (
                <div className="card stack" key={e.id}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{e.type}</div>
                    <div className="small muted">{f ? `You asked us to come back ${whenFuture(f.at)}.` : `${whenPast(e.createdAt)}, you noted this and kept going.`}</div>
                  </div>
                  <button className="btn btn-ghost" onClick={() => openFollowUp(e.id)}>
                    {f ? "Open pending reset" : "Reflect on this"}
                  </button>
                </div>
              );
            })}
            <p className="small muted">In the real app, Anchor would nudge you at the time you chose. Here, tap the button to simulate it.</p>
          </div>
        )}
      </div>
    );
  }

  /* STATE A */
  if (stage === "chosen" && ev) {
    return (
      <div key="chosen" className="view stack-lg">
        <div className="stack">
          <h1 className="h1">{meta.did}</h1>
          <p className="h2 muted">Do you have space to process this right now?</p>
        </div>
        <div className="stack">
          <button className="btn btn-primary" onClick={() => upd({ stage: "moment" })}>
            I have a moment
          </button>
          <button className="btn btn-ghost" onClick={() => upd({ stage: "when", custom: false })}>
            Come back later
          </button>
        </div>
        <button
          className="link"
          onClick={() => {
            removeEvent(ev.id);
            upd({ stage: "select", eventId: null });
          }}
        >
          Not this one
        </button>
      </div>
    );
  }

  /* STATE B: when */
  if (stage === "when" && ev) {
    return (
      <div key="when" className="view stack-lg">
        <div className="stack">
          <h1 className="h1">Okay. We've got it.</h1>
          <p className="p muted" style={{ fontSize: 18 }}>
            You still have work to finish. You don't have to process this right now.
          </p>
        </div>
        <div className="stack">
          <h2 className="h3">When would you like us to come back to this?</h2>
          <button className="btn btn-ghost" style={{ justifyContent: "space-between" }} onClick={() => scheduleFollowUp(ev.id, afterShift().toISOString(), "After my shift")}>
            After my shift <span className="small muted">around 8 PM</span>
          </button>
          <button className="btn btn-ghost" style={{ justifyContent: "space-between" }} onClick={() => upd({ custom: true })}>
            Choose a time
          </button>
          {reset.custom && (
            <div className="card view stack">
              <label className="small muted" htmlFor="ftime">
                Come back to this at
              </label>
              <input id="ftime" type="time" className="field" value={reset.time} onChange={(e) => upd({ time: e.target.value })} />
              <button className="btn btn-primary" onClick={() => scheduleFollowUp(ev.id, fromInput(reset.time).toISOString(), "A time I chose")}>
                Set this time
              </button>
            </div>
          )}
          <button className="btn btn-ghost" style={{ justifyContent: "space-between" }} onClick={() => scheduleFollowUp(ev.id, tomorrow9().toISOString(), "Tomorrow")}>
            Tomorrow <span className="small muted">9:00 AM</span>
          </button>
        </div>
        {back("chosen")}
      </div>
    );
  }

  if (stage === "confirmed" && ev) {
    const f = followUps.find((x) => x.eventId === ev.id);
    return (
      <div key="confirmed" className="view stack-lg" style={{ paddingTop: 12 }}>
        <div className="stack">
          <h1 className="h1">We'll come back to this later.</h1>
          <p className="h2 muted">You made it through that moment.</p>
        </div>
        <div className="card-tint">
          <div style={{ fontWeight: 600 }}>{ev.type}</div>
          <div className="small muted">{f ? `Coming back ${whenFuture(f.at)}` : ""}</div>
        </div>
        <button className="btn btn-primary" onClick={goHome}>
          Back to my day
        </button>
      </div>
    );
  }

  /* STATE C: a moment */
  if (stage === "moment") {
    return (
      <div key="moment" className="view stack-lg">
        <div className="stack">
          <h1 className="h1">It hurts.</h1>
          <p className="h2 muted">You don't have to solve everything right now.</p>
        </div>
        <div style={{ display: "grid", placeItems: "center", padding: "6px 0" }}>
          <div className="breath" aria-hidden="true" style={{ width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, #CFE0F5, #7FA3D6)" }} />
        </div>
        <div className="card stack">
          <p className="h3">Take one breath.</p>
          <p className="h3">Name what happened.</p>
          <p className="h3">You can come back to the rest later.</p>
        </div>
        <p className="small muted">This is a pause, not a fix. It doesn't replace support.</p>
        <button className="btn btn-primary" onClick={() => upd({ stage: "select", eventId: null })}>
          I'm ready to continue
        </button>
      </div>
    );
  }

  /* STATE D: follow-up */
  if (stage === "followup" && ev) {
    return (
      <div key="followup" className="view stack-lg">
        <div className="stack">
          <h1 className="h1">
            {whenPast(ev.createdAt)}, you told us about {meta.about}.
          </h1>
          <p className="p muted" style={{ fontSize: 18 }}>
            You had to keep working then.
          </p>
        </div>
        <div className="stack">
          <h2 className="h2">How are you feeling about it now?</h2>
          <div className="grid2">
            {FEELINGS.map(([e, l]) => (
              <button
                key={l}
                className="tile"
                style={{ minHeight: 84, display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start" }}
                onClick={() => {
                  updFu({ feeling: l });
                  upd({ stage: "q1" });
                }}
              >
                <span style={{ fontSize: 26 }}>{e}</span>
                {l}
              </button>
            ))}
          </div>
        </div>
        <button className="link" onClick={() => upd({ stage: "select", eventId: null })}>
          Not now
        </button>
      </div>
    );
  }

  /* Reflection steps */
  const step = (n, title, sub, list, key, next, prev) => (
    <div key={`q${n}`} className="view stack-lg">
      {dots(n - 1)}
      <div className="stack">
        <h1 className="h2">{title}</h1>
        <p className="small muted">{sub}</p>
      </div>
      <div className="stack" style={{ gap: 10 }}>
        {list.map((o) => (
          <Opt key={o} selected={fu[key].includes(o)} onClick={() => toggle(key, o)}>
            {o}
          </Opt>
        ))}
      </div>
      <button className="btn btn-primary" onClick={() => upd({ stage: next })}>
        Continue
      </button>
      {back(prev)}
    </div>
  );
  if (stage === "q1") return step(1, "What are you carrying from it?", "Choose any that fit.", CARRY, "carrying", "q2", "followup");
  if (stage === "q2") return step(2, "What was within your control?", "Choose any that fit.", CONTROL, "control", "q3", "q1");
  if (stage === "q3") return step(3, "What wasn't within your control?", "Choose any that fit.", NOTCONTROL, "notControl", "q4", "q2");

  if (stage === "q4") {
    return (
      <div key="q4" className="view stack-lg">
        {dots(3)}
        <div className="stack">
          <p className="h2 muted">You can acknowledge what happened without making it your entire identity.</p>
          <h1 className="h2">What would you say to another healthcare worker who went through exactly what you did?</h1>
          <p className="small muted">Choose any that feel true, or write your own. Both are optional.</p>
        </div>
        <div className="stack" style={{ gap: 10 }}>
          {SAY.map((o) => (
            <Opt key={o} selected={fu.statements.includes(o)} onClick={() => toggle("statements", o)}>
              {o}
            </Opt>
          ))}
          <textarea className="field" rows={2} maxLength={140} placeholder="In your own words (optional)" value={fu.note} onChange={(e) => updFu({ note: e.target.value })} aria-label="Your own words, optional" />
        </div>
        <button className="btn btn-primary" onClick={() => upd({ stage: "final" })}>
          Continue
        </button>
        {back("q3")}
      </div>
    );
  }

  if (stage === "final") {
    return (
      <div key="final" className="view stack-lg" style={{ paddingTop: 12 }}>
        <div className="stack">
          <h1 className="h1">You tried your best today.</h1>
          <p className="h2 muted">You don't have to carry every difficult moment forever.</p>
        </div>
        <div className="stack">
          <button className="btn btn-primary" onClick={() => finishReset("lighter")}>
            I'm feeling a little lighter
          </button>
          <button className="btn btn-ghost" onClick={() => finishReset("support")}>
            I still need support
          </button>
          <button className="btn btn-quiet" onClick={() => finishReset("not now")}>
            Not now
          </button>
        </div>
      </div>
    );
  }

  if (stage === "support") {
    return (
      <div key="support" className="view stack-lg">
        <div className="stack">
          <h1 className="h1">Thank you for saying so.</h1>
          <p className="p muted" style={{ fontSize: 18 }}>
            Needing support is a reasonable thing to need.
          </p>
        </div>
        <div className="card stack">
          <h2 className="h3">Talk to someone</h2>
          <p className="p muted">Consider speaking with a trusted person, counsellor, therapist, supervisor, or other appropriate professional.</p>
        </div>
        <div className="stack">
          <button className="btn btn-ghost" onClick={() => upd({ stage: "q4" })}>
            Keep reflecting
          </button>
          <button className="btn btn-quiet" onClick={() => upd({ stage: "done", outcome: "not now" })}>
            Not now
          </button>
        </div>
        <p className="small muted">Anchor is not a replacement for professional mental-health care. If you feel unsafe or might harm yourself, contact your local emergency number or a crisis line right away.</p>
      </div>
    );
  }

  if (stage === "done") {
    return (
      <div key="done" className="view stack-lg" style={{ paddingTop: 12 }}>
        <div className="stack">
          <h1 className="h1">{reset.outcome === "lighter" ? "A little lighter counts." : "That's okay."}</h1>
          <p className="p muted" style={{ fontSize: 18 }}>
            This reset is saved and marked as processed in your History. You can return to it whenever you like.
          </p>
        </div>
        <button className="btn btn-primary" onClick={goHome}>
          Back to my day
        </button>
      </div>
    );
  }

  return null;
}

/* ───────────────────────── DECIDE ───────────────────────── */

function Decide({ decide, setDecide, savedPathways, savePathways, goHome, series, events }) {
  const { step, needs, skills, change, bookmarked, flash } = decide;
  const opened = decide.opened || []; // pathways whose next steps are showing
  const steps = decide.steps || {}; // { pathwayName: index of the next step the person picked }
  const touched = decide.touched || false; // has interacted with at least one pathway
  const set = (patch) => setDecide((d) => ({ ...d, ...patch }));
  const pick = (key, val, max) => {
    const cur = decide[key];
    if (cur.includes(val)) set({ [key]: cur.filter((x) => x !== val) });
    else if (!max || cur.length < max) set({ [key]: [...cur, val] });
  };
  const areas = useMemo(() => (change ? pickAreas(change, needs, skills) : []), [change, needs, skills]);
  const order = ["intro", "needs", "skills", "areas"];
  const dotsEl = (
    <div className="dots" aria-hidden="true">
      {order.slice(1).map((s) => (
        <i key={s} className={s === step ? "on" : ""} />
      ))}
    </div>
  );
  const tr = trendOf(series);
  const cap = series.length ? series[series.length - 1] : 50;
  const noData = series.length === 0;
  const hasPattern = !noData && (tr.n >= 2 || cap < 60);
  const capLine = noData ? "No check-ins yet, so this is just a first look." : tr.n >= 2 ? `Your capacity has been falling over the last ${tr.n} days.` : cap < 60 ? "Your recent check-ins show a pattern of low capacity." : "Your capacity looks steadier right now.";
  const moments = events.length;
  const momentLine = moments ? `You've logged ${moments} difficult ${moments === 1 ? "moment" : "moments"}.` : "You haven't logged any difficult moments yet.";

  /* ── 1. what do you think it is? ── */
  if (step === "intro") {
    return (
      <div key="intro" className="view stack-lg">
        <div className="stack">
          <h1 className="h1">{hasPattern ? "Something needs to change." : "Is there something you'd like to change?"}</h1>
          <div className="card-tint stack">
            <div className="small muted">From your check-ins</div>
            <p className="p">{capLine}</p>
            <p className="p">{momentLine}</p>
          </div>
          <p className="p muted">You tried your best today. And you come first, too.</p>
        </div>
        <div className="stack">
          <h2 className="h2">What do you think it is?</h2>
          <div className="stack" style={{ gap: 10 }}>
            {CAUSES.map((c) => (
              <button key={c.id} className="opt" style={{ alignItems: "flex-start" }} aria-pressed={change === c.id} onClick={() => set({ change: c.id })}>
                <span className="tick" style={{ marginTop: 2 }}>
                  <Check size={14} strokeWidth={3} />
                </span>
                <span>
                  <span style={{ display: "block", fontWeight: 600 }}>{c.label}</span>
                  <span className="small muted" style={{ display: "block" }}>
                    {c.sub}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
        <button className="btn btn-primary" disabled={!change} onClick={() => set({ step: "needs" })}>
          Continue
        </button>
      </div>
    );
  }

  /* ── 2. needs (up to 3) ── */
  if (step === "needs") {
    return (
      <div key="needs" className="view stack-lg">
        {dotsEl}
        <div className="stack">
          <h1 className="h2">What do you need from your work?</h1>
          <p className="small muted">Choose up to 3. {needs.length} of 3 chosen.</p>
        </div>
        <div className="stack" style={{ gap: 10 }}>
          {NEEDS.map((n) => (
            <Opt key={n} selected={needs.includes(n)} disabled={!needs.includes(n) && needs.length >= 3} onClick={() => pick("needs", n, 3)}>
              {n}
            </Opt>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => set({ step: "skills" })}>
          Continue
        </button>
        <button className="link" onClick={() => set({ step: "intro" })}>
          <ChevronLeft size={18} aria-hidden="true" /> Back
        </button>
      </div>
    );
  }

  /* ── 3. skills ── */
  if (step === "skills") {
    return (
      <div key="skills" className="view stack-lg">
        {dotsEl}
        <div className="stack">
          <h1 className="h2">What are you naturally good at?</h1>
          <p className="small muted">Choose any that fit.</p>
        </div>
        <div className="stack" style={{ gap: 10 }}>
          {SKILLS.map((n) => (
            <Opt key={n} selected={skills.includes(n)} onClick={() => pick("skills", n)}>
              {n}
            </Opt>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => set({ step: "areas" })}>
          Show me what's possible
        </button>
        <button className="link" onClick={() => set({ step: "needs" })}>
          <ChevronLeft size={18} aria-hidden="true" /> Back
        </button>
      </div>
    );
  }

  /* ── 4. matched pathways, each with next steps ── */
  const savedNames = savedPathways.map((p) => p.name);
  const isSaved = (n) => savedNames.some((x) => x === n || x.startsWith(`${n} — next:`));
  const practical = change === "workload" || change === "support";
  const stepsFor = (a) => a.steps || NEXT_STEPS[a.kind];
  const chosen = areas.filter((a) => steps[a.n] !== undefined).map((a) => ({ area: a, step: stepsFor(a)[steps[a.n]] }));

  const toggleOpen = (n) => set({ opened: opened.includes(n) ? opened.filter((x) => x !== n) : [...opened, n], touched: true });
  const toggleBookmark = (n) => set({ bookmarked: bookmarked.includes(n) ? bookmarked.filter((x) => x !== n) : [...bookmarked, n], touched: true });
  const chooseStep = (n, i) => {
    const next = { ...steps };
    if (next[n] === i) delete next[n];
    else next[n] = i;
    set({ steps: next, touched: true });
  };
  const saveSelected = () => {
    const names = [...new Set([...bookmarked, ...chosen.map((c) => c.area.n)])];
    if (!names.length) return set({ flash: "Tap the bookmark or pick a next step first." });
    savePathways(
      names.map((n) => {
        const c = chosen.find((x) => x.area.n === n);
        return c ? `${n} — next: ${c.step.short}` : n;
      })
    );
    set({ bookmarked: [], steps: {}, flash: chosen.length ? "Saved with your next step. You'll find it in History." : "Saved. You'll find them in History." });
  };

  return (
    <div key="areas" className="view stack-lg">
      {dotsEl}
      <div className="stack">
        <h1 className="h2">{practical ? "Based on what you selected, here are some options you could look at." : "Based on what you selected, here are some areas you could explore."}</h1>
        <p className="small muted">Listed alphabetically. They are not ranked, and none of them is a recommendation. Exploring is not a commitment.</p>
      </div>

      <div className="stack" style={{ gap: 12 }}>
        {areas.map((a) => {
          const on = bookmarked.includes(a.n) || isSaved(a.n);
          const isOpen = opened.includes(a.n);
          return (
            <div className="card stack" key={a.n} style={{ padding: 18 }}>
              <div>
                <div className="h3">{a.n}</div>
                <p className="small muted" style={{ marginTop: 4 }}>
                  {a.d}
                </p>
              </div>

              {a.facts && (
                <div className="grid2 small" style={{ gap: 10 }}>
                  {FACT_LABELS.map((label, i) => (
                    <div key={label}>
                      <div className="muted">{label}</div>
                      <div style={{ fontWeight: 600 }}>{a.facts[i]}</div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btn-primary" style={{ flex: 1, minHeight: 52, fontSize: 16 }} aria-expanded={isOpen} onClick={() => toggleOpen(a.n)}>
                  {isOpen ? "Hide next steps" : "See next steps"}
                </button>
                <button
                  aria-label={on ? `Remove ${a.n} from my selection` : `Select ${a.n} to save`}
                  aria-pressed={on}
                  onClick={() => !isSaved(a.n) && toggleBookmark(a.n)}
                  style={{ flex: "none", background: on ? "var(--sel)" : "transparent", border: "1.5px solid var(--line)", borderRadius: 16, width: 52, height: 52, display: "grid", placeItems: "center", cursor: "pointer", color: "var(--deep)" }}
                >
                  <Bookmark size={20} fill={on ? "currentColor" : "none"} />
                </button>
              </div>

              {isOpen && (
                <div className="card-tint view stack" style={{ padding: 16 }}>
                  <div className="h3">Two small next steps</div>
                  <p className="small muted">Pick one if it feels doable. Nothing here commits you to anything.</p>
                  {stepsFor(a).map((t, i) => (
                    <Opt key={t.short} selected={steps[a.n] === i} onClick={() => chooseStep(a.n, i)}>
                      {t.text}
                    </Opt>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="small muted">Hours, emergencies, and patient contact are typical patterns. They vary by country, institution, and role.</p>

      {!touched && (
        <p className="small muted" style={{ textAlign: "center" }}>
          Tap "See next steps" on anything that catches your eye.
        </p>
      )}

      {touched && (
        <div className="card-tint view stack">
          <h2 className="h2">One small step is enough</h2>
          <p className="p">You don't have to choose your whole future today. Pick one action, or save options and come back later.</p>

          {chosen.length > 0 && (
            <div className="stack" style={{ gap: 6 }}>
              <div className="small muted">Your next step</div>
              {chosen.map((c) => (
                <p className="p" key={c.area.n} style={{ fontWeight: 600 }}>
                  {c.area.n}: {c.step.short}
                </p>
              ))}
            </div>
          )}

          <button className="btn btn-primary" onClick={saveSelected}>
            Save selected pathways
          </button>
          {flash && (
            <p className="small muted" role="status" style={{ textAlign: "center" }}>
              {flash}
            </p>
          )}
          <button className="btn btn-ghost" onClick={goHome}>
            I'm still figuring it out
          </button>
        </div>
      )}

      <button className="link" onClick={() => set({ step: "intro" })}>
        <ChevronLeft size={18} aria-hidden="true" /> Change my answers
      </button>
    </div>
  );
}

/* ───────────────────────── HISTORY ───────────────────────── */

function HistoryScreen({ sorted, series, events, resetResponses, savedPathways }) {
  const evs = [...events].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const rs = [...resetResponses].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  const statusLabel = { processed: "Processed", pending: "Pending", noted: "Noted" };
  return (
    <div className="view stack-lg">
      <h1 className="h1">History</h1>

      <section className="card">
        <h2 className="h3">Check-ins</h2>
        {sorted.length === 0 && <p className="small muted">Nothing here yet.</p>}
        {[...sorted].reverse().slice(0, 8).map((c) => (
          <div className="row" key={c.id}>
            <span>
              {fmtDay(c.date)} &nbsp;{moodOf(c.mood).emoji} {moodOf(c.mood).label}
            </span>
            <span className="small muted">{c.left} left</span>
          </div>
        ))}
      </section>

      <section className="card stack">
        <h2 className="h3">Capacity trend</h2>
        <Spark values={series.slice(-10)} h={72} />
        <p className="small muted">Based on your recent check-ins and difficult moments.</p>
      </section>

      <section className="card">
        <h2 className="h3">Difficult moments</h2>
        {evs.length === 0 && <p className="small muted">Nothing here yet.</p>}
        {evs.map((e) => (
          <div className="row" key={e.id}>
            <span>
              {fmtDay(e.createdAt)}, {e.type}
            </span>
            <span className={`status s-${e.status}`}>{statusLabel[e.status]}</span>
          </div>
        ))}
      </section>

      <section className="card">
        <h2 className="h3">Resets</h2>
        {rs.length === 0 && <p className="small muted">Completed reflections appear here.</p>}
        {rs.map((r) => {
          const e = events.find((x) => x.id === r.eventId);
          return (
            <div className="row" key={r.eventId} style={{ alignItems: "flex-start" }}>
              <div>
                <div>{e ? e.type : "Reset"}</div>
                <div className="small muted">
                  {r.feeling ? `Felt: ${r.feeling.toLowerCase()}. ` : ""}
                  {r.outcome === "lighter" ? "Left a little lighter." : r.outcome === "support" ? "Wanted more support." : "Paused for now."}
                </div>
              </div>
              <span className="small muted">{fmtDay(r.completedAt)}</span>
            </div>
          );
        })}
      </section>

      <section className="card">
        <h2 className="h3">Saved pathways</h2>
        {savedPathways.length === 0 && <p className="small muted">Areas you save in Decide appear here.</p>}
        {savedPathways.map((p) => (
          <div className="row" key={p.id}>
            <span>{p.name}</span>
            <span className="small muted">{fmtDay(p.savedAt)}</span>
          </div>
        ))}
      </section>

      <div className="stack">
        <Privacy>Your Anchor activity is private.</Privacy>
        <p className="small muted">This prototype uses local demo data. Your employer or university does not have access to your check-ins.</p>
      </div>
    </div>
  );
}

/* ───────────────────────── APP ───────────────────────── */

const TABS = [
  { id: "home", label: "Home", Icon: HomeIcon },
  { id: "checkin", label: "Check-in", Icon: CheckCircle2 },
  { id: "notice", label: "Notice", Icon: Eye },
  { id: "reset", label: "Reset", Icon: LifeBuoy },
  { id: "decide", label: "Decide", Icon: Compass },
  { id: "history", label: "History", Icon: HistoryIcon },
];

const freshFu = () => ({ feeling: null, carrying: [], control: [], notControl: [], statements: [], note: "" });
const freshReset = () => ({ stage: "select", eventId: null, custom: false, time: "18:00", outcome: null, fu: freshFu() });
const freshDecide = () => ({ step: "intro", needs: [], skills: [], change: null, bookmarked: [], explore: false, figuring: false, flash: "" });

export default function App() {
  const [tab, setTab] = useState("home");
  const [checkIns, setCheckIns] = useState([]);
  const [difficultEvents, setEvents] = useState([]);
  const [scheduledFollowUps, setFollowUps] = useState([]);
  const [resetResponses, setResponses] = useState([]);
  const [savedPathways, setSaved] = useState([]);
  const [reset, setReset] = useState(freshReset);
  const [decide, setDecide] = useState(freshDecide);
  const [profile, setProfile] = useState(null);
  const [ready, setReady] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [switching, setSwitching] = useState(false);
  const scrollRef = useRef(null);

  const { sorted, series } = useMemo(() => computeCapacity(checkIns, difficultEvents), [checkIns, difficultEvents]);
  const capacity = series.length ? series[series.length - 1] : 50;
  const processed = difficultEvents.filter((e) => e.status === "processed").sort((a, b) => new Date(b.processedAt) - new Date(a.processedAt));

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0 });
  }, [tab, reset.stage, decide.step]);

  /* load what was saved last time (identity + data) */
  useEffect(() => {
    let alive = true;
    (async () => {
      const d = await store.load();
      if (!alive) return;
      if (d && d.profile) {
        setProfile(d.profile);
        setCheckIns(d.checkIns || []);
        setEvents(d.difficultEvents || []);
        setFollowUps(d.scheduledFollowUps || []);
        setResponses(d.resetResponses || []);
        setSaved(d.savedPathways || []);
      }
      setReady(true);
    })();
    return () => {
      alive = false;
    };
  }, []);

  /* save quietly after every change */
  useEffect(() => {
    if (!ready || !profile) return;
    store.save({ profile, checkIns, difficultEvents, scheduledFollowUps, resetResponses, savedPathways });
  }, [ready, profile, checkIns, difficultEvents, scheduledFollowUps, resetResponses, savedPathways]);

  const submitCheckIn = (c) => {
    const now = new Date();
    const entry = { id: `c${Date.now()}`, date: now.toISOString(), ...c };
    const next = [...checkIns.filter((x) => dayDiff(x.date) !== 0), entry];
    setCheckIns(next);
    const s = computeCapacity(next, difficultEvents).series;
    return { pct: s[s.length - 1], trend: trendOf(s).word };
  };
  const createEvent = (type) => {
    const id = `e${Date.now()}`;
    setEvents((es) => [...es, { id, type, createdAt: new Date().toISOString(), status: "noted" }]);
    setReset((r) => ({ ...r, stage: "chosen", eventId: id, custom: false }));
  };
  const removeEvent = (id) => setEvents((es) => es.filter((e) => e.id !== id));
  const scheduleFollowUp = (eventId, iso, label) => {
    setEvents((es) => es.map((e) => (e.id === eventId ? { ...e, status: "pending", followUpAt: iso } : e)));
    setFollowUps((fs) => [...fs.filter((f) => f.eventId !== eventId), { id: `f${Date.now()}`, eventId, at: iso, label }]);
    setReset((r) => ({ ...r, stage: "confirmed", custom: false }));
  };
  const finishReset = (outcome) => {
    const id = reset.eventId;
    const now = new Date().toISOString();
    setEvents((es) => es.map((e) => (e.id === id ? { ...e, status: "processed", processedAt: now } : e)));
    setFollowUps((fs) => fs.filter((f) => f.eventId !== id));
    setResponses((rs) => [...rs.filter((r) => r.eventId !== id), { eventId: id, ...reset.fu, outcome, completedAt: now }]);
    setReset((r) => ({ ...r, stage: outcome === "support" ? "support" : "done", outcome }));
  };
  const savePathways = (names) =>
    setSaved((s) => [...s, ...names.filter((n) => !s.some((p) => p.name === n)).map((n) => ({ id: `p${Date.now()}${n}`, name: n, savedAt: new Date().toISOString() }))]);
  const goHome = () => {
    setReset(freshReset());
    setDecide(freshDecide());
    setTab("home");
  };

  const enter = (p, sample) => {
    setProfile(p);
    if (!profile && sample) {
      setCheckIns(seedCheckIns);
      setEvents(seedEvents);
      setFollowUps(seedFollowUps);
      setResponses(seedResponses);
    }
    setSwitching(false);
    setSheet(false);
    setTab("home");
  };
  const eraseAll = async () => {
    await store.clear();
    setProfile(null);
    setCheckIns([]);
    setEvents([]);
    setFollowUps([]);
    setResponses([]);
    setSaved([]);
    setReset(freshReset());
    setDecide(freshDecide());
    setSheet(false);
    setSwitching(false);
    setTab("home");
  };

  if (!ready)
    return (
      <div className="anc">
        <style>{css}</style>
        <div className="phone" style={{ alignItems: "center", justifyContent: "center" }}>
          <AnchorIcon size={36} aria-hidden="true" />
        </div>
      </div>
    );
  if (!profile || switching)
    return (
      <div className="anc">
        <style>{css}</style>
        <div className="phone">
          <main className="scroll">
            <Login existing={!!profile} current={profile} onEnter={enter} onCancel={() => setSwitching(false)} />
          </main>
        </div>
      </div>
    );

  let body = null;
  if (tab === "home") body = <Home capacity={capacity} series={series} goCheckIn={() => setTab("checkin")} profile={profile} onProfile={() => setSheet(true)} empty={checkIns.length === 0} />;
  if (tab === "checkin") body = <CheckIn capacityNow={capacity} onSubmit={submitCheckIn} goHome={goHome} goReset={() => setTab("reset")} />;
  if (tab === "notice") body = <Notice checkIns={checkIns} sorted={sorted} series={series} processed={processed} goReset={() => setTab("reset")} goDecide={() => setTab("decide")} goCheckIn={() => setTab("checkin")} />;
  if (tab === "reset")
    body = (
      <Reset
        events={difficultEvents}
        followUps={scheduledFollowUps}
        reset={reset}
        setReset={setReset}
        createEvent={createEvent}
        removeEvent={removeEvent}
        scheduleFollowUp={scheduleFollowUp}
        finishReset={finishReset}
        goHome={goHome}
      />
    );
  if (tab === "decide") body = <Decide decide={decide} setDecide={setDecide} savedPathways={savedPathways} savePathways={savePathways} goHome={goHome} series={series} events={difficultEvents} />;
  if (tab === "history") body = <HistoryScreen sorted={sorted} series={series} events={difficultEvents} resetResponses={resetResponses} savedPathways={savedPathways} />;

  return (
    <div className="anc">
      <style>{css}</style>
      <div className="phone">
        <main className="scroll" ref={scrollRef}>
          {body}
        </main>
        <nav className="nav" aria-label="Anchor sections">
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} aria-current={tab === id ? "page" : undefined} onClick={() => setTab(id)}>
              <span className="ic">
                <Icon size={20} aria-hidden="true" />
              </span>
              {label}
            </button>
          ))}
        </nav>
      {sheet && (
          <ProfileSheet
            profile={profile}
            onClose={() => setSheet(false)}
            onSwitch={() => {
              setSheet(false);
              setSwitching(true);
            }}
            onErase={eraseAll}
          />
        )}
      </div>
    </div>
  );
}
