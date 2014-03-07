module('Model.getMany', {
  setup: function () {
    Givey = new GiveyApp();
  },
  teardown: function () {
    Givey = null;
  }
});
test('directly create a model', function () {
  var business = new Givey.models['business']({ id: 1, givey_tag: 'giveybiz', name: 'givey ltd' });
  equal(business.get('name'), 'givey ltd');
});
