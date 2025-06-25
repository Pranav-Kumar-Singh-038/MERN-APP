const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');

function readTasks() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeTasks(tasks) {
  fs.writeFileSync(DB_FILE, JSON.stringify(tasks, null, 2));
}

module.exports = {
  getTasks: readTasks,
  addTask: (task) => {
    const tasks = readTasks();
    tasks.push(task);
    writeTasks(tasks);
  },
};
