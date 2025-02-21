"use client"

import { useState, useEffect } from "react"

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("up")
  const [lastScroll, setLastScroll] = useState(0)

  useEffect(() => {
    const threshold = 10
    let ticking = false

    const updateScrollDirection = () => {
      const scrollY = window.scrollY

      if (Math.abs(scrollY - lastScroll) < threshold) {
        ticking = false
        return
      }

      setScrollDirection(scrollY > lastScroll ? "down" : "up")
      setLastScroll(scrollY > 0 ? scrollY : 0)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [lastScroll])

  return scrollDirection
}

