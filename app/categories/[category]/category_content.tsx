"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { CakeCard } from "@/components/cake-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import { Toaster } from "sonner"
import { notFound } from "next/navigation"

interface CategoryContentProps {
  category: string
}

export function CategoryContent({ category }: CategoryContentProps) {
  const categories = useQuery(api.categories.getCategories) || []
  const cakes = useQuery(api.cakes.get) || []

  // Helper function to generate consistent slugs
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\u0621-\u064A]/g, (match) => {
        const arabicToEnglish: { [key: string]: string } = {
          أ: "a",
          ا: "a",
          إ: "a",
          آ: "a",
          ب: "b",
          ت: "t",
          ث: "th",
          ج: "j",
          ح: "h",
          خ: "kh",
          د: "d",
          ذ: "th",
          ر: "r",
          ز: "z",
          س: "s",
          ش: "sh",
          ص: "s",
          ض: "d",
          ط: "t",
          ظ: "z",
          ع: "a",
          غ: "gh",
          ف: "f",
          ق: "q",
          ك: "k",
          ل: "l",
          م: "m",
          ن: "n",
          ه: "h",
          و: "w",
          ي: "y",
          ى: "a",
          ئ: "e",
          ء: "e",
          ؤ: "o",
          ة: "h",
        }
        return arabicToEnglish[match] || match
      })
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")
  }

  const categoryData = categories.find((cat) => generateSlug(cat.name) === category)

  if (!categoryData) {
    notFound()
  }

  const filteredCakes = cakes.filter((cake) => generateSlug(cake.category) === category)

  return (
    <div className="min-h-screen bg-background pb-16">
      <Toaster />
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-4">
          <Link href="/categories">
            <Button variant="ghost" size="icon">
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-semibold">{categoryData.name}</h1>
        </div>
      </header>

      <main className="container py-4">
        {filteredCakes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">لا يوجد كيك في هذه الفئة</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filteredCakes.map((cake) => (
              <CakeCard key={cake._id} cake={cake} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

