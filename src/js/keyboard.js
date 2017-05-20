import utils from './utils.js';
import keyboardTemplate from '../template/keyboard.tpl';

function convertCodeToKey (code) {
  if (code === 8) {
    return 'delete';
  }
  if (code === 13) {
    return 'enter';
  }
  return String.fromCharCode(code).toLowerCase();
}

export default {
  value: '',
  onChange: null,
  init: function (onChange) {
    this.onChange = onChange;
    var isMobile = utils.isMobileEnv();

    if (isMobile) {
      this.initMobileKeyboard();
    } else {
      this.initPcKeyboard();
    }

    this.highlighInput(isMobile);  
  },

  initPcKeyboard: function () {
    var self = this;
    window.addEventListener('keyup', function(e) {
      // only handle when input focus
      if (document.querySelector('#answer-wrapper').className.indexOf('focus') < 0) {
        return;
      }
      e = e || window.event;
      var keyCode = e.keyCode;
      if (keyCode != 8 && (keyCode > 90 || keyCode < 65)) {
        return;
      }

      var key = convertCodeToKey(keyCode);
      if (key === 'delete') {
        self.handleDelete();
      } else {
        self.handleKeyUpdate(key);
      }
    })
  },

  initMobileKeyboard: function() {
    var self = this;
    // create DOM
    var keyboard = document.createElement('div');
    keyboard.setAttribute('id','keyboard');
    keyboard.setAttribute('class','hide');
    keyboard.innerHTML = keyboardTemplate();
    document.body.appendChild(keyboard);

    // bind event
    keyboard.addEventListener('click', function (e) {
      e.preventDefault();
      var button = e.target || srcElement;  
      

      if (utils.containClass(button, 'del')) {
        self.handleDelete();
      }

      if (button.tagName.toLowerCase() === 'span') {
        var letter = button.innerHTML;
        self.handleKeyUpdate(letter);
      }

    }, false);

  },

  handleDelete: function () {
    var answer = this.value;

    if (answer.length === 1) {
      return ;
    }

    var newAnswer = answer.substr(0, answer.length - 1);

    this.value = newAnswer;
    this.onChange(newAnswer);
    return;
  },

  handleKeyUpdate: function (key) {
    var answer = this.value;

    if (/^[a-z]{1}$/.test(key)) {
      var newAnswer = answer + key;
      this.value = newAnswer;
      this.onChange(newAnswer); 
    }
  },

  highlighInput: function (hasKeyboard) {
    var gamePage = document.querySelector('.game-page');
    var answerWrapper = document.querySelector('#answer-wrapper');
    var callback = hasKeyboard ? function (e) {
      // click other place hide keyboard
      // click #answer-wrapper show keyboard
      var target = e.target || srcElement;

      if (target.getAttribute('id') === 'answer-wrapper') {
        utils.addClass(answerWrapper, 'focus');
        utils.removeClass(keyboard, 'hide');
      } else if(target.getAttribute('id') === 'answer-btn'){
        utils.addClass(answerWrapper, 'focus');
      } else {
        utils.removeClass(answerWrapper, 'focus');
        utils.addClass(keyboard, 'hide');
      }
    } : function (e) {
      var target = e.target || srcElement;

      if (target.getAttribute('id') === 'answer-wrapper') {
        utils.addClass(answerWrapper, 'focus');
      } else if(target.getAttribute('id') === 'answer-btn'){
        utils.addClass(answerWrapper, 'focus');
      } else {
        utils.removeClass(answerWrapper, 'focus');
      }
    };

    gamePage.onclick = callback;
  },

  update: function (value) {
    this.value = value;
  }
}