// utils/calendarLinks.js
export function generateGoogleCalendarLink(event: { title: string; description: string; location: string; startDateTime: string; endDateTime: string; }) {
  const { title, description, location, startDateTime, endDateTime } = event;
  const start = encodeURIComponent(startDateTime.replace(/-|:|\.\d\d\d/g, ""));
  const end = encodeURIComponent(endDateTime.replace(/-|:|\.\d\d\d/g, ""));
  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&sf=true&output=xml`;

  return url;
}

export function generateOutlookCalendarLink(event: { title: string; description: string; location: string; startDateTime: string; endDateTime: string; }) {
  const { title, description, location, startDateTime, endDateTime } = event;
  const start = encodeURIComponent(startDateTime);
  const end = encodeURIComponent(endDateTime);
  const url = `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description)}&startdt=${start}&enddt=${end}&location=${encodeURIComponent(location)}`;

  return url;
}

export function generateAppleCalendarLink(event: { title: string; description: string; location: string; startDateTime: string; endDateTime: string; }) {
  const { title, description, location, startDateTime, endDateTime } = event;
  const start = new Date(startDateTime).toISOString().replace(/-|:|\.\d\d\d/g, "");
  const end = new Date(endDateTime).toISOString().replace(/-|:|\.\d\d\d/g, "");
  const url = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0D%0AVERSION:2.0%0D%0ABEGIN:VEVENT%0D%0AURL:${encodeURIComponent(location)}%0D%0ADTSTART:${start}%0D%0ADTEND:${end}%0D%0ASUMMARY:${encodeURIComponent(title)}%0D%0ADESCRIPTION:${encodeURIComponent(description)}%0D%0AEND:VEVENT%0D%0AEND:VCALENDAR`;

  return url;
}

export function generateICalLink(event: { title: string; description: string; location: string; startDateTime: string; endDateTime: string; }) {
  const { title, description, location, startDateTime, endDateTime } = event;
  const start = new Date(startDateTime).toISOString().replace(/-|:|\.\d\d\d/g, "");
  const end = new Date(endDateTime).toISOString().replace(/-|:|\.\d\d\d/g, "");
  const url = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0D%0AVERSION:2.0%0D%0ABEGIN:VEVENT%0D%0AURL:${encodeURIComponent(location)}%0D%0ADTSTART:${start}%0D%0ADTEND:${end}%0D%0ASUMMARY:${encodeURIComponent(title)}%0D%0ADESCRIPTION:${encodeURIComponent(description)}%0D%0AEND:VEVENT%0D%0AEND:VCALENDAR`;

  return url;
}

export function generateYahooCalendarLink(event: { title: string; description: string; location: string; startDateTime: string; endDateTime: string; }) {
  const { title, description, location, startDateTime, endDateTime } = event;
  const start = encodeURIComponent(new Date(startDateTime).toISOString().replace(/-|:|\.\d\d\d/g, ""));
  const end = encodeURIComponent(new Date(endDateTime).toISOString().replace(/-|:|\.\d\d\d/g, ""));
  const url = `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${encodeURIComponent(title)}&st=${start}&et=${end}&desc=${encodeURIComponent(description)}&in_loc=${encodeURIComponent(location)}`;

  return url;
}
