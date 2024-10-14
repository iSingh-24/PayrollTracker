const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const printTotalHours = (schedule) => {
  let totalHoursFrac = 0;

  for (let day in schedule) {
    const dailyHours = schedule[day].totalFracHours;

    totalHoursFrac += dailyHours;
  }

  return Number(totalHoursFrac).toFixed(2);
};

const TotalHoursCalc = (startTime, endTime) => {
  const start = new Date(`1940-03-01T${startTime}`);
  const end = new Date(`1940-03-01T${endTime}`);

  const totalHoursMilli = end - start;

  const totalHours = totalHoursMilli / (1000 * 60 * 60);

  const hours = Math.floor(totalHours); //this will give you the hours as a whole
  const calcMinutes = Math.round((totalHours - hours) * 60);
  const minutes = calcMinutes < 10 ? `0${calcMinutes}` : calcMinutes;

  return `${hours}:${minutes}`;
};

const TotalHoursFraction = (hours) => {
  const [totalHours, totalMinutes] = hours.split(":");

  const fractionedMinutes =
    Number(totalMinutes) === 0 ? "0.0" : (Number(totalMinutes) / 60).toString();

  return `${totalHours}.${fractionedMinutes.split(".")[1]}`;
};

export { TotalHoursCalc, TotalHoursFraction, printTotalHours, daysOfWeek };
