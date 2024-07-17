/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Modal, InfoIcon, SunIcon, Actionsheet} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const AddModal: React.FC<any> = ({open, setOpen}) => {
  const navigation = useNavigation<any>();
  const onHoursHandler = () => {
    setOpen(false);
    navigation.navigate('CreateActivity');
  };
  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>Agregar...</Modal.Header>
        <Modal.Body style={{margin: -15}}>
          <Actionsheet.Item
            onPress={onHoursHandler}
            startIcon={<InfoIcon size="5" mt="0.5" color="black" />}>
            Horas
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => setOpen(false)}
            startIcon={<SunIcon size="5" mt="0.5" color="black" />}>
            Estudio Biblico
          </Actionsheet.Item>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default AddModal;
