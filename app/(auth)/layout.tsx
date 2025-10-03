import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import './styles/layout.css'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    // implement redirect user back to events page when they are signed in
    const { userId } = await auth(); // auth() can only be used in server components
    if (userId != null) redirect('/dashboard/calendar/events'); // you can only use redirect() in server components

    return <div className="layout-container">
        {children}
    </div>;
}