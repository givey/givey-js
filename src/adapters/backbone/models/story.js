GiveyAppAdapters.Backbone.App.Story = GiveyAppAdapters.Backbone.App.Base.extend({

  parse: function(response) {
    var story = {
      title: response.header,
      summary: response.summary,
      url: response.url,
      image: response.image_thumbnail_medium
    }
    return story;
  }

});
