var config = {};

config.welcome = {
  set lastupdate (val) {app.storage.write("lastupdate", val)},
  get lastupdate () {return app.storage.read("lastupdate") !== undefined ? app.storage.read("lastupdate") : 0}
};
chrome.webRequest.onHeadersReceived.addListener
  (
    function (info) {
      var headers = info.responseHeaders;
      for (var i = headers.length - 1; i >= 0; --i) {
        var header = headers[i].name.toLowerCase();
        if (header == 'x-frame-options' || header == 'frame-options' || header == 'content-security-policy' || header == 'x-content-type-options' || header == 'x-xss-protection') {
          headers.splice(i, 1); // Remove header
        }
      }
      return { responseHeaders: headers };
    },
    {
      urls: ['*://*/*'],
      types: ['sub_frame']
    },
    ['blocking', 'responseHeaders']
  );