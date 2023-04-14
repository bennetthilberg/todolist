/*
    Monday Bennett's Task:
    
    Make a form thingy on index where new projects can be made and where new tasks can be added. You can select which
    project to view tasks for and there's a constant view of available projects(like a navbar kinda). Tasks don't need to actually
    show anything but their name in basic ass default html text.
    
*/
import { format, differenceInDays } from 'date-fns';
import './style.css';

/*const now = new Date();
const deadline = new Date(2023, 4, 30);
const daysRemaining = differenceInDays(deadline, now);
const formattedDeadline = format(deadline, 'yyyy-MM-dd');
*/

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
  window.projects = projects;
  
  function addProj(name) {
    const newProj = new Project(name);
    projects.push(newProj);
    return newProj;
  }
  
let newProjBtn = document.querySelector('#newProjBtn');
newProjBtn.addEventListener('click', () => toggleShowNewProjModal());

let newProjModal = document.querySelector('#newProjModal');

function toggleShowNewProjModal(){
  if(newProjModal.style.display == ''){
    newProjModal.style.display = 'block';
  }
  else{
    newProjModal.style.display = '';
  }
}

let newProjSubmitBtn = document.querySelector('#newProjSubmitBtn');
newProjSubmitBtn.addEventListener('click', () => submitNewProj(document.querySelector('#newProjName').value));
function submitNewProj(newProjName){
  projects.push(new Project(newProjName));
  toggleShowNewProjModal();
  addNewProjDOM(newProjName);
}
let projDisplay = document.querySelector('.projDisplay');
function addNewProjDOM(newProjName){
  let newProj = document.createElement('div');
  newProj.classList.add('project');
  newProj.textContent = newProjName;
  projDisplay.appendChild(newProj);
  newProj.addEventListener('click', () => setActiveProj(newProjName));
}

let activeProj;
let addTaskBtn = document.querySelector('#addTaskBtn');
let tasksDisplayHeader = document.querySelector('#tasksDisplayHeader');
let newTaskModal = document.querySelector('#newTaskModal');
function setActiveProj(projBecomingActiveName){
  activeProj = projects.find(project => project.name === projBecomingActiveName);
  tasksDisplayHeader.textContent = `Tasks for ${activeProj.name}`;
  addTaskBtn.style.opacity = 1;
  addTaskBtn.style.cursor = 'pointer';
  
  console.log(`Active project: ${activeProj.name}`);
  for(const oldTask of Array.from(taskDisplay.querySelectorAll('.task'))){
    console.log(oldTask);
    taskDisplay.removeChild(oldTask);
  }
  for(const newlyActiveTask of activeProj.tasks){
    let newTask = document.createElement('div');
    newTask.innerHTML = `<span class="taskTitle">${newlyActiveTask.title}</span><br>
    ${newlyActiveTask.desc}<br>
    Due: ${newlyActiveTask.deadline}<br>
    Priority: ${newlyActiveTask.priority}`;
    newTask.classList.add('task');
    //makeDelEL(newTask);
    taskDisplay.appendChild(newTask);
  }
}
addTaskBtn.addEventListener('click', () => {
  if(newTaskModal.style.display == ''){
    newTaskModal.style.display = 'block';
  }
  else{
    newTaskModal.style.display = '';
  }
});

let newTaskSubmitBtn =  document.querySelector('#newTaskSubmitBtn');
let taskDisplay = document.querySelector('#taskDisplay');
newTaskSubmitBtn.addEventListener('click', () => {
  activeProj.addTask(
    document.querySelector('#newTaskName').value,
    document.querySelector('#newTaskDesc').value,
    document.querySelector('#newTaskDeadline').value,
    document.querySelector('#newTaskPriority').value
  );
  newTaskModal.style.display = '';
  //
  let newTask = document.createElement('div');
    //newTask.textContent = document.querySelector('#newTaskName').value;
    newTask.innerHTML = `<span class="taskTitle">${document.querySelector('#newTaskName').value}</span><br>
    ${document.querySelector('#newTaskDesc').value}<br>
    Due: ${document.querySelector('#newTaskDeadline').value}<br>
    Priority: ${document.querySelector('#newTaskPriority').value}`;
    newTask.classList.add('task');
    //makeDelEL(newTask);
    taskDisplay.appendChild(newTask);
    //
  /*for(const task of activeProj.tasks){
    let newTask = document.createElement('div');
    newTask.textContent = task.title;
    newTask.classList.add('task');
    taskDisplay.appendChild(newTask);
  }*/
});

