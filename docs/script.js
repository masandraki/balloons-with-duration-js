(function () {
  'use strict';

  // "Singlet" font https://fonts.google.com/specimen/Sniglet
  var fontDefinition = "\n@font-face { \n  font-family: \"BalloonsJS\";\n\n  font-weight: 100 900;\n  font-style: normal italic;\n\n  src: url(data:application/octet-stream;base64,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);\n}\n";

  var BASE_SIZE = 324;
  function createTextBalloon(data) {
      var balloon = document.createElement("text-balloon");
      // Create a temporary element to measure the text size
      var measureElement = document.createElement("span");
      // TODO: figure out line height that fits snugly around emojis without clipping them
      measureElement.style.cssText = "\n    position: absolute;\n    visibility: hidden;\n    font-family: BalloonsJS, system-ui;\n    font-weight: bold;\n    font-size: ".concat(data.fontSize, "px;\n    line-height: 1;\n    vertical-align: sub;\n    white-space: nowrap;\n    min-width: 1ch;\n  ");
      measureElement.textContent = data.text;
      document.body.appendChild(measureElement);
      // Measure the text size
      var textWidth = measureElement.offsetWidth;
      var textHeight = measureElement.offsetHeight;
      // Remove the temporary element
      document.body.removeChild(measureElement);
      // Calculate SVG size with padding
      var padding = 20; // Adjust this value as needed
      var svgWidth = textWidth + padding * 1;
      var svgHeight = textHeight + padding * 1;
      var scaleAdjustment = BASE_SIZE / data.fontSize;
      var svgContent = "\n    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"".concat(svgWidth * scaleAdjustment, "\" height=\"").concat(svgHeight * scaleAdjustment, "\">\n      <defs>\n     <filter id=\"balloon\" color-interpolation-filters=\"sRGB\">\n    <feMorphology in=\"SourceGraphic\" operator=\"dilate\" radius=\"5\" result=\"dilated\" />\n\n    <feGaussianBlur in=\"dilated\" stdDeviation=\"8\" result=\"dilated-blur\" />\n\n    <feSpecularLighting in=\"dilated-blur\" surfaceScale=\"20\" specularConstant=\"3.05\" specularExponent=\"20\" lighting-color=\"#ffffff\" result=\"outline-highlight\">\n      <feDistantLight azimuth=\"-20\" elevation=\"12\" />\n    </feSpecularLighting>\n\n     <feComposite in2=\"dilated\" in=\"outline-highlight\" operator=\"atop\" result=\"outline-with-light\" />\n    \n\n    <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"12\" result=\"blur\" />\n\n    <feSpecularLighting in=\"blur\" surfaceScale=\"14\" specularConstant=\"1\" specularExponent=\"35\" lighting-color=\"#ffffff\" result=\"highlight\">\n      <fePointLight x=\"400\" y=\"-120\" z=\"500\"/>\n    </feSpecularLighting>\n\n    <feComposite in2=\"SourceGraphic\" in=\"highlight\" operator=\"atop\" result=\"with-light\" />\n\n    <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"1 0 0 0 0\n              0 1 0 0 0\n              0 0 1 0 0\n              0 0 0 100 0\" result=\"black\" />\n    <feOffset in=\"black\" dx=\"-12\" dy=\"12\" result=\"offset\" />\n\n    <feComposite in2=\"black\" in=\"offset\" operator=\"out\" result=\"clipped\" />\n    <feGaussianBlur in=\"clipped\" stdDeviation=\"12\" result=\"clipped-blur\" />\n    <feOffset in=\"clipped-blur\" dx=\"12\" dy=\"-12\" result=\"offset-shadow\" />\n    <feComposite in=\"offset-shadow\" in2=\"with-light\" operator=\"atop\" result=\"swa\" />\n\n    <feComposite in=\"outline-with-light\" in2=\"SourceGraphic\" operator=\"out\" result=\"outline\"/>\n    <feComposite in2=\"outline\" in=\"swa\" operator=\"over\"  />\n\n  </filter>\n        <style type=\"text/css\">\n        ").concat(fontDefinition, "\n        </style>\n      </defs>\n      <text x=\"50%\" y=\"50%\" dominant-baseline=\"central\" text-anchor=\"middle\" fill=\"").concat(data.color, "\" font-size=\"").concat(BASE_SIZE, "px\" font-family=\"BalloonsJS, system-ui\" font-weight=\"bold\" filter=\"url(#balloon)\">").concat(data.text, "</text>\n    </svg>\n  ");
      // Use encodeURIComponent instead of btoa
      var encodedSVG = encodeURIComponent(svgContent);
      Object.assign(balloon.style, {
          position: "absolute",
          top: "100%",
          opacity: "0",
          width: "".concat(svgWidth, "px"),
          height: "".concat(svgHeight, "px"),
          fontSize: data.fontSize,
          lineHeight: "1",
          display: "inline-block",
          // background: "black",
          minWidth: "1ch",
      });
      var balloonContent = document.createElement("balloon-content");
      Object.assign(balloonContent.style, {
          display: "block",
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "".concat(svgWidth * scaleAdjustment, "px"),
          height: "".concat(svgHeight * scaleAdjustment, "px"),
          transform: "translate(-50%, -50%) scale(".concat(1 / scaleAdjustment, ")"),
          transformOrigin: "center",
          backgroundImage: "url(\"data:image/svg+xml,".concat(encodedSVG, "\")"),
          backgroundSize: "contain",
      });
      balloon.appendChild(balloonContent);
      return balloon;
  }
  function animateBalloon(balloon, zPosition, delay) {
      var duration = 5000 + Math.random() * 1500;
      var tiltYAmplitude = (Math.random() - 0.5) * 14; // Random tilt amplitude between -10 and 10 degrees
      var tiltZAmplitude = (Math.random() - 0.5) * 16; // Random tilt amplitude between -20 and 20 degrees
      var tiltFrequency = 1 + Math.random(); // Random frequency between 1 and 2
      var targetX = (Math.random() - 0.5) * 100; // Random target X position between -50 and 50
      var keyframes = new Array(101).fill(null).map(function (_, i) {
          var progress = i / 100;
          var horizontalProgress = targetX * progress;
          var tiltY = Math.sin(progress * Math.PI * 2 * tiltFrequency) * tiltYAmplitude;
          var tiltZ = Math.cos(progress * Math.PI * 2 * tiltFrequency) * tiltZAmplitude;
          return {
              transform: "translate3d(".concat(horizontalProgress, "px, calc(-1 * (100vh + 100%) * ").concat(progress, "), ").concat(-zPosition, "px) rotateY(").concat(tiltY, "deg) rotateZ(").concat(tiltZ, "deg)"),
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
      var textBalloonsStyle = document.createElement("style");
      textBalloonsStyle.innerHTML = fontDefinition;
      container.appendChild(textBalloonsStyle);
      Object.assign(container.style, {
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          height: "100%",
          zIndex: "9999",
          pointerEvents: "none",
          perspective: "1000px",
          perspectiveOrigin: "50% 100%",
          // Shadows
          filter: "drop-shadow(-60px 60px 12px rgba(0, 0, 0, 0.25))",
          // Custom balloon font
          fontFamily: "\"BalloonsJS\", system-ui",
          fontWeight: "bold",
      });
      document.body.appendChild(container);
      var lineDelay = 1000; // Delay between lines in milliseconds
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

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };

  // @ts-nocheck
  var defaultBalloonColor = "#84A332";
  var defaultLightColor = "#C0F381";
  var balloonColorProperty = "--balloon-color";
  var lightColorProperty = "--light-color";
  var widthProperty = "--balloon-width";
  var heightProperty = "--balloon-height";
  var balloonDefaultSize = {
      width: 233,
      height: 609,
  };
  var createBallonElement = function (_a) {
      var balloonColor = _a.balloonColor, lightColor = _a.lightColor, width = _a.width;
      var balloon = document.createElement("balloon");
      balloon.innerHTML = balloonSvgHTML;
      Object.assign(balloon.style, {
          position: "absolute",
          overflow: "hidden",
          top: "0",
          left: "0",
          display: "inline-block",
          isolation: "isolate",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          opacity: "0.001",
          transform: "translate(calc(-100% + 1px), calc(-100% + 1px))",
          contain: "style, layout, paint",
          transformOrigin: "".concat(width / 2, "px ").concat(width / 2, "px"),
          willChange: "transform", // Improves rendering performance in Safari
      });
      balloon.style.setProperty(balloonColorProperty, balloonColor);
      balloon.style.setProperty(lightColorProperty, lightColor);
      balloon.style.setProperty(widthProperty, width + "px");
      balloon.style.setProperty(heightProperty, (width * 609) / 223 + "px");
      return balloon;
  };
  var balloonSvgHTML = "\n<svg\n\nstyle=\"width: var(".concat(widthProperty, "); height: var(").concat(heightProperty, ");\"\nviewBox=\"0 0 223 609\"\nfill=\"none\"\nxmlns=\"http://www.w3.org/2000/svg\"\n>\n<g opacity=\"0.8\" filter=\"url(#filter0_f_102_49)\" >\n  <path\n    d=\"M117.5 253C136.167 294.5 134.7 395 125.5 453C116.3 511 133.833 578.167 125.5 606\"\n    stroke=\"url(#paint0_linear_102_49)\"\n    stroke-width=\"2\"\n  />\n</g>\n<g opacity=\"0.85\" filter=\"url(#filter1_ii_102_49)\">\n  <path\n    fill-rule=\"evenodd\"\n    clip-rule=\"evenodd\"\n    d=\"M176.876 204.032C181.934 198.064 209.694 160.262 210.899 127.619C213.023 70.1236 176.876 13 118.337 13C55.7949 13 18.5828 69.332 22.2724 127.619C24.0956 156.423 38.9766 178.5 51.7922 195.372C57.7811 203.257 90.0671 238.749 112.15 245.044C111.698 248.246 112.044 253.284 116.338 254H121.838V245.71C143.277 242.292 172.085 209.686 176.876 204.032Z\"\n    fill=\"var(").concat(balloonColorProperty, ", ").concat(defaultBalloonColor, ")\"\n  />\n</g>\n<g filter=\"url(#filter2_f_102_49)\">\n  <path\n    d=\"M125 256.5C125 258.433 122.09 260 118.5 260C114.91 260 112 258.433 112 256.5C112 254.567 114.91 255 118.5 255C122.09 255 125 254.567 125 256.5Z\"\n    fill=\"var(").concat(balloonColorProperty, ", ").concat(defaultBalloonColor, ")\"\n  />\n</g>\n<g opacity=\"0.2\" filter=\"url(#filter3_f_102_49)\">\n  <path\n    d=\"M178.928 128.12C178.011 152.146 172.137 162.97 154.623 184.2C141.594 199.992 128.28 215 112.805 215C104.349 215 92.739 215 65.2673 177.844C56.1123 165.461 45.4818 149.259 44.1794 128.12C41.5436 85.3424 68.1267 44 112.805 44C154.623 44 180.55 85.6242 178.928 128.12Z\"\n    fill=\"url(#paint1_radial_102_49)\"\n  />\n</g>\n<g\n  style=\"mix-blend-mode: lighten\"\n  opacity=\"0.7\"\n  filter=\"url(#filter4_df_102_49)\"\n>\n  <path\n    d=\"M72.7992 108.638L74.0985 87.5247C74.3145 84.0152 77.4883 81.4427 80.9664 81.958L94.8619 84.0166C98.4018 84.541 100.699 88.0277 99.7828 91.4871L94.0502 113.144C93.1964 116.369 89.8758 118.278 86.659 117.394L77.1969 114.792C74.4599 114.039 72.6249 111.471 72.7992 108.638Z\"\n    fill=\"var(").concat(lightColorProperty, ", ").concat(defaultLightColor, ")\"\n  />\n</g>\n<g\n  style=\"mix-blend-mode: lighten\"\n  opacity=\"0.5\"\n  filter=\"url(#filter5_f_102_49)\"\n>\n  <path\n    d=\"M147.76 88.7366L144.842 67.9855C144.378 64.687 141.316 62.3976 138.021 62.8858L123.638 65.0166C120.098 65.541 117.801 69.0277 118.717 72.4871L124.462 94.1891C125.311 97.3967 128.602 99.3061 131.808 98.4512L143.364 95.3695C146.296 94.5878 148.182 91.7409 147.76 88.7366Z\"\n    fill=\"var(").concat(lightColorProperty, ", ").concat(defaultLightColor, ")\"\n  />\n</g>\n<g style=\"mix-blend-mode: lighten\" filter=\"url(#filter6_f_102_49)\">\n  <path\n    d=\"M46.4087 131.164C38.1642 111.726 43.2454 91.2599 47.4381 82.0988C47.7504 81.4164 48.5574 80.8601 48.8712 81.5418C48.9711 81.7589 48.9188 82.1169 48.8357 82.3409C41.2341 102.832 45.5154 122.958 47.3397 130.925C47.8434 133.124 47.2898 133.242 46.4087 131.164Z\"\n    fill=\"var(").concat(lightColorProperty, ", ").concat(defaultLightColor, ")\"\n  />\n</g>\n<g style=\"mix-blend-mode: lighten\" filter=\"url(#filter7_f_102_49)\">\n  <path\n    d=\"M46.4087 131.164C38.1642 111.726 43.2454 91.2599 47.4381 82.0988C47.7504 81.4164 48.5574 80.8601 48.8712 81.5418C48.9711 81.7589 48.9188 82.1169 48.8357 82.3409C41.2341 102.832 45.5154 122.958 47.3397 130.925C47.8434 133.124 47.2898 133.242 46.4087 131.164Z\"\n    fill=\"var(").concat(lightColorProperty, ", ").concat(defaultLightColor, ")\"\n  />\n</g>\n<g opacity=\"0.3\">\n  <g style=\"mix-blend-mode: lighten\" filter=\"url(#filter8_f_102_49)\">\n    <path\n      d=\"M190.817 150.078C196.906 136.754 196.503 119.258 195.396 111.05C195.318 110.475 194.888 109.925 194.734 110.403C194.704 110.495 194.689 110.697 194.699 110.807C196.396 129.344 191.942 144.593 190.447 149.824C190.122 150.959 190.349 151.104 190.817 150.078Z\"\n      fill=\"var(").concat(lightColorProperty, ", ").concat(defaultLightColor, ")\"\n    />\n  </g>\n  <g style=\"mix-blend-mode: lighten\" filter=\"url(#filter9_f_102_49)\">\n    <path\n      d=\"M190.817 150.078C196.906 136.754 196.503 119.258 195.396 111.05C195.318 110.475 194.888 109.925 194.734 110.403C194.704 110.495 194.689 110.697 194.699 110.807C196.396 129.344 191.942 144.593 190.447 149.824C190.122 150.959 190.349 151.104 190.817 150.078Z\"\n      fill=\"var(").concat(lightColorProperty, ", ").concat(defaultLightColor, ")\"\n    />\n  </g>\n</g>\n</svg>\n");
  var svgFiltersHtml = "\n<svg>\n  <defs>\n    <filter\n      id=\"filter0_f_102_49\"\n      x=\"114.588\"\n      y=\"250.59\"\n      width=\"20.5082\"\n      height=\"357.697\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"BackgroundImageFix\"\n        result=\"shape\"\n      />\n      <feGaussianBlur\n        stdDeviation=\"1\"\n        result=\"effect1_foregroundBlur_102_49\"\n      />\n    </filter>\n    <filter\n      id=\"filter1_ii_102_49\"\n      x=\"22.0213\"\n      y=\"13\"\n      width=\"188.967\"\n      height=\"241\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"BackgroundImageFix\"\n        result=\"shape\"\n      />\n      <feColorMatrix\n        in=\"SourceAlpha\"\n        type=\"matrix\"\n        values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\"\n        result=\"hardAlpha\"\n      />\n      <feOffset />\n      <feGaussianBlur stdDeviation=\"4.5\" />\n      <feComposite in2=\"hardAlpha\" operator=\"arithmetic\" k2=\"-1\" k3=\"1\" />\n      <feColorMatrix\n        type=\"matrix\"\n        values=\"0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0\"\n      />\n      <feBlend\n        mode=\"normal\"\n        in2=\"shape\"\n        result=\"effect1_innerShadow_102_49\"\n      />\n      <feColorMatrix\n        in=\"SourceAlpha\"\n        type=\"matrix\"\n        values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\"\n        result=\"hardAlpha\"\n      />\n      <feOffset />\n      <feGaussianBlur stdDeviation=\"18\" />\n      <feComposite in2=\"hardAlpha\" operator=\"arithmetic\" k2=\"-1\" k3=\"1\" />\n      <feColorMatrix\n        type=\"matrix\"\n        values=\"0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0\"\n      />\n      <feBlend\n        mode=\"overlay\"\n        in2=\"effect1_innerShadow_102_49\"\n        result=\"effect2_innerShadow_102_49\"\n      />\n    </filter>\n    <filter\n      id=\"filter2_f_102_49\"\n      x=\"111\"\n      y=\"253.959\"\n      width=\"15\"\n      height=\"7.04138\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"BackgroundImageFix\"\n        result=\"shape\"\n      />\n      <feGaussianBlur\n        stdDeviation=\"0.5\"\n        result=\"effect1_foregroundBlur_102_49\"\n      />\n    </filter>\n    <filter\n      id=\"filter3_f_102_49\"\n      x=\"0\"\n      y=\"0\"\n      width=\"223\"\n      height=\"259\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"BackgroundImageFix\"\n        result=\"shape\"\n      />\n      <feGaussianBlur\n        stdDeviation=\"22\"\n        result=\"effect1_foregroundBlur_102_49\"\n      />\n    </filter>\n    <filter\n      id=\"filter4_df_102_49\"\n      x=\"46.7878\"\n      y=\"59.8922\"\n      width=\"79.1969\"\n      height=\"87.7179\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feColorMatrix\n        in=\"SourceAlpha\"\n        type=\"matrix\"\n        values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\"\n        result=\"hardAlpha\"\n      />\n      <feOffset dy=\"4\" />\n      <feGaussianBlur stdDeviation=\"13\" />\n      <feComposite in2=\"hardAlpha\" operator=\"out\" />\n      <feColorMatrix\n        type=\"matrix\"\n        values=\"0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0\"\n      />\n      <feBlend\n        mode=\"overlay\"\n        in2=\"BackgroundImageFix\"\n        result=\"effect1_dropShadow_102_49\"\n      />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"effect1_dropShadow_102_49\"\n        result=\"shape\"\n      />\n      <feGaussianBlur\n        stdDeviation=\"5.5\"\n        result=\"effect2_foregroundBlur_102_49\"\n      />\n    </filter>\n    <filter\n      id=\"filter5_f_102_49\"\n      x=\"102.515\"\n      y=\"46.8202\"\n      width=\"61.3035\"\n      height=\"67.8351\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"BackgroundImageFix\"\n        result=\"shape\"\n      />\n      <feGaussianBlur\n        stdDeviation=\"8\"\n        result=\"effect1_foregroundBlur_102_49\"\n      />\n    </filter>\n    <filter\n      id=\"filter6_f_102_49\"\n      x=\"34\"\n      y=\"73.2313\"\n      width=\"22.9258\"\n      height=\"67.4198\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"BackgroundImageFix\"\n        result=\"shape\"\n      />\n      <feGaussianBlur\n        stdDeviation=\"4\"\n        result=\"effect1_foregroundBlur_102_49\"\n      />\n    </filter>\n    <filter\n      id=\"filter7_f_102_49\"\n      x=\"40\"\n      y=\"79.2313\"\n      width=\"10.9258\"\n      height=\"55.4198\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"BackgroundImageFix\"\n        result=\"shape\"\n      />\n      <feGaussianBlur\n        stdDeviation=\"1\"\n        result=\"effect1_foregroundBlur_102_49\"\n      />\n    </filter>\n    <filter\n      id=\"filter8_f_102_49\"\n      x=\"186.419\"\n      y=\"106.345\"\n      width=\"13.5106\"\n      height=\"48.2987\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"BackgroundImageFix\"\n        result=\"shape\"\n      />\n      <feGaussianBlur\n        stdDeviation=\"1.93775\"\n        result=\"effect1_foregroundBlur_102_49\"\n      />\n    </filter>\n    <filter\n      id=\"filter9_f_102_49\"\n      x=\"189.326\"\n      y=\"109.252\"\n      width=\"7.69731\"\n      height=\"42.4855\"\n      filterUnits=\"userSpaceOnUse\"\n      color-interpolation-filters=\"sRGB\"\n    >\n      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />\n      <feBlend\n        mode=\"normal\"\n        in=\"SourceGraphic\"\n        in2=\"BackgroundImageFix\"\n        result=\"shape\"\n      />\n      <feGaussianBlur\n        stdDeviation=\"0.484439\"\n        result=\"effect1_foregroundBlur_102_49\"\n      />\n    </filter>\n    <linearGradient\n      id=\"paint0_linear_102_49\"\n      x1=\"124.798\"\n      y1=\"253\"\n      x2=\"124.798\"\n      y2=\"606\"\n      gradientUnits=\"userSpaceOnUse\"\n    >\n      <stop stop-color=\"white\" />\n      <stop offset=\"0.474934\" stop-color=\"grey\" stop-opacity=\"0.1\" />\n      <stop offset=\"0.722707\" stop-color=\"white\" stop-opacity=\"0.6\" />\n      <stop offset=\"0.93469\" stop-color=\"grey\" stop-opacity=\"0.7\" />\n      <stop offset=\"1\" stop-color=\"white\" stop-opacity=\"0\" />\n    </linearGradient>\n    <radialGradient\n      id=\"paint1_radial_102_49\"\n      cx=\"0\"\n      cy=\"0\"\n      r=\"1\"\n      gradientUnits=\"userSpaceOnUse\"\n      gradientTransform=\"translate(134 149.5) rotate(-123.69) scale(82.9277 65.4692)\"\n    >\n      <stop />\n      <stop offset=\"1\" stop-opacity=\"0\" />\n    </radialGradient>\n  </defs>\n</svg>\n";

  var easings = [
      // easeOutQuint
      "cubic-bezier(0.22, 1, 0.36, 1)",
      // easeOutCubic
      "cubic-bezier(0.33, 1, 0.68, 1)",
  ];
  var colorPairs = [
      // yellow
      ["#ffec37ee", "#f8b13dff"],
      // red
      ["#f89640ee", "#c03940ff"],
      //blue
      ["#3bc0f0ee", "#0075bcff"],
      // green
      ["#b0cb47ee", "#3d954bff"],
      // purple
      ["#cf85b8ee", "#a3509dff"],
  ];
  function createBalloonAnimation(_a) {
      var balloon = _a.balloon, x = _a.x, y = _a.y, z = _a.z, targetX = _a.targetX, targetY = _a.targetY, targetZ = _a.targetZ, zIndex = _a.zIndex;
      balloon.style.zIndex = zIndex.toString();
      // Add blur to the closes ballons for bokeh effect
      balloon.style.filter = "blur(".concat(zIndex > 7 ? 8 : 0, "px)");
      var getAnimation = function () {
          var tiltAngle = Math.random() * (15 - 8) + 8; // Random tilt angle between 8 and 15 degrees
          var tiltDirection = Math.random() < 0.5 ? 1 : -1; // Random tilt direction
          return balloon.animate([
              {
                  transform: "translate(-50%, 0%) translate3d(".concat(x, "px, ").concat(y, "px, ").concat(z, "px) rotate3d(0, 0, 1, ").concat(tiltDirection * -tiltAngle, "deg)"),
                  opacity: 1,
              },
              {
                  transform: "translate(-50%, 0%) translate3d(".concat(x + (targetX - x) / 2, "px, ").concat(y + (y + targetY * 5 - y) / 2, "px, ").concat(z + (targetZ - z) / 2, "px) rotate3d(0, 0, 1, ").concat(tiltDirection * tiltAngle, "deg)"),
                  opacity: 1,
                  offset: 0.5,
              },
              {
                  transform: "translate(-50%, 0%) translate3d(".concat(targetX, "px, ").concat(y + targetY * 5, "px, ").concat(targetZ, "px) rotate3d(0, 0, 1, ").concat(tiltDirection * -tiltAngle, "deg)"),
                  opacity: 1,
              },
          ], {
              duration: (Math.random() * 1000 + 5000) * 5,
              easing: easings[Math.floor(Math.random() * easings.length)],
              delay: zIndex * 200,
          });
      };
      return { balloon: balloon, getAnimation: getAnimation };
  }
  function balloons() {
      return new Promise(function (resolve) {
          var balloonsContainer = document.createElement("balloons");
          Object.assign(balloonsContainer.style, {
              overflow: "hidden",
              position: "fixed",
              inset: "0",
              zIndex: "999",
              display: "inline-block",
              pointerEvents: "none",
              perspective: "1500px",
              perspectiveOrigin: "50vw 100vh",
              contain: "style, layout, paint",
          });
          document.documentElement.appendChild(balloonsContainer);
          var sceneSize = { width: window.innerWidth, height: window.innerHeight };
          // make balloon height relative to screen size for this nice bokeh/perspective effect
          var balloonHeight = Math.floor(Math.min(sceneSize.width, sceneSize.height) * 1);
          var balloonWidth = (balloonDefaultSize.width / balloonDefaultSize.height) * balloonHeight;
          var amount = Math.max(7, Math.round(window.innerWidth / (balloonWidth / 2)));
          // make max dist depend on number of balloons and their size for realistic effect
          // we dont want them to be too separated or too squeezed together
          var maxDist = Math.max((amount * balloonWidth) / 2, (balloonWidth / 2) * 10);
          var balloonPositions = [];
          for (var i = 0; i < amount; i++) {
              var x = Math.round(sceneSize.width * Math.random());
              // make sure balloons first render below the bottom of the screen
              var y = window.innerHeight;
              var z = Math.round(-1 * (Math.random() * maxDist));
              var targetX = Math.round(x + Math.random() * balloonWidth * 6 * (Math.random() > 0.5 ? 1 : -1));
              var targetY = -window.innerHeight;
              // balloons don't move in the Z direction
              var targetZ = z;
              balloonPositions.push({
                  x: x,
                  y: y,
                  z: z,
                  targetX: targetX,
                  targetY: targetY,
                  targetZ: targetZ,
              });
          }
          balloonPositions = balloonPositions.sort(function (a, b) { return a.z - b.z; });
          var closestBallonPosition = balloonPositions[balloonPositions.length - 1];
          balloonPositions[0];
          // console.log({ closestBallonPosition, farthestBallonPosition });
          balloonPositions = balloonPositions.map(function (pos) { return (__assign(__assign({}, pos), { z: pos.z - closestBallonPosition.z, targetZ: pos.z - closestBallonPosition.z })); });
          var filtersElement = document.createElement("div");
          filtersElement.innerHTML = svgFiltersHtml;
          balloonsContainer.appendChild(filtersElement);
          var currentZIndex = 1;
          var animations = balloonPositions.map(function (pos, index) {
              var colorPair = colorPairs[index % colorPairs.length];
              var balloon = createBallonElement({
                  balloonColor: colorPair[1],
                  lightColor: colorPair[0],
                  width: balloonWidth,
              });
              balloonsContainer.appendChild(balloon);
              return createBalloonAnimation(__assign(__assign({ balloon: balloon }, pos), { zIndex: currentZIndex++ }));
          });
          // Wait a bit for the balloon prerender
          requestAnimationFrame(function () {
              var animationPromises = animations.map(function (_a) {
                  var balloon = _a.balloon, getAnimation = _a.getAnimation;
                  var a = getAnimation();
                  return a.finished.then(function () {
                      balloon.remove();
                  });
              });
              Promise.all(animationPromises).then(function () {
                  balloonsContainer.remove();
                  resolve();
              });
          });
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
      balloons();
      var button = document.getElementById("releaseBalloonsButton");
      button === null || button === void 0 ? void 0 : button.addEventListener("click", function () {
          balloons();
      });
      var textButton = document.getElementById("releaseTextBalloonsButton");
      function releaseTextBalloons() {
          var colors = [
              // lemon
              "#DBF505EE",
              // blue
              "#1754D8EE",
              // orange
              "#FA4616EE",
              // lime
              "#06D718EE",
              // magenta,
              "#FF008DEE",
          ];
          // Pick first color randomly
          var firstColorIndex = Math.floor(Math.random() * colors.length);
          // Pick second color by selecting from remaining colors
          var remainingColors = colors.filter(function (_, index) { return index !== firstColorIndex; });
          var secondColorIndex = Math.floor(Math.random() * remainingColors.length);
          textBalloons([
              {
                  color: colors[firstColorIndex],
                  fontSize: Math.min(window.innerWidth / 5, 160),
                  text: "HAPPY",
              },
              {
                  color: remainingColors[secondColorIndex],
                  fontSize: Math.min(window.innerWidth / 4, 160),
                  text: "BDAY",
              },
              {
                  text: "💩🔥😈",
                  fontSize: Math.min(window.innerWidth / 4, 160),
                  color: "#000000",
              },
          ]);
      }
      textButton === null || textButton === void 0 ? void 0 : textButton.addEventListener("click", releaseTextBalloons);
  });

})();
