import {useCallback, useEffect, useState} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  from,
  ApolloLink,
} from '@apollo/client';
import {AsyncStorageWrapper, CachePersistor} from 'apollo3-cache-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistenceMapper, createPersistLink} from '../utils/persistance';

export const useApolloClient = () => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [persistor, setPersistor] =
    useState<CachePersistor<NormalizedCacheObject>>();
  const clearCache = useCallback(() => {
    if (!persistor) {
      return;
    }
    persistor.purge();
  }, [persistor]);

  useEffect(() => {
    async function init() {
      const cache = new InMemoryCache();
      const newPersistor = new CachePersistor({
        cache,
        storage: new AsyncStorageWrapper(AsyncStorage),
        debug: __DEV__,
        trigger: 'write',
        persistenceMapper,
      });
      await newPersistor.restore();
      setPersistor(newPersistor);
      const persistLink = createPersistLink();
      const timeoutLink = new ApolloLink((operation, forward) => {
        operation.setContext({timeout: 1});
        return forward(operation);
      });
      const httpLink = createHttpLink({
        uri: 'http://192.168.100.6:4000/graphql',
      });
      const linkConfig = from([persistLink, timeoutLink, httpLink]);
      setClient(
        new ApolloClient({
          link: linkConfig,
          cache,
        }),
      );
    }
    init();
    // uncomment this to clear the Graphql cache in the phone.
    // clearCache();
  }, []);

  return {
    client,
    clearCache,
  };
};
