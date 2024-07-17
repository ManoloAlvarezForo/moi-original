import {useMemo, useReducer, useEffect} from 'react';
import {
  saveUserInformation,
  signOut,
  getStorageProperty,
  getUserId,
  getUserName,
} from '../helpers/localStorageHandler';

// TODO: refactor the types to typescript.
export function useAuth() {
  function createAction(type?: string, payload?: any) {
    return {
      type,
      payload,
    };
  }

  const initialState = {
    user: undefined,
    loading: true,
  };

  function reducer(state: any, action: any) {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: action.payload,
        };
      case 'REMOVE_USER':
        return {
          ...state,
          user: undefined,
        };
      case 'SET_LOADING':
        return {
          ...state,
          loading: action.payload,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const auth = useMemo(
    () => ({
      logout: async () => {
        await signOut();
        dispatch(createAction('REMOVE_USER'));
      },
      saveUser: (user: any, token: string) => {
        saveUserInformation(token, user);
        dispatch(createAction('SET_LOADING', false));
        dispatch(createAction('SET_USER', user.email));
      },
      getUserName: async () => {
        const userName = await getUserName();
        return userName;
      },
      getUserId: async () => {
        const userId = await getUserId();
        return userId;
      },
    }),
    [],
  );

  useEffect(() => {
    const getUserToken = async () => {
      const user = await getStorageProperty('@user_email');
      dispatch(createAction('SET_USER', user));
      dispatch(createAction('SET_LOADING', false));
    };
    getUserToken();
  }, []);

  return {state, auth};
}
