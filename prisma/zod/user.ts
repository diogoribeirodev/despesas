import * as z from "zod"
import { CompleteExpense, relatedExpenseSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  despesas: CompleteExpense[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  despesas: relatedExpenseSchema.array(),
}))
