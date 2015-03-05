GiveyAppAdapters.Backbone.App.Charity = GiveyAppAdapters.Backbone.App.Base.extend({

  parse: function(response) {

    // Get Image
    var charity_image = response.avatar_url;

    // Make default if not available
    if (! charity_image || charity_image.isGiveyDefaultImage()) {
      charity_image = App.Defaults.LMGCharityImage;
    }

    // Transform Cloudinary Sizing
    var cloudinaryId = this.getCloudinaryId(charity_image);
    if (cloudinaryId) {
      charity_image = 'http://res.cloudinary.com/givey/image/upload/w_200,h_200,c_fill,g_faces/' + cloudinaryId + '.png';
    }

    // Object
    var donation = {
      id: response.id,
      name: response.name,
      givey_tag: response.givey_tag,
      url: App.Defaults.giveyPublicURL + '/' + response.givey_tag.toLowerCase(),
      image_url: charity_image,
      // image_id: this.getCloudinaryId(charity_image),
      amount_raised: 250
    }
    return donation;
  }

});
