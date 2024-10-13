import { fontDefinition } from "./balloonFont";

interface BalloonData {
  text: string;
  color: string;
  fontSize: string;
}

function createTextBalloon(data: BalloonData): HTMLElement {
  const balloon = document.createElement("text-balloon");

  // Create a temporary element to measure the text size
  const measureElement = document.createElement("span");
  measureElement.style.cssText = `
    position: absolute;
    visibility: hidden;
    font-family: BalloonsJS, system-ui;
    font-weight: bold;
    font-size: ${data.fontSize};
    white-space: nowrap;
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
  const svgWidth = textWidth + padding * 2;
  const svgHeight = textHeight + padding * 2;

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
      <defs>
     <filter id="balloon" color-interpolation-filters="sRGB">
    <feMorphology in="SourceGraphic" operator="dilate" radius="3" result="dilated" />

    <feGaussianBlur in="dilated" stdDeviation="1" result="dilated-blur" />

    <feSpecularLighting in="dilated-blur" surfaceScale="10" specularConstant="3.05" specularExponent="20" lighting-color="#ffffff" result="outline-highlight">
      <feDistantLight azimuth="120" elevation="12" />
    </feSpecularLighting>

     <feComposite in2="dilated" in="outline-highlight" operator="atop" result="outline-with-light" />
    

    <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />

    <feSpecularLighting in="blur" surfaceScale="7" specularConstant="1" specularExponent="35" lighting-color="#ffffff" result="highlight">
      
      <fePointLight x="200" y="-60" z="250"/>
      

    </feSpecularLighting>

    <feComposite in2="SourceGraphic" in="highlight" operator="atop" result="with-light" />

    <feColorMatrix in="SourceAlpha" type="matrix" values="1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 100 0" result="black" />
    <feOffset in="black" dx="-6" dy="6" result="offset" />

    <feComposite in2="black" in="offset" operator="out" result="clipped" />
    <feGaussianBlur in="clipped" stdDeviation="6" result="clipped-blur" />
    <feOffset in="clipped-blur" dx="6" dy="-6" result="offset-shadow" />
    <feComposite in="offset-shadow" in2="with-light" operator="atop" result="swa" />

    <feComposite in="outline-with-light" in2="SourceGraphic" operator="out" result="outline"/>
    <feComposite in2="outline" in="swa" operator="over"  />

  </filter>
        <style type="text/css">
        ${fontDefinition}
        </style>
      </defs>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${data.color}" font-size="${data.fontSize}" font-family="BalloonsJS, system-ui" font-weight="bold" filter="url(#balloon)">${data.text}</text>
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
    backgroundImage: `url("data:image/svg+xml,${encodedSVG}")`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    fontSize: data.fontSize,
    lineHeight: "1",
    display: "inline-block",
    minWidth: "1ch",
    // ... (keep other relevant styles) ...
  });

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
