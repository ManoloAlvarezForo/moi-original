import React from 'react';
import {AddIcon, Fab} from 'native-base';
import AddActionSheet from './AddActionSheet';
import {StyleSheet} from 'react-native';

type ActionsProps = {
  onPressFab: () => void;
  openActions: boolean;
  setOpenActions: (arg0: boolean) => void;
};

const Actions: React.FC<ActionsProps> = ({
  onPressFab,
  openActions,
  setOpenActions,
}: ActionsProps) => {
  return (
    <>
      <Fab
        style={styles.fab}
        onPress={onPressFab}
        renderInPortal={false}
        size="lg"
        shadow="4"
        icon={<AddIcon color="white" />}
      />
      <AddActionSheet
        isOpen={openActions}
        onClose={() => setOpenActions(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {width: 56, height: 56},
});

export default Actions;
