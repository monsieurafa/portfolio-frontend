import Image from "next/image"
import Link from "next/link"
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Database,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Radio,
  ScanSearch,
  Sparkles,
} from "lucide-react"
import profilePhoto from "/public/profile-photo.jpg"

const projects = [
  {
    number: "01",
    title: "Earthquake detection, from a live seismic feed.",
    description:
      "A thesis project that runs the CREIME neural network against live waveform data from Sulawesi. The system streams browser updates over SSE and recovers automatically after backend cold starts.",
    tags: ["TensorFlow", "FastAPI", "SSE", "Next.js"],
    href: "/earthquake-detection",
    icon: Radio,
    tone: "bg-[#ff6846]",
    featured: true,
  },
  {
    number: "02",
    title: "Real-time grocery product detection.",
    description:
      "A computer vision interface connecting a Next.js client to a Python and YOLO11 inference service for product detection.",
    tags: ["YOLO11", "Computer Vision", "Gradio"],
    href: "/object-detection",
    icon: ScanSearch,
    tone: "bg-[#b8f34a]",
    featured: false,
  },
  {
    number: "03",
    title: "Predicting chess Elo from move statistics.",
    description:
      "A data pipeline and neural network study comparing recurrent and convolutional models for player-rating prediction.",
    tags: ["Python", "RNN", "CNN", "Data"],
    href: "https://github.com/monsieurafa/Chess-Elo-Prediction",
    icon: BrainCircuit,
    tone: "bg-[#8ed8f8]",
    featured: false,
  },
]

const experience = [
  {
    period: "Jun — Aug 2024",
    role: "AI & ML Engineer Intern",
    company: "Bank Mandiri",
    detail:
      "Built sequential prediction models, automated daily inference for Livin' users, and implemented a retraining pipeline to keep model performance current.",
  },
  {
    period: "Aug — Dec 2024",
    role: "Computer-Aided Instruction Mentor",
    company: "University of Indonesia",
    detail:
      "Mentored two student teams through the design and development of e-learning systems across online and classroom environments.",
  },
]

const capabilities = [
  {
    title: "Machine learning",
    icon: BrainCircuit,
    items: "TensorFlow, PyTorch, sequence models, computer vision",
  },
  {
    title: "Software systems",
    icon: Database,
    items: "Python, Java, SQL, FastAPI, Django, Spring Boot",
  },
  {
    title: "Product interfaces",
    icon: Sparkles,
    items: "Next.js, React, TypeScript, real-time data experiences",
  },
]

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#181818] selection:bg-[#ff6846] selection:text-[#181818]">
      <nav className="sticky top-0 z-50 border-b-2 border-[#181818] bg-[#f3f0e8]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <a href="#top" className="font-mono text-sm font-black uppercase tracking-[0.18em]">
            Rafa Maritza
          </a>
          <div className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a className="transition-colors hover:text-[#d9492f]" href="#work">Work</a>
            <a className="transition-colors hover:text-[#d9492f]" href="#experience">Experience</a>
            <a className="transition-colors hover:text-[#d9492f]" href="#about">About</a>
          </div>
          <a
            href="mailto:elrafamaritza@gmail.com"
            className="group inline-flex items-center gap-2 border-2 border-[#181818] bg-[#181818] px-4 py-2 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            Let&apos;s talk
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </nav>

      <section id="top" className="relative overflow-hidden border-b-2 border-[#181818]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(#181818 1px, transparent 1px), linear-gradient(90deg, #181818 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="relative mx-auto grid max-w-[1440px] lg:grid-cols-[1.12fr_0.88fr]">
          <div className="flex min-h-[680px] flex-col justify-between border-[#181818] px-5 py-12 sm:px-8 sm:py-16 lg:border-r-2 lg:px-12 lg:py-20">
            <div>
              <div className="mb-10 flex flex-wrap items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.18em]">
                <span className="inline-flex items-center gap-2 border-2 border-[#181818] bg-[#b8f34a] px-3 py-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#181818]" />
                  Open to opportunities
                </span>
                <span className="inline-flex items-center gap-2 px-1 py-2">
                  <MapPin className="h-4 w-4" /> Indonesia
                </span>
              </div>

              <p className="mb-5 max-w-xl text-lg font-semibold text-[#4d4a43] sm:text-xl">
                AI engineer · software builder · curious generalist
              </p>
              <h1 className="max-w-5xl text-[clamp(4rem,10vw,9rem)] font-black leading-[0.82] tracking-[-0.075em]">
                Building
                <span className="block text-[#d9492f]">intelligent</span>
                systems.
              </h1>
            </div>

            <div className="mt-16 grid gap-8 border-t-2 border-[#181818] pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-2xl text-lg leading-relaxed text-[#4d4a43] sm:text-xl">
                I turn machine-learning research into reliable, understandable products—from live seismic inference to computer vision.
              </p>
              <a href="#work" className="group inline-flex w-fit items-center gap-3 text-base font-black uppercase tracking-[0.08em]">
                Selected work
                <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-[#181818] bg-[#ff6846] transition-transform group-hover:translate-y-1">
                  <ArrowDownRight className="h-5 w-5" />
                </span>
              </a>
            </div>
          </div>

          <div className="relative min-h-[560px] bg-[#8ed8f8] p-5 sm:p-8 lg:min-h-[760px] lg:p-12">
            <div className="absolute right-5 top-5 z-10 border-2 border-[#181818] bg-[#f3f0e8] px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.14em] sm:right-8 sm:top-8 lg:right-12 lg:top-12">
              UI Computer Science · 2025
            </div>
            <div className="relative h-full min-h-[520px] overflow-hidden border-2 border-[#181818] bg-[#181818] shadow-[12px_12px_0_#181818] lg:min-h-[660px]">
              <Image
                src={profilePhoto}
                alt="Rafa Maritza in his University of Indonesia graduation jacket"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-[52%_42%] grayscale-[15%]"
              />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-black/85 via-black/45 to-transparent p-6 pt-32 text-white">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/70">Currently exploring</p>
                  <p className="mt-2 max-w-xs text-xl font-bold leading-tight">Reliable AI systems and real-time interfaces.</p>
                </div>
                <span className="hidden font-mono text-xs uppercase tracking-[0.14em] sm:block">Tangerang Selatan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="border-b-2 border-[#181818] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 font-mono text-xs font-black uppercase tracking-[0.2em] text-[#d9492f]">Selected projects</p>
              <h2 className="text-5xl font-black tracking-[-0.055em] sm:text-7xl">Work that moves.</h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-[#5d5951]">
              Research, engineering, and product thinking brought together in systems you can actually try.
            </p>
          </div>

          <div className="grid border-l-2 border-t-2 border-[#181818] lg:grid-cols-2">
            {projects.map((project) => {
              const Icon = project.icon
              return (
                <Link
                  key={project.number}
                  href={project.href}
                  target={project.href.startsWith("http") ? "_blank" : undefined}
                  rel={project.href.startsWith("http") ? "noreferrer" : undefined}
                  className={`group relative flex min-h-[420px] flex-col justify-between border-b-2 border-r-2 border-[#181818] p-7 transition-colors sm:p-10 ${
                    project.featured ? "lg:row-span-2 lg:min-h-[840px]" : "bg-[#f3f0e8] hover:bg-white"
                  }`}
                >
                  {project.featured && <div className="absolute inset-0 bg-[#ff6846]" />}
                  <div className="relative flex items-start justify-between">
                    <span className="font-mono text-sm font-black">/{project.number}</span>
                    <span className={`grid h-14 w-14 place-items-center rounded-full border-2 border-[#181818] ${project.tone}`}>
                      <Icon className="h-7 w-7" />
                    </span>
                  </div>
                  <div className="relative mt-20">
                    <h3 className={`font-black leading-[0.95] tracking-[-0.05em] ${project.featured ? "text-5xl sm:text-7xl" : "text-4xl sm:text-5xl"}`}>
                      {project.title}
                    </h3>
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#37342f] sm:text-lg">{project.description}</p>
                    <div className="mt-8 flex flex-wrap items-center gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="border border-[#181818] px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-10 flex items-center gap-2 font-bold">
                      View project
                      <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section id="experience" className="border-b-2 border-[#181818] bg-[#181818] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="mb-4 font-mono text-xs font-black uppercase tracking-[0.2em] text-[#b8f34a]">Experience</p>
            <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-7xl">Where I&apos;ve contributed.</h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-white/60">
              Working across model development, automated pipelines, and mentoring software teams.
            </p>
          </div>

          <div className="border-t border-white/30">
            {experience.map((item, index) => (
              <article key={item.role} className="grid gap-5 border-b border-white/30 py-9 sm:grid-cols-[110px_1fr] sm:gap-8">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#8ed8f8]">{item.period}</span>
                <div>
                  <div className="mb-4 flex items-start gap-4">
                    <span className="font-mono text-xs text-white/40">0{index + 1}</span>
                    <div>
                      <h3 className="text-2xl font-black tracking-[-0.025em] sm:text-3xl">{item.role}</h3>
                      <p className="mt-1 text-lg font-semibold text-[#b8f34a]">{item.company}</p>
                    </div>
                  </div>
                  <p className="max-w-2xl pl-9 leading-relaxed text-white/65">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="border-b-2 border-[#181818] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-4 font-mono text-xs font-black uppercase tracking-[0.2em] text-[#d9492f]">About & capabilities</p>
              <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-7xl">Grounded in code. Driven by questions.</h2>
            </div>
            <div>
              <p className="text-2xl font-semibold leading-snug tracking-[-0.025em] sm:text-3xl">
                I&apos;m a Computer Science graduate from the University of Indonesia who enjoys the full path from messy data to a useful interface.
              </p>
              <div className="mt-10 grid gap-px border-2 border-[#181818] bg-[#181818] md:grid-cols-3">
                <div className="bg-[#b8f34a] p-6">
                  <p className="font-mono text-xs font-black uppercase tracking-[0.15em]">Education</p>
                  <p className="mt-8 text-2xl font-black">B.Sc. Computer Science</p>
                  <p className="mt-2 text-sm">University of Indonesia · 2025</p>
                </div>
                <div className="bg-[#8ed8f8] p-6">
                  <p className="font-mono text-xs font-black uppercase tracking-[0.15em]">Focus</p>
                  <p className="mt-8 text-2xl font-black">Applied AI systems</p>
                  <p className="mt-2 text-sm">ML engineering · product development</p>
                </div>
                <div className="bg-[#ff6846] p-6">
                  <p className="font-mono text-xs font-black uppercase tracking-[0.15em]">Languages</p>
                  <p className="mt-8 text-2xl font-black">Indonesian · English</p>
                  <p className="mt-2 text-sm">Collaboration across technical teams</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid border-l-2 border-t-2 border-[#181818] md:grid-cols-3">
            {capabilities.map((capability) => {
              const Icon = capability.icon
              return (
                <div key={capability.title} className="border-b-2 border-r-2 border-[#181818] bg-white/30 p-7 sm:p-9">
                  <Icon className="h-8 w-8" />
                  <h3 className="mt-12 text-2xl font-black tracking-[-0.03em]">{capability.title}</h3>
                  <p className="mt-3 leading-relaxed text-[#5d5951]">{capability.items}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#b8f34a] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
            <div>
              <p className="mb-5 font-mono text-xs font-black uppercase tracking-[0.2em]">Have a problem worth solving?</p>
              <h2 className="max-w-5xl text-6xl font-black leading-[0.88] tracking-[-0.065em] sm:text-8xl lg:text-9xl">Let&apos;s build something useful.</h2>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <a href="mailto:elrafamaritza@gmail.com" className="group inline-flex items-center justify-between gap-12 border-2 border-[#181818] bg-[#181818] px-6 py-4 font-bold text-white">
                Email me <Mail className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="https://github.com/monsieurafa" target="_blank" rel="noreferrer" className="group inline-flex items-center justify-between gap-12 border-2 border-[#181818] px-6 py-4 font-bold transition-colors hover:bg-white/40">
                GitHub <Github className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="https://www.linkedin.com/in/rafa-maritza-858447226/" target="_blank" rel="noreferrer" className="group inline-flex items-center justify-between gap-12 border-2 border-[#181818] px-6 py-4 font-bold transition-colors hover:bg-white/40">
                LinkedIn <Linkedin className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-[#181818] bg-[#b8f34a] px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 font-mono text-xs font-bold uppercase tracking-[0.12em] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Rafa Maritza</span>
          <span className="inline-flex items-center gap-2"><BriefcaseBusiness className="h-4 w-4" /> AI · ML · Software</span>
        </div>
      </footer>
    </main>
  )
}
