'use client';

import React from 'react';
import Image from 'next/image';
import '../styles/style.css'

const LoginPage: React.FC = () => {
  return (
    <div className="parent-container2">
      {/* Photo Section */}
      <div className="photo-div">
        <Image
          src="/icons/5c03a8a45c6327de7a96dce8bb3c23ce41fa1e35.jpg"
          alt="Description of photo"
          width={700}
          height={700}
          style={{ objectFit: 'cover', width: '100%', height: '100vh' }}
        />
      </div>

      {/* Form Section */}
      <div className="log-in-container">
        <div className="form-container">
          <div className="head">
            <div className="logo-container">
              <Image src="/icons/Group 29.svg" alt="ZenPlan Logo" width={100} height={100} />
            </div>
            <div className="title">
              Zen<span style={{ color: 'black' }}>Plan</span>
            </div>
            <div className="subtitle">Log into your account</div>
          </div>

          <div className="sign-in-options">
            <div>
              <a href="#">
                <button className="accounts">
                  <Image
                    src="/icons/google-logo-search-new-svgrepo-com.svg"
                    alt="Google logo"
                    width={20}
                    height={20}
                    className="google-logo"
                  />
                  Continue with Google
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;