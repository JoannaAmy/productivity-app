import React from "react";

export default function Page() {
  return (
    <div className="container">
      <div className="head">
        <div className="logo">SF</div>
        <div className="title">Connect Your Digital Life</div>
        <div className="subtitle">
          <p>
            Define your working hours so we know when you're available <br />
            for meetings
          </p>
        </div>
      </div>
      <div className="time-zone">
        <div className="time-zone-title">
          <img src="globe-alt-svgrepo-com.svg" alt /> TimeZone
        </div>
        <div className="time-zone-select">
          <select name="time-zone" id="time-zone-select">
            <option value="GMT">GMT</option>
            <option value="EST">EST</option>
            <option value="PST">PST</option>
            <option value="CET">CET</option>
            {/* Add more time zones as needed */}
          </select>
        </div>
      </div>
      <div className="working-hours">
        <img src="/images/clock-two-svgrepo-com.svg" alt /> Working Hours
      </div>
      <div className="working-hours-select">
        <div className="working-hours-manager">
          <div className="working-hours-title">
            <div className="toggle-container">
              <div className="toggle-switch">
                <input type="checkbox" id="toggle" />
                <label htmlFor="toggle" className="toggle-button" />
              </div>
            </div>
          </div>
          Monday &nbsp;
          <div className="working-hours-option">
            <label htmlFor="start-time">Start Time:</label>
            <input type="time" id="start-time" name="start-time" />
          </div>
          <div className="working-hours-option">
            <label htmlFor="end-time">End Time:</label>
            <input type="time" id="end-time" name="end-time" />
          </div>
        </div>
      </div>
      <br />
      <div className="working-hours-select">
        <div className="working-hours-manager">
          <div className="working-hours-title">
            <div className="toggle-container">
              <div className="toggle-switch">
                <input type="checkbox" id="toggle" />
                <label htmlFor="toggle" className="toggle-button" />
              </div>
            </div>
          </div>
          Tuesday &nbsp;
          <div className="working-hours-option">
            <label htmlFor="start-time">Start Time:</label>
            <input type="time" id="start-time" name="start-time" />
          </div>
          <div className="working-hours-option">
            <label htmlFor="end-time">End Time:</label>
            <input type="time" id="end-time" name="end-time" />
          </div>
        </div>
      </div>
      <br />
      <div className="working-hours-select">
        <div className="working-hours-manager">
          <div className="working-hours-title">
            <div className="toggle-container">
              <div className="toggle-switch">
                <input type="checkbox" id="toggle" />
                <label htmlFor="toggle" className="toggle-button" />
              </div>
            </div>
          </div>
          Wednesday &nbsp;
          <div className="working-hours-option">
            <label htmlFor="start-time">Start Time:</label>
            <input type="time" id="start-time" name="start-time" />
          </div>
          <div className="working-hours-option">
            <label htmlFor="end-time">End Time:</label>
            <input type="time" id="end-time" name="end-time" />
          </div>
        </div>
      </div>
      <br />
      <div className="working-hours-select">
        <div className="working-hours-manager">
          <div className="working-hours-title">
            <div className="toggle-container">
              <div className="toggle-switch">
                <input type="checkbox" id="toggle" />
                <label htmlFor="toggle" className="toggle-button" />
              </div>
            </div>
          </div>
          Thursday &nbsp;
          <div className="working-hours-option">
            <label htmlFor="start-time">Start Time:</label>
            <input type="time" id="start-time" name="start-time" />
          </div>
          <div className="working-hours-option">
            <label htmlFor="end-time">End Time:</label>
            <input type="time" id="end-time" name="end-time" />
          </div>
        </div>
      </div>
      <br />
      <div className="working-hours-select">
        <div className="working-hours-manager">
          <div className="working-hours-title">
            <div className="toggle-container">
              <div className="toggle-switch">
                <input type="checkbox" id="toggle" />
                <label htmlFor="toggle" className="toggle-button" />
              </div>
            </div>
          </div>
          Friday &nbsp;
          <div className="working-hours-option">
            <label htmlFor="start-time">Start Time:</label>
            <input type="time" id="start-time" name="start-time" />
          </div>
          <div className="working-hours-option">
            <label htmlFor="end-time">End Time:</label>
            <input type="time" id="end-time" name="end-time" />
          </div>
        </div>
      </div>
      <br />
      <div className="working-hours-select">
        <div className="working-hours-manager">
          <div className="working-hours-title">
            <div className="toggle-container">
              <div className="toggle-switch">
                <input type="checkbox" id="toggle" />
                <label htmlFor="toggle" className="toggle-button" />
              </div>
            </div>
          </div>
          Saturday &nbsp;
          <div className="working-hours-option" />
          <div className="working-hours-option">off</div>
        </div>
      </div>
      <br />
      <div className="working-hours-select">
        <div className="working-hours-manager">
          <div className="working-hours-title">
            <div className="toggle-container">
              <div className="toggle-switch">
                <input type="checkbox" id="toggle" />
                <label htmlFor="toggle" className="toggle-button" />
              </div>
            </div>
          </div>
          Sunday &nbsp;
          <div className="working-hours-option" />
          <div className="working-hours-option">off</div>
        </div>
      </div>
      <br />
      <button className="submit" type="submit">
        Continue
      </button>
      <section className="scroll-bar">
        <div className="parent-scroll">
          <a href="/step1">
            <div className="scroll-indicator" />
          </a>
          <a href="/step2">
            <div className="scroll-indicator" />
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
          <p>step 2 of 3</p>
        </span>
      </section>
    </div>
  );
}
