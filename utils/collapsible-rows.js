import { qsa } from "packs/utils/domUtils";
import { pointer, toggleHidden } from "packs/utils/utils";
export const collapseChildrenRows = () => {
  qsa("tr[data-id]").forEach((element) => {
    let parentID = element.dataset.id;
    pointer(element);
    element.addEventListener("click", () => {
      qsa(`tr[data-parent='${parentID}']`).forEach((el) => {
        toggleHidden(el);
      });
    });
  });
};
