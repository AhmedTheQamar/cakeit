"use client"

import * as React from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import useEmblaCarousel from "embla-carousel-react"
import AutoPlay from "embla-carousel-autoplay"

interface CarouselProps {
  items: {
    id: number
    image: string
    name: string
    price: number
  }[]
}

export function CarouselCards({ items }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [AutoPlay({ delay: 4000, stopOnInteraction: false })])

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {items.map((item) => (
            <div key={item.id} className="flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-4">
              <Link href={`/cake/${item.id}`}>
                <Card className="group relative overflow-hidden h-full transition-colors hover:border-primary/50">
                  <div className="relative aspect-[4/3]">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-semibold text-white text-base md:text-lg line-clamp-1">{item.name}</h3>
                        <p className="text-sm md:text-base text-white/90">${item.price}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm z-10",
          "hover:bg-background hover:text-primary",
        )}
        onClick={scrollPrev}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm z-10",
          "hover:bg-background hover:text-primary",
        )}
        onClick={scrollNext}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}

