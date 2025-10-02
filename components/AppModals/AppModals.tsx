'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

import CreateReminder from './CreateReminderModal';
import CreateTask from './CreateTaskModal';
import CreateMeetings from './CreateEventsModal'

// Dynamic imports for all modals - only load when needed
const CreateEventModal = dynamic(() => import('../PlanModal'), {
    ssr: false,
});


const AppModals = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const modal = searchParams.get('modal');

    const renderModals = () => {
        switch (modal) {
            case 'create-task':
            return <CreateTask />;
            case 'create-reminder':
            return <CreateReminder />;
            case 'create-events':
            return <CreateMeetings />;
            default:
            return null;
        }
    };


    //   and then you <Link href="?modal=create-events">Create Events</Link>
    //   or <button onClick={() => router.push('?modal=create-events')}>Create Events</button>
    // to open the modal



    return (
        <>
            {renderModals()}
        </>
    );
};

export default AppModals;