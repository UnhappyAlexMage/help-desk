import type { User, UserRole } from "../../entities/model/types.ts";

export const fetchAllUsers = async (role?: UserRole): Promise<User[]> => {
    const url = role ? `/api/users?role=${role}` : '/api/users';
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    };
    
    const data = await response.json();
    return data;
};  