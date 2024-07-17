import React, {useState} from 'react';
import {SafeAreaView, TextInput, StyleSheet, Button} from 'react-native';
import {gql, useApolloClient} from '@apollo/client';

const Login: React.FC = () => {
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePass] = useState('');
  const {cache} = useApolloClient();

  const onPressHandle = () => {
    const query = gql`
      query users {
        users @persist {
          id
          name
          email
        }
      }
    `;

    const dataCache: any = cache.readQuery({query});
    const newUser = {
      __typename: 'User',
      id: `${name}${email}`,
      email,
      name,
      password,
    };
    cache.writeQuery({
      query,
      data: {
        users: [...dataCache.users, newUser],
      },
    });
    const newCache: any = cache.readQuery({query});
    console.log(newCache);
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePass}
        value={password}
        placeholder="Password"
      />
      <Button title="Press me" onPress={onPressHandle} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Login;
