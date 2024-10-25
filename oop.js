PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };


function validInteger (value) { 
    const regEx = /^[0-9]\d*$/
    return regEx.test(value.toString())
}

function validatePriority (priority) {
    priority = parseInt(priority);
    return (priority === PRIORITY["LOW"] || priority === PRIORITY["MEDIUM"] || priority === PRIORITY["HIGH"] || priority === PRIORITY["URGENT"]) ? priority : PRIORITY["LOW"];
}

//Function that padds out digits for the date and time
function formatTwoDigits(number){
  return number.toString().padStart(2, '0')
}

function todaysDate () {
  const now = new Date();
  const day = formatTwoDigits(now.getDate())
  const month = formatTwoDigits(now.getMonth()+ 1)
  const year = now.getFullYear();
  const hours = formatTwoDigits(now.getHours());
  const minutes = formatTwoDigits(now.getMinutes())
  const seconds = formatTwoDigits(now.getSeconds())
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

class Task {

  _title
  _priority
  _added

  constructor(title, priority){
    this._title = title;
    this._priority = priority;
    this._added = todaysDate();
  }

  get title(){
    return this._title;
  }

  get priority(){
    return this._priority;
  }

  get added(){
    return this._added;
  }

  set priority(newPriority){
    this._priority = validatePriority(newPriority);
  }
  
}

class ToDo {

  constructor(){
    //Creates the tasks array
    this.tasks = []
  }

  //Appends a new task to the tasks array
  add(Task){
    this.tasks.push(Task);
    return this.tasks.length;
  }

  //Filters the array to remove the task with the given title
  remove(title){
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.title !== title);
    //Returns true if there are less tasks after the removal
    return this.tasks.length < initialLength;
  }

  //Finds a task in the array by its title
  task(title) {
     if (this.tasks.find(task => task.title === title)) {
       return Task;
     //Throws an error if the task was not found 
     } throw new Error(`Task '${title}' Not Found`);
   }

  //Filters tasks due to the priority condition and maps it into the correct format
  list(priority = 0) {
    return this.tasks.filter(task => priority === 0 || task.priority === priority).map(task => [task.added, task.title, task.priority]);
  }

}

// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}