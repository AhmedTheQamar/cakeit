import Link from "next/link"
import { CakeIcon, HomeIcon, SearchIcon } from "lucide-react"
import { CartCount } from "@/components/cart-count"

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="container flex items-center justify-around h-14">
        <Link href="/" className="flex flex-col items-center gap-1 text-primary">
          <HomeIcon className="h-5 w-5" />
          <span className="text-xs font-arabic">الرئيسية</span>
        </Link>
        <Link href="/categories" className="flex flex-col items-center gap-1 hover:text-primary transition-colors">
          <CakeIcon className="h-5 w-5" />
          <span className="text-xs font-arabic">الفئات</span>
        </Link>
        <Link href="/search" className="flex flex-col items-center gap-1 hover:text-primary transition-colors">
          <SearchIcon className="h-5 w-5" />
          <span className="text-xs font-arabic">البحث</span>
        </Link>
        <div className="flex flex-col items-center gap-1">
          <CartCount />
          <span className="text-xs font-arabic">السلة</span>
        </div>
      </div>
    </nav>
  )
}

