const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/tasks', (req, res) => {
  const tasks = db.getTasks();
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Task text required' });
  const task = { text };
  db.addTask(task);
  res.status(201).json({ message: 'Task added' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
