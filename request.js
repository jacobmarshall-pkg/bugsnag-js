function serialise(params) {
  // https://github.com/bugsnag/bugsnag-js/blob/d11bb20067a3cf786753d1cc671e36e9fd57ea5d/src/bugsnag.js#L731
  function _serialise(obj, prefix) {
    var str = [];
    for (var p in obj) {
      if (obj.hasOwnProperty(p) && p != null && obj[p] != null) {
        var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
        str.push(typeof v === 'object' ? _serialise(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
      }
    }
    return str.sort().join('&');
  }
  return _serialise(params);
}

function request(endpoint, params) {
  var url = endpoint + '?ct=img&cb=' + Date.now() + '&' + serialise(params);
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send(null);
}

module.exports = request;
