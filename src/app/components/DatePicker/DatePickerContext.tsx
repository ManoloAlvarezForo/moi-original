import React, {createContext, useContext, useState} from 'react';
import {getToday} from './calendarUtils';

interface DatePickerContext {
  activeDate?: string;
  setActiveDate?: (value: string) => void;
  mode?: string;
  setMode?: (value: string) => void;
  type?: string;
  setType?: (value: string) => void;
  selectedDate?: string;
  setSelectedDate?: (value: string) => void;
  monthOpen?: boolean;
  setMonthOpen?: (value: boolean) => void;
  timeOpen?: boolean;
  setTimeOpen?: (value: boolean) => void;
  options?: any;
  onSelectedChange?: (value: any) => void;
  onMonthYearChange?: (value: any) => void;
  onTimeChange?: (value: any) => void;
  onDateChange?: (value: any) => void;
  disableDateChange?: boolean;
  setDisableDateChange?: (value: any) => void;
}

const initialState: DatePickerContext = {
  activeDate: '',
  setActiveDate: (_: string) => {},
  mode: '',
  setMode: (_: string) => {},
  type: '',
  setType: (_: string) => {},
  selectedDate: '',
  setSelectedDate: (_: string) => {},
  monthOpen: false,
  setMonthOpen: (_: boolean) => {},
  timeOpen: false,
  setTimeOpen: (_: boolean) => {},
  options: {},
  onSelectedChange: (_: any) => {},
  onMonthYearChange: (_: any) => {},
  onTimeChange: (_: any) => {},
  onDateChange: (_: any) => {},
};

const Context = createContext<DatePickerContext>(initialState);

export const DatePickerProvider = ({
  children,
  options,
  onSelectedChange,
  onMonthYearChange,
  onTimeChange,
  onDateChange,
  timeOpen: timeOpenProp,
}: any) => {
  const [activeDate, setActiveDate] = useState<string>(getToday());
  const [mode, setMode] = useState<string>('datepicker');
  const [type, setType] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>(getToday());
  const [monthOpen, setMonthOpen] = useState<boolean>();
  const [timeOpen, setTimeOpen] = useState<boolean>(timeOpenProp);
  const [disableDateChange, setDisableDateChange] = useState<boolean>();
  return (
    <Context.Provider
      value={{
        activeDate,
        setActiveDate,
        selectedDate,
        setSelectedDate,
        monthOpen,
        setMonthOpen,
        timeOpen,
        setTimeOpen,
        options,
        onSelectedChange,
        onMonthYearChange,
        onTimeChange,
        onDateChange,
        type,
        setType,
        mode,
        setMode,
        disableDateChange,
        setDisableDateChange,
      }}>
      {children}
    </Context.Provider>
  );
};

export const useDatePickerContext = (): DatePickerContext =>
  useContext(Context);
