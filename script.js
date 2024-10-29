var counter = 0;
var symbol = 'X';
var board = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3']
];

function getText(element) {
    if (element.innerText === 'X' || element.innerText === 'O') {
        console.log("Spot taken. Try Again!");
        return;
    }

    element.innerText = playerTurn();
    let choice = element.getAttribute("data-symbol"); 
    updateBoard(choice); 

    if (gameOver()) {
        resetGame();
    }
}

function playerTurn() {
    symbol = (counter % 2 === 0) ? 'X' : 'O'; 
    counter++;
    return symbol;
}

function updateBoard(choice) {
    switch (choice) {
        case '1': board[2][0] = symbol; break;
        case '2': board[2][1] = symbol; break;
        case '3': board[2][2] = symbol; break;
        case '4': board[1][0] = symbol; break;
        case '5': board[1][1] = symbol; break;
        case '6': board[1][2] = symbol; break;
        case '7': board[0][0] = symbol; break;
        case '8': board[0][1] = symbol; break;
        case '9': board[0][2] = symbol; break;
    }
}

function gameOver() {
    
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
            setWinner(board[i][0]); 
            return true;
        }
        if (board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
            setWinner(board[0][i]); 
            return true;
        }
    }
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        setWinner(board[0][0]);
        return true;
    }
    if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        setWinner(board[0][2]); 
        return true;
    }
    if (counter === 9) {
        alert("\nGAME DRAW!\n"); 
        return true;
    }
    return false; 
}

function resetGame() {
    board = [
        ['7', '8', '9'],
        ['4', '5', '6'],
        ['1', '2', '3']
    ];

    const buttons = document.querySelectorAll(".tile");
    buttons.forEach(button => {
        button.innerText = ''; 
    });

    counter = 0; 
    symbol = 'X'; 
    console.log("Game has been reset.");
}

function setWinner(winSymbol) {
    let message = (symbol === 'O') ? "Congratulations! Player O has won the game" : "Congratulations! Player X has won the game";
    if (confirm(`${message}\nDo you want to play again?`)) {
        resetGame(); 
    } else {
        location.reload(); 
    }
}

document.querySelectorAll(".tile").forEach(button => {
    button.addEventListener("click", function() {
        getText(button); 
    });
});
