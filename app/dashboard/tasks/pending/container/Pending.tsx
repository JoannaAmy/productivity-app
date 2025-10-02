import Tasks from "../../Tasks";

export default function PendingTasksPage({ tasks, setTasks }) {
  return <Tasks 
//   tasks={tasks} setTasks={setTasks} 
   filter="all" />;
}
