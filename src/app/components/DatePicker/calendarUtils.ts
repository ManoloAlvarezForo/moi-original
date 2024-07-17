import moment from 'moment';

const m = moment();
const config: any = {
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ],
  dayNamesShort: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
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
  selectedFormat: 'DD/MM/YYYY',
  dateFormat: 'DD/MM/YYYY',
  monthYearFormat: 'MM YYYY',
  timeFormat: 'HH:mm',
  hour: 'Hour',
  minute: 'Minute',
  timeSelect: 'Select',
  timeClose: 'Close',
};

export let minimumDate = '01/01/1960';
export let maximumDate = '01/01/2050';

const getDate = (time: any) => moment(time, config.selectedFormat);

const getFormated = (date: any, formatName = 'selectedFormat') =>
  date.format(config[formatName]);

const getFormatedDate = (date = new Date(), format = 'YYYY/MM/DD') =>
  moment(date).format(format);

const getTime = (time: any) => getDate(time).format(config.timeFormat);

const getToday = () => getFormated(m, 'dateFormat');

const getMonthName = (month: string) => config.monthNames[month];

const getYear = (time: any) => {
  return getDate(time).year();
};

const getStringMonth = (time: any) => {
  return moment(time, 'M').format('MMMM');
};

const getMonthYearText = (time: any) => {
  const date = getDate(time);
  const year = date.year();
  const month = date.month();
  return `${month} ${year}`;
};

const checkMonthDisabled = (time: any) => {
  const date = getDate(time);
  let disabled = false;
  if (minimumDate) {
    const lastDayInMonth = date.date(29);
    disabled = lastDayInMonth < getDate(minimumDate);
  }
  if (maximumDate && !disabled) {
    const firstDayInMonth = date.date(1);
    disabled = firstDayInMonth > getDate(maximumDate);
  }
  return disabled;
};

const getMonthDays = (time: any) => {
  let date = getDate(time);
  const currentMonthDays = date.daysInMonth();
  const firstDay = date.date(1);
  const dayOfMonth = firstDay.day() % 7;
  return [
    ...new Array(dayOfMonth),
    ...[...new Array(currentMonthDays)].map((i, n) => {
      const thisDay = date.date(n + 1);
      let disabled = false;
      if (minimumDate) {
        disabled = thisDay < getDate(minimumDate);
      }
      if (maximumDate && !disabled) {
        disabled = thisDay > getDate(maximumDate);
      }

      date = getDate(time);
      return {
        dayString: n + 1,
        day: n + 1,
        date: date.date(n + 1),
        disabled,
      };
    }),
  ];
};

const validYear = (time: any, year: any) => {
  let validDate;
  const date = getDate(time).year(year);
  if (minimumDate && date < getDate(minimumDate)) {
    validDate = minimumDate;
  }
  if (maximumDate && date > getDate(maximumDate)) {
    validDate = maximumDate;
  }
  return validDate;
};

const checkSelectMonthDisabled = (time: any, month: any) => {
  const date = getDate(time);
  const dateWithNewMonth = date.month(month);
  return checkMonthDisabled(getFormated(dateWithNewMonth));
};

const checkYearDisabled = (year: any, next: any) => {
  const y = getDate(next ? maximumDate : minimumDate).year();
  return next ? year >= y : year <= y;
};

const checkArrowMonthDisabled = (time: any, next: any) => {
  const date = getDate(time);
  return checkMonthDisabled(getFormated(date.add(next ? -1 : 1, 'month')));
};

export {
  config,
  getToday,
  getDate,
  getYear,
  getStringMonth,
  getFormatedDate,
  getMonthName,
  getFormated,
  getMonthYearText,
  getTime,
  getMonthDays,
  validYear,
  checkSelectMonthDisabled,
  checkYearDisabled,
  checkArrowMonthDisabled,
};
