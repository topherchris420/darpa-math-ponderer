import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Brain, FileText, Home, Infinity as InfinityIcon, Network } from 'lucide-react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface AppShellProps {
  children: React.ReactNode;
  eyebrow?: string;
}

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/collaborator', label: 'Workspace', icon: Network },
  { to: '/infinity', label: 'Think', icon: InfinityIcon },
];

export const AppShell: React.FC<AppShellProps> = ({ children, eyebrow = 'Conjecture workspace' }) => {
  const { progress, condensed } = useScrollProgress();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="lab-grid fixed inset-0" aria-hidden />
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
          condensed ? 'border-white/10 bg-background/95 shadow-lg shadow-black/30' : 'border-white/5 bg-background/70'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
            condensed ? 'py-2' : 'py-3'
          }`}
        >
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span
              className={`flex items-center justify-center rounded-md border border-cyan-300/30 bg-cyan-300/10 transition-all duration-300 ${
                condensed ? 'h-8 w-8' : 'h-10 w-10'
              }`}
            >
              <Brain className="h-5 w-5 text-cyan-200" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-semibold tracking-wide text-white">DARPA Math Ponderer</span>
              <span
                className={`hidden overflow-hidden text-xs uppercase tracking-[0.16em] text-slate-500 transition-all duration-300 sm:block ${
                  condensed ? 'max-h-0 opacity-0' : 'max-h-5 opacity-100'
                }`}
              >
                {eyebrow}
              </span>
            </span>
          </Link>

          <nav className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] p-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  aria-label={item.label}
                  title={item.label}
                  className={({ isActive }) =>
                    `inline-flex min-h-10 items-center gap-2 rounded-md px-3 text-sm transition ${
                      isActive ? 'bg-cyan-300 text-slate-950' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <Link
            to="/collaborator"
            className="hidden min-h-10 items-center gap-2 rounded-md border border-lime-300/30 bg-lime-300/10 px-3 text-sm text-lime-100 transition hover:bg-lime-300 hover:text-slate-950 md:inline-flex"
          >
            <FileText className="h-4 w-4" />
            New run
          </Link>
        </div>
        <div
          className="h-0.5 origin-left bg-gradient-to-r from-cyan-300 via-cyan-200 to-lime-300 transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden
        />
      </header>
      <main className="relative z-10">{children}</main>
    </div>
  );
};
