/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "../styles/header.css";
import "../styles/style.css";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const WelcomePg: React.FC = () => {
    const router = useRouter();
    const [photo, setPhoto] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { user } = useUser(); // get user details

    // revoke the object URL when the component unmounts or when a new file is selected to avoid memory leak.
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhoto(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleContinue = () => {
        // const formData = new FormData();
        // if (photo) {
        //     formData.append("photo", photo);
        // } else if (clearkImage) {
        //     formData.append("photoUrl", clearkImage);
        // }

        //   Upload photo using clodinary
        router.push("/onboarding/step-2");
    };

    return (
        <>
            <section className="top-head">
                <div className="header">
                    <div className="title">
                        Zen<span style={{ color: "#7F67BE" }}>Plan</span>
                    </div>
                    <div className="whole-prog">
                        <div className="step-count">step 1 of 3</div>
                        <div className="progress-container">
                            <div className="step-1 active"></div>
                            <div className="step-2"></div>
                            <div className="step-3"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="middle-body">
                <div className="parent-container">
                    <div className="logo-container">
                        <Image
                            src="/icons/Group 29.svg"
                            alt="ZenPlan Logo"
                            className="ZP-logo"
                            style={{ position: "relative", left: "-0.4px" }}
                            width={100}
                            height={100}
                        />
                    </div>

                    <div className="title">
                        Welcome to Zen<span style={{ color: "#665298" }}>Plan</span>,{" "}
                        {user?.firstName}!
                    </div>

                    <div className="subtitle">
                        let&apos;s help you set up your workspace in a few steps
                    </div>

                    <button
                        className="photo-setup"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="pr">
                            {previewUrl ? (
                                <img src={previewUrl} alt="profile" className="profile-image" />
                            ) : user?.imageUrl ? (
                                <img
                                    src={user?.imageUrl}
                                    alt="profile"
                                    className="profile-image"
                                />
                            ) : (
                                ""
                            )}

                            <div className="image-overlay">
                                <Image
                                    src="/icons/Group 1.svg"
                                    alt="Profile Setup"
                                    width={55}
                                    height={55}
                                />
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                style={{ display: "none" }}
                            />
                        </div>
                    </button>

                    <div className="subtitle">
                        {previewUrl
                            ? "Profile Photo loaded"
                            : "Upload a profile picture(optional)"}{" "}
                    </div>

                    <button className="submit" type="submit" onClick={handleContinue}>
                        Continue
                    </button>
                </div>
            </section>
        </>
    );
};

export default WelcomePg;
