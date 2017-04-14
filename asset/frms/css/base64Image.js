(function() {
  module.exports = function(dataString) {
    var matches, response;
    matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    response = {};
    console.log(matches.length);
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    return response;
  };

}).call(this);
