import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CakeCard } from "@/components/cake-card"
import type { Cake } from "@/lib/data"

interface CakesSectionProps {
  title: string
  cakes: Cake[]
  showViewAll?: boolean
}

export function CakesSection({ title, cakes, showViewAll }: CakesSectionProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-semibold text-primary">{title}</h2>
        {showViewAll && (
          <Link href="/cakes">
            <Button variant="ghost" className="text-xs h-8 hover:text-primary hover:bg-primary/5">
              View all
            </Button>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {cakes.map((cake) => (
          <CakeCard key={cake.id} cake={cake} />
        ))}
      </div>
    </section>
  )
}

