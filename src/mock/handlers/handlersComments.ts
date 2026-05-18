import { http, HttpResponse } from "msw";
import { comments } from "../data/comments.ts";

// GET /api/tickets/:id/comments
export const handlerGetTickerIdComments = http.get("/api/tickets/:id/comments", ({ params }) => {
    const ticketComments = comments.filter((c) => c.ticketId === params.id);
    return HttpResponse.json(ticketComments, { status: 200 });
});

// POST /api/tickets/:id/comment
export const handlerPostTicketsIdComment = http.post("/api/tickets/:id/comments", async ({ params, request }) => {
    const body = await request.json() as {
        id: string;
        authorId: string;
        text: string;
    };
    
    const newComment = {
        id: `comment-${Date.now()}`,
        ticketId: params.id as string,
        authorId: body.authorId,
        text: body.text,
        createdAt: new Date().toISOString(),
    };

    comments.push(newComment);
    return HttpResponse.json(newComment, { status: 201 });
});