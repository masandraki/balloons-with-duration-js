import { balloons, textBalloons } from "../src/index";

document.addEventListener("DOMContentLoaded", () => {
  //   balloons();
  textBalloons([
    {
      text: "BALLOONS",
      color: "rgba(255, 0, 0, 0.95)",
      fontSize: 162,
    },
    {
      text: "ARE JUST",
      //   color: "rgba(40, 40, 255, 0.95)",
      color: "rgba(240, 220, 0, 0.95)",
      fontSize: 162,
    },
    {
      text: "SO CUTE",
      color: "rgba(0, 200, 0, 0.95)",
      fontSize: 162,
    },
    {
      text: "👻 💩 🤙",
      color: "black",
      fontSize: 182,
    },
    // {
    //   text: "function() {}",
    //   color: "rgba(240, 220, 0, 0.95)",
    //   fontSize: 162
    // },
  ]);
  const button = document.getElementById("releastBalloonsButton");

  button?.addEventListener("click", () => {
    textBalloons([
      {
        text: "🏝️💩🤡🤩",
        color: "rgba(255, 0, 0, 1)",
        fontSize: 162,
      },
      {
        text: "ARE NOW",
        color: "rgba(40, 40, 255, 0.85)",
        fontSize: 162,
      },
      {
        text: "LIVE !! $#",
        color: "rgba(0, 200, 0, 0.85)",
        fontSize: 162,
      },
      {
        text: "function() {}",
        color: "rgba(240, 220, 0, 0.85)",
        fontSize: 162,
      },
    ]);
  });
});
