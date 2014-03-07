module('Givey.find', {
  setup: function () {
    Givey = new GiveyApp();
  },
  teardown: function () {
    Givey = null;
  }
});
asyncTest('assigns business to a model', function () {
  expect(2)
  mockAjax({
    business: { id: 999, name: 'givey ltd' }
  });
  Givey.find('business', 999).then(function (model) {
    equal(model.get('id'), 999);
    equal(model.get('name'), 'givey ltd');
    start();
  });
});
asyncTest('assigns user to a model', function () {
  expect(2)
  mockAjax({
    business: { id: 42, full_name: 'John Smith' }
  });
  Givey.find('business', 42).then(function (model) {
    equal(model.get('id'), 42);
    equal(model.get('fullName'), 'John Smith');
    start();
  });
});
