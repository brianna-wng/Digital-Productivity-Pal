let addToDoButton = document.getElementById('addToDo');
let listContainer = document.getElementById('list-container');
let inputField = document.getElementById('inputField');
let coinCount = document.getElementById('coinCount')
let coins = 0;

function addTask(){
    if(inputField.value == "") {
        alert("You must write something");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputField.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputField.value = "";
    saveData();

}
function updateCoins(num){
    coins = coins + num
    coinCount.innerHTML = coins;
    console.log(coinCount.innerHTML)

}
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        if(e.target.classList == "checked"){
            updateCoins(50);
        }else{
            updateCoins(-50);
        }
        
        saveData();

    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove()
        saveData();

    }
}, false);

function saveData(){
    localStorage.setItem("tasks", listContainer.innerHTML);
    localStorage.setItem("coins", coinCount.innerHTML);
    console.log("saved")
    console.log(coins.innerHTML);

}

function showData(){
    listContainer.innerHTML = localStorage.getItem("tasks");
    coinCount.innerHTML = localStorage.getItem("coins");
    console.log("got")
    console.log(coins.innerHTML);

}

showData();
