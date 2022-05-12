import axios from "axios";
import { gbi, qsa, qs } from "./domUtils";
let cache = {};
export const hide = (element) => {
  element.classList.add("hidden");
  element.classList.remove("fade-in");
};

export const show = (element) => {
  element.classList.remove("hidden");
  element.classList.add("fade-in");
};
export const removeHighlight = (element) => {
  element.classList.remove("highlight");
};
export const addHighlight = (element) => {
  element.classList.add("highlight");
};
export const toggleHidden = (element) => {
  element.classList.toggle("hidden");
};
export const toggleFadein = (element) => {
  element.classList.toggle("fade-in");
};
export const toggleHighlight = (element) => {
  element.classList.toggle("table-item-highlight");
};

export const validateInput = (id) => {
  const ele = gbi(id);
  if (ele.value) {
    return true;
  } else return false;
};
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const handleEmailInput = (e) => {
  var currentEl = e.target;

  var valid = currentEl.value?.split(",").every((email) => {
    if (validateEmail(email.trim())) return true;
    else return false;
  });
  var label = currentEl.previousElementSibling;
  if (valid) {
    currentEl.style.setProperty("border", "2px solid green", "important");
    if (label && label.tagName.toLowerCase() == "label") {
      label.classList.add("passed");
    }
  } else {
    currentEl.style.setProperty("border", "2px solid red", "important");
    if (label && label.tagName.toLowerCase() == "label") {
      label.classList.remove("passed");
    }
  }
};

export const showErrorNotice = (fieldName, modalNotice) => {
  modalNotice.innerHTML += `<p>Must have ${fieldName}!</p>`;
  show(modalNotice);
};
export const removeClassFromSiblings = (el, className) => {
  getSiblings(el).forEach((siblingEl) => {
    siblingEl.classList.remove(className);
  });
};

export let getSiblings = function (e) {
  // for collecting siblings
  let siblings = [];
  // if no parent, return no sibling
  if (!e.parentNode) {
    return siblings;
  }
  // first child of the parent node
  let sibling = e.parentNode.firstChild;

  // collecting siblings
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

export let getLabelSibling = (el) => {
  let arr = getSiblings(el);
  let label;
  arr.forEach((item) => {
    if (item.tagName == "LABEL") {
      label = item;
    }
  });
  return label;
};
export let getAnchorSibling = (el) => {
  let arr = getSiblings(el);
  let anchor;
  arr.forEach((item) => {
    if (item.tagName == "A") {
      anchor = item;
    }
  });
  return anchor;
};

export const toArray = (el) => {
  return Array.from(el);
};

export function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export function memoize(cb) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);

    const result = cb(...args);
    cache.set(key, result);
    return result;
  };
}

export function getStyle(element, name) {
  return element.currentStyle
    ? element.currentStyle[name]
    : window.getComputedStyle
    ? window.getComputedStyle(element, null).getPropertyValue(name)
    : null;
}

export const currentURL = () => {
  return window.location.origin;
};

export const doubleClick = (element) => {
  var event = new MouseEvent("dblclick", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  element.dispatchEvent(event);
};

const getData = (route) => {
  return axios.get(route);
};

// !PROMISE to get json from a route
export function getJSON(route) {
  return new Promise((resolve, reject) => {
    const successCB = ({ data }) => {
      resolve(data);
    };
    const errorCB = () => {
      reject((msg) => FAILDATAMSG);
    };
    getData(route).then(successCB).catch(errorCB);
  });
}

export const setSelectDropdown = () => {
  qsa(".select select").forEach((selectEl) => {
    let val = selectEl.dataset.value;
    if (val) {
      selectEl.value = val;
    }
  });
};

export const i_to_s = (int) => {
  return parseInt(int, 10);
};
export const setNotice = (notice, msg) => {
  if (!notice) return;
  show(notice);
  notice.textContent = msg;
};

export const dependentFields = (selector, selectors) => {
  const checkbox = qs(selector);
  let dependents = [];
  selectors.forEach((selector) => {
    const dependentField = qs(selector);
    const label = getLabelSibling(dependentField);
    const anchor = getAnchorSibling(dependentField);
    dependents.push(dependentField);
    dependents.push(label);
    if (anchor) {
      dependents.push(anchor);
      hide(anchor);
    }
    hide(dependentField);
    hide(label);
  });
  handleDependableListener(checkbox, dependents);
};
export const handleDependableListener = (checkbox, dependents) => {
  if (checkbox.checked) {
    dependents.forEach((el) => {
      show(el);
    });
  }
  checkbox.addEventListener("change", () => {
    dependents.forEach((el) => {
      toggleHidden(el);
      toggleFadein(el);
      if (!checkbox.checked) {
        cache[el] = el.value;
        el.value = "";
      } else {
        if (cache[el]) el.value = cache[el];
      }
    });
  });
};
// /**
//  * @param {Node} form - form being submitted
//  * @param {String} textarea - CSS selector of textarea to be updated
//  */
export const updateTextArea = (editor, textarea) => {
  textarea.value = editor.innerHTML;
};
export const updatePreview = (editor, preview) => {
  preview.innerHTML = editor.innerHTML;
};
export const replaceUnderscoreWSpace = (str) => {
  return str.replace(/_/g, " ");
};

export const intersect = (arr1, arr2) => {
  return (arr1 = arr2.filter((element) => arr1.includes(element)));
};

export const processCommasForCSV = (val) => {
  if (val == null) {
    return "";
  }
  if (typeof val != "string") {
    return val;
  }

  if (val.includes(",")) {
    return '"' + val + '"';
  } else {
    return val;
  }
};

export const setTimeToZero = (date) => {
  return date.setHours(0, 0, 0, 0);
};

// check if to_date is bigger than from_date
export const checkRange = (fromInputEl, toInputEl) => {
  let from = fromInputEl.value;
  let to = toInputEl.value;
  if (!from || !to) return true;
  if (new Date(from) > new Date(to)) {
    return false;
  } else {
    return true;
  }
};
export const setupClearBtns = () => {
  qsa(".custom-clear-flatpicker").forEach((parentEl) => {
    let input = qs(".datepicker", parentEl);
    if (!input) {
      input = qs(".timepicker", parentEl);
    }
    // console.log(input);
    qs(".clear-button", parentEl).addEventListener("click", () => {
      input._flatpickr.clear();
    });
  });
};

export const enableRailsJS = () => {
  require("@rails/ujs").start();
};

export const pointer = (el) => {
  el.style.cursor = "pointer";
};

export const addArrowsToHeader = (header) => {
  let text = header.textContent;
  header.innerHTML = `${text} <i class="fa-solid fa-arrow-up-arrow-down"></i>`;
};

export const event = (el, type, fn) => {
  el.addEventListener(type, () => {
    fn();
  });
};

export const loopHash = (hash, fn) => {
  Object.keys(hash).forEach(function (key) {
    var value = hash[key];
    fn(key, value);
  });
};
