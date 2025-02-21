"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Clock, Tag } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { useRouter } from "next/navigation"

interface Slide {
  _id: Id<"slides">
  title: string
  description: string
  image: string
  badge: string
  color: string
  type: "product" | "sale" | "promotion" | "coming-soon"
  productId?: Id<"cakes">
  originalPrice?: number
  discountedPrice?: number
  price?: number
  validUntil?: string
  comingSoon?: boolean
}

export function PromotionalCarousel() {
  const slides = useQuery(api.slides.getSlides) || []
  const router = useRouter()

  const plugin = React.useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
    }),
  )

  const handleSlideAction = (slide: Slide) => {
    if (!slide.type) return

    switch (slide.type) {
      case "product":
        if (slide.productId) {
          router.push(`/cake/${slide.productId}`)
        }
        break
      case "sale":
        router.push("/categories/sale")
        break
      case "promotion":
        router.push("/categories/special")
        break
      case "coming-soon":
      default:
        // Do nothing for coming-soon or unknown types
        break
    }
  }

  if (slides.length === 0) {
    return <div className="w-full aspect-[2/1] bg-muted rounded-xl animate-pulse" />
  }

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full relative"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      dir="rtl"
      opts={{
        direction: "rtl",
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide._id}>
            <Card className="border-none">
              <CardContent className="p-0">
                <div
                  className="relative aspect-[2/1] overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => handleSlideAction(slide)}
                >
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority={slides.indexOf(slide) === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
                  <div className="absolute bottom-0 right-0 p-3 md:p-6 text-white text-right">
                    <div className="mb-2 md:mb-4">
                      <div
                        className={`inline-flex items-center gap-1 md:gap-2 rounded-full ${slide.color} p-1.5 md:p-2 px-3 md:px-4`}
                      >
                        {slide.badge === "تخفيض" ? <Tag className="h-3 w-3 md:h-4 md:w-4" /> : null}
                        <span className="text-xs md:text-sm font-medium">{slide.badge}</span>
                      </div>
                    </div>
                    <h1 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{slide.title}</h1>
                    <p className="text-xs md:text-sm text-gray-200 mb-2 md:mb-4 max-w-md line-clamp-2 md:line-clamp-none">
                      {slide.description}
                    </p>

                    {/* Price Display */}
                    {slide.discountedPrice ? (
                      <div className="mb-2 md:mb-4 space-y-0.5 md:space-y-1">
                        <p className="text-lg md:text-2xl font-bold text-white arabic-digits">
                          {new Intl.NumberFormat("ar-SA", {
                            style: "currency",
                            currency: "SAR",
                          }).format(slide.discountedPrice)}
                        </p>
                        {slide.originalPrice && (
                          <p className="text-xs md:text-sm text-gray-300 line-through arabic-digits">
                            {new Intl.NumberFormat("ar-SA", {
                              style: "currency",
                              currency: "SAR",
                            }).format(slide.originalPrice)}
                          </p>
                        )}
                      </div>
                    ) : slide.price ? (
                      <p className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-4 arabic-digits">
                        {new Intl.NumberFormat("ar-SA", {
                          style: "currency",
                          currency: "SAR",
                        }).format(slide.price)}
                      </p>
                    ) : null}

                    {/* Valid Until Display */}
                    {slide.validUntil && (
                      <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-300 mb-2 md:mb-4">
                        <Clock className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="arabic-digits">
                          العرض ساري حتى{" "}
                          {new Date(slide.validUntil).toLocaleDateString("ar-SA", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-xs md:text-sm h-8 md:h-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSlideAction(slide)
                      }}
                      disabled={slide.type === "coming-soon"}
                    >
                      {slide.type === "product"
                        ? "اطلب الآن"
                        : slide.type === "sale"
                          ? "تسوق العروض"
                          : slide.type === "coming-soon"
                            ? "قريباً"
                            : "اكتشف المزيد"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="absolute top-[20%] -translate-y-1/2 left-4 right-auto rotate-180 bg-background/80 backdrop-blur-sm h-8 w-8 md:h-10 md:w-10" />
    </Carousel>
  )
}

