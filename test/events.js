var assert = require('assert');
var app = require('../js/app/app');

NV(function () {
  var app = this;

  describe('Events', function () {

    var num;
    beforeEach(function () {
      num = 0;
      app.on('add', function (e, args) {
        num += args['quantity'];
      });

      app.on('subtract', function (e, args) {
        num -= args['quantity'];
      });
    });

    describe("#on('event', callback), emit('event') and unsubscribe('event')", function () {

      it('should perform calculations when the event is emmited', function () {

        app.on('add', function (event, args) {
          num += 10;
        }).on('subtract', function (event, args) {
          num -= 10;
        });

        app.emit("add");
        assert.equal(num, 10);

        app.emit("add");
        app.emit("add");
        app.emit("add");

        app.emit("subtract");
        app.emit("subtract");
        assert.equal(num, 20);
      });


      it('should allow the emit call to send params', function () {

        app.emit("add", {quantity: 50});
        assert.equal(num, 50);

        app.emit("subtract", {quantity: 30});
        assert.equal(num, 20);

      });


      it('should unsubscribe to events', function () {

        app.emit("add", {quantity: 50});
        assert.equal(num, 50);

        var unsubscribe = false;
        app.unsubscribe("add", function (event) {
          unsubscribe = true;
        });
        assert.equal(true, unsubscribe, "Unsubscribe callabak");

        app.emit("add", {quantity: 30});
        assert.equal(num, 50);

      });

    });

  });

});
NVApp.run();
