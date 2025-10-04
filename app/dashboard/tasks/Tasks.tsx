/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import "./Tasks.css";
import { TaskType } from "@/types";
import moment from "moment";
import { deleteTasks, updateMultipleStatuses } from "@/lib/actions/tasks";
import { toast } from "react-toastify";
import { tasksCategory } from "@/constants";


interface LoadingType {
    fetchingData: boolean;
    updatingData: boolean;
    deletingData: {
        [key: string]: boolean; // key is task ID, value indicates if that task is being deleted
    }
}


function Tasks({
    allTasks
}: { allTasks: TaskType[] }) {

    const pathname = usePathname();
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [loading, setLoading] = useState<LoadingType>({
        fetchingData: true,
        updatingData: false,
        deletingData: {
            id: false
        },
    });

    useEffect(() => {
        setTasks(allTasks);
        setLoading(prev => ({ ...prev, fetchingData: false }));
    }, [allTasks])

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


    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const getStatus = (task: TaskType) => {
        if (!task?.dueDate) return task?.status?.toLowerCase() || "unknown";

        // Create a Date object from dueDate
        const dueDateTime = new Date(task.dueDate);

        // If there's a dueTime string like "14:30", set it on the Date object
        if (task.dueTime) {
            const [hours, minutes] = task.dueTime.split(":").map(Number);
            dueDateTime.setHours(hours || 0, minutes || 0, 0, 0);
        } else {
            // If no time is provided, assume end of day (23:59)
            dueDateTime.setHours(23, 59, 59, 999);
        }

        // Compare to current time
        const now = new Date();
        const isOverdue = dueDateTime.getTime() < now.getTime();

        // Normalize status
        const status = task.status?.toLowerCase() || "pending";

        if (isOverdue && status !== "completed") return "overdue";
        return status;
    };


    const completedCount = tasks?.filter((t) => getStatus(t) === "completed").length || 0;
    const totalCount = tasks?.length || 0;

    const handleToggleComplete = (id: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task?.id === id
                    ? {
                        ...task,
                        status: task.status === "completed" ? "pending" : "completed",
                    }
                    : task
            )
        );
    };

    // Determine if any task's status has changed compared to the original tasks
    // This will control whether the Save button is displayed
    const hasChanges = () => {
        return tasks.some((task) => {
            // Find the original task from allTasks by ID
            const originalTask = allTasks.find((t) => t.id === task.id);

            // If for some reason the original task is missing, treat it as unchanged
            if (!originalTask) return false;

            // Compare the current task status with the original
            // Return true if they are different
            return task.status !== originalTask.status;
        });
    };


    const saveChanges = async () => {
        try {
            setLoading(prev => ({ ...prev, updatingData: true }));

            // 1️⃣ Get all tasks whose status changed
            const changedTasks = tasks.filter(task => {
                const original = allTasks.find(t => t.id === task.id);
                return original && original.status !== task.status;
            });

            if (changedTasks.length === 0) return;

            // 2️⃣ Split changed tasks into groups (completed vs pending)
            // Filter for tasks where the NEW status is 'completed'
            const toComplete = changedTasks
                .filter(t => t.status === 'completed')
                .map(t => t.id);

            // Filter for tasks where the NEW status is 'pending'
            const toPending = changedTasks
                .filter(t => t.status === 'pending')
                .map(t => t.id);

            // 3️⃣ Call the server once using Prisma transaction (batch)
            const res = await updateMultipleStatuses({ toComplete: toComplete as string[], toPending: toPending as string[] });

            if (res.success) {
                toast.success('Tasks updated successfully!');
            } else {
                toast.error('Some tasks failed to update');
            }

        } catch (error) {
            console.error(error);
            toast.error('Failed to update tasks');
        } finally {
            setLoading(prev => ({ ...prev, updatingData: false }));
        }
    };





    // This function now determines the original status for filtering purposes,
    // ignoring the temporary, local changes made by handleToggleComplete.
    const filteredTasks = tasks?.filter((task) => {
        // 1. Get the original task data to check the status the page is currently filtered by
        const originalTask = allTasks.find(t => t.id === task.id);

        // Fallback in case of error, but generally safe to assume the original task exists.
        if (!originalTask) return true;

        // 2. Use getStatus on the ORIGINAL task data to get the status that determines the view.
        const status = getStatus(originalTask);

        // 3. Now, we use the original 'status' for filtering logic:
        if (pathname.includes("pending")) {
            // Includes tasks that were originally 'pending' or 'overdue'
            // (assuming the desired behavior is to see overdue tasks in the pending view)
            return status === "pending";
        };

        if (pathname.includes("completed")) {
            return status === "completed";
        }

        if (pathname.includes("overdue")) {
            // Note: We use the original status for filtering, even if the user has locally toggled it.
            return status === "overdue";
        }

        return true; // show all
    });

    // ... (rest of the component code)


    const deleteTask = async (id: string) => {
        try {
            setLoading(prev => ({
                ...prev,
                deletingData: {
                    [id]: true
                }
            }));
            const res = await deleteTasks(id);
            if (res) {
                toast.success('Task deleted successfully');
                setTasks(prev => prev.filter(task => task.id !== id));
            }

        } catch (error) {
            console.error(error);
            toast.error('Failed to delete task');
        } finally {
            setLoading(prev => ({
                ...prev, deletingData: {
                    [id]: false
                }
            }));
        }
    }



    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [categoryValue, setCategoryValue] = useState('All categories');

    const handleOptionClick = (v: string) => {
        setCategoryValue(v);
        setShowDropdown(false);
        setTasks(
            v.toLowerCase() === 'all categories'
                ? allTasks
                : allTasks.filter((task) => {
                    return task.category.toLowerCase() === v.toLowerCase()
                })
        )
    };



    const currentStatusFilter = () => {
        if (pathname.includes("pending")) return "Pending";
        if (pathname.includes("completed")) return "Completed";
        if (pathname.includes("overdue")) return "Overdue";
        return null; // No status filter applied
    };



    return (
        <>
            <div className="filter-wrapper" ref={dropdownRef}>
                <button onClick={() => setShowDropdown(prev => !prev)} className="filter-header">
                    {categoryValue}
                    <img src='/icons/filter-arrow-down.png' alt="" />
                </button>
                {showDropdown && (
                    <div className="filter-dropdown">
                        {['All categories', ...tasksCategory].map((category) => (
                            <button key={category} onClick={() => handleOptionClick(category)}>{category}</button>
                        ))}
                    </div>
                )}
            </div>


            <div className="tasks-page">
                <h2>To-Do List</h2>
                {loading.fetchingData
                    ? null
                    : <p className="task-count">
                        {completedCount}{" "}
                        of{" "}
                        {totalCount} tasks completed
                    </p>}

                {loading.fetchingData
                    ? <p
                        style={{
                            textAlign: "center",
                            marginTop: "2rem",
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            color: "#555",
                        }}
                    >Loading...</p>
                    : filteredTasks?.length > 0 ? (
                        <div className="tasks-list">
                            {filteredTasks?.map((task) => {
                                const status = getStatus(task);
                                return (
                                    <div className="task" key={task.id}>
                                        <div className="task-left">
                                            <input
                                                type="checkbox"
                                                checked={status === "completed"}
                                                onChange={() => handleToggleComplete(task?.id as string)}
                                            />
                                            <div className="task-details">
                                                <div className="top-details">
                                                    <span className="task-name">{task.taskTitle}</span>
                                                    <span
                                                        className={`priority-${task.priority.toLowerCase()} priority`}
                                                    >
                                                        {task.priority.charAt(0).toUpperCase() +
                                                            task.priority.slice(1)}
                                                    </span>
                                                    <span className="is-due">
                                                        <img className="icon" src="/icons/clock2.png" alt="" />
                                                        {moment(task.dueDate).format("L")}
                                                        {"  at "}
                                                        {moment(task.dueTime, "HH:mm").format('LTS')}
                                                    </span>
                                                    <span className={`status-${getStatus(task).toLowerCase()} status`}>
                                                        {" "}{getStatus(task)}
                                                    </span>
                                                </div>
                                                <div className="bottom-details">
                                                    <span className="category">
                                                        {task.category}
                                                    </span>
                                                    <div className="tags">
                                                        <img className="icon" src="/icons/tag.png" alt="" />
                                                        {task.tags && task.tags.length > 0 ? (
                                                            task.tags.map((tag) => (
                                                                <span className="tag-item" key={tag}>
                                                                    {tag}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="tag-item">No tags</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="task-right"
                                            style={{
                                                cursor: loading.deletingData[task.id as string] ? 'progress' : 'pointer',
                                                padding: "0.5rem"
                                            }}
                                            onClick={() => deleteTask(task.id as string)}
                                            disabled={loading.deletingData[task.id as string]}
                                        >
                                            {loading.deletingData[task.id as string]
                                                ? 'Loading...'
                                                : <img className="icon" src="/icons/trash.png" alt="Delete task" />}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="notasks">
                            <img src="/icons/no-tasks.png" alt="" />
                            <h3>No task found</h3>

                            {/* IMPROVEMENT START 
                  Conditional logic to display the most relevant empty state message
                */}

                            {categoryValue !== 'All categories' ? (
                                // CHECK 1: Category filter is active and returned no tasks
                                <p>
                                    No tasks with the category of <span className="filters">{categoryValue}</span> found.
                                </p>
                            ) : currentStatusFilter() ? (
                                // CHECK 2: Only a path-based status filter is active and returned no tasks
                                <p>
                                    No <span className="filters">{currentStatusFilter()}</span> task to display.
                                </p>
                            ) : (
                                // CHECK 3: Neither filter is active (or status filter is not recognized), 
                                // meaning there are simply no tasks at all.
                                <p>
                                    No task to display.
                                </p>
                            )}

                            {/* IMPROVEMENT END */}

                        </div>
                    )}

                {/* Conditionally render the Save button only if there are changes */}
                {hasChanges() && (
                    <button
                        onClick={saveChanges}
                        style={{
                            position: 'fixed',
                            right: '2rem',
                            bottom: '2rem',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            width: 'fit-content',
                            height: 'fit-content',
                            padding: '0.5rem 1rem',
                            borderRadius: '5px',
                            opacity: loading.updatingData ? 0.7 : 1,
                            cursor: loading.updatingData ? 'progress' : 'pointer'
                        }}
                        disabled={loading.updatingData}
                    >
                        {
                            loading.updatingData ? 'Saving...' : 'Save Changes'
                        }
                    </button>)}
            </div>
        </>
    );
}

export default Tasks;
