var assert = require('assert');
var app = require('../js/app/app');
var list = require('../js/app/events');

NV(function () {
  var app = this;

  describe('Events', function () {

    describe("#on('event', callback), emit('event') and un", function () {

      this.timeout(5000);

      it('should perform calculations when the event is emmited', function () {
        var mocha = this;
        var num = 0;

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
        var num = 0;

        app.on('add', function (event, args) {
          num += args['quantity'];
        });

        app.on('subtract', function (event, args) {
          num -= args['quantity'];
        });

        app.emit("add", {quantity: 50});
        assert.equal(num, 50);

        app.emit("subtract", {quantity: 30});
        assert.equal(num, 20);


      });


      it('should unsubscribe to events', function () {
        var num = 0;

        app.on('add', function (event, args) {
          num += args['quantity'];
        });

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
