import RedBlackBST from './RedBlackBST';
import game from './game.js';
import dictionary from './Dictionary.js';

function Computer () {
  this.memory = null;
}

Computer.prototype.ready = function (preWord) {
  var self = this;
  setTimeout(function () {
    self.response(preWord.slice(preWord.length - 1));
  },150);
}

Computer.prototype.response = function (firstLetter) {
  var word = dictionary.getByFirstLetter(firstLetter);

  var failed = game.answer(word, 'computer');

  if (failed) {
    game.playerWin();
  }
}

export default Computer;
