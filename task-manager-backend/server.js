const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors()); 
app.use(express.json());

// In-memory Tasks Store
let tasks = [
  { id: 1, title: 'Apprendre Node.js et Express', completed: true },
  { id: 2, title: 'Créer une API REST pour nos tâches', completed: false }
];

// In-memory Notes Store
let notes = [
  { 
    id: 1, 
    title: 'Project Architecture Ideas', 
    content: 'Consider using Vite + React on the frontend and Express.js backend for high performance.',
    createdAt: new Date().toISOString()
  },
  { 
    id: 2, 
    title: 'Design System Notes', 
    content: 'Use glassmorphic background surfaces, Plus Jakarta Sans typography, and Lucide vector icons.',
    createdAt: new Date().toISOString()
  }
];

// --- TASKS ENDPOINTS ---
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: 'Task title is required' });
  }
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.map((t) =>
    t.id === taskId ? { ...t, completed: !t.completed } : t
  );
  res.json({ message: 'Task updated' });
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  res.json({ message: 'Task deleted' });
});

// --- NOTES ENDPOINTS ---
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ error: 'Title and content are required for notes' });
  }
  const newNote = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content,
    createdAt: new Date().toISOString()
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.put('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const { title, content } = req.body;
  notes = notes.map((n) =>
    n.id === noteId ? { ...n, title: title || n.title, content: content || n.content } : n
  );
  res.json({ message: 'Note updated' });
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  notes = notes.filter((n) => n.id !== noteId);
  res.json({ message: 'Note deleted' });
});

app.listen(PORT, () => {
  console.log(`Serveur API prêt sur http://localhost:${PORT}`);
});