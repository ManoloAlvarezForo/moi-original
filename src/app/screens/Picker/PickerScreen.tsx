import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Picker from '../../components/Loader';
import {APP_COLORS} from '../../themes/colors';
const PickerStack = createStackNavigator();
const PickerStackScreen = () => (
  <PickerStack.Navigator>
    <PickerStack.Screen
      name={'Picker'}
      component={Picker}
      options={{
        headerTitle: 'Picker',
        headerTitleAlign: 'center',
        // headerTitleStyle: {color: APP_COLORS.lightText},
        // headerStyle: {backgroundColor: APP_COLORS.dark},
      }}
    />
  </PickerStack.Navigator>
);

export default PickerStackScreen;
