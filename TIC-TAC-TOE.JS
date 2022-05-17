const Bord = [
    [{
        id: "00",
        shape: ''
    }, {
        id: "01",
        shape: ''
    }, {
        id: "02",
        shape: ''
    }],
    [{
        id: "10",
        shape: ''
    }, {
        id: "11",
        shape: ''
    }, {
        id: "12",
        shape: ''
    }],
    [{
        id: "20",
        shape: ''
    }, {
        id: "21",
        shape: ''
    }, {
        id: "22",
        shape: ''
    }]
];
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
    turn = 0;

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
    if (count == 9){
        stop()
    }
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