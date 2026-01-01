import { RoomGrid } from "@/components/features/products";
import { PageHeader } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Favorite products I use daily, organized by room.",
};

export default function ProductsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <PageHeader
        title="Products"
        subtitle="A curated collection of products I love, organized by room. Click any icon to see details."
      />
      <RoomGrid />
    </div>
  );
}
