interface BalloonData {
  text: string;
  color: string;
}

function createTextBalloon(data: BalloonData): HTMLElement {
  const balloon = document.createElement("text-balloon");
  balloon.textContent = data.text;

  Object.assign(balloon.style, {
    position: "absolute",
    backgroundColor: data.color,
    padding: "10px",
    borderRadius: "15px",
    color: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    left: `${Math.random() * 80}%`,
    top: `${Math.random() * 80}%`,
    opacity: "0",
    transition: "opacity 0.5s ease-in-out",
    fontSize: "122px",
    lineHeight: "1cap",
    width: "1ch",
    overflow: "hidden",
    textAlign: "center",
  });

  return balloon;
}

function textBalloons(balloons: BalloonData[]): void {
  const container = document.createElement("text-balloons");

  Object.assign(container.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "9999",
  });

  document.body.appendChild(container);

  balloons.forEach((balloonData) => {
    const balloon = createTextBalloon(balloonData);
    container.appendChild(balloon);

    // Trigger reflow to ensure the transition works
    balloon.offsetHeight;
    balloon.style.opacity = "1";
  });
}
