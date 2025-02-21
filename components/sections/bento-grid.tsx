"use client"
import { CakeIcon, HeartIcon, SparklesIcon, StarIcon } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative col-span-1 md:col-span-2 row-span-2 overflow-hidden rounded-3xl"
      >
        <Link href="/categories/featured">
          <div className="group relative h-[400px] w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80"
              alt="Featured cake"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">Handcrafted Delights</h1>
              <p className="text-sm text-gray-200 mb-4">Discover our signature collection</p>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <SparklesIcon className="w-4 h-4" />
                <span>Explore Now</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Categories Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative overflow-hidden rounded-3xl bg-primary/5 p-6"
      >
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-2">
            <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
              <CakeIcon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold">Categories</h3>
            <p className="text-sm text-muted-foreground">Browse our delicious selection</p>
          </div>
          <Link href="/categories">
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              View All Categories
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Best Sellers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative overflow-hidden rounded-3xl bg-secondary/5 p-6"
      >
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-2">
            <div className="bg-secondary/10 w-10 h-10 rounded-full flex items-center justify-center">
              <StarIcon className="w-5 h-5 text-secondary" />
            </div>
            <h3 className="font-semibold">Best Sellers</h3>
            <p className="text-sm text-muted-foreground">Our most popular cakes</p>
          </div>
          <Link href="/categories/popular">
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-secondary hover:underline">
              View Best Sellers
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Special Occasions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative overflow-hidden rounded-3xl bg-accent/5 p-6"
      >
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-2">
            <div className="bg-accent/10 w-10 h-10 rounded-full flex items-center justify-center">
              <HeartIcon className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-semibold">Special Occasions</h3>
            <p className="text-sm text-muted-foreground">Make your day memorable</p>
          </div>
          <Link href="/categories/special">
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
              View Occasions
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Custom Order */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative col-span-1 md:col-span-2 overflow-hidden rounded-3xl"
      >
        <Link href="/categories/custom">
          <div className="group relative h-[200px] w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80"
              alt="Custom cake"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h2 className="text-xl font-bold mb-2">Custom Orders</h2>
              <p className="text-sm text-gray-200">Create your dream cake</p>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  )
}

