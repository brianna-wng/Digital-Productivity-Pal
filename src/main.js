let addToDoButton = document.getElementById('addToDo');
let listContainer = document.getElementById('list-container');
let inputField = document.getElementById('inputField');
let inputTime = document.getElementById('inputTime');
let coinCount = document.getElementById('coinCount');
let happApp = document.getElementById('happApp');
let foodApp = document.getElementById('foodApp');
let sleepApp = document.getElementById('sleepApp');

let turtle = document.getElementById('turtle');

const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');
const p3 = document.getElementById('p3');

let percent1 = 100;
let percent2 = 100;
let percent3 = 100;

let min_cost = 10;
let boost = 5;
let totalTime = 0;



function time(){
    let dt = new Date();
    document.getElementById("curr-time").innerHTML = (("0"+dt.getHours()).slice(-2)) +":"+ (("0"+dt.getMinutes()).slice(-2));
}

function getEstTime(){
    let currDT = new Date();
    currDT.setMinutes(currDT.getMinutes() + totalTime);
    document.getElementById("est-time").innerHTML = "Est. Time of Completion: " + (("0"+currDT.getHours()).slice(-2)) +":"+ (("0"+currDT.getMinutes()).slice(-2));

}
function toggleInput(){
    let taskInput = document.getElementById("task-input");
    let but = document.getElementById("add-task");
    if(taskInput.style.display == 'block'){
        taskInput.style.display = 'none';
        but.style.display = 'block';
    }else{
        taskInput.style.display = 'block';
        but.style.display = 'none';
    }
    inputField.value = "";
    inputTime.value = "";
}
function addTask(){
    if(inputField.value == "" || inputTime.value == "") {
        alert("You must write something");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputField.value +" (" + inputTime.value + " min)";
        totalTime += parseInt(inputTime.value);
        console.log(totalTime);
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        toggleInput();
    }
    getEstTime();
    inputField.value = "";
    inputTime.value = "";
    saveData();

}
inputField.addEventListener("keyup", function(e){
    if (e.key === 'Enter' || e.keyCode === 13){
        addTask();
    }
}, false);

inputTime.addEventListener("keyup", function(e){
    if (e.key === 'Enter' || e.keyCode === 13){
        addTask();
    }
}, false);

function updateCoins(num){
    coins = coins + num
    coinCount.innerHTML = coins;

}

function changeWidth1(num){
    percent1 += num;
    return percent1;
}

function changeWidth2(num){
    percent2 += num;
    console.log(percent2);
    return percent2;
}

function changeWidth3(num){
    percent3 += num;
    return percent3;
}

function updateWidth(att, percent){
    att.style.width = `${percent}%`;
    att.innerText = `${percent}%`;
}
listContainer.addEventListener("click", function(e){
    
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        taskText = e.target.innerHTML;
        timeToCoins = parseInt((taskText.split("(")[1]).split(" ")[0]);
        if(e.target.classList == "checked"){
            updateCoins(timeToCoins);
            totalTime -= timeToCoins;
            getEstTime();
        }else{
            updateCoins(-timeToCoins);
            totalTime += timeToCoins;
            getEstTime();
        }
        console.log(totalTime);
        
        saveData();

    }
    else if(e.target.tagName === "SPAN"){
        if(e.target.parentElement.classList != "checked"){
            taskText = e.target.parentElement.innerHTML;
            timeToCoins = parseInt((taskText.split("(")[1]).split(" ")[0]);
            console.log("time: "+timeToCoins);
            totalTime -= timeToCoins;
            getEstTime();
        }
        e.target.parentElement.remove()
        saveData();

    }
}, false);

happApp.addEventListener("click", function(e) {
    if(coins >= min_cost){
        if(parseInt(p1.style.width) + boost > 100){
            alert("your pet is very happy already")
        }else{
            updateCoins(-min_cost);
            updateWidth(p1, changeWidth1(boost));
            updateOp();
        }
    }else{
        alert("you don't have enough coins!");
    }
    saveData();
}, false);

foodApp.addEventListener("click", function(e) {
    if(coins >= min_cost){
        if(parseInt(p2.style.width) + boost > 100){
            alert("your pet is very full already")
        }else{
            updateCoins(-min_cost);
            updateWidth(p2, changeWidth2(boost));
            updateOp();

        }
    }else{
        alert("you don't have enough coins!");
    }
    saveData();
}, false);

sleepApp.addEventListener("click", function(e) {
    if(coins >= min_cost){
        if(parseInt(p3.style.width) + boost > 100){
            alert("your pet is very rested already")
        }else{
            updateCoins(-min_cost);
            updateWidth(p3, changeWidth3(boost));
            updateOp();
        }
    }else{
        alert("you don't have enough coins!");
    }
    saveData();
}, false);

turtle.addEventListener("click", function(e){
    turtle.classList = "";
    
    setTimeout(function(){
        turtle.classList = "move";
    },50)

}, false);

function loseAtt(){
    percent1 = Math.max(0, percent1-2);
    updateWidth(p1, percent1);
    percent2 = Math.max(0, percent2-3);
    console.log(percent2)
    updateWidth(p2, percent2);
    percent3 = Math.max(0, percent3-1);
    updateWidth(p3, percent3);
    updateOp();
}

function updateOp(){
    op = Math.min(percent1, percent2, percent3);
    if(op == 0){
        alert("revive your pet!");
    }
    turtle.style.opacity = `${op}%`;
}
function saveData(){
    localStorage.setItem("tasks", listContainer.innerHTML);
    localStorage.setItem("coins", coinCount.innerHTML);
    localStorage.setItem("totalTime", totalTime);

}

function showData(){
    listContainer.innerHTML = localStorage.getItem("tasks");
    coinCount.innerHTML = localStorage.getItem("coins");
    if(!coinCount.innerHTML){
        coins = 0;
    }else{
        coins = parseInt(coinCount.innerHTML);
        //coins = 0;
    }
    if(!localStorage.getItem("totalTime")){
        totalTime = 0;
    }else{
        totalTime = parseInt(localStorage.getItem("totalTime"));
        //totalTime = 0;
    }
    console.log(totalTime);

}
showData();
updateWidth(p1, percent1);
updateWidth(p2, percent2);
updateWidth(p3, percent3);

getEstTime();
setInterval(time, 1000);
setInterval(loseAtt, 10000);
