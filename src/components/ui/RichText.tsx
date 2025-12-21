/**
 * Simple component to render text with **bold** markdown syntax
 */
interface RichTextProps {
  children: string;
  className?: string;
}

export function RichText({ children, className = "" }: RichTextProps) {
  // Parse **bold** syntax
  const parts = children.split(/(\*\*[^*]+\*\*)/g);

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
        return part;
      })}
    </span>
  );
}
