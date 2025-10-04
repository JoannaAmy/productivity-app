export interface TaskType {
    id?: string;
    dueDate: Date;
    dueTime: string;
    priority: string;
    category: string;
    tags: string[];
    status: string;
    taskTitle: string;

    clerkUserId?: string;
}