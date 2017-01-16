NVApp = {
  code: [],
  run: function () {

    this.code.forEach(function (c) {
      c();
    })
  }
};

NV = function (func) {
  NVApp.code.push(func);
};
