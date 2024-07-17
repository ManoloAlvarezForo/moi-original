/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import {Button, Menu, Text, useTheme, View} from 'native-base';
import EllipsisIconOutline from '../../svg/ellipsis-vertical';
import {useShareMessage} from '../../hooks/useShareMessage';
import {useOfflineReport} from '../../hooks/useOfflineReport';
import HeaderTitle from './HeaderTitle';
import {useDarkMode} from '../../hooks/useDarkMode';
import ModalPopup from '../../components/CustomModal/ModalPopup';

const HomeStack = createStackNavigator();

const RightHeader = () => {
  const {shareReport} = useShareMessage();
  const {defaultReport, deleteReport, hasActivities} = useOfflineReport();
  const [modalVisible, setModalVisible] = useState(false);

  const {
    colors: {primary},
  } = useTheme();

  const onDeleteReport = () => {
    deleteReport(defaultReport.id);
    setModalVisible(false);
  };

  const getTriggerMenu = (triggerProps: any) => {
    return (
      <Button
        rounded="full"
        marginRight={1}
        variant={'ghost'}
        {...triggerProps}>
        <EllipsisIconOutline size={24} color={primary[600]} />
      </Button>
    );
  };

  const bodyText =
    'Se perderan todas las actividades y revisitas que se realizaron.';

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <View style={{marginRight: 5}}>
          <Menu trigger={getTriggerMenu}>
            <Menu.Item onPress={shareReport} isDisabled={!hasActivities}>
              Compartir Informe
            </Menu.Item>
            <Menu.Item
              onPress={() => setModalVisible(true)}
              isDisabled={!defaultReport}>
              Eliminar Informe
            </Menu.Item>
          </Menu>
        </View>
      </View>
      <ModalPopup
        visible={modalVisible}
        onCloseModal={() => setModalVisible(false)}
        onOkPress={onDeleteReport}
        okLabel="Eliminar"
        // onCancelPress={cancelDeleteActivity}
        title="Desea eliminar este informe?"
        content={<Text>{bodyText}</Text>}
      />
      {/* <BaseModal
        body={bodyText}
        title="Desea eliminar este informe?"
        acceptLabel="Eliminar"
        isVisible={modalVisible}
        onAcceptAction={onDeleteReport}
        setVisible={setModalVisible}
      /> */}
    </>
  );
};

const HomeStackScreen: React.FC = () => {
  const {themeSecondary, isDark} = useDarkMode();

  const getHeaderTitle = () => {
    return <HeaderTitle showUser title="Inicio" />;
  };

  const getHeaderRight = () => {
    return <RightHeader />;
  };

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={'Home'}
        component={Home}
        options={{
          headerTitle: getHeaderTitle,
          headerShadowVisible: !isDark,
          headerTitleAlign: 'left',
          headerTitleStyle: {
            color: themeSecondary,
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerRight: getHeaderRight,
          headerStyle: {backgroundColor: themeSecondary},
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
