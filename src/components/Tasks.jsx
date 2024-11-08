import { CheckIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button.jsx";

function Tasks(props) {
  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    //pra fazer melhor os tratamentos e evitar erros
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?${query.toString()}`);
  }
  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {props.tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => props.onTaskClick(task.id)}
            className={`bg-slate-400 flex items-center gap-2 w-full text-left text-white p-2 rounded-md ${
              task.isCompleted ? "line-through" : ""
            }`}
          >
            {task.isCompleted && <CheckIcon />}
            {task.title}
          </button>
          <Button onClick={() => onSeeDetailsClick(task)}>
            <ChevronRightIcon />
          </Button>
          <Button onClick={() => props.onDeleteClick(task.id)}>
            <Trash2Icon />
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;