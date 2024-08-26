
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    function createTextBalloon(data) {
        var balloon = document.createElement("text-balloon");
        balloon.textContent = data.text;
        Object.assign(balloon.style, {
            position: "absolute",
            color: data.color,
            top: "100%",
            opacity: "0",
            fontSize: data.fontSize,
            lineHeight: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // TODO: avoid clipping emojis
            // overflow: "hidden",
            textAlign: "center",
            transform: "translateZ(0)",
            filter: "url(#balloon)",
            // To handle empty spaces
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
            transformOrigin: "center",
            contain: "style, layout, paint",
            minWidth: "1ch",
            verticalAlign: "middle",
            // TODO: use radial gradient and background clip: text;. This breaks in Firefox so find a fix
        });
        return balloon;
    }
    function animateBalloon(balloon, zPosition, delay) {
        var duration = 10000 + Math.random() * 5000;
        var tiltYAmplitude = (Math.random() - 0.5) * 18; // Random tilt amplitude between -10 and 10 degrees
        var tiltZAmplitude = (Math.random() - 0.5) * 20; // Random tilt amplitude between -20 and 20 degrees
        var tiltFrequency = 1 + Math.random(); // Random frequency between 1 and 2
        var targetX = (Math.random() - 0.5) * 100; // Random target X position between -50 and 50
        var keyframes = new Array(101).fill(null).map(function (_, i) {
            var progress = i / 100;
            var verticalProgress = -100 * progress;
            var horizontalProgress = targetX * progress;
            var tiltY = Math.sin(progress * Math.PI * 2 * tiltFrequency) * tiltYAmplitude;
            var tiltZ = Math.cos(progress * Math.PI * 2 * tiltFrequency) * tiltZAmplitude;
            return {
                transform: "translate3d(".concat(horizontalProgress, "px, ").concat(verticalProgress, "vh, ").concat(-zPosition, "px) rotateY(").concat(tiltY, "deg) rotateZ(").concat(tiltZ, "deg)"),
                opacity: i === 0 ? 0 : 1,
            };
        });
        var animation = balloon.animate(keyframes, {
            duration: duration,
            delay: delay,
            easing: "linear",
            fill: "forwards",
        });
        animation.onfinish = function () { return balloon.remove(); };
    }
    function textBalloons(balloons) {
        var container = document.createElement("text-balloons");
        var textBalloonsFilter = document.createElement("text-balloons-filter");
        textBalloonsFilter.innerHTML = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"0\" height=\"0\">\n\n  <filter id=\"balloon\" color-interpolation-filters=\"sRGB\">\n    <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"6\" result=\"blur\" />\n\n    <feSpecularLighting in=\"blur\" surfaceScale=\"42\" specularConstant=\"0.95\" specularExponent=\"60\" lighting-color=\"#ffffff\" result=\"highlight\">\n      <feDistantLight azimuth=\"300\" elevation=\"22\" />\n    </feSpecularLighting>\n\n    <feComposite in2=\"SourceGraphic\" in=\"highlight\" operator=\"atop\" result=\"with-light\" />\n\n    <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"1 0 0 0 0\n              0 1 0 0 0\n              0 0 1 0 0\n              0 0 0 100 0\" result=\"black\" />\n    <feOffset in=\"black\" dx=\"-6\" dy=\"6\" result=\"offset\" />\n\n    <feComposite in2=\"black\" in=\"offset\" operator=\"out\" result=\"clipped\" />\n    <feGaussianBlur in=\"clipped\" stdDeviation=\"6\" result=\"clipped-blur\" />\n    <feOffset in=\"clipped-blur\" dx=\"6\" dy=\"-6\" result=\"offset-shadow\" />\n    <feComposite in=\"offset-shadow\" in2=\"with-light\" operator=\"atop\" result=\"swa\" />\n\n  </filter>\n</svg>\n";
        container.appendChild(textBalloonsFilter);
        container.style.filter = "drop-shadow(-60px 60px 12px rgba(0, 0, 0, 0.25))";
        Object.assign(container.style, {
            position: "fixed",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: "9999",
            perspective: "1000px",
            perspectiveOrigin: "50% 100%",
        });
        document.body.appendChild(container);
        var lineDelay = 3000; // Delay between lines in milliseconds
        var charDelay = 100; // Delay between characters in milliseconds
        var charSpacing = 0.2; // Additional spacing between characters in ch units
        balloons.length;
        balloons.forEach(function (line, lineIndex) {
            // Using segmenter to support emojis
            var chars = Array.from(new Intl.Segmenter().segment(line.text)).map(function (segment) { return segment.segment; });
            // const zPosition = ((totalLines - lineIndex + 1) / totalLines) * maxDepth;
            var zPosition = 0;
            var lineBalloons = chars.map(function (char) {
                var balloon = createTextBalloon({
                    text: char,
                    color: line.color,
                    fontSize: line.fontSize,
                });
                balloon.style.opacity = "0";
                container.appendChild(balloon);
                return balloon;
            });
            // Force a reflow
            container.offsetHeight;
            // Calculate total line width
            var lineWidthPx = lineBalloons.reduce(function (sum, balloon) { return sum + balloon.offsetWidth; }, 0);
            var containerWidth = container.offsetWidth;
            var lineWidthPercent = (lineWidthPx / containerWidth) * 100;
            var startX = Math.max(0, Math.min(100 - lineWidthPercent, 50 - lineWidthPercent / 2));
            var currentX = startX;
            lineBalloons.forEach(function (balloon, charIndex) {
                var charWidthPercent = (balloon.offsetWidth / containerWidth) * 100;
                balloon.style.left = "".concat(currentX, "%");
                animateBalloon(balloon, zPosition, lineIndex * lineDelay + charIndex * charDelay);
                currentX += charWidthPercent + charSpacing;
            });
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        //   balloons();
        textBalloons([
            {
                text: "BALLOONS",
                color: "rgba(255, 0, 0, 0.85)",
                fontSize: "162px",
            },
            {
                text: "ARE JUST",
                color: "rgba(40, 40, 255, 0.85)",
                fontSize: "162px",
            },
            {
                text: "SO CUTE",
                color: "rgba(0, 200, 0, 0.85)",
                fontSize: "162px",
            },
            {
                text: "👻 💩 🤙",
                color: "BLACK",
                fontSize: "182px",
            },
            // {
            //   text: "function() {}",
            //   color: "rgba(240, 220, 0, 0.85)",
            //   fontSize: "162px",
            // },
        ]);
        var button = document.getElementById("releastBalloonsButton");
        button === null || button === void 0 ? void 0 : button.addEventListener("click", function () {
            textBalloons([
                {
                    text: "🏝️💩🤡🤩",
                    color: "rgba(255, 0, 0, 0.85)",
                    fontSize: "162px",
                },
                {
                    text: "ARE NOW",
                    color: "rgba(40, 40, 255, 0.85)",
                    fontSize: "162px",
                },
                // {
                //   text: "LIVE !! $#",
                //   color: "rgba(0, 200, 0, 0.85)",
                //   fontSize: "162px",
                // },
                // {
                //   text: "function() {}",
                //   color: "rgba(240, 220, 0, 0.85)",
                //   fontSize: "162px",
                // },
            ]);
        });
    });

})();
