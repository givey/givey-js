var Givey;

/**
 * Mock out Ajax Calls with fake response data
 */
function mockAjax(data) {
  Givey = Givey || new GiveyApiClient();
  Givey.getJSON = function(url, callback) {
    callback(data);
  }
}
