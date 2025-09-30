// lib/googlecalendar.js
import { google, calendar_v3 } from "googleapis";
interface GoogleCalendarProps {
  access_token: string | null;
  refresh_token?: string | null;
}

export default async function GoogleCalendar({
  access_token,
  refresh_token,
}: GoogleCalendarProps): Promise<calendar_v3.Schema$Event[]> {
  const oauth2Client = new google.auth.OAuth2();

  oauth2Client.setCredentials({
    access_token,
    refresh_token,
  });

  const calendar: calendar_v3.Calendar = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });

  const res = await calendar.events.list({
    calendarId: "primary",
    eventTypes: ["default"],
    timeMin: new Date().toISOString(),
    timeMax: new Date().toISOString(),
    maxResults: 2500,
    singleEvents: true,
    orderBy: "startTime",
  });

  return res.data.items || [];
}
