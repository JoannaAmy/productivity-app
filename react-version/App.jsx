import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Events from './screens/Calender/Events'
import BookingLists from './screens/Calender/BookingLists'
import Availability from './screens/Calender/Availability'
import CalendarLayout from './screens/Calender/CalendarLayout';
import TaskLayout from './screens/Task/TaskLayout'
import Tasks from './screens/Task/Tasks'
import Reminders from './screens/Reminder/Reminders'
import ReminderLayout from './screens/Reminder/ReminderLayout';
import SettingsLayout from './screens/Settings/SettingsLayout';
import Settings from './screens/Settings/Settings';
import Calendar from './screens/Calender/Calendar';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/calendar" element={<CalendarLayout />} >
            <Route path="/calendar/events" element={<Calendar />} />
            <Route path="/calendar/booking-lists" element={<BookingLists />} />
            <Route path="/calendar/availability" element={<Availability />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Route>

          <Route path='/task' element={<TaskLayout />}>
            <Route path='/task/all' element={<Tasks/>} />
            <Route path='/task/pending' element={<Tasks/>} />
            <Route path='/task/completed' element={<Tasks/>} />
            <Route path='/task/overdue' element={<Tasks/>} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Route>

          <Route path='/reminder' element={<ReminderLayout />}>
            <Route path='/reminder/all' element={<Reminders/>} />
            <Route path='/reminder/active' element={<Reminders/>} />
            <Route path='/reminder/inactive' element={<Reminders/>} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Route>

          <Route path='/settings' element={<SettingsLayout />}>
            <Route path='/settings' element={<Settings />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
