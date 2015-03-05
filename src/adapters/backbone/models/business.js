GiveyAppAdapters.Backbone.App.Business = GiveyAppAdapters.Backbone.App.Base.extend({

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
