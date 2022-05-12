import { qs, qsa } from "./domUtils";

const containers = qsa(".modal-container");

const setEventListener = (modalOpenButtons, modalCloseButtons, modal) => {
  modalOpenButtons.forEach((modalOpenButton) => {
    modalOpenButton.addEventListener("click", () => {
      modal.showModal();
    });
  });

  modalCloseButtons.forEach((modalCloseButton) => {
    modalCloseButton.addEventListener("click", () => {
      modal.close();
    });
  });
};

export const modalInit = () => {
  containers.forEach((container) => {
    const modal = qs(".modal", container);
    const modalOpenButtons = qsa(".open-button", container);
    const modalCloseButtons = qsa(".close-button", container);
    setEventListener(modalOpenButtons, modalCloseButtons, modal);
  });
};
