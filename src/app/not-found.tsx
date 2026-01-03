import Link from "next/link";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="font-[family-name:var(--font-playfair)] text-6xl font-bold mb-4">404</h1>
      <h2 className="text-xl font-medium mb-4">Page Not Found</h2>
      <p className="text-[var(--muted)] mb-8 max-w-md">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
