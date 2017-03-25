import game from './game.js';
import utils from './utils.js';
import computer from './computer.js';
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
  answer: function() {
    var word = game.answerInput.innerHTML;
    var isRepeat = game.isRepeat(word);
    if (isRepeat) {
      game.showError('这个单词已经出现过了');
      return;
    }

    var validate = game.validate(word);
    if (!validate) {
      game.showError('呀，拼错了！');
      return;
    }

    game.hideError();
    game.timePause();
    answer(word, 'player');
    game.getScore();
    setTimeout(function () {
      computer.answer(word.slice(word.length - 1));
    },150);
    game.timeStart();
  },
  writeAnswer: function (button) {
    var answer = game.answerInput.innerHTML;

    if (utils.containClass(button, 'del')) {
      if (answer.length === 1) {
        return ;
      }
      game.answerInput.innerHTML = answer.substr(0, answer.length - 1);
      return;
    }

    if (button.tagName.toLowerCase() === 'span') {
      var letter = button.innerHTML;
      
      if (/^[a-z]{1}$/.test(letter)) {
        game.answerInput.innerHTML = game.answerInput.innerHTML + letter;
      }
    }
  }
}