import React, {useCallback, useState, useRef} from 'react';
import {StyleSheet, Modal, Animated} from 'react-native';
import {View, Button, useTheme, Stack, Text} from 'native-base';
import messages from '../../screens/Home/Home.messages';
import {useDarkMode} from '../../hooks/useDarkMode';
import {PANEL_MIDDLE_DARK} from '../../hooks/useDarkMode';

const sizes = {
  full: '100%',
  lg: '80%',
  md: '50%',
  sm: '30%',
};

type ModalPopupProps = {
  visible: boolean;
  onOkPress: () => void;
  onCloseModal: () => void;
  onCancelPress?: () => void;
  content: any;
  title?: string;
  headerStyle?: any;
  contentStyle?: any;
  bodyStyle?: any;
  size?: 'full' | 'lg' | 'md' | 'sm';
  okLabel?: string;
};

const ModalPopup = ({
  visible,
  content,
  title,
  onOkPress,
  onCancelPress,
  onCloseModal,
  headerStyle,
  contentStyle,
  bodyStyle,
  size = 'lg',
  okLabel = '',
}: ModalPopupProps) => {
  const [showModal, setShowModal] = useState(visible);
  const translateYValue = useRef(new Animated.Value(1)).current; // Inicializar en 1 para que esté fuera de la pantalla
  const {isDark} = useDarkMode();
  const {colors} = useTheme();
  const gray50 = colors.coolGray[50];

  const toggleModal = useCallback(() => {
    if (visible) {
      setShowModal(true);
      Animated.spring(translateYValue, {
        toValue: 0, // Mover hacia arriba (posición 0)
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateYValue, {
        toValue: 1, // Mover hacia abajo (fuera de la pantalla)
        duration: 120,
        useNativeDriver: true,
      }).start(() => setShowModal(false));
    }
  }, [translateYValue, visible]);

  React.useEffect(() => {
    toggleModal();
  }, [toggleModal, visible]);

  const onCancelPressHandler = () => {
    onCancelPress && onCancelPress();
    onCloseModal();
  };

  const widthAndHeight = {width: sizes[size]};

  return (
    <Modal
      transparent
      visible={showModal}
      onRequestClose={() => setShowModal(!showModal)}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            {
              ...styles.modalContainer,
              ...widthAndHeight,
              backgroundColor: isDark ? PANEL_MIDDLE_DARK : gray50,
            },
            {
              transform: [
                {
                  translateY: translateYValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 800], // Mover desde la parte inferior de la pantalla
                  }),
                },
              ],
            },
            contentStyle,
          ]}>
          {title && (
            <View style={[styles.header, headerStyle]}>
              <Text style={[styles.header, headerStyle]}>{title}</Text>
            </View>
          )}
          <View style={[styles.content, bodyStyle]}>{content}</View>
          <View style={styles.buttonContainer}>
            <Stack direction={{base: 'row'}} space={1}>
              <Button variant="ghost" onPress={onCancelPressHandler}>
                {messages.cancelButtonLabel.defaultMessage}
              </Button>
              <Button style={styles.okButton} onPress={onOkPress}>
                {okLabel ? okLabel : messages.okButtonLabel.defaultMessage}
              </Button>
            </Stack>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    // width: '100%',
    // height: '100%',
    padding: 15,
    borderRadius: 5,
    elevation: 20,
    backgroundColor: 'white', // Color de fondo del modal
  },
  content: {
    marginBottom: 10,
  },
  header: {
    marginBottom: 5,
    alignItems: 'flex-start',
    fontSize: 17,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  okButton: {
    marginLeft: 7,
  },
});

export default ModalPopup;
