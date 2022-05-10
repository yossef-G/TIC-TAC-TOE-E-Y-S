// const bord = [["TL","TM","TR"],["ML","MM","MR"],["BR","BM","BL"]];
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
        play: true
    },
    {
        name: "",
        moves: 0,
        shape: "O",
        play: false
    }
];
let playerP = player();

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

for (i in Bord) {
    let row = document.createElement('div')
    row.className = 'row'
    for (j in Bord[i]) {
        let element = document.createElement('div');
        element.id = i + j;
        element.className = 'col-md'
        element.innerText = j;
        row.appendChild(element);
    }
    borad.appendChild(row)
}

function makeAmove(e) {
    e.innerHTML = playerP.shape;
    Bord[e.id[0]][e.id[1]].shape = playerP.shape
}

borad.addEventListener('click', (e) => {
    if (e.target.className == 'row' || e.target.id == "borad") {} else {
        playerP = player()
        makeAmove(e.target);
    }
})