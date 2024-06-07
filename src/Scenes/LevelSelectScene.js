// LevelSelectScene.js

class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super('levelSelectScene');
    }

    create() {
        this.cameras.main.setBackgroundColor('#000');
        const levelSelectText = this.add.text(720, 100, 'Select Level', { fontSize: '48px', fill: '#fff' }).setOrigin(0.5);

        const level1Text = this.add.text(720, 300, 'Level 1', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        level1Text.setInteractive();
        level1Text.on('pointerdown', () => {
            this.scene.start('platformer1Scene');
        });

        const level2Text = this.add.text(720, 400, 'Level 2', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        level2Text.setInteractive();
        level2Text.on('pointerdown', () => {
            this.scene.start('platformer2Scene');
        });

        const level3Text = this.add.text(720, 500, 'Level 3', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        level3Text.setInteractive();
        level3Text.on('pointerdown', () => {
            this.scene.start('platformer3Scene');
        });


        const backText = this.add.text(720, 700, 'Back to Title', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        backText.setInteractive();
        backText.on('pointerdown', () => {
            this.scene.start('titleScreen');
        });
    }
}