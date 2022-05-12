/* reusable fuctions that may occur / imported throughout the app */

// left nav toggle menu && button
const menuToggle = document.getElementById("menuToggle");

const handleClick = () => {
  document.getElementById("adminMenu").classList.toggle("-translate-x-56");
};

const setupMenuEventListeners = () => {
  if (!menuToggle) return;

  menuToggle.addEventListener("click", handleClick);
};
setupMenuEventListeners();
