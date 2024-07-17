import React, {useState, useEffect} from 'react';
// import {Text} from 'native-base';
import moment from 'moment';

type CountdownTimerProps = {
  targetDate: string;
  targetTime: string;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  targetTime,
}: CountdownTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    // Fecha y hora objetivo
    const targetDateTime = moment(
      `${targetDate} ${targetTime}`,
      'YYYY-MM-DD HH:mm',
    );

    // Calcula la diferencia de tiempo entre la fecha actual y la fecha objetivo
    const duration = moment.duration(targetDateTime.diff(moment()));

    // Inicializa el texto de tiempo restante
    let formattedTime = '';

    if (duration.asMilliseconds() <= 0) {
      // Si la fecha objetivo ya ha pasado
      formattedTime = 'El evento ya ha pasado';
    } else {
      // Si la fecha objetivo aún no ha pasado
      const days = Math.floor(duration.asDays());
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      if (days > 0) {
        formattedTime = `Dentro de ${days} día${days !== 1 ? 's' : ''}`;
      } else if (hours > 0) {
        formattedTime = `Dentro de ${hours} hora${hours !== 1 ? 's' : ''}`;
      } else if (minutes > 0) {
        formattedTime = `Dentro de ${minutes} minuto${
          minutes !== 1 ? 's' : ''
        }`;
      } else {
        formattedTime = `Dentro de ${seconds} segundo${
          seconds !== 1 ? 's' : ''
        }`;
      }
    }

    setTimeRemaining(formattedTime);
  }, [targetDate, targetTime]);

  return <>{timeRemaining}</>;
};

export default CountdownTimer;
