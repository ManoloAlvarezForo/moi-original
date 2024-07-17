/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import Login from './Login';

const usersGQL = gql`
  query users {
    users @persist {
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

// const launchesGQL = gql`
//   query LaunchesQuery {
//     launches(limit: 10) @persist {
//       id
//       details
//       mission_name
//       launch_date_utc
//     }
//   }
// `;

type LaunchesQuery = {
  launches: {
    id: string;
    mission_name: string;
    details: string;
    launch_date_utc: string;
  }[];
};

export const Launches = () => {
  const {error, data, loading} = useQuery<UsersQuery>(usersGQL, {
    fetchPolicy: 'cache-first',
  });

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
      <View>
        <Login />
      </View>
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
  mission: {},
  launchDate: {
    fontSize: 12,
  },
  subtitle: {
    fontSize: 12,
  },
});
