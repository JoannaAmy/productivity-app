"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button
      onClick={() => signOut({ redirect: true, callbackUrl: "/signup" })}
      className="logout-btn"
      style={{backgroundColor: 'blue' }}
    >
      Sign Out
    </button>
  );
}
