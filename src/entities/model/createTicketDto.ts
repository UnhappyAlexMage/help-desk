import type { TicketCategory, TicketPriority, TicketStatus } from "./types.ts";

export type CreateTicketDto = {
    id: string,
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    category: TicketCategory;
    authorId: string;
    assigneeId?: string;
    createdAt: string;
    updatedAt: string;
    deadlineAt?: string;
};