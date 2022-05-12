export const macroCheckbox = (allCB, checkboxArr) => {
  allCB.addEventListener("change", (e) => {
    let status = e.target.checked;
    boxChecker(checkboxArr, status);
  });
  checkboxArr.forEach((element) => {
    element.addEventListener("change", () => {
      allCB.checked = allBoxesStatus(checkboxArr);
    });
  });
};

const allBoxesStatus = (checkboxArr) => {
  return checkboxArr.every((checkbox) => checkbox.checked == true);
};

const boxChecker = (checkboxArr, bool) => {
  checkboxArr.forEach((element) => {
    element.checked = bool;
  });
};
