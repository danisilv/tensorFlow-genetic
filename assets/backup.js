// //import Phaser = require('phaser-ce')
//  /// <reference path="node_modules/phaser-ce/typescript/phaser.d.ts"/>
//  class SimpleGame2
//  {
//      game:Phaser.Game;
//      platforms: Phaser.Group;
//      player;
//      cursors;
//      constructor()
//      {
//          // create our phaser game
//          // 800 - width
//          // 600 - height
//          // Phaser.AUTO - determine the renderer automatically (canvas, webgl)
//          // 'content' - the name of the container to add our game to
//          // { preload:this.preload, create:this.create} - functions to call for our states
//          this.game = new Phaser.Game( 800, 600, Phaser.AUTO, 'content', { preload:this.preload, create:this.create, update: this.update} );
//      }
//      preload()
//      {
//          // add our logo image to the assets class under the
//          // key 'logo'. We're also setting the background colour
//          // so it's the same as the background colour in the image
//          this.game.load.image('sky', 'assets/sky.png');
//          this.game.load.image('ground', 'assets/platform.png');
//          this.game.load.image('star', 'assets/star.png');
//          this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
//          this.cursors = this.game.input.keyboard.createCursorKeys();
//      }
//      create()
//      {
//          this.game.physics.startSystem(Phaser.Physics.ARCADE);
//      //  The platforms group contains the ground and the 2 ledges we can jump on
//      this.platforms = this.game.add.group();
//      //  We will enable physics for any object that is created in this group
//      this.platforms.enableBody = true;
//      // Here we create the ground.
//      var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
//      //let ground = this.game.add.sprite(0, this.game.height * .9, "ground");
//      //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
//      ground.scale.setTo(2, 2);
//      //  This stops it from falling away when you jump on it
//      ground.body.immovable = true;
//      //  Now let's create two ledges
//      var ledge = this.platforms.create(400, 400, 'ground');
//      ledge.body.immovable = true;
//      ledge = this.platforms.create(-150, 250, 'ground');
//      ledge.body.immovable = true;
//      let bloco = this.game.add.sprite(400, 30, 'ground')
//        // The player and its settings
//        //this.player = this.game.add.sprite(32, this.game.world.height - 25, 'dude');
//        this.player = this.game.add.sprite(this.game.width * .2, ground.y - 80, "dude");
//        //  We need to enable physics on the player
//        this.game.physics.arcade.enable(this.player);
//        //  Player physics properties. Give the little guy a slight bounce.
//        this.player.body.bounce.y = 0.2;
//        this.player.body.gravity.y = 300;
//        this.player.body.collideWorldBounds = true;
//        //  Our two animations, walking left and right.
//        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
//        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
//      }
//      update (){
//          var hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
//          //this.platforms.
//          //this.player.body.velocity.x++;
//          //this.player.body.velocity.y = -350;
//           //  Reset the players velocity (movement)
//      this.player.body.velocity.x = 0;
//      if (this.cursors.left.isDown)
//      {
//          //  Move to the left
//          this.player.body.velocity.x = -150;
//          this.player.animations.play('left');
//      }
//      else if (this.cursors.right.isDown)
//      {
//          //  Move to the right
//          this.player.body.velocity.x = 150;
//          this.player.animations.play('right');
//      }
//      else
//      {
//          //  Stand still
//          this.player.animations.stop();
//          this.player.frame = 4;
//      }
//      //  Allow the player to jump if they are touching the ground.
//      if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform)
//      {
//          this.player.body.velocity.y = -350;
//      }
//      }
//  }
//  // when the page has finished loading, create our game
//  window.onload = () => {
//      var game = new SimpleGame();
//  }
//# sourceMappingURL=backup.js.map