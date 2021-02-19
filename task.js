const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection1');
const doneList = document.querySelector('.collection2');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');
let taskArray = [];


loadEventListener();


function loadEventListener(){
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', doneTask);
    doneList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', deleteAllTasks);
}


function addTask(e){
    e.preventDefault();
    if(taskInput.value.trim() === ''){
       taskInput.value = '';
       return alert('Add a Task');
    }
       let addTask = {
           name: taskInput.value,
         status:'pending'
       }
        
       taskArray.push(addTask);
       console.log(taskArray);
        const li = document.createElement('li');

        li.className = 'collection-item items';

        li.appendChild(document.createTextNode(taskInput.value));

        const link = document.createElement('a');

        link.className = 'move-item secondary-content';

        link.innerHTML = '<i class="fa green-text fa-remove"></i>';

        li.appendChild(link);

        taskList.append(li);

        taskInput.value = '';
    
}

function doneTask(e){
    if(e.target.parentElement.classList.contains('move-item')){
        e.target.parentElement.classList.remove('move-item');
        e.target.parentElement.classList.add('delete-item');
        e.target.classList.remove('green-text');
        e.target.classList.add('red-text');
        doneList.append(e.target.parentElement.parentElement);
        let taskName = e.target.parentElement.parentElement.textContent.trim();
        taskArray.forEach(function(task){
            if(task.name == taskName){
                task.status = 'done';
            }
        });
        console.log(taskArray);
        
    }
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        let taskName = e.target.parentElement.parentElement.textContent.trim();
        taskArray = taskArray.filter(function(tasks){
           return tasks.name != taskName;
        });
        e.target.parentElement.parentElement.remove();
    }
    console.log(taskArray);
}

function deleteAllTasks(){
  if(!(doneList.hasChildNodes())) return alert('No Tasks to Delete');
  doneList.innerHTML = '';
  taskArray = [];
 
}