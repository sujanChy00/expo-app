import { useContext } from 'react';

import { AuthContext } from '@/providers/auth-provider';
import { IProfile } from '@/types/IProfile';

export const useUser = () => {
  const { user, setUser: set } = useContext(AuthContext);

  const setUser = (user: IProfile | null) => {
    set(user);
  };

  return { user, setUser };
};
