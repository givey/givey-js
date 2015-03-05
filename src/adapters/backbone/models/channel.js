GiveyAppAdapters.Backbone.App.Channel = GiveyAppAdapters.Backbone.App.Base.extend({

  parse: function(response) {

    var image_url = response.hero_image_url;

    // Apply Default Image
    if (! image_url || image_url.isGiveyDefaultImage()) {
      image_url = App.Defaults.LMGChannelImage;
    }

    // Transform Cloudinary Sizing
    var cloudinaryId = this.getCloudinaryId(image_url);
    if (cloudinaryId) {
      image_url = 'http://res.cloudinary.com/givey/image/upload/w_600,h_600,c_fill,g_faces/' + cloudinaryId + '.png';
    }

    var channel = {
      id: response.id,
      givey_tag: response.givey_tag,
      title: [response.name, 'for', response.charity.name].join(" "),
      image: image_url,
      user_name: response.user.short_name
    };
    return channel;
  }

});
