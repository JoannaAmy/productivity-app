import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { auth, EnrichedSession  } from '@/auth';

export async function GET(request: Request) {
  const session = (await auth()) as EnrichedSession;
  // const session = await auth();

  console.log('Session inside the route ', session);

  if (!session) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const clientId = process.env.AUTH_GOOGLE_ID;
  const clientSecret = process.env.AUTH_GOOGLE_SECRET;
  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;

  const oauth2Client = new OAuth2Client({
    clientId,
    clientSecret,
  });

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  // provider token to authenticate with the api
  const calendar = google.calendar({
    version: 'v3',
    auth: oauth2Client,
  });

  // use the google calendar api to access the calendar
  const calendarRes = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events = calendarRes.data.items;
  if (events?.length) {
    console.log('Upcoming 10 events:');
  } else {
    console.log('No upcoming events found.');
  }

  return Response.json({ events });
}





// import { auth } from "@/auth";
// import prisma from "@/lib/db";
// import GoogleCalendar from "@/lib/googleCalendar";
// import { NextResponse } from "next/server";

// const isTokenExpired = (expiresAt: number) => {
//   return expiresAt * 1000 < Date.now() + 5 * 60 * 1000;
// };

// const refreshAccessToken = async (refreshToken: string) => {
//   const url = "https://oauth2.googleapis.com/token";
//   const params = new URLSearchParams({
//     client_id: process.env.GOOGLE_CLIENT_ID!,
//     client_secret: process.env.GOOGLE_CLIENT_SECRET!,
//     refresh_token: refreshToken,
//     grant_type: "refresh_token",
//   });

//   const response = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: params.toString(),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to refresh access token");
//   }

//   const data = await response.json();
//   return {
//     accessToken: data.access_token,
//     expiresAt: Math.floor(Date.now() / 1000) + data.expires_in,
//   };
// };

// export async function POST() {
//   const session = await auth();
//   if (!session?.user?.id) {
//     return new NextResponse("Unauthorized", { status: 401 });
//   }

//   const account = await prisma.account.findFirst({
//     where: { userId: session.user.id, provider: "google" },
//   });

//   if (
//     !account?.access_token ||
//     !account?.refresh_token ||
//     !account?.expires_at
//   ) {
//     // Return error if essential tokens are missing (user needs to re-auth)
//     return new NextResponse("Calendar connection requires re-authorization.", {
//       status: 400,
//     });
//   }

//   let currentAccessToken = account.access_token;
//   let currentExpiresAt = account.expires_at;

//   // Check and Refresh Token
//   if (isTokenExpired(currentExpiresAt)) {
//     try {
//       const refreshedTokens = await refreshAccessToken(account.refresh_token);

//       // Update the database with the new tokens
//       await prisma.account.update({
//         where: { id: account.id },
//         data: {
//           access_token: refreshedTokens.accessToken,
//           expires_at: refreshedTokens.expiresAt,
//         },
//       });

//       currentAccessToken = refreshedTokens.accessToken;
//       currentExpiresAt = refreshedTokens.expiresAt;
//     } catch (error) {
//       console.error("Token refresh failed:", error);
//       return new NextResponse(
//         "Session expired, please reconnect your calendar.",
//         { status: 401 }
//       );
//     }
//   }

//   // Fetch Calendar Events
//   try {
//     const events = await GoogleCalendar({ access_token: currentAccessToken });

//     // successful connection
//     await prisma.user.update({
//       where: { id: session.user.id },
//       data: { calendarConnected: true },
//     });

//     return new NextResponse(JSON.stringify({ events }), {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error fetching calendar events:", error);
//     return new NextResponse("Failed to fetch calendar events.", {
//       status: 500,
//     });
//   }
// }

