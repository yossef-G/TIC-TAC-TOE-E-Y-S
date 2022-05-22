let Bord = [];
let numOfCol= 0;
let saved = []
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
    saved = [];
    let save = document.querySelectorAll('.row');
    for(i=0; i< save.length;i++){
        saved.push(save[i].outerHTML);
    }
    let JasonBord = JSON.stringify(Bord);
    let JsonPlayer = JSON.stringify(playerP);
    let JsonPlayers = JSON.stringify(players);
    let JsonIDs = JSON.stringify(lastID);
    let JsonX = JSON.stringify(cross);
    let JsonO = JSON.stringify(circle);
    localStorage.setItem("Board", JasonBord);
    localStorage.setItem("Player", JsonPlayer);
    localStorage.setItem("Players", JsonPlayers);
    localStorage.setItem("IDs", JsonIDs);
    localStorage.setItem("Cross", JsonX);
    localStorage.setItem("Circle", JsonO);
}

function openSave() {
    clean();
    for(i in saved){
    let child = document.createElement('div');
    borad.appendChild(child);
    child.outerHTML = saved[i]; 
    }
    let tempBord = localStorage.getItem("Board");
    let playing = localStorage.getItem("Player");
    let rightPlay = localStorage.getItem("Players");
    let IDs = localStorage.getItem("IDs");
    let Jcross = localStorage.getItem("Cross");
    let Jcircle = localStorage.getItem("Circle");
    Bord = JSON.parse(tempBord);
    playerP = JSON.parse(playing);
    players = JSON.parse(rightPlay);
    lastID = JSON.parse(IDs);
    cross = JSON.parse(Jcross);
    circle = JSON.parse(Jcircle);
}

function compare( a, b )
  {
  if ( a.i < b.i){
    return -1;
  }
  if ( a.i > b.i){
    return 1;
  }
  return 0;
}

function rowCheck(e){
    let check = Bord[e.id[0]];
    if (check[0].shape== check[1].shape && check[0].shape ==check[2].shape)
    return console.log('works')
}

function colCheck(e){
    if (Bord[0][e.id[1]].shape == Bord[1][e.id[1]].shape && Bord[0][e.id[1]].shape == Bord[2][e.id[1]].shape)
    return console.log('col works')
}

function degCheck(){

}


borad.addEventListener('click', (e) => {
    if(e.target.id == (Bord[e.target.id[0]][e.target.id[1]]).id && (Bord[e.target.id[0]][e.target.id[1]]).shape == ''){
        makeAmove(e.target);
        turn++
        rowCheck(e.target)
        colCheck(e.target)
        // degCheck()
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

// function reset() {
//     timeInMs = 0 ;
//     document.getElementById('watch').innerHTML = stopwatchToString();
// }

function stopwatchToString() {
    const milliseconds = (timeInMs / 100) % 10;
    const second = Math.floor((timeInMs / 1000) % 60);
    const minutes = Math.floor(timeInMs / 1000 / 60);

    return `${minutes} : ${second} : ${milliseconds} `

}