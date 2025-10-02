'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CreateTaskProps {
  onCreateTask: (task: TaskType) => void;
}

interface TaskType {
  id: number;
  name: string;
  dueDate: string;
  dueTime: string;
  priority: string;
  category: string;
  tags: string[];
  status: 'pending' | 'completed';
}

const tagOptions = [
  '#urgent',
  '#important',
  '#hospital',
  '#quick',
  '#planning',
  '#calls',
  '#meeting',
  '#fix',
];

const CreateTask: React.FC<CreateTaskProps> = ({ onCreateTask }) => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClose = () => {
    router.push('/dashboard/tasks/all');
  };

  const handleCreateTask = () => {
    if (!title || !dueDate || !dueTime || !category) {
      alert('Please fill in Title, Date, Time, and Category');
      return;
    }

    const newTask: TaskType = {
      id: Date.now(),
      name: title,
      dueDate,
      dueTime,
      priority: priority.toLowerCase(),
      category,
      tags: selectedTags,
      status: 'pending',
    };

    onCreateTask(newTask);
    handleClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-heading">
          <h2>
            <Image src="/icons/tasks.png" alt="" width={24} height={24} className="icon" />
            Create Task
          </h2>
          <button onClick={handleClose}>╳</button>
        </div>

        <div className="form">
          <label htmlFor="task-title">Task Title</label>
          <input
            required
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="date-time">
            <div>
              <label htmlFor="task-date">Due Date</label>
              <input
                required
                id="task-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="task-time">Due Time</label>
              <input
                required
                id="task-time"
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
              />
            </div>
          </div>

          <div className="date-time">
            <div>
              <label>Priority</label>
              <div className="custom-dropdown">
                <div
                  className="dropdown-header"
                  onClick={() => setShowPriorityDropdown((prev) => !prev)}
                >
                  {priority || 'Select priority'}
                  <span className="dropdown-arrow">▾</span>
                </div>
                {showPriorityDropdown && (
                  <div className="dropdown-options">
                    {['Low', 'Medium', 'High'].map((level) => (
                      <div
                        key={level}
                        className="dropdown-option"
                        onClick={() => {
                          setPriority(level);
                          setShowPriorityDropdown(false);
                        }}
                      >
                        {level}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label>Category</label>
              <div className="custom-dropdown">
                <div
                  className="dropdown-header"
                  onClick={() => setShowCategoryDropdown((prev) => !prev)}
                >
                  {category || 'Select category'}
                  <span className="dropdown-arrow">▾</span>
                </div>
                {showCategoryDropdown && (
                  <div className="dropdown-options">
                    {[
                      'Personal',
                      'Work',
                      'Health',
                      'Finance',
                      'Education',
                      'Home',
                      'Travel',
                      'Shopping',
                    ].map((level) => (
                      <div
                        key={level}
                        className="dropdown-option"
                        onClick={() => {
                          setCategory(level);
                          setShowCategoryDropdown(false);
                        }}
                      >
                        {level}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            type="text"
            placeholder="Select relevant tags"
            value={selectedTags.join(', ')}
            readOnly
          />

          <div className="tag-options">
            {tagOptions.map((tag) => (
              <p
                key={tag}
                className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </p>
            ))}
          </div>
        </div>

        <div className="action-btns">
          <button className="cancel" onClick={handleClose}>
            Cancel
          </button>
          <button className="primary-btn" onClick={handleCreateTask}>
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;