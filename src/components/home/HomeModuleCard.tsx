import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Icon3D } from "@/components/ui/icon-3d";

type ModuleTone = "purple" | "blue" | "emerald";

type HomeModuleCardProps = {
  title: string;
  description: string;
  badge: string;
  icon: LucideIcon;
  accentIcon: LucideIcon;
  iconVariant: "glow" | "floating" | "pulse" | "rotate" | "primary";
  badgeVariant: "glow" | "floating" | "pulse" | "rotate" | "primary";
  tone: ModuleTone;
  to?: string;
  href?: string;
  external?: boolean;
  className?: string;
};

const toneStyles: Record<ModuleTone, { shell: string; overlay: string; bubble: string; text: string; badge: string }> = {
  purple: {
    shell:
      "from-purple-900/50 to-slate-900/40 border-purple-400/25 hover:border-purple-300/60 focus-visible:ring-purple-300/60",
    overlay: "from-purple-500/20",
    bubble: "bg-purple-600/20 group-hover:bg-purple-500/30",
    text: "text-purple-100",
    badge: "text-purple-300"
  },
  blue: {
    shell:
      "from-blue-900/50 to-slate-900/40 border-blue-400/25 hover:border-blue-300/60 focus-visible:ring-blue-300/60",
    overlay: "from-blue-500/20",
    bubble: "bg-blue-600/20 group-hover:bg-blue-500/30",
    text: "text-blue-100",
    badge: "text-blue-300"
  },
  emerald: {
    shell:
      "from-emerald-900/50 to-slate-900/40 border-emerald-400/25 hover:border-emerald-300/60 focus-visible:ring-emerald-300/60",
    overlay: "from-emerald-500/20",
    bubble: "bg-emerald-600/20 group-hover:bg-emerald-500/30",
    text: "text-emerald-100",
    badge: "text-emerald-300"
  }
};

export function HomeModuleCard({
  title,
  description,
  badge,
  icon,
  accentIcon,
  iconVariant,
  badgeVariant,
  tone,
  to,
  href,
  external = false,
  className
}: HomeModuleCardProps) {
  const style = toneStyles[tone];

  const content: ReactNode = (
    <>
      <div className={`absolute inset-0 bg-gradient-to-br ${style.overlay} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/5 blur-2xl transition-transform duration-700 group-hover:scale-125" />

      <div className="relative flex h-full flex-col gap-5">
        <div className="flex items-center justify-center">
          <div className={`rounded-full p-4 transition-colors duration-300 ${style.bubble}`}>
            <Icon3D icon={icon} variant={iconVariant} size={46} className={style.text} />
          </div>
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-light tracking-widest text-white">{title}</h2>
          <p className="text-sm leading-relaxed text-slate-200">{description}</p>
        </div>

        <div className={`mt-auto flex items-center justify-center gap-2 text-xs ${style.badge}`}>
          <Icon3D icon={accentIcon} variant={badgeVariant} size={16} />
          <span>{badge}</span>
        </div>
      </div>
    </>
  );

  const sharedClasses = `group relative flex overflow-hidden rounded-2xl border bg-gradient-to-br p-7 backdrop-blur-md shadow-[0_10px_45px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(76,29,149,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${style.shell} ${className ?? ""}`;

  if (to) {
    return (
      <Link to={to} className={sharedClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={sharedClasses}>
        {content}
      </a>
    );
  }

  return null;
}
