/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Alert, CloseIcon, HStack, IconButton, Text, VStack} from 'native-base';

export enum MESSAGE_TYPE {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

// const SPANISH_MESSAGE_TYPE = {
//   success: 'Correcto',
//   warning: 'Advertencia',
//   error: 'Error',
//   info: 'Informacion',
// };

export type CustomToastProps = {
  messageType: MESSAGE_TYPE;
  id?: any;
  title?: string;
  description: string;
  isClosable?: boolean;
  variant?: string;
  close?: (id: any) => void;
};

const CustomAlert: React.FC<CustomToastProps> = ({
  messageType,
  id,
  description,
  isClosable = true,
  variant,
  close = () => {},
}: CustomToastProps) => (
  <Alert
    // style={{marginBottom: Platform.OS === 'ios' ? 35 : 15}}
    style={{marginBottom: -25}}
    paddingTop={1}
    paddingBottom={1}
    paddingLeft={5}
    paddingRight={1}
    maxWidth="100%"
    alignSelf="center"
    rounded="full"
    flexDirection="row"
    bg="dark.100"
    status={messageType}
    variant={variant}>
    <VStack space={1} flexShrink={1} w="97%">
      <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
        <HStack space={2} flexShrink={1} alignItems="center">
          <Alert.Icon size={5} />
          <Text fontSize="md" color={'white'}>
            {description}
          </Text>
        </HStack>
        {isClosable ? (
          <IconButton
            rounded="full"
            variant="ghost"
            colorScheme={messageType}
            icon={<CloseIcon size="4" />}
            onPress={() => close(id)}
          />
        ) : null}
      </HStack>
    </VStack>
  </Alert>
);

export default CustomAlert;
