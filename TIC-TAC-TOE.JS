let Bord = []
    numOfCol= 0;
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
    numOfCol = (document.getElementById('input')).value;
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
    // e.className = playerP.class;
    Bord[e.id[0]][e.id[1]].shape = playerP.shape
    count++
    if (count == numOfCol*numOfCol){
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