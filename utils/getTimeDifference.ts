export default function getTimeDifference(startDate: Date, endDate?: Date) {
  const laterDate = endDate ?? new Date();

  const secs = (laterDate.getTime() - startDate.getTime()) / 1000;

  let time = secs / 3600;
  let period = "hrs";

  if (time < 1) {
    time = secs / 60;
    period = "minutes";
  }

  if (time > 24) {
    time = time / 24;
    period = "days";
  }

  return `${Math.floor(time)} ${period} ago`;
}
