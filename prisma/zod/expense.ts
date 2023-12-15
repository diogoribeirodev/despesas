import * as z from "zod"
import { CompleteAttachment, relatedAttachmentSchema, CompleteUser, relatedUserSchema } from "./index"

export const expenseSchema = z.object({
  id: z.number().int(),
  description: z.string().nullish(),
  value: z.number(),
  date: z.date(),
  note: z.string().nullish(),
  category: z.string().nullish(),
  paid: z.boolean(),
  paymentMethod: z.string().nullish(),
  userId: z.string(),
  public: z.boolean(),
})

export interface CompleteExpense extends z.infer<typeof expenseSchema> {
  attachments: CompleteAttachment[]
  user: CompleteUser
}

/**
 * relatedExpenseSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedExpenseSchema: z.ZodSchema<CompleteExpense> = z.lazy(() => expenseSchema.extend({
  attachments: relatedAttachmentSchema.array(),
  user: relatedUserSchema,
}))
