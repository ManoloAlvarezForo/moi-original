import SelectMain from './CustomSelect';
import type {
  ISelectProps,
  ISelectItemProps,
} from 'native-base/src/components/primitives/Select/types';
import SelectItem from 'native-base/src/components/primitives/Select/SelectItem';
import {MutableRefObject, ReactElement} from 'react';

type IMoiSelectProps = ISelectProps & {
  leftIcon?: ReactElement;
};

type IMoiSelectItemProps = ISelectItemProps & {
  label: string;
  value: string;
};

type IMoiSelectComponentType = ((
  props: IMoiSelectProps & {ref?: MutableRefObject<any>},
) => JSX.Element) & {
  Item: React.MemoExoticComponent<
    (props: IMoiSelectItemProps & {ref?: MutableRefObject<any>}) => JSX.Element
  >;
};

const SelectTemp: any = SelectMain;
SelectTemp.Item = SelectItem;

const MoiSelect = SelectTemp as IMoiSelectComponentType;

export default MoiSelect;
export type {IMoiSelectProps, IMoiSelectItemProps, IMoiSelectComponentType};
