import React, { useState } from 'react';
import linkIcon from './icons/link.png';
import copyIcon from './icons/copy.png';
import './Calendar.css';

function BookingLists() {
  const [showRight1, setShowRight1] = useState(false);
  const [showRight2, setShowRight2] = useState(false);
  const [showRight3, setShowRight3] = useState(false);

  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);
  const [copied3, setCopied3] = useState(false);

  const handleCopy = (link, setCopied) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="booking-lists">
        <div className="meeting-types">
          <h3>Meeting types and booking links</h3>
          <div className="types">
            {/* First type */}
            <div className="type">
              <div className="left">
                <label style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '50px',
                  height: '28px'
                }}>
                  <input
                    type="checkbox"
                    style={{ opacity: 0, width: 0, height: 0 }}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setShowRight1(checked);
                      e.target.nextSibling.style.backgroundColor = checked ? '#665298' : '#ccc';
                      e.target.nextSibling.firstChild.style.transform = checked ? 'translateX(22px)' : 'translateX(0)';
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: '#ccc',
                    transition: '0.4s',
                    borderRadius: '34px'
                  }}>
                    <span style={{
                      position: 'absolute',
                      height: '22px',
                      width: '22px',
                      left: '3px',
                      bottom: '3px',
                      backgroundColor: 'white',
                      transition: '0.4s',
                      borderRadius: '50%'
                    }} />
                  </span>
                </label>
                <span>45 mins consultation</span>
              </div>
              {showRight1 && (
                <div className="right">
                  <span>https://todoapp.com/book/45min</span>
                  <button onClick={() => handleCopy('https://todoapp.com/book/45min', setCopied1)}>
                    <img src={copyIcon} alt="" /> {copied1 ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              )}
            </div>

            {/* Second type */}
            <div className="type">
              <div className="left">
                <label style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '50px',
                  height: '28px'
                }}>
                  <input
                    type="checkbox"
                    style={{ opacity: 0, width: 0, height: 0 }}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setShowRight2(checked);
                      e.target.nextSibling.style.backgroundColor = checked ? '#665298' : '#ccc';
                      e.target.nextSibling.firstChild.style.transform = checked ? 'translateX(22px)' : 'translateX(0)';
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: '#ccc',
                    transition: '0.4s',
                    borderRadius: '34px'
                  }}>
                    <span style={{
                      position: 'absolute',
                      height: '22px',
                      width: '22px',
                      left: '3px',
                      bottom: '3px',
                      backgroundColor: 'white',
                      transition: '0.4s',
                      borderRadius: '50%'
                    }} />
                  </span>
                </label>
                <span>1 hour Deep Dive</span>
              </div>
              {showRight2 && (
                <div className="right">
                  <span>https://todoapp.com/book/1hour</span>
                  <button onClick={() => handleCopy('https://todoapp.com/book/1hour', setCopied2)}>
                    <img src={copyIcon} alt="" /> {copied2 ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              )}
            </div>

            {/* Third type */}
            <div className="type">
              <div className="left">
                <label style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '50px',
                  height: '28px'
                }}>
                  <input
                    type="checkbox"
                    style={{ opacity: 0, width: 0, height: 0 }}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setShowRight3(checked);
                      e.target.nextSibling.style.backgroundColor = checked ? '#665298' : '#ccc';
                      e.target.nextSibling.firstChild.style.transform = checked ? 'translateX(22px)' : 'translateX(0)';
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: '#ccc',
                    transition: '0.4s',
                    borderRadius: '34px'
                  }}>
                    <span style={{
                      position: 'absolute',
                      height: '22px',
                      width: '22px',
                      left: '3px',
                      bottom: '3px',
                      backgroundColor: 'white',
                      transition: '0.4s',
                      borderRadius: '50%'
                    }} />
                  </span>
                </label>
                <span>15 mins quick chat</span>
              </div>
              {showRight3 && (
                <div className="right">
                  <span>https://todoapp.com/book/15min</span>
                  <button onClick={() => handleCopy('https://todoapp.com/book/15min', setCopied3)}>
                    <img src={copyIcon} alt="" /> {copied3 ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="integration-settings">
          <h3>Integration Settings</h3>
          <div className="i-s-card">
            <h4>Google Calendar Integration</h4>
            <button>
              <img src={linkIcon} alt="" />
              Connected Google Calendar
            </button>
            <span>Sync events with your Google Calendar</span>
            <h4 className="email">Email Confirmations</h4>
            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '28px' }}>
              <input
                type="checkbox"
                style={{ opacity: 0, width: 0, height: 0 }}
                onChange={(e) => {
                  e.target.nextSibling.style.backgroundColor = e.target.checked ? '#665298' : '#ccc';
                  e.target.nextSibling.firstChild.style.transform = e.target.checked ? 'translateX(22px)' : 'translateX(0)';
                }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: '#ccc',
                transition: '0.4s',
                borderRadius: '34px'
              }}>
                <span style={{
                  position: 'absolute',
                  height: '22px',
                  width: '22px',
                  left: '3px',
                  bottom: '3px',
                  backgroundColor: 'white',
                  transition: '0.4s',
                  borderRadius: '50%'
                }} />
              </span>
            </label>
            <span>Send automatic confirmation email to guests</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingLists;