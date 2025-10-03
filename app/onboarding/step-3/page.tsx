'use client';

import React from 'react';
import Image from 'next/image';
import '../styles/style.css';
import '../styles/stack.css';
import '../styles/header.css';
import { useRouter } from 'next/navigation';

const WelcomePg3: React.FC = () => {
    const router = useRouter()


    const handleLaunch = () => {
        router.push('/dashboard/calendar/events')

    }

    return (
        <div className='pg3-flexbox'>
            <div className="header">
                <div className="title">
                    Zen<span style={{ color: '#7F67BE' }}>Plan</span>
                </div>

                <div className="whole-prog">
                    <div className="step-count">step 3 of 3</div>
                    <div className="progress-container">
                        <div className="step-1 active"></div>
                        <div className="step-2 active"></div>
                        <div className="step-3 active"></div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="head">
                    <div className="logo-container">
                        <Image src="/icons/Group 29.svg" alt="ZenPlan Logo" className="ZP-logo" width={100} height={100} />
                    </div>
                    <div className="title">Stay in the Loop</div>
                    <div className="subtitle">
                        <p>
                            Allow notifications to get timely reminders for tasks and <br />
                            upcoming events right on your desktop.
                        </p>
                    </div>
                </div>

                {/* <div className="wrapper">
                    <div className="one">
                        <div className="notify">3</div>
                        <div className="in-one">SF</div>
                    </div>
                    <div className="two">
                        <ul>
                            <li>Team Meeting</li>
                            <li>&nbsp;&nbsp; Review PR</li>
                        </ul>
                    </div>
                    <div className="three">
                        <ul>
                            <li>Task Complete</li>
                            <li>&nbsp;&nbsp; Review Proposal</li>
                        </ul>
                    </div>
                </div> */}

                <Image
                    src='/icons/step3.png'
                    alt='Step 3 Illustration'
                    width={500}
                    height={300}
                    className='step3-img'
                />

                <div className="checklist">
                    <input type="checkbox" id="checkbox" className="circle-checkbox" />
                    <label htmlFor="checkbox">Stay updated on schedule changes</label>
                </div>

                <div className="email-button">
                    <button
                        className="submit"
                        type="submit"
                        onClick={handleLaunch}
                    >
                        Launch ZenPlan
                    </button>
                </div>

                {/* <div className="footer">
                    <div className="subtitle">
                        <a href="#">
                            <p>
                                <span className="link">Not now</span>
                            </p>
                        </a>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default WelcomePg3;