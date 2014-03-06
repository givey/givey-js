String.prototype.isGiveyDefaultImage = function () {
  var image = this.toString();
  if (image.indexOf(App.Defaults.GiveyImages) > -1) {
    return true;
  }
  return false;
}

String.prototype.capitalize = function (lc) {
  return lc
    ? this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
    : this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.camelize = function () {
  var s = this.trim().replace(/(\-|_|\s)+(.)?/g, function(mathc, sep, c) {
    return (c ? c.toUpperCase() : '');
  });
  return s;
}

String.prototype.pluralize = function () {
  var pluralizeMap = {
    'user': 'user',
    'channel': 'channels',
    'charity': 'charities',
    'donation': 'donations',
    'business': 'businesses',
    'givey_rule': 'givey_rules'
  }
  return pluralizeMap[this] || this + 's';
}
