import React from 'react';
import {ScrollView} from 'native-base';
import FormNewBibleStudy from './BibleStudyForm';
import {PANEL_DARK_DARK} from '../../hooks/useDarkMode';

export default function BibleStudyScreenModal() {
  return (
    <ScrollView _dark={{bg: PANEL_DARK_DARK}} _light={{bg: 'coolGray.50'}}>
      <FormNewBibleStudy />
    </ScrollView>
  );
}
