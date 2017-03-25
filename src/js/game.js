import utils from './utils.js';
import dictionary from './Dictionary.js';

var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    
export default {
  scoreDom: null,
  errorMsgDom: null,
  wordChainDom: null,
  wordChainWrapper: null,
  answerInput: null,
  timerDom: {
    timerWrapper: null,
    num: null,
    left: null,
    right: null,
    rotate: null
  },
  endModal: null,
  score: 0,
  defaultCycle: 15,
  cycle: 15,
  jsTimer: null,
  wordChain: [],
  validate: function (word) {
    var search = dictionary.get(word);
    var validate = search === word;
    if (validate) {
      this.wordChain.push(word);
      dictionary.remove(word);
    }
    return validate;
  },
  isRepeat: function (word) {
    return this.wordChain.indexOf(word) >= 0;
  },
  reset: function () {
    for (var i = this.wordChain.length - 1; i >= 0; i--) {
      dictionary.add(this.wordChain[i], this.wordChain[i]);
    }
    this.wordChain = [];
  },
  getScore: function () {
    this.score ++;
    this.scoreDom.innerHTML = this.score;
  },
  timeStart: function () {
    var self = this;
    utils.addClass(this.timerDom.timerWrapper,'no-animation');
    utils.removeClass(this.timerDom.timerWrapper, 'paused');
    setTimeout(function() {
      utils.removeClass(self.timerDom.timerWrapper,'no-animation');
    },20);
    this.timerDom.num.innerHTML = this.defaultCycle;
    this.cycle = this.defaultCycle;
    this.startInterval();
  },
  timePause: function () {
    utils.addClass(this.timerDom.timerWrapper, 'paused');
  },
  start: function() {
    document.querySelector('.start-page').style.display = 'none';
    document.querySelector('.game-page').style.display = 'block';
    this.hideError();
    this.timeStart();
    this.startInterval();
  },
  restart: function () {
    this.endModal.style.display = 'none';
    this.score = 0;
    this.cycle = this.defaultCycle;
    this.scoreDom.innerHTML = 0;
    this.wordChainDom.innerHTML = '';
    this.reset();

    this.start();
    this.computer.answer(letters[new Date().getTime() % 25]);
  },
  startInterval: function() {
    var self = this;
    clearInterval(this.jsTimer);
    this.jsTimer = setInterval(function () {
      self.cycle--;
      self.timerDom.num.innerHTML = self.cycle;
      if (self.cycle === 0) {
        clearInterval(self.jsTimer);
        self.computerWin();
      }
    }, 1000);
  },
  computerWin: function () {
    this.timePause();
    
    this.endModal.querySelector('.score').innerHTML = this.score;
    this.endModal.style.display = 'block';
    utils.addClass(keyboard, 'hide');
  },
  playerWin: function () {
    this.timePause();

    this.endModal.querySelector('.score').innerHTML = this.score;
    this.endModal.querySelector('.modal-header').innerHTML = 'YOU WIN!';
    this.endModal.style.display = 'block';
  },
  hideError: function () {
    this.errorMsgDom.style.visibility = 'hidden';
  },
  showError: function (msg) {
    this.errorMsgDom.innerHTML = msg;
    this.errorMsgDom.style.visibility = 'visible';
  }
};
