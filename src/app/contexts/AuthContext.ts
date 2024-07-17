import {createContext} from 'react';
import {UserType} from '../helpers/localStorageHandler';

type AuthContextParams = {
  saveUser: (user: UserType, token: string) => void;
  logout: () => void;
};

const defaultValues = {
  saveUser: (
    _user: UserType = {
      name: '',
      id: '',
      email: '',
    },
    _token: string = '',
  ) => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextParams>(defaultValues);
