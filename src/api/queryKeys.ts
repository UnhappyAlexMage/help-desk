export const queryKeys = {
    tickets: {
        all: ["tickets"] as const,
        detail: (ticketId: string) => ["tickets", ticketId] as const,
        commnets: (ticketId: string) => ["tickets", ticketId, "comments"] as const,
    },
    users: {
        all: ["users"] as const,
    },
};