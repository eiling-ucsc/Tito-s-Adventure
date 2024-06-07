class CreditsScene extends Phaser.Scene {
    constructor() {
        super('CreditsScene');
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.add.text(centerX, centerY - 50, 'Game made by Eion', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Thank you to Kenney NL for assets!', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        const backText = this.add.text(720, 600, 'Back to Title', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        backText.setInteractive();
        backText.on('pointerdown', () => {
            this.scene.start('titleScreen');
        });
    }
}
