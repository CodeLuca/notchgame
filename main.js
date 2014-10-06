var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');

var mainState = {
    preload: function(){
        game.load.image('wallV', 'assets/wallVertical.png');
        game.load.image('wallH', 'assets/wallHorizontal.png');
        game.load.image('player', 'assets/player.png');
        game.load.image('star', 'assets/coin.png');
        game.load.image('zero', 'assets/zero.png');
        game.load.image('bracket', 'assets/bracket.png');
        game.load.image('mc', 'assets/mc.png');
        game.load.image('steve', 'assets/steve.png');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = "#707070";
    },  
    
    create: function(){
        this.player = game.add.sprite(250, 170, 'player');
        this.stars = game.add.group();
        this.stars.enableBody = true;
        this.player.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 1000;
        this.cursor = game.input.keyboard.createCursorKeys();
        this.createWorld();
        this.addStar();
        this.score = 0;
        this.labelScore = game.add.text(30, 5, '0', { font: "30px Impact", fill: "#B8B8B8" });  
        this.labelScore.text = "0";
        this.steveSprite = game.add.sprite(100, 200, 'steve');
    },
    
    update: function(){
        this.player.outOfBoundsKill = true;
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.collide(this.star, this.player, this.hitStar, null, this);  
        this.movePlayer();
        this.steveSprite.y += 1;
//        this.steveSprite.rotate(3);
        if(this.player.y > 340){
            game.state.start('main');
        }
        this.mcfunc();
    },
    
    movePlayer: function() {
    if (this.cursor.left.isDown) {
        this.player.body.velocity.x = -200;
        } else if (this.cursor.right.isDown){
        this.player.body.velocity.x = 200;
        } else {
        this.player.body.velocity.x = 0;
        }
        if(this.cursor.up.isDown && this.player.body.touching.down)
        this.player.body.velocity.y = -400;
        },
    
    mcfunc: function(){
        this.mc = game.add.sprite(450, 5, 'mc');
        this.mc.scale.setTo(this.score/5, this.score/5);
    },
    createWorld: function(){
        this.walls = game.add.group();
        this.walls.enableBody = true;
        
        game.add.sprite(0, 0, 'wallV', 0, this.walls); //Left wall
        game.add.sprite(480, 0, 'wallV', 0, this.walls); //Right wall
       
        var one = game.add.sprite(175, 250, 'wallH', 0, this.walls);
        one.scale.setTo(0.75, 1);
        
        var two = game.add.sprite(0, 180, 'wallH', 0, this.walls);
        two.scale.setTo(0.5, 1);
        
        var three = game.add.sprite(300, 160, 'wallH', 0, this.walls);
        three.scale.setTo(0.5, 1);
        
        var four = game.add.sprite(200, 140, 'wallH', 0, this.walls);
        four.scale.setTo(0.10, 1);
        
        var five = game.add.sprite(100, 70, 'wallH', 0, this.walls);
        five.scale.setTo(0.30, 1);
        
        var bottom = game.add.sprite(100, 320, 'wallH', 0, this.walls);
        bottom.scale.setTo(1.5, 1);
        
        this.walls.setAll('body.immovable', true);
    },
    addStar: function(){
        var level = Math.floor((Math.random() * 4) + 1);
        var x = Math.random();
        if(x < 0.1){x + 0.1;}
        x = (x + 0.1) * 450 - 20;
        
        var y;
        if(level == 1){
            y = 220;
        } else if (level == 2){
            y = 110;
        } else if (level == 3){
            y = 40;
        } else if (level == 4){
            y = 290;
        }
        var type = Math.floor((Math.random() * 3) + 1);
        if(type == 1){
            this.star = game.add.sprite(x, y, 'star', 0, this.stars);
        } else if (type == 2){
            this.star = game.add.sprite(x, y, 'zero', 0, this.stars);
        } else if (type == 3){
            this.star = game.add.sprite(x, y, 'bracket', 0, this.stars);
        }
    },
    hitStar: function(){
        this.star.kill();
        this.addStar();
        this.score += 1;
        this.labelScore.text = this.score;
    }
};
game.state.add('main', mainState);
game.state.start('main');