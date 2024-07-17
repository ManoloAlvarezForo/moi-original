import React from 'react';
import {Text, StyleSheet} from 'react-native';

interface HeadingProps {
  children: any;
  style: any;
  props?: any;
}

const Heading: React.FC<HeadingProps> = ({children, style, ...props}) => {
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    color: '#464646',
  },
});

export default Heading;
