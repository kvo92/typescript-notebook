import { gbi } from "./domUtils";

var oDoc, sDefTxt;
var mode;
function formatDoc(sCmd, sValue) {
  if (validateMode()) {
    document.execCommand(sCmd, false, sValue);
    oDoc.focus();
  }
}
function initDoc() {
  oDoc = document.getElementById("textBox");
  sDefTxt = oDoc.innerHTML;
  if (document.compForm.switchMode.checked) {
    setDocMode(true);
  }
}

function validateMode() {
  if (!document.compForm.switchMode.checked) {
    return true;
  }
  alert('Uncheck "Show HTML".');
  oDoc.focus();
  return false;
}

function setDocMode(bToSource) {
  var oContent;
  if (bToSource) {
    oContent = document.createTextNode(oDoc.innerHTML);
    oDoc.innerHTML = "";
    var oPre = document.createElement("pre");
    oDoc.contentEditable = false;
    oPre.id = "sourceText";
    oPre.contentEditable = true;
    oPre.appendChild(oContent);
    oDoc.appendChild(oPre);
    document.execCommand("defaultParagraphSeparator", false, "div");
  } else {
    if (document.all) {
      oDoc.innerHTML = oDoc.innerText;
    } else {
      oContent = document.createRange();
      oContent.selectNodeContents(oDoc.firstChild);
      oDoc.innerHTML = oContent.toString();
    }
    oDoc.contentEditable = true;
  }
  oDoc.focus();
}

function printDoc() {
  if (!validateMode()) {
    return;
  }
  var oPrintWin = window.open(
    "",
    "_blank",
    "width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes"
  );
  oPrintWin.document.open();
  oPrintWin.document.write(
    '<!doctype html><html><head><title>Print</title></head><body onload="print();">' +
      oDoc.innerHTML +
      "</body></html>"
  );
  oPrintWin.document.close();
}

const setEventListeners = () => {
  const cleanBtn = gbi("clean-btn");
  const printBtn = gbi("print-btn");
  const undoBtn = gbi("undo-btn");
  const redoBtn = gbi("redo-btn");
  const rmvfrmtBtn = gbi("rmvfrmt-btn");
  const boldBtn = gbi("bold-btn");
  const italicBtn = gbi("italic-btn");
  const underlineBtn = gbi("underline-btn");
  const justifyleftBtn = gbi("justifyleft-btn");
  const justifycenterBtn = gbi("justifycenter-btn");
  const justifyrightBtn = gbi("justifyright-btn");
  const insertorderedlistBtn = gbi("insertorderedlist-btn");
  const insertunorderedlistBtn = gbi("insertunorderedlist-btn");
  const blockquoteBtn = gbi("blockquote-btn");
  const outdentBtn = gbi("outdent-btn");
  const indentBtn = gbi("indent-btn");
  const hyperlinkBtn = gbi("hyperlink-btn");
  const switchBox = gbi("switchBox");
  cleanBtn.addEventListener("click", () => {
    if (validateMode() && confirm("Are you sure?")) {
      oDoc.innerHTML = sDefTxt;
    }
  });
  printBtn.addEventListener("click", printDoc);
  undoBtn.addEventListener("click", () => {
    formatDoc("undo");
  });
  redoBtn.addEventListener("click", () => {
    formatDoc("redo");
  });
  rmvfrmtBtn.addEventListener("click", () => {
    formatDoc("removeFormat");
  });
  boldBtn.addEventListener("click", () => {
    formatDoc("bold");
  });
  italicBtn.addEventListener("click", () => {
    formatDoc("italic");
  });
  underlineBtn.addEventListener("click", () => {
    formatDoc("underline");
  });
  justifyleftBtn.addEventListener("click", () => {
    formatDoc("justifyleft");
  });
  justifycenterBtn.addEventListener("click", () => {
    formatDoc("justifycenter");
  });
  justifyrightBtn.addEventListener("click", () => {
    formatDoc("justifyright");
  });

  insertorderedlistBtn.addEventListener("click", () => {
    formatDoc("insertorderedlist");
  });
  insertunorderedlistBtn.addEventListener("click", () => {
    formatDoc("insertunorderedlist");
  });
  blockquoteBtn.addEventListener("click", () => {
    formatDoc("formatblock", "blockquote");
  });
  outdentBtn.addEventListener("click", () => {
    formatDoc("outdent");
  });
  indentBtn.addEventListener("click", () => {
    formatDoc("indent");
  });
  hyperlinkBtn.addEventListener("click", () => {
    var sLnk = prompt("Write the URL here", "http://");
    if (sLnk && sLnk != "" && sLnk != "http://") {
      formatDoc("createlink", sLnk);
    }
  });
  switchBox.addEventListener("change", () => {
    setDocMode(switchBox.checked);
  });
};

export const editor_init = () => {
  initDoc();
  setEventListeners();
};
