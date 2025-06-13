// Game State
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0, draws: 0 };

// DOM Elements
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-btn');
const victoryModal = document.getElementById('victory-modal');
const victoryMessage = document.getElementById('victory-message');
const playAgainButton = document.getElementById('play-again-btn');

// Winning Combinations
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize Game
function initializeGame() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
        cell.addEventListener('mouseenter', handleCellHover);
        cell.addEventListener('mouseleave', handleCellLeave);
    });
    
    resetButton.addEventListener('click', resetGame);
    playAgainButton.addEventListener('click', closeModalAndReset);
    
    updateGameStatus();
    addSparkleEffects();
    startHeartAnimation();
}

// Handle Cell Click
function handleCellClick(index) {
    if (board[index] !== '' || !gameActive) {
        // Add shake animation for invalid clicks
        cells[index].style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            cells[index].style.animation = '';
        }, 500);
        return;
    }

    // Place the move
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer === 'X' ? '❌' : '⭕';
    cells[index].classList.add(currentPlayer.toLowerCase());
    
    // Add move sound effect (visual feedback)
    createParticleEffect(cells[index]);
    
    // Check for win or draw
    if (checkWin()) {
        gameActive = false;
        scores[currentPlayer]++;
        highlightWinningCells();
        setTimeout(() => showVictoryModal(`🎉 Player ${currentPlayer === 'X' ? '❌' : '⭕'} Wins! 🎉`), 500);
    } else if (checkDraw()) {
        gameActive = false;
        scores.draws++;
        setTimeout(() => showVictoryModal('🤝 It\'s a Draw! 🤝'), 500);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateGameStatus();
    }
}

// Handle Cell Hover Effects
function handleCellHover(event) {
    if (board[cells.indexOf(event.target)] === '' && gameActive) {
        event.target.style.transform = 'translateY(-5px) scale(1.05)';
        event.target.textContent = currentPlayer === 'X' ? '❌' : '⭕';
        event.target.style.opacity = '0.3';
    }
}

function handleCellLeave(event) {
    if (board[cells.indexOf(event.target)] === '' && gameActive) {
        event.target.style.transform = '';
        event.target.textContent = '';
        event.target.style.opacity = '1';
    }
}

// Check for Win
function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Check for Draw
function checkDraw() {
    return board.every(cell => cell !== '');
}

// Highlight Winning Cells
function highlightWinningCells() {
    winningConditions.forEach(condition => {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            cells[a].classList.add('winning');
            cells[b].classList.add('winning');
            cells[c].classList.add('winning');
        }
    });
}

// Update Game Status
function updateGameStatus() {
    const emoji = currentPlayer === 'X' ? '❌' : '⭕';
    gameStatus.textContent = gameActive ? 
        `🎮 Player ${emoji}'s Turn 🎮` : 
        'Game Over';
    
    // Add bounce animation
    gameStatus.style.animation = 'statusBounce 0.5s ease-out';
    setTimeout(() => {
        gameStatus.style.animation = '';
    }, 500);
}

// Show Victory Modal
function showVictoryModal(message) {
    victoryMessage.textContent = message;
    victoryModal.classList.remove('hidden');
    
    // Add confetti effect
    createConfetti();
    
    // Play victory sound effect (visual feedback)
    document.body.style.animation = 'victoryShake 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

// Close Modal and Reset
function closeModalAndReset() {
    victoryModal.classList.add('hidden');
    resetGame();
}

// Reset Game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
        cell.style.transform = '';
        cell.style.opacity = '1';
    });
    
    updateGameStatus();
    
    // Add reset animation
    cells.forEach((cell, index) => {
        setTimeout(() => {
            cell.style.animation = 'cellPop 0.3s ease-out';
            setTimeout(() => {
                cell.style.animation = '';
            }, 300);
        }, index * 50);
    });
}

// Create Particle Effect
function createParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const particles = [];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.backgroundColor = currentPlayer === 'X' ? '#ff6b6b' : '#4ecdc4';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        document.body.appendChild(particle);
        particles.push(particle);
        
        const angle = (i / 8) * Math.PI * 2;
        const velocity = 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = 0, y = 0;
        const animate = () => {
            x += vx * 0.02;
            y += vy * 0.02;
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = Math.max(0, 1 - Math.abs(x + y) / 100);
            
            if (Math.abs(x) < 100 && Math.abs(y) < 100) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(particle);
            }
        };
        
        animate();
    }
}

// Create Confetti Effect
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '999';
            
            document.body.appendChild(confetti);
            
            let y = -10;
            let rotation = 0;
            const fallSpeed = Math.random() * 3 + 2;
            const rotationSpeed = Math.random() * 10 + 5;
            
            const fall = () => {
                y += fallSpeed;
                rotation += rotationSpeed;
                confetti.style.top = y + 'px';
                confetti.style.transform = `rotate(${rotation}deg)`;
                
                if (y < window.innerHeight + 20) {
                    requestAnimationFrame(fall);
                } else {
                    document.body.removeChild(confetti);
                }
            };
            
            fall();
        }, i * 100);
    }
}

// Add Sparkle Effects
function addSparkleEffects() {
    const sparkles = document.querySelectorAll('.sparkle');
    
    sparkles.forEach((sparkle, index) => {
        sparkle.addEventListener('click', () => {
            sparkle.style.animation = 'sparkleRotate 0.5s ease-out';
            setTimeout(() => {
                sparkle.style.animation = '';
            }, 500);
        });
    });
}

// Start Heart Animation
function startHeartAnimation() {
    setInterval(() => {
        const hearts = document.querySelectorAll('.heart');
        hearts.forEach(heart => {
            heart.style.animationDelay = Math.random() * 6 + 's';
        });
    }, 6000);
}

// Add CSS animations dynamically
const additionalStyles = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

@keyframes victoryShake {
    0%, 100% { transform: scale(1); }
    25% { transform: scale(1.02); }
    75% { transform: scale(0.98); }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGame);

// Add keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key >= '1' && event.key <= '9') {
        const index = parseInt(event.key) - 1;
        handleCellClick(index);
    } else if (event.key === 'r' || event.key === 'R') {
        resetGame();
    }
});

// Add mobile touch support
cells.forEach(cell => {
    cell.addEventListener('touchstart', (e) => {
        e.preventDefault();
        cell.style.transform = 'scale(0.95)';
    });
    
    cell.addEventListener('touchend', (e) => {
        e.preventDefault();
        cell.style.transform = '';
    });
}); 