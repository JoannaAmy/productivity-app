import React, { useState } from 'react';
import './Settings.css'
import ToggleSelect from './components/ToggleSelect'
import { useNavigate } from 'react-router-dom';

function Settings() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('Jane Doe');
    const [userEmail, setUserEmail] = useState('jane@example.com');

    const [newName, setNewName] = useState(userName);
    const [newEmail, setNewEmail] = useState(userEmail);

    return (
    <>
        <div className="settings-page">
            <div className="settings-head">
                <div className="info">
                    <div className="profile-img">
                        <img src="" alt="" />
                        <span className='user-fname'>{userName.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="profile-info">
                        <h5>{userName}</h5>
                        <span>{userEmail}</span>
                    </div>
                </div>
                <div className="btn-container">
                    <button className="primary-btn">Upload new picture</button>
                </div>
            </div>
            <hr />
            <div className="input-box">
                <div className="username">
                    <label htmlFor="name">Full Name</label>
                    <input 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder='Jane Doe' type="text" id='name' />
                </div>
                <div className="usermail">
                    <label htmlFor="email">Email Address</label>
                    <input 
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder='janedoe@gmail.com' type="email" id='email' />
                </div>
            </div>
            <hr />
            <div className="notif-settings">
                <h3>Notifications</h3>
                <div className="notif-setting">
                    <div className="setting-desc">
                        <h5>Email Notifications</h5>
                        <p>Get emails to find out what’s going on when you’re not online.</p>
                    </div>
                    <div className="toggle-setting">
                        <ToggleSelect />
                    </div>
                </div>
                <div className="notif-setting">
                    <div className="setting-desc">
                        <h5>Push Notifications</h5>
                        <p>Get push notification on desktop or mobile device.</p>
                    </div>
                    <div className="toggle-setting">
                        <ToggleSelect />
                    </div>
                </div>
                <hr />
                <div className="close-btns">
                    <button className="sec-btn" onClick={() => navigate('/calendar/events')}>Cancel</button>
                    <button className='primary-btn' 
                        onClick={() => {
                            setUserName(newName);
                            setUserEmail(newEmail);
                        }}
                    >Save changes</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Settings
