var level1 = {
    recipes: {
        cookie: {
            image: 'Cookies'
        }
    },
    ingredients: [
        {
            name: 'Flour'
        }, 
        {
            name: 'ChocolateChips'
        },
        {
            name: 'Eggs'
        },
        {
            name: 'Sugar'
        },
        {
            name: 'Butter'
        }
    ]
};

var group;

level1.create = function () {
//   var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
//   logo.anchor.setTo(0.5, 0.5);
    group = this.game.add.group();
    this.ingredients.forEach((element)=>{
        element = this.game.add.sprite(Math.floor(Math.random() * Math.floor(800 - 100)), Math.floor(Math.random() * Math.floor(600 - 100)), element.name);
        element.width = 100;
        element.height = 100;
        element.inputEnabled = true;
        element.input.draggable = true;
        this.game.physics.enable(element, Phaser.Physics.ARCADE);
        element.body.mass = -100;
         //  This gets it moving
        // element.body.velocity.setTo(200, 200);
        //  This makes the game world bounce-able
        element.body.collideWorldBounds = true;
        element.body.velocity.x = Math.floor(Math.random() * Math.floor(1));
        element.body.velocity.y = Math.floor(Math.random() * Math.floor(2));
        //  This sets the image bounce energy for the horizontal  and vertical vectors (as an x,y point). "1" is 100% energy return
        element.body.bounce.set(0.8);

        element.body.gravity.set(0, .1);
        group.add(element);
    });
  group.enableBody = true;
  group.immovable = true;
};

module.exports = level1;
