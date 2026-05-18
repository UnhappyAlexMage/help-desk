import type { TicketStatus, TicketPriority, TicketCategory } from "./types";

export type TicketFilters = {
    status: TicketStatus | "";
    priority: TicketPriority | "";
    category: TicketCategory | "";
    assigneeId: string;
    search: string;
};

export type SortField = "createdAt" | "priority" | "deadlineAt";

export type SortOrder = "up" | "down" | null;

export type TicketSorting = {
    field: SortField | null;
    order: SortOrder;
};