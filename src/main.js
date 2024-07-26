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

let percent1 = 50;
let percent2 = 50;
let percent3 = 50;

let min_cost = 1;
let boost = 10;
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
    console.log(taskInput.style.display);
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
function updateCoins(num){
    coins = coins + num
    coinCount.innerHTML = coins;
    //console.log(coinCount.innerHTML)

}

function changeWidth1(num){
    percent1 += num;
    return percent1;
}

function changeWidth2(num){
    percent2 += num;
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
        e.target.parentElement.remove()
        saveData();

    }
}, false);

happApp.addEventListener("click", function(e) {
    if(coins >= min_cost){
        console.log(parseInt(p1.style.width));
        if(parseInt(p1.style.width) + boost > 100){
            alert("your pet is very happy already")
        }else{
            updateCoins(-min_cost);
            updateWidth(p1, changeWidth1(10));
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
            updateCoins(-1);
            updateWidth(p2, changeWidth2(10));
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
            updateCoins(-1);
            updateWidth(p3, changeWidth3(10));
        }
    }else{
        alert("you don't have enough coins!");
    }
    saveData();
}, false);

turtle.addEventListener("click", function(e){
    turtle.classList.toggle("move");
}, false);

function loseAtt(){
    if(percent1 > 0){
        percent1 -= 1;
        updateWidth(p1, percent1);
    }
    if(percent2 > 0){
        percent2 -= 1;
        updateWidth(p2, percent2);
    }
    if(percent3 > 0){
        percent3 -= 1;
        updateWidth(p3, percent3);
    }
}
function saveData(){
    localStorage.setItem("tasks", listContainer.innerHTML);
    localStorage.setItem("coins", coinCount.innerHTML);


}

function showData(){
    listContainer.innerHTML = localStorage.getItem("tasks");
    coinCount.innerHTML = localStorage.getItem("coins");
    coins = parseInt(coinCount.innerHTML)

}
showData();
updateWidth(p1, percent1);
updateWidth(p2, percent2);
updateWidth(p3, percent3);

getEstTime();
setInterval(time, 1000);
setInterval(loseAtt, 60000);
