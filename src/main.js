// File: main.js
// Eion Ling
// Created: 6/12/2024
// Phaser: 3.70.0
// game config for Tito's Adventure

let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true 
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    width: 1440,
    height: 900,
    scene: [Load, TitleScreen, BasePlatformer, Platformer1, Platformer2, Platformer3, PauseScene, EndingScene, CreditsScene, InstructionsScene, LevelSelectScene]
}

var cursors;
const SCALE = 2.0;
var my = {sprite: {}, text: {}, vfx: {}};

const game = new Phaser.Game(config);
