"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { google } from "googleapis";
import { eventType } from "@/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const Calendar_Scope = "https://www.googleapis.com/auth/calendar.events";

export async function createGoogleCalendarEvent(eventData: eventType) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    //1
    const accessTokenResponse = await (
      await clerkClient()
    ).users.getUserOauthAccessToken(userId, "google");

    const calendarToken = accessTokenResponse.data.find((token) =>
      token?.scopes?.includes(Calendar_Scope)
    );

    const accessToken = calendarToken?.token;

    console.log({ accessTokenResponse, accessToken });

    if (!accessToken) {
      throw new Error(
        "Google Calendar access was not granted. Please reuthenticate and grant access"
      );
    }

    //2
    const authClient = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    authClient.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({
      version: "v3",
      auth: authClient,
    });

    const startDateTime = `${eventData.date}T${eventData.startTime}:00`;
    const endDateTime = `${eventData.date}T${eventData.endTime}:00`;

    const attendees = (eventData.guestList || []).map((email: string) => ({
      email,
    }));

    const newEvent = {
      summary: eventData.title,
      description: eventData.notes || "",
      start: {
        dateTime: startDateTime,
        timeZone: "UTC",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "UTC",
      },
      attendees: attendees,
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: newEvent,
      sendNotifications: true,
    });

    revalidatePath("/dashboard/calendar/events");

    return {
      success: true,
      message: "Event successfully created in Google Calendar!",
      eventId: response.data.id,
      htmlLink: response.data.htmlLink,
    };
  } catch (error) {
    console.error("Google Calendar API Error:", error);

    throw new Error("Failed to create Google Calendar event.");
  }
}

export async function fetchGoogleCalendarEvents(): Promise<eventType[]> {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  try {
    // 1. Get the Google Access Token from Clerk
    const accessTokenResponse = await (
      await clerkClient()
    ).users.getUserOauthAccessToken(userId, "google");

    const calendarToken = accessTokenResponse.data.find((token) =>
      token?.scopes?.includes(Calendar_Scope)
    );

    const accessToken = calendarToken?.token;

    if (!accessToken) {
      throw new Error("Google Calendar read events, access not granted.");
    }

    // 2. Configure the Google OAuth Client
    const authClient = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    authClient.setCredentials({ access_token: accessToken });

    // 3. Initialize the Google Calendar API
    const calendar = google.calendar({ version: "v3", auth: authClient });

    // 4. Fetch the events (using your exact time logic)
    const now = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(now.getMonth() + 1);

    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: now.toISOString(),
      timeMax: oneMonthFromNow.toISOString(),
      maxResults: 10,

      singleEvents: true,
      orderBy: "startTime",
    });

    // 5. Map and return the events (using your exact mapping logic)
    const events: eventType[] =
      response.data.items?.map((item) => ({
        id: item.id as string,
        title: item.summary as string,
        startTime:
          (item.start?.dateTime as string) || (item.start?.date as string),
        endTime: (item.end?.dateTime as string) || (item.end?.date as string),
        htmlLink: item.htmlLink as string,
        organizer: item.organizer?.email as string,

        date: item.start?.dateTime
          ? item.start.dateTime.split("T")[0]
          : (item.start?.date as string),

        // Google Calender does not return the guest list details
        guestList: (item.attendees || [])
          // Map each attendee object to just their email
          .map((attendee) => attendee.email)
          // Filter out any undefined or null emails
          .filter((email): email is string => !!email) as string[],
      })) || [];

    return events;
  } catch (error) {
    console.error("Google Calendar Fetch Error:", error);
    throw new Error("Failed to fetch Google Calendar events.");
  }
}

export async function deleteCalendarEvent(eventId: string) {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  if (!eventId) {
    return { success: false, message: "Missing eventId parameter." };
  }

  try {
    // Get the Google Access Token from Clerk
    const accessTokenResponse = await (
      await clerkClient()
    ).users.getUserOauthAccessToken(userId, "google");

    const calendarToken = accessTokenResponse.data.find((token) =>
      token?.scopes?.includes(Calendar_Scope)
    );

    const accessToken = calendarToken?.token;

    if (!accessToken) {
      return {
        success: false,
        message: "Google Calendar write access not granted.",
      };
    }

    // Configure the Google OAuth Client
    const authClient = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    authClient.setCredentials({ access_token: accessToken });

    // Initialize the Google Calendar API
    const calendar = google.calendar({ version: "v3", auth: authClient });

    // Delete the event
    await calendar.events.delete({
      calendarId: "primary",
      eventId: eventId,
    });

    // Revalidate the calendar page to reflect the deletion
    revalidatePath("/dashboard/calendar");

    return {
      success: true,
      message: `Event ${eventId} successfully deleted from Google Calendar!`,
    };
  } catch (error) {
    console.error("Google Calendar API Deletion Error:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to delete Google Calendar event.";

    return { success: false, message: errorMessage };
  }
}

export async function updateGoogleCalendarEvent(eventData: eventType) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized: User not signed in.");
    }

    // ⭐️ Key Check: Ensure eventId exists for an update operation
    if (!eventData.id) {
        throw new Error("Missing event ID for update operation.");
    }

    try {
        // --- 1. CLERK/GOOGLE SETUP ---
        const accessTokenResponse = await (await clerkClient()).users.getUserOauthAccessToken(userId, 'google');
        const calendarToken = accessTokenResponse.data.find(
            (token) => token?.scopes?.includes(Calendar_Scope)
        );
        const accessToken = calendarToken?.token;

        if (!accessToken) {
            throw new Error("Google Calendar access not granted.");
        }

        const authClient = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
        );

        authClient.setCredentials({ access_token: accessToken });
        const calendar = google.calendar({ version: 'v3', auth: authClient });

        // --- 2. EVENT BODY PREPARATION ---
        const startDateTime = `${eventData.date}T${eventData.startTime}:00`;
        const endDateTime = `${eventData.date}T${eventData.endTime}:00`;


        const attendees = (eventData.guestList || []).map((email: string) => ({ email }));

        // Construct the UPDATED Google Calendar Event object
        const updatedEventBody = {
            summary: eventData.title,
            description: eventData.notes || '',
            start: {
                // Assuming startTime/endTime are ISO strings or combined from date/time fields
                dateTime: startDateTime,
                timeZone: 'UTC', // Keeping your original timezone logic
            },
            end: {
                dateTime: endDateTime,
                timeZone: 'UTC', // Keeping your original timezone logic
            },
            attendees: attendees,
        };

        // --- 3. API CALL: events.update ---
        const response = await calendar.events.update({
            calendarId: 'primary',
            eventId: eventData.id, // ⭐️ Pass the ID of the event to update ⭐️
            requestBody: updatedEventBody,
            sendNotifications: true,
        });

        // 4. Invalidate the cache for the calendar page
        revalidatePath('/dashboard/calendar/events');

        return {
            success: true,
            message: "Event successfully updated in Google Calendar!",
            eventId: response.data.id,
            htmlLink: response.data.htmlLink,
        };

    } catch (error) {
        console.error("Google Calendar API Update Error:", error);
        throw new Error("Failed to update Google Calendar event.");
    }
}