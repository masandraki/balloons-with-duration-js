import { balloons, textBalloons } from "../src/index";

document.addEventListener("DOMContentLoaded", () => {
  //   balloons();
  textBalloons([
    {
      text: "BALLOONS",
      color: "rgba(255, 0, 0, 0.85)",
      fontSize: "162px",
    },
    {
      text: "ARE NOW",
      color: "rgba(40, 40, 255, 0.85)",
      fontSize: "162px",
    },
    // {
    //   text: "LIVE !! $#",
    //   color: "rgba(0, 200, 0, 0.85)",
    //   fontSize: "162px",
    // },
    // {
    //   text: "function() {}",
    //   color: "rgba(240, 220, 0, 0.85)",
    //   fontSize: "162px",
    // },
  ]);
  const button = document.getElementById("releastBalloonsButton");

  button?.addEventListener("click", () => {
    textBalloons([
      {
        text: "🏝️💩🤡🤩",
        color: "rgba(255, 0, 0, 0.85)",
        fontSize: "162px",
      },
      {
        text: "ARE NOW",
        color: "rgba(40, 40, 255, 0.85)",
        fontSize: "162px",
      },
      // {
      //   text: "LIVE !! $#",
      //   color: "rgba(0, 200, 0, 0.85)",
      //   fontSize: "162px",
      // },
      // {
      //   text: "function() {}",
      //   color: "rgba(240, 220, 0, 0.85)",
      //   fontSize: "162px",
      // },
    ]);
  });
});
