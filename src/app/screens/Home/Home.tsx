/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import ReportDetail from '../Reports/components/ReportDetails/ReportDetail';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {Text, ScrollView, View, Box} from 'native-base';
import MonthPicker from './MonthPicker';
import messages from './Home.messages';
import {useOfflineReport} from '../../hooks/useOfflineReport';
import HeaderTitle from './HeaderTitle';
import {useDarkMode} from '../../hooks/useDarkMode';
import {capitalizeText} from '../../utils/dates';
import {useOfflineUser} from '../../hooks/useOfflineUser';
import Actions from './Actions';
import ModalPopup from '../../components/CustomModal/ModalPopup';

export default function Home() {
  const navigation = useNavigation<any>();
  const today = moment().format('dddd LL');
  const todayTitle = `${today.charAt(0).toUpperCase()}${today.slice(1)}`;
  const [openActions, setOpenActions] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {defaultReport, addReport} = useOfflineReport();
  const {getCurrentUser} = useOfflineUser();
  const user = getCurrentUser();

  const selectedDateRef = useRef<any>();

  const addReportHandler = async () => {
    const selectedDate = selectedDateRef?.current?.getSelectedDate();
    const month = (selectedDate.month() + 1).toString();
    const year = selectedDate.year().toString();

    addReport(month, year);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onSelectedDateHandler = () => {
    onCloseModal();
    addReportHandler();
  };

  const {themePrimary} = useDarkMode();

  useEffect(() => {
    let titleForHeader = 'Inicio';
    if (defaultReport) {
      const {month, year} = defaultReport;
      const title = `${moment(month, 'M').format('MMMM')} ${year}`;
      titleForHeader = capitalizeText(title);
    }

    navigation.setOptions({
      headerTitle: (props: any) => (
        <HeaderTitle title={titleForHeader} {...props} />
      ),
    });
  }, [defaultReport, navigation]);

  const userBibleStudiesCount = user?.bibleStudies
    ? user?.bibleStudies.length
    : 0;

  const isEmpty = defaultReport === null || defaultReport === undefined;

  // const homeEmptyView = (
  //   <View
  //     style={{
  //       flex: 1,
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       padding: 10,
  //       height: 300,
  //     }}>
  //     <Text style={{fontSize: 22, marginBottom: 20}}>{todayTitle}</Text>
  //     <Text color="gray.500">{messages.emptyMessage.defaultMessage}</Text>
  //     <View style={styles.defaultReportContainer}>
  //       <ReportDetail
  //         {...defaultReport}
  //         onlyRevisitsAndBibleCourses={
  //           user?.serviceType === ServiceType.PUBLISHER
  //         }
  //         userBibleStudies={userBibleStudiesCount}
  //       />
  //     </View>
  //   </View>
  // );

  const isBasic = isEmpty;
  const emptyStyles = isEmpty && {paddingHorizontal: 5, paddingVertical: 5};
  const reportDetailStyles = {...styles.defaultReportContainer, ...emptyStyles};

  const defaultReportView = (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginHorizontal: 10,
          marginTop: 10,
        }}>
        <Text marginLeft={2} fontSize="sm">
          {todayTitle}
        </Text>
        {isEmpty && (
          <Box marginBottom={2} marginTop={2} style={{padding: 10}}>
            <Text color="gray.500">{messages.emptyMessage.defaultMessage}</Text>
          </Box>
        )}
      </View>
      <View style={reportDetailStyles}>
        <ReportDetail
          {...defaultReport}
          onlyRevisitsAndBibleCourses={isBasic}
          userBibleStudies={userBibleStudiesCount}
        />
      </View>
    </>
  );

  const onPressFabHandler = () => {
    isEmpty ? setShowModal(true) : setOpenActions(true);
  };

  // const onDisplayNotification = async () => {
  //   // Request permissions (required for iOS)
  //   await notifee.requestPermission();

  //   // Create a channel (required for Android)
  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //     sound: 'bell',
  //   });

  //   // Display a notification
  //   await notifee.displayNotification({
  //     title: 'Moi Notification',
  //     body: 'Este es un Local Notification de prueba para ver como se ve sin ningun tipo de implementacion.',
  //     android: {
  //       channelId,
  //       sound: 'bell',
  //       // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
  //       // pressAction is needed if you want the notification to open the app when pressed
  //       pressAction: {
  //         id: 'default',
  //       },
  //     },
  //   });
  // };

  // const CustomModal = () => {
  //   return (
  //     <Modal
  //       hardwareAccelerated
  //       statusBarTranslucent
  //       visible={showModal}
  //       animationType="slide"
  //       transparent>
  //       <View
  //         style={{
  //           flex: 1,
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           // backgroundColor: 'transparent',
  //           backgroundColor: '#010304a6',
  //         }}>
  //         <View style={styles.modalView} bg={themeSecondary}>
  //           <MonthPicker ref={selectedDateRef} />
  //           <View
  //             style={{
  //               display: 'flex',
  //               flexDirection: 'row',
  //               marginLeft: 'auto',
  //               paddingTop: 20,
  //             }}>
  //             <Button variant="ghost" onPress={onCloseModal}>
  //               {messages.selectMonthYearCancelButtonLabel.defaultMessage}
  //             </Button>
  //             <Button style={{marginLeft: 10}} onPress={onSelectedDateHandler}>
  //               {messages.selectMonthYearSelectButtonLabel.defaultMessage}
  //             </Button>
  //           </View>
  //         </View>
  //       </View>
  //     </Modal>
  //   );
  // };

  return (
    <>
      <ScrollView bg={themePrimary}>
        <ScrollView>
          <View>{defaultReportView}</View>
        </ScrollView>
        <ModalPopup
          visible={showModal}
          onCloseModal={onCloseModal}
          onCancelPress={onCloseModal}
          onOkPress={onSelectedDateHandler}
          content={<MonthPicker ref={selectedDateRef} />}
        />
        {/* <CustomModal
          confirmationButtonLabel={
            messages.selectMonthYearSelectButtonLabel.defaultMessage
          }
          content={<MonthPicker ref={selectedDateRef} />}
          onCloseModal={onCloseModal}
          onOkPress={onSelectedDateHandler}
          showModal={showModal}
        /> */}
      </ScrollView>
      <Actions
        setOpenActions={setOpenActions}
        openActions={openActions}
        onPressFab={onPressFabHandler}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: '2%',
    marginVertical: '2%',
  },
  defaultReportContainer: {
    // paddingHorizontal: 5,
    // paddingVertical: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
    display: 'flex',
  },
  message: {
    color: '#6E6E6E',
  },
  centeredView: {
    backgroundColor: '#000000AA',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 15,
    width: '90%',
    // height: '80%',
  },
});
