class Enemy {
    constructor(name, health, attack, defense) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.attack = attack;
        this.defense = defense;
    }
}

function startCombat(enemy) {
    gameState.inCombat = true;
    const dialogueBox = document.getElementById('dialogue');
    
    function updateCombatUI() {
        dialogueBox.innerHTML = `
            <h3>Battle: ${enemy.name}</h3>
            <p>Enemy HP: ${enemy.health}/${enemy.maxHealth}</p>
            <p>Your HP: ${gameState.player.health}/${gameState.player.maxHealth}</p>
            <button onclick="playerAttack()">Attack</button>
            <button onclick="useItemInCombat()">Use Item</button>
            <button onclick="fleeCombat()">Flee</button>
        `;
        dialogueBox.classList.remove('hidden');
    }
    
    updateCombatUI();
    
    window.playerAttack = function() {
        const damage = Math.max(1, gameState.player.attackPower - enemy.defense);
        enemy.health -= damage;
        
        if (enemy.health <= 0) {
            endCombat(true);
            return;
        }
        
        // Enemy attacks back
        const enemyDamage = Math.max(1, enemy.attack - gameState.player.defense);
        gameState.player.health -= enemyDamage;
        
        if (gameState.player.health <= 0) {
            endCombat(false);
            return;
        }
        
        updateCombatUI();
    };
    
    window.useItemInCombat = function() {
        // Show inventory for item selection
        // Simplified version - just use first health potion if available
        const potionIndex = gameState.player.inventory.items.findIndex(
            item => item.type === 'healing'
        );
        
        if (potionIndex !== -1) {
            useItem(potionIndex);
            updateCombatUI();
        } else {
            alert('No healing items available!');
        }
    };
    
    window.fleeCombat = function() {
        endCombat(false);
    };
    
    function endCombat(victory) {
        gameState.inCombat = false;
        dialogueBox.classList.add('hidden');
        
        if (victory) {
            const xpGain = 20;
            gameState.player.experience += xpGain;
            alert(`You defeated ${enemy.name} and gained ${xpGain} XP!`);
            checkLevelUp();
        } else {
            alert(gameState.player.health <= 0 ? 
                "You were defeated!" : 
                "You fled from battle!");
        }
    }
}

function checkLevelUp() {
    const xpNeeded = gameState.player.level * 100;
    if (gameState.player.experience >= xpNeeded) {
        gameState.player.level++;
        gameState.player.experience -= xpNeeded;
        gameState.player.maxHealth += 20;
        gameState.player.health = gameState.player.maxHealth;
        gameState.player.attackPower += 5;
        gameState.player.defense += 2;
        alert(`Level Up! You are now level ${gameState.player.level}`);
    }
}

// Example enemy encounters
const enemies = {
    goblin: new Enemy('Goblin', 50, 8, 2),
    skeleton: new Enemy('Skeleton', 70, 10, 4)
    // Add more enemies
};

// Add this to player.js after movement code to trigger combat randomly
function checkForRandomEncounter() {
    if (Math.random() < 0.01) { // 1% chance per frame
        const enemyKeys = Object.keys(enemies);
        const randomEnemy = enemies[enemyKeys[Math.floor(Math.random() * enemyKeys.length)]];
        startCombat(Object.assign({}, randomEnemy)); // Create a copy
    }
}
