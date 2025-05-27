function saveGame() {
    const saveData = {
        player: {
            x: gameState.player.x,
            y: gameState.player.y,
            health: gameState.player.health,
            maxHealth: gameState.player.maxHealth,
            level: gameState.player.level,
            experience: gameState.player.experience,
            attackPower: gameState.player.attackPower,
            defense: gameState.player.defense,
            inventory: gameState.player.inventory.items
        }
    };
    
    localStorage.setItem('rpgSave', JSON.stringify(saveData));
    alert('Game saved!');
}

function loadGame() {
    const saveData = localStorage.getItem('rpgSave');
    if (saveData) {
        const parsedData = JSON.parse(saveData);
        const player = gameState.player;
        
        player.x = parsedData.player.x;
        player.y = parsedData.player.y;
        player.health = parsedData.player.health;
        player.maxHealth = parsedData.player.maxHealth;
        player.level = parsedData.player.level;
        player.experience = parsedData.player.experience;
        player.attackPower = parsedData.player.attackPower;
        player.defense = parsedData.player.defense;
        
        // Restore inventory
        player.inventory.items = parsedData.player.inventory || [];
        player.inventory.updateDisplay();
        
        console.log('Game loaded');
    }
}

// Add save/load buttons to your HTML if desired
document.addEventListener('keydown', (e) => {
    if (e.key === 's' && e.ctrlKey) {
        saveGame();
        e.preventDefault();
    }
    if (e.key === 'l' && e.ctrlKey) {
        loadGame();
        e.preventDefault();
    }
});

window.saveGame = saveGame;
window.loadGame = loadGame;
