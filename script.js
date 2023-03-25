// grab all elements 
const form = document.querySelector(".form");
const lists = document.querySelector(".lists");
const input = document.querySelector(".form input");

let todoArr = getItems();

// local storage
function getItems(){
    let storage = JSON.parse(localStorage.getItem("todo-test")) || [];
    return storage
}

function setItems(todoArr){
    localStorage.setItem("todo-test", JSON.stringify(todoArr));
}

// display the todo in the DOM;
function displayData(){
    todoArr.sort((a, b) => {
        if (a.todo < b.todo) return -1;
        if (a.todo > b.todo) return 1;
    })

    let displayData = todoArr.map((item) => {
        return `
            <div class="todo">
            <p>${item.todo}</p>
            <i class="fa-sharp fa-solid fa-trash fa-lg remove" data-id = ${item.id}></i>
            </div>
        `
    });
    lists.innerHTML = displayData.join("");
}

// remove todo from DOM and todo array
function removeTodo(){
    lists.addEventListener("click", (e) => {
        if(e.target.classList.contains("remove")){
            e.target.parentElement.remove();
        }
        let removeTodoId = e.target.dataset.id;
        //remove from array.
        removeArrayTodo(removeTodoId);
    });
}

function removeArrayTodo(id){
    todoArr = todoArr.filter((item) => item.id !== +id);
    setItems(todoArr);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let id = Math.random() * 1000000;
    const todo = {id, todo: input.value};
    todoArr = [...todoArr, todo];
    input.value = "";
    displayData();
    // //add to storage
    setItems(todoArr);
});

window.addEventListener("DOMContentLoaded", () => {
    displayData();
    //remove from the dom
    removeTodo();
});