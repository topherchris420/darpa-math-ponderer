import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Brain, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background text-foreground overflow-hidden px-4">
      {/* Background patterns */}
      <div className="lab-grid absolute inset-0 opacity-40" aria-hidden />
      <div className="aurora-bg absolute opacity-30 animate-breathe-slow" aria-hidden />

      <div className="relative z-10 text-center max-w-md w-full space-y-6 rounded-xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md shadow-2xl animate-fade-in-up">
        <div className="flex justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.2)] animate-pulse">
            <Brain className="h-8 w-8" />
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-7xl font-extrabold tracking-widest bg-gradient-to-r from-cyan-300 via-purple-400 to-lime-300 bg-clip-text text-transparent select-none">
            404
          </h1>
          <p className="text-sm font-mono uppercase tracking-[0.2em] text-slate-500">
            Coordinates Unresolved
          </p>
        </div>

        <div className="space-y-2 text-slate-300">
          <p className="text-lg font-medium text-white">Lost in the manifold</p>
          <p className="text-sm leading-relaxed">
            The mathematical trajectory <code className="px-1.5 py-0.5 rounded bg-black/40 font-mono text-cyan-200 text-xs break-all">{location.pathname}</code> does not correspond to any known topological manifold.
          </p>
        </div>

        <div className="pt-4">
          <Button asChild className="w-full h-11 bg-cyan-300 text-slate-950 hover:bg-cyan-200 font-medium transition duration-300 flex items-center justify-center gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Return to coordinates
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
