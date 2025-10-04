"use server" // added this because this is a server actions file

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { TaskType } from '@/types';
import { revalidatePath } from 'next/cache';


// Create a new task in the database
export async function createTask(data: TaskType) {
    // Authenticate user
    const { userId } = await auth();
    if (!userId) {
        redirect('/sign-in'); // redirect if not signed in
    }

    // Create the task in the database using Prisma
    const res = await prisma.task.create({
        data: {
            taskTitle: data.taskTitle,          // task title
            dueDate: new Date(data.dueDate),    // convert to Date object
            dueTime: data.dueTime,              // string representing time
            priority: data.priority,            // Low / Medium / High
            category: data.category,            // task category
            tags: data.tags,                    // array of tags
            status: data.status,                // pending / completed
            clerkUserId: userId as string,      // associate task with current user
        },
    });

    // Revalidate the path to refresh server components
    // Note: Only works on server components/pages, not client components
    revalidatePath('/dashboard/tasks');

    // Return the newly created task
    return res;
}

// Fetch all tasks for the authenticated user
export async function fetchTasks() {
    const { userId } = await auth();
    if (!userId) return; // return undefined if not signed in

    // Get tasks from the database filtered by the user
    const tasks = await prisma.task.findMany({
        where: {
            clerkUserId: userId, // only fetch tasks belonging to the user
        },
        orderBy: { createdAt: 'desc' }, // newest tasks first
    });

    return tasks;
}

export async function updateMultipleStatuses({
    toComplete,
    toPending,
}: {
    toComplete: string[];
    toPending: string[];
}) {

    // 2. Authentication and Authorization
    // Get the current user ID using the Next.js/Clerk 'auth' utility.
    const { userId } = await auth();
    // Enforce authentication: if no user is found, redirect to the sign-in page.
    if (!userId) redirect('/sign-in');

    // 3. Database Transaction
    // Use prisma.$transaction to ensure both update operations either succeed together 
    // or fail together (atomicity), preventing partial updates.
    const results = await prisma.$transaction([

        // Operation 1: Set tasks to 'completed'
        prisma.task.updateMany({
            // SECURITY CHECK: Ensure only tasks matching the IDs AND belonging to the current user are updated.
            where: { id: { in: toComplete }, clerkUserId: userId },
            data: { status: 'completed' },
        }),

        // Operation 2: Set tasks to 'pending'
        prisma.task.updateMany({
            // SECURITY CHECK: Ensure only tasks matching the IDs AND belonging to the current user are updated.
            where: { id: { in: toPending }, clerkUserId: userId },
            data: { status: 'pending' },
        }),
    ]);

    // 4. Cache Revalidation (Next.js App Router)
    // Invalidate the cache for the tasks dashboard path. This forces Next.js to re-fetch 
    // the latest data on subsequent requests or navigation, reflecting the database changes.
    revalidatePath('/dashboard/tasks');

    // 6. Return Value
    // Return a structured response indicating the outcome and the counts of affected rows.
    return {
        // 'success' is true if at least one task was updated in either transaction step.
        success: results.some(r => r.count > 0),
        // results[0] corresponds to the first transaction item (toComplete update).
        completedCount: results[0].count,
        // results[1] corresponds to the second transaction item (toPending update).
        pendingCount: results[1].count,
    };
}


// Delete a single task
export async function deleteTasks(id: string) {
    const { userId } = await auth();
    if (!userId) {
        redirect('/sign-in'); // redirect if not signed in
    }

    // Delete the task only if it belongs to the authenticated user
    const res = await prisma.task.delete({
        where: {
            id: id,
            clerkUserId: userId,
        },
    });

    // Revalidate the path to refresh server components
    revalidatePath('/dashboard/tasks');

    // Return the deleted task
    return res;
}
