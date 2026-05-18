import { handleGetUserTickets, handlerGetUserId, handlerGetUser } from "./handlers/handlersUsers.ts";
import { handlerGetllTickets, handlerGetTicketsId, handlerCreateTicket, handlerUpdateTickets } from "./handlers/handlersTickets.ts";
import { handlerGetTickerIdComments, handlerPostTicketsIdComment } from "./handlers/handlersComments.ts";
import { handlerGetTicketsForHistory } from "./handlers/handelrsHistory.ts";

export const handlers = [
    handleGetUserTickets, handlerUpdateTickets, handlerCreateTicket, handlerGetUserId, handlerGetUser,
    handlerGetllTickets, handlerGetTicketsId,
    handlerGetTickerIdComments, handlerPostTicketsIdComment,
    handlerGetTicketsForHistory
];