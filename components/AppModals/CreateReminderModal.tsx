
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { ReminderType } from '../../types'
import { createReminders } from '@/lib/actions/reminder'
import { toast } from "react-toastify";

interface CreateReminderProps {
    onCreateReminder?: (reminder: ReminderType) => void;
    // handleClose: () => void;
}

const repeatOptions = [
    "DAILY",
    "WEEKLY",
    "MONTHLY",
    "one_time_only"
];

const createReminderSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .max(200, 'Title must be less than 200 characters'),
    notes: z
        .string()
        .max(1000, 'Notes must be less than 1000 characters')
        .optional(),
    dueDate: z.date().refine(
        (val) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            val.setHours(0, 0, 0, 0);
            return val >= today;
        },
        { message: "Reminder date cannot be in the past" }
    ),
    dueTime: z.string().min(1, 'Time is required'),
    repeat: z.enum(['daily', 'weekly', 'monthly', 'one-time-only'], {
        error: 'Reminder frequency is required',
    }),
});

type CreateReminderInput = z.infer<typeof createReminderSchema>;

const CreateReminder: React.FC<CreateReminderProps> = ({ }) => {
    const [showReminderDropdown, setShowReminderDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;


    const hh = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    const minTime = `${hh}:${min}`;


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
            dueDate: new Date(),
            dueTime: minTime,
            repeat: 'one-time-only',
        },
    });

    const reminderValue = watch('repeat');


    const handleClose = () => {
        router.push('/dashboard/reminders/all');
    };

    const onSubmit = async (data: CreateReminderInput) => {
        try {
            setLoading(true);
            const response = await createReminders({ ...data, active: true });
            if (response) {
                toast.success('Reminder created successfully!');
                handleClose();
            }
        } catch (error) {
            toast.error('Failed to create task');
            console.error('Error creating task:', error);

        } finally {
            setLoading(false);
        }
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
                                {...register('dueDate', { valueAsDate: true })}
                                min={minDate}
                            />
                            {errors.dueDate && (
                                <p className="zod-error-text">{errors.dueDate.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="reminder-time">Time</label>
                            <input
                                id="reminder-time"
                                type="time"
                                {...register('dueTime')}
                                min={minTime}
                            />
                            {errors.dueTime && (
                                <p className="zod-error-text">{errors.dueTime.message}</p>
                            )}
                        </div>
                    </div>

                    <label>Reminder</label>
                    <Controller
                        name="repeat"
                        control={control}
                        render={({ field }) => (
                            <div className="custom-dropdown">
                                <div
                                    className="dropdown-header"
                                    onClick={() => setShowReminderDropdown((prev) => !prev)}
                                >
                                    {/* {field.value
                                        ? field.value.charAt(0).toUpperCase() + field.value.slice(1)
                                        : 'Select reminder'} */}
                                    {field.value || 'Select reminder'}
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
                                                {/* {option.charAt(0).toUpperCase() + option.slice(1)} */}
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    />
                    {errors.repeat && (
                        <p className="zod-error-text">{errors.repeat.message}</p>
                    )}
                </div>

                <div className="action-btns">
                    <button type="button" className="cancel" onClick={handleClose}>
                        Cancel
                    </button>
                    {/* <button type="submit" className="primary-btn">
                        Create Reminder
                    </button> */}
                    <button
                        type="submit"
                        className="primary-btn"
                        disabled={loading}
                        style={{
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? "progress" : "pointer",
                        }}
                    >
                        {loading ? <span>Loading...</span> : "Create Task"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateReminder;
