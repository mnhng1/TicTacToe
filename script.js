(function() {
    const boardDim = 3;
    
    for (let i = 0; i <  boardDim; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j <  boardDim; j++) {
            const cells = document.createElement('div');
            cells.classList.add('cells');
            cells.textContent = ' '; // add some temporary content
            row.appendChild(cells);
        }
        document.querySelector('.game-board').appendChild(row);
    }
})();




(function(){
    let currentPlayer = "X";
    const cells = document.querySelectorAll('.cells');
    cells.forEach(cell=> {
        cell.addEventListener('click', function() {
            if (cell.textContent.trim() === ''){
                currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
                cell.textContent=`${currentPlayer}`;
            }
           
        });
    })
})();



function Game(player1, player2) {
    let state = false;
    let turn = player1
    

    function switchPlayer(){
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
}
function Player(name, symbol){
    return {name, symbol}
}