NVApp = {
  codeBlocks: [],
  run: function () {
    this.codeBlocks.forEach(function (code) {
      code.bind(this);
      code();
    })
  }
};

var Bootstrapper = function () {
  var ObserverSubject = function () {
    var self = this;
    this.observers = [];

    return {
      subscribe: function (observer) {
        self.observers.push(observer);
      },
      unsubscribe: function (observer) {
        var index = self.observers.indexOf(observer);
        if (index > -1) self.observers.splice(index, 1);

      },
      notify: function (observer, event, args) {
        var index = self.observers.indexOf(observer);
        if (index > -1) observer.notify(event, args);
      },
      notifyAll: function () {
        for (var i = 0; i < self.observers.length; i++) {
          self.observers[i].notify(i);
        }
        ;
      }
    };
  };

  var Observer = function (callback) {
    return {
      notify: function (event, args) {
        callback(event, args);
      }
    }
  };

  var appObservers = {};
  var subject = new ObserverSubject();

  var onEvent = function (event, callback) {
    appObservers[event] = new Observer(callback);
    subject.subscribe(appObservers[event]);
    return this;
  };

  var emitEvent = function (event, args) {
    subject.notify(appObservers[event], event, args);
  };

  var unsubscribeEvent = function (event, callback) {
    subject.unsubscribe(appObservers[event]);
    delete appObservers[event];
    if (typeof callback !== undefined)
      callback(event);

  };

  return function (func) {
    this.on = onEvent;
    this.emit = emitEvent;
    this.unsubscribe = unsubscribeEvent;
    NVApp.codeBlocks.push(func);
  }
};

NV = new Bootstrapper();


