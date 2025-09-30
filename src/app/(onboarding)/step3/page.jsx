import React from "react";

export default function Page ()  {
    return (
    <div className="container">
      <div className="head">
        <div className="logo">SF</div>
        <div className="title">Stay In The Loop</div>
        <div className="subtitle">
          <p>
            Allow notifications to get timely reminders for tasks and <br />
            upcoming events right on your desktop.
          </p>
        </div>
      </div>
      <div className="wrapper">
        <div className="one">
          <div className="notify">3</div>
          <div className="in-one">SF</div>
        </div>
        <div className="two">
          <ul>
            <li>Team Meeting</li>
            <li>&nbsp; &nbsp; Review PR</li>
          </ul>
        </div>
        <div className="three">
          <ul>
            <li>Task Complete</li>
            <li>&nbsp; &nbsp; Review Proposal</li>
          </ul>
        </div>
      </div>
      <ul>
        <li>
          <input type="checkbox" />
          Never miss important meetings
        </li>
        <br />
        <li>
          <input type="checkbox" />
          Get notified about deadlines
        </li>
        <br />
        <li>
          <input type="checkbox" />
          Stay updated on project progress
        </li>
      </ul>
      <button className="submit" type="submit">
        Launch SyncFlow
      </button>
      <br />
      <section className="scroll-bar">
        <div className="parent-scroll">
          <a href="/step1">
            <div className="scroll-indicator" />
          </a>
          <a href="/step2">
            <div className="scroll-indicator" />
          </a>
          <a href="/step3">
            <div className="scroll-indicator" />
          </a>
        </div>
        <br />
        <span className="subtitle">
          <p>step 3 of 3</p>
        </span>
      </section>
    </div>
  );
};
