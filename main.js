const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");
let board = [];
let data = new Array(9);
const imageX = new Image();
imageX.src = "img/X.png";
const imageO = new Image();
imageO.src = "img/O.png";
let currentPlayer = "X";
const gameOverEl = document.getElementById("gameover");
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
    draw(currentPlayer, i, j);

    if (win(data, currentPlayer)){
        showGameOver(currentPlayer);
        gameOver = true;
        return;
    }

    if (tie(data)) {
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

function draw(player, i, j) {
        let img;
        if (player == "O") {
            img = imageO;
        } else {
            img = imageX;
        }
        ctx.drawImage(img, j * 150, i * 150);
    }

function win(data, player){
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

function tie(gameData) {
    let fullBoard = true;
    for (let i = 0; i < gameData.length; i++) {
        fullBoard = gameData[i] && fullBoard;
    }
    if (fullBoard) {
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

    gameOverEl.innerHTML = `<h1 id="win">${message}</h1>`;
    if (player != "tie") {
        gameOverEl.innerHTML += `<img src=${imgSrc} </img>`;
    }
    gameOverEl.innerHTML += '<br><button onclick="location.reload()">Играть ещё</button>';

}