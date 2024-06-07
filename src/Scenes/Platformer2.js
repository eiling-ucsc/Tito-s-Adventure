class Platformer2 extends BasePlatformer {
    constructor() {
        super("platformer2Scene");
    }

    init() {
        this.DRAG = 110;    
        this.physics.world.gravity.y = 300;
        this.JUMP_VELOCITY = -400;
        this.PARTICLE_VELOCITY = 25;
        this.ACCELERATION = 200;
        this.SCALE = 2.0;
    }

    create() {
        // Load the tilemap
        this.map = this.make.tilemap({ key: "platformer-level-2" });
        this.tileset = this.map.addTilesetImage("kenny_tilemap_packed", "tilemap_tiles");

        // Create a layer
        this.groundLayer = this.map.createLayer("Background", this.tileset, 0, 0);
        this.groundLayer = this.map.createLayer("Ground-n-Platforms", this.tileset, 0, 0);
        this.groundLayer.setCollisionByProperty({ collides: true });
        this.physics.world.setBounds(0, 0, 2160, 500);

        super.create();
    }

    update() {
        this.handlePlayerSwim();
        this.handlePlayerSwimJump();
        super.update();
    }  
}