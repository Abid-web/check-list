const express = require('express');
const cors = require('cors'); // 1. Importer cors

const app = express();
const PORT = 3001;

// 2. Activer les middlewares OBLIGATOIREMENT avant les routes
app.use(cors()); 
app.use(express.json());

// Vos routes API viennent APRÈS
let tasks = [
  { id: 1, title: 'Apprendre Node.js et Express', completed: true },
  { id: 2, title: 'Créer une API REST pour nos tâches', completed: false }
];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
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
  res.json({ message: 'Tâche mise à jour' });
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  res.json({ message: 'Tâche supprimée' });
});

app.listen(PORT, () => {
  console.log(`Serveur API prêt sur http://localhost:${PORT}`);
});