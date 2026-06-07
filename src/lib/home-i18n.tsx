/**
 * Homepage-only lightweight i18n.
 *
 * Scoped to the landing page (not the dashboards). `LanguageProvider` holds the
 * chosen language; `useT()` returns a `t(english)` lookup that falls back to the
 * English key when no translation exists. Only Bahasa Malaysia (`bm`) is
 * translated for now — 中文 / தமிழ் fall back to English.
 */
import {
  createContext, useContext, useEffect, useRef, useState, type ReactNode,
} from "react";
import { Check, ChevronDown } from "lucide-react";

export type Lang = "en" | "bm" | "zh" | "ta";

export const LANGUAGES: { code: Lang; label: string; short: string; flag: string }[] = [
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
  { code: "bm", label: "Bahasa Malaysia", short: "BM", flag: "🇲🇾" },
  { code: "zh", label: "中文", short: "中文", flag: "🇨🇳" },
  { code: "ta", label: "தமிழ்", short: "TA", flag: "🇮🇳" },
];

/** English string → Bahasa Malaysia. Missing keys render the English source. */
const BM: Record<string, string> = {
  // Nav
  "Find Jobs": "Cari Kerja",
  "For Employers": "Untuk Majikan",
  "Programs": "Program",
  "AI Services": "Perkhidmatan AI",
  "Log in": "Log Masuk",
  "Get Started": "Mula Sekarang",

  // Hero
  "Building Malaysia's": "Membina tenaga kerja",
  "future": "masa depan",
  "workforce": "Malaysia",
  "One national portal — two clear paths. Find work or hire talent with practical, AI-assisted tools that save real time.":
    "Satu portal kebangsaan — dua laluan jelas. Cari kerja atau ambil bakat dengan alatan praktikal berbantukan AI yang menjimatkan masa.",
  "Job title or keyword": "Jawatan atau kata kunci",
  "Location": "Lokasi",
  "Search jobs": "Cari Kerja",
  "Popular:": "Popular:",
  "Find a job": "Cari Kerja",
  "Hire talent": "Ambil Bakat",

  // Trust band
  "In partnership with": "Dengan kerjasama",

  // Stats
  "Jobseekers registered": "Pencari kerja berdaftar",
  "Employers hiring": "Majikan sedang mengambil",
  "Placements this year": "Penempatan tahun ini",
  "Career events held": "Acara kerjaya diadakan",

  // Browse categories
  "Explore by category": "Terokai mengikut kategori",
  "Find roles in your": "Cari jawatan dalam",
  "field": "bidang anda",
  "Browse thousands of verified openings across every major industry in Malaysia.":
    "Layari ribuan jawatan kosong yang disahkan dalam setiap industri utama di Malaysia.",
  "Browse all categories": "Layari semua kategori",
  "Technology": "Teknologi",
  "Finance & Accounting": "Kewangan & Perakaunan",
  "Healthcare": "Penjagaan Kesihatan",
  "Engineering": "Kejuruteraan",
  "Sales & Marketing": "Jualan & Pemasaran",
  "Customer Service": "Khidmat Pelanggan",
  "Education": "Pendidikan",
  "Manufacturing": "Pembuatan",
  "jobs": "kerja",

  // Two paths
  "Two clear doors": "Dua pintu jelas",
  "One portal, dedicated to": "Satu portal, didedikasikan untuk",
  "jobseekers": "pencari kerja",
  "and": "dan",
  "employers": "majikan",
  "Jobseekers": "Pencari Kerja",
  "Find work that fits your future": "Cari kerja yang sesuai dengan masa depan anda",
  "AI auto-fills your profile from your CV": "AI mengisi profil anda secara automatik daripada CV",
  "Persistent filters — never restart your search": "Penapis berterusan — tidak perlu mula semula carian",
  "Honest match scores on every role": "Skor padanan jujur untuk setiap jawatan",
  "Create your profile": "Cipta profil anda",
  "Employers": "Majikan",
  "Hire faster with assistive AI": "Ambil pekerja lebih pantas dengan bantuan AI",
  "AI-generated job descriptions in minutes": "Penerangan kerja dijana AI dalam beberapa minit",
  "Auto-matched, summarised candidates": "Calon dipadan & diringkaskan secara automatik",
  "Clean pipeline — no dashboard clutter": "Saluran kerja kemas — tiada papan pemuka berselerak",
  "Post your first vacancy": "Siarkan jawatan pertama anda",

  // Feature spotlight
  "For jobseekers": "Untuk pencari kerja",
  "Your CV becomes a": "CV anda menjadi",
  "living profile": "profil hidup",
  "Upload once and AI fills in your skills, experience and strengths — then keeps matching you to roles as the market moves.":
    "Muat naik sekali dan AI mengisi kemahiran, pengalaman dan kekuatan anda — kemudian terus memadankan anda dengan jawatan seiring perubahan pasaran.",
  "Auto-filled profile from your CV": "Profil diisi automatik daripada CV anda",
  "One-tap apply with a tailored CV": "Mohon dengan satu ketik menggunakan CV tersuai",
  "Build your profile": "Bina profil anda",
  "For employers": "Untuk majikan",
  "Hire without the": "Ambil pekerja tanpa",
  "busywork": "kerja remeh",
  "Generate a job description in minutes, get a ranked shortlist with explainable fit, and run a clean pipeline from post to offer.":
    "Jana penerangan kerja dalam beberapa minit, dapatkan senarai pendek berperingkat dengan padanan yang boleh dijelaskan, dan urus saluran kerja kemas dari siaran ke tawaran.",
  "AI-drafted, bias-checked job descriptions": "Penerangan kerja dirangka AI, disemak bias",
  "Auto-ranked, summarised candidates": "Calon diberi peringkat & diringkaskan automatik",
  "Interview kits and scorecards built in": "Kit temu duga dan kad skor disediakan",
  "Start hiring": "Mula mengambil pekerja",

  // Programs
  "Programs & events": "Program & acara",
  "Career carnivals, hiring days &": "Karnival kerjaya, hari pengambilan &",
  "free training": "latihan percuma",
  "Meet employers face-to-face, interview on the spot, and upskill — all across Malaysia.":
    "Temui majikan secara bersemuka, temu duga di tempat, dan tingkatkan kemahiran — di seluruh Malaysia.",
  "View all programs": "Lihat semua program",

  // Featured employers
  "Top employers hiring now": "Majikan teratas sedang mengambil",
  "Companies": "Syarikat",
  "building their teams": "membina pasukan mereka",
  "See all employers": "Lihat semua majikan",
  "open roles": "jawatan kosong",

  // Recommendations
  "Picked for you": "Dipilih untuk anda",
  "Roles trending across Malaysia right now": "Jawatan yang sedang popular di seluruh Malaysia",
  "Sign in to turn these into": "Log masuk untuk menjadikannya",
  "personalised matches": "padanan peribadi",
  "ranked by your skills.": "yang diperingkatkan mengikut kemahiran anda.",
  "Sign in to personalise": "Log masuk untuk peribadikan",

  // AI band
  "Practical AI": "AI praktikal",
  "AI that does the work": "AI yang melakukan kerja",
  "for you": "untuk anda",
  "Productivity-focused, grounded in your real data, and always optional. No gimmicks.":
    "Fokus produktiviti, berasaskan data sebenar anda, dan sentiasa pilihan. Tiada gimik.",
  "Jobs that fit your profile": "Kerja yang sesuai dengan profil anda",
  "Match scores grounded in your skills, experience and preferences — not guesswork.":
    "Skor padanan berasaskan kemahiran, pengalaman dan keutamaan anda — bukan tekaan.",
  "CV analysis & improvement": "Analisis & penambahbaikan CV",
  "Concrete suggestions to strengthen your CV for the roles you actually want.":
    "Cadangan konkrit untuk mengukuhkan CV anda bagi jawatan yang anda mahukan.",
  "Certification & training advisor": "Penasihat pensijilan & latihan",
  "AI-recommended courses and credentials to close the gap to your target role.":
    "Kursus dan kelayakan disyorkan AI untuk merapatkan jurang ke jawatan sasaran anda.",
  "Explore": "Terokai",
  "See all AI services": "Lihat semua perkhidmatan AI",

  // Success stories
  "Success stories": "Kisah kejayaan",
  "Real people,": "Orang sebenar,",
  "real outcomes": "hasil sebenar",
  "Jobseekers and employers across Malaysia, in their own words.":
    "Pencari kerja dan majikan di seluruh Malaysia, dalam kata-kata mereka sendiri.",

  // How it works
  "How it works for": "Cara ia berfungsi untuk",
  "For employers →": "Untuk majikan →",
  "Or let AI auto-fill it from your CV in seconds.": "Atau biar AI mengisinya daripada CV anda dalam beberapa saat.",
  "Search with continuity": "Cari dengan berterusan",
  "Filters and context follow you — never restart.": "Penapis dan konteks mengikut anda — tidak perlu mula semula.",
  "Apply with confidence": "Mohon dengan yakin",
  "See your match score and fit notes before you apply.": "Lihat skor padanan dan nota kesesuaian sebelum memohon.",
  "Track every outcome": "Jejaki setiap hasil",
  "Clean pipeline from application to offer.": "Saluran kerja kemas dari permohonan ke tawaran.",

  // Career resources
  "Career resources": "Sumber kerjaya",
  "Advice to move your": "Nasihat untuk memajukan",
  "career forward": "kerjaya anda",
  "Visit the resource hub": "Lawati hab sumber",
  "CV & Profile": "CV & Profil",
  "Skills": "Kemahiran",
  "Interviews": "Temu duga",
  "Write a CV that actually gets interviews": "Tulis CV yang benar-benar mendapat temu duga",
  "The most in-demand skills in Malaysia for 2026": "Kemahiran paling diperlukan di Malaysia untuk 2026",
  "How to ace your first interview, step by step": "Cara cemerlang dalam temu duga pertama anda, langkah demi langkah",
  "min read": "min bacaan",

  // Mobile app
  "On the go": "Dalam perjalanan",
  "Take MYFutureJobs": "Bawa MYFutureJobs",
  "with you": "bersama anda",
  "Get instant match alerts, apply in a tap, and chat with the AI assistant — wherever you are.":
    "Dapatkan makluman padanan segera, mohon dengan satu ketik, dan berbual dengan pembantu AI — di mana sahaja anda berada.",
  "Download on the": "Muat turun di",
  "Get it on": "Dapatkan di",

  // FAQ
  "Questions": "Soalan",
  "Frequently": "Soalan",
  "asked": "lazim",
  "Is MYFutureJobs free to use?": "Adakah MYFutureJobs percuma untuk digunakan?",
  "Yes. Creating a profile, searching jobs, applying, and using the core AI tools are free for all jobseekers — it's a national service of the Ministry of Human Resources.":
    "Ya. Mencipta profil, mencari kerja, memohon, dan menggunakan alatan AI teras adalah percuma untuk semua pencari kerja — ia perkhidmatan kebangsaan Kementerian Sumber Manusia.",
  "How does AI matching work?": "Bagaimana padanan AI berfungsi?",
  "AI reads your profile and CV, then scores each role on your skills, experience and preferences. Every match comes with an honest fit score and the reasoning behind it.":
    "AI membaca profil dan CV anda, kemudian memberi skor setiap jawatan berdasarkan kemahiran, pengalaman dan keutamaan anda. Setiap padanan disertakan skor kesesuaian yang jujur dan sebab di sebaliknya.",
  "Do I need to upload a CV?": "Adakah saya perlu memuat naik CV?",
  "It helps — AI auto-fills your profile from your CV in seconds. You can also build your profile manually and add a CV later.":
    "Ia membantu — AI mengisi profil anda daripada CV dalam beberapa saat. Anda juga boleh membina profil secara manual dan menambah CV kemudian.",
  "How do employers post jobs?": "Bagaimana majikan menyiarkan kerja?",
  "Employers create a free account, generate a bias-checked job description with AI in minutes, and publish to reach matched candidates instantly.":
    "Majikan mencipta akaun percuma, menjana penerangan kerja yang disemak bias dengan AI dalam beberapa minit, dan menyiarkannya untuk mencapai calon yang dipadankan serta-merta.",
  "What languages are supported?": "Bahasa apa yang disokong?",
  "The portal is available in English, Bahasa Malaysia, Chinese and Tamil, with a language switcher throughout.":
    "Portal ini tersedia dalam bahasa Inggeris, Bahasa Malaysia, Cina dan Tamil, dengan penukar bahasa di seluruh laman.",

  // CTA band
  "Free · takes a minute": "Percuma · ambil seminit",
  "Your next role starts with": "Jawatan seterusnya anda bermula dengan",
  "one profile": "satu profil",
  "Join Malaysia's national employment portal — get matched, upskill, and meet employers at events near you.":
    "Sertai portal pekerjaan kebangsaan Malaysia — dapatkan padanan, tingkatkan kemahiran, dan temui majikan di acara berdekatan anda.",
  "Create your free profile": "Cipta profil percuma anda",
  "Explore AI services": "Terokai perkhidmatan AI",

  // Hero filters (quick search)
  "AI predictive search": "Carian ramalan AI",
  "Remote": "Jarak jauh",
  "Hybrid": "Hibrid",
  "Full-time": "Sepenuh masa",

  // Programs
  "AI-matched": "Dipadan AI",

  // Community
  "Community": "Komuniti",
  "Connect, learn and": "Berhubung, belajar dan",
  "grow": "berkembang",
  "A space to network, discuss careers and get instant help from the AI assistant.":
    "Ruang untuk berhubung, berbincang kerjaya dan mendapatkan bantuan segera daripada pembantu AI.",
  "Networking hub": "Hab rangkaian",
  "Meet peers, mentors and recruiters in your field.": "Temui rakan, mentor dan perekrut dalam bidang anda.",
  "Career discussions": "Perbincangan kerjaya",
  "Ask questions and share job-seeking tips with the community.": "Tanya soalan dan kongsi tip mencari kerja dengan komuniti.",
  "Industry forums": "Forum industri",
  "Topic-based forums for tech, finance, healthcare and more.": "Forum mengikut topik untuk teknologi, kewangan, penjagaan kesihatan dan banyak lagi.",
  "Instant answers and guidance, any time you need them.": "Jawapan dan panduan segera, bila-bila masa anda perlukan.",
  "Join the community": "Sertai komuniti",

  // Company reviews & ratings
  "Company reviews & ratings": "Ulasan & penilaian syarikat",
  "Know before you": "Ketahui sebelum anda",
  "apply": "memohon",
  "Real ratings from jobseekers — work-life balance, salary, management and culture, with AI sentiment highlights.":
    "Penilaian sebenar daripada pencari kerja — keseimbangan kerja-hidup, gaji, pengurusan dan budaya, dengan sorotan sentimen AI.",
  "Work-life": "Kerja-hidup",
  "Salary": "Gaji",
  "Management": "Pengurusan",
  "Culture": "Budaya",
  "reviews": "ulasan",
  "Read reviews": "Baca ulasan",
  "Browse all company reviews": "Layari semua ulasan syarikat",
  "AI sentiment": "Sentimen AI",

  // Footer
  "Company": "Syarikat",
  "A service of the Ministry of Human Resources, Malaysia.": "Perkhidmatan Kementerian Sumber Manusia, Malaysia.",
};

const DICT: Partial<Record<Lang, Record<string, string>>> = { bm: BM };

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

const STORAGE_KEY = "mfj_home_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved) setLangState(saved);
    } catch { /* ignore */ }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** Returns a translator: `t("English text")` → localized string (or the source). */
export function useT() {
  const { lang } = useLang();
  return (s: string) => DICT[lang]?.[s] ?? s;
}

/** Flag dropdown language switcher for the homepage nav. */
export function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-ink/80 hover:bg-surface-alt transition-colors"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span>{current.short}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-border bg-surface p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]"
        >
          {LANGUAGES.map((l) => {
            const active = l.code === lang;
            return (
              <li key={l.code}>
                <button
                  role="option"
                  aria-selected={active}
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                    active ? "bg-surface-alt text-ink" : "text-ink/80 hover:bg-surface-alt"
                  }`}
                >
                  <span className="text-base leading-none">{l.flag}</span>
                  <span className="flex-1">{l.label}</span>
                  {active && <Check className="h-4 w-4 text-brand" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
