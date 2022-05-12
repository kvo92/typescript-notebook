export function ssGet(name) {
  return sessionStorage.getItem(name);
}

export function ssSet(name, value) {
  return sessionStorage.setItem(name, value);
}
