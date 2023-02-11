async function init() {
  return Promise.all([translate(), hydrate()]);
}

function translate() {
  return new Promise((resolve) => {
    const elements = document.querySelectorAll("[data-message]");
    for (const element of elements) {
      const key = element.dataset.message;
      const message = chrome.i18n.getMessage(key);
      if (message) {
        element.textContent = message;
      } else {
        console.error("Missing chrome.i18n message:", key);
      }
    }
    resolve();
  });
}

/**
 * @returns Promise
 */
async function hydrate() {

   var a = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"enabled": true}, function(options){
            resolve(options.enabled);
        })
    });

  const enabled = await a;
  console.log(enabled);


  // Hydrate Logo
  const $logo = document.querySelector(".logo");
  $logo.style.filter = enabled ? "grayscale(0)" : "grayscale(100%)";
  $logo.style.opacity = enabled ? "1" : "0.7";


  // Hydrate Checkbox Label
  const $checkboxLabel = document.querySelector("[data-message=adsblock]");
  $checkboxLabel.textContent = chrome.i18n.getMessage(
    enabled ? "adsblock" : "adsunblock"
  );

  // Hydrate Checkbox Label
  const $enabledCheckbox = document.querySelector("input[name=ads]");
  $enabledCheckbox.checked = enabled;
  $enabledCheckbox.addEventListener("change", async (event) => {
    const enabled = event.currentTarget.checked;

    // Persist
    await chrome.storage.sync.set({ enabled });

    // Update Checkbox Label
    $checkboxLabel.textContent = chrome.i18n.getMessage(
      enabled ? "adsblock" : "adsunblock"
    );

    // Update Logo
    $logo.style.filter = enabled ? "grayscale(0)" : "grayscale(100%)";
    $logo.style.opacity = enabled ? "1" : "0.7";
  });


  var c = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"videolike": true}, function(options){
            resolve(options.videolike);
        })
    });

  const videolike = await c;
  console.log(videolike);



  // Hydrate Checkbox Label
  const $checkboxLabel_2 = document.querySelector("[data-message=autolike]");
  $checkboxLabel_2.textContent = chrome.i18n.getMessage(
    videolike ? "autolike" : "manuallike"
  );

  // Hydrate Checkbox Label
  const $enabledCheckbox_2 = document.querySelector("input[name=like]");
  $enabledCheckbox_2.checked = videolike;
  $enabledCheckbox_2.addEventListener("change", async (event) => {
    const videolike = event.currentTarget.checked;

    // Persist
    await chrome.storage.sync.set({ videolike });

    // Update Checkbox Label
    $checkboxLabel_2.textContent = chrome.i18n.getMessage(
      videolike ? "autolike" : "manuallike"
    );
  });



  var d = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"videosubscribe": true}, function(options){
            resolve(options.videosubscribe);
        })
  });

  const videosubscribe = await d;
  console.log(videosubscribe);

  const $checkboxLabel_S = document.querySelector("[data-message=autosubscribe]");
  $checkboxLabel_S.textContent = chrome.i18n.getMessage(
    videosubscribe ? "autosubscribe" : "manualsubscribe"
  );

  // Hydrate Checkbox Label
  const $enabledCheckbox_S = document.querySelector("input[name=subscribe]");
  $enabledCheckbox_S.checked = videosubscribe;
  $enabledCheckbox_S.addEventListener("change", async (event) => {
    const videosubscribe = event.currentTarget.checked;

    // Persist
    await chrome.storage.sync.set({ videosubscribe });

    // Update Checkbox Label
    $checkboxLabel_S.textContent = chrome.i18n.getMessage(
      videosubscribe ? "autosubscribe" : "manualsubscribe"
    );
  });
  document.querySelector(".teaser").href = `https://chrome.google.com/webstore/detail/${chrome.runtime.id}`

}

init();
window.addEventListener("load", function () {
  /*  */
  var head = document.documentElement || document.head || document.querySelector("head");
  if (head) {
    var link = document.getElementById("youtube-sidebar-style-css");
    if (!link) {
      link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.setAttribute("id", "youtube-sidebar-style-css");
      link.href = chrome.runtime.getURL("data/button.css");
      head.appendChild(link);
    }
    /*  */
    var table = document.createElement("table");
    table.setAttribute("id", "top-button-table");
    /*  */
    var tr = document.createElement("tr");
    var faqicon = chrome.runtime.getURL("data/icons/faq.png");
    var backicon = chrome.runtime.getURL("data/icons/back.png");
    var homeicon = chrome.runtime.getURL("data/icons/home.png");
    var popouticon = chrome.runtime.getURL("data/icons/popout.png");
    var forwardicon = chrome.runtime.getURL("data/icons/forward.png");
    var settingsicon = chrome.runtime.getURL("data/icons/settings.png");
    /*  */
    var backButton = document.createElement("td");
    backButton.setAttribute("title", "Back");
    backButton.setAttribute("id", "back-button");
    backButton.style.backgroundImage = "url(" + backicon + ')';
    backButton.addEventListener("click", function () {window.history.back()});
    tr.appendChild(backButton);
    /*  */

    var settingsButton = document.createElement("td");
    settingsButton.setAttribute("title", "Settings");
    settingsButton.setAttribute("id", "settings-button");
    settingsButton.style.backgroundImage = "url(" + settingsicon + ')';
    settingsButton.addEventListener("click", function () {
      window.history.back()
    });
    tr.appendChild(settingsButton);
    /*  */

    var homeButton = document.createElement("td");
    homeButton.setAttribute("title", "Home");
    homeButton.setAttribute("id", "home-button");
    homeButton.style.backgroundImage = "url(" + homeicon + ')';
    homeButton.addEventListener("click", function () {window.history.back()});
    tr.appendChild(homeButton);
    /*  */

    /*  */
    var faqButton = document.createElement("td");
    faqButton.setAttribute("id", "faq-button");
    faqButton.setAttribute("title", "Support page");
    faqButton.style.backgroundImage = "url(" + faqicon + ')';
    faqButton.addEventListener("click", function () {
      background.send("faq");
    });
    tr.appendChild(faqButton);

    table.appendChild(tr);
    document.body.appendChild(table);
  }
});


