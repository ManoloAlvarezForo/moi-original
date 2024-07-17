import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface FilledButtonProps {
  title: string;
  style?: {};
  onPress: () => void;
}

const FilledButton: React.FC<FilledButtonProps> = ({title, style, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, style]}
      onPress={onPress}>
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#37CCE8',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    borderRadius: 8,
    elevation: 8,
  },
  text: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default FilledButton;
