class Inventory {
    constructor() {
        this.items = [];
        this.maxSize = 10;
    }

    addItem(item) {
        if (this.items.length < this.maxSize) {
            this.items.push(item);
            this.updateDisplay();
            return true;
        }
        return false;
    }

    removeItem(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
            this.updateDisplay();
            return true;
        }
        return false;
    }

    updateDisplay() {
        const inventoryElement = document.getElementById('inventory');
        inventoryElement.innerHTML = '';
        
        this.items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'inventory-item';
            itemElement.textContent = item.name[0]; // Show first letter
            itemElement.title = item.name;
            itemElement.onclick = () => useItem(index);
            inventoryElement.appendChild(itemElement);
        });
    }
}

function useItem(index) {
    const item = gameState.player.inventory.items[index];
    if (item.type === 'healing') {
        gameState.player.health = Math.min(
            gameState.player.maxHealth,
            gameState.player.health + item.value
        );
        gameState.player.inventory.removeItem(index);
    }
    // Add other item types as needed
}

// Example items
const items = {
    healthPotion: {
        name: 'Health Potion',
        type: 'healing',
        value: 30
    },
    // Add more items here
};

window.useItem = useItem;
