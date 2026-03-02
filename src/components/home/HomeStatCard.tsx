type HomeStatCardProps = {
  label: string;
  value: string;
};

export function HomeStatCard({ label, value }: HomeStatCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left backdrop-blur-sm">
      <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <div className="mt-1 text-lg font-light text-white">{value}</div>
    </div>
  );
}
