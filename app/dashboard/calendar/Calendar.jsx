import React from 'react';
import Events from './Events';
import { useOutletContext } from 'react-router-dom';
// import { usePathname } from 'next/navigation';

function Calendar() {
  const { events, handleDeleteEvent } = useOutletContext();

  return (
    <Events events={events} onDeleteEvent={handleDeleteEvent} />
  );
}

export default Calendar;