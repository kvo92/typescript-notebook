class UIValue {
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

class VarInjection {
  pointsOfInjection: any[] = [];
  variable: UIValue;
  constructor(variable: UIValue, selector: any) {
    this.variable = variable;
    this.pointsOfInjection = Array.from(
      document.querySelectorAll(`[data-${selector}]`)
    );
    if (this.pointsOfInjection.length > 0) {
      this.pointsOfInjection.forEach((el) => {
        variable.subscribeEl(el);
      });
    }
  }
}
