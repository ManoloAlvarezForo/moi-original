/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {Box, Stack, Text} from 'native-base';

type PillProps = {
  id: string;
  title: number;
  bc: any;
  icon: ReactNode;
};

const defaultBc = {
  colors: ['#b3ffab', '#12fff7'],
  start: [0, 0],
  end: [0, 1],
};

const Pill = ({id, title, icon, bc = defaultBc}: PillProps) => {
  return (
    <Box
      bg={{
        linearGradient: bc,
      }}
      style={{
        margin: 3,
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        // paddingVertical: 6,
        borderRadius: 10,
        marginHorizontal: '1%',
        // marginBottom: 6,
        minWidth: '46%',
      }}
      rounded="lg"
      overflow="hidden">
      <Stack space={2}>
        {icon}
        <Stack space={2} paddingTop={2}>
          <Text fontSize={50} fontWeight="bold" textAlign={'center'}>
            {title}
          </Text>
        </Stack>
        <Text bold fontSize={17} textAlign={'center'}>
          {id}
        </Text>
      </Stack>
    </Box>
  );
};

export default Pill;
