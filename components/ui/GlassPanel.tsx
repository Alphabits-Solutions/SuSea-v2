import clsx from "clsx";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={clsx(
        "glass-panel rounded-xl border border-outline-variant/10",
        className
      )}
    >
      {children}
    </div>
  );
}
