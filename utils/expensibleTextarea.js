import { qsa } from "./domUtils";

const growers = qsa(".grow-wrap");

export const expansibleTextAreaInit = () => {
  if (growers.length < 1) return;
  growers.forEach((grower) => {
    const textarea = grower.querySelector("textarea");
    textarea.addEventListener("input", () => {
      grower.dataset.replicatedValue = textarea.value;
    });
  });
};
