import { Link } from "react-router";

import { useUserRole } from "../hooks/useUserRole.ts";
import { useUser } from "../providers/RoleContext.tsx";

interface UserData {
    id: string;
    role: string;
    fullName: string;
};

interface HeaderProps {
    onUserChange?: (userData: UserData) => void;
};

export default function Header({ onUserChange } : HeaderProps) {
    const { currentUser, setCurrentUser } = useUser();
    const { data: users, isLoading, isError } = useUserRole();

    if (isLoading) { return <div>Загрузка пользователей... Нажмите Ctrl+R</div>};
    if (isError) { return <div>Ошибка при загрузке пользователей... Нажмите Ctrl+R</div> };

    return (
        <header className="bg-gray-300 border-t border-gray-600 " style={{ minHeight: '15vh' }}>
                <div className="flex justify-between items-center h-full m-8">
                    <Link to="/">
                        <h1 className="text-1 font-bold text-gray-900">
                            Help Desk
                        </h1>
                    </Link>
                    <div className="flex items-center">
                    <select 
                        className="block w-60 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 cursor-pointer"
                        value={currentUser?.id ?? ""}
                        onChange={(e) => { const selecredUser = users?.find((user) => user.id === e.target.value)
                            if(selecredUser) { 
                                setCurrentUser(selecredUser)

                                 if (onUserChange) {
                                    onUserChange({
                                        id: selecredUser.id,
                                        role: selecredUser.role,
                                        fullName: selecredUser.fullName
                                    });
                                }
                            }
                        }}
                    >
                        {users?.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.fullName}: {user.role}
                            </option>
                        ))}
                    </select>
                    </div>
                </div>
        </header>
    );
};
