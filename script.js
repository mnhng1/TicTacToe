(function() {
    const boardDim = 3;
    for (let i = 0; i <  boardDim; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j <  boardDim; j++) {
            const cells = document.createElement('div');
            cells.classList.add('cells');
            cells.dataset.row = i;
            cells.dataset.col = j;
            cells.textContent = ' '; // add some temporary content
            row.appendChild(cells);
        }
        document.querySelector('.game-board').appendChild(row);
    }
})();






function Game() {
    let player1, player2;
    function Player(name, symbol){
        let score = 0
        const getScore = () => score;
        const incrementScore = () => score += 1;
        return {name, symbol, getScore, incrementScore}
    };
    (function() {
        document.getElementById('start-game').addEventListener('click', function() {
        player1 = Player(document.getElementById('player1-name').value, document.getElementById('symbol1').value);
        player2 = Player(document.getElementById('player2-name').value, document.getElementById('symbol2').value);
        currentPlayer = player1;
        DisplayController()
        
    })})();
    
    let gameState  = document.createElement("div") ;
    gameState.className = "gameState";
    
    let state = false;
    

    function switchPlayer(){
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
    
    const cells = document.querySelectorAll('.cells');

    const checkWin = (move) => {
        let row = parseInt(move['row']);
        let col = parseInt(move['col']);
        let getCell = (row, col) => {
            return document.querySelector(`.cells[data-row='${row}'][data-col='${col}']`);
        }
    
        // Check row
        for(let i = 0; i < 3; i++) {
            if (!getCell(row, i) || getCell(row, i).textContent !== `${currentPlayer.symbol}`) {
                break;
            }
            if (i === 2) {
                return true;
            }
        }
    
        // Check column
        for(let i = 0; i < 3; i++) {
            if (!getCell(i, col) || getCell(i, col).textContent !== `${currentPlayer.symbol}`) {
                break;
            }
            if (i === 2) {
                return true;
            }
        }
    
        // Check diagonal
        if(row === col) {
            for(let i = 0; i < 3; i++) {
                if (!getCell(i, i) || getCell(i, i).textContent !== `${currentPlayer.symbol}`) {
                    break;
                }
                if (i === 2) {
                    return true;
                }
            }
        }
    
        // Check anti-diagonal
        if(row + col === 2) {
            for(let i = 0; i < 3; i++) {
                if (!getCell(i, 2 - i) || getCell(i, 2 - i).textContent !== `${currentPlayer.symbol}`) {
                    break;
                }
                if (i === 2) {
                    return true;
                }
            }
        }
    
        return false;
    }

    function areAllCellsFilled(cells) {
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent.trim() === '') {
                return false;
            }
        }
        return true;
    }
    


    function reset(){
        if (document.querySelector('.resetButton')) return;
        let resetButton = document.createElement("button");
                            resetButton.className = "resetButton";
                            resetButton.textContent = "RESET";
                            
                            document.querySelector('.game-board').appendChild(gameState).appendChild(resetButton);
                            resetButton.addEventListener('click', function(){
                                cells.forEach(cell => {
                                    cell.textContent = " ";
                                })
                                state = false;
                                gameState.parentNode.removeChild(gameState);
                                resetButton.parentNode.removeChild(resetButton);
                                currentPlayer = player1; // Reset the current player
                            }) 
    }
    const DisplayController = () => {
        
        cells.forEach(cell=> {
            cell.addEventListener('click', function() {
                if (cell.textContent.trim() === '' && (state !==true)){
                        cell.textContent=`${currentPlayer.symbol}`;
                        let move = {row: cell.dataset.row, col:cell.dataset.col}
                        if (checkWin(move) === true ) {
                            state = true;
                            console.log("WINNN")
                            currentPlayer.incrementScore()
                            
                            gameState.textContent = `${currentPlayer.name} have won!`
                            document.querySelector('.game-board').appendChild(gameState);
                            reset()
                        }
                        }
                        switchPlayer()
                        
                            
                        
                        if (areAllCellsFilled(cells) ) {  
                            reset()
                        }
                    
                        
            });
        })};

    // ... rest of your code ...
    return {
        DisplayController,
        
    }
    
    
    
}


let game = Game()

