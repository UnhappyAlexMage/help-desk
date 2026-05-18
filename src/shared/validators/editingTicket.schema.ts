import { z } from "zod";

export const editingTicketSchema = z.object({
    title: z
    .string()
    .min(5, "Минимум 5 символов")
    .max(100, "Максимум 100 символов"),

    description: z
    .string()
    .min(20, "Минимум 20 символов")
    .max(2000, "Максимум 2000 символов"),

    assigneeId: z
    .string()
    .optional()
    .or(z.literal(""))
    ,

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

    status: z.enum([
      "new",
      "in_progress",
      "waiting_for_user",
      "resolved",
      "closed"
    ], 
    {
      message: "Выберите пожалуйста статус!"
    }
  ),
  
  deadlineAt: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((value) => {
        if (!value) { return true; }

        return (
          new Date(value) > new Date()
        );
      },
      {
        message: "Дедлайн не может быть в прошлом",
      }
  ),
});

export type editingTicketFromData = z.infer<typeof editingTicketSchema>;