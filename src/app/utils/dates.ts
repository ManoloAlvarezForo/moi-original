import moment from 'moment';

export const capitalizeText = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const getCountDownTimer = (targetDate: string, targetTime: string) => {
  // Combina la fecha y la hora en un formato reconocible por moment.js

  const dateObject = new Date(targetTime);

  // Obtener la hora en formato de 24 horas (HH:mm)
  const hora = dateObject.toLocaleTimeString('en-US', {hour12: false});

  const targetDateTime = moment(`${targetDate} ${hora}`, 'YYYY-MM-DD HH:mm');
  // Obtiene la diferencia de tiempo entre la fecha objetivo y el momento actual
  const duration = moment.duration(targetDateTime.diff(moment()));

  // Verifica si la fecha objetivo ya ha pasado
  if (duration.asMilliseconds() <= 0) {
    return 'El evento ya ha pasado';
  }

  // Formatea la diferencia de tiempo en días, horas, minutos y segundos
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  let formattedTime = '';
  if (days > 0) {
    formattedTime = `Dentro de ${days} día${days !== 1 ? 's' : ''}`;
  } else if (hours > 0) {
    formattedTime = `Dentro de ${hours} hora${hours !== 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    formattedTime = `Dentro de ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
  } else {
    formattedTime = `Dentro de ${seconds} segundo${seconds !== 1 ? 's' : ''}`;
  }

  return formattedTime;
};
