// Main game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const dialogueBox = document.getElementById('dialogue');

// Game state
const gameState = {
    player: null,
    npcs: [],
    currentMap: {},
    inDialogue: false,
    inCombat: false
};

// Initialize game
function initGame() {
    // Create player
    gameState.player = new Player(100, 100);
    
    // Create NPCs
    gameState.npcs = [
        new NPC(300, 200, 'Old Man', ['Hello traveler!', 'The caves are dangerous!']),
        new NPC(500, 400, 'Shopkeeper', ['Buy something!', 'Come back soon!'])
    ];
    
    // Load saved game if available
    loadGame();
    
    // Start game loop
    gameLoop();
}

// Main game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw game elements
    if (!gameState.inCombat && !gameState.inDialogue) {
        gameState.player.update();
        gameState.player.draw(ctx);
        
        gameState.npcs.forEach(npc => {
            npc.update(gameState.player);
            npc.draw(ctx);
        });
    }
    
    // Continue loop
    requestAnimationFrame(gameLoop);
}

// Start the game when everything is loaded
window.addEventListener('load', initGame);
