import Tasks from "../../Tasks";

export default function AllTasksPage({ tasks, setTasks }) {
  return <Tasks 
//   tasks={tasks} setTasks={setTasks} 
  filter="all" />;
}
