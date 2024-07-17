/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {AddIcon, Fab, ScrollView, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';
import {useDarkMode} from '../../hooks/useDarkMode';
import {useOfflineUser} from '../../hooks/useOfflineUser';
import {BibleStudyType} from '../../types/user';
import BibleStudy from './BibleStudy';
import {useNavigation} from '@react-navigation/native';

const BibleStudies: React.FC = () => {
  const {user} = useOfflineUser();
  const {themePrimary} = useDarkMode();
  const {navigate} = useNavigation<any>();
  const bibleStudies = user?.bibleStudies || [];
  const isEmpty = user?.bibleStudies && user?.bibleStudies.length === 0;

  const onCreateBibleStudyHandler = () => {
    navigate('CreateBibleStudy');
  };

  const fabToActions = (
    <Fab
      style={styles.fab}
      onPress={onCreateBibleStudyHandler}
      renderInPortal={false}
      size="lg"
      shadow="4"
      icon={<AddIcon color="white" />}
    />
  );

  const renderWithItems = (
    <>
      <ScrollView bg={themePrimary}>
        <View
          marginLeft={2}
          marginRight={1}
          paddingTop={3}
          paddingBottom={3}
          style={{display: 'flex', flexDirection: 'column'}}>
          {bibleStudies.map((bibleStudy: BibleStudyType, idx: number) => {
            return <BibleStudy key={idx} bibleStudy={bibleStudy} />;
          })}
        </View>
      </ScrollView>
      {fabToActions}
    </>
  );

  const emptyWithFab = (
    <View bg={themePrimary} style={styles.emptyContainer}>
      <Text>No tiene Estudios Biblicos</Text>
      {fabToActions}
    </View>
  );

  return <>{!isEmpty ? renderWithItems : emptyWithFab}</>;
};

const styles = StyleSheet.create({
  fab: {width: 56, height: 56},
  emptyContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default BibleStudies;
