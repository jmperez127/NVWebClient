NVApp = {
  codeBlocks: [],
  run: function () {
    this.codeBlocks.forEach(function (code) {
      code.bind(this);
      code();
    })
  }
};

NV = function (func) {
  NVApp.codeBlocks.push(func);
};
