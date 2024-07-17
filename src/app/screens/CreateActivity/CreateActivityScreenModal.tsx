import React from 'react';
import {ScrollView} from 'native-base';
import {PANEL_DARK_DARK} from '../../hooks/useDarkMode';
import CreateActivityForm from './CreateActivityForm';

export default function CreateActivityScreenModal() {
  return (
    <ScrollView _dark={{bg: PANEL_DARK_DARK}} _light={{bg: 'coolGray.50'}}>
      <CreateActivityForm />
    </ScrollView>
  );
}
