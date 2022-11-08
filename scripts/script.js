const playerFactory = (name, marker) =>{
  const playerInfo = () =>{
    console.log(`Name: ${name} || Marker: ${marker}`)
  }
  return{name, marker, playerInfo}
}


const Game = (() =>{
  const gameTile = document.querySelectorAll('.tile');
  const turnMessage = document.querySelector('.turn-text');
  const tileArray = Array.prototype.slice.call(gameTile);
  const resetBtn = document.querySelector('.restart-button');
  let gameArray = ['','','','','','','','','']
  let round = 1;
  let roundCount = round - 1;


  const setTurnMessage = (player) =>{
    turnMessage.textContent = `${player}'s Turn`;
  }

  const renderBoard = (gameArray) =>{
    for(let i = 0; i<= gameArray.length - 1; i++){
      if(gameArray[i] === 'X'){
        tileArray[i].textContent = 'X';
      }else if(gameArray[i] === 'O'){
        tileArray[i].textContent = 'O';
      }
    }
  }

  const reset = () =>{
    gameTile.forEach(tile =>{
      tile.innerHTML = "";
    })
    round = 1;
    roundCount = round - 1;
    gameArray = ['','','','','','','','','']
    console.log('click');
    renderBoard(gameArray);
    setTurnMessage(player1.name);
    tileArray.forEach(tile =>{
      tile.addEventListener('click', placeMarker)
    })
  }

  resetBtn.addEventListener('click', reset);

  const getPlayerMarker = () =>{
    if(round % 2 == 0){
      setTurnMessage(player1.name);
      return player2.marker;  
    }else{
      setTurnMessage(player2.name);
      return player1.marker;
    }
  }

  const checkRow = (gameArray) => {
    let row1 = [gameArray[0], gameArray[1], gameArray[2]]
    let row2 = [gameArray[3], gameArray[4], gameArray[5]]
    let row3 = [gameArray[6], gameArray[7], gameArray[8]]

    if(row1.every(element => element == 'X') || row1.every(element => element == 'O')){
      return true;
    }else if(row2.every(element => element == 'X') || row2.every(element => element == 'O')){
      return true;
    }else if(row3.every(element => element == 'X') || row3.every(element => element == 'O')){
      return true;
    }
  }

  const checkColumn = (gameArray) =>{
    let col1 = [gameArray[0], gameArray[3], gameArray[6]]
    let col2 = [gameArray[1], gameArray[4], gameArray[7]]
    let col3 = [gameArray[2], gameArray[5], gameArray[8]]

    if(col1.every(element => element == 'X') || col1.every(element => element == 'O')){
      return true;
    }else if(col2.every(element => element == 'X') || col2.every(element => element == 'O')){
      return true;
    }else if(col3.every(element => element == 'X') || col3.every(element => element == 'O')){
      return true;
    }
  }

  const checkDiagonal = (gameArray) =>{
    let diagonal1 = [gameArray[0], gameArray[4], gameArray[8]]
    let diagonal2 = [gameArray[2], gameArray[4], gameArray[6]]
    if(diagonal1.every(element => element == 'X') || diagonal1.every(element => element == 'O')){
      return true;
    }else if(diagonal2.every(element => element == 'X') || diagonal2.every(element => element == 'O')){
      return true;
    }
  }

  const checkWinner = (gameArray, marker) =>{

    if(checkRow(gameArray)){
      turnMessage.textContent = `Winner ${marker}!`;
      tileArray.forEach(tile =>{
        tile.removeEventListener('click', placeMarker)
      })
    }else if(checkColumn(gameArray)){
      turnMessage.textContent = `Winner ${marker}!`;
      tileArray.forEach(tile =>{
        tile.removeEventListener('click', placeMarker)
      })
    }else if(checkDiagonal(gameArray)){
      turnMessage.textContent = `Winner ${marker}!`;
      tileArray.forEach(tile =>{
        tile.removeEventListener('click', placeMarker)
      })
    }else if(roundCount == 9){
      turnMessage.textContent = "Draw!";
    }

  }

  const placeMarker = (e) => {
    const tileId = e.target.dataset.id
    console.log(tileId);

    // Check if a tile is occupied
    if(gameArray[tileId] !== ""){
      console.log('Occupied');
    }else{
      let marker = getPlayerMarker()
      gameArray.splice(tileId,1, marker);
      console.log(gameArray);
      renderBoard(gameArray);
      round++;
      roundCount++;
      console.log(`Round: ${roundCount}`);
      checkWinner(gameArray, marker);
    }

  }

  tileArray.forEach(tile =>{
    tile.addEventListener('click', placeMarker)
  })

  return{ placeMarker, setTurnMessage, reset}
})();

// Game start
const player1 = playerFactory('X', 'X');
const player2 = playerFactory('O', 'O');
Game.setTurnMessage(player1.name);


