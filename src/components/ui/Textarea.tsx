import { forwardRef } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div>
        <label htmlFor={props.id} className="block text-sm font-medium mb-2">
          {label}
        </label>
        <textarea
          ref={ref}
          className={`w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all resize-none ${className} ${
            error ? "border-red-500" : ""
          }`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
