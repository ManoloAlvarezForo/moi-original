/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView} from 'native-base';
import {PANEL_DARK_DARK} from '../../hooks/useDarkMode';
import FormNewRevisit from './RevisitForm';

export default function RevisitScreenModal() {
  return (
    <ScrollView _dark={{bg: PANEL_DARK_DARK}} _light={{bg: 'coolGray.50'}}>
      <FormNewRevisit />
    </ScrollView>
  );
}
