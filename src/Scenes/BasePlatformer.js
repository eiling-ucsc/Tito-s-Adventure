class BasePlatformer extends Phaser.Scene {
    init() {
        this.ACCELERATION = 200;
        this.DRAG = 500;    
        this.physics.world.gravity.y = 1500;
        this.JUMP_VELOCITY = -500;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 2.0;
    }

    create() {
        this.setupPlayer();
        this.setupCoins();
        this.setupDoor();
        this.setupInput();
        this.setupParticles();
        this.setupAudio();
        this.setupCamera();
    }

    update() {
        this.handleRestart();
        this.handleOutOfBound();
    }

    setupInput() {
        cursors = this.input.keyboard.createCursorKeys();
        this.rKey = this.input.keyboard.addKey('R');
        this.escKey = this.input.keyboard.addKey('ESC');
        this.escKey.on('down', () => {
            this.pauseGame();
        });
    }

    setupCoins() {
        this.coins = this.map.createFromObjects("Objects", {
            name: "coin",
            key: "tilemap_sheet",
            frame: 151
        });
        this.physics.world.enable(this.coins, Phaser.Physics.Arcade.STATIC_BODY);
        this.coinGroup = this.add.group(this.coins);
        this.physics.add.overlap(my.sprite.player, this.coinGroup, this.collectCoin, null, this);
    }

    setupDoor() {
        this.door = this.map.createFromObjects("Objects", {
            name: "door",
            key: "tilemap_sheet",
            frame: 130
        })[0];
        this.physics.world.enable(this.door, Phaser.Physics.Arcade.STATIC_BODY);
        this.doorGroup = this.add.group(this.door);
        this.physics.add.overlap(my.sprite.player, this.door, this.handleWin, null, this);
    }

    setupPlayer() {
        my.sprite.player = this.physics.add.sprite(30, 345, "platformer_characters", "tile_0000.png");
        my.sprite.player.setCollideWorldBounds(true);
        this.physics.add.collider(my.sprite.player, this.groundLayer);
    }

    setupParticles() {
        my.vfx.walking = this.add.particles(0, 0, "kenny-particles", {
            frame: ['muzzle_05.png', 'muzzle_05.png'],
            scale: {start: 0.03, end: 0.1, random: true},
            lifespan: 350,
            maxAliveParticles: 8,
            alpha: {start: 1, end: 0.1},
        }).stop();

        my.vfx.jumping = this.add.particles(0, 0, "kenny-particles", {
            frame: ['magic_05.png', 'magic_05.png'],
            scale: {start: 0.03, end: 0.1, random: false},
            lifespan: 450,
            maxAliveParticles: 15,
            alpha: {start: 1, end: 0.1},
        }).stop();
    }

    setupCamera() {
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); 
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE);
    }

    setupAudio() {
        this.footsteps = this.sound.add('footsteps');
        this.footsteps.setVolume(0.25);
        this.footsteps.setRate(3.8);  
    }

    pauseGame(sceneKey) {
        this.scene.pause();
        const pauseScene = this.scene.get('PauseScene');
        if (pauseScene) {
            pauseScene.setPausedScene(this.scene.key);
            this.scene.launch('PauseScene');
        }
    }

    handleWin(player, door) {
        this.scene.start('EndingScene', { previousScene: this.scene.key });
    }

    collectCoin(player, coin) {
        coin.destroy();
    }

    handleRestart() {
        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.scene.restart();
        }
    }

    handleOutOfBound(){
        const OUT_OF_BOUNDS_Y = 460;
        if (my.sprite.player.y > OUT_OF_BOUNDS_Y) {
            this.scene.restart();
        }
    }

    handlePlayerMovement() { 
        if (my.sprite.player.body.blocked.down && (cursors.left.isDown || cursors.right.isDown)) {
            if (!this.footsteps.isPlaying) {
                this.footsteps.play();
            }
        } else {
            this.footsteps.stop();
        }
    
        if (cursors.left.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);
            this.startWalkingParticles();
        } else if (cursors.right.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);
            this.startWalkingParticles();
        } else {
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
            my.vfx.walking.stop();
        }
    }    

    handlePlayerJump() {
        if (!my.sprite.player.body.blocked.down) {
            my.sprite.player.anims.play('jump');
            my.vfx.jumping.startFollow(my.sprite.player, my.sprite.player.displayWidth / 2 - 10, my.sprite.player.displayHeight / 2 - 5, false);
            my.vfx.jumping.setParticleSpeed(this.PARTICLE_VELOCITY, 0);
            my.vfx.jumping.start();
        } else {
            my.vfx.jumping.stop();
        }

        if (my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
        }
    }

    handlePlayerSwim() {
        if (my.sprite.player.body.blocked.down && (cursors.left.isDown || cursors.right.isDown)) {
            if (!this.footsteps.isPlaying) {
                this.footsteps.play();
            }
        } else {
            this.footsteps.stop();
        }

        if (cursors.left.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);
            this.startWalkingParticles();
        } else if (cursors.right.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);
            this.startWalkingParticles();
        } else {
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
            my.vfx.walking.stop();
        }
    }

    handlePlayerSwimJump() {
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
        } else if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            my.sprite.player.body.setVelocityY(-this.JUMP_VELOCITY); 
        } else if (!cursors.up.isDown && !cursors.down.isDown) {
            my.sprite.player.body.setVelocityY(45);
        }
    }

    adjustForIcyTiles() {
        const playerTileX = Math.floor(my.sprite.player.x / this.map.tileWidth);
        const playerTileY = Math.floor((my.sprite.player.y + my.sprite.player.height / 2) / this.map.tileHeight) + 1;
        const tileBelowPlayer = this.map.getTileAt(playerTileX, playerTileY);
        if (tileBelowPlayer && tileBelowPlayer.properties && tileBelowPlayer.properties.icy) {
            this.ACCELERATION = 1000;
            this.DRAG = 10;
        } else {
            this.ACCELERATION = 200;
            this.DRAG = 500;
        }
    }

    startWalkingParticles() {
        my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth / 2 - 10, my.sprite.player.displayHeight / 2 - 5, false);
        my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

        if (my.sprite.player.body.blocked.down) {
            my.vfx.walking.start();
        } else {
            my.vfx.walking.stop();
        }
    }
}