GiveyAppAdapters.Backbone.App.Base = Backbone.Model.extend({

  getCloudinaryId: function (imageUrl) {
    if (imageUrl.indexOf('image/upload') > -1) {
      var match = imageUrl.match(/image\/upload((\/[a-z0-9,_]+)?\/(v[0-9]+))?\/([a-z0-9]+)\.(gif|jpg|png)/i);
      if (match && match[4]) {
        return match[4];
      }
    }
    return false;
  }

});
