window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

export default {
  addClass: function (dom, name) {
    if (this.containClass(dom, name)) {
      return;
    }
    if (dom.classList) {
      dom.classList.add(name);
    } else {
      var arr = dom.getAttribute('class').split(' ');
      arr.push(name);
      dom.setAttribute('class', arr.join(' '));
    }
  },

  removeClass: function(dom, name) {
    if (!this.containClass(dom, name)) {
      return;
    }
    if (dom.classList) {
      dom.classList.remove(name);
    } else {
      var arr = dom.getAttribute('class').split(' ');
      var index = arr.indexOf(name);
      arr.splice(index, index);
      dom.setAttribute('class', arr.join(' '));
    }
  },

  containClass: function(dom, name) {
    if (dom.classList) {
      return dom.classList.contains(name);
    } else {
      var arr = dom.getAttribute('class').split(' ');
      return arr.indexOf(name) >= 0;
    }
  },
  linear: function (t, b, c, d) {
    // t: 当前时间
    // b: 初始值
    // c: 变化量
    // d: 持续时间
    return c * t/d + b;
  },
  scrollDown: function (dom, currentTime, duration) {
    var scrollTop = dom.scrollTop;
    var changeValue = dom.scrollHeight - dom.offsetHeight - scrollTop;
    var self = this;

    if (changeValue <= 0) {
      return;
    }

    var beginValue = 0;
    var value = this.linear(currentTime, beginValue, changeValue, duration);
    dom.scrollTop = value + scrollTop ;
    currentTime += 0.1;

    if (currentTime <= duration) {
      requestAnimationFrame(function () {
        self.scrollDown(dom, currentTime, duration);
      });
    }
  },
  isMobileEnv: function () {
    return /iphone|android/.test(navigator.userAgent.toLowerCase());
  }
}
