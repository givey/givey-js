window.GiveyApp = (function () {

  var app = this, klass;
  var api_host, api_version;

  app.find = function(type, id) {
    return new RSVP.Promise(function (resolve, reject) {
      var resource = type.pluralize();
      var is_query_string = function () {
        var ids = [];
        for (var _id in id) {
          if (id.hasOwnProperty(_id)) {
            ids.push('ids[]=' + id[_id]);
          }
        }
        return '?' + ids.join('&');
      }
      var url =  api_host + '/v' + api_version + '/' + resource + (typeof id === 'object' ? is_query_string() : '/' + id);
      app.getJSON(url, function (data) {
        if (typeof id === 'object') {
          var items = data[resource];
          var models = [];
          $.each(items, function(index, item) {
            var model = new klass.models[type](item);
            models.push(model);
          })
          resolve(models);
        } else {
          var model = new klass.models[type](data[type]);
          resolve(model);
        }
      }, function (error) {
        if (window.console && window.console.error) {
          console.error('GIVEY DATA ERROR:', error);
        } else {
          alert('GIVEY DATA ERROR: ' + error);
        }
      });
    });
  }

  app.getJSON = function(url, resolve, reject) {
    var ajax = $.ajax({
      type: 'GET',
      url: url,
      crossDomain: true,
      dataType: 'jsonp'
    });
    ajax.then(resolve, reject);
  }

  // Return instance constructor
  klass = function (options) {
    var options = options || {};
    api_host = options.host || 'https://api.givey.com';
    api_version = options.version || 1;
    return app;
  }
  klass.models = {};
  klass.registerModel = function (type, fields) {
    var model = GiveyModel.extend(app, type, fields);
    klass.models[type] = model;
    return model;
  }
  return klass;

}());

