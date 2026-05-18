import type { User } from "../../entities/model/types.ts";

export const users: User[] = [
    {
        id: "user1",
        fullName: "Иван Петров",
        email: "ivan.petrov@company.com",
        role: "employee",
    },
    {
        id: "user2",
        fullName: "Мария Смирнова",
        email: "maria.smirnova@company.com",
        role: "support",
    },
    {
        id: "user3",
        fullName: "Алексей Орлов",
        email: "alexey.orlov@company.com",
        role: "admin",
    },
];