import { fetchReminders } from "@/lib/actions/reminder";
import { ReminderType } from "@/types";
import ErrorToastHandler from "../ErrorToastHandler/ErrorToastHandler";
import Reminders from "@/app/dashboard/reminders/Reminders";

export default async function ReminderPagesComponent() {
    let allReminder: ReminderType[];
    let fetchError = false; 
    try {
        allReminder = await fetchReminders() as ReminderType[] || [];
    } catch (error) {
        console.error("Error fetching reminders:", error);
        allReminder = [];
        fetchError = true;
    }
    return (
        <>
          
            {fetchError && <ErrorToastHandler message='An error occurred fetching tasks' />}
            <Reminders allReminder ={allReminder} />
        </>
    );
}