interface RotatingBadgeProps {
  text?: string;
  icon?: string;
}

export function RotatingBadge({
  text = "Design • Create • Iterate",
  icon = "code",
}: RotatingBadgeProps) {
  return (
    <div className="w-24 h-24 border border-[var(--border)] rounded-full flex items-center justify-center relative">
      <svg
        className="w-full h-full absolute inset-0 text-[var(--foreground)] opacity-80 animate-spin-slow"
        viewBox="0 0 100 100"
      >
        <defs>
          <path
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="transparent"
            id="curve"
          />
        </defs>
        <text
          className="text-[10px] uppercase tracking-[0.2em]"
          fill="currentColor"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          <textPath href="#curve" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="w-16 h-16 rounded-full border border-[var(--border)] flex items-center justify-center bg-[var(--foreground)]/5 backdrop-blur-sm">
        <span className="material-symbols-outlined text-2xl text-[var(--foreground)]">{icon}</span>
      </div>
    </div>
  );
}
