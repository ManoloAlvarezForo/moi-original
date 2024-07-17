/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Revisit from './RevisitScreenModal';
import {CloseIcon, IconButton} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useDarkMode} from '../../hooks/useDarkMode';
const ActivityStack = createStackNavigator();
const RevisitFormScreen = () => {
  const navigation = useNavigation();
  const {textColor, themeSecondary} = useDarkMode();
  return (
    <ActivityStack.Navigator>
      <ActivityStack.Screen
        name={'NewRevisit'}
        component={Revisit}
        options={{
          headerTitle: 'Revisita',
          headerTitleAlign: 'left',
          headerStyle: {backgroundColor: themeSecondary},
          headerTitleStyle: {
            color: textColor,
            fontSize: 19,
            marginLeft: -5,
          },
          headerLeft: () => null,
          headerRight: () => (
            <IconButton
              onPress={() => navigation.goBack()}
              rounded="full"
              size="sm"
              style={{marginRight: 8}}
              icon={<CloseIcon color={textColor} />}
            />
          ),
        }}
      />
    </ActivityStack.Navigator>
  );
};

export default RevisitFormScreen;
