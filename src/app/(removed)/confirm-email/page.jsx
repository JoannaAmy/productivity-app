import React from "react";

export default function Page ()  {
  return (
    <div style={{ "padding-top": "100px" }}>
      <div className="container">
        <div className="head">
          <div>
            <div className="logo" style={{ position: "relative" }}>
              SF{" "}
              <div
                className="mail"
                style={{ position: "absolute", top: "-29px", right: "-69px" }}
              >
                <img
                  className="mail-icon"
                  style={{ height: "50px" }}
                  src="mail-svgrepo-com.svg"
                  alt
                />
              </div>{" "}
            </div>{" "}
          </div>
          <div className="title" style={{ "padding-top": "20px" }}>
            Check Your Email
          </div>
          <div className="subtitle">
            If an account exists for the email you entered, we've sent a <br />{" "}
            link to reset your password. The link will expire in 60 <br />{" "}
            minutes.
            <p>
              Didn't receive the email? Check your spam folder or contact <br />{" "}
              support if the issue persists.
            </p>
          </div>
          <div
            style={{
              "background-color": "lightgray",
              padding: "15px",
              "border-radius": "10px",
            }}
          >
            {" "}
            <div
              style={{
                "-webkit-text-align": "center",
                "text-align": "center",
                display: "block",
              }}
            >
              Demo: Click the link below to simulate clicking the reset link{" "}
              <br />
              from your email.
            </div>
            <br />
            <a
              href="reset.html"
              style={{
                "-webkit-text-align": "center",
                "text-align": "center",
                display: "block",
                "margin-top": "10px",
                "font-weight": "bold",
              }}
            >
              Reset Your Password ←
            </a>
          </div>
          <a href="SignIn.html">
            <button
              className="submit"
              style={{
                width: "450px",
                "margin-top": "20px",
                "font-weight": "bold",
                "font-size": "20px",
              }}
            >
              Back to Login
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
