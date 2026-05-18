import { http, HttpResponse } from 'msw';
import { tickets } from '../data/tickets.ts';
import type { CreateTicketDto } from '../../entities/model/createTicketDto.ts';
import type { Ticket } from '../../entities/model/types.ts';

// GET /api/tickets — список всех заявок
export const handlerGetllTickets = http.get("/api/tickets", ({ request }) => {
    const url = new URL(request.url);

    const status = url.searchParams.get("status");
    const priority = url.searchParams.get("priority");
    const category = url.searchParams.get("category");
    const assigneeId = url.searchParams.get("assigneeId");

    const sort = url.searchParams.get("sort");
    const order = url.searchParams.get("order");

    const search = url.searchParams.get("search");

    let filteredTickets = [...tickets];

    if(status) {
        filteredTickets = filteredTickets.filter((ticket) => ticket.status === status);
    };
    if(priority) {
        filteredTickets = filteredTickets.filter((ticket) => ticket.priority === priority);
    };
    if(category) {
        filteredTickets = filteredTickets.filter((ticket) => ticket.category === category);
    };
    if(assigneeId) {
        filteredTickets = filteredTickets.filter((ticket) => ticket.assigneeId === assigneeId);
    };


    if(sort && order) {
        filteredTickets.sort((a,b) => {
            if(sort === "priority") {
                const priorityMap ={
                    low: 1,
                    medium: 2,
                    high: 3,
                    critical: 4
                };

                return order === "up" ? priorityMap[a.priority] - priorityMap[b.priority] : priorityMap[b.priority] - priorityMap[a.priority];
            };

            if(sort === "createdAt") {
                return order === "up" ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() 
                                        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            };

            if(sort === "deadlineAt") {
                return order === "up" ? new Date(a.deadlineAt ?? 0).getTime() - new Date(b.deadlineAt ?? 0).getTime() 
                                        : new Date(b.deadlineAt ?? 0).getTime() - new Date(a.deadlineAt ?? 0).getTime();
            }

            return 0;
        });
    };

    if(search) {
        const normSearch = search.toLowerCase();

        filteredTickets = filteredTickets.filter((ticket) => {
            return (
                ticket.title.toLowerCase().includes(normSearch) || ticket.description.toLowerCase().includes(normSearch)
            );
        });
    };

    return HttpResponse.json(filteredTickets, { status: 200 });
});

 // GET /api/tickets/:id — заявка по ID
export const handlerGetTicketsId = http.get("/api/tickets/:ticketId", ({ params }) => {
    const { ticketId } = params;
    const ticket = tickets.find((ticked) => ticked.id === ticketId);

    if(!ticket) {
        return HttpResponse.json( {message: "Ticket not Found in Mock" }, { status: 400 } );
    }
    return HttpResponse.json(ticket, { status: 200 } );
});

 // POST /api/tickets/ — создание новой заявки
export const handlerCreateTicket = http.post( "/api/tickets", async ({ request }) => {
    const body = (await request.json()) as CreateTicketDto;

    const newTicket: Ticket = {
        id: Math.random().toString(8),
        title: body.title ?? "",
        description: body.description ?? "",
        status: "new",
        priority: body.priority ?? "low",
        category: body.category ?? "",
        authorId: body.authorId ?? "",
        assigneeId: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deadlineAt: body.deadlineAt ?? "",
    };

    tickets.unshift(newTicket);

    return HttpResponse.json(
      newTicket, { status: 201 }
    );
  }
);

//PATCH /api/tickets/:ticketId — создание новой заявки
export const handlerUpdateTickets = http.patch("/api/tickets/:ticketId", async({ params, request }) => {
    const { ticketId } = params;

    const body = (await request.json()) as CreateTicketDto;

    const ticketIndex = tickets.findIndex((ticket) => ticket.id === ticketId);

    if(ticketIndex === -1) {
        return HttpResponse.json(
            { message: "Ticket not PATCH" }, 
            { status: 404 }
        );
    };

    const currentTicket = tickets[ticketIndex];

    const updatedTicket: Ticket = {
            ...currentTicket,
            ...body,
            updatedAt: new Date().toISOString(),
    };

    tickets[ticketIndex] = updatedTicket;

    return HttpResponse.json( updatedTicket, { status: 200 } )
});