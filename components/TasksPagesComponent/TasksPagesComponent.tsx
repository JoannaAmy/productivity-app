import { fetchTasks } from "@/lib/actions/tasks";
import { TaskType } from "@/types";
import ErrorToastHandler from "../ErrorToastHandler/ErrorToastHandler";
import Tasks from "@/app/dashboard/tasks/Tasks";

export default async function TasksPagesComponent() {
    let allTasks: TaskType[];
    let fetchError = false; // Flag to indicate an error

    try {
        allTasks = await fetchTasks() as TaskType[] || [];
    } catch (error) {
        console.error("Error fetching tasks:", error); // Log server-side
        allTasks = [];
        fetchError = true; // Set the flag
    }
    
    return (
        <>
            {/* Pass the error flag to a Client Component */}
            {fetchError && <ErrorToastHandler message='An error occurred fetching tasks' />}
            <Tasks allTasks={allTasks} />
        </>
    );
}