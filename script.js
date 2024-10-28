var counter = 0;
var symbol = 'X';
var board = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3']
];

function getText(element) {
    var choice = element.innerText;
    console.log("Player chose: " + choice);
    getMove(choice, element);
}

function playerTurn() {
    if (counter % 2 === 0) {
        symbol = 'X';
    } else {
        symbol = 'O';
    }
    counter++;
    return symbol;
}

function getMove(choice, element) {
    let position;
    switch (choice) {
        case '1': position = board[2][0]; break;
        case '2': position = board[2][1]; break;
        case '3': position = board[2][2]; break;
        case '4': position = board[1][0]; break;
        case '5': position = board[1][1]; break;
        case '6': position = board[1][2]; break;
        case '7': position = board[0][0]; break;
        case '8': position = board[0][1]; break;
        case '9': position = board[0][2]; break;
        default:
            console.log("Invalid choice. Try Again!");
            return;
    }

    if (element.innerText === 'X' || element.innerText === 'O') {
        console.log("Spot taken. Try Again!");
    } else {
        element.innerText = playerTurn();
        updateBoard(choice);
        if (gameOver()) {
            resetGame();
        }
    }
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

    const originalValues = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];
    const buttons = document.querySelectorAll("button");

    buttons.forEach((button, index) => {
        button.innerText = originalValues[index];
    });

    counter = 0;
    symbol = 'O';
    draw = false;

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
