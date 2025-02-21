import { query, mutation } from "./_generated/server"

// Existing query
export const getCategories = query(async ({ db }) => {
  return await db.query("categories").collect()
})

// Seed mutation
export const seedCategories = mutation({
  args: {},
  handler: async (ctx) => {
    const categories = [
      {
        name: "أعياد الميلاد",
        icon: "🎂",
        description: "مثالي للمناسبات الخاصة",
        image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&q=80",
      },
      {
        name: "زفاف",
        icon: "💒",
        description: "كيك احتفالات أنيق",
        image: "https://images.unsplash.com/photo-1560180474-e8563fd75bab?w=800&q=80",
      },
      {
        name: "كب كيك",
        icon: "🧁",
        description: "حلويات فردية",
        image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80",
      },
      {
        name: "تخصيص",
        icon: "✨",
        description: "صنع حسب الطلب",
        image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80",
      },
      {
        name: "موسمي",
        icon: "🍁",
        description: "عروض لفترة محدودة",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
      },
      {
        name: "نباتي",
        icon: "🌱",
        description: "خيارات نباتية",
        image: "https://images.unsplash.com/photo-1557308536-ee471ef2c390?w=800&q=80",
      },
      {
        name: "خالي من الغلوتين",
        icon: "🌾",
        description: "بدائل القمح",
        image: "https://images.unsplash.com/photo-1612809076141-6b779101d44d?w=800&q=80",
      },
      {
        name: "أطفال",
        icon: "🎈",
        description: "تصاميم ممتعة",
        image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80",
      },
    ]

    // Clear existing data (optional)
    const existing = await ctx.db.query("categories").collect()
    for (const category of existing) {
      await ctx.db.delete(category._id)
    }

    // Insert new data
    for (const category of categories) {
      await ctx.db.insert("categories", category)
    }

    return "Successfully seeded categories data"
  },
})

