/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import "../public/assets/styles/TaskHeader.css";
import '../public/assets/styles/Modal.css';
import { usePathname } from "next/navigation";

function TaskHeader() {
    const pathname = usePathname();



    const links = [
        { href: `all`, title: "All" },
        { href: `pending`, title: "Pending" },
        { href: `completed`, title: "Completed" },
        { href: `overdue`, title: "Overdue" },
    ];

    const linkActive = (href: string) => {
        if (pathname.includes(href)) {
            return true;
        } else {
            return false;
        }
    };


    return (
        <div className="header">
            <div className="top">
                <div className="topleft">
                    <h1 className="header-heading">Task Management</h1>
                    <p className="header-text">Focus on what truly matters every day</p>
                </div>
                <div className="topright">
                    <Link href='?modal=create-task' className="primary-btn">
                        + Add Task
                    </Link>
                </div>
            </div>

            <div className="bottom">
                <div className="bottomleft">
                    <div className="calendar-toggle-links">

                        {
                            links.map(({ href, title }) => {
                                return <Link
                                    key={href}
                                    href={`/dashboard/tasks/${href}`}
                                    className={`calendar-toggle-link ${linkActive(href) ? 'selected-link' : ''}`}
                                >
                                    {title}
                                </Link>
                            })
                        }
                    </div>
                </div>

                <div className="bottomright">
                    <div className="customize-btns">


                        {/* <button className="filter">
                            Sort
                            <img className="angledown" src='/icons/filter-arrow-down.png' alt="" />
                        </button> */}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default TaskHeader;
