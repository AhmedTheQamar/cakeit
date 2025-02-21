"use client"

import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    id: number
    image: string
    name: string
    price: number
  }[]
  direction?: "left" | "left"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)
  const [start, setStart] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    addAnimation()
  }, [])

  const speeds = {
    fast: 40,
    normal: 50,
    slow: 70,
  }

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      setStart(true)
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards")
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse")
      }
    }
  }

  const handleDragStart = () => {
    if (containerRef.current) {
      setIsDragging(true)
      containerRef.current.style.setProperty("animation-play-state", "paused")
    }
  }

  const handleDragEnd = () => {
    if (containerRef.current) {
      setIsDragging(false)
      containerRef.current.style.setProperty("animation-play-state", "running")
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn("scroller relative z-20 max-w-7xl overflow-hidden cursor-grab active:cursor-grabbing", className)}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-2 w-max flex-nowrap",
          start && !isDragging && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={
          {
            "--animation-duration": `${speeds[speed]}s`,
          } as React.CSSProperties
        }
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="w-[250px] max-w-full relative rounded-2xl border border-primary/10 flex-shrink-0 md:w-[400px] transition-colors hover:border-primary/50"
          >
            <Link href={`/cake/${item.id}`} className="block">
              <div className="relative h-40 md:h-60 group">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="h-full w-full object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-semibold text-white text-base md:text-lg line-clamp-1">{item.name}</h3>
                    <p className="text-sm md:text-base text-white/90">${item.price}</p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

