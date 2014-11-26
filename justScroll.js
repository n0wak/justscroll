var justScroll = (function() {

    // http://greweb.me/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
    EasingFunctions = {
      linear: function (t) { return t },
      easeInQuad: function (t) { return t*t },
      easeOutQuad: function (t) { return t*(2-t) },
      easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
      easeInCubic: function (t) { return t*t*t },
      easeOutCubic: function (t) { return (--t)*t*t+1 },
      easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
      easeInQuart: function (t) { return t*t*t*t },
      easeOutQuart: function (t) { return 1-(--t)*t*t*t },
      easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
      easeInQuint: function (t) { return t*t*t*t*t },
      easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
      easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
    }


    var tweenPosition = 0;
    var tweenDuration = 60;

    var tween = function() {
        var p = tweenPosition / tweenDuration;
        tweenPosition++;
        return EasingFunctions.easeInOutCubic(p);
    }

    var going = function() {
        var p = tween();
        window.scroll(0, tweenFrom + (tweenTo - tweenFrom) * p)
        if (p != 1) {
            window.requestAnimationFrame(going);
        }
    }

    var to = function(scrollTo, time) {
        var toPos = 0;
        if (typeof scrollTo == "number") {
            toPos = scrollTo;
        } else if (typeof scrollTo == "string") {
            toPos = (document.getElementById(scrollTo)).offsetTop;
        }
        if (typeof time == "number") {
            tweenDuration = Math.floor(time * 60);
        } else {
            tweenDuration = 60;
        }

        tweenPosition = 0;
        tweenTo = toPos;
        tweenFrom = window.scrollY;
        window.requestAnimationFrame(going);

    }

    return {
        "to": to
    }

}());
