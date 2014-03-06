window.GiveyApi = (function (options) {

  var self = this;

  var options = options || {};
  var api_host = options.host || 'https://api.givey.com';
  var api_version = options.version || 1;

  self.find = function(type, id) {
    return new RSVP.Promise(function (resolve, reject) {
      var resource = type.pluralize();
      var url =  api_host + '/v' + api_version + '/' + resource + '/' + id;
      $.get(url).then(function (data) {
        var model = new App[type.capitalize()](data[type]);
        resolve(model);
      }, function (error) {
        console.error('GIVEY DATA ERROR: ', error);
      });
    });
  }

  return self;

});

