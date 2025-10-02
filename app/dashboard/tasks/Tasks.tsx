"use client"

import React from 'react';
// import { useLocation, useOutletContext } from 'react-router-dom';
import { usePathname, useRouter } from 'next/navigation';
import trashIcon from './icons/trash.png';
import clockIcon from './icons/clock2.png';
import tagIcon from './icons/tag.png';
import noTaskImg from './icons/no-tasks.png';
// import no-task from './'
import './Tasks.css';

function Tasks(filter) {
  const pathname = usePathname();
  // const { tasks, setTasks } = useOutletContext();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getStatus = (task) => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    if (dueDate < today && task.status !== 'completed') return 'overdue';
    return task.status;
  };


  // const filteredTasks = tasks.filter(task => {
  //   const status = getStatus(task);
  //   if (pathname.includes('pending')) return status === 'pending';
  //   if (pathname.includes('completed')) return status === 'completed';
  //   if (pathname.includes('overdue')) return status === 'overdue';
  //   return true;
  // });

  // const completedCount = tasks.filter(t => getStatus(t) === 'completed').length;
  // const totalCount = tasks.length;

  const completedCount = 20;
  const totalCount = 20;

  // const handleDelete = id => {
  //   setTasks(prev => prev.filter(task => task.id !== id));
  // };

  // const handleToggleComplete = id => {
  //   setTasks(prev =>
  //     prev.map(task =>
  //       task.id === id
  //         ? {
  //           ...task,
  //           status: task.status === 'completed' ? 'pending' : 'completed',
  //         }
  //         : task
  //     )
  //   );
  // };

  return (
    <div className="tasks-page">
      <h2>To-Do List</h2>
      <p>
        <span className="completed-task-count">{completedCount}</span> out of{' '}
        <span className="total-task-count">{totalCount}</span> tasks completed
      </p>

      {/* {filteredTasks.length > 0 ? (
        <div className="tasks-list">
          {filteredTasks.map(task => {
            const status = getStatus(task);
            return (
              <div className="task" key={task.id}>
                <div className="task-left">
                  <input
                    type="checkbox"
                    checked={status === 'completed'}
                    onChange={() => handleToggleComplete(task.id)}
                  />
                  <div className="task-details">
                    <div className="top-details">
                      <span className="task-name">{task.name}</span>
                      <span className={`priority-${task.priority.toLowerCase()} priority`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                      <span className="is-due">
                        <img className="icon" src={clockIcon} alt="" />
                        {task.dueDate} {task.dueTime}
                      </span>
                    </div>
                    <div className="bottom-details">
                      <span className="category">
                        {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                      </span>
                      <div className="tags">
                        <img className="icon" src={tagIcon} alt="" />
                        {task.tags && task.tags.length > 0 ? (
                          task.tags.map(tag => (
                            <span className="tag-item" key={tag}>{tag}</span>
                          ))
                        ) : (
                          <span className="tag-item">No tags</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="task-right">
                  <img
                    className="icon"
                    src={trashIcon}
                    alt="Delete"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(task.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (  */}
        <div className="notasks">
          <img src={"./icons/no-tasks.png"} alt="" />
          <h3>No task found</h3>
          <p>No <span className="filters">{pathname.split('/').pop()}</span> task to display</p>
        </div>
      {/* )}  */}
    </div>
  );
}

export default Tasks;