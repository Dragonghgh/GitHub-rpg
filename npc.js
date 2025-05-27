class NPC {
    constructor(x, y, name, dialogues) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.name = name;
        this.dialogues = dialogues;
        this.currentDialogue = 0;
    }

    draw(ctx) {
        // Draw NPC
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw name
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.fillText(this.name, this.x, this.y - 5);
    }

    update(player) {
        // Simple NPC movement (optional)
        // Could add pathfinding here for more complex behavior
    }

    startDialogue() {
        gameState.inDialogue = true;
        const dialogueBox = document.getElementById('dialogue');
        dialogueBox.innerHTML = `
            <h3>${this.name}</h3>
            <p>${this.dialogues[this.currentDialogue]}</p>
            <button onclick="nextDialogue()">Next</button>
        `;
        dialogueBox.classList.remove('hidden');
        
        // Cycle through dialogues
        this.currentDialogue = (this.currentDialogue + 1) % this.dialogues.length;
    }
}

function nextDialogue() {
    gameState.inDialogue = false;
    document.getElementById('dialogue').classList.add('hidden');
}

window.nextDialogue = nextDialogue;
