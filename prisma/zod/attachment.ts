import * as z from "zod";
import { CompleteExpense, relatedExpenseSchema } from "./index";

export const attachmentSchema = z.object({
  id: z.number().int(),
  data: z.string(),
  expenseId: z.number().int(),
});

export interface CompleteAttachment extends z.infer<typeof attachmentSchema> {
  expense: CompleteExpense;
}

/**
 * relatedAttachmentSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedAttachmentSchema: z.ZodSchema<CompleteAttachment> = z.lazy(
  () =>
    attachmentSchema.extend({
      expense: relatedExpenseSchema,
    }),
);
