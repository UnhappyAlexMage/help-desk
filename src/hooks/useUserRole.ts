import { useQuery } from '@tanstack/react-query';

import { fetchAllUsers } from '../api/usersApi/fetchAllUsers.ts';
import type { User } from '../entities/model/types.ts';
import { useUser } from '../providers/RoleContext.tsx';

export const useUserRole = () => {
    const { currentUser } = useUser();

    console.log(`useUserRole: текущая роль "${currentUser}"`);

    return useQuery<User[], Error>({
      queryKey: ["users"],
      queryFn: () => fetchAllUsers(),
      staleTime: 5 * 60 * 1000,
      retry: 3,
    });
};