"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CakeCard } from "@/components/cake-card";

export function CakesSection({ title, showViewAll }: { title: string; showViewAll?: boolean }) {
  const cakes = useQuery(api.cakes.get);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-semibold text-primary">{title}</h2>
        {showViewAll && cakes && cakes.length > 0 && (
          <a href="/cakes" className="text-xs h-8 hover:text-primary hover:bg-primary/5">
            View all
          </a>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {cakes?.map((cake) => (
          <CakeCard key={cake._id} cake={cake} />
        )) || <p>Loading cakes...</p>}
      </div>
    </section>
  );
}
