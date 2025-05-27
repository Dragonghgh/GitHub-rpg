class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.speed = 5;
        this.direction = 'down';
        this.health = 100;
        this.maxHealth = 100;
        this.level = 1;
        this.experience = 0;
        this.inventory = new Inventory();
        this.attackPower = 10;
        this.defense = 5;
    }

    draw(ctx) {
        // Draw player
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw health bar
        const healthPercentage = this.health / this.maxHealth;
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y - 10, this.width, 5);
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y - 10, this.width * healthPercentage, 5);
    }

    update() {
        // Handle keyboard input
        if (keys.ArrowUp) {
            this.y -= this.speed;
            this.direction = 'up';
        }
        if (keys.ArrowDown) {
            this.y += this.speed;
            this.direction = 'down';
        }
        if (keys.ArrowLeft) {
            this.x -= this.speed;
            this.direction = 'left';
        }
        if (keys.ArrowRight) {
            this.x += this.speed;
            this.direction = 'right';
        }
        
        // Keep player within bounds
        this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height - this.height, this.y));
        
        // Update UI
        document.getElementById('health').textContent = `HP: ${this.health}/${this.maxHealth}`;
        document.getElementById('level').textContent = `Level: ${this.level}`;
    }
}

// Keyboard input tracking
const keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    
    // Space to interact
    if (e.key === ' ' && !gameState.inDialogue) {
        checkForInteractions();
    }
});
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function checkForInteractions() {
    for (const npc of gameState.npcs) {
        if (isColliding(gameState.player, npc)) {
            npc.startDialogue();
            return;
        }
    }
}

function isColliding(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}
