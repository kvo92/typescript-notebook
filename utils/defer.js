export var defer = (function () {
     var fnMap = new Map(), idMap = new Map(), fnId = 0;
     var msg = { fnId: 0 };
     function _postpone(fn) {
          if (!fnMap[fn]) {
                            fnId++;
                            fnMap[fn] = fnId;
                            idMap[fnId] = fn;
                          }
           msg.fnId = fnMap[fn];
           postMessage(msg, '*');
     }
 function _postponeListener(e) {
     var fnId = e.data.fnId;
     if (fnId) idMap[fnId]();
 }
 window.addEventListener("message", _postponeListener);
 return _postpone;
}());