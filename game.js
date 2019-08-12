"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./node_modules/phaser-ce/typescript/phaser.d.ts" />
const neural_1 = require("./neural");
const genetic_1 = require("./genetic");
var velocidade = -300;
class SimpleGame {
    constructor() {
        this.players = [];
        this.velocidade = -300;
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }
    preload() {
        return __awaiter(this, void 0, void 0, function* () {
            this.game.load.image('sky', 'assets/sky.png');
            this.game.load.image('ground', 'assets/platform.png');
            this.game.load.image('star', 'assets/star.png');
            this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.players = [];
            this.genetic = new genetic_1.Genetic();
            this.genetic.createFirstGeneration();
        });
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.platforms = this.game.add.group();
            this.platforms.enableBody = true;
            var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
            ground.scale.setTo(2, 2);
            ground.body.immovable = true;
            this.obstaculo = this.game.add.sprite(700, 500, 'ground');
            this.game.physics.arcade.enable(this.obstaculo);
            this.obstaculo.width = 30;
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
                this.players.push(player);
            }
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.players.length < 5)
                return;
            var hitground = [];
            var hitPlatform = [];
            //console.log(this.players);
            for (let i = 0; i < this.players.length; i++) {
                hitground.push(this.game.physics.arcade.collide(this.players[i], this.platforms));
                hitPlatform.push(this.game.physics.arcade.overlap(this.players[i], this.obstaculo));
                if (hitPlatform[i])
                    this.players[i].kill();
            }
            for (let i = 0; i < this.players.length; i++) {
                this.players[i].animations.play('right');
                let distance = (this.obstaculo.x - this.players[i].x).toFixed(2);
                //console.log(distance)
                let move = yield this.players[i].people.neural.predict([distance]);
                console.log('==>' + i + ' M:' + move[0]);
                if (move[0] > 0.2) {
                    if (this.players[i].body.touching.down) {
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
        });
    }
}
var neural;
window.onload = () => __awaiter(this, void 0, void 0, function* () {
    neural = new neural_1.Neural();
    for (let i = 0; i < 10; i++) {
        yield neural.initalize();
        // console.log(await neural.predict([1]))
    }
    var game = new SimpleGame();
});
//# sourceMappingURL=game.js.map