var Givey, business;

module('GiveyModel', {
  setup: function () {
    Givey = new GiveyApp();
    business = new GiveyApp.models['business']({ id: 1, givey_tag: 'giveybiz', name: 'givey ltd', employees: [1, 1439] });
  },
  teardown: function () {
    Givey = null;
  }
});
test('directly create a model', function () {
  expect(2);
  equal(business.get('name'), 'givey ltd');
  equal(business.type, 'Business');
});
asyncTest('get with hasMany relationship', function () {
  expect(4);
  mockAjax({
    users: [
      { id: 1, givey_tag: 'dave', full_name: 'Dave Erasmus' },
      { id: 1439, givey_tag: 'marcqualie', full_name: 'Marc Qualie' }
    ]
  });
  business.get('employees').then(function (employees) {
    start();
    equal(employees.length, 2);
    equal(employees[0].get('giveyTag'), 'dave');
    equal(employees[1].get('giveyTag'), 'marcqualie');
    equal(employees[0].type, 'User');
  });
});
