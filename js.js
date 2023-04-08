class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(title, desc, deadline, priority) {
    const task = new Task(title, desc, deadline, priority, this);
    this.tasks.push(task);
    return task;
  }
}

class Task {
  constructor(title, desc, deadline, priority, parent) {
    this.title = title;
    this.desc = desc;
    this.deadline = deadline;
    this.priority = priority;
    this.parent = parent;
  }
}

let projects = [];

function addProj(name) {
  const newProj = new Project(name);
  projects.push(newProj);
  return newProj;
}
