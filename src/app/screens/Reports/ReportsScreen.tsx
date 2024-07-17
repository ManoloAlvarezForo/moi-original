import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Reports from './Reports';
import HeaderTitle from '../Home/HeaderTitle';
import {useDarkMode} from '../../hooks/useDarkMode';

const ReportsStack = createStackNavigator();
const ReportsStackScreen = () => {
  const {themeSecondary, isDark} = useDarkMode();
  const headerTitle = () => <HeaderTitle showUser={false} title="Informes" />;

  return (
    <ReportsStack.Navigator>
      <ReportsStack.Screen
        name={'Reports'}
        component={Reports}
        options={{
          headerTitle,
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
    </ReportsStack.Navigator>
  );
};

export default ReportsStackScreen;
