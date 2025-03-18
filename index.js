document.addEventListener('DOMContentLoaded',()=>{
    const todoInput = document.getElementById('todo-input');
    const addTaskButton = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');
   
    let tasks=JSON.parse(localStorage.getItem('tasks')) ||[];

    tasks.forEach(task => {
        renderTasks(task);        
    });
    addTaskButton.addEventListener('click',()=>{
       const tasktext = todoInput.value.trim();
       if(tasktext==="")return;
       const newTask = {
           id: new Date().getTime(),
           text: tasktext,
           isCompleted:false
       }
       tasks.push(newTask);
       saveTasks();
       renderTasks(newTask);
       todoInput.value="";//clear the input for the next task
       console.log(tasks);
   
    })
   
   function saveTasks(){
       localStorage.setItem('tasks',JSON.stringify(tasks));
   }
   function renderTasks(task){
    console.log(task.text);
    const li = document.createElement('li');
    if(task.isCompleted){
        li.classList.add('completed');
    }
    li.innerHTML=`
    <span>${task.text}</span>
    <button class="delete-btn">Delete</button>`
    li.addEventListener('click',(e)=>{
        if(e.target.tagName==="BUTTON"){
            return;
        }
        task.isCompleted = !task.isCompleted;
        li.classList.toggle('completed');
        if(task.isCompleted===true){
            li.style.textDecoration = 'line-through';
            li.style.color = 'green';
        }
        console.log(task.isCompleted);
        saveTasks();
    })
    li.querySelector('button').addEventListener('click',(e)=>{
        e.stopPropagation();
        tasks = tasks.filter(t=>t.id!==task.id);
        li.remove();
        saveTasks();
    })
    todoList.appendChild(li);
   }
})