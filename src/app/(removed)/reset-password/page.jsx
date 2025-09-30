import React from "react";

export default function Page ()  {
  return (
    <div className="container">
      <div className="head">
        <div className="logo">SF</div>
        <div className="title">Reset Your Password</div>
        <div className="subtitle">
          Enter your email address and we'll send you a link to reset <br />{" "}
          your password
        </div>
      </div>
      <section>
        <div className="form">
          <form action>
            <div>
              <p>
                <span className="label">Email Address</span>
              </p>
              <input
                className="input"
                type="text"
                placeholder="Enter your email"
                required
              />
            </div>
            <button className="submit" type="submit">
              Reset Password
            </button>
            <div className="subtitle">
              <a className="link" href="SignIn.html">
                Back to Sign In ←
              </a>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
