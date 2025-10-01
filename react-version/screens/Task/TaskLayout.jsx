import { Outlet } from 'react-router-dom'
import React, {useState} from 'react'
import SideBar from '../../components/SideBar'
import './Layout.css'
import TaskHeader from '../../components/TaskHeader'

function TaskLayout() {
  const [tasks, setTasks] = useState([]);

  const handleCreateTask = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  return (
    <>
        <div className="layout">
          <SideBar />
          <div className='screen'>
            <TaskHeader onCreateTask={handleCreateTask} />
            <Outlet context={{ tasks, setTasks }} />
          </div>
        </div>
    </>
  )
}

export default TaskLayout
