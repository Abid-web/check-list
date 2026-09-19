import { useState, useEffect } from 'react';
import { ListTodo, Plus } from 'lucide-react';
import TaskItem from './TaskItem';
import './TaskList.css';

const API_URL = 'http://localhost:3001/api/tasks';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // 1. GET: Fetch tasks on component mount
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error loading tasks:', err));
  }, []);

  // 2. POST: Send new task to Express server
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTaskTitle })
    })
      .then((res) => res.json())
      .then((createdTask) => {
        setTasks([...tasks, createdTask]);
        setNewTaskTitle('');
      });
  };

  // 3. PUT: Toggle status on server
  const toggleTask = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'PUT' })
      .then(() => {
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        );
      });
  };

  // 4. DELETE: Delete task on server
  const deleteTask = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      });
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="task-container">
      <h2>
        <ListTodo size={22} color="var(--accent-purple)" />
        Task Board
      </h2>

      <div className="stats-card">
        <span><strong>Progress:</strong> {completedTasks} / {totalTasks} completed</span>
        <span>{percentage}%</span>
      </div>

      <form onSubmit={handleAddTask} className="task-form">
        <input 
          type="text" 
          className="task-input"
          placeholder="Add a new task..." 
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button type="submit" className="add-btn">
          <Plus size={16} />
          Add Task
        </button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onToggle={toggleTask} 
            onDelete={deleteTask} 
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;