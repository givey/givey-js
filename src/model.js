var GiveyModel = (function () {

  // Return instance constructor
  var ret = function GiveyModel (app, type, fields) {

    var self = this;

    self.app = app;
    self.type = type.capitalize();

    self.fields = {
      'id': 0
    }

    for (var field in fields) {
      self.fields[field] = fields[field];
    }
    return function (data) {

      var instance = this;
      instance.data = {};
      instance.type = self.type;

      instance.get = function(attr) {
        var type = self.fields[attr];

        // Custom Callback
        if (typeof type == 'function') {
          return type.call(instance);
        }

        var value = instance.data[attr];
        var model = GiveyApp.models[type];
        if (model) {
          var params = {};
          params[self.type.toLowerCase() + "_id"] = data['id'];
          return self.app.where(type, params);
        } else {
          return value;
        }
      }

      instance.dump = function () {
        return self.data;
      }

      instance.toString = function() {
        return 'GiveyModel[' + self.type + ']';
      }

      for (var field in data) {
        instance.data[field.camelize()] = data[field]
      }
      return instance;
    };

  }
  ret.extend = function (app, type, fields) {
    var instance = new GiveyModel(app, type, fields);
    return instance;
  }
  return ret;

}());
