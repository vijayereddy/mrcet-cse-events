var numColoredStripes = 0;
var numAfterColoredStripes = 0;
var numBlackStripes = 0;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 // some code..
 numColoredStripes = 10;
 numAfterColoredStripes = 10;
 numBlackStripes = 5;
}
else
{
  numColoredStripes = 100;
  numAfterColoredStripes = 50;
  numBlackStripes = 10;
}


$(document).ready(function($) {

  $('.dropdown-toggle').click(function() {
    $(this).next('.dropdown-menu').slideToggle(175);
  });

});

function createEl(template) {
  var el = document.createElement('div');
  el.innerHTML = template.trim();
  return el.firstChild;
}

function createSvgEl(template) {
  var el = createEl('\n    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + template.trim() + '</svg>\n  ');
  return el;
}

function createSvgChildEl(template) {
  return createSvgEl(template).firstChild;
}

function createLine(options) {
  var el = createSvgChildEl('\n    <rect x="' + options.x + '" y="' + options.y + '" width="' + options.width + '" height="' + options.height + '" fill="' + options.color + '">\n  ');
  return el;
}


var stripesEl = document.querySelector('#stripes');
var banner = document.querySelector('#banner');

var logoContainer = document.querySelector('#tz-logo');
var logo = logoContainer.querySelector('svg');
var logoPath1 = document.querySelector('#path1');
var logoPath2 = document.querySelector('#path2');
var footer = document.querySelector('#footer');
var navbar = document.querySelector('#navbar');
var date = document.querySelector('#date');
var main = document.querySelector('#main');
var content = document.querySelector('#content');
var banner = document.querySelector('#banner');
var techText = document.querySelector('#techText');



var windowWidth = document.body.clientWidth;
var windowHeight = document.body.clientHeight;

// animate stripes
function _animateStripes(container) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  options.count = options.count || 10;
  options.sizeRatio = options.sizeRatio || 1;
  var stripes = [];

  var _loop = function _loop(i) {
    var color = void 0;
    if (options.color) {
      color = options.color;
    } else {
      color = tinycolor('hsl(' + Math.round(Math.random() * 360) + ', 80%, 65%)').toRgbString();
    }
    var baseWidth = Math.max(windowWidth, 1000);
    var width = Math.round(baseWidth / 10 + Math.random() * baseWidth / 10) * options.sizeRatio;
    var height = Math.round(Math.random() * 10 + 2) * options.sizeRatio;
    var point = void 0;
    if (options.point) {
      point = {
        x: Math.round(options.point.x - width / 2 + Math.random() * 200 - 100),
        y: Math.round(options.point.y - height / 2 + Math.random() * 50 - 25)
      };
    } else {
      point = {
        x: Math.round((windowWidth + width) * Math.random() - width),
        y: Math.round(windowHeight * Math.random())
      };
    }
    var lineOptions = {
      x: point.x,
      y: point.y,
      width: width,
      height: height,
      color: color
    };
    var lineEl = createLine(lineOptions);
    lineEl.style.display = 'none';
    container.appendChild(lineEl);

    dynamics.setTimeout(function () {
      lineEl.style.display = 'block';

      dynamics.setTimeout(function () {
        lineOptions.x += Math.random() * 100 - 50;
        lineOptions.y += Math.random() * 20 - 10;
        lineEl.setAttribute('x', lineOptions.x);
        lineEl.setAttribute('y', lineOptions.y);

        var newLineOptions = options.transform({
          width: lineOptions.width,
          height: lineOptions.height
        });
        lineEl.setAttribute('width', newLineOptions.width);
        lineEl.setAttribute('height', newLineOptions.height);

        dynamics.setTimeout(function () {
          container.removeChild(lineEl);
        }, options.delay('hide', i));
      }, options.delay('transform', i));
    }, options.delay('show', i));

    stripes.push(lineEl);
  };

  for (var i = 0; i < options.count; i++) {
    _loop(i);
  }
  return stripes;
}
function animateBlackStripes(container) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  options.sizeRatio = 3;
  options.color = '#090a0f';
  options.delay = function (type, i) {
    if (type === 'show') {
      if (options.delayShow) {
        return Math.random() * 50;
      }
      return 0;
    } else if (type === 'transform') {
      return Math.random() * 20 + i * 2;
    } else if (type === 'hide') {
      return 100;
    }
  };
  options.transform = function (size) {
    return {
      width: size.width / 2,
      height: size.height / 5
    };
  };
  _animateStripes(container, options);
}
function animateColoredStripes(container) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  options.delay = function (type, i) {
    if (type === 'show') {
      return Math.random() * 300;
    } else if (type === 'transform') {
      return Math.random() * 20;
    } else if (type === 'hide') {
      return 100;
    }
  };
  options.transform = function (size) {
    return {
      width: size.width / 2,
      height: size.height / 5
    };
  };
  _animateStripes(container, options);
}


// For initial lines

animateBlackStripes(stripesEl, {
  count: numBlackStripes
});
animateColoredStripes(stripesEl, {
  count:numColoredStripes
});

// This is for initial logo change

  dynamics.css(content, {
    scale: 0.75
  });

  dynamics.animate(content, {
    scale: 0.6
  }, {
    duration: 1500,
    type: dynamics.easeOut
  });

  // Color of logo
  function colorTZlogo(){
  var color = tinycolor('hsl(' + Math.round(Math.random() * 360) + ', 80%, 65%)');

  dynamics.animate(logoPath1, {
    fill: color.toRgbString()
  }, {
    duration: 700
  });
  dynamics.animate(logoPath2, {
    fill: color.toRgbString()
  }, {
    duration: 700
  });
  

  color = tinycolor('hsl(' + Math.round(Math.random() * 360) + ', 80%, 65%)');

  dynamics.animate(logoPath1, {
    fill: color.toRgbString()
  }, {
    duration: 700,
    delay: 700
  });
  dynamics.animate(logoPath2, {
    fill: color.toRgbString()
  }, {
    duration: 700,
    delay: 700
  });
  

  // Final color
  color = tinycolor('#fff')
  dynamics.animate(logoPath1, {
    fill: color.toRgbString()
  }, {
    duration: 700,
    delay: 700
  });
  dynamics.animate(logoPath2, {
    fill: color.toRgbString()
  }, {
    duration: 700,
    delay: 700
  });

};
colorTZlogo();

function animateLogo() {
    dynamics.css(logoContainer, {
      scale: 1,
      translateX: Math.random() * 100 - 50,
      translateY: Math.random() * 100 - 50
    });

    dynamics.setTimeout(function () {
      dynamics.css(logoContainer, {
        translateX: 50,
        translateY: 50,
        scale: 0.95
      });
    }, 100);

    dynamics.setTimeout(function () {
      dynamics.css(logoContainer, {
        translateX: 0,
        translateY: 0,
        scale: 1  
      });
    }, 150);
  };

  animateLogo();



dynamics.setTimeout(function () {
    animateLogo();
    animateBlackStripes(stripesEl, {
      count: numBlackStripes,
      delayShow: true
    });
    // animateLogo();
    animateColoredStripes(stripesEl, {
      count: 10
    });
  }, 1000);


dynamics.setTimeout(function () {
    animateColoredStripes(stripesEl, {
      count: numAfterColoredStripes
    });
  }, 3500);



// Making navbar and footer visible

dynamics.setTimeout(function () {

    dynamics.css(content, {
        translateY: -100,
        scale:0.7
      });

    footer.style.opacity = 1;
    navbar.style.opacity = 1;
    date.style.opacity = 1;
    main.style.opacity = 1;
  }, 2000);

function allanimate()
{
  dynamics.setTimeout(function () {
    animateLogo();
    animateBlackStripes(stripesEl, {
      count: numBlackStripes,
      delayShow: true
    });
    // animateLogo();
    animateColoredStripes(stripesEl, {
      count: 10
    });
  }, 1000);
}


function logoAnimationLoop() {
    dynamics.setTimeout(function () {
      allanimate();
      logoAnimationLoop();
    }, 100 + Math.random() * 5000);
  };
  logoAnimationLoop();

function logoColorLoop() {
    dynamics.setTimeout(function () {
      colorTZlogo();
      logoColorLoop();
    }, 2100);
  };

dynamics.setTimeout(logoColorLoop(),2500);


dynamics.animate(techText, {
    scale:2,
    color:red,
    opacity:0.5
  }, {
    duration: 700
  });