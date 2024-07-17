/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  // ApolloClient,
  gql,
  useApolloClient,
  useQuery,
  WatchQueryFetchPolicy,
} from '@apollo/client';
import Login from './Login';

const usersGQL = gql`
  query users {
    users {
      id
      name
      email
    }
  }
`;

type UsersQuery = {
  users: {
    id: string;
    name: string;
    email: string;
  }[];
};

export const Ships = () => {
  const [update, setUpdate] =
    useState<WatchQueryFetchPolicy>('cache-and-network');
  const {cache} = useApolloClient();
  const {error, data, loading, updateQuery} = useQuery(usersGQL, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data: any) => {
      console.log(data);
      const dataCache: any = cache.readQuery({query: usersGQL});
      console.log(dataCache);

      // cache.writeQuery({
      //   usersGQL,
      //   data: {
      //     users: [...cache.users, ...data.users],
      //   },
      // });
    },
  });

  const onPressHandle = () => {
    updateQuery(prevUsers => ({
      users: [...prevUsers.users],
    }));
    setUpdate('cache-and-network');
  };

  // const updateCacheAndReRenderUI = (newUser: any) => {
  //   updateQuery(prevUsers => ({
  //     users: [newUser, ...prevUsers.users],
  //   }));
  // };

  if (!data) {
    // we don't have data yet

    if (loading) {
      // but we're loading some
      return <Text style={styles.heading}>Loading initial data...</Text>;
    }
    if (error) {
      // and we have an error
      return <Text style={styles.heading}>Error loading data :(</Text>;
    }
    return <Text style={styles.heading}>Unknown error :(</Text>;
  }

  return (
    <ScrollView>
      {loading ? (
        <Text style={styles.heading}>Loading fresh data...</Text>
      ) : null}
      {data.users.map((user: any) => (
        <View key={user.id} style={styles.item}>
          <Text>{user.name}</Text>
          <Text style={styles.subtitle}>{user.email}</Text>
        </View>
      ))}
      <Button title="Update" onPress={onPressHandle} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    padding: 16,
    fontWeight: 'bold',
  },
  item: {
    padding: 16,
  },
  subtitle: {
    fontSize: 12,
  },
});
