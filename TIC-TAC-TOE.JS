let Bord = [];
let numOfCol= 0;
let borad = document.getElementById('borad');
let players = [{
        name: "",
        moves: 0,
        shape: "X",
        play: true,
        class: 'cross'
    },
    {
        name: "",
        moves: 0,
        shape: "O",
        play: false,
        class: 'circle'
    }
];
let playerP = players[0];
let lastID = [];
    turn = 0;
    cross = [];
    circle = [];

function input() {
    numOfCol = Number((document.getElementById('input')).value);
    Bord=[]
    for(i=0;i < numOfCol; i++){
        let row = []
        for(j=0; j < numOfCol; j++){
            let object = {
                id: `${i}${j}`,
                shape: ''
            }
            row.push(object)
        }
        Bord.push(row)
    }
    clean()
    for (i in Bord) {
        let row = document.createElement('div')
        row.className = 'row'
        for (j in Bord[i]) {
            let element = document.createElement('div');
            element.id = i + j;
            element.className = 'col-md'
            element.innerText = '';
            row.appendChild(element);
        }
        borad.appendChild(row)
    }
}

function player() {
    if (players[0].play) {
        players[0].play = false;
        players[1].play = true;
        return players[1]
    } else {
        players[0].play = true;
        players[1].play = false;
        return players[0]
    }
}

let count = 0;
function makeAmove(e) {
    start()
    const shape = document.createElement('div');
    shape.className = playerP.class
    e.appendChild(shape)
    Bord[e.id[0]][e.id[1]].shape = playerP.shape
    count++
    if (count == (numOfCol*numOfCol)){
        stop()
    }

    shape.className = playerP.class;
    e.appendChild(shape);
    Bord[e.id[0]][e.id[1]].shape = playerP.shape;
    if(playerP.shape == "X"){
        cross.push({
            i: e.id[0],
            j: e.id[1]
        })
    }else{
        circle.push({
            i: e.id[0],
            j: e.id[1]
        })
    }
    lastID.push(e.id);
}

function clean() {
    while(borad.firstChild){
        borad.removeChild(borad.firstChild)
    }
}

function undo() {
    let last = lastID.pop()
    let undo = document.getElementById(last);
    undo.removeChild(undo.firstChild);
    Bord[last[0]][last[1]].shape = '';
    playerP= player()
    if(playerP.shape == "X"){
        cross = cross.filter((v,index,o)=> (o[index].i != last[0] || o[index].j != last[1]))
    }else{
        circle = circle.filter((v,index,o)=> (o[index].i != last[0] || o[index].j != last[1]))
    }
}

function save(){
    let saved = [];
    let save = document.querySelectorAll('.row');
    for(i=0; i< save.length;i++){
        saved.push(save[i].outerHTML);
    }
    localStorage.setItem("Board", JSON.stringify(Bord));
    localStorage.setItem("Player", JSON.stringify(playerP));
    localStorage.setItem("Players", JSON.stringify(players));
    localStorage.setItem("IDs", JSON.stringify(lastID));
    localStorage.setItem("Cross", JSON.stringify(cross));
    localStorage.setItem("Circle", JSON.stringify(circle));
    localStorage.setItem("Saved", JSON.stringify(saved));
}

function openSave() {
    clean();
    let saved = JSON.parse(localStorage.getItem('Saved'))
    for(i in saved){
    let child = document.createElement('div');
    borad.appendChild(child);
    child.outerHTML = saved[i]; 
    }
    Bord = JSON.parse(localStorage.getItem("Board"));
    playerP = JSON.parse(localStorage.getItem("Player"));
    players = JSON.parse(localStorage.getItem("Players"));
    lastID = JSON.parse(localStorage.getItem("IDs"));
    cross = JSON.parse(localStorage.getItem("Cross"));
    circle = JSON.parse(localStorage.getItem("Circle"));
}

function checkGame(arr, lengthGame){
    let arr1 = [],iArrNe=[];
    arr1 = [...arr]
    arr1.sort(compareI)
    console.log(arr1);
    while((arr1.length>=lengthGame)){
        if((arr1[0].i==0)){
            iArrNe[0]= arr1[0];
            while(arr1.find((v)=>Number(v.i)==Number(iArrNe[iArrNe.length-1].i)+1)){
                a = arr1.find((v)=>Number(v.i)==Number(iArrNe[iArrNe.length-1].i)+1);
                iArrNe.push(a)
                console.log(a);
            }
            if (iArrNe.length==lengthGame){
                for(t=0;t<iArrNe.length;t++){
                    bChechEJ = arr1.filter((v)=> v.j==arr1[t].j)//בודק את הגיי של אינדקס 0 ובודק כמה פעמים הוא חוזר על עצמו
                    console.log(bChechEJ);
                    if(bChechEJ.length == lengthGame){
                        return true
                    }
                }
                slantL = arr1.filter((v=> v.i==v.j))
                if(slantL.length==lengthGame){return true}
                slantR = arr1.filter((v)=> Number(v.i)+Number(v.j)==lengthGame-1)
                if(slantR.length==lengthGame){return true}  
            }
            return chechRow(arr1,lengthGame,iArrNe);}
        else{return chechRow(arr1,lengthGame,iArrNe);}    
        }
    return false;    
    }

function chechRow (arr, lengthGame,inEquals){
    arr1 = [...arr]
    arr1.sort(compareI)
    console.log(arr1);
    if(inEquals == 0){
        inEquals[0]= arr1[0];
        while(arr1.find((v)=>Number(v.i)==Number(inEquals[inEquals.length-1].i)+1)){
            a = arr1.find((v)=>Number(v.i)==Number(inEquals[inEquals.length-1].i)+1);
            inEquals.push(a)
            console.log(a);
        }
    }
    for(t=0;t<inEquals.length;t++){
        bChechEi = arr1.filter((v)=> v.i==inEquals[t].i)
        if(bChechEi.length == lengthGame){
            return true;
        }
    }
    return false;
}
function compareI( a, b )
  {
  if ( a.i < b.i){
    return -1;
  }
  if ( a.i > b.i){
    return 1;
  }
  return 0;
}

borad.addEventListener('click', (e) => {
    if(e.target.id == (Bord[e.target.id[0]][e.target.id[1]]).id && (Bord[e.target.id[0]][e.target.id[1]]).shape == ''){
        makeAmove(e.target);
        turn++
        if(playerP.shape == "X"){
            console.log(checkGame(cross, numOfCol))
        }else{
          console.log(  checkGame(circle, numOfCol))
        }
        playerP = player()
    }
})


// ##############################################

let stopwatchInterval ;
const deltaInMs = 100;
let timeInMs = 0;


function start() {
    if(stopwatchInterval){
        return;
    }
    stopwatchInterval =setInterval( function () {
        timeInMs = timeInMs + 100 ;
        document.getElementById('watch').innerHTML = stopwatchToString();
    },deltaInMs);
}

function stop() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = undefined ;
}

function stopwatchToString() {
    const milliseconds = (timeInMs / 100) % 10;
    const second = Math.floor((timeInMs / 1000) % 60);
    const minutes = Math.floor(timeInMs / 1000 / 60);

    return `${minutes} : ${second} : ${milliseconds} `

}