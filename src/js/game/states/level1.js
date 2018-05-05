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

var mouse = {
    history: [],
    currentVelocity: {}
};

var draggedElement = {
    oldPos: null,
    newPos: null
}

var group;

level1.create = function () {
//   var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
//   logo.anchor.setTo(0.5, 0.5);
    group = this.game.add.group();
    this.ingredients.forEach((element, index)=>{
        this.ingredients[index] = element = this.game.add.sprite(Math.floor(Math.random() * Math.floor(800 - 100)), Math.floor(Math.random() * Math.floor(600 - 100)), element.name);
        element.width = 100;
        element.height = 100;
        element.inputEnabled = true;
        // element.input.draggable = true;
        this.game.physics.enable(element, Phaser.Physics.ARCADE);
        element.body.mass = -100;
         //  This gets it moving
        // element.body.velocity.setTo(200, 200);
        //  This makes the game world bounce-able
        element.body.collideWorldBounds = true;
        element.checkWorldBounds = true;
        element.events.onOutOfBounds.add(resetIngredient, this);
        element.body.velocity.x = Math.floor(Math.random() * Math.floor(100));
        element.body.velocity.y = Math.floor(Math.random() * Math.floor(75));
        //  This sets the image bounce energy for the horizontal  and vertical vectors (as an x,y point). "1" is 100% energy return
        element.body.bounce.set(0.8);
        //  only move when you click
        element.body.gravity.set(0, .1);
        group.add(element);
    });
  group.enableBody = true;
  group.immovable = true;
};

level1.update = function (delta, stuff){
    this.game.physics.arcade.collide(group, group);
    // console.log("Velocity", this.ingredients[0].body.velocity.x,this.ingredients[0].body.velocity.y );
    if (mouse.history.length > 100) {
        mouse.history = mouse.history.slice(mouse.history.length - 100, 100);
        
    };
    if(mouse.history.length > 99) {
        mouse.currentVelocity = calculateVelocity(mouse.history[0].x, mouse.history[0].y, mouse.history[99].x, mouse.history[99].y, delta._deltaTime);
    }

    var followingElement = null;

    mouse.history.push({x: this.game.input.x, y: this.game.input.y, delta: 100})
    this.ingredients.forEach((element)=>{
        try {
            if (this.game.input.mousePointer.isDown){
                
                //  400 is the speed it will move towards the mouse
                //  if it's overlapping the mouse, don't move any more
                if (Phaser.Rectangle.contains(element.body, this.game.input.x, this.game.input.y))
                {
                    // followingElement = element;
                    element.input.draggable = true;
                    element.body.moves = false;

                    if(draggedElement.newPos) {
                        draggedElement.oldPos = draggedElement.newPos;
                        draggedElement.newPos = {x: element.body.x, y: element.body.y};
                    } else {
                        draggedElement.oldPos = draggedElement.newPos = {x: element.body.x, y: element.body.y};
                    }
                }

            } else if(this.game.input.mousePointer.isUp) {
                // this.game.physics.arcade.moveToPointer(element, 200);
                element.body.moves = true;
                    // if(draggedElement.oldPos && draggedElement.newPos) {
                    //     var newVel = calculateVelocity(draggedElement.oldPos.x, draggedElement.oldPos.y, draggedElement.newPos.x, draggedElement.newPos.y, 17)
                    //     element.input.draggable = false;
                    // element.body.velocity.x = newVel.velX * 100;
                    // element.body.velocity.y = newVel.velY * 100;
                    // draggedElement.newPos = null;
                    // followingElement = null;
                    // }
                    
                    
            }
        } catch(e){
            console.error("RectangleContains failed", e);
        }
        
    });
     
}

function calculateVelocity(startX, startY, endX, endY, time) {
    // calculate seperately

    var velX = ((endX - startX) / time) * -100;
    var velY = ((startY - endY) / time) * -100;

    if(velX > 10) {
        console.log("Vel!");
        
    }

    return {velX: velX, velY: velY};
}

function resetIngredient(element) {
    console.log("out of bounds, element");
}

module.exports = level1;
