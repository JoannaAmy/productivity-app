"use client";

import React, { useState, useEffect } from "react"; // <-- Import useEffect
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { eventSchema } from "@/schema";
import { toast } from "react-toastify";
import { eventType } from "@/types";
import { createGoogleCalendarEvent } from "@/lib/actions/events";

// Helper function to calculate end time
const calculateEndTime = (startTime: string): string => {
    // Expected format for startTime: "HH:MM"
    if (!startTime) return "";

    // Split the time string into hours and minutes
    const [hoursStr, minutesStr] = startTime.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    // Add 60 minutes (1 hour)
    hours += 1;

    // Handle overflow (e.g., 23:30 + 1 hour becomes 00:30 next day)
    // Since we only deal with time strings here, we handle the 24-hour wrap.
    if (hours >= 24) {
        hours -= 24;
    }

    // Format the result back into "HH:MM"
    const newHoursStr = String(hours).padStart(2, '0');
    const newMinutesStr = String(minutes).padStart(2, '0');

    return `${newHoursStr}:${newMinutesStr}`;
};

const CreateMeeting = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [guestList, setGuestList] = useState<string[]>([]);
    const [guestEmail, setGuestEmail] = useState<string>("");

    // --- Date/Time setup remains the same ---
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;
    const hh = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    const minTime = `${hh}:${min}`;
    // ------------------------------------------

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
        // setError,
        watch,   // <-- IMPORTANT: Destructure watch
        setValue, // <-- IMPORTANT: Destructure setValue
        setError
    } = useForm<eventType>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: "",
            date: "",
            // Set default end time to 1 hour after default start time
            startTime: minTime,
            endTime: calculateEndTime(minTime),
            notes: "",
            guestList: []
        },
    });

    // 2. Watch the start time field for any changes 
    const startTime = watch('startTime');

    // 3. Effect to update end time when start time changes
    useEffect(() => {
        // Only run if startTime is actually set
        if (startTime) {
            const newEndTime = calculateEndTime(startTime);

            // 4. Use setValue to programmatically update the endTime field
            setValue('endTime', newEndTime, {
                shouldValidate: true, // Optionally validate the new value immediately
                shouldDirty: true
            });
        }
    }, [startTime, setValue]); // Re-run effect when startTime changes or setValue is stable

    // ... (rest of the component logic: handleClose, handleAddGuest, onSubmit)

    const handleClose = () => {
        router.push("/dashboard/calendar/events");
    };

    // Handler for adding guests
    const handleAddGuest = () => {
        // Basic validation for the single email input before adding
        if (z.string().email().safeParse(guestEmail).success) {

            // Check if email is already in the list
            if (guestList.includes(guestEmail)) {
                setError("guestList", {
                    type: "manual",
                    message: `Email '${guestEmail}' is already added.`,
                });
                return;
            }

            setGuestList((prev) => [...prev, guestEmail]);
            setGuestEmail("");
            setError("guestList", {
                type: "manual",
                message: "", // CClear any previous errors
            });
        } else {
            // 2. Use setError to manually set the validation error
            setError("guestList", {
                type: "manual",
                message: "Please enter a valid email address.",
            });
        }
    };


    // const onSubmit: SubmitHandler<eventType> = async (data) => {
    //     setIsLoading(true);
    //     // Combine form data with the separate guestList state
    //     const eventData = { ...data, guestList };

    //     try {
    //         const response = await fetch('/api/calendar/create-event', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(eventData),
    //         });

    //         if (!response.ok) {
    //             // Check for specific error message from the backend
    //             const errorBody = await response.json();
    //             throw new Error(errorBody.message || "Failed to create event in Google Calendar.");
    //         }

    //         console.log({ response })

    //         const result = await response.json();
    //         console.log("Success:", result);

    //         // Show success message or redirect
    //         toast.success(`Event created!`);
    //         router.push("/dashboard/calendar/events");

    //     } catch (error) {
    //         console.error("Event creation failed:", error);
    //         toast.error(`Error: ${error instanceof Error ? error.message : "An unknown error occurred."}`);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const onSubmit: SubmitHandler<eventType> = async (data) => {
        setIsLoading(true);
        // Combine form data with the separate guestList state
        const eventData = { ...data, guestList };

        try {
            // call srver action
            const result = await createGoogleCalendarEvent(eventData);

            // The Server Action handles the revalidation and returns the success object

            console.log("Success:", result);

            // Show success message and redirect
            toast.success(result.message); // Use the message from the action
            // router.refresh();
            
            router.push("/dashboard/calendar/events");

        } catch (error) {
            // Catch any error thrown by the Server Action
            console.error("Event creation failed:", error);
            toast.error(`Error: ${error instanceof Error ? error.message : "An unknown error occurred."}`);
        } finally {
            setIsLoading(false);
        }
    };






    return (
        <div className="modal-overlay">
            {/* Wrap the form content in a <form> tag and use handleSubmit */}
            <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-heading">
                    <h2>Create Event</h2>
                    <button type="button" onClick={handleClose}>
                        ╳
                    </button>
                </div>

                <div className="form">
                    <label htmlFor="title">Event Title</label>
                    <input
                        type="text"
                        placeholder="Enter event title"
                        id="title"
                        {...register("title")} // Plug in register
                    />
                    {errors.title && <p className="zod-error-text">{errors.title.message}</p>}

                    <div className="date-time"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <div className="date">
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                id="date"
                                min={minDate}
                                {...register("date")} // Plug in register
                            />
                            {errors.date && <p className="zod-error-text">{errors.date.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="startTime">Start Time</label>
                            <input
                                type="time"
                                id="startTime"
                                // Note: We do NOT use 'min' here to allow the user to select any time if the date is changed
                                {...register("startTime")}
                            />
                            {errors.startTime && <p className="zod-error-text">{errors.startTime.message}</p>}
                        </div>
                        {/* <p>To</p> */}
                        <div>
                            <label htmlFor="endTime">End Time</label>
                            <input
                                type="time"
                                id="endTime"
                                {...register("endTime")} // Plug in register
                            />
                            {errors.endTime && <p className="zod-error-text">{errors.endTime.message}</p>}
                        </div>
                    </div>

                    <label htmlFor="people">Guest Email</label>
                    <div className="guest-input-group">
                        <input
                            type="email"
                            placeholder="guest@email.com"
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={handleAddGuest}
                            disabled={isLoading}
                        >
                            Add
                        </button>
                    </div>
                    {errors.guestList && <p className="zod-error-text">{errors.guestList.message}</p>}

                    {/* Guest List Display (remains the same) */}
                    <div className="guest-list">
                        {guestList.map((email, index) => (
                            <p
                                key={index}
                                className="guests"
                                onClick={() => {
                                    setGuestList((prev) => prev.filter((_, i) => i !== index));
                                }}
                            >
                                {email}
                            </p>
                        ))}
                    </div>

                    <label htmlFor="notes">Notes (Optional)</label>
                    <textarea
                        id="notes"
                        placeholder="Add meeting agenda, preparation notes or special requirements..."
                        {...register("notes")} // Plug in register
                    />
                    {errors.notes && <p className="zod-error-text">{errors.notes.message}</p>}
                </div>

                <div className="action-btns">
                    <button
                        type="button"
                        className="cancel"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="primary-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating Event..." : "Create Event"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateMeeting;