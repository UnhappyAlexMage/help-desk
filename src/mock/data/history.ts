export type TicketHistoryItem = {
  id: string;
  ticketId: string;
  changedBy: string;
  changedAt: string;
  field: "status" | "priority" | "assignee";
  oldValue?: string;
  newValue?: string;
};

export const history: TicketHistoryItem[] = [
    {
        id: "history1",
        ticketId: "ticket1",
        changedBy: "user2", // Мария Смирнова
        changedAt: "2026-07-15T09:00:00Z",
        field: "priority",
        oldValue: "medium",
        newValue: "high",
    },
    {
        id: "history2",
        ticketId: "ticket1",
        changedBy: "user2", // Мария Смирнова
        changedAt: "2026-07-15T09:00:00Z",
        field: "assignee",
        oldValue: undefined,
        newValue: "user-2",
    },
    {
        id: "history3",
        ticketId: "ticket2",
        changedBy: "user2", // Мария Смирнова
        changedAt: "2026-07-14T10:30:00Z",
        field: "status",
        oldValue: "new",
        newValue: "in_progress",
    },
    {
        id: "history4",
        ticketId: "ticket2",
        changedBy: "user2", // Мария Смирнова
        changedAt: "2026-07-14T10:30:00Z",
        field: "assignee",
        oldValue: undefined,
        newValue: "user-2",
    },
    {
        id: "history5",
        ticketId: "ticket6",
        changedBy: "user3", // Алексей Орлов
        changedAt: "2026-07-13T15:00:00Z",
        field: "status",
        oldValue: "in_progress",
        newValue: "resolved",
    },
    {
        id: "history6",
        ticketId: "ticket6",
        changedBy: "user3", // Алексей Орлов
        changedAt: "2026-07-14T10:00:00Z",
        field: "status",
        oldValue: "resolved",
        newValue: "closed",
    },
];