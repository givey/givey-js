var App = {

  init: function (options) {

    var Givey = new GiveyApp(options);
    Givey.find('business', 'giveybiz').then(function (business) {
      $('.business-name').html(''
        + '<a href="https://www.givey.com/' + business.get('giveyTag').toLowerCase() + '" target="_blank">'
          + business.get('name')
        + '</a>'
      );
      $('.business-avatar').find('img').attr('src', business.get('avatarUrl'));
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
          var link = 'https://www.givey.com/' + user.get('giveyTag').toLowerCase();
          var tr = $('<tr>');
          tr.html(''
            + '<td width="10%">'
              + '<a href="' + link + '" target="_blank"><img src="' + user.get('avatarUrl') + '" width="48" height="48" alt=""/></a>'
            + '</td>'
            + '<td>'
              + '<h3><a href="' + link + '" target="_blank">' + user.get('name') + '</a></h3>'
              + '<a href="' + link + '" target="_blank" class="text-muted">givey.com/' + user.get('giveyTag').toLowerCase() + '</a>'
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
              + donation.get('summaryHtml')
            + '</td>'
          );
          $('.business-donations').append(tr);
        });
      });

      // Charities
      business.get('charities').then(function (charities) {
        $.each(charities, function (_, charity) {
          var link = 'https://www.givey.com/' + charity.get('giveyTag').toLowerCase();
          var tr = $('<tr>');
          tr.html(''
            + '<td width="10%">'
              + '<a href="' + link + '" target="_blank"><img src="' + charity.get('avatarUrl') + '" width="48" height="48" alt=""/></a>'
            + '</td>'
            + '<td>'
              + '<h3><a href="' + link + '" target="_blank">' + charity.get('name') + '</a></h3>'
              + '<a href="' + link + '" target="_blank" class="text-muted">givey.com/' + charity.get('giveyTag').toLowerCase() + '</a>'
            + '</td>'
          );
          $('.business-charities').append(tr);
        });
      });

    });

  }

}
