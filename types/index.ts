import { eventSchema } from "@/schema";
import z from "zod";

export interface ReminderType {
  id?: string;
  title: string;
  notes?: string;
  dueDate: Date;
  dueTime: string;
  repeat: string;
  active?: boolean;

  clerkUserId?: string;
}

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

// export interface eventType {
//   id?: string;
//   title: string;
//   date: Date;
//   time: string;
//   guestList: string[];
//   notes?: string;
//   htmlLink?: string;
//   organizer?: string;
//   startTime: string;
//   endTime: string;

//   clerkUserId?: string;
// }

export type eventType = z.infer<typeof eventSchema> & {htmlLink?: string, organizer?: string, id?: string};
