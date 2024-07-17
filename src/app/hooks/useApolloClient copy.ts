import {useEffect, useState} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  defaultDataIdFromObject,
} from '@apollo/client';
import {AsyncStorageWrapper, CachePersistor} from 'apollo3-cache-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {persistenceMapper, createPersistLink} from '../utils/persistance';

export const useApolloClient = () => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [, setPersistor] = useState<CachePersistor<NormalizedCacheObject>>();
  // const clearCache = useCallback(() => {
  //   if (!persistor) {
  //     return;
  //   }
  //   persistor.purge();
  // }, [persistor]);

  useEffect(() => {
    async function init() {
      const cache = new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              users: (users = []) => {
                return users;
              },
            },
          },
          User: {
            keyFields: ['email'],
          },
        },
        dataIdFromObject(responseObject) {
          switch (responseObject.__typename) {
            case 'User':
              return `User:${responseObject.email}`;
            default:
              return defaultDataIdFromObject(responseObject);
          }
        },
      });
      let newPersistor = new CachePersistor({
        cache,
        storage: new AsyncStorageWrapper(AsyncStorage),
        debug: __DEV__,
        trigger: 'write',
        persistenceMapper,
      });
      // await newPersistor.restore();
      setPersistor(newPersistor);
      const persistLink = createPersistLink();
      // const httpLink = createHttpLink({uri: 'https://api.spacex.land/graphql'});
      const httpLink = createHttpLink({
        // uri: 'http://192.168.246.45:4000/graphql',
        // uri: 'http://10.128.114.112:4000/graphql',
        uri: 'http://192.168.110.6:4000/graphql',
        // uri: 'http://10.128.161.102:4000/graphql',
      });
      setClient(
        new ApolloClient({
          link: persistLink.concat(httpLink),
          cache,
        }),
      );
    }

    init();
  }, []);

  return {
    client,
    // clearCache,
  };
};
