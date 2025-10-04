/* eslint-disable @next/next/no-img-element */
"use client"

import '../public/assets/styles/SideBar.css';
import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SignOutButton, useUser } from '@clerk/nextjs';

function SideBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);



    const openCreateEventModal = () => {
        router.push('?modal=create-events');
    };

    const handleCreateClick = () => {
        setShowDropdown(prev => !prev);
    };

    const handleOptionClick = (modalType: string) => {
        router.push(`?modal=${modalType}`);
        setShowDropdown(false);
    };

    const links = [
        { href: `calendar/events`, title: 'Calendar', src: "/icons/calendar.png" },
        { href: `tasks/all`, title: 'Tasks', src: "/icons/tasks.png" },
        { href: `reminders/all`, title: 'Reminders', src: "/icons/reminder.png" }
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const { user } = useUser(); // get user details


    return (
        <div className="sidebar">
            <div className="top-sidebar">
                <h1 className="logo">
                    Zen<span className="logo-purple">Plan</span>
                </h1>
                <div className="create-wrapper" ref={dropdownRef}>
                    <button className="create-btn" onClick={handleCreateClick}>+ Create</button>
                    {showDropdown && (
                        <div className="create-dropdown-sidebar">
                            <button onClick={() => handleOptionClick('create-task')}>Add Task</button>
                            <button onClick={() => handleOptionClick('create-reminder')}>Add Reminder</button>
                            <button onClick={() => handleOptionClick('create-events')}>Add Event</button>
                        </div>
                    )}
                </div>

                <div className="sidebar-options">
                    {links.map(({ href, title, src }) => (
                        <Link
                            key={href}
                            href={`/dashboard/${href}`}
                            className={`sidebar-option-btn ${pathname.includes(href.split("/")[0]) ? 'selected-btn' : ''}`}
                        >
                            <img src={src} alt="" />
                            {title}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="bottom-sidebar">
                <div className="bottom-options">
                    <Link className='sidebar-option-btn' href={"/dashboard/settings"}>
                        <img src='/icons/settings.png' alt="" />
                        Settings
                    </Link>

                    {/* Using Clerk's SignOutButton - link to doc - https://clerk.com/docs/nextjs/reference/components/unstyled/sign-out-button */}
                    <SignOutButton signOutOptions={{ redirectUrl: "/sign-in" }}>
                        <button className='sidebar-option-btn'>
                            <img src='/icons/logout.png' alt="" />
                            Log Out
                        </button>
                    </SignOutButton>
                </div>
                <hr />
                <div className="user">
                    {user?.imageUrl
                        ? <img src={user.imageUrl} alt={user.firstName ?? undefined} />
                        : <div className="img-alternative">{user?.firstName?.charAt(0)}</div>
                    }
                    <h3 className="user-name">{user?.firstName}{' '}{user?.lastName}</h3>
                    {/* <img className="caret" src='/icons/arrow-down-filled.png' alt="" /> */}
                </div>
            </div>
        </div>
    );
}

export default SideBar;
