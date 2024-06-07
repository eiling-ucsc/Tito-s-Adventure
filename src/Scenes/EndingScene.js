class EndingScene extends Phaser.Scene {
    constructor() {
        super('EndingScene');
    }

    init(data) {
        this.previousScene = data.previousScene || 'platformer1Scene';
    }

    create() {
        this.add.text(400, 250, 'You beat the level!', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(400, 350, 'Play Again', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5).setInteractive()
            .on('pointerdown', () => this.scene.start(this.previousScene));

        this.add.text(400, 450, 'Level Selection', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5).setInteractive()
            .on('pointerdown', () => this.scene.start('levelSelectScene'));
    }
}