let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

const boardElement = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');
const scoreXElement = document.getElementById('score-x');
const scoreOElement = document.getElementById('score-o');

// Create the game board dynamically
function createBoard() {
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('game-cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
}

// Handle the cell click
function handleCellClick(event) {
    const index = event.target.dataset.index;
    
    if (board[index] || !gameActive) return; // Cell already clicked or game over
    
    // Update the board and UI
    board[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    
    // Check for win or tie
    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
        updateScore();
        gameActive = false;
        return;
    } else if (board.every(cell => cell)) {
        setTimeout(() => alert('It\'s a tie!'), 100);
        gameActive = false;
        return;
    }

    // Switch player and AI move if it's 'O'
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (currentPlayer === 'O') aiMove();
}

// Check for winning conditions
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// AI move - Simple random move for 'O'
function aiMove() {
    const availableMoves = board.map((value, index) => value === '' ? index : null).filter(index => index !== null);
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    
    board[randomMove] = 'O';
    document.querySelector(`[data-index='${randomMove}']`).innerText = 'O';
    
    if (checkWinner()) {
        setTimeout(() => alert('AI (O) wins!'), 100);
        updateScore();
        gameActive = false;
        return;
    } else if (board.every(cell => cell)) {
        setTimeout(() => alert('It\'s a tie!'), 100);
        gameActive = false;
        return;
    }

    currentPlayer = 'X';
}

// Update the score based on the winner
function updateScore() {
    if (currentPlayer === 'X') scoreX++;
    else scoreO++;
    scoreXElement.textContent = scoreX;
    scoreOElement.textContent = scoreO;
}

// Reset the game
resetBtn.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    createBoard();
});

createBoard();
