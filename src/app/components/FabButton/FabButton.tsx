import {View} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
// import {APP_COLORS} from '../../themes/colors';

export type FabButtonProps = {
  onPress: () => void;
  icon: React.ReactElement;
  size?: number;
  backgroundColor?: string;
};

const FabButton: React.FC<FabButtonProps> = ({
  onPress,
  icon,
  size = 54,
  backgroundColor = '#fff',
}: FabButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          ...styles.roundButton,
          width: size,
          height: size,
          backgroundColor: backgroundColor,
        }}>
        {icon}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    margin: '1%',
  },
  roundButton: {
    // width: 54,
    // height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    // backgroundColor: APP_COLORS.secondBlue,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    // shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});

export default FabButton;
