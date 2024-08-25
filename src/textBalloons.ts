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
    fontSize: data.fontSize,
    lineHeight: "1cap",
    width: "1cap",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
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

  balloons.forEach((line, lineIndex) => {
    setTimeout(() => {
      const chars = line.text.split("");
      const lineWidth = chars.length * 1.2; // Approximate width in ch units
      const startX = Math.max(0, Math.min(100 - lineWidth, 50 - lineWidth / 2));

      chars.forEach((char, charIndex) => {
        setTimeout(() => {
          const x = startX + charIndex * 1.2; // 1.2ch spacing between characters
          const balloon = createTextBalloon({
            text: char,
            color: line.color,
            fontSize: line.fontSize,
          });
          balloon.style.left = `${x}%`;
          container.appendChild(balloon);
          animateBalloon(balloon);
        }, charIndex * charDelay);
      });
    }, lineIndex * lineDelay);
  });
}
