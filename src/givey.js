window.GiveyApi = (function () {

  var self = this;

  var pluralizeMap = {
    'user': 'user',
    'channel': 'channels',
    'charity': 'charities',
    'donation': 'donations',
    'business': 'businesses',
    'givey_rule': 'givey_rules'
  }

  self.find = function(type, id) {
    return new RSVP.Promise(function (resolve, reject) {
      var resource = pluralizeMap[type];
      var url =  'https://givey-api-staging.herokuapp.com/v1/' + resource + '/' + id;
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

