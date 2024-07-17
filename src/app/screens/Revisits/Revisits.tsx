/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {AddIcon, Box, Fab, ScrollView, Text, View} from 'native-base';
import {useDarkMode} from '../../hooks/useDarkMode';
import {useOfflineUser} from '../../hooks/useOfflineUser';
import {RevisitType} from '../../types/user';
import Revisit from './Revisit';
import {useNavigation} from '@react-navigation/native';
import {REPORT_COLORS} from '../../themes/colors';
import ModalPopup from '../../components/CustomModal/ModalPopup';
// import HeaderTitle from '../Home/HeaderTitle';

export const REVISIT_STATUS_PLURAL: {[index: string]: any} = {
  pending: {bg: REPORT_COLORS.bibleStudies, label: 'Pendientes'},
  done: {bg: REPORT_COLORS.hours, label: 'Realizados'},
  archived: {bg: REPORT_COLORS.revisits, label: 'Archivados'},
};

const Revisits = ({forceUpdate}: any) => {
  const [filteredRevisits, setFilteredRevisits] = useState<any>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRevisit, setSelectedRevisit] = useState<RevisitType | null>();
  const [revisitsKeys, setRevisitsKeys] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const {user, deleteRevisit, updateRevisitStatus} = useOfflineUser();
  const {themePrimary} = useDarkMode();
  const {navigate} = useNavigation<any>();

  useEffect(() => {
    const revisits = user?.revisits || [];
    if (revisits.length > 0) {
      const defaultFiltered = revisits.reduce(
        (group: any, newActivity: any) => {
          group[newActivity.status] = group[newActivity.status] ?? [];
          group[newActivity.status].push(newActivity);
          return group;
        },
        {},
      );
      if (defaultFiltered) {
        const newFilteredKeys: any = Object.keys(defaultFiltered);
        setRevisitsKeys(newFilteredKeys);
        setFilteredRevisits(defaultFiltered);
        setIsEmpty(false);
      }
    } else {
      setIsEmpty(true);
    }
  }, [user?.revisits, forceUpdate]);

  const onCreateRevisitHandler = () => {
    navigate('CreateRevisit');
  };

  const onDeleteRevisitHandler = (revisitToBeRemoved: any) => {
    setSelectedRevisit(revisitToBeRemoved);
    setShowModal(true);
  };

  const onOkPressHandler = () => {
    deleteRevisit(selectedRevisit);
    setShowModal(false);
  };

  const cancelDeleteRevisit = () => {
    setSelectedRevisit(null);
  };

  const onEditRevisitHandler = (revisitId: string) => {
    navigate('CreateRevisit', {revisitId});
  };

  const onChangeStatusHandler = (status: string) => (revisitId: string) => {
    updateRevisitStatus(revisitId, status);
  };

  const fabToActions = (
    <Fab
      style={styles.fab}
      onPress={onCreateRevisitHandler}
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
          {revisitsKeys.map((key: string, statusIdx: number) => {
            return (
              <View key={statusIdx}>
                {filteredRevisits[key].map(
                  (revisit: RevisitType, idx: number) => {
                    return (
                      <Revisit
                        onEditRevisit={onEditRevisitHandler}
                        onDeleteRevisit={onDeleteRevisitHandler}
                        onChangeStatus={onChangeStatusHandler}
                        key={idx}
                        revisit={revisit}
                      />
                    );
                  },
                )}
              </View>
            );
          })}
        </View>
        <Box height={20} />
      </ScrollView>
      {fabToActions}
    </>
  );

  const emptyWithFab = (
    <View bg={themePrimary} style={styles.emptyContainer}>
      <Text>No tiene Revisitas</Text>
      {fabToActions}
    </View>
  );

  return (
    <>
      {!isEmpty ? renderWithItems : emptyWithFab}
      <ModalPopup
        visible={showModal}
        onCloseModal={() => setShowModal(false)}
        onOkPress={onOkPressHandler}
        onCancelPress={cancelDeleteRevisit}
        title="Eliminar revisita?"
        content={
          <Text>
            No podra recuperar esta Revisita despues de ser eliminada.
          </Text>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {width: 56, height: 56},
  emptyContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Revisits;
