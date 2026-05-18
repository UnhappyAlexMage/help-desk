import type { TicketStatus } from "../../entities/model/types";

const ticketStatusTransitions:
    Record<TicketStatus, TicketStatus[]> = {
    new: [ "in_progress" ],
    in_progress: [ "waiting_for_user", "resolved" ],
    waiting_for_user: [ "in_progress" ],
    resolved: [ "closed", "in_progress" ],
    closed: [],
};

export function canChangeTicketStatus( currentStatus: TicketStatus, nextStatus: TicketStatus): boolean {
    return ticketStatusTransitions[ currentStatus ].includes(nextStatus);
};

export function getAvailableStatuses( currentStatus: TicketStatus): TicketStatus[] {
    return [
        currentStatus,
        ...ticketStatusTransitions[ currentStatus ],
    ];;
};