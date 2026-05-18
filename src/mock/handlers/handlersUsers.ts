import { http, HttpResponse } from 'msw';
import { users } from '../data/users.ts';
import { tickets } from '../data/tickets.ts';

 // GET /api/users — список всех пользователей
export const handlerGetUser = http.get("/api/users", () => {
    console.log('MSW перехватил запрос /api/users');
    return HttpResponse.json(users, { status: 200 });
});

// GET /api/users/:userId — получить конкретного пользователя
export const handlerGetUserId = http.get("/api/users/:id", ({ params }) => {
    const user = users.find((u) => u.id === params.id);

    if (!user) {
    return HttpResponse.json({ message: "User not found" }, { status: 404 });
    };

    return HttpResponse.json(user, { status: 200 });
});

// GET /api/users/:userId/tickets — заявки конкретного пользователя
export const handleGetUserTickets = http.get("/api/users/:userId/tickets", ({ params }) => {
    const userTickets = tickets.filter((t) => t.authorId === params.userId);
    return HttpResponse.json(userTickets, { status: 200 });
});