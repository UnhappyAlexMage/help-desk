import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../entities/model/types.ts";

type UserContextValue = {
    currentUser: User,
    setCurrentUser: (user: User) => void;
};

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User>({
        id: "user1",
        fullName: "Иван Петров",
        email: "ivan.petrov@company.com",
        role: "employee",
    });

    return(
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const contextUser = useContext(UserContext);

    if(!contextUser) {
        throw new Error("useUser must be used wethin UserContext");
    };

    return contextUser;
};