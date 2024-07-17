/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AuthContainer from '../../components/AuthContainer';
import Heading from '../../components/Heading';
import Input from '../../components/Input';
import FilledButton from '../../components/FilledButton';
import {AuthContext} from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {saveUser} = useContext(AuthContext);
  // const [login /*, {error} should be uncommented in online mode */] =
  //   useMutation(LOGIN, {
  //     fetchPolicy: 'network-only',
  //     notifyOnNetworkStatusChange: true,
  //     onCompleted: data => {
  //       const {token, user} = data?.login;
  //       saveUser(user, token);
  //     },
  //     variables: {
  //       email,
  //       password,
  //     },
  //     onError: (error: any) => {
  //       console.log('LOGIN ERROR: ', error);
  //       const user = {
  //         name: 'user',
  //         email: 'user@nouser.com',
  //         id: 'localuserjustforstoragememori',
  //       };
  //       const token = 'localuserjustforstoragememori';
  //       saveUser(user, token);
  //     },
  //   });

  const login = () => {
    const user = {
      name: 'offline-user',
      email: 'offlineuser@nouser.com',
      id: 'local-user-in-memory',
    };
    const token = 'local-user-in-memory-token';
    saveUser(user, token);
  };

  // const onHandleLogin = () => {
  //   // Those variables are setting to storage a user in the memory catch.
  //   const user: UserType = {
  //     name: 'user demo',
  //     id: 'userdemoid',
  //     email: 'user@demo.com',
  //   };
  //   const token: string = 'userdemotoken';
  //   saveUser(user, token);
  //   login({
  //     variables: {
  //       email,
  //       password,
  //     },
  //   });
  // };

  return (
    <AuthContainer style={{backgroundColor: '#333333'}}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Moi</Text>
      </View>
      <Heading style={styles.title}>Bienvenido</Heading>
      {/* {error && <Error error={error.message} />} */}
      <Input
        value={email}
        onChangeText={(value: string) => setEmail(value)}
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
      />
      <Input
        value={password}
        onChangeText={(value: string) => setPassword(value)}
        placeholder="Password"
        style={styles.input}
        secureTextEntry
      />
      <FilledButton
        title="ingresar"
        style={styles.loginButton}
        onPress={login}
      />
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    margin: 20,
    fontSize: 42,
    fontWeight: '700',
    color: 'white',
    backgroundColor: '#37CCE8',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 0,
  },
  logoText: {
    fontSize: 42,
    fontWeight: '700',
    color: 'white',
  },
  title: {
    marginBottom: 32,
    color: '#A5A4A4',
  },
  input: {
    marginVertical: 8,
  },
  loginButton: {
    marginVertical: 32,
  },
});

export default Login;
