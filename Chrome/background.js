importScripts("lib/config.js");
importScripts("lib/chrome.js");
importScripts("lib/runtime.js");
importScripts("lib/common.js");


// chrome.tabs.query({
//   active:!0
// }, function(tabs) {
//     var x = "window.navigator.__defineGetter__('userAgent', function() {" +
//             "return 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D)" +
//             " AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile " + 
//             "Safari/535.19'; });console.log(navigator.userAgent);";

//     for (var i = 0;i < tabs.length;i++) {
//       var code = 'var s = document.createElement("script"); s.text = "' + x +
//                  '"; document.head.insertBefore(s, document.head.firstChild);' + 
//                  'navigator.userAgent ="s"; console.log(navigator.userAgent);';

//       chrome.tabs.executeScript(tabs[i].id, {
//         code: code
//       });
//     }
//   });