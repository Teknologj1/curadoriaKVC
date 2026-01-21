export function PropertyCardSkeleton() {
  return (
    <article
      className="rounded-3xl overflow-hidden border animate-pulse"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div className="relative aspect-[4/5]" style={{ background: "var(--surface2)" }} />
      <div className="p-5 space-y-3">
        <div className="h-4 rounded w-3/4" style={{ background: "var(--surface2)" }} />
        <div className="h-3 rounded w-1/2" style={{ background: "var(--surface2)" }} />
        <div className="flex items-center justify-between">
          <div className="h-3 rounded w-24" style={{ background: "var(--surface2)" }} />
          <div className="h-8 rounded-xl w-20" style={{ background: "var(--surface2)" }} />
        </div>
      </div>
    </article>
  );
}
