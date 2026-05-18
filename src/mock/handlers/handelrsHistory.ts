import { http, HttpResponse } from "msw";
import { history } from "../data/history.ts";

// GET /api/tickets/:id/history
export const handlerGetTicketsForHistory = http.get("/api/tickets/:id/history", ({ params }) => {
    const ticketHistory = history.filter((h) => h.ticketId === params.id).sort((a, b) => new Date(a.changedAt).getTime() - new Date(b.changedAt).getTime());

    return HttpResponse.json(ticketHistory, { status: 200 });
});
