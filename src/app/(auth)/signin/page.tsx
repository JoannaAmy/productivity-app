"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import "./signin.css";

export default function Page() {
  const [googleLoading, setGoogleLoading] = useState(false);

  return (
    <div className="container sigin-in-container-890">
      <div className="head">
        <div className="logo">SF</div>
        <div className="title">SyncFlow</div>
        <div className="subtitle">Sign in to your account</div>
      </div>

      <section>
        <div className="form">
          <div className="divider">
            <span>Choose a sign in option</span>
          </div>

          <div className="sign-in-options">
            {/* Google */}
            <button
              className="accounts"
              onClick={() => {
                setGoogleLoading(true);
                signIn("google", { callbackUrl: "/dashboard" });
              }}
            >
              <Image
                src="/google-logo-search-new-svgrepo-com.svg"
                alt="Google logo"
                className="logo"
                width={10}
                height={10}
              />
              {googleLoading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                "Continue with Google"
              )}
            </button>

            {/* Microsoft (optional — add provider in [...nextauth].ts first) */}
            {/* <button
              className="accounts"
              onClick={() => signIn("microsoft", { callbackUrl: "/step1" })}
            >
              <Image
                src="/microsoft-svgrepo-com.svg"
                alt="Microsoft logo"
                className="logo"
                width={10}
                height={10}
              />
              Continue with Microsoft
            </button> */}

            {/* Apple (optional — add provider in [...nextauth].ts first) */}
            {/* <button
              className="accounts"
              onClick={() => signIn("apple", { callbackUrl: "/step1" })}
            >
              <Image
                src="/apple-logo-svgrepo-com.svg"
                alt="Apple logo"
                className="logo"
                width={10}
                height={10}
              />
              Continue with Apple
            </button> */}
          </div>
        </div>

        <section className="footer">
          <div className="footer-content">
            <p>
              <span className="link">New to SyncFlow? </span>
              <span className="highlight">
                <Link href="/signup">Sign up</Link>
              </span>
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
