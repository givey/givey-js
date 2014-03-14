GiveyApp.registerModel('business', {

  name: 'string',
  giveyTag: 'string',
  avatarUrl: 'string',
  matchCount: 'number',
  matchTotal: 'number',
  twitterHandle: 'string',
  emailDomain: 'string',
  profileMessage: 'string',

  employees: 'user',

  matchTotalFormatted: function () {
    return '£' + (Math.round((this.get('matchTotal') * 100) / 100) / 100).toFixed(2);
  }.property('matchTotal')

});
