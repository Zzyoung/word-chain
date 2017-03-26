import utils from './utils.js';
import keyboardTemplate from '../template/keyboard.tpl';

export default {
  value: '',
  init: function (onChange) {
    var self = this;
    var gamePage = document.querySelector('.game-page');
    var answerWrapper = document.querySelector('#answer-wrapper');
    // create DOM
    var keyboard = document.createElement('div');
    keyboard.setAttribute('id','keyboard');
    keyboard.setAttribute('class','hide');
    keyboard.innerHTML = keyboardTemplate();
    document.body.appendChild(keyboard);

    // bind event
    keyboard.addEventListener('touchstart', function (e) {
      e.preventDefault();
      var button = e.target;  
      var answer = self.value;

      if (utils.containClass(button, 'del')) {
        if (answer.length === 1) {
          return ;
        }

        var newAnswer = answer.substr(0, answer.length - 1);
        self.value = newAnswer;
        onChange(newAnswer);
        return;
      }

      if (button.tagName.toLowerCase() === 'span') {
        var letter = button.innerHTML;
        
        if (/^[a-z]{1}$/.test(letter)) {
          var newAnswer = answer + letter
          self.value = newAnswer;
          onChange(newAnswer); 
        }
      }

    }, false);

    // click other place hide keyboard
    // click #answer-wrapper show keyboard
    gamePage.onclick = function (e) {
      var target = e.target;

      if (target.getAttribute('id') === 'answer-wrapper') {
        utils.addClass(answerWrapper, 'focus');
        utils.removeClass(keyboard, 'hide');
      } else if(target.getAttribute('id') === 'answer-btn'){
        utils.addClass(answerWrapper, 'focus');
      } else {
        utils.removeClass(answerWrapper, 'focus');
        utils.addClass(keyboard, 'hide');
      }
    };

    return keyboard;
  },
  update: function (value) {
    this.value = value;
  }
}