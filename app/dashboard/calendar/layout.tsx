import CalendarHeader from "@/components/CalendarHeader";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return <div>
        <CalendarHeader />
        {children}
    </div>
}