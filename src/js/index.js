import RedBlackBST from './RedBlackBST';
import '../styles/index.css';
import utils from './utils.js';
import game from './game.js';
import dictionary from './Dictionary.js';
import Computer from './computer.js';
import Player from './player.js';
import extendPublisher from './publisher.js';

(function () {
    'use strict';

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

      var player = new Player();
      var computer = new Computer();
      extendPublisher(game);

      game.on('nextRound-computer', 'ready', computer);
      game.on('nextRound-player', 'ready', player);
    }

    window.onload = function () {
      var startBtn = document.querySelector('.start');

      initGame();

      startBtn.onclick = function () {
        game.start();
      }

      document.querySelector('#restart').onclick = function () {
        game.restart();
      };
      
    }
})();
