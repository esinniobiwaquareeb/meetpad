import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentHour() {
  const currentHour = new Date().getHours();

  if (currentHour < 12) return "Good Morning, ";

  if (currentHour < 18) return "Good Afternoon, ";

  return "Good Evening,";
}

export function getTodaysDate() {
  return new Date().toDateString();
}

export const getCurrentDateTime = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

export function formatDateString(dateString: string) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Parse the input date string
  const dateParts = dateString.split("-");
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Months are zero-indexed
  const day = parseInt(dateParts[2], 10);

  // Create a Date object
  const date = new Date(year, month, day);

  // Get the day of the week, month name, and day of the month
  const dayOfWeek = daysOfWeek[date.getDay()];
  const monthName = monthsOfYear[month];
  const dayOfMonth = date.getDate();

  // Format the date string
  return `${monthName} ${dayOfMonth}, ${year}`;
}

export function formatISODate(date: Date) {
  return new Date(date).toISOString().slice(0, 10);
}

type TimeSlot = {
  12: string;
  24: string;
};

export function generateTimeSlots(
  startTime: string,
  endTime: string,
  duration: number
): TimeSlot[] {
  // Helper function to convert time in "HH:MM" format to minutes
  function timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  // Helper function to convert minutes to "HH:MM" format
  function minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  }

  // Helper function to convert time from 24-hour format to 12-hour format
  function to12HourFormat(time: string): string {
    let [hours, minutes] = time.split(":").map(Number);
    const suffix = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; // Convert "0" or "12" to "12"
    return `${hours}:${minutes.toString().padStart(2, "0")}${suffix}`;
  }

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const timeSlots: TimeSlot[] = [];

  for (
    let currentMinutes = startMinutes;
    currentMinutes <= endMinutes;
    currentMinutes += duration
  ) {
    const time24 = minutesToTime(currentMinutes);
    const time12 = to12HourFormat(time24);
    timeSlots.push({ 12: time12, 24: time24 });
  }

  timeSlots.pop();

  return timeSlots;
}

export function convert24HourTo12Hour(time24: string): string {
  // Split the input time string into hours and minutes
  const [hour, minute] = time24.split(":").map(Number);

  // Determine the period (AM/PM)
  const period = hour >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  let hour12 = hour % 12;
  hour12 = hour12 === 0 ? 12 : hour12; // Convert 0 to 12 for 12 AM/PM

  // Format hours and minutes to ensure they are always two digits
  const formattedHour = String(hour12).padStart(2, "0");
  const formattedMinute = String(minute).padStart(2, "0");

  // Return the formatted 12-hour time string with AM/PM
  return `${formattedHour}:${formattedMinute} ${period}`;
}

export function getCurrentDateFormatted() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function convertTo24Hour(timeString: string): string {
  // Extract the components of the time
  const modifier = timeString.includes("am") ? "am" : "pm";
  const time = timeString.includes("m") ? timeString.slice(0, -2) : timeString;
  // const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  // Convert the hours to 24-hour format
  if (modifier === "am" && hours === 12) {
    hours = 0;
  } else if (modifier === "pm" && hours !== 12) {
    hours += 12;
  }

  // Format the hours and minutes to ensure two digits
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}

export function validateEmail(email: string) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export const generateRandomString = (length: number = 10) =>
  Math.random().toString(20).replace(".", "M");
// export function validatePhoneNmber(phoneNo: string) {
//   return String(phoneNo)
//     .toLowerCase()
//     .match(
//       /^[\+]?[0-9]{0,3}\W?+[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
//     );
// }

export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    year: "numeric", // numeric year (e.g., '2023')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export const formatCurrencyToUSD = (amount: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseFloat(amount));
};
