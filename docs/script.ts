import { balloons, textBalloons } from "../src/index";

document.addEventListener("DOMContentLoaded", () => {
  balloons();
  // const screenWidth = Math.min(window.innerWidth, 600);
  // const scaleFactor = screenWidth / 390;

  // textBalloons([
  //   {
  //     text: "27%",
  //     color: "rgba(255, 0, 0, 0.95)",
  //     fontSize: 130 * scaleFactor,
  //   },
  //   {
  //     text: "💸 🤑 💲 💰 💵",

  //     //   color: "rgba(40, 40, 255, 0.95)",
  //     // color: "rgba(240, 220, 0, 0.95)",
  //     color: "black",
  //     fontSize: 110 * scaleFactor,
  //   },
  //   {
  //     text: "ART",
  //     color: "rgba(40, 40, 255, 0.90)",
  //     fontSize: 122 * scaleFactor,
  //   },
  //   {
  //     text: "🤙🐻",
  //     color: "black",
  //     fontSize: 122 * scaleFactor,
  //   },
  // ]);
  const button = document.getElementById("releastBalloonsButton");

  button?.addEventListener("click", () => {
    balloons();
    // const screenWidth = Math.min(window.innerWidth, 600);
    // const scaleFactor = screenWidth / 390;

    // textBalloons([
    //   {
    //     text: "TEXT",
    //     color: "rgba(40, 40, 255, 0.85)",
    //     fontSize: 112 * scaleFactor,
    //   },
    //   {
    //     text: "WORKS",
    //     color: "rgba(0, 200, 0, 0.85)",
    //     fontSize: 82 * scaleFactor,
    //   },
    //   {
    //     text: "TOO",
    //     color: "rgba(240, 220, 0, 0.95)",
    //     fontSize: 112 * scaleFactor,
    //   },
    // ]);
  });
});
