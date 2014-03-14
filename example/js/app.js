var App = {

  init: function (options) {

    var Givey = new GiveyApp(options);
    Givey.find('business', 'giveybiz').then(function (business) {
      $('.business-name').html(''
        + '<a href="https://www.givey.com/' + business.get('giveyTag') + '">'
          + business.get('name')
        + '</a>'
      );
      $('.business-profile').html(business.get('profileMessage'));
      var metrics = {
        matchCount: 'Number of Matches',
        matchTotalFormatted: 'Matched Amount'
      }
      $('.business-metrics').empty();
      $.each(metrics, function(attr, name) {
        var tr = $('<tr>');
        tr.html(''
          + '<td>' + name + '</td>'
          + '<td class="text-right">' + business.get(attr) + '</td>'
        )
        $('.business-metrics').append(tr);
      });

      // Employees
      business.get('employees').then(function (employees) {
        $.each(employees, function (_, user) {
          var link = 'https://www.givey.com/' + user.get('giveyTag');
          var tr = $('<tr>');
          tr.html(''
            + '<td width="10%">'
              + '<img src="' + user.get('avatarUrl') + '" width="48" height="48" alt=""/>'
            + '</td>'
            + '<td>'
              + '<h3><a href="' + link + '" target="_blank">' + (user.get('fullName') || user.get('shortName')) + '</a></h3>'
              + '<span class="text-muted">givey.com/' + user.get('giveyTag') + '</span>'
            + '</td>'
          );
          $('.business-employees').append(tr);
        });
      });

      // Donations
      business.get('donations').then(function (donations) {
        $.each(donations, function (_, donation) {
          var tr = $('<tr>');
          tr.html(''
            + '<td width="10%">'
              + donation.get('donationStringHtml')
            + '</td>'
          );
          $('.business-donations').append(tr);
        });
      });

      // Charities
      business.get('charities').then(function (charities) {
        $.each(charities, function (_, charity) {
          var link = 'https://www.givey.com/' + charity.get('giveyTag');
          var tr = $('<tr>');
          tr.html(''
            + '<td width="10%">'
              + '<a href="' + link + '" target="_blank">' + charity.get("name") + '</a>'
            + '</td>'
          );
          $('.business-charities').append(tr);
        });
      });

    });

  }

}
