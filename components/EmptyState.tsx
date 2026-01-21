import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: ReactNode;
}

export function EmptyState({ title, description, actionLabel, actionHref, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && <div className="mb-6 text-6xl opacity-40">{icon}</div>}
      <h3 className="text-xl md:text-2xl font-serif font-light mb-3">{title}</h3>
      <p className="text-sm md:text-base opacity-70 max-w-md mb-6" style={{ color: "var(--muted)" }}>
        {description}
      </p>
      {actionLabel && actionHref && (
        <a
          href={actionHref}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-300"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          {actionLabel}
        </a>
      )}
    </div>
  );
}
