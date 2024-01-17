import { z } from "zod";
import { attachmentSchema, expenseSchema } from "../../../../prisma/zod";

export const insertExpenseSchema = expenseSchema.omit({
  id: true,
  userId: true,
});

export const insertAttachmentSchema = attachmentSchema.omit({
  id: true,
  expenseId: true,
});

export const insertExpenseParams = insertExpenseSchema.extend({
  value: z
    .number({
      required_error: "Value is required",
      invalid_type_error: "Value has to be a number.",
    })
    .positive({ message: "Paid amount has to be positive." }),
  date: z.coerce.date(),
  note: z
    .string()
    .min(3, { message: "Note too short." })
    .max(100, { message: "Note too long." })
    .optional(),
  description: z
    .string()
    .min(3, { message: "Description too short." })
    .max(100, { message: "Description too long." })
    .optional(),
  category: z
    .string()
    .min(3, { message: "Category too short." })
    .max(20, { message: "Category too long." })
    .optional(),
  attachments: insertAttachmentSchema.optional(),
  paid: z.boolean(),
  paymentMethod: z
    .string()
    .max(20, { message: "Payment method too long." })
    .optional(),
  public: z.boolean().default(false).optional(),
});

export const expenseIdSchema = z
  .number({
    required_error: "Expense ID is required",
    invalid_type_error: "Expense ID has to be a number.",
  })
  .positive({ message: "Expense ID has to be a positive number." });

export type Expense = z.infer<typeof expenseSchema>;
export type NewExpense = z.infer<typeof insertExpenseSchema>;
export type NewExpenseParams = z.infer<typeof insertExpenseParams>;
export type ExpenseId = z.infer<typeof expenseIdSchema>;
