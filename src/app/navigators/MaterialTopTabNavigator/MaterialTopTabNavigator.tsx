/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Activities from '../../screens/Activities/Activities';
import {useDarkMode} from '../../hooks/useDarkMode';
import BibleStudies from '../../screens/BibleStudies';
import Revisits from '../../screens/Revisits';
import {Box, Button, useTheme} from 'native-base';

const Tab = createMaterialTopTabNavigator();

export default function MaterialTopTabNavigator() {
  const {themePrimary} = useDarkMode();
  const theme = useTheme();
  const primary = theme.colors.primary[600];
  const pressColor = theme.colors.primary[200];
  const inactive = theme.colors.gray[500];
  const [forceUpdate, setForceUpdate] = useState(false);

  const updateRevisits = () => {
    setForceUpdate(prevForceUpdate => !prevForceUpdate);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: themePrimary,
        },
        tabBarLabelStyle: {fontWeight: '500'},
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: inactive,
        tabBarPressColor: pressColor,
        tabBarIndicatorStyle: {
          backgroundColor: primary,
        },
      }}>
      <Tab.Screen
        listeners={({navigation}) => ({
          swipeEnd: () => {
            navigation.getParent().setOptions({
              headerRight: null,
            });
          },
        })}
        name="Actividades"
        component={Activities}
      />
      <Tab.Screen
        name="Revisitas"
        listeners={({navigation}) => ({
          swipeEnd: () => {
            navigation.getParent().setOptions({
              headerRight: () => (
                <Box marginRight={2}>
                  <Button variant="ghost" onPress={updateRevisits}>
                    Actualizar
                  </Button>
                </Box>
              ),
            });
          },
          // tabPress: e => {
          //   console.log('First Tab');
          // },
        })}>
        {() => <Revisits forceUpdate={forceUpdate} />}
      </Tab.Screen>
      <Tab.Screen
        name="Cursos Biblicos"
        component={BibleStudies}
        listeners={({navigation}) => ({
          swipeEnd: () => {
            navigation.getParent().setOptions({
              headerRight: () => null,
            });
          },
        })}
      />
    </Tab.Navigator>
  );
}
