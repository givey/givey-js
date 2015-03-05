var Givey;

/**
 * Mock out Ajax Calls with fake response data
 */
function mockAjax(data) {
  Givey = Givey || new GiveyApp();
  Givey.getJSON = function(url, params, callback) {
    callback(data);
  }
}
