/// <reference path="./node_modules/phaser-ce/typescript/phaser.d.ts" />
import { Neural } from "./neural";
import { People, Genetic } from "./genetic";


var velocidade = -300;

class SimpleGame {
    game: Phaser.Game;
    platforms: Phaser.Group;
    players = [];
    cursors;
    obstaculo: Phaser.Sprite;
    velocidade = -300;
    genetic: Genetic;

    constructor() {

        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });


    }

    async preload() {

        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.image('ground', 'assets/platform.png');
        this.game.load.image('star', 'assets/star.png');
        this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.players = [];
        this.genetic = new Genetic();
        this.genetic.createFirstGeneration();


    }

    async create() {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;


        this.obstaculo = this.game.add.sprite(700, 500, 'ground');
        this.game.physics.arcade.enable(this.obstaculo);
        this.obstaculo.width = 30


        for (let i = 0; i < this.genetic.population; i++) {
            let player;
            player = this.game.add.sprite(this.game.width * .2, ground.y - 300, "dude");
            this.game.physics.arcade.enable(player);
            player.body.bounce.y = 0.2;
            player.body.gravity.y = 800;
            player.body.collideWorldBounds = true;

            player.animations.add('left', [0, 1, 2, 3], 10, true);
            player.animations.add('right', [5, 6, 7, 8], 10, true);
            player.people = this.genetic.peoples[i];
            this.players.push(player)
            
        }
    }
    async update() {
        if (this.players.length < 5) return

        var hitground = []
        var hitPlatform = []
        //console.log(this.players);

        for (let i =0; i< this.players.length;i++){
            hitground.push(this.game.physics.arcade.collide(this.players[i], this.platforms));
            hitPlatform.push(this.game.physics.arcade.overlap(this.players[i], this.obstaculo));
            if (hitPlatform[i]) this.players[i].kill();
        } 

        for (let i = 0; i < this.players.length; i++) {
            
            
            this.players[i].animations.play('right')
            let distance = (this.obstaculo.x - this.players[i].x).toFixed(2)
            //console.log(distance)
            
            let move =  await this.players[i].people.neural.predict([distance]);
            console.log('==>'+i +' M:'+ move[0]);
            if (move[0] > 0.2){
                

                
                if ( this.players[i].body.touching.down ) {
                    this.players[i].body.velocity.y = -350;
                }
            }
        }

        

        if (this.obstaculo.x < 0) {
            //velocidade += -100
            this.obstaculo.x = 700;
        }



        
        //console.log(distance)

        this.obstaculo.body.velocity.x = velocidade;
        

        // if (this.cursors.left.isDown) {
        //     this.player.body.velocity.x = -150;
        //     this.player.animations.play('left');
        // }
        // else if (this.cursors.right.isDown) {
        //     this.player.body.velocity.x = 150;
        //     this.player.animations.play('right');
        // }
       
    }



}



var neural: Neural;

window.onload = async () => {

    neural = new Neural();
    for (let i = 0; i < 20; i++) {


        await neural.initalize();
        // console.log(await neural.predict([1]))
    }
    var game = new SimpleGame();

}