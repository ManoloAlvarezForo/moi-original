/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BibleStudy from './BibleStudyScreenModal';
import {CloseIcon, IconButton} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useDarkMode} from '../../hooks/useDarkMode';

const ActivityStack = createStackNavigator();

const BibleStudyFormScreen = () => {
  const navigation = useNavigation();
  const {themeSecondary, textColor} = useDarkMode();

  const createRightButton = () => (
    <IconButton
      onPress={() => navigation.goBack()}
      rounded="full"
      size="sm"
      style={{marginRight: 8}}
      icon={<CloseIcon color={textColor} />}
    />
  );

  return (
    <ActivityStack.Navigator>
      <ActivityStack.Screen
        name={'NewBibleStudy'}
        component={BibleStudy}
        options={{
          headerTitle: 'Estudio Biblico',
          headerTitleAlign: 'left',
          headerStyle: {backgroundColor: themeSecondary},
          headerTitleStyle: {
            color: textColor,
            fontSize: 19,
            marginLeft: -5,
          },
          headerLeft: () => null,
          headerRight: createRightButton,
        }}
      />
    </ActivityStack.Navigator>
  );
};

export default BibleStudyFormScreen;
