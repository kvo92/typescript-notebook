import { qs, qsa } from "./domUtils";

const tables = qsa(".sortable-table");
const sortableHeaders = qsa(".sortable");

const setHeaderStyles = () => {
  if (!sortableHeaders.length) return;
  sortableHeaders.forEach((header) => {
    header.style.cursor = "pointer";
    let text = header.textContent;
    header.innerHTML = `${text} <i class="fa-solid fa-arrow-up-arrow-down"></i>`;
  });
};

const handleTableSetupEventListeners = (array) => {
  array.forEach((table) => {
    let tableHeaders = qsa("th", table);
    // table.getElementsByTagName("TD");
    tableHeaders.forEach((header, index) => {
      header.addEventListener(
        "click",
        sortTable.bind(null, table, index, header)
      );
    });
  });
};

export function sortTable(table, index, tableHeader) {
  var rows, switching, i, x, y, shouldSwitch;
  switching = true;
  let state = tableHeader.getAttribute("sort");
  rows = [...table.rows].filter((row) => {
    return !row.classList.contains("hidden");
  });
  stateToggle(state, tableHeader);
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < rows.length - 1; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[index];
      y = rows[i + 1].getElementsByTagName("TD")[index];
      var x_value = x.getAttribute("value");
      var y_value = y.getAttribute("value");

      //check if the two rows should switch place:
      if (state == "asc") {
        if (x_value > y_value) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if ((state = "dsc")) {
        if (x_value < y_value) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      swapArrayElements(rows, i, i + 1);
      switching = true;
    }
  }
}

var swapArrayElements = function (arr, indexA, indexB) {
  var temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};

const stateToggle = (state, tableHeader) => {
  if (!state) {
    tableHeader.setAttribute("sort", "asc");
  } else if (state == "asc") {
    tableHeader.setAttribute("sort", "dsc");
  } else if (state == "dsc") {
    tableHeader.setAttribute("sort", "asc");
  }
};
const setUpEventListeners = () => {
  handleTableSetupEventListeners(tables);
};

const init = () => {
  setUpEventListeners();
  setHeaderStyles();
};
init();
