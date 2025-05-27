class CraftingRecipe {
    constructor(result, ingredients, skillRequired = null) {
        this.result = result;
        this.ingredients = ingredients; // {itemId: quantity}
        this.skillRequired = skillRequired;
    }
}

class CraftingSystem {
    constructor() {
        this.recipes = [
            new CraftingRecipe(
                {id: "ironSword", name: "Iron Sword", type: "weapon", attack: 15},
                {ironOre: 3, wood: 2}
            ),
            new CraftingRecipe(
                {id: "healthPotion", name: "Health Potion", type: "consumable", health: 30},
                {herb: 2, water: 1}
            )
        ];
    }

    canCraft(recipe) {
        return Object.entries(recipe.ingredients).every(([itemId, quantity]) => {
            return gameState.player.inventory.items.filter(item => item.id === itemId).length >= quantity;
        });
    }

    craft(recipe) {
        if (this.canCraft(recipe)) {
            // Remove ingredients
            Object.entries(recipe.ingredients).forEach(([itemId, quantity]) => {
                for (let i = 0; i < quantity; i++) {
                    const index = gameState.player.inventory.items.findIndex(item => item.id === itemId);
                    if (index !== -1) gameState.player.inventory.removeItem(index);
                }
            });
            
            // Add crafted item
            gameState.player.inventory.addItem(recipe.result);
            return true;
        }
        return false;
    }
}
