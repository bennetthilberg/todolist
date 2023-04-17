
import { format, differenceInDays } from 'date-fns';
import './style.css';
import { parse, stringify } from 'flatted';

let projDisplay = document.querySelector('.projDisplay');



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
  const storedProjects = localStorage.getItem("projects");
  console.log(storedProjects);
  if (storedProjects) {
    const parsedProjects = parse(storedProjects);
    
    for (const storedProject of parsedProjects) {
      const newProj = new Project(storedProject.name);
    
      for (const storedTask of storedProject.tasks) {
        const task = new Task(
          storedTask.title,
          storedTask.desc,
          storedTask.deadline,
          storedTask.priority,
          newProj
        );
        newProj.tasks.push(task);
      }
  
      projects.push(newProj); 
      addNewProjDOM(newProj.name);
    }
  } else {
    projects = [];
  }
  
  
  
  
  

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
  saveToLocalStorage();
}

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
  for(const oldTask of Array.from(taskDisplay.querySelectorAll('.taskTrigger'))){
    console.log(oldTask);
    taskDisplay.removeChild(oldTask);
  }
  for(const newlyActiveTask of activeProj.tasks){
    addTaskToDom(newlyActiveTask.title, newlyActiveTask.desc, newlyActiveTask.deadline, newlyActiveTask.priority, activeProj.tasks, activeProj.tasks.indexOf(newlyActiveTask));
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
    addTaskToDom(document.querySelector('#newTaskName').value,
    document.querySelector('#newTaskDesc').value,
    document.querySelector('#newTaskDeadline').value, 
    document.querySelector('#newTaskPriority').value, activeProj.tasks, activeProj.tasks.length - 1);
    saveToLocalStorage();
});

function addTaskToDom(name, desc, deadline, priority, parentTaskArray, parentTaskArrayIndex){
  let newTask = document.createElement('div');

  let newTaskTrigger = document.createElement('div');
  newTaskTrigger.classList.add('taskTrigger');

  let newTaskNameP = document.createElement('p');
  newTaskNameP.classList.add('taskTitle');
  newTaskNameP.textContent = name;

  let newTaskDescP = document.createElement('p');
  newTaskDescP.textContent = desc;
  newTaskDescP.classList.add('taskDesc');

  let newTaskDeadlineP = document.createElement('p');
  newTaskDeadlineP.textContent = `Due: ${deadline}`;
  newTaskDeadlineP.classList.add('taskDeadline');

  let newTaskPriorityP = document.createElement('p');
  newTaskPriorityP.textContent = `Priority: ${priority}`;
  newTaskPriorityP.classList.add('taskPriority');

  newTask.appendChild(newTaskNameP);
  newTask.appendChild(newTaskDescP);
  newTask.appendChild(newTaskDeadlineP);
  newTask.appendChild(newTaskPriorityP);

  newTaskTrigger.appendChild(newTask);

  newTask.classList.add('task');
  taskDisplay.appendChild(newTaskTrigger);


  newTask.addEventListener('click', () => {
    parentTaskArray.splice(parentTaskArrayIndex, 1);
    taskDisplay.removeChild(newTaskTrigger);
    saveToLocalStorage();
  });
}

function saveToLocalStorage(){
  console.log('saveToLocalStorage called')
  localStorage.setItem("projects", stringify(projects));
}
