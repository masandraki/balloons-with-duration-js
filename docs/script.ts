import { balloons } from "../src/index";
import { textBalloons } from "../src/textBalloons";
document.addEventListener("DOMContentLoaded", () => {
  balloons();
  const button = document.getElementById("releaseBalloonsButton");

  button?.addEventListener("click", () => {
    balloons();
  });

  const textButton = document.getElementById("releaseTextBalloonsButton");

  function releaseTextBalloons() {
    const colors = [
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
    const firstColorIndex = Math.floor(Math.random() * colors.length);
    // Pick second color by selecting from remaining colors
    const remainingColors = colors.filter(
      (_, index) => index !== firstColorIndex
    );
    const secondColorIndex = Math.floor(Math.random() * remainingColors.length);

    textBalloons([
      {
        color: colors[firstColorIndex],
        fontSize: Math.min(window.innerWidth / 5, 160), // Scale linearly with screen width up to 90px
        text: `HAPPY`,
      },
      {
        color: remainingColors[secondColorIndex],
        fontSize: Math.min(window.innerWidth / 4, 160), // Scale linearly with screen width up to 120px
        text: `BDAY`,
      },
      {
        text: "💩🔥😈",
        fontSize: Math.min(window.innerWidth / 4, 160), // Scale linearly with screen width up to 120px
        color: "#000000",
      },
    ]);
  }
  textButton?.addEventListener("click", releaseTextBalloons);
});
