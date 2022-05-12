import { constants } from "../constants";
import { createElement, qs, qsa } from "./domUtils";
import { hide, show, toggleHidden, toggleHighlight } from "./utils";
// give the table that need to collapse ".collapsible-table" class
const collapsibleTable = qs(".collapsible-table");
// give a div that would store buttons to toggle the column ".collapsible-button-container" class
const buttonContainer = qs(".collapsible-button-container");
// and give any th element you want to collapse the "collapsed" class
const headers = qsa("th", collapsibleTable);
const rows = qsa("tr", collapsibleTable);
const HIGHTLIGHTCLASS = "table-item-highlight";
var columns = [];

const findCollapsedColumns = () => {
  for (var i = 0; i < headers.length; i++) {
    if (headers[i].classList.contains("collapsed")) {
      var id = i;
      columns.push(i);
    }
  }
};

const hideColumns = () => {
  if (columns.length < 1) return;
  columns.forEach((index) => {
    hideColumn(index);
  });
};

const toggleColumns = () => {
  if (columns.length < 1) return;
  columns.forEach((index) => {
    toggleColumn(index);
  });
};

const hideColumn = (index) => {
  rows.forEach((row) => {
    hide(row.children[index]);
  });
};

const toggleColumn = (index) => {
  rows.forEach((row) => {
    toggleHidden(row.children[index]);
    toggleHighlight(row.children[index]);
  });
};

const populateButtons = () => {
  if (columns.length < 1) return;
  var allButton = createElement("button", {
    class: constants.COLLAPSIBLE_BTNS_CLASSES,
  });
  allButton.textContent = "All";
  allButton.addEventListener("click", toggleColumns);
  buttonContainer.appendChild(allButton);
  columns.forEach((index) => {
    var button = createElement("button", {
      class: constants.COLLAPSIBLE_BTNS_CLASSES,
    });
    button.textContent = headers[index].textContent;
    button.addEventListener("click", toggleColumn.bind(null, index));
    buttonContainer.appendChild(button);
  });
};

//call this function to initiate
export const init_collapsible_table = () => {
  findCollapsedColumns();
  hideColumns();
  populateButtons();
};
