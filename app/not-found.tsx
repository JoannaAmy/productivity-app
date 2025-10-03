// app/not-found.tsx
import { redirect } from "next/navigation";

export default function NotFound() {
  // Redirect all 404s to homepage (or another page)
  redirect("/dashboard/calendar/events");

  return null; // This never renders, because redirect throws
}
