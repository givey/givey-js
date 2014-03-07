window.GiveyApp = (function () {

  var self = this;
  var api_host, api_version;
  self.models = {};

  self.find = function(type, id) {
    return new RSVP.Promise(function (resolve, reject) {
      var resource = type.pluralize();
      var url =  api_host + '/v' + api_version + '/' + resource + '/' + id;
      self.getJSON(url, function (data) {
        var model = new self.models[type.toLowerCase()](data[type]);
        resolve(model);
      }, function (error) {
        console.error('GIVEY DATA ERROR: ', error);
      });
    });
  }

  self.getJSON = function(url, resolve, reject) {
    $.get(url).then(resolve, reject);
  }

  // Return instance constructor
  var ret = function (options) {
    var options = options || {};
    api_host = options.host || 'https://api.givey.com';
    api_version = options.version || 1;
    return self;
  }
  ret.__proto__.registerModel = function (type, fields) {
    var model = new GiveyModel(fields);
    self.models[type] = model;
    return model;
  }
  return ret;

}());

