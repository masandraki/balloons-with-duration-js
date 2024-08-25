import { balloons, textBalloons } from "../src/index";

document.addEventListener("DOMContentLoaded", () => {
  //   balloons();
  textBalloons([
    {
      text: "Hello",
      color: "#FF0000",
      fontSize: "122px",
    },
  ]);
  const button = document.getElementById("releastBalloonsButton");

  button?.addEventListener("click", () => {
    // balloons();
  });
});
