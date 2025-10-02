"use client";

import React, { useState } from "react";
import Link from "next/link";
import "../public/assets/styles/TaskHeader.css";
import taskIcon from "./icons/tasks.png";
import angleDownIcon from './icons/filter-arrow-down.png';
import { usePathname } from "next/navigation";

function TaskHeader({ onCreateTask }) {
  const [showModal, setShowModal] = useState(false);
  const [priority, setPriority] = useState("");
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [category, setCategory] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

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

  const tagOptions = [
    "#urgent",
    "#important",
    "#hospital",
    "#quick",
    "#planning",
    "#calls",
    "#meeting",
    "#fix",
  ];

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleCreateTask = () => {
    if (!title.trim() || !dueDate || !dueTime || !category) {
      alert(
        "Please fill in Title, Due Date, Due Time, and Category before creating a task."
      );
      return;
    }

    const newTask = {
      id: Date.now(), // unique ID
      name: title,
      dueDate,
      dueTime,
      priority: priority.toLowerCase(),
      category,
      tags: selectedTags,
      status: "pending",
      due: `${dueDate} ${dueTime}`,
    };

    onCreateTask(newTask);
    setShowModal(false);
    setTitle("");
    setDueDate("");
    setDueTime("");
    setPriority("");
    setCategory("");
    setSelectedTags([]);
  };

  return (
    <div className="header">
      <div className="top">
        <div className="topleft">
          <h1 className="header-heading">Task Management</h1>
          <p className="header-text">Focus on what truly matters every day</p>
        </div>
        <div className="topright">
          <button className="primary-btn" onClick={() => setShowModal(true)}>
            + Add Task
          </button>
        </div>
      </div>

      <div className="bottom">
        <div className="bottomleft">
          <div className="calendar-toggle-links">
            {/* <Link
              href="/task/all"
              className={({ isActive }) =>
                `calendar-toggle-link ${isActive ? "selected-link" : ""}`
              }
            >
              All
            </Link>
            <Link
              href="/task/pending"
              className={({ isActive }) =>
                `calendar-toggle-link ${isActive ? "selected-link" : ""}`
              }
            >
              Pending
            </Link>
            <Link
              href="/task/completed"
              className={({ isActive }) =>
                `calendar-toggle-link ${isActive ? "selected-link" : ""}`
              }
            >
              Completed
            </Link>
            <Link
              href="/task/overdue"
              className={({ isActive }) =>
                `calendar-toggle-link ${isActive ? "selected-link" : ""}`
              }
            >
              Overdue
            </Link> */}

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
            <button className="export">
              All categories
              <img src={angleDownIcon} alt="" />
            </button>
            <button className="filter">
              Sort
              <img className="angledown" src={angleDownIcon} alt="" />
            </button>
          </div>
        </div>
      </div>

      {
        showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-heading">
                <h2>
                  <img src={taskIcon} alt="" className="icon" />
                  Create Task
                </h2>
                <button onClick={() => setShowModal(false)}>╳</button>
              </div>

              <div className="form">
                <label htmlFor="task-title">Task Title</label>
                <input
                  required
                  type="text"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <div className="date-time">
                  <div>
                    <label htmlFor="task-date">Due Date</label>
                    <input
                      required
                      id="task-date"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="task-time">Due Time</label>
                    <input
                      required
                      id="task-time"
                      type="time"
                      value={dueTime}
                      onChange={(e) => setDueTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="date-time">
                  <div>
                    <label>Priority</label>
                    <div className="custom-dropdown">
                      <div
                        className="dropdown-header"
                        onClick={() => setShowPriorityDropdown((prev) => !prev)}
                      >
                        {priority || "Select priority"}
                        <span className="dropdown-arrow">▾</span>
                      </div>
                      {showPriorityDropdown && (
                        <div className="dropdown-options">
                          {["Low", "Medium", "High"].map((level) => (
                            <div
                              key={level}
                              className="dropdown-option"
                              onClick={() => {
                                setPriority(level);
                                setShowPriorityDropdown(false);
                              }}
                            >
                              {level}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label>Category</label>
                    <div className="custom-dropdown">
                      <div
                        className="dropdown-header"
                        onClick={() => setShowCategoryDropdown((prev) => !prev)}
                      >
                        {category || "Select category"}
                        <span className="dropdown-arrow">▾</span>
                      </div>
                      {showCategoryDropdown && (
                        <div className="dropdown-options">
                          {[
                            "Personal",
                            "Work",
                            "Health",
                            "Finance",
                            "Education",
                            "Home",
                            "Travel",
                            "Shopping",
                          ].map((level) => (
                            <div
                              key={level}
                              className="dropdown-option"
                              onClick={() => {
                                setCategory(level);
                                setShowCategoryDropdown(false);
                              }}
                            >
                              {level}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <label htmlFor="tags">Tags</label>
                <input
                  id="tags"
                  type="text"
                  placeholder="Select relevant tags"
                  value={selectedTags.join(", ")}
                  readOnly
                />

                <div className="tag-options">
                  {tagOptions.map((tag) => (
                    <p
                      key={tag}
                      className={`tag ${selectedTags.includes(tag) ? "selected" : ""
                        }`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </p>
                  ))}
                </div>
              </div>

              <div className="action-btns">
                <button className="cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="primary-btn" onClick={handleCreateTask}>
                  Create Task
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}

export default TaskHeader;
