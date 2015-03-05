GiveyAppAdapters.Backbone = {

  App: {}

}
;GiveyAppAdapters.Backbone.App.Base = Backbone.Model.extend({

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
;GiveyAppAdapters.Backbone.App.Business = GiveyAppAdapters.Backbone.App.Base.extend({

  url: function() {
    return [App.Defaults.host, '/businesses/', App.Defaults.businessId].join("");
  },

  parse: function(response) {
    var amount_raised = parseInt(response.match_total_cache) + 1140775
    var amount_formatted = (Math.round(amount_raised / 100)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return {
      id: response.id,
      givey_tag: response.givey_tag,
      amount_raised: amount_raised,
      amount_raised_gbp: amount_formatted,
      match_count: response.match_count_cache,
      employee_count: response.employee_count
    };
  }

});
;GiveyAppAdapters.Backbone.App.Channel = GiveyAppAdapters.Backbone.App.Base.extend({

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
;GiveyAppAdapters.Backbone.App.Charity = GiveyAppAdapters.Backbone.App.Base.extend({

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
;GiveyAppAdapters.Backbone.App.Donation = GiveyAppAdapters.Backbone.App.Base.extend({

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
;GiveyAppAdapters.Backbone.App.Story = GiveyAppAdapters.Backbone.App.Base.extend({

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
