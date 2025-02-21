export type Cake = {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
}

export const cakes: Cake[] = [
  {
    id: 1,
    name: "Chocolate Dream",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    category: "Birthday",
    description: "Rich chocolate layers with creamy frosting",
  },
  {
    id: 2,
    name: "Vanilla Bliss",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80",
    category: "Wedding",
    description: "Classic vanilla cake with buttercream",
  },
  {
    id: 3,
    name: "Strawberry Delight",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1611293388250-580b08c4a145?w=800&q=80",
    category: "Birthday",
    description: "Fresh strawberry cake with cream cheese frosting",
  },
  {
    id: 4,
    name: "Red Velvet",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=800&q=80",
    category: "Birthday",
    description: "Traditional red velvet with cream cheese frosting",
  },
  {
    id: 5,
    name: "Carrot Cake",
    price: 38.99,
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80",
    category: "Custom",
    description: "Spiced carrot cake with walnuts",
  },
  {
    id: 6,
    name: "Lemon Drizzle",
    price: 36.99,
    image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80",
    category: "Cupcakes",
    description: "Zesty lemon cake with citrus glaze",
  },
  {
    id: 7,
    name: "Wedding Elegance",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1560180474-e8563fd75bab?w=800&q=80",
    category: "Wedding",
    description: "Three-tier elegant wedding cake",
  },
  {
    id: 8,
    name: "Birthday Funfetti",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&q=80",
    category: "Birthday",
    description: "Colorful sprinkle cake with vanilla frosting",
  },
]

export const categories = [
  { name: "Birthday", icon: "🎂", href: "/categories/birthday", description: "Perfect for special days" },
  { name: "Wedding", icon: "💒", href: "/categories/wedding", description: "Elegant celebration cakes" },
  { name: "Cupcakes", icon: "🧁", href: "/categories/cupcakes", description: "Individual treats" },
  { name: "Custom", icon: "✨", href: "/categories/custom", description: "Made to order" },
  { name: "Seasonal", icon: "🍁", href: "/categories/seasonal", description: "Limited time specials" },
  { name: "Vegan", icon: "🌱", href: "/categories/vegan", description: "Plant-based options" },
  { name: "Gluten-Free", icon: "🌾", href: "/categories/gluten-free", description: "Wheat alternatives" },
  { name: "Kids", icon: "🎈", href: "/categories/kids", description: "Fun designs" },
]

