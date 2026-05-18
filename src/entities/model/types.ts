export type UserRole = "admin" | "support" | "employee";

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
};

export type TicketStatus = "new" | "in_progress" | "waiting_for_user" | "resolved" | "closed";

export type TicketPriority = "low" | "medium" | "high" | "critical";

export type TicketCategory = "hardware" | "software" | "network" | "access" | "other";

export type Ticket = {
  id: string;
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

export type TicketComment = {
  id: string;
  ticketId: string;
  authorId: string;
  text: string;
  createdAt: string;
};

export type TicketHistoryItem = {
  id: string;
  ticketId: string;
  changedBy: string;
  changedAt: string;
  field: "status" | "priority" | "assignee";
  oldValue?: string;
  newValue?: string;
};
