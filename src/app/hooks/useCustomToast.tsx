import {useToast} from 'native-base';
import React, {useCallback} from 'react';
import CustomAlert, {CustomToastProps} from '../components/Toast/CustomAlert';

const useCustomToast = () => {
  const toast = useToast();

  const showToast = useCallback(
    (props: CustomToastProps) => {
      toast.show({
        render: ({id}) => {
          return (
            <CustomAlert {...props} id={id} close={() => toast.close(id)} />
          );
        },
        duration: 2000,
        placement: 'bottom-left',
      });
    },
    [toast],
  );

  return {showToast};
};

export default useCustomToast;
