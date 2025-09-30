"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function OnboardingStep1() {
  const { data: session } = useSession();
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session?.user?.image && !previewUrl) {
      setPreviewUrl(session.user.image);
    }
  }, [session, previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleContinue = async () => {
    const formData = new FormData();
    if (photo) {
      formData.append("photo", photo);
    } else if (session?.user?.image) {
      formData.append("photoUrl", session.user.image);
    }

    await fetch("/api/onboarding/step1", {
      method: "POST",
      body: formData,
    });

    // Go to step 2
    window.location.href = "/step2";
  };

  return (
    <div className="container">
      <div className="head">
        <div className="logo">SF</div>
        <div className="title">Welcome to SyncFlow, {session?.user?.name}!</div>
        <div className="subtitle">
          Let&apos;s get your workspace set up in just a few steps
        </div>
      </div>
      {/* <div className="camera" onClick={() => fileInputRef.current?.click()}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        {previewUrl ? (
          <Image
            className="camera-icon"
            src={previewUrl}
            alt="camera-icon"
            width={60}
            height={60}
          />
        ) : (
          <div />
        )}
        <div className="cursor-pointer">
          <Image
            className="camera-icon"
            src={"camera-svgrepo-com.svg"}
            alt="camera-icon"
            width={60}
            height={60}
          />
        </div>
      </div> */}
      <div className="camera" onClick={() => fileInputRef.current?.click()}>
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="profile"
            fill
            className="profile-image"
          />
        ) : (
          <div className="placeholder" />
        )}

        <Image
          className="camera-icon"
          src="camera-svgrepo-com.svg"
          alt="camera-icon"
          width={30}
          height={30}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </div>
      <br />
      <p> </p>

      <br />
      <span className="subtitle">
        {previewUrl
          ? "Profile Photo loaded"
          : "Upload a profile picture(optional)"}{" "}
      </span>
      <button className="submit" onClick={handleContinue}>
        Continue
      </button>
      <section className="scroll-bar">
        <div className="parent-scroll">
          <a href="/step1">
            <div className="scroll-indicator" />
          </a>
          <a href="/step2">
            <div
              className="scroll-indicator"
              style={{ backgroundColor: "lightgray" }}
            />
          </a>
          <a href="/step3">
            <div
              className="scroll-indicator"
              style={{ backgroundColor: "lightgray" }}
            />
          </a>
        </div>
        <br />
        <span className="subtitle">
          <p>step 1 of 3</p>
        </span>
      </section>
    </div>
  );
}
