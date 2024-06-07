class PauseScene extends Phaser.Scene {
    constructor() {
        super('PauseScene');
        this.pausedSceneKey = null;
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        const overlay = this.add.rectangle(centerX, centerY, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.7).setOrigin(0.5);
        const resumeButton = this.add.text(centerX, centerY - 50, 'Resume', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        const restartButton = this.add.text(centerX, centerY, 'Restart', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        const titleButton = this.add.text(centerX, centerY + 50, 'Title Screen', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        resumeButton.setInteractive();
        restartButton.setInteractive();
        titleButton.setInteractive();

        resumeButton.on('pointerdown', () => {
            this.scene.resume(this.pausedSceneKey); 
            this.scene.stop(); 
        });

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.resume(this.pausedSceneKey); 
            this.scene.stop(); 
        });

        restartButton.on('pointerdown', () => {
            this.scene.stop(this.pausedSceneKey);
            this.scene.stop();
            this.scene.start(this.pausedSceneKey);
        });

        titleButton.on('pointerdown', () => {
            this.scene.stop(this.pausedSceneKey);
            this.scene.stop(); 
            this.scene.start('titleScreen'); 
        });
    }

    setPausedScene(sceneKey) {
        this.pausedSceneKey = sceneKey;
    }
}