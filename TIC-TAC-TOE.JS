let players = [
{
name : "",
moves : 0,
shape : "X",
play : true
},
{
name : "",
moves : 0,
shape : "O",
play : false}];

function player () {
    if(players[0].play){
        players[0].play = false;
        players[1].play = true ;
        return players[1]
    }
    else{
        players[0].play = true ;
        players[1].play = false ;
        return players[0]
    }
}

function makeAmove(e) {
    let player = player();
    e.target.innerHTML = player.shape ;
    

}