window.GiveyApp = (function () {

  var app = this, klass, loadAdapter;
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
        console.error('GIVEY DATA ERROR: ', error);
      });
    });
  }

  app.getJSON = function(url, resolve, reject) {
    $.get(url).then(resolve, reject);
  }

  app.getApiHost = function () {
    return api_host;
  }
  app.getApiVersion = function () {

  }

  loadAdapter = function(adapterName) {
    var adapterClassName = adapterName.toUpperCase().split('').splice(0, 1).join('') + adapterName.split('').splice(1).join('');
    var adapter = GiveyAppAdapters[adapterClassName];
    if (! adapter) {
      console.error('Could not locate Givey Adapter [' + adapterClassName + ']');
      return;
    }
  }

  // Return instance constructor
  klass = function (options) {
    var options = options || {};
    api_host = options.host || 'https://api.givey.com';
    api_version = options.version || 1;
    if (options.adapter) {
      loadAdapter(options.adapter, options);
    }
    return app;
  }
  klass.models = {};
  klass.__proto__.registerModel = function (type, fields) {
    var model = GiveyModel.extend(app, type, fields);
    klass.models[type] = model;
    return model;
  }
  return klass;

}());

// Adapter Support
var GiveyAppAdapters = {};
