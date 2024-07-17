import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomePage from '../../WelcomePage';

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <AuthStack.Screen name={'LoginStack'}>
      {() => (
        <LoginStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <LoginStack.Screen name={'LoginScreen'} component={WelcomePage} />
        </LoginStack.Navigator>
      )}
    </AuthStack.Screen>
  </AuthStack.Navigator>
);

export default AuthStackScreen;
