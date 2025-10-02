import TaskHeader from "@/components/TaskHeader";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return <div>
        <TaskHeader />
        {children}
    </div>
}