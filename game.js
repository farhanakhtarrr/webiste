// Get the canvas and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- Game Settings ---
const gravity = 0.5;
const jumpPower = 10;
const obstacleSpeed = 5;

// --- Player Setup ---
let player = {
    x: 50,
    y: canvas.height - 50,
    width: 30,
    height: 30,
    color: '#00f', // Blue
    velocityY: 0,
    isJumping: false
};

// --- Obstacle Setup ---
let obstacle = {
    x: canvas.width,
    y: canvas.height - 40,
    width: 20,
    height: 40,
    color: '#f00' // Red
};

// --- Game Loop ---
function gameLoop() {
    // 1. Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Update Player (Physics)
    if (player.isJumping) {
        player.velocityY += gravity;
        player.y += player.velocityY;
    }

    // Ground collision
    if (player.y > canvas.height - player.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0;
        player.isJumping = false;
    }

    // 3. Update Obstacle
    obstacle.x -= obstacleSpeed;
    
    // Reset obstacle when it goes off-screen
    if (obstacle.x + obstacle.width < 0) {
        obstacle.x = canvas.width + Math.random() * 200; // Add random spacing
    }

    // 4. Check for Collision (Game Over)
    if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
    ) {
        // Game Over
        alert("Game Over! Refresh to restart.");
        return; // Stop the game loop
    }

    // 5. Draw Everything
    // Draw Ground
    ctx.fillStyle = '#444';
    ctx.fillRect(0, canvas.height - 10, canvas.width, 10);

    // Draw Player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw Obstacle
    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    // 6. Request the next frame
    requestAnimationFrame(gameLoop);
}

// --- Control ---
function handleJump(e) {
    // Only jump if 'Space' is pressed and not already in the air
    if (e.code === 'Space' && !player.isJumping) {
        player.velocityY = -jumpPower;
        player.isJumping = true;
    }
}

document.addEventListener('keydown', handleJump);

// Start the game!
requestAnimationFrame(gameLoop);
