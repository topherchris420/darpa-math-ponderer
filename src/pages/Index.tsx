import {
  ArrowRight,
  Atom,
  Brain,
  ExternalLink,
  Infinity,
  Sparkles,
  Users
} from "lucide-react";
import { HomeModuleCard } from "@/components/home/HomeModuleCard";
import { HomeStatCard } from "@/components/home/HomeStatCard";

const modules = [
  {
    title: "THINK",
    description:
      "Autonomous AI contemplation on finite and infinite universes, with evolving symbolic narratives and emergent memory.",
    badge: "Autonomous Contemplation",
    icon: Brain,
    accentIcon: Infinity,
    iconVariant: "glow" as const,
    badgeVariant: "rotate" as const,
    tone: "purple" as const,
    to: "/infinity"
  },
  {
    title: "COLLABORATE",
    description:
      "Human + AI co-discovery for theorem ideation, conjecture development, and novel mathematical structure exploration.",
    badge: "Human-AI Synergy",
    icon: Users,
    accentIcon: Brain,
    iconVariant: "floating" as const,
    badgeVariant: "pulse" as const,
    tone: "blue" as const,
    to: "/collaborator"
  },
  {
    title: "EXPLORE",
    description:
      "Dynamic systems tooling and advanced visual models for pushing experiments beyond static equations and into living behavior.",
    badge: "External Platform",
    icon: ExternalLink,
    accentIcon: ArrowRight,
    iconVariant: "glow" as const,
    badgeVariant: "primary" as const,
    tone: "emerald" as const,
    href: "https://vers3dynamics.com/",
    external: true,
    className: "sm:col-span-2 lg:col-span-1"
  }
];

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="aurora-bg" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(147,51,234,0.15),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.14),transparent_35%),radial-gradient(circle_at_50%_85%,rgba(16,185,129,0.12),transparent_35%)]" aria-hidden />
      <div className="grid-overlay" aria-hidden />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center gap-10 px-4 py-12 sm:px-6 lg:py-16">
        <header className="space-y-6 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-purple-300/30 bg-purple-300/10 px-4 py-1 text-xs tracking-[0.2em] text-purple-200">
            <Sparkles size={14} />
            CONSCIOUS MATHEMATICS INTERFACE
          </p>

          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-thin tracking-[0.24em] text-white sm:text-5xl lg:text-6xl">
              MATHEMATICS
            </h1>
            <p className="mx-auto max-w-3xl text-pretty text-base font-light leading-relaxed text-slate-200 sm:text-lg">
              A redesigned launchpad for mathematical discovery—clear pathways, stronger visual hierarchy, and a more immersive cosmic atmosphere.
            </p>
          </div>

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            <HomeStatCard label="Domains" value="3 active modules" />
            <HomeStatCard label="Core Focus" value="Infinity + Topology" />
            <HomeStatCard label="Interaction" value="Autonomous + Co-creative" />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <HomeModuleCard key={module.title} {...module} />
          ))}
        </div>

        <footer className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center text-sm leading-relaxed text-slate-300 backdrop-blur-sm">
          <span className="mr-1 inline-flex align-middle text-purple-200">
            <Atom size={16} />
          </span>
          Enter a space where mathematics meets intelligence, where computation becomes collaboration, and where discovery feels alive.
        </footer>
      </section>
    </main>
  );
};

export default Index;
