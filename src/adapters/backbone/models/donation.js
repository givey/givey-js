GiveyAppAdapters.Backbone.App.Donation = GiveyAppAdapters.Backbone.App.Base.extend({

  parse: function(response) {
    var donation_images = _.map(response.donation_images_textile, function(image_textile) {
      var regexp = /!\((.+)\)(.+)!:(.+)/;
      var results = regexp.exec(image_textile);
      var classes  = results[1];
      var imageUrl = results[2];
      var url      = results[3];
      var template = '<p><a href="{{url}}"><img class="{{classes}}" src="{{imageUrl}}" alt="" /></a></p>'
      var html = template.replace("{{url}}", url);
      var html = html.replace("{{classes}}", classes);
      var html = html.replace("{{imageUrl}}", imageUrl);
      return html;
    });

    var user_image = _.find(donation_images, function(html) {
      return $(html).find('img.user').length > 0;
    });

    var giver_target_image = _.find(donation_images, function(html) {
      return $(html).find('img.via').length > 0;
    });

    user_image = $(user_image).find('img').attr('src');
    giver_target_image = $(giver_target_image).find('img').attr('src');

    if (! user_image || user_image.isGiveyDefaultImage()) {
      user_image = App.Defaults.LMGUserImage;
    }

    if (! giver_target_image || giver_target_image.isGiveyDefaultImage()) {
      giver_target_image = App.Defaults.LMGUserImage;
    }

    // Transform Cloudinary Sizing
    var cloudinaryId;
    cloudinaryId = this.getCloudinaryId(user_image);
    if (cloudinaryId) {
      user_image = 'http://res.cloudinary.com/givey/image/upload/w_250,h_250,c_fill,g_faces/' + cloudinaryId + '.png';
    }
    cloudinaryId = this.getCloudinaryId(giver_target_image);
    if (cloudinaryId) {
      giver_target_image = 'http://res.cloudinary.com/givey/image/upload/w_65,h_65,c_fill,g_faces/' + cloudinaryId + '.png';
    }

    var regexp = /\[(.+?)\]/g;
    matches = response.donation_string_textile.match(regexp);
    var html = response.donation_string_textile;
    _.each(matches, function(match) {
      var template = '<a class="{{classes}}" href="{{url}}">{{name}}</a>';
      var regexp = /\[\"\((.+)\)\.(.+)\":(.+)\]/;
      var results = regexp.exec(match);
      var classes = results[1];
      var name    = results[2];
      var url     = results[3];
      var string = template.replace("{{classes}}", classes);
      var string = string.replace("{{name}}", name);
      var string = string.replace("{{url}}", url);
      html = html.replace(match, string);
    });
    donation_string = '<p>'+html+'</p>';

    var donation = {
      id: response.id,
      url: response.canonical_url,
      user_image: user_image,
      giver_target_image: giver_target_image,
      donation_string: donation_string
    }
    return donation;
  }

});
