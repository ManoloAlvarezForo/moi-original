import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Settings from './Settings';
import {useDarkMode} from '../../hooks/useDarkMode';
import HeaderTitle from '../Home/HeaderTitle';
// import {APP_COLORS} from '../../themes/colors';
const SettingsStack = createStackNavigator();
const SettingsStackScreen = () => {
  const {themeSecondary, isDark} = useDarkMode();
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name={'Settings'}
        component={Settings}
        options={{
          headerTitle: () => <HeaderTitle showUser={false} title="Ajustes" />,
          headerShadowVisible: !isDark,
          headerTitleAlign: 'left',
          headerTitleStyle: {
            color: themeSecondary,
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerStyle: {backgroundColor: themeSecondary},
        }}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsStackScreen;
