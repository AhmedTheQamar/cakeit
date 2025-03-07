import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

// Existing query
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("cakes").collect()
  },
})

// Seed mutation
export const seedCakes = mutation({
  args: {},
  handler: async (ctx) => {
    const cakes = [
      {
        name: "دريم الشوكولاتة",
        price: 187.46,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
        category: "أعياد الميلاد",
        description: "طبقات الشوكولاتة الغنية مع كريمة ناعمة"
      },
      {
        name: "نعيم الفانيليا",
        price: 168.71,
        image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80",
        category: "زفاف",
        description: "كيك الفانيليا الكلاسيكي مع كريمة الزبدة"
      },
      {
        name: "بهجة الفراولة",
        price: 149.96,
        image: "https://images.unsplash.com/photo-1611293388250-580b08c4a145?w=800&q=80",
        category: "أعياد الميلاد",
        description: "كيك الفراولة الطازجة مع كريمة الجبن"
      },
      {
        name: "الريد فلفيت",
        price: 161.21,
        image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=800&q=80",
        category: "أعياد الميلاد",
        description: "ريد فلفيت تقليدي مع كريمة الجبن"
      },
      {
        name: "كيك الجزر",
        price: 146.21,
        image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80",
        category: "تخصيص",
        description: "كيك الجزر المتبل مع الجوز"
      },
      {
        name: "كيك الليمون",
        price: 138.71,
        image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80",
        category: "كب كيك",
        description: "كيك الليمون المنعش مع صوص الحمضيات"
      },
      {
        name: "أناقة الزفاف",
        price: 1124.96,
        image: "https://images.unsplash.com/photo-1560180474-e8563fd75bab?w=800&q=80",
        category: "زفاف",
        description: "كيك زفاف أنيق من ثلاث طبقات"
      },
      {
        name: "فنفيتي عيد الميلاد",
        price: 172.46,
        image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&q=80",
        category: "أعياد الميلاد",
        description: "كيك ملون بالرش مع كريمة الفانيليا"
      }
    ]

    // Clear existing data (optional)
    const existing = await ctx.db.query("cakes").collect()
    for (const cake of existing) {
      await ctx.db.delete(cake._id)
    }

    // Insert new data
    for (const cake of cakes) {
      await ctx.db.insert("cakes", cake)
    }

    return "Successfully seeded cakes data"
  },
})
