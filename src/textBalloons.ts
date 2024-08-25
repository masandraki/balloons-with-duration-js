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
    bottom: "0",
    opacity: "0",
    transition: "opacity 0.5s ease-in-out, transform 1s ease-out",
    fontSize: data.fontSize,
    lineHeight: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    textAlign: "center",
    transform: "translateY(0)",
  });

  return balloon;
}

function animateBalloon(balloon: HTMLElement) {
  const duration = 10000 + Math.random() * 5000;
  const keyframes = [
    { transform: "translate(0, 0)", opacity: 0 },
    { opacity: 1, offset: 0.1 },
    {
      transform: `translate(${(Math.random() - 0.5) * 50}px, -100vh)`,
      opacity: 0,
    },
  ];

  const animation = balloon.animate(keyframes, {
    duration,
    easing: "ease-in-out",
    fill: "forwards",
  });

  animation.onfinish = () => balloon.remove();
}

export function textBalloons(balloons: BalloonData[]): void {
  const container = document.createElement("text-balloons");

  Object.assign(container.style, {
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "9999",
  });

  document.body.appendChild(container);

  const lineDelay = 1000; // Delay between lines in milliseconds
  const charDelay = 100; // Delay between characters in milliseconds
  const charSpacing = 0.2; // Additional spacing between characters in ch units

  balloons.forEach((line, lineIndex) => {
    setTimeout(() => {
      const chars = line.text.split("");

      // Create all balloons for the line and add them to the container
      const lineBalloons = chars.map((char) => {
        const balloon = createTextBalloon({
          text: char,
          color: line.color,
          fontSize: line.fontSize,
        });
        balloon.style.opacity = "0"; // Hide the balloon initially
        container.appendChild(balloon);
        return balloon;
      });

      // Force a reflow to ensure offsetWidth is calculated
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
        setTimeout(() => {
          const charWidthPercent = (balloon.offsetWidth / containerWidth) * 100;

          balloon.style.left = `${currentX}%`;
          animateBalloon(balloon);

          currentX += charWidthPercent + charSpacing;
        }, charIndex * charDelay);
      });
    }, lineIndex * lineDelay);
  });
}
