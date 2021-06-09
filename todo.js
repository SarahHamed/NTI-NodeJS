const taskHeads = ["id", "title", "content", "taskType", "dueDate", "status", "important"]

const getAllData = () => JSON.parse(localStorage.getItem('tasks')) || []

const setAllData = (tasks) =>localStorage.setItem('tasks', JSON.stringify(tasks))

var taskIndex=0;

const createCustomElement = (parent, element, classes , attributes, text) => {
    const myElement = document.createElement(element)
    parent.appendChild(myElement)
    if(classes != '') myElement.className = classes
    if(text != '') myElement.textContent = text
    if(attributes.length != 0){    
        attributes.forEach(attribute=>{
            myElement.setAttribute(attribute.attrName, attribute.attValue)
        })
    }
    return myElement
}

// const drawTask = (task) =>{


//     console.log(task.id)
// }
const addTask = (task) =>{
    tasks = getAllData()
    tasks.push(task)
    setAllData(tasks)
}

showTask = function(task)
{
    taskDiv = createCustomElement(rowContainer, 'div', 'col-4 ', [], '')
    innerDiv = createCustomElement(taskDiv, 'div', 'm-4 bg-primary p-3', [], '')
    taskHeads.forEach(h=>{
        div = createCustomElement(innerDiv, 'div', '', [], '')
        key = createCustomElement(div, "span", "", [{attrName:"style", attValue:"color:white"}], h+": ")
        h5 = createCustomElement(div, "span", "", [], task[h])
    })
    delBtn = createCustomElement(innerDiv, 'button', 'btn btn-danger c', [], 'delete')
    delBtn.addEventListener('click', function(e){
        tasks = getAllData()
        console.log(task)

        found = tasks.findIndex( elem => elem.id ===task.id );
        console.log("found "+ found)
        tasks.splice(found,1)
        this.parentElement.parentElement.remove()      
        setAllData(tasks)
    })

    showEditForm = function(task)
    {
        if(document.querySelector('#AddForm')!= null)
            document.querySelector('#AddForm').remove() 
        if(document.querySelector('#allTasks')!= null)
            document.querySelector('#allTasks').remove() 
        editSec = document.querySelector('#editSec').innerHTML=`
        <div class="col-md-6 container my-5 border border-3 p-3">
        <form id="editTask">
        <h5>`+task['id']+`</h5>
        <div class="mb-3">
          <label class="form-label">title</label>
          <input type="text" class="form-control" name="title" value="`+task['title']+`" />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label"
            >Content</label
          >
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            name="content"
          >`+task['content']+`</textarea>
        </div>
        <div class="mb-3">
          <select
            class="form-select"
            aria-label="Default select example"
            name="taskType"
          >
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">title</label>
          <input type="date" class="form-control" name="dueDate" />
        </div>
        <div class="mb-3">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              name="status"
            />
            <label class="form-check-label" for="flexCheckChecked">
              Status</label
            >
          </div>
        </div>
        <div class="mb-3">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="important"
              id="flexRadioDefault1"
              value="Important"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Important
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="important"
              id="flexRadioDefault2"
              checked
              value="Not important"
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Not Important
            </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Edit</button>
      </form>
      </div>
        `
    }
    
    editBtn = createCustomElement(innerDiv, 'button', 'btn btn-warning m-2 c', [], 'edit')
    editBtn.addEventListener('click', function(e){
        tasks = getAllData()
        found = tasks.findIndex( elem => elem.id ===task.id );
        console.log("edit"+ task.id)
        showEditForm(tasks[found]);
        taskIndex=found;
        console.log("taskIndex= "+taskIndex)
    })
}

let tasks = getAllData()
allTasks = document.querySelector('#allTasks')
rowContainer = createCustomElement(allTasks, 'div', 'row', [], '')
tasks.forEach((task,i)=>{
    // drawTask(task)
    showTask(task)
})

document.querySelector('#addTask').addEventListener('submit', function(e){
    e.preventDefault()
    if(tasks.length==0) task = {id:1}
    else { task = { id: (tasks[tasks.length-1].id+1)} }
    console.log(task)
    taskHeads.forEach((h,i) => {
        if(i!=0 && h!="status") task[h] = e.target.elements[h].value
        else if(h=="status") task[h] = e.target.elements[h].checked
    })
    addTask(task)
    showTask(task)

    this.reset()
})



document.querySelector('#editSec').addEventListener('submit', function(e){
    e.preventDefault()
   /* if(tasks.length==0) task = {id:1}
    else { task = { id: (tasks[tasks.length-1].id+1)} }
    console.log(task)
    taskHeads.forEach((h,i) => {
        if(i!=0 && h!="status") task[h] = e.target.elements[h].value
        else if(h=="status") task[h] = e.target.elements[h].checked
    })
    addTask(task)
    showTask(task)

    this.remove()
    */
  // task={}
   console.log("elements"+ e.target.elements)
   tasks=getAllData();
   taskHeads.forEach((h,i) => {
       console.log("taskIndex call"+taskIndex);
    if(i!=0 && h!="status") tasks[taskIndex][h] = e.target.elements[h].value
    else if(h=="status") tasks[taskIndex][h] = e.target.elements[h].checked
})
   console.log(e)
  /* console.log("task is"+ task)
   console.log(task)*/
   setAllData(tasks)
   //this.remove();
   document.querySelector('#editTask').parentElement.remove()
   const newSec= document.querySelector("#showafter");

   //newSec.innerHTML="hello wworld"
   
   rowContainer = createCustomElement(newSec, 'div', 'row', [], '') 
   tasks.forEach((task,i)=>{
       // drawTask(task)
       console.log("here 2ho")
       showTask(task)
   })
   

})

// dels = document.querySelectorAll('.c')
// dels.forEach((d, i)=>{
//     d.addEventListener('click', function(e){
//         console.log(i)
//         tasks = getAllData()
//         tasks.splice(i,1)
//     console.log(this.parentElement)  
//     this.parentElement.parentElement.remove()      
//         setAllData(tasks)
//     })
    
// })









