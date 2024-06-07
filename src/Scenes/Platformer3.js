class Platformer3 extends BasePlatformer {
    constructor() {
        super("platformer3Scene");
    }

    create() {
        // Load the tilemap
        this.map = this.make.tilemap({ key: "platformer-level-3" });
        this.tileset = this.map.addTilesetImage("kenny_tilemap_packed", "tilemap_tiles");

        // Create a layer
        this.groundLayer = this.map.createLayer("Ground-n-Platforms", this.tileset, 0, 0);
        this.groundLayer.setCollisionByProperty({ collides: true });
        this.physics.world.setBounds(0, 0, 2160, 500);

        super.create();
    } 

    update() {
        this.handlePlayerMovement();
        this.handlePlayerJump();
        super.update();
        this.adjustForIcyTiles();
    }
}