import type { TicketComment } from "../../entities/model/types";

export const comments: TicketComment[] = [
    {
        id: "comment1",
        ticketId: "ticket2",
        authorId: "user2", // Мария Смирнова
        text: "Иван, уточните пожалуйста, доступ к какому именно разделу CRM нужен? Продажи, аналитика или полный?",
        createdAt: "2026-07-14T11:00:00Z",
    },
    {
        id: "comment2",
        ticketId: "ticket2",
        authorId: "user1", // Иван Петров
        text: "Только к разделу продаж для начала",
        createdAt: "2026-07-14T12:30:00Z",
    },
    {
        id: "comment3",
        ticketId: "ticket2",
        authorId: "user2", // Мария Смирнова
        text: "Поняла, создаю заявку в отдел ИБ, обычно это занимает до 24 часов",
        createdAt: "2026-07-14T13:00:00Z",
    },
    {
        id: "comment4",
        ticketId: "ticket3",
        authorId: "user2", // Мария Смирнова
        text: "Проверила логи сервера — проблема на стороне почтового сервиса. Нужна дополнительная информация: вы пытались зайти через браузер или почтовый клиент?",
        createdAt: "2026-07-16T10:00:00Z",
    },
    {
        id: "comment5",
        ticketId: "ticket5",
        authorId: "user2", // Мария Смирнова
        text: "Новая клавиатура заказана, ожидайте доставку на склад в течение 3 рабочих дней",
        createdAt: "2026-07-12T14:00:00Z",
    },
    {
        id: "comment6",
        ticketId: "ticket6",
        authorId: "user3", // Алексей Орлов
        text: "Проблема была в настройках синхронизации Exchange. Сбросил кеш, переподключил аккаунт — всё работает.",
        createdAt: "2026-07-13T16:00:00Z",
    },
];