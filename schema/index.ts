import z from "zod";

export const eventSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long."),
    date: z
        .string()
        .min(1, "Date is required."), // Date type from input[type="date"] is string
    startTime: z.string().min(1, "Time is required."), // Time type from input[type="time"] is string
    endTime: z.string().min(1, "Time is required."), // Time type from input[type="time"] is string
    guestList: z
        .array(z.email("Invalid email format in guest list."))
        // .optional()
        // .default([])
        , // Initialize as an empty array
    notes: z.string().optional(),
});