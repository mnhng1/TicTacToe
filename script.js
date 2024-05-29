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






const game = (() => {
    let player1, player2;
    function Player(name, symbol){
        let score = 0
        const getScore = () => score;
        const incrementScore = () => score += 1;
        return {name, symbol, getScore, incrementScore}
    };

    document.getElementById('symbol1').addEventListener('change', function() {
    const selectedOption = this.value;
    const symbol2 = document.getElementById('symbol2');
    
    // Clear all options in the second dropdown
    symbol2.innerHTML = '';

    // Add the option that wasn't selected in the first dropdown
    const otherOption = document.createElement('option');
    otherOption.value = selectedOption === 'X' ? 'O' : 'X';
    otherOption.text = selectedOption === 'X' ? 'O' : 'X';
    symbol2.add(otherOption);
    });

    document.getElementById('symbol2').addEventListener('change', function() {
        const selectedOption = this.value;
        const symbol1 = document.getElementById('symbol1');
        
        // Clear all options in the second dropdown
        symbol1.innerHTML = '';
    
        // Add the option that wasn't selected in the first dropdown
        const otherOption = document.createElement('option');
        otherOption.value = selectedOption === 'X' ? 'O' : 'X';
        otherOption.text = selectedOption === 'X' ? 'O' : 'X';
        symbol1.add(otherOption);
        });

    (function() {
        document.getElementById('start-game').addEventListener('click', function() {
        player1 = Player(document.getElementById('player1-name').value, document.getElementById('symbol1').value);
        player2 = Player(document.getElementById('player2-name').value, document.getElementById('symbol2').value);
        currentPlayer = player1;
        
        // Hide the input fields and dropdowns
        document.getElementById('player1-name').style.display = 'none';
        document.getElementById('symbol1').style.display = 'none';
        document.getElementById('player2-name').style.display = 'none';
        document.getElementById('symbol2').style.display = 'none';
        let playerInputs = document.getElementsByClassName("player-inputs");
        while(playerInputs[0]) {
            playerInputs[0].parentNode.removeChild(playerInputs[0]);
        };

        // Display the player names and scores

        
        const player1Display = document.createElement('div');
        player1Display.textContent = `${player1.name}: ${player1.getScore()}`;
        player1Display.id= "player1-score"
        document.body.appendChild(player1Display);

        const player2Display = document.createElement('div');
        player2Display.textContent = `${player2.name}: ${player2.getScore()}`;
        player2Display.id= "player2-score"
        document.body.appendChild(player2Display);
        
        
        
        DisplayController();
        
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
                           
                            
                            document.getElementById('player1-score').textContent = `${player1.name}: ${player1.getScore()}`;
                            document.getElementById('player2-score').textContent = `${player2.name}: ${player2.getScore()}`;
                            


                            gameState.textContent = `${currentPlayer.name} have won!`
                            document.querySelector('.game-board').appendChild(gameState);
                            reset()
                        }
                        }
                        switchPlayer()
                        
                            
                        
                        if (areAllCellsFilled(cells) ) {  
                            gameState.textContent = `TIE`
                            reset()
                        }
                    
                        
            });
        })};

    // ... rest of your code ...
    return {
        DisplayController,
        
    }
    
    
    
})();



