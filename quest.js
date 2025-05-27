class Quest {
    constructor(id, title, description, objectives, rewards) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.objectives = objectives; // {type: "kill|collect|talk", target: "goblin|10", completed: bool}
        this.rewards = rewards; // {xp: 100, items: ["healthPotion"], gold: 50}
        this.completed = false;
    }
}

class QuestLog {
    constructor() {
        this.activeQuests = [];
        this.completedQuests = [];
    }

    addQuest(quest) {
        this.activeQuests.push(quest);
        this.updateQuestUI();
    }

    completeQuest(questId) {
        const quest = this.activeQuests.find(q => q.id === questId);
        if (quest) {
            quest.completed = true;
            this.completedQuests.push(quest);
            this.activeQuests = this.activeQuests.filter(q => q.id !== questId);
            this.giveRewards(quest.rewards);
            this.updateQuestUI();
        }
    }

    updateQuestUI() {
        const questUI = document.getElementById('quest-log');
        questUI.innerHTML = '<h3>Quest Log</h3>';
        
        this.activeQuests.forEach(quest => {
            questUI.innerHTML += `
                <div class="quest">
                    <h4>${quest.title}</h4>
                    <p>${quest.description}</p>
                    <ul>
                        ${quest.objectives.map(obj => 
                            `<li class="${obj.completed ? 'completed' : ''}">
                                ${obj.type}: ${obj.target}
                            </li>`
                        ).join('')}
                    </ul>
                </div>
            `;
        });
    }
}
