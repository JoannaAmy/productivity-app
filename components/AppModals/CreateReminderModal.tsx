import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

interface CreateReminderProps {
    onCreateReminder: (reminder: ReminderType) => void;
    handleClose: () => void;
}

interface ReminderType {
    id: number;
    title: string;
    date: string;
    time: string;
    detail: string;
    repeat: string;
    status: 'active' | 'inactive';
}

// Zod Schema
const createReminderSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .max(200, 'Title must be less than 200 characters'),
    notes: z
        .string()
        .max(1000, 'Notes must be less than 1000 characters')
        .optional(),
    date: z.string().min(1, 'Date is required'),
    time: z.string().min(1, 'Time is required'),
    reminder: z.enum(['daily', 'weekly', 'monthly', 'one-time-only'], {
        error: 'Reminder frequency is required',
    }),
});

type CreateReminderInput = z.infer<typeof createReminderSchema>;















const CreateReminder: React.FC<CreateReminderProps> = ({ onCreateReminder }) => {
    const [showReminderDropdown, setShowReminderDropdown] = useState(false);
    const router = useRouter()

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<CreateReminderInput>({
        resolver: zodResolver(createReminderSchema),
        defaultValues: {
            title: '',
            notes: '',
            date: '',
            time: '',
            reminder: undefined,
        },
    });

    const reminderValue = watch('reminder');


  const handleClose = () => {
    router.push('/dashboard/reminders/all');
  };

    const onSubmit = (data: CreateReminderInput) => {
        const newReminder: ReminderType = {
            id: Date.now(),
            title: data.title,
            date: data.date,
            time: data.time,
            detail: data.notes || '',
            repeat: data.reminder,
            status: 'active',
        };

        console.log(newReminder)

        // onCreateReminder(newReminder);
        handleClose();
    };

    return (
        <div className="modal-overlay">
            <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-heading">
                    <h2>
                        <img src="/icons/reminder.png" alt="" width={24} height={24} className="icon" />
                        Create Reminder
                    </h2>
                    <button type="button" onClick={handleClose}>╳</button>
                </div>

                <div className="form">
                    <label htmlFor="reminder-title">Title</label>
                    <input
                        id="reminder-title"
                        type="text"
                        placeholder="Enter reminder title"
                        {...register('title')}
                    />
                    {errors.title && (
                        <p className="zod-error-text">{errors.title.message}</p>
                    )}

                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        placeholder="Add additional details (optional)"
                        {...register('notes')}
                    />
                    {errors.notes && (
                        <p className="zod-error-text">{errors.notes.message}</p>
                    )}

                    <div className="date-time">
                        <div>
                            <label htmlFor="reminder-date">Date</label>
                            <input
                                id="reminder-date"
                                type="date"
                                {...register('date')}
                            />
                            {errors.date && (
                                <p className="zod-error-text">{errors.date.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="reminder-time">Time</label>
                            <input
                                id="reminder-time"
                                type="time"
                                {...register('time')}
                            />
                            {errors.time && (
                                <p className="zod-error-text">{errors.time.message}</p>
                            )}
                        </div>
                    </div>

                    <label>Reminder</label>
                    <Controller
                        name="reminder"
                        control={control}
                        render={({ field }) => (
                            <div className="custom-dropdown">
                                <div
                                    className="dropdown-header"
                                    onClick={() => setShowReminderDropdown((prev) => !prev)}
                                >
                                    {field.value
                                        ? field.value.charAt(0).toUpperCase() + field.value.slice(1)
                                        : 'Select reminder'}
                                    <span className="dropdown-arrow">▾</span>
                                </div>

                                {showReminderDropdown && (
                                    <div className="dropdown-options">
                                        {['daily', 'weekly', 'monthly', 'one-time-only'].map((option) => (
                                            <div
                                                key={option}
                                                className="dropdown-option"
                                                onClick={() => {
                                                    field.onChange(option);
                                                    setShowReminderDropdown(false);
                                                }}
                                            >
                                                {option.charAt(0).toUpperCase() + option.slice(1)}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    />
                    {errors.reminder && (
                        <p className="zod-error-text">{errors.reminder.message}</p>
                    )}
                </div>

                <div className="action-btns">
                    <button type="button" className="cancel" onClick={handleClose}>
                        Cancel
                    </button>
                    <button type="submit" className="primary-btn">
                        Create Reminder
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateReminder;


// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import ToggleSelect from '../../app/dashboard/reminders/components/ToggleSelect';
// import { useRouter } from 'next/navigation';

// interface CreateReminderProps {
//   onCreateReminder: (reminder: ReminderType) => void;
// }

// interface ReminderType {
//   id: number;
//   title: string;
//   date: string;
//   time: string;
//   detail: string;
//   repeat: string;
//   status: 'active' | 'inactive';
// }

// const CreateReminder: React.FC<CreateReminderProps> = ({ onCreateReminder }) => {
//   const router = useRouter();

//   const [title, setTitle] = useState('');
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [reminder, setReminder] = useState('');
//   const [showReminderDropdown, setShowReminderDropdown] = useState(false);

//   const handleClose = () => {
//     router.push('/dashboard/reminders/all');
//   };

//   const handleCreate = () => {
//     if (!title || !date || !time || !reminder) {
//       alert('Please fill in all fields');
//       return;
//     }

//     const newReminder: ReminderType = {
//       id: Date.now(),
//       title,
//       date,
//       time,
//       detail: '',
//       repeat: reminder,
//       status: 'active',
//     };

//     onCreateReminder(newReminder);
//     console.log('Creating reminder:', newReminder);
//     handleClose();
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <div className="modal-heading">
//           <h2>
//             <Image src="/icons/reminder.png" alt="" width={24} height={24} className="icon" />
//             Create Reminder
//           </h2>
//           <button onClick={handleClose}>╳</button>
//         </div>

//         <div className="form">
//           <label htmlFor="reminder-title">Title</label>
//           <input
//             id="reminder-title"
//             type="text"
//             placeholder="Enter reminder title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <label htmlFor="notes">Notes</label>
//           <textarea name="notes" id="notes" placeholder="Add additional details (optional)" />

//           <div className="date-time">
//             <div>
//               <label htmlFor="reminder-date">Date</label>
//               <input
//                 id="reminder-date"
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="reminder-time">Time</label>
//               <input
//                 id="reminder-time"
//                 type="time"
//                 value={time}
//                 onChange={(e) => setTime(e.target.value)}
//               />
//             </div>
//           </div>

//           <label>Reminder</label>
//           <div className="custom-dropdown">
//             <div
//               className="dropdown-header"
//               onClick={() => setShowReminderDropdown((prev) => !prev)}
//             >
//               {reminder || 'Select reminder'}
//               <span className="dropdown-arrow">▾</span>
//             </div>

//             {showReminderDropdown && (
//               <div className="dropdown-options">
//                 {['daily', 'weekly', 'monthly', 'one-time-only'].map((option) => (
//                   <div
//                     key={option}
//                     className="dropdown-option"
//                     onClick={() => {
//                       setReminder(option);
//                       setShowReminderDropdown(false);
//                     }}
//                   >
//                     {option.charAt(0).toUpperCase() + option.slice(1)}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>


//         <div className="action-btns">
//           <button className="cancel" onClick={handleClose}>
//             Cancel
//           </button>
//           <button className="primary-btn" onClick={handleCreate}>
//             Create Reminder
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateReminder