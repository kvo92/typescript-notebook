import { gbi } from "../utils/domUtils";
import { event } from "../utils/utils";

export class UIVariable {
  fnObservers: any[] = [];
  elObservers: any[] = [];
  value: any;

  constructor(value: any) {
    this.value = value;
  }
  get Value() {
    return this.value;
  }
  set Value(value: any) {
    this.value = value;
    this.fire();
  }

  subscribeFn(fn: any) {
    if (this.fnObservers.includes(fn)) {
      return;
    }
    this.fnObservers.push(fn);
  }
  unsubscribeFn(fnToRemove: any) {
    this.fnObservers = this.fnObservers.filter((fn) => {
      if (fn != fnToRemove) return fn;
    });
  }
  subscribeEl(el: any) {
    if (this.elObservers.includes(el)) {
      return;
    }
    this.elObservers.push(el);
  }
  unsubscribeEl(elToRemove: any) {
    this.fnObservers = this.fnObservers.filter((el) => {
      if (el != elToRemove) return el;
    });
  }
  fire() {
    this.fnObservers.forEach((fn) => {
      fn.call();
    });
    this.elObservers.forEach((el) => {
      el.innerHTML = this.value;
    });
  } //array of observer functions
}

export class VarInjector {
  inject(variable: UIVariable, selector: any) {
    variable = variable;
    let pointsOfInjection = Array.from(
      document.querySelectorAll(`[data-${selector}]`)
    );
    if (pointsOfInjection.length > 0) {
      pointsOfInjection.forEach((el) => {
        variable.subscribeEl(el);

        variable.fire();
      });
    }
  }
  bulkInject(data: any) {
    loopKeyValueArray(data, this.inject);
  }
}

const loopKeyValueArray = (array: any, fn: any) => {
  array.forEach((childArray: any) => {
    let key = childArray[0];
    let val = childArray[1];
    fn(key, val);
  });
};

const test = () => {
  let injector = new VarInjector();

  let val = { count: new UIVariable(0), diffCount: new UIVariable(0) };

  injector.bulkInject([
    [val.count, "count"],
    [val.diffCount, "diffCount"],
  ]);

  event(gbi("test-btn"), "click", () => {
    val.count.Value++;
    val.diffCount.Value += 2;
  });
};
