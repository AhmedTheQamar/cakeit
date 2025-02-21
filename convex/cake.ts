import { query } from "./_generated/server"
import type { Id } from "./_generated/dataModel"

export const getCakeById = query(async ({ db }, args: { id: Id<"cakes"> }) => {
  // Optional: Add validation if needed
  if (!args.id) {
    throw new Error("Invalid id provided")
  }

  const cake = await db.get(args.id)
  if (!cake) {
    throw new Error("Cake not found")
  }

  return cake
})

