class TitleScreen extends Phaser.Scene {
    constructor() {
        super('titleScreen');
    }

    create() {
        this.cameras.main.setBackgroundColor('#000');
        const titleText = this.add.text(400, 150, 'Tito\'s Adventure', { fontSize: '48px', fill: '#fff' }).setOrigin(0.5);

        const startText = this.add.text(400, 300, 'Start Game', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        startText.setInteractive();
        startText.on('pointerdown', () => {
            this.scene.start('levelSelectScene');
        });

        const instructionsText = this.add.text(400, 400, 'Instructions', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        instructionsText.setInteractive();
        instructionsText.on('pointerdown', () => {
            this.scene.start('instructionsScene');
        });

        const creditsText = this.add.text(400, 500, 'Credits', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        creditsText.setInteractive();
        creditsText.on('pointerdown', () => {
            this.scene.start('CreditsScene');
        });
    }
}