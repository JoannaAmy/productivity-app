import Tasks from "../../Tasks";

export default function CompletedTasksPage({ tasks, setTasks }) {
  return <Tasks  
//   tasks={tasks} setTasks={setTasks}  
  filter="completed" />;
}
