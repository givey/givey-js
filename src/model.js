var App = App || {};

window.GiveyModel = (function () {

  var self = this;
  self.fields = {
    'id': 0
  }

  self.data = {}

  self.get = function(attr) {
    return self.data[attr];
  }

  // Return instance constructor
  var ret = function (fields) {
    for (var field in fields) {
      self.fields[field] = fields[field];
    }
    return function (data) {
      for (var field in data) {
        self.data[field] = data[field];
      }
      return self;
    };
  }
  ret.__proto__.extend = function (fields) {
    var instance = new GiveyModel(fields);
    return instance;
  }
  return ret;

}());
