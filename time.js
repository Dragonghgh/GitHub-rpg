class GameTime {
    constructor() {
        this.dayLength = 480; // seconds of real time for full day cycle
        this.currentTime = 0;
        this.dayCount = 1;
        this.isNight = false;
    }

    update(deltaTime) {
        this.currentTime += deltaTime;
        if (this.currentTime >= this.dayLength) {
            this.currentTime = 0;
            this.dayCount++;
        }
        
        const wasNight = this.isNight;
        this.isNight = this.getHour() < 6 || this.getHour() >= 18;
        
        if (wasNight !== this.isNight) {
            this.updateWorldLighting();
        }
    }

    getHour() {
        return Math.floor((this.currentTime / this.dayLength) * 24);
    }

    updateWorldLighting() {
        const darkness = this.isNight ? 0.7 : 0.1;
        document.documentElement.style.setProperty('--darkness', darkness);
    }
}
