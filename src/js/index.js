import RedBlackBST from './RedBlackBST';
import '../styles/index.css';
import utils from './utils.js';
import game from './game.js';
import dictionary from './Dictionary.js';
import computer from './computer.js';
import player from './player.js';

(function () {
    'use strict';
    var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var startBtn = null;
    var answerBtn = null;
    var answerWrapper = null;
    var gamePageDom = null;
    var keyboard = null; 

    function initGame () {
      game.scoreDom = document.querySelector('.score');
      var timerWrapper = document.querySelector('.timer-wrapper');
      game.timerDom.timerWrapper = timerWrapper;
      game.timerDom.num = timerWrapper.querySelector('.num');
      game.timerDom.left = timerWrapper.querySelector('.left');
      game.timerDom.right = timerWrapper.querySelector('.right');
      game.timerDom.rotate = timerWrapper.querySelector('.rotate');
      game.endModal = document.querySelector('.end-modal');
      game.errorMsgDom = document.querySelector('#error-msg');
      game.wordChainDom = document.querySelector('#word-chain');
      game.wordChainWrapper = document.querySelector('.main');
      game.answerInput = document.querySelector('#answer-input');

      game.computer = computer;
    }

    window.onload = function () {
      startBtn = document.querySelector('.start');
      answerBtn = document.querySelector('#answer-btn');
      answerWrapper = document.querySelector('#answer-wrapper');
      gamePageDom = document.querySelector('.game-page');
      keyboard = document.querySelector('#keyboard');
      initGame();

      startBtn.onclick = function () {
        game.start();
        // answer('start', 'computer');
        computer.answer(letters[new Date().getTime() % 25]);
      }

      answerBtn.onclick = function () {
        player.answer();
      };

      document.querySelector('#restart').onclick = function () {
        game.restart();
      };

      keyboard.addEventListener('touchstart', function (e) {
        e.preventDefault();
        var target = e.target;  
        
        player.writeAnswer(target);
      }, false);

      gamePageDom.onclick = function (e) {
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
    }


})();