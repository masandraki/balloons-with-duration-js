import { fontDefinition } from "./balloonFont";
const BASE_SIZE = 324;
interface BalloonData {
  text: string;
  color: string;
  fontSize: number;
}

function createTextBalloon(data: BalloonData): HTMLElement {
  const balloon = document.createElement("text-balloon");

  // Create a temporary element to measure the text size
  const measureElement = document.createElement("span");
  // TODO: figure out line height that fits snugly around emojis without clipping them
  measureElement.style.cssText = `
    position: absolute;
    visibility: hidden;
    font-family: BalloonsJS, system-ui;
    font-weight: bold;
    font-size: ${data.fontSize}px;
    line-height: 1;
    vertical-align: sub;
    white-space: nowrap;
    min-width: 1ch;
  `;
  measureElement.textContent = data.text;
  document.body.appendChild(measureElement);

  // Measure the text size
  const textWidth = measureElement.offsetWidth;
  const textHeight = measureElement.offsetHeight;

  // Remove the temporary element
  document.body.removeChild(measureElement);

  // Calculate SVG size with padding
  const padding = 20; // Adjust this value as needed
  const svgWidth = textWidth + padding * 1;
  const svgHeight = textHeight + padding * 1;
  const scaleAdjustment = BASE_SIZE / data.fontSize;

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${
      svgWidth * scaleAdjustment
    }" height="${svgHeight * scaleAdjustment}">
      <defs>
     <filter id="balloon" color-interpolation-filters="sRGB">
    <feMorphology in="SourceGraphic" operator="dilate" radius="5" result="dilated" />

    <feGaussianBlur in="dilated" stdDeviation="8" result="dilated-blur" />

    <feSpecularLighting in="dilated-blur" surfaceScale="20" specularConstant="3.05" specularExponent="20" lighting-color="#ffffff" result="outline-highlight">
      <feDistantLight azimuth="-20" elevation="12" />
    </feSpecularLighting>

     <feComposite in2="dilated" in="outline-highlight" operator="atop" result="outline-with-light" />
    

    <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />

    <feSpecularLighting in="blur" surfaceScale="14" specularConstant="1" specularExponent="35" lighting-color="#ffffff" result="highlight">
      <fePointLight x="400" y="-120" z="500"/>
    </feSpecularLighting>

    <feComposite in2="SourceGraphic" in="highlight" operator="atop" result="with-light" />

    <feColorMatrix in="SourceAlpha" type="matrix" values="1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 100 0" result="black" />
    <feOffset in="black" dx="-12" dy="12" result="offset" />

    <feComposite in2="black" in="offset" operator="out" result="clipped" />
    <feGaussianBlur in="clipped" stdDeviation="12" result="clipped-blur" />
    <feOffset in="clipped-blur" dx="12" dy="-12" result="offset-shadow" />
    <feComposite in="offset-shadow" in2="with-light" operator="atop" result="swa" />

    <feComposite in="outline-with-light" in2="SourceGraphic" operator="out" result="outline"/>
    <feComposite in2="outline" in="swa" operator="over"  />

  </filter>
        <style type="text/css">
        ${fontDefinition}
        </style>
      </defs>
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="${
        data.color
      }" font-size="${BASE_SIZE}px" font-family="BalloonsJS, system-ui" font-weight="bold" filter="url(#balloon)">${
    data.text
  }</text>
    </svg>
  `;

  // Use encodeURIComponent instead of btoa
  const encodedSVG = encodeURIComponent(svgContent);

  Object.assign(balloon.style, {
    position: "absolute",
    top: "100%",
    opacity: "0",
    width: `${svgWidth}px`,
    height: `${svgHeight}px`,
    fontSize: data.fontSize,
    lineHeight: "1",
    display: "inline-block",
    // background: "black",
    minWidth: "1ch",
  });

  const balloonContent = document.createElement("balloon-content");
  Object.assign(balloonContent.style, {
    display: "block",

    position: "absolute",
    left: "50%",
    top: "50%",
    width: `${svgWidth * scaleAdjustment}px`,
    height: `${svgHeight * scaleAdjustment}px`,
    transform: `translate(-50%, -50%) scale(${1 / scaleAdjustment})`,
    transformOrigin: "center",

    backgroundImage: `url("data:image/svg+xml,${encodedSVG}")`,
    backgroundSize: "contain",
  });
  balloon.appendChild(balloonContent);

  return balloon;
}

function animateBalloon(
  balloon: HTMLElement,
  zPosition: number,
  delay: number
) {
  const duration = 10000 + Math.random() * 5000;
  const tiltYAmplitude = (Math.random() - 0.5) * 18; // Random tilt amplitude between -10 and 10 degrees
  const tiltZAmplitude = (Math.random() - 0.5) * 20; // Random tilt amplitude between -20 and 20 degrees
  const tiltFrequency = 1 + Math.random(); // Random frequency between 1 and 2
  const targetX = (Math.random() - 0.5) * 100; // Random target X position between -50 and 50

  const keyframes = new Array(101).fill(null).map((_, i) => {
    const progress = i / 100;
    const verticalProgress = -100 * progress;
    const horizontalProgress = targetX * progress;
    const tiltY =
      Math.sin(progress * Math.PI * 2 * tiltFrequency) * tiltYAmplitude;
    const tiltZ =
      Math.cos(progress * Math.PI * 2 * tiltFrequency) * tiltZAmplitude;

    return {
      transform: `translate3d(${horizontalProgress}px, calc(-1 * (100vh + 100%) * ${progress}), ${-zPosition}px) rotateY(${tiltY}deg) rotateZ(${tiltZ}deg)`,
      opacity: i === 0 ? 0 : 1,
    };
  });

  const animation = balloon.animate(keyframes, {
    duration,
    delay,
    easing: "linear",
    fill: "forwards",
  });

  animation.onfinish = () => balloon.remove();
}

export function textBalloons(balloons: BalloonData[]): void {
  const container = document.createElement("text-balloons");

  const textBalloonsStyle = document.createElement("style");
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
    fontFamily: `"BalloonsJS", system-ui`,
    fontWeight: "bold",
  });

  document.body.appendChild(container);

  const lineDelay = 3000; // Delay between lines in milliseconds
  const charDelay = 100; // Delay between characters in milliseconds
  const charSpacing = 0.2; // Additional spacing between characters in ch units
  const totalLines = balloons.length;
  const maxDepth = 1000; // Maximum Z depth

  balloons.forEach((line, lineIndex) => {
    // Using segmenter to support emojis
    const chars = Array.from(new Intl.Segmenter().segment(line.text)).map(
      (segment) => segment.segment
    );
    // const zPosition = ((totalLines - lineIndex + 1) / totalLines) * maxDepth;
    const zPosition = 0;

    const lineBalloons = chars.map((char) => {
      const balloon = createTextBalloon({
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
    const lineWidthPx = lineBalloons.reduce(
      (sum, balloon) => sum + balloon.offsetWidth,
      0
    );
    const containerWidth = container.offsetWidth;
    const lineWidthPercent = (lineWidthPx / containerWidth) * 100;

    const startX = Math.max(
      0,
      Math.min(100 - lineWidthPercent, 50 - lineWidthPercent / 2)
    );

    let currentX = startX;

    lineBalloons.forEach((balloon, charIndex) => {
      const charWidthPercent = (balloon.offsetWidth / containerWidth) * 100;

      balloon.style.left = `${currentX}%`;

      animateBalloon(
        balloon,
        zPosition,
        lineIndex * lineDelay + charIndex * charDelay
      );

      currentX += charWidthPercent + charSpacing;
    });
  });
}
