import CalendarHeader from "@/components/CalendarHeader";
import SideBar from "@/components/SideBar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return <div style={{
        display: 'flex',
        backgroundColor: '#2A292C'
    }}
    >
        <SideBar />
        <div style={{
            backgroundColor: '#ffffff',
            width: '70%',
            padding: '30px 70px',
            borderRadius: '20px 0 0 20px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {children}
        </div>
    </div>
}