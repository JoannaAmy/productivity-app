'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import '../public/assets/styles/CalendarHeader.css';
import { usePathname } from 'next/navigation';
import '../public/assets/styles/Modal.css';
import Image from 'next/image';
import CreateEventsModal from './AppModals/CreateEventsModal'

function CalendarHeader({ }) {

  const pathname = usePathname();



  const links = [
    {
      href: `events`,
      title: 'Events'
    },
    {
      href: `booking-lists`,
      title: 'Booking Lists'
    },
    {
      href: `availability`,
      title: 'Availability'
    },
  ]


  const linkActive = (href: string) => {
    if (pathname.includes(href)) {
      return true
    } else {
      return false
    }
  }

   return (
        <>
            <div className="header">
                <div className="top">
                    <div className="topleft">
                        <h1 className="header-heading">Calendar & Events</h1>
                        <p className="header-text">
                            Manage your schedule and booking availability.
                        </p>
                    </div>
                    <div className="topright">
                        {/* <button className="filter">
                            <Image src='/icons/bars-filter.png' alt="" width={20} height={20} />
                            Filter
                            <Image className="angledown" src='/icons/filter-arrow-down.png' alt="" width={20} height={20} />
                        </button> */}
                        <div className="event-wrapper">
                            <Link href='?modal=create-events' className='primary-btn'>+ Add Event</Link>
                        </div>
                    </div>
                </div>

                <div className="bottom">

                    {/* <div className="bottomleft">
                        <div className="calendar-toggle-links">
                            {
                                links.map(({ href, title }) => {
                                    return <Link
                                        key={href}
                                        href={`/dashboard/calendar/${href}`}
                                        className={`calendar-toggle-link ${linkActive(href) ? 'selected-link' : ''}`}
                                    >
                                        {title}
                                    </Link>
                                })
                            }

                        </div>
                    </div> */}

                    {/* 
                    <div className="bottomright">
                        <div className="customize-btns">
                            <button className="export">
                                <Image src='/icons/export.png' alt="" width={20} height={20} /> Export
                            </button>
                           
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default CalendarHeader;