"use client";

import { usePathname } from "next/navigation";
import ToggleSelect from "./components/ToggleSelect";
import "./Reminders.css";
import moment from "moment";
import {
  deleteReminders,
  updateReminderStatuses,
} from "@/lib/actions/reminder";
import React, { useEffect, useRef, useState } from "react";
import { ReminderType } from "@/types";
import { toast } from "react-toastify";

interface LoadingType {
  fetchingData: boolean;
  updatingData: boolean;
  deletingData: {
    [key: string]: boolean;
  };
}

function Reminders({ allReminder }: { allReminder: ReminderType[] }) {
  const pathname = usePathname();
  const [reminders, setReminders] = useState<ReminderType[]>([]);
  const [loading, setLoading] = useState<LoadingType>({
    fetchingData: true,
    updatingData: false,
    deletingData: {},
  });

  //  const [showDropdown, setShowDropdown] = useState(false);
  //   const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReminders(allReminder);
    setLoading((prev) => ({ ...prev, fetchingData: false }));
  }, [allReminder]);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setShowDropdown(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const handleToggleActive = (id: string) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder?.id === id
          ? {
              ...reminder,
              active: !reminder.active,
            }
          : reminder
      )
    );
  };

  const hasChanges = (): boolean => {
    return reminders.some((reminder) => {
      const originalReminder = allReminder.find(
        (r) => String(r.id) === String(reminder.id)
      );
      if (!originalReminder) return false;
      return !!(reminder.active !== originalReminder.active);
    });
  };

  const saveChanges = async () => {
    try {
      setLoading((prev) => ({ ...prev, updatingData: true }));

      // 1️⃣ Get all reminders whose status changed
      const changedReminders = reminders.filter((reminder) => {
        const original = allReminder.find((r) => r.id === reminder.id);

        return original && original.active !== reminder.active;
      });

      if (changedReminders.length === 0) return;

      // 2️⃣ Split changed reminders into groups (toActivate vs toDeactivate)
      const toActivate = changedReminders
        .filter((r) => r.active === true)
        .map((r) => r.id);

      const toDeactivate = changedReminders
        .filter((r) => r.active === false)
        .map((r) => r.id);

      const res = await updateReminderStatuses({
        toActivate: toActivate as string[],
        toDeactivate: toDeactivate as string[],
      });

      if (res.success) {
        toast.success(`Updated reminders!`);
      } else {
        toast.error("Some reminders failed to update");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update reminders");
    } finally {
      setLoading((prev) => ({ ...prev, updatingData: false }));
    }
  };

  const handleDeleteReminder = async (id: string) => {
    try {
      setLoading((prev) => ({
        ...prev,
        deletingData: {
          [id]: true,
        },
      }));
      const res = await deleteReminders(id);
      if (res) {
        toast.success("Reminder deleted");
        setReminders((prev) => prev.filter((r) => String(r.id) !== String(id)));
      } else {
        toast.error("Failed to delete reminder");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    } finally {
      setLoading((prev) => ({
        ...prev,
        deletingData: {
          [id]: false,
        },
      }));
    }
  };

  // Filter reminders based on route (active/inactive)
  const getStatus = (r: ReminderType) => {
    const original =
      allReminder.find((o) => String(o.id) === String(r.id)) ?? r;
    return original.active ? "active" : "inactive";
  };

  const filteredReminders = reminders?.filter((r) => {
    if (!pathname) return true;
    const status = getStatus(r);

    if (
      pathname.includes("/reminders/active") ||
      pathname.includes("/reminder/active")
    ) {
      return status === "active";
    }
    if (
      pathname.includes("/reminders/inactive") ||
      pathname.includes("/reminder/inactive")
    ) {
      return status === "inactive";
    }
    return true;
  });

  const currentStatusFilter = () => {
    if (pathname.includes("active")) return "active";
    if (pathname.includes("inactive")) return "inactive";
    return null; // No status filter applied
  };

  const activeCount = reminders.filter((r) => r.active).length;
  const totalCount = reminders?.length || 0;

  return (
    <div className="reminders-page">
      <h2>Reminders</h2>

      {loading.fetchingData ? null : (
        <p className="task-count">
          {activeCount} of {totalCount} Reminders active
        </p>
      )}

      {loading.fetchingData ? (
        <p
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "1.2rem",
            fontWeight: "500",
            color: "#555",
          }}
        >
          Loading...
        </p>
      ) : filteredReminders?.length > 0 ? (
        <div className="reminders-list">
          {filteredReminders?.map((reminder) => {
            const status = getStatus(reminder);
            return (
              <div className="reminder" key={reminder.id}>
                <div className="reminder-left">
                  <div className="reminder-desc">
                    <h4>{reminder.title}</h4>
                    <span
                      className={`repeat-mode repeat-mode-${reminder.repeat.replace(
                        / /g,
                        "-"
                      )}`}
                    >
                      <img className="icon" src={"/icons/repeat.png"} alt="" />
                      {reminder.repeat}
                    </span>
                  </div>
                  <div className="reminder-detail">
                    <span>{reminder.notes}</span>
                  </div>
                  <div className="reminder-tags">
                    <span>
                      <img
                        className="icon"
                        src={"/icons/calendar.png"}
                        alt=""
                      />
                      {moment(reminder.dueDate).format("L")}
                    </span>
                    <span>
                      <img className="icon" src={"/icons/clock2.png"} alt="" />
                      {moment(reminder.dueTime, "HH:mm").format("LTS")}
                    </span>
                  </div>
                </div>
                <div className="reminder-right">
                  <ToggleSelect
                    isActive={!!reminder.active}
                    onToggle={() => handleToggleActive(String(reminder.id))}
                  />
                  <button
                    onClick={() => handleDeleteReminder(String(reminder.id))}
                  >
                    <img
                      className="icon"
                      src={"/icons/trash.png"}
                      alt="Delete"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-reminders">
          <img src="/icons/no-events.png" alt="" />
          <p>No Reminders</p>
        </div>
      )}

      {hasChanges() && (
        <button
          onClick={saveChanges}
          style={{
            position: "fixed",
            right: "2rem",
            bottom: "2rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            width: "fit-content",
            height: "fit-content",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            opacity: loading.updatingData ? 0.7 : 1,
            cursor: loading.updatingData ? "progress" : "pointer",
          }}
          disabled={loading.updatingData}
        >
          {loading.updatingData ? "Saving..." : "Save Changes"}
        </button>
      )}
    </div>
  );
}
export default Reminders;
