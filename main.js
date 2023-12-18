const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");
let board = [];
let data = new Array(9);
const imageX = new Image();
imageX.src = "img/X.png";
const imageO = new Image();
imageO.src = "img/O.png";
let currentPlayer = "X";
const gameOverElement = document.getElementById("gameover");
let gameOver = false;
const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
];

function drawBoard(){
    let id = 0
    for (let i = 0; i < 3; i++){
        board[i] = [];
        for(let j = 0; j < 3; j++){
            board[i][j] = id;
            id++;
            ctx.strokeRect(j * 150, i * 150, 150, 150);
        }
    }
}
drawBoard();

canvas.addEventListener("click", function(event){
    if (gameOver) {
        return;
    }

    let X = event.clientX - canvas.getBoundingClientRect().x;
    let Y = event.clientY - canvas.getBoundingClientRect().y;
    let i = Math.floor(Y/150);
    let j = Math.floor(X/150);

    let id = board[i][j];

    if (data[id]) {
        return;
    }

    if (currentPlayer == "X"){
        data[id] = "X";
    } else {
        data[id] = "O";
    }
    drawOnBoard(currentPlayer, i, j);

    if (isWin(data, currentPlayer)){
        showGameOver(currentPlayer);
        gameOver = true;
        return;
    }

    if (isTie(data)) {
        showGameOver("tie");
        gameOver = true;
        return;
    }


    if (currentPlayer == "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
});

function drawOnBoard(player, i, j) {
        let img;
        if (player == "O") {
            img = imageO;
        } else {
            img = imageX;
        }
        ctx.drawImage(img, j * 150, i * 150);
    }

function isWin(data, player){
    for(let i = 0; i < winCombinations.length; i++){
        let win = true;
        for(let j = 0; j < winCombinations[i].length; j++){
            let id = winCombinations[i][j];
            if ((data[id] == player) && win) {
                win = true;
            } else {
                win = false
            }
        }
        if (win) {
            return true;
        }
    }
    return false;
}

function isTie(gameData) {
    let isBoardFill = true;
    for (let i = 0; i < gameData.length; i++) {
        isBoardFill = gameData[i] && isBoardFill;
    }
    if (isBoardFill) {
        return true;
    }
    return false;
}

function showGameOver(player){
    let message;
    if (player === "tie") {
        message = "Ничья";
    } else {
        message = "Победили";
    }
    let imgSrc = "img/" + player + ".png";

    gameOverElement.innerHTML = `<h1 id="win">${message}</h1>`;
    if (player != "tie") {
        gameOverElement.innerHTML += `<img src=${imgSrc} </img>`;
    }
    gameOverElement.innerHTML += '<br><button onclick="location.reload()">Играть ещё</button>';

}