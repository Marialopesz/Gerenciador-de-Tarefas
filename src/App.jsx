import { useEffect, useState } from "react";
import AddTasks from "./components/AddTasks.jsx";
import Tasks from "./components/Tasks.jsx";
import { v4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) return { ...task, isCompleted: !task.isCompleted };

      return task;
    });

    setTasks(newTasks);
  }

  function onDeleteClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  /* useEffect(() => {
    async function fetchTasks() {
      //chamar a API e armazenar no states
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      //convertendo pra json
      const data = await response.json();
      setTasks(data);
      console.log(data);
    }
    // fetchTasks();
  }, []);*/

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500] space-y-4">
        <h1 className="text-3xl text-center text-slate-100 font-bold">
          Gerencidor de Tarefas
        </h1>
        <AddTasks onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteClick={onDeleteClick}
        />
      </div>
    </div>
  );
}

export default App;
