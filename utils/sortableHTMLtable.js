/*
A few requirements for configuring the table:
1. The table must have id="sortable", i.e. <table id="sortable">
2. The table needs to have a table header, and the table header must have
   onclick="sortBy(n)", where n is the column number starting with 0
   i.e. <th onclick="sortBy(0)">Title of First Column</th>
*/

import { gbi, qsa } from "./domUtils";
import { addArrowsToHeader, pointer } from "./utils";

let cPrev; // global var saves the previous c, used to
// determine if the same column is clicked again

function sortBy(c, id) {
  console.log(c);
  let rows = document.getElementById(id).rows.length; // num of rows
  let columns = document.getElementById(id).rows[0].cells.length; // num of columns
  let arrTable = [...Array(rows)].map((e) => Array(columns)); // create an empty 2d array

  for (let ro = 0; ro < rows; ro++) {
    // cycle through rows
    for (let co = 0; co < columns; co++) {
      // cycle through columns
      // assign the value in each row-column to a 2d array by row-column
      arrTable[ro][co] =
        document.getElementById(id).rows[ro].cells[co].innerHTML;
    }
  }

  let th = arrTable.shift(); // remove the header row from the array, and save it

  if (c !== cPrev) {
    // different column is clicked, so sort by the new column
    arrTable.sort(function (a, b) {
      if (a[c] === b[c]) {
        return 0;
      } else {
        return a[c] < b[c] ? -1 : 1;
      }
    });
  } else {
    // if the same column is clicked then reverse the array
    arrTable.reverse();
  }

  cPrev = c; // save in previous c

  arrTable.unshift(th); // put the header back in to the array

  // cycle through rows-columns placing values from the array back into the html table
  for (let ro = 0; ro < rows; ro++) {
    for (let co = 0; co < columns; co++) {
      document.getElementById(id).rows[ro].cells[co].innerHTML =
        arrTable[ro][co];
    }
  }
}

export const init_sortable = (id) => {
  cPrev = -1;
  let table = gbi(id);
  let headers = qsa("th");
  qsa(".sort-header", table).forEach((element) => {
    pointer(element);
    addArrowsToHeader(element);
    element.addEventListener("click", () => {
      sortBy(headers.indexOf(element), id);
    });
  });
};
