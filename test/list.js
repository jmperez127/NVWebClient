var assert = require('assert');
var app = require('../js/app/app');
var list = require('../js/app/list');

NV(function () {
  describe('List', function () {
    var globalList;
    beforeEach(function () {
      globalList = new List([
        {title: "test", content: "Test note"},
        {title: "test 2", content: "Test note 2"}
      ]);
    });

    describe("#get(index)", function () {
      it('Should return the list item with the get method, if not index is present it should return the whole list', function () {
        assert(globalList.get(1).title, "test 2");
        assert(globalList.get()[0].title, "test");

      });
    });

    describe('#orderBy(by, mode)', function () {
      it('should raise an exception if order by params are invalid', function () {
        try {
          list = new List([{title: "test", param2: ""}]);
          list.orderBy("error");
        } catch (e) {
          assert.equal(e, "Invalid order by parameter, valid parameters include are title, param2");
        }
        try {
          list = new List();
          list.orderBy("title", "ERROR");
        } catch (e) {
          assert.equal(e, "Invalid order mode parameter, valid parameters include are asc, desc");
        }

      });

      it('should order by title asc by defualt', function () {
        var list = new List([
          {title: "Z"},
          {title: "C"},
          {title: "D"},
          {title: "A"},
          {title: "9"},
          {title: "B"}
        ]);

        assert.deepEqual(list.orderBy("title").get(), [
          {title: "9"},
          {title: "A"},
          {title: "B"},
          {title: "C"},
          {title: "D"},
          {title: "Z"}
        ]);
      });

      it('can order asc or desc', function () {
        var list = new List([
          {title: "Z"},
          {title: "C"},
          {title: "D"},
          {title: "A"},
          {title: "9"},
          {title: "B"}
        ]);

        assert.deepEqual(list.orderBy("title", "desc").get(), [
          {title: "Z"},
          {title: "D"},
          {title: "C"},
          {title: "B"},
          {title: "A"},
          {title: "9"}
        ]);

        assert.deepEqual(list.orderBy("title", "asc").get(), [
          {title: "9"},
          {title: "A"},
          {title: "B"},
          {title: "C"},
          {title: "D"},
          {title: "Z"}
        ]);
      })

    });

    describe("#add()", function () {
      it('should increment the list count', function () {

        globalList.add({title: "test 3", content: "Test note 3"});
        assert.deepEqual(globalList.get(), [
          {title: "test", content: "Test note"},
          {title: "test 2", content: "Test note 2"},
          {title: "test 3", content: "Test note 3"}
        ]);
      });

      it('should remember the order the list was previously in', function () {
        list = new List([
          {title: "B"},
          {title: "C"}
        ]);
        list.orderBy("title", "asc");
        assert.equal(list.get(0).title, "B");

        list.add({title: "A"});

        assert.equal(list.get(0).title, "A");

      })
    });

    describe("#remove()", function () {
      it("should remove the item on a given index", function () {
        assert.deepEqual(globalList.delete(1).get(), [{
          title: "test", content: "Test note"
        }])
      })
    });

    describe("#filter()", function () {
      it("should return filtered items", function () {
        list = new List([
          {title: "B", content: "X"},
          {title: "BB", content: "X"},
          {title: "My content matche the test", content: "LL"},
          {title: "CA", content: "Q"}
        ]);

        assert.deepEqual(list.filter("L"), [
          {title: "My content matche the test", content: "LL"}
        ]);

        assert.deepEqual(list.filter("B"), [
          {title: "B", content: "X"},
          {title: "BB", content: "X"}
        ]);

      })
    })

  });

});
NVApp.run();
