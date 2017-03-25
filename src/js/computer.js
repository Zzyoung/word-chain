import RedBlackBST from './RedBlackBST';
import game from './game.js';
import dictionary from './Dictionary.js';
import utils from './utils.js';
import wordTemplate from '../template/word.tpl';

function addNewWordInChain (word) {
  var li = document.createElement('li');
  var innerHtml = wordTemplate({word:word});
  li.innerHTML = innerHtml;
  game.wordChainDom.appendChild(li);
  utils.scrollDown(game.wordChainWrapper, 0, 0.4);
}

function answer (word, player) {
  addNewWordInChain(word);
  
  if (player === 'computer') {
    game.answerInput.innerHTML = word.slice(word.length - 1);
    game.answerInput.focus();
  }
}

export default {
  memory: new RedBlackBST(),
  answer: function (first) {
    var word = dictionary.getByFirstLetter(first);
    game.wordChain.push(word);
    if (word === null) {
      game.playerWin();
    }

    game.timePause();
    answer(word, 'computer');
    game.getScore();
    game.timeStart();
  },
  getByFirstLetter: function (argument) {
    var result = this.memory.getByFirstLetter(prefix);
    this.memory.remove(result);
    return result;
  }
}