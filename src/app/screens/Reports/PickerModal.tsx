import React, {useState} from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

type Props = {
  items: string[];
  visible: boolean;
  title: string;
  onClose: () => void;
  onSelect: (value: string) => void;
  value: string;
};

const PickerModal: React.FC<Props> = ({
  items,
  visible,
  // onSelect,
  // onClose,
  // title,
  // value,
}) => {
  const [pickerValue, setPickerValue] = useState<string>('');

  return (
    <Modal animated transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={pickerValue}
            onValueChange={(itemValue: any) => setPickerValue(itemValue)}>
            {items.map((item: any) => (
              <Picker.Item value={item} label={item} />
            ))}
          </Picker>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerContainer: {
    height: 200,
    width: '100%',
    backgroundColor: 'white',
  },
  label: {
    textTransform: 'capitalize',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default PickerModal;
