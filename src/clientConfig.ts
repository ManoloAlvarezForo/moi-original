import {
  InMemoryCache,
  createHttpLink,
  defaultDataIdFromObject,
} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ReactNativeNetworkStatus} from './app/helpers/ReactNativeNetworkStatus';

import {createPersistLink} from './app/utils/persistance';

// const appDomain =
//   Platform.OS === 'ios' ? 'localhost:4000' : '192.168.1.10:4000';

const cache = new InMemoryCache({
  typePolicies: {
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
// await newPersistor.restore();
const persistLink = createPersistLink();
// const httpLink = createHttpLink({uri: 'https://api.spacex.land/graphql'});
const httpLink = createHttpLink({
  // uri: 'http://192.168.246.45:4000/graphql',
  uri: 'http://192.168.120.6:4000/graphql',
  // uri: 'http://10.128.161.102:4000/graphql',
});

const cacheStorage = {
  getItem: async (key: any) => {
    const data = await AsyncStorage.getItem(key);
    if (typeof data === 'string') {
      return JSON.parse(data);
    }
    return data;
  },
  setItem: async (key: any, value: any) => {
    let valueStr = value;
    if (typeof valueStr === 'object') {
      valueStr = JSON.stringify(value);
    }
    return AsyncStorage.setItem(key, valueStr);
  },
  removeItem: async (key: any) => {
    return AsyncStorage.removeItem(key);
  },
};

const networkStatus = new ReactNativeNetworkStatus();

export const clientConfig = {
  link: persistLink.concat(httpLink),
  cache,
  offlineStorage: cacheStorage,
  cacheStorage,
  networkStatus,
};
