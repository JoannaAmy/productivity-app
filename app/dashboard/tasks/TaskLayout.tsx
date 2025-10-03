"use client"

// import { Outlet } from 'react-router-dom'
import  {useState} from 'react'
import SideBar from '../../../react-version/components/SideBar'
// import './Layout.css'
import { usePathname } from 'next/navigation';
import TaskHeader from '../../../react-version/components/TaskHeader'

function TaskLayout() {
    const pathname = usePathname();
  const [tasks, setTasks] = useState([]);

  const handleCreateTask = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  return (
    <>
        <div className="layout">
          {/* <SideBar /> */}
          <div className='screen'>
            {/* <TaskHeader onCreateTask={handleCreateTask} /> */}
            {/* <Outlet context={{ tasks, setTasks }} /> */}
          </div>
        </div>
    </>
  )
}

export default TaskLayout
