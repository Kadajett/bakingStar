var preloader = {};

preloader.preload = function () {
  this.game.load.image('logo', 'images/phaser.png');

  // ingredients
  this.game.load.image('Flour', 'images/flour.png');
  this.game.load.image('ChocolateChips', 'images/chocolateChips.png');
  this.game.load.image('Butter', 'images/butter.png');
  this.game.load.image('Eggs', 'images/Eggs.png');
  this.game.load.image('Sugar', 'images/sugar.png');
  // recipes
  this.game.load.image('Cookies', 'images/Cookie.png');
};

preloader.create = function () {
  this.game.state.start('game');
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
};

module.exports = preloader;
