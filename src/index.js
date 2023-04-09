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
  
  /*

  DOM test project maker

  */

let testerSubmitBtn = document.getElementById('submitTest');
testerSubmitBtn.addEventListener('click', ()=>testerSubmit())
const testerSubmit = () => {
    if(document.getElementById('newProjName').value){
        addProj(document.getElementById('newProjName').value);
    }
    if(document.getElementById('newTaskName').value){
        addProj(document.getElementById('newProjName').value);
    }
};
