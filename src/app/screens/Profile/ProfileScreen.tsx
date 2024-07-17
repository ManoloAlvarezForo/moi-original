import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from './Profile';
const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name={'Profile'}
      component={Profile}
      options={{
        headerTitle: 'Perfil',
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: '#d8d8d8'},
      }}
    />
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;
