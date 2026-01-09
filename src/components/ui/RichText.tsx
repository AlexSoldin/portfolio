/**
 * Simple component to render text with **bold** markdown syntax
 */
interface RichTextProps {
  children: string;
  className?: string;
}

export function RichText({ children, className = "" }: RichTextProps) {
  // Parse **bold** and ^accent^ syntax
  const parts = children.split(/(\*\*[^*]+\*\*|\^[^^]+\^)/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-bold text-[var(--foreground)]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("^") && part.endsWith("^")) {
          return (
            <span key={index} className="text-[var(--accent)] font-medium">
              {part.slice(1, -1)}
            </span>
          );
        }
        return part;
      })}
    </span>
  );
}
