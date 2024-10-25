PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };


function validInteger (value) { 
    const regEx = /^[0-9]\d*$/
    return regEx.test(value.toString())
}

function validatePriority (priority) {
    priority = parseInt(priority);
    return (priority === PRIORITY["LOW"] || priority === PRIORITY["MEDIUM"] || priority === PRIORITY["HIGH"] || priority === PRIORITY["URGENT"]) ? priority : PRIORITY["LOW"];
 }


function todaysDate () {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
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

  constructor(tasks){
    this.tasksList = []
  }

  add(Task){
    this.tasksList.push(Task);
    return this.tasksList.length;
  }

  remove(title){
    let removed = false
    for (let i = 0; i < this.tasksList.length; i++) {
      if (this.tasksList[i].title === title) {
        this.tasksList.splice(i, 1)
        removed = true
      }
    }
    return removed
  }

  task(title) {
    for (let i = 0; i < this.tasksList.length; i++) {
      if (this.tasksList[i].title === title) {
        return this.tasksList[i]; 
      }
    }
    throw new Error(`Task '${title}' Not Found`);
  }

  list(priority = 0) {
    let result = [];
    for (let i = 0; i < this.tasksList.length; i++) {
      if (priority === 0 || this.tasksList[i].priority === priority) {
        result.push([this.tasksList[i].added, this.tasksList[i].title, this.tasksList[i].priority]);
      }
    }
    return result;
  }

}








// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}