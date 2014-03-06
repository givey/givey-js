String.prototype.isGiveyDefaultImage = function () {
  var image = this.toString();
  if (image.indexOf(App.Defaults.GiveyImages) > -1) {
    return true;
  }
  return false;
}

// Source: http://stackoverflow.com/a/21605159/1053704
if (typeof String.prototype.capitalize !== 'function') {
  String.prototype.capitalize = function(lc, all) {
    if (all) {
      return this.split(" ").map( function( currentValue, index, array ) {
        return currentValue.capitalize( lc );
      }, this ).join(" ").split("-").map( function( currentValue, index, array ) {
        return currentValue.capitalize( false );
      }, this ).join("-");
    }
    else {
      return lc ? this.charAt( 0 ).toUpperCase() + this.slice( 1 ).toLowerCase() : this.charAt( 0 ).toUpperCase() + this.slice( 1 );
    }
  }
}
