export const dateFormatter = (value: any) => {
  // Formatted to be month/day; display year only in the first label]
  // Get hours from milliseconds
  const hours = value / (1000 * 60 * 60);
  const absoluteHours = Math.floor(hours);

  // Get remainder from hours and convert to minutes
  const minutes = (hours - absoluteHours) * 60;
  const absoluteMinutes = Math.floor(minutes);
  const m = absoluteMinutes;

  // Get remainder from minutes and convert to seconds
  const seconds = (minutes - absoluteMinutes) * 60;
  const absoluteSeconds = Math.floor(seconds);
  const s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

  const milliseconds = (seconds - absoluteSeconds) * 60;
  const absoluteMilliseconds = Math.floor(milliseconds);
  const ms =
    absoluteMilliseconds > 9
      ? absoluteMilliseconds
      : '0' + absoluteMilliseconds;

  return `${m}:${s}:${ms}`;
};
