import Tasks from "../../Tasks";

export default function OverdueTasksPage({ tasks, setTasks }) {
  return <Tasks 
//   tasks={tasks} setTasks={setTasks}  
  filter="all" />;
}
