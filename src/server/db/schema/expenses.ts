import { z } from "zod";
import { attachmentSchema, expenseSchema } from "../../../../prisma/zod";

export const insertExpenseSchema = expenseSchema.omit({
  id: true,
  userId: true,
});

export const insertExpenseParams = insertExpenseSchema.extend({
  value: z.number().positive({ message: "Paid amount has to be positive." }),
  date: z.date().max(new Date(), { message: "Date cannot be in the future." }),
  note: z.string().max(100, { message: "Note too long." }).optional(),
  description: z
    .string()
    .max(100, { message: "Description too long." })
    .optional(),
  category: z.string().max(20, { message: "Category too long." }).optional(),
  attachments: z
    .array(attachmentSchema)
    .max(5, {
      message: "Too many attachments.",
    })
    .optional(),
  paid: z.boolean(),
  paymentMethod: z
    .string()
    .max(20, { message: "Payment method too long." })
    .optional(),
  public: z.boolean().default(false).optional(),
});

export const expenseIdSchema = expenseSchema.pick({ id: true });

export type Expense = z.infer<typeof expenseSchema>;
export type NewExpense = z.infer<typeof insertExpenseSchema>;
export type NewExpenseParams = z.infer<typeof insertExpenseParams>;
export type ExpenseId = z.infer<typeof expenseIdSchema>["id"];
