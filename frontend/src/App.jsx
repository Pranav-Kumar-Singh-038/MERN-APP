// src/App.jsx
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:3000/tasks');
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTask }),
    });
    setNewTask('');
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl mb-4 font-bold">Todo App</h1>
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={addTask}>
          Add
        </button>
      </div>
      <ul className="list-disc pl-5">
        {tasks.map((task, index) => (
          <li key={index}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
