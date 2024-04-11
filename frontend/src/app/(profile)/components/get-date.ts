const currentDate = new Date();

const hours = currentDate.getUTCHours();
const minutes = currentDate.getUTCMinutes();

const offsetMinutes = currentDate.getTimezoneOffset();

const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
const offsetMinutesRemainder = Math.abs(offsetMinutes % 60);

const offsetSign = offsetMinutes < 0 ? '+' : '-';

const offsetFormatted = `${offsetSign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutesRemainder.toString().padStart(2, '0')}`;

export const currentTimeFormatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} (UTC ${offsetFormatted})`;
