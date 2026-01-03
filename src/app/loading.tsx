export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[var(--foreground)] border-t-transparent rounded-full animate-spin" />
        <p className="text-[var(--muted)] text-sm">Loading...</p>
      </div>
    </div>
  );
}
