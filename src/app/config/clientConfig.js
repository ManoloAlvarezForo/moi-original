import {HttpLink, InMemoryCache} from '@apollo/client';
import {split} from 'apollo-link';
import {WebSocketLink} from '@apollo/link-ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {setContext} from 'apollo-link-context';
import {getToken} from '../helpers/localStorageHandler';
import {GRAPHQL_URL} from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ReactNativeNetworkStatus} from '../helpers/ReactNativeNetworkStatus';

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

// auth options for WS
const connectionParams = async () => ({
  authorization: await getToken(),
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: GRAPHQL_URL,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams,
  },
});

const authLink = setContext(async () => {
  const token = await getToken();
  return {
    headers: {
      authorization: token || '',
    },
  };
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// Create cache wrapper
const cacheStorage = {
  getItem: async key => {
    const data = await AsyncStorage.getItem(key);
    if (typeof data === 'string') {
      return JSON.parse(data);
    }
    return data;
  },
  setItem: async (key, value) => {
    let valueStr = value;
    if (typeof valueStr === 'object') {
      valueStr = JSON.stringify(value);
    }
    return AsyncStorage.setItem(key, valueStr);
  },
  removeItem: async key => {
    return AsyncStorage.removeItem(key);
  },
};

const networkStatus = new ReactNativeNetworkStatus();

export const clientConfig = {
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  offlineStorage: cacheStorage,
  cacheStorage,
  networkStatus,
};
