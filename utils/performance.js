export function timeTest(func, ...args) {
  console.log("Performance test for " + func.name);
  console.time("time");
  let result = func(...args);
  console.timeEnd("time");
  return result;
}
