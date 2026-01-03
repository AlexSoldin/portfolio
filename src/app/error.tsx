"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold mb-4">
        Something went wrong
      </h1>
      <p className="text-[var(--muted)] mb-8 max-w-md">
        An unexpected error occurred. Please try again or contact me if the problem persists.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
