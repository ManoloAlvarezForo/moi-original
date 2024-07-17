import {useCallback, useEffect, useMemo, useState} from 'react';
import {useApolloClient, useQuery} from '@apollo/client';
import {GET_USER} from '../screens/Reports/gqlQueries';
import {
  BIBLE_STUDY_STATUS_TYPE,
  BibleStudyType,
  REVISIT_STATUS_TYPE,
  RevisitType,
  ServiceType,
  UserType,
} from '../types/user';
import useNotifee, {EVENT_REMINDER_TYPE} from './useNotifee';

export function useOfflineUser() {
  const {cache} = useApolloClient();
  const [user, setUser] = useState<UserType>();
  const [forceUpdate, setForceUpdate] = useState(false);
  const {onCreateTriggerNotification, buildRevisitNotificationMessage} =
    useNotifee();

  const {
    loading: userLoading,
    error: userError,
    data: dataUser,
  } = useQuery(GET_USER, {
    fetchPolicy: 'cache-only',
  });

  useEffect(() => {
    if (dataUser && !userLoading && !userError) {
      setUser(dataUser.user || undefined);
    }
  }, [dataUser, userError, userLoading]);

  const updateUserCache = useCallback(
    (userToUpdate: any) => {
      cache.updateQuery(
        {
          query: GET_USER,
        },
        () => ({
          user: userToUpdate,
        }),
      );
    },
    [cache],
  );

  const toggleForceUpdate = () => {
    console.log('toggleForceUpdate called');
    setForceUpdate(prevForceUpdate => !prevForceUpdate);
  };

  // TODO: refactor this method in the missing.
  const getCurrentUser = useCallback(() => {
    const data: any = cache.readQuery({query: GET_USER});
    const currentUser = data?.user;

    return currentUser;
  }, [cache]);

  const addUser = useCallback(
    (name: string, service: ServiceType | '', gender: string) => {
      const userNameFormatted = name.replace(' ', '.');
      const newUserToAdd: UserType = {
        name,
        email: `offline-user-${userNameFormatted}@offline.com`,
        id: `local.user.${userNameFormatted}`,
        token: `local-user-${userNameFormatted}`,
        bibleStudies: [],
        revisits: [],
        serviceType: service,
        gender,
        __typename: 'User',
      };

      cache.writeQuery({
        query: GET_USER,
        data: {
          user: newUserToAdd,
        },
      });
    },
    [cache],
  );

  const addBibleStudy = useCallback(
    (newBibleStudy: BibleStudyType) => {
      const data: any = cache.readQuery({query: GET_USER});
      const currentUser = data?.user;
      const newUser = {
        ...currentUser,
        bibleStudies: [...currentUser.bibleStudies, newBibleStudy],
      };
      updateUserCache(newUser);
    },
    [cache, updateUserCache],
  );

  const deleteBibleStudy = useCallback(
    (bibleStudyToBeRemoved: any) => {
      const data: any = cache.readQuery({query: GET_USER});
      const currentUser = data?.user;
      const bibleStudies = currentUser.bibleStudies.filter(
        (r: any) => r.id !== bibleStudyToBeRemoved.id,
      );
      const newUser = {
        ...currentUser,
        bibleStudies,
      };

      updateUserCache(newUser);
    },
    [cache, updateUserCache],
  );

  const updateBibleStudy = useCallback(
    (bibleStudyToBeUpdated: any) => {
      const data: any = cache.readQuery({query: GET_USER});
      const currentUser = data?.user;
      const foundBibleStudy = currentUser.revisits.find(
        (r: any) => r.id === bibleStudyToBeUpdated.id,
      );
      const filteredBibleStudies = currentUser.revisits.filter(
        (r: any) => r.id !== foundBibleStudy.id,
      );

      const newBibleStudy = {...foundBibleStudy, ...bibleStudyToBeUpdated};
      const newBibleStudies = [...filteredBibleStudies, newBibleStudy];
      const newUser = {
        ...currentUser,
        bibleStudies: newBibleStudies,
      };

      updateUserCache(newUser);
    },
    [cache, updateUserCache],
  );

  const getBibleStudyById = useCallback(
    (revisitId: string) => {
      const data: any = cache.readQuery({query: GET_USER});
      const currentUser = data?.user;
      const foundBibleStudy = currentUser.bibleStudies.find(
        (r: any) => r.id === revisitId,
      );

      return foundBibleStudy;
    },
    [cache],
  );

  const getUserBibleStudies = useCallback(() => {
    const data: any = cache.readQuery({query: GET_USER});
    const currentUser = data?.user;

    return currentUser?.bibleStudies;
  }, [cache]);

  const getAvailableUserBibleStudies = useCallback(() => {
    const userBibleStudies = getUserBibleStudies();

    return userBibleStudies.filter(
      (r: any) => r.status === BIBLE_STUDY_STATUS_TYPE.ACTIVE,
    );
  }, [getUserBibleStudies]);

  const addRevisit = useCallback(
    (revisitToBeAdded: RevisitType) => {
      const newRevisit = {id: Date.now(), ...revisitToBeAdded};
      const currentUser = getCurrentUser();
      const newRevisits = [...currentUser.revisits, newRevisit];

      const newUser = {
        ...currentUser,
        revisits: newRevisits,
      };

      updateUserCache(newUser);
      const eventReminders: EVENT_REMINDER_TYPE[] = [
        EVENT_REMINDER_TYPE.FIFTEEN_MINUTES_BEFORE,
      ];

      const message = buildRevisitNotificationMessage(
        newRevisit,
        eventReminders,
      );

      onCreateTriggerNotification(message);
    },
    [
      buildRevisitNotificationMessage,
      getCurrentUser,
      onCreateTriggerNotification,
      updateUserCache,
    ],
  );

  const deleteRevisit = useCallback(
    (revisitToBeRemoved: any) => {
      const data: any = cache.readQuery({query: GET_USER});
      const currentUser = data?.user;
      const revisits = currentUser.revisits.filter(
        (r: any) => r.id !== revisitToBeRemoved.id,
      );
      const newUser = {
        ...currentUser,
        revisits,
      };

      updateUserCache(newUser);
    },
    [cache, updateUserCache],
  );

  const updateRevisit = useCallback(
    (revisitToBeUpdated: any) => {
      const data: any = cache.readQuery({query: GET_USER});
      const currentUser = data?.user;
      const foundRevisit = currentUser.revisits.find(
        (r: any) => r.id === revisitToBeUpdated.id,
      );
      const filteredRevisits = currentUser.revisits.filter(
        (r: any) => r.id !== foundRevisit.id,
      );

      const newRevisit = {...foundRevisit, ...revisitToBeUpdated};
      const newRevisits = [...filteredRevisits, newRevisit];
      const newUser = {
        ...currentUser,
        revisits: newRevisits,
      };

      updateUserCache(newUser);
    },
    [cache, updateUserCache],
  );

  const getRevisitById = useCallback(
    (revisitId: string) => {
      const data: any = cache.readQuery({query: GET_USER});
      const currentUser = data?.user;
      const foundRevisit = currentUser.revisits.find(
        (r: any) => r.id === revisitId,
      );

      return foundRevisit;
    },
    [cache],
  );

  const getUserRevisits = useCallback(() => {
    const data: any = cache.readQuery({query: GET_USER});
    const currentUser = data?.user;

    return currentUser?.revisits;
  }, [cache]);

  const getAvailableUserRevisits = useCallback(() => {
    const userRevisits = getUserRevisits();

    return userRevisits.filter(
      (r: any) => r.status === REVISIT_STATUS_TYPE.PENDING,
    );
  }, [getUserRevisits]);

  const updateRevisitStatus = useCallback(
    (revisitId: string, status: string) => {
      const userRevisits = getUserRevisits();
      const foundRevisit = userRevisits.find((r: any) => r.id === revisitId);
      const newRevisit = {...foundRevisit, status};
      updateRevisit(newRevisit);
    },
    [getUserRevisits, updateRevisit],
  );

  const userBibleStudies = useMemo(() => {
    const data: any = cache.readQuery({query: GET_USER});
    return data?.user?.bibleStudies;
  }, [cache]);

  const userName = useMemo(() => {
    const data: any = cache.readQuery({query: GET_USER});
    return data?.user?.name;
  }, [cache]);

  const userId = useMemo(() => {
    const data: any = cache.readQuery({query: GET_USER});
    return data?.user?.id;
  }, [cache]);

  return {
    addUser,
    user,
    userName,
    userId,
    userBibleStudies,
    addBibleStudy,
    deleteBibleStudy,
    updateBibleStudy,
    getBibleStudyById,
    getAvailableUserBibleStudies,
    addRevisit,
    deleteRevisit,
    getRevisitById,
    updateRevisit,
    getAvailableUserRevisits,
    updateRevisitStatus,
    getCurrentUser,
    forceUpdate,
    toggleForceUpdate,
  };
}
