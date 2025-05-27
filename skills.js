class Skill {
    constructor(name, description, cost, effect, requirements = []) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.effect = effect;
        this.requirements = requirements;
        this.learned = false;
    }
}

class SkillTree {
    constructor() {
        this.skills = {
            combat: [
                new Skill("Power Strike", "Deal 20% more damage", 1, 
                    player => { player.attackPower *= 1.2; }),
                new Skill("Double Attack", "Chance to attack twice", 2,
                    player => { player.doubleAttackChance = 0.3; }, 
                    ["Power Strike"])
            ],
            magic: [
                // Magic skills...
            ]
        };
        this.skillPoints = 0;
    }

    learnSkill(category, skillName) {
        const skill = this.skills[category].find(s => s.name === skillName);
        if (skill && !skill.learned && this.skillPoints >= skill.cost) {
            if (skill.requirements.every(req => 
                this.skills[category].some(s => s.name === req && s.learned))) {
                skill.effect(gameState.player);
                skill.learned = true;
                this.skillPoints -= skill.cost;
                this.updateSkillUI();
            }
        }
    }
}
