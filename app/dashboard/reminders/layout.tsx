import ReminderHeader from "@/components/ReminderHeader";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return <div>
        <ReminderHeader />
        {children}
    </div>
}