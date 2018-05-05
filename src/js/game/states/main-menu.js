var mainMenu = {};

mainMenu.create = function () {
  var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
  logo.anchor.setTo(0.5, 0.5);

  logo.inputEnabled = true;

  logo.events.onInputDown.add((sprite, pointer)=>{
    this.game.state.start('level1');
  }, this);
};

module.exports = mainMenu;
