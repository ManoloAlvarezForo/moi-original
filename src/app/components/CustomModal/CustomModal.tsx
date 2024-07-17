/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Modal} from 'react-native';
import {Button, Text, View} from 'native-base';
import {useDarkMode} from '../../hooks/useDarkMode';
import messages from '../../screens/Home/Home.messages';

// TODO: refactor the property types.
type CustomModalProps = {
  showModal: any;
  onCloseModal: any;
  content: any;
  onOkPress: any;
  confirmationButtonLabel?: any;
  cancelButtonLabel?: any;
  modalTitle?: any;
};

const CustomModal: React.FC<CustomModalProps> = ({
  showModal,
  onCloseModal,
  content,
  onOkPress,
  confirmationButtonLabel,
  cancelButtonLabel,
  modalTitle,
}: CustomModalProps) => {
  const {themeSecondary} = useDarkMode();

  return (
    <Modal
      hardwareAccelerated
      statusBarTranslucent
      visible={showModal}
      animationType="slide"
      transparent>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'transparent',
          backgroundColor: '#010304a6',
        }}>
        <View style={styles.modalView} bg={themeSecondary}>
          {modalTitle && (
            <View>
              <Text>{modalTitle}</Text>
            </View>
          )}
          {content}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: 'auto',
              paddingTop: 20,
            }}>
            <Button variant="ghost" onPress={onCloseModal}>
              {cancelButtonLabel || messages.cancelButtonLabel.defaultMessage}
            </Button>
            <Button style={{marginLeft: 10}} onPress={onOkPress}>
              {confirmationButtonLabel || messages.okButtonLabel.defaultMessage}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default CustomModal;
