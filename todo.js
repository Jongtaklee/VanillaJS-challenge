const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    finishedList = document.querySelector(".js-finished");


const TODOS_LS = 'PENDING';
const FIN_LS = 'FINISHED';

let toDos = [];
let finToDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;

    if (li.childNodes[2].innerText === "!"){
        toDoList.removeChild(li);
        const cleanToDos = toDos.filter(function(toDo){
            return toDo.id !== parseInt(li.id);
        });
        toDos = cleanToDos;
        saveToDos();
    } else {
        finishedList.removeChild(li);
        const cleanFins = finToDos.filter(function(fins){
            return fins.id !== li.id;
        });

        finToDos = cleanFins;
        saveToDos();

    }


}

function switchToDo(event){
    const btnSw = event.target;
    const liSw = btnSw.parentNode;

    if (liSw.childNodes[2].innerText === "!"){
        liSw.childNodes[2].innerText="-";
        toDoList.removeChild(liSw);
        finishedList.appendChild(liSw);
        const leftToDo = toDos.filter(function(toDo){
            return toDo.id !== parseInt(liSw.id);
        });

        const appFinObj = {
            text : liSw.childNodes[0].innerText,
            id : liSw.id
        }

        toDos = leftToDo;
        finToDos.push(appFinObj);
        saveToDos();

    } else {
        liSw.childNodes[2].innerText="!";
        finishedList.removeChild(liSw);
        toDoList.appendChild(liSw);
        const leftFin = finToDos.filter(function(toDo){
            return toDo.id !== parseInt(liSw.id);
        });
        const appToDoObj = {
            text : liSw.childNodes[0].innerText,
            id : liSw.id
        }

        finToDos = leftFin;
        toDos.push(appToDoObj);
        saveToDos();
    }

}



function saveToDos(){
    // trun javascript objects to string
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    localStorage.setItem(FIN_LS, JSON.stringify(finToDos));
}


function paintToDo(text, id){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const switchBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = id;
    
    delBtn.innerText="X";
    switchBtn.innerText="!";
    delBtn.addEventListener("click",deleteToDo);
    switchBtn.addEventListener("click",switchToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(switchBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function paintFin(text, id){
    const liFin = document.createElement("li");
    const delBtnFin = document.createElement("button");
    const switchBtnFin = document.createElement("button");
    const spanFin = document.createElement("span");
    const newIdFin = id;
    delBtnFin.innerText="X";
    switchBtnFin.innerText="-";
    delBtnFin.addEventListener("click",deleteToDo);
    switchBtnFin.addEventListener("click",switchToDo);
    spanFin.innerText = text;
    liFin.appendChild(spanFin);
    liFin.appendChild(delBtnFin);
    liFin.appendChild(switchBtnFin);
    liFin.id = newIdFin;
    finishedList.appendChild(liFin);
    const finObj = {
        text: text,
        id: newIdFin
    };
    finToDos.push(finObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault(); 
    event.stopPropagation();
    const currentValue = toDoInput.value;
    const currentNewId = new Date().getTime();
    paintToDo(currentValue, currentNewId);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const loadedFinToDos = localStorage.getItem(FIN_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text, toDo.id);
        })
    }

    if(loadedFinToDos !== null) {
        const parsedFinToDos = JSON.parse(loadedFinToDos);
        parsedFinToDos.forEach(function(finToDo){
            paintFin(finToDo.text, finToDo.id);
        })
    
    } 
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit)
}

init();