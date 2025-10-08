// app/not-found.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/calendar/events");
  }, [router]);

  return null; // or return a small message while redirecting
}
