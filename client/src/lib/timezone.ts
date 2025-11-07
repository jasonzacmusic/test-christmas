export interface TimeZoneInfo {
  name: string;
  offset: number;
  abbr: string;
}

export const TIME_ZONES: TimeZoneInfo[] = [
  { name: "Indian Standard Time", offset: 5.5, abbr: "IST" },
  { name: "Pacific Time", offset: -8, abbr: "PST" },
  { name: "Mountain Time", offset: -7, abbr: "MST" },
  { name: "Central Time", offset: -6, abbr: "CST" },
  { name: "Eastern Time", offset: -5, abbr: "EST" },
  { name: "British Time", offset: 0, abbr: "GMT" },
  { name: "Central European Time", offset: 1, abbr: "CET" },
  { name: "Eastern European Time", offset: 2, abbr: "EET" },
  { name: "Middle East Time", offset: 3, abbr: "MSK" },
  { name: "China Standard Time", offset: 8, abbr: "CST" },
  { name: "Japan Standard Time", offset: 9, abbr: "JST" },
  { name: "Australian Eastern Time", offset: 10, abbr: "AEST" },
];

export interface ConvertedTime {
  time: string;
  dayOffset: number;
}

export function convertTime(istTime: string, targetOffset: number): ConvertedTime {
  const [time, period] = istTime.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  
  let hour24 = hours;
  if (period === 'PM' && hours !== 12) hour24 += 12;
  if (period === 'AM' && hours === 12) hour24 = 0;
  
  const istOffset = 5.5;
  const offsetDiff = targetOffset - istOffset;
  
  const totalMinutes = hour24 * 60 + minutes + offsetDiff * 60;
  
  let dayOffset = 0;
  let adjustedMinutes = totalMinutes;
  
  if (adjustedMinutes < 0) {
    dayOffset = Math.floor(adjustedMinutes / (24 * 60));
    adjustedMinutes = adjustedMinutes % (24 * 60);
    if (adjustedMinutes < 0) adjustedMinutes += 24 * 60;
  } else if (adjustedMinutes >= 24 * 60) {
    dayOffset = Math.floor(adjustedMinutes / (24 * 60));
    adjustedMinutes = adjustedMinutes % (24 * 60);
  }
  
  const newHour24 = Math.floor(adjustedMinutes / 60);
  const newMinutes = Math.floor(adjustedMinutes % 60);
  
  const hour12 = newHour24 === 0 ? 12 : newHour24 > 12 ? newHour24 - 12 : newHour24;
  const newPeriod = newHour24 >= 12 ? 'PM' : 'AM';
  
  return {
    time: `${hour12}:${newMinutes.toString().padStart(2, '0')} ${newPeriod}`,
    dayOffset
  };
}

export function getUserTimeZone(): TimeZoneInfo {
  const offsetHours = -new Date().getTimezoneOffset() / 60;
  
  const closestTz = TIME_ZONES.reduce((prev, curr) => {
    return Math.abs(curr.offset - offsetHours) < Math.abs(prev.offset - offsetHours)
      ? curr
      : prev;
  });
  
  return closestTz;
}
