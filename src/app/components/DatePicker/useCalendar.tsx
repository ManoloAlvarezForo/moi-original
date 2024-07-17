import {createContext, useContext, useReducer, useState} from 'react';
// import {DatePickerProps} from './DatePicker';

export interface DatePickerProps {
  onSelectedChange?: (value: any) => void;
  onMonthYearChange?: (value: any) => void;
  onTimeChange?: (value: any) => void;
  onDateChange?: (value: any) => void;
  current?: string;
  selected?: string;
  minimumDate?: string;
  maximumDate?: string;
  selectorStartingYear?: number;
  selectorEndingYear?: number;
  disableDateChange?: boolean;
  isGregorian?: boolean;
  config?: any;
  options?: any;
  mode?: string;
  minuteInterval?: number;
  style?: any;
  utils?: any;
}

export interface DateState {
  activeDate: string;
  selectedDate: string;
  monthOpen: boolean;
  timeOpen: boolean;
  type?: string;
}

const initialState = {
  activeDate: '',
  selectedDate: '',
  monthOpen: true,
  timeOpen: false,
  type: '',
};

const DefaultDatePickerProps = {
  onSelectedChange: () => {},
  onMonthYearChange: () => {},
  onTimeChange: () => {},
  onDateChange: () => {},
  current: '',
  selected: '',
  minimumDate: '',
  maximumDate: '',
  selectorStartingYear: 0,
  selectorEndingYear: 0,
  disableDateChange: false,
  isGregorian: false,
  config: {},
  options: {},
  minuteInterval: 1,
  style: {},
  state: initialState,
  mode: 'datepicker',
  utils: {},
};

const CalendarContext = createContext<DatePickerProps>(DefaultDatePickerProps);

export const useCalendar = () => {
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'set':
        return {...state, ...action};
      case 'toggleMonth':
        return {...state, monthOpen: !state.monthOpen};
      case 'toggleTime':
        return {...state, timeOpen: !state.timeOpen};
      default:
        throw new Error('Unexpected action');
    }
  };

  const [state] = useReducer(reducer, initialState);
  const [utils, setUtils] = useState<any>();

  const contextValue = useContext(CalendarContext);
  return {contextValue, CalendarContext, state, setUtils, utils};
};
