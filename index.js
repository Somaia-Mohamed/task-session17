
  const taskInput = document.getElementById('inputTask');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskForm =document.getElementById('formTask')
  addTaskBtn.addEventListener('click', addTask);
  function addTask() {
    const taskList = document.createElement('div');
    taskList.classList.add="formTask";
    const taskText = taskInput.value;
    if (taskText !== '') {
      const task = document.createElement('h3');
      const delBtn = document.createElement('button');
      const doneBtn = document.createElement('button');
      delBtn.textContent="delete"
      doneBtn.textContent="done ";

      task.textContent=" - "+ taskText;
      delBtn.addEventListener("click",deleteTask)
      doneBtn.addEventListener("click",doneTask)
      taskForm.appendChild(taskList)
      taskList.appendChild(task);
      taskList.appendChild(delBtn);
      taskList.appendChild(doneBtn);
      const storedData = localStorage.getItem('h2Items');
      const h2Items = storedData ? JSON.parse(storedData) : [];
      h2Items.push(taskText);
      localStorage.setItem('h2Items', JSON.stringify(h2Items));
      document.getElementById('inputTask').value = '';
    }
  }
function displayItems() {
  const storedData = localStorage.getItem('h2Items');
  const h2Items = storedData ? JSON.parse(storedData) : [];
  const taskForm =document.getElementById('formTask')
  container.innerHTML = ''; 
  h2Items.forEach(item => {
      const container = document.createElement('div');
      container.id="container";
      const h2 = document.createElement('h3');
      h2.textContent = "- "+item;
      const delBtn = document.createElement('button');
      const doneBtn = document.createElement('button');
      delBtn.textContent="delete";
      doneBtn.textContent="done";
      delBtn.addEventListener("click",deleteTask)
      doneBtn.addEventListener("click",doneTask)
      const p = document.createElement('p');
      p.innerHTML="\n";
      taskForm.appendChild(container)
      container.appendChild(h2);
      container.appendChild(delBtn);
      container.appendChild(doneBtn);
      container.appendChild(p)
      
  });
}
window.onload = function() {
  displayItems();
};
function deleteTask(event) {
    const target = event.target;
    target.parentElement.remove();
}
function doneTask(event){
  const target = event.target;
  const Task = target.parentElement.querySelector('h3');
  Task.classList.toggle('highlight');; 
}
document.getElementById('searchInput').addEventListener('input', function() {
  const searchQuery = this.value.toLowerCase();
  const todoListItems = document.querySelectorAll('#formTask h3');
  const todoListBtn = document.querySelectorAll('#formTask button');
  todoListBtn.forEach(function(button) {
    button.style.display = 'none';
  });
  
  todoListItems.forEach(function(item) {
    const text = item.textContent.toLowerCase();
    if (text.includes(searchQuery)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
      
    }
  });
});
document.getElementById('searchInput').addEventListener('blur', function() {
  const todoListItems = document.querySelectorAll('#formTask h3');
  todoListItems.forEach(function(item) {
    item.style.display = 'none';
    });
    displayItems();
  });

