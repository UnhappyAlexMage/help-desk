import { z } from "zod";

export const createTicketSchema = z.object({
  title: z
  .string()
  .min(5, "Минимум 5 символов")
  .max(100, "Максимум 100 символов"),

  description: z
  .string()
  .min(20, "Минимум 20 символов")
  .max(2000, "Максимум 2000 символов"),

  category: z.enum([
      "hardware",
      "software",
      "network",
      "access",
      "other"
    ], 
    {
      message: "Выберите пожалуйста категорию!"
    }
  ),

    priority: z.enum([
      "low",
      "medium",
      "high",
      "critical"
    ], 
    {
      message: "Выберите пожалуйста приоритет!"
    }
  ),

  deadlineAt: z
    .string()
    .optional()
    .refine((value) => {
        if (!value) {
          return true;
        }

        return (
          new Date(value) >
          new Date()
        );
      },
      {
        message: "Дедлайн не может быть в прошлом",
      }
  ),
  authorId: z
    .string()
    .optional()
});

export type CreateTicketFormData = z.infer<typeof createTicketSchema>;