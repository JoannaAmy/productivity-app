import z from "zod";

export const createTaskSchema = z.object({
    eventTitle: z
        .string()
        .min(1, 'Event title is required')
        .max(200, 'Event title must be less than 200 characters'),
    priority: z.enum(['Low', 'Medium', 'High'], {
        error: 'Priority is required',
    }),
    category: z.string().min(1, 'Category is required'),
    dueDate: z.string().min(1, 'Due date is required'),
    dueTime: z.string().min(1, 'Due time is required'),
    tags: z.array(z.string()),
});