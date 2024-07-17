import {useEffect, useState} from 'react';
import {getUserId} from '../helpers/localStorageHandler';

const useLocalStorageHandler = () => {
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const tryGetUserId = async () => {
      const id: any = await getUserId();
      setUserId(id);
    };
    tryGetUserId();
  }, [userId]);

  return {
    userId,
  };
};

export default useLocalStorageHandler;
