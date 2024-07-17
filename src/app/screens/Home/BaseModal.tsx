/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, Modal, Stack} from 'native-base';

type BaseModalProps = {
  title?: string;
  body: any;
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  onAcceptAction: () => void;
  hasCancel?: boolean;
  acceptLabel: string;
  size?: 'full' | 'lg' | 'md' | 'sm' | 'xl' | 'xs';
};

export const BaseModal: React.FC<BaseModalProps> = ({
  title,
  body,
  isVisible,
  setVisible,
  onAcceptAction,
  hasCancel = false,
  acceptLabel,
  size = 'lg',
}: BaseModalProps) => {
  return (
    <Modal
      isOpen={isVisible}
      onClose={() => setVisible(false)}
      avoidKeyboard
      style={{
        justifyContent: 'center', // Centrar verticalmente
        alignItems: 'center', // Centrar horizontalmente
      }}
      size={size}>
      <Modal.Content>
        <Modal.CloseButton />
        {title && <Modal.Header>{title}</Modal.Header>}
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Stack direction={{base: 'row'}} space={2}>
            {hasCancel && (
              <Button onPress={() => setVisible(false)}>Cancelar</Button>
            )}
            <Button size="md" onPress={onAcceptAction}>
              {acceptLabel}
            </Button>
          </Stack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
