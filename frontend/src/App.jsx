import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://backend:8000/get/');
      const data = await response.json();
      setTasks(data.tasks); // Ensure data.tasks is used
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const addTask = async () => {
    if (input) {
      try {
        const response = await fetch('http://backend:8000/add/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ task: input }),
        });
        const newTask = await response.json();
        setTasks([...tasks, { id: newTask.id, tarefa: input }]);
        setInput('');
      } catch (error) {
        console.error('Failed to add task', error);
      }
    }
  };

  const removeTask = async (id) => {
    try {
      await fetch(`http://backend:8000/del/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Failed to remove task', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">To-Do List</h1>
      <div className="flex">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button
          onClick={addTask}
          className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600"
        >
          +
        </button>
      </div>
      <ul className="mt-4 w-80">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center p-2 bg-white shadow rounded mt-2">
            <span>{task.tarefa}</span>
            <button
              onClick={() => removeTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
