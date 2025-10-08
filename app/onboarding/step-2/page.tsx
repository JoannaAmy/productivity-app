// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import '../styles/WelcomePg2.css';
// import '../styles/header.css';
// import '../styles/toggle.css';
// import '../styles/style.css';
// import TimeSelect from '../components/TimeSelect';
// import ToggleSelect from '../components/ToggleSelect';
// import TimezoneSelect from '../components/TimezoneSelect';
// import { useRouter } from 'next/navigation';

// const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// const WelcomePg2: React.FC = () => {
//     const router = useRouter()
//     const [activeDays, setActiveDays] = useState<{ [key: string]: boolean }>({});

//     const toggleDay = (day: string) => {
//         setActiveDays((prev) => ({
//             ...prev,
//             [day]: !prev[day]
//         }));
//     };

//     const handleSubmit = () => {
//         // Handle form submission logic here

//          router.push('/onboarding/step-3')
//     }

//     return (
//         <div className="parent-container">
//             <div className="header">
//                 <div className="title">
//                     Zen<span style={{ color: '#7f67be' }}>Plan</span>
//                 </div>
//                 <div className="whole-prog">
//                     <div className="step-count">step 2 of 3</div>
//                     <div className="progress-container">
//                         <div className="step-1 active"></div>
//                         <div className="step-2 active"></div>
//                         <div className="step-3"></div>
//                     </div>
//                 </div>
//             </div>

//             <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', left: '40px' }}>
//                 <div className="logo-container">
//                     <Image
//                         src="/icons/Group 29.svg"
//                         alt="ZenPlan Logo"
//                         className="ZP-logo"
//                         style={{ position: 'relative', left: '-12.4px' }}
//                         width={100}
//                         height={100}
//                     />
//                 </div>
//                 <div className="title">Protect your Time</div>
//                 <div className="subtitle">
//                     Define your working hours so we know when you&apos;re available for
//                     <br />
//                     meetings.
//                 </div>
//             </div>

//             <div className="availability">
//                 <span>
//                     <img className='icon' src='/icons/globe.png' alt="" />
//                     Timezone
//                 </span>
//                 <TimezoneSelect />

//                 <h4>
//                     <img className='icon' src='/icons/clock2.png' alt="" />
//                     Working Hours
//                 </h4>

//                 <div className="days">
//                     {weekdays.map((day) => (
//                         <div className="day" key={day}>
//                             <div className="inner">
//                                 <div>
//                                     <ToggleSelect
//                                         checked={!!activeDays[day]}
//                                         onChange={() => toggleDay(day)}
//                                     />
//                                     <span className="toggle-day">{day}</span>
//                                 </div>

//                                 {activeDays[day] ? (
//                                     <div className="schedule">
//                                         <TimeSelect /> to <TimeSelect />
//                                     </div>
//                                 ) : (
//                                     <div className="unavailable">Unavailable</div>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="email-button">
//                 <button
//                     className="submit"
//                     // type="submit"
//                     onClick={handleSubmit}
//                 >
//                     Continue
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default WelcomePg2;

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
                    <div className="step-count">step 2 of 2</div>
                    <div className="progress-container">
                        <div className="step-1 active"></div>
                        <div className="step-2 active"></div>
                        {/* <div className="step-3 active"></div> */}
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