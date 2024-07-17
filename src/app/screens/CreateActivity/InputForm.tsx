/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FormControl, Input} from 'native-base';
import {RevisitType} from '../../types/user';

type InputFormPros = {
  label: string;
  onChangeData: (arg0: any) => void;
  formData: any;
  errors: any;
  placeholder: string;
  keyProp: string;
  isValidForm?: (data: RevisitType) => void;
};

const InputForm: React.FC<InputFormPros> = ({
  label,
  onChangeData,
  formData,
  errors,
  placeholder,
  keyProp,
  isValidForm = () => {},
}: InputFormPros) => {
  const onChangeHandler = (value: any) => {
    const newFormData = {...formData, [keyProp]: value};
    isValidForm(newFormData);
    onChangeData(newFormData);
  };

  return (
    <FormControl isInvalid={keyProp in errors}>
      <FormControl.Label
        style={{marginBottom: 5}}
        _text={{
          bold: true,
          fontSize: 15,
        }}>
        {label}
      </FormControl.Label>
      <Input
        value={formData[keyProp]}
        placeholder={placeholder}
        size="lg"
        onChangeText={onChangeHandler}
      />
      {keyProp in errors && (
        <FormControl.ErrorMessage>
          {errors[keyProp]?.message}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};

export default InputForm;
