let game = {
    Borad: [],
    numOfCol: 0,
    players: [{
        name: "ber",
        moves: 0,
        shape: "X",
        play: true,
        class: 'cross'
        },
        {
        name: "ben",
        moves: 0,
        shape: "O",
        play: false,
        class: 'circle'
        }
        ],
    lastID: [],
    turn: 1,
    cross: [],
    circle: [],
    timeInMs: 0
}
let stopwatchInterval ;
const deltaInMs = 100;
let borad = document.getElementById('borad');
let playerP = game.players[0];

function input() {
    stop()
    clean()
    document.getElementById("pl1").style = 'box-shadow: 0 0 0.6rem 0 rgba(247, 255, 5, 0.84);'
    document.getElementById("pl2").style = 'box-shadow: none; padding-left: 0.7rem;'
    game.numOfCol = Number((document.getElementById('input')).value);
    game.Borad=[]
    game.lastID=[]
    game.cross = []
    game.circle = []
    game.turn = 1
    game.timeInMs = 0
    game.players[0].play = true
    game.players[0].name = document.getElementById("player1").value
    game.players[1].name = document.getElementById("player2").value
    document.getElementById('watch').innerHTML = '0 : 0 : 0';
    playerP = game.players[0];
    for(i=0;i < game.numOfCol; i++){
        let row = []
        for(j=0; j < game.numOfCol; j++){
            let object = {
                id: `${i}${j}`,
                shape: ''
            }
            row.push(object)
        }
        game.Borad.push(row)
    }
    for (i in game.Borad) {
        let row = document.createElement('div')
        row.className = 'row'
        for (j in game.Borad[i]) {
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
    if (game.players[0].play) {
        game.players[0].play = false;
        game.players[1].play = true;
        document.getElementById("pl1").style = 'box-shadow: none;'
        document.getElementById("pl2").style = 'box-shadow: 0 0 0.6rem 0 rgba(247, 255, 5, 0.84); padding-left: 0.7rem;'
        return game.players[1]
    } else {
        game.players[0].play = true;
        game.players[1].play = false;
        document.getElementById("pl1").style = 'box-shadow: 0 0 0.6rem 0 rgba(247, 255, 5, 0.84);'
        document.getElementById("pl2").style = 'box-shadow: none; padding-left: 0.7rem;'
        return game.players[0]
    }
}

function makeAmove(e) {
    start()
    const shape = document.createElement('div');
    shape.className = playerP.class
    e.appendChild(shape)
    game.Borad[e.id[0]][e.id[1]].shape = playerP.shape
    if (game.turn == (game.numOfCol*game.numOfCol)){
        stop()
    }

    shape.className = playerP.class;
    e.appendChild(shape);
    game.Borad[e.id[0]][e.id[1]].shape = playerP.shape;
    if(playerP.shape == "X"){
        game.cross.push({
            i: e.id[0],
            j: e.id[1]
        })
    }else{
        game.circle.push({
            i: e.id[0],
            j: e.id[1]
        })
    }
    game.lastID.push(e.id);
}

function clean() {
    while(borad.firstChild){
        borad.removeChild(borad.firstChild)
    }
}

function undo() {
    let last = game.lastID.pop()
    let undo = document.getElementById(last);
    undo.removeChild(undo.firstChild);
    game.Borad[last[0]][last[1]].shape = '';
    playerP= player()
    if(playerP.shape == "X"){
        game.cross = game.cross.filter((v,index,o)=> (o[index].i != last[0] || o[index].j != last[1]))
    }else{
        game.circle = game.circle.filter((v,index,o)=> (o[index].i != last[0] || o[index].j != last[1]))
    }
}

function save(){
    let saved = [];
    let save = document.querySelectorAll('.row');
    for(i=0; i< save.length;i++){
        saved.push(save[i].outerHTML);
    }
    localStorage.setItem("Player", JSON.stringify(playerP));
    localStorage.setItem("Game", JSON.stringify(game));
    localStorage.setItem("Saved", JSON.stringify(saved));
}

function openSave() {
    clean();
    stop();
    let saved = JSON.parse(localStorage.getItem('Saved'))
    for(i in saved){
    let child = document.createElement('div');
    borad.appendChild(child);
    child.outerHTML = saved[i]; 
    }
    game = JSON.parse(localStorage.getItem("Game"));
    playerP = JSON.parse(localStorage.getItem("Player"));
    document.getElementById('watch').innerHTML = stopwatchToString();
}

function checkGame(arr, lengthGame){
    let arr1 = [],iArrNe=[];
    arr1 = [...arr]
    arr1.sort(compareI)
    while((arr1.length>=lengthGame)){
        if((arr1[0].i==0)){
            iArrNe[0]= arr1[0];
            while(arr1.find((v)=>Number(v.i)==Number(iArrNe[iArrNe.length-1].i)+1)){
                a = arr1.find((v)=>Number(v.i)==Number(iArrNe[iArrNe.length-1].i)+1);
                iArrNe.push(a)
            }
            if (iArrNe.length==lengthGame){
                for(t=0;t<iArrNe.length;t++){
                    bChechEJ = arr1.filter((v)=> v.j==arr1[t].j)//בודק את הגיי של אינדקס 0 ובודק כמה פעמים הוא חוזר על עצמו
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
    if(inEquals == 0){
        inEquals[0]= arr1[0];
        while(arr1.find((v)=>Number(v.i)==Number(inEquals[inEquals.length-1].i)+1)){
            a = arr1.find((v)=>Number(v.i)==Number(inEquals[inEquals.length-1].i)+1);
            inEquals.push(a)
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

function win(){
    let element = document.createElement("div")
    element.className = 'grayback'
    let elementx = document.createElement("div")
    elementx.className = 'winner'
    elementx.innerText = `${playerP.name} wins!`
    element.appendChild(elementx)
    borad.appendChild(element)
    element.addEventListener('click', ()=>{
    borad.removeChild(element)
})
}

borad.addEventListener('click', (e) => {
    if(e.target.id == (game.Borad[e.target.id[0]][e.target.id[1]]).id && (game.Borad[e.target.id[0]][e.target.id[1]]).shape == ''){
        makeAmove(e.target);
        game.turn++
        if(playerP.shape == "X"){
            if(checkGame(game.cross, game.numOfCol)){
                stop()
                win()
            }
        }else{
            if(checkGame(game.circle, game.numOfCol)){
                stop()
                win()
            }
        }
        playerP = player()
    }
})

// ##############################################

function start() {
    if(stopwatchInterval){
        return;
    }
    stopwatchInterval =setInterval( function () {
        game.timeInMs = game.timeInMs + 100 ;
        document.getElementById('watch').innerHTML = stopwatchToString();
    },deltaInMs);
}

function stop() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = undefined ;
}

function stopwatchToString() {
    const milliseconds = (game.timeInMs / 100) % 10;
    const second = Math.floor((game.timeInMs / 1000) % 60);
    const minutes = Math.floor(game.timeInMs / 1000 / 60);

    return `${minutes} : ${second} : ${milliseconds} `

}