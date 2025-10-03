import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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

// Zod Schema
const createTaskSchema = z.object({
    eventTitle: z
        .string()
        .min(1, 'Event title is required')
        .max(200, 'Event title must be less than 200 characters'),
    priority: z.enum(['Low', 'Medium', 'High'], {
        error: 'Priority is required',
    }),
    category: z.string().min(1, 'Category is required'),
    dueDate: z.string().min(1, 'Due date is required'),
    dueTime: z.string().min(1, 'Due time is required'),
    tags: z.array(z.string()),
});

type CreateTaskInput = z.infer<typeof createTaskSchema>;

const CreateTask: React.FC<CreateTaskProps> = ({ }) => {
    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm<CreateTaskInput>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            eventTitle: '',
            priority: 'Medium',
            category: 'Personal',
            dueDate: '',
            dueTime: '',
            tags: [],
        },
    });

    const selectedTags = watch('tags');

    const handleTagClick = (tag: string) => {
        const currentTags = selectedTags || [];
        const newTags = currentTags.includes(tag)
            ? currentTags.filter((t) => t !== tag)
            : [...currentTags, tag];
        setValue('tags', newTags);
    };

    const handleClose = () => {
        router.push('/dashboard/tasks/all');
    };

    const onSubmit = (data: CreateTaskInput) => {
        const newTask: TaskType = {
            id: Date.now(),
            name: data.eventTitle,
            dueDate: data.dueDate,
            dueTime: data.dueTime,
            priority: data.priority.toLowerCase(),
            category: data.category,
            tags: data.tags,
            status: 'pending',
        };
        console.log(newTask);
        // onCreateTask(newTask);
        handleClose(); // check console
    };

    return (
        <div className="modal-overlay">
            <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-heading">
                    <h2>Create Task</h2>
                    <button type="button" onClick={handleClose}>╳</button>
                </div>

                <div className="form">
                    <label htmlFor="task-title">Task Title</label>
                    <input
                        id="task-title"
                        type="text"
                        placeholder="Enter task title"
                        {...register('eventTitle')}
                    />
                    {errors.eventTitle && (
                        <p className="zod-error-text">{errors.eventTitle.message}</p>
                    )}

                    <div className="date-time">
                        <div>
                            <label htmlFor="task-date">Due Date</label>
                            <input
                                id="task-date"
                                type="date"
                                {...register('dueDate')}
                            />
                            {errors.dueDate && (
                                <p className="zod-error-text">{errors.dueDate.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="task-time">Due Time</label>
                            <input
                                id="task-time"
                                type="time"
                                {...register('dueTime')}
                            />
                            {errors.dueTime && (
                                <p className="zod-error-text">{errors.dueTime.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="date-time">
                        <div>
                            <label>Priority</label>
                            <Controller
                                name="priority"
                                control={control}
                                render={({ field }) => (
                                    <div className="custom-dropdown">
                                        <div
                                            className="dropdown-header"
                                            onClick={() => setShowPriorityDropdown((prev) => !prev)}
                                        >
                                            {field.value || 'Select priority'}
                                            <span className="dropdown-arrow">▾</span>
                                        </div>
                                        {showPriorityDropdown && (
                                            <div className="dropdown-options">
                                                {['Low', 'Medium', 'High'].map((level) => (
                                                    <div
                                                        key={level}
                                                        className="dropdown-option"
                                                        onClick={() => {
                                                            field.onChange(level);
                                                            setShowPriorityDropdown(false);
                                                        }}
                                                    >
                                                        {level}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            />
                            {errors.priority && (
                                <p className="zod-error-text">{errors.priority.message}</p>
                            )}
                        </div>

                        <div>
                            <label>Category</label>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <div className="custom-dropdown">
                                        <div
                                            className="dropdown-header"
                                            onClick={() => setShowCategoryDropdown((prev) => !prev)}
                                        >
                                            {field.value || 'Select category'}
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
                                                            field.onChange(level);
                                                            setShowCategoryDropdown(false);
                                                        }}
                                                    >
                                                        {level}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            />
                            {errors.category && (
                                <p className="zod-error-text">{errors.category.message}</p>
                            )}
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
                                className={`tag ${selectedTags?.includes(tag) ? 'selected' : ''}`}
                                onClick={() => handleTagClick(tag)}
                            >
                                {tag}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="action-btns">
                    <button type="button" className="cancel" onClick={handleClose}>
                        Cancel
                    </button>
                    <button type="submit" className="primary-btn">
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;




/*

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
*/