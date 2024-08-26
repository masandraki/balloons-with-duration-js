interface BalloonData {
  text: string;
  color: string;
  fontSize: string;
}

function createTextBalloon(data: BalloonData): HTMLElement {
  const balloon = document.createElement("text-balloon");
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
      transform: `translate3d(${horizontalProgress}px, ${verticalProgress}vh, ${-zPosition}px) rotateY(${tiltY}deg) rotateZ(${tiltZ}deg)`,
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
  const textBalloonsFilter = document.createElement("text-balloons-filter");
  textBalloonsFilter.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">

  <filter id="balloon" color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />

    <feSpecularLighting in="blur" surfaceScale="42" specularConstant="0.95" specularExponent="60" lighting-color="#ffffff" result="highlight">
      <feDistantLight azimuth="300" elevation="22" />
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

  </filter>
</svg>
`;
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
