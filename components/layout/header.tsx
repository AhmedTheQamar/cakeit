import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CakeIcon, SearchIcon } from "lucide-react"
import { CartCount } from "@/components/cart-count"

export function Header() {
  return (
    <header className="hidden md:block sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
          <CakeIcon className="h-5 w-5" />
          <span className="hidden md:inline">Sweet Delights</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 ml-6">
          <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
            Categories
          </Link>
          <Link href="/cakes" className="text-sm font-medium hover:text-primary transition-colors">
            All Cakes
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="hover:text-primary">
            <SearchIcon className="h-5 w-5" />
          </Button>
          <CartCount />
        </div>
      </div>
    </header>
  )
}

