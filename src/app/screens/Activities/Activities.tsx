// /* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {AddIcon, Box, Fab, ScrollView, Stack, Text, View} from 'native-base';
import {useOfflineReport} from '../../hooks/useOfflineReport';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import Activity from './Activity';
import {ActivityPropsType} from '../../types/activities';
import {useDarkMode} from '../../hooks/useDarkMode';
import EmptyView from '../../components/EmptyView';
import ModalPopup from '../../components/CustomModal/ModalPopup';
import {useOfflineRecord} from '../../hooks/useOfflineRecord';

const renderDateAndDay = (date: string) => {
  const newDate = moment(date);
  const dayWeek = `${newDate
    .format('ddd')
    .replace(/^\w/, c => c.toUpperCase())}`;
  const monthDay = newDate.format('D');

  return (
    <Box
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      style={{
        paddingTop: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Text
        marginBottom={-1.5}
        fontWeight="medium"
        color="primary.600"
        fontSize={17}>
        {dayWeek}
      </Text>
      <Text marginBottom={-1} fontSize="4xl" color="primary.600">
        {monthDay}
      </Text>
    </Box>
  );
};

const Activities = () => {
  const {themePrimary} = useDarkMode();
  const {navigate} = useNavigation<any>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityPropsType | null>();
  const {deleteActivity} = useOfflineRecord();
  const {defaultReport} = useOfflineReport();

  let activityKeys: any;

  if (defaultReport) {
    // TODO: refactor this for the filter by date or the internal activity date.
    activityKeys =
      Object.keys(defaultReport.activitiesByDate).sort((a, b) => {
        const aDate = new Date(a);
        const bDate = new Date(b);

        return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
      }) || [];
  }

  const onCreateActivityHandler = () => {
    navigate('CreateActivity');
  };

  const onOkPressHandler = () => {
    setTimeout(() => {
      deleteActivity(selectedActivity);
    }, 300);
    // deleteActivity(selectedActivity);
    setShowModal(false);
  };

  const onDeleteActivityHandler = (activityToBeRemoved: any) => {
    setSelectedActivity(activityToBeRemoved);
    setShowModal(true);
  };

  const cancelDeleteActivity = () => {
    setSelectedActivity(null);
  };

  const onEditActivityHandler = (activityToEdit: any) => {
    navigate('CreateActivity', {activityId: activityToEdit.id});
  };

  return (
    <>
      {defaultReport ? (
        defaultReport.activities.length > 0 ? (
          <>
            <ScrollView bg={themePrimary} paddingTop={3}>
              {activityKeys.map((key: string, idx: number) => (
                <Box
                  display="flex"
                  flexDirection="row"
                  key={idx}
                  marginBottom={2.5}>
                  <Box
                    bg="primary.50"
                    marginLeft={1}
                    marginRight={1}
                    width="15%"
                    rounded="lg">
                    {renderDateAndDay(key)}
                  </Box>
                  <Stack
                    space={0.5}
                    justifyContent="center"
                    width="81%"
                    display="flex"
                    flexDir="column">
                    {defaultReport.activitiesByDate[key].map(
                      (activity: ActivityPropsType, activityIdx: number) => (
                        <Activity
                          onDeleteActivity={() =>
                            onDeleteActivityHandler(activity)
                          }
                          onEditActivity={() => onEditActivityHandler(activity)}
                          activity={activity}
                          key={key + activityIdx}
                        />
                      ),
                    )}
                  </Stack>
                </Box>
              ))}
              <Box height={20} />
            </ScrollView>
            <Fab
              style={styles.fab}
              onPress={onCreateActivityHandler}
              renderInPortal={false}
              size="lg"
              shadow="4"
              icon={<AddIcon color="white" />}
            />
          </>
        ) : (
          <View bg={themePrimary} style={styles.emptyContainer}>
            <Text>No tiene actividades</Text>
            <Fab
              style={styles.fab}
              onPress={onCreateActivityHandler}
              renderInPortal={false}
              size="lg"
              shadow="4"
              icon={<AddIcon color="white" />}
            />
          </View>
        )
      ) : (
        <EmptyView label="No tiene ningun informe asignado" />
      )}
      <ModalPopup
        visible={showModal}
        onCloseModal={() => setShowModal(false)}
        onOkPress={onOkPressHandler}
        onCancelPress={cancelDeleteActivity}
        title="Eliminar Actividad?"
        content={
          <Text>
            Si elimina esta actividad no podra recuperar su informacion.
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

export default Activities;
