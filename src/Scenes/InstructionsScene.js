class InstructionsScene extends Phaser.Scene {
    constructor() {
        super('instructionsScene');
    }

    create() {
        this.cameras.main.setBackgroundColor('#000');
        const instructionsText = this.add.text(720, 400, 'Use arrow keys to move and jump.\n\nPress R to restart level.\n\nPress Esc to pause.\n\nReach the door to win!', { fontSize: '24px', fill: '#fff', align: 'center' }).setOrigin(0.5);
        const backText = this.add.text(720, 600, 'Back to Title', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        backText.setInteractive();
        backText.on('pointerdown', () => {
            this.scene.start('titleScreen');
        });
    }
}