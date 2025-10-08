'use server'

import { ReminderType } from "@/types";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import prisma from "../db"
import { revalidatePath } from "next/cache"


export async function createReminders(data: ReminderType) {
    const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }  

  const res = await prisma.reminder.create({
    data: {
      title: data.title,
      notes: data.notes,
      dueDate: new Date(data.dueDate),
      dueTime: data.dueTime,
      repeat: data.repeat,
      active: true,

      clerkUserId: userId as string,
    },
  });

  revalidatePath('/dashboard/reminders');

    return res;
}

export async function fetchReminders() {
  const { userId } = await auth();
  if (!userId) return;

  const reminders = await prisma.reminder.findMany({
    where: {
      clerkUserId: userId,
    },
    orderBy: { createdAt: "desc" },
  });

  return reminders;
}

export async function deleteReminders(id: string) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const res = await prisma.reminder.delete({
    where: {
      id: id,
      clerkUserId: userId,
    },
  });

  revalidatePath("/dashboard/reminders");

  return res;
}


export async function updateReminderStatuses({
  toActivate,
  toDeactivate,
}: {
  toActivate: string[];
  toDeactivate: string[];
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const results = await prisma.$transaction([
    prisma.reminder.updateMany({
      where: { id: { in: toActivate }, clerkUserId: userId },
      data: { active: true },
    }),

    prisma.reminder.updateMany({
      where: { id: { in: toDeactivate }, clerkUserId: userId },
      data: { active: false },
    }),
  ]);

  revalidatePath("/dashboard/reminders");

  return {
    success: results.some((r) => r.count > 0),
    activatedCount: results[0].count,
    deactivatedCount: results[1].count,
  };
}