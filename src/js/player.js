import game from './game.js';
import utils from './utils.js';
import keyboard from './keyboard.js';

var answerBtn = {
  init: function (onClick) {
    var answerBtn = document.querySelector('#answer-btn');

    answerBtn.onclick = function () {
      onClick();
    };
  } 
};

function Player() {
  this.word = '';
  this.answerInput = document.querySelector('#answer-input');

  answerBtn.init(this.response.bind(this));
  keyboard.init(this.writeAnswer.bind(this));
}

Player.prototype.response = function () {
  var failed = game.answer(this.word, 'player');
}

Player.prototype.writeAnswer = function (answer) {
  this.word = answer;
  this.answerInput.innerHTML = answer;
}

Player.prototype.ready = function (preWord) {
  var firstLetter = preWord.slice(preWord.length - 1);
  this.answerInput.innerHTML = firstLetter;
  this.answerInput.focus();
  keyboard.update(firstLetter);
}

export default Player;
