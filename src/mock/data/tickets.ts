import type { Ticket } from "../../entities/model/types.ts";

export const tickets: Ticket[] = [
  {
    id: "ticket1",
    title: "Не включается монитор",
    description: "При нажатии на кнопку питания монитор не подаёт признаков жизни. Проверил кабель питания — всё подключено.",
    status: "new",
    priority: "high",
    category: "hardware",
    authorId: "user1", // Иван Петров
    assigneeId: undefined,
    createdAt: "2026-07-15T08:30:00Z",
    updatedAt: "2026-07-15T08:30:00Z",
    deadlineAt: "2026-07-17T18:00:00Z",
  },
  {
    id: "ticket2",
    title: "Нужен доступ к CRM-системе",
    description: "Устроился в отдел продаж, требуется доступ к CRM для работы с клиентами.",
    status: "in_progress",
    priority: "medium",
    category: "access",
    authorId: "user1", // Иван Петров
    assigneeId: "user2", // Мария Смирнова
    createdAt: "2026-07-14T10:15:00Z",
    updatedAt: "2026-07-16T09:00:00Z",
    deadlineAt: undefined,
  },
  {
    id: "ticket3",
    title: "Ошибка 500 при авторизации в почте",
    description: "Пытаюсь войти в корпоративную почту, вылетает внутренняя ошибка сервера. Скриншот приложил.",
    status: "waiting_for_user",
    priority: "critical",
    category: "software",
    authorId: "user1", // Иван Петров
    assigneeId: "user3", // Мария Смирнова
    createdAt: "2026-07-16T07:45:00Z",
    updatedAt: "2026-07-16T11:30:00Z",
    deadlineAt: "2026-07-16T20:00:00Z",
  },
  {
    id: "ticket4",
    title: "Пропал интернет в переговорной №3",
    description: "Во время созвона оборвалась связь. Wi-Fi сеть видна, но не подключается. Коллеги тоже не могут подключиться.",
    status: "new",
    priority: "high",
    category: "network",
    authorId: "user1", // Иван Петров
    assigneeId: undefined,
    createdAt: "2026-07-16T13:00:00Z",
    updatedAt: "2026-07-16T13:00:00Z",
    deadlineAt: undefined,
  },
  {
    id: "ticket5",
    title: "Замена клавиатуры",
    description: "Западают клавиши Enter и Backspace. Клавиатура старая, прошу заменить на новую.",
    status: "resolved",
    priority: "low",
    category: "hardware",
    authorId: "user1", // Иван Петров
    assigneeId: "user2", // Мария Смирнова
    createdAt: "2026-07-10T09:00:00Z",
    updatedAt: "2026-07-15T16:00:00Z",
    deadlineAt: undefined,
  },
  {
    id: "ticket6",
    title: "Не синхронизируется корпоративный календарь",
    description: "Добавляю встречу в телефоне, а в Outlook она не появляется. И наоборот.",
    status: "closed",
    priority: "medium",
    category: "software",
    authorId: "user1", // Иван Петров
    assigneeId: "user3", // Алексей Орлов
    createdAt: "2026-07-08T11:20:00Z",
    updatedAt: "2026-07-14T10:00:00Z",
    deadlineAt: "2026-07-12T18:00:00Z",
  },
];