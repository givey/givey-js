window.GiveyApp = (function () {

  var app = this, klass;
  var api_host = "https://api.givey.com";
  var api_token = null;

  // Generic Error Handler
  var failure_callback = function (error) {
    if (window.console && window.console.error) {
      console.error('GIVEY DATA ERROR:', error);
    } else {
      alert('GIVEY DATA ERROR: ' + error);
    }
  }

  // Find a resource by ID
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
      var url =  api_host + '/v3/' + resource + (typeof id === 'object' ? is_query_string() : '/' + id);
      var success_callback = function (data) {
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
      };
      app.getJSON(url, {}, success_callback, failure_callback);
    });
  }

  // Find a resource by filter params
  app.where = function (type, params) {
    return new RSVP.Promise(function(resolve, reject) {
      var resource = type.pluralize();
      var url = api_host + '/v3/' + resource;
      var success_callback = function (data) {
        var items = data[resource];
        var models = [];
        $.each(items, function(index, item) {
          var model = new klass.models[type](item);
          models.push(model);
        })
        resolve(models);
      };
      app.getJSON(url, params, success_callback, failure_callback);
    });
  };

  app.getJSON = function(url, data, resolve, reject) {
    data = data || {}
    data['access_token'] = api_token;
    var ajax = $.ajax({
      type: 'GET',
      url: url,
      data: data,
      crossDomain: true,
      dataType: 'jsonp'
    });
    ajax.then(resolve, reject);
  }

  // Return instance constructor
  klass = function (options) {
    var options = options || {};
    api_host = options.host || 'https://api.givey.com';
    api_token = options.token || null;
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

