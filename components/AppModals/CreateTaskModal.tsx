import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { TaskType } from "@/types";
import { createTask, fetchTasks } from "@/lib/actions/tasks";
import { toast } from "react-toastify";
import { now } from "moment";
import { tasksCategory } from "@/constants";

interface CreateTaskProps {
  onCreateTask?: (task: TaskType) => void;
}

// interface TaskType {
//     id: number;
//     name: string;
//     dueDate: string;
//     dueTime: string;
//     priority: string;
//     category: string;
//     tags: string[];
//     status: 'pending' | 'completed';
// }

const tagOptions = [
  "#urgent",
  "#important",
  "#hospital",
  "#quick",
  "#planning",
  "#calls",
  "#meeting",
  "#fix",
];

// Zod Schema
const createTaskSchema = z.object({
  taskTitle: z
    .string()
    .min(1, "Event title is required")
    .max(200, "Event title must be less than 200 characters"),
  priority: z.enum(["Low", "Medium", "High"], {
    error: "Priority is required",
  }),
  category: z.string().min(1, "Category is required"),
  dueDate: z.date().refine(
    (val) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      val.setHours(0, 0, 0, 0);
      return val >= today;
    },
    {
      message: "Due date cannot be in the past",
    }
  ),
  dueTime: z.string().min(1, "Due time is required"),
  tags: z.array(z.string()),
});

type CreateTaskInput = z.infer<typeof createTaskSchema>;

const CreateTask: React.FC<CreateTaskProps> = ({}) => {
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Get today's date
  const today = new Date();

  // Extract year, month, and day with leading zeros if necessary
  const yyyy = today.getFullYear(); // full year, e.g., 2025
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // months are 0-indexed, add leading zero
  const dd = String(today.getDate()).padStart(2, "0"); // day of month, add leading zero

  // Format the minimum date string as "YYYY-MM-DD" for the input
  const minDate = `${yyyy}-${mm}-${dd}`;

  // --- TIME: format current time for the time input --- //
  const hh = String(today.getHours()).padStart(2, "0"); // hours in 24h format
  const min = String(today.getMinutes()).padStart(2, "0"); // minutes

  const minTime = `${hh}:${min}`; // "HH:MM" for min attribute

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
      taskTitle: "",
      priority: "Low",
      category: "Personal",
      dueDate: new Date(),
      dueTime: minTime,
      tags: [],
    },
  });

  const selectedTags = watch("tags");

  const handleTagClick = (tag: string) => {
    const currentTags = selectedTags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
    setValue("tags", newTags);
  };

  const handleClose = () => {
    router.push("/dashboard/tasks/all");
    router.refresh();
  };

  const onSubmit = async (data: CreateTaskInput) => {
    try {
      setLoading(true);
      const response = await createTask({
        ...data,
        status: "pending",
      });
      if (response) {
        toast.success("Task created successfully!");
        handleClose();
      }
    } catch (error) {
      toast.error("Failed to create task");
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-heading">
          <h2>Create Task</h2>
          <button type="button" onClick={handleClose}>
            ╳
          </button>
        </div>

        <div className="form">
          <label htmlFor="task-title">Task Title</label>
          <input
            id="task-title"
            type="text"
            placeholder="Enter task title"
            {...register("taskTitle")}
          />
          {errors.taskTitle && (
            <p className="zod-error-text">{errors.taskTitle.message}</p>
          )}

          <div className="date-time">
            <div>
              <label htmlFor="task-date">Due Date</label>
              <input
                id="task-date"
                type="date"
                {...register("dueDate", { valueAsDate: true })}
                min={minDate} // prevents the user from selecting dates before today
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
                {...register("dueTime")}
                min={minTime} // prevents the user from selecting times before now
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
                      {field.value || "Select priority"}
                      <span className="dropdown-arrow">▾</span>
                    </div>
                    {showPriorityDropdown && (
                      <div className="dropdown-options">
                        {["Low", "Medium", "High"].map((level) => (
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
                      {field.value || "Select category"}
                      <span className="dropdown-arrow">▾</span>
                    </div>
                    {showCategoryDropdown && (
                      <div className="dropdown-options">
                        {tasksCategory.map((level) => (
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
            value={selectedTags.join(", ")}
            readOnly
          />

          <div className="tag-options">
            {tagOptions.map((tag) => (
              <p
                key={tag}
                className={`tag ${
                  selectedTags?.includes(tag) ? "selected" : ""
                }`}
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

export default CreateTask;
