"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { CakeIcon, HeartIcon, SparklesIcon, StarIcon } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"

const slides = [
  {
    id: 1,
    title: "Handcrafted Delights",
    description: "Discover our signature collection of artisanal cakes",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80",
    link: "/categories/featured",
    icon: <SparklesIcon className="w-5 h-5" />,
    color: "bg-primary text-primary-foreground",
  },
  {
    id: 2,
    title: "Wedding Specials",
    description: "Make your special day even more memorable",
    image: "https://images.unsplash.com/photo-1560180474-e8563fd75bab?w=800&q=80",
    link: "/categories/wedding",
    icon: <HeartIcon className="w-5 h-5" />,
    color: "bg-secondary text-secondary-foreground",
  },
  {
    id: 3,
    title: "Birthday Favorites",
    description: "Celebrate with our delicious birthday cakes",
    image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&q=80",
    link: "/categories/birthday",
    icon: <CakeIcon className="w-5 h-5" />,
    color: "bg-accent text-accent-foreground",
  },
  {
    id: 4,
    title: "Best Sellers",
    description: "Our most loved and popular creations",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    link: "/categories/popular",
    icon: <StarIcon className="w-5 h-5" />,
    color: "bg-primary text-primary-foreground",
  },
]

export function HeroCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <Link href={slide.link}>
              <Card className="border-none">
                <CardContent className="p-0">
                  <div className="relative aspect-[2/1] overflow-hidden rounded-xl">
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      priority={slide.id === 1}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <div className="mb-4">
                        <div className={`inline-flex items-center gap-2 rounded-full ${slide.color} p-2 px-4`}>
                          {slide.icon}
                          <span className="text-sm font-medium">Featured</span>
                        </div>
                      </div>
                      <h1 className="text-3xl font-bold mb-2">{slide.title}</h1>
                      <p className="text-sm text-gray-200 mb-4 max-w-md">{slide.description}</p>
                      <Button variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white">
                        Explore Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  )
}

