export const queryKeys = {
    tickets: {
        all: ["tickets"] as const,
        detail: (ticketId: string | undefined) => ["tickets", ticketId] as const,
    },
    comments: {
        all: ["commnets"] as const,
        byTicket: (ticketId: string | undefined) => ["commnets", ticketId] as const,
    },
    users: {
        all: ["users"] as const,
    },
};