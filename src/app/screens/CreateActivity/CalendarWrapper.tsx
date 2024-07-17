import {useColorMode, useTheme} from 'native-base';
import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales.en = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar.',
    'Abr.',
    'May.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dic.',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'],
};

LocaleConfig.defaultLocale = 'en';

type CalendarWrapperProps = {
  onDayPressHandler: (value: any) => void;
  formData: any;
  selectedDateProp?: string;
  keyProp: string;
};

export const CalendarWrapper: React.FC<CalendarWrapperProps> = ({
  onDayPressHandler,
  formData,
  keyProp,
}: CalendarWrapperProps) => {
  const themeExtension = {};
  const [selectedDate, setSelectedDate] = useState(formData[keyProp]);
  const {colorMode} = useColorMode();
  const {colors} = useTheme();
  const gray50 = colors.coolGray[50];
  const primary = colors.primary[600];
  const isDark = colorMode === 'dark';

  const theme = {
    arrowColor: primary,
    calendarBackground: isDark ? '#3f3f46' : gray50,
    textSectionTitleColor: primary,
    selectedDayBackgroundColor: 'yellow',
    selectedDayTextColor: gray50,
    todayTextColor: isDark ? 'yellow' : 'red',
    monthTextColor: isDark ? 'white' : 'black',
    textDisabledColor: '#adadad',
    dayTextColor: isDark ? 'white' : 'black',
    //   textDayFontSize: 11,
    //   textDayHeaderFontSize: 12,
    //   textMonthFontSize: 10,
  };

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    onDayPressHandler({...formData, [keyProp]: day.dateString});
  };
  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: '#FF6D40', // Puedes cambiar el color según tu preferencia
    },
  };

  return (
    <Calendar
      markedDates={markedDates}
      onDayPress={handleDayPress}
      theme={{...theme, ...themeExtension}}
    />
  );
};

// arrowColor: Color de las flechas de navegación.
// calendarBackground: Color de fondo del calendario.
// textSectionTitleColor: Color del título de la sección de texto.
// selectedDayBackgroundColor: Color de fondo del día seleccionado.
// selectedDayTextColor: Color del texto del día seleccionado.
// todayTextColor: Color del texto del día actual.
// dayTextColor: Color del texto del día.
// textDisabledColor: Color del texto deshabilitado.
// monthTextColor: Color del texto del mes.
// textDayFontFamily: Familia de fuentes para el texto del día.
// textMonthFontFamily: Familia de fuentes para el texto del mes.
// textDayHeaderFontFamily: Familia de fuentes para el texto del encabezado del día.
// textDayFontSize: Tamaño de fuente para el texto del día.
// textMonthFontSize: Tamaño de fuente para el texto del mes.
// textDayHeaderFontSize: Tamaño de fuente para el texto del encabezado del día.
