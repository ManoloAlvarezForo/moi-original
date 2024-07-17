/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Box, Stack, Text} from 'native-base';
import {APP_COLORS} from '../../../../themes/colors';

export const PILL_TEXT_AND_ICON_COLOR = 'black';

type PillProps = {
  id: string;
  title: number;
  bc: string;
  icon: any;
  size: any;
};

const Pill = ({id, title, bc = APP_COLORS.appGray, icon, size}: PillProps) => {
  return (
    <Box
      style={{
        backgroundColor: bc,
        margin: 3,
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 10,
        marginHorizontal: '1%',
        marginBottom: 6,
        width: size,
      }}
      rounded="lg"
      overflow="hidden"
      _dark={{
        borderColor: 'black',
        backgroundColor: 'black',
      }}
      _light={{
        backgroundColor: 'gray.50',
      }}>
      <Stack
        paddingBottom={2}
        paddingLeft={1}
        paddingTop={1}
        paddingRight={1}
        space={3}>
        <Stack direction={{base: 'row'}} alignItems="center">
          <Text color={PILL_TEXT_AND_ICON_COLOR} width="80%" fontSize="md">
            {id}
          </Text>
          <Box
            borderRadius="lg"
            marginLeft="auto"
            display="flex"
            flexDirection="row"
            padding={1}>
            {icon}
          </Box>
        </Stack>
        <Stack>
          <Text color={PILL_TEXT_AND_ICON_COLOR} fontSize={50} textAlign="left">
            {title}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Pill;
