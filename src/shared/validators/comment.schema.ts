import z from "zod";

export const commentSchema = z.object({
    text: z.string().min(2, "Минимум 2 символа").max(1000, "Максимум 1000 символов")
});

export type CommentFormData = z.infer<typeof commentSchema>;