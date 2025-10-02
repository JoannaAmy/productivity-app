'use client';

import React from 'react';
import Image from 'next/image';
import '../styles/header.css';
import '../styles/style.css';

const WelcomePg: React.FC = () => {
  return (
    <>
      <section className="top-head">
        <div className="header">
          <div className="title">
            Zen<span style={{ color: '#7F67BE' }}>Plan</span>
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
              style={{ position: 'relative', left: '-0.4px' }}
              width={100}
              height={100}
            />
          </div>

          <div className="title">
            Welcome to Zen<span style={{ color: '#665298' }}>Plan</span>, Shaun!
          </div>

          <div className="subtitle">
            let&apos;s help you set up your workspace in a few steps
          </div>

          <div className="photo-setup">
            <div className="pr">
              <Image src="/icons/Group 1.svg" alt="Profile Setup" width={120} height={120} />
            </div>
          </div>

          <div className="subtitle">Upload a profile picture (optional)</div>

          <button className="submit" type="submit">
            Continue
          </button>
        </div>
      </section>
    </>
  );
};

export default WelcomePg;