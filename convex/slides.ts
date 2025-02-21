import { query, mutation } from "./_generated/server"

export const getSlides = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("slides").collect()
  },
})

export const seedSlides = mutation({
  args: {},
  handler: async (ctx) => {
    // Example product slide
    const cakes = await ctx.db.query("cakes").collect()
    const firstCakeId = cakes[0]?._id

    await ctx.db.insert("slides", {
      title: "كعكة الفستق الجديدة",
      description: "جربوا كعكة الفستق بالزعفران - وصفة خاصة",
      image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80",
      badge: "جديد",
      color: "bg-emerald-500",
      type: "product",
      productId: firstCakeId, // Only add if you have a cake
      price: 159,
    })

    // Example sale slide
    await ctx.db.insert("slides", {
      title: "عرض خاص ٥٠٪",
      description: "خصم على جميع كعكات الشوكولاتة لفترة محدودة",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
      badge: "تخفيض",
      color: "bg-red-500",
      type: "sale",
      originalPrice: 199,
      discountedPrice: 99.5,
      validUntil: "2024-03-01",
    })

    // Example promotion slide
    await ctx.db.insert("slides", {
      title: "عروض نهاية الأسبوع",
      description: "خصومات حصرية على مجموعة مختارة",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80",
      badge: "عرض خاص",
      color: "bg-blue-500",
      type: "promotion",
    })

    // Example coming soon slide
    await ctx.db.insert("slides", {
      title: "تشكيلة العيد",
      description: "كعكات مميزة للاحتفال بالعيد مع العائلة",
      image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&q=80",
      badge: "قريباً",
      color: "bg-amber-500",
      type: "coming-soon",
      comingSoon: true,
    })

    return "Successfully seeded slides data"
  },
})

