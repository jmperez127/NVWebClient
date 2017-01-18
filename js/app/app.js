NVApp = {
  codeBlocks: [],
  run: function () {
    this.codeBlocks.forEach(function (code) {
      code.bind(this);
      code();
    })
  }
};

var BootstrapApp = function () {
  observer = new ObserverSubscribtionManager();

  return function (func) {
    this.on = observer.onEvent;
    this.emit = observer.emitEvent;
    this.unsubscribe = observer.unsubscribeEvent;
    NVApp.codeBlocks.push(func);
  };

  // Event subscriber / observer implementation
  function ObserverSubscribtionManager() {
    var Subject = function () {
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
          }
        };
      },
      Observer = function (callback) {
        return {
          notify: function (event, args) {
            callback(event, args);
          }
        }
      },
      appObservers = {},
      subject = new Subject();

    this.onEvent = function (event, callback) {
      appObservers[event] = new Observer(callback);
      subject.subscribe(appObservers[event]);
      return this;
    };

    this.emitEvent = function (event, args) {
      subject.notify(appObservers[event], event, args);
    };

    this.unsubscribeEvent = function (event, callback) {
      subject.unsubscribe(appObservers[event]);
      delete appObservers[event];
      if (typeof callback !== undefined)
        callback(event);
    };
  }
};

NV = new BootstrapApp();


