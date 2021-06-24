// Detect the current OS
function detectOS() {
  var linuxRegex = /Linux/i;
  var winRegex = /Win/i;
  var winNT7 = /NT 7/i;
  var winNT6 = /NT 6/i;
  var macRegex = /Mac/i;
  var crosRegex = /CrOS/i;

  var uaPromise = null;
  if (navigator.userAgentData) {
    uaPromise = navigator.userAgentData
                    .getHighEntropyValues(['platform', 'platformVersion'])
                    .then(ua => {
                      return ua?.platform + ' ' + ua?.platformVersion;
                    });
  } else {
    uaPromise = new Promise((res, rej) => {
      res(navigator.userAgent ?? '');
    });
  }

  return uaPromise.then(ua => {
    if (linuxRegex.test(ua)) return 'linux';
    if (winRegex.test(ua)) {
      if (winNT7.test(ua) || winNT6.test(ua)) return 'win_7_or_less';
      return 'win_latest';
    }
    if (macRegex.test(ua)) return 'mac';
    if (crosRegex.test(ua)) return 'cros';
    return null;
  });
}

// Get the OS from the 'os' GET parameter if set
function getOSGETParam() {
  var sp = new URLSearchParams(location.search);
  if (sp.has('os')) {
    var os = sp.get('os');
    switch (os) {
      case 'win':
        switch (sp.get('v')) {
          case '7-':
            return 'win_7_or_less';

          case 'latest':
          default:
            return 'win_latest';
        }
        break;
      case 'linux':
        return 'linux';

      case 'mac':
        return 'mac';

      case 'cros':
        return 'cros';

      default:
        console.warn('Requested OS "' + os + '" unknown.');
    }
  }

  return null;
}

// Get the target OS
function getOS() {
  // See whether a OS is being requested via a GET parameter
  var os = getOSGETParam();
  if (os !== null)
    return new Promise((res, rej) => {
      res(os);
    });

  // Otherwise, detect the browser
  return detectOS();
}

// Transform the OS into the label id
function getOSLabel() {
  return getOS().then(os => {
    switch (os) {
      case 'win_latest':
        return '1';

      case 'win_7_or_less':
        return '2';

      case 'mac':
        return '3';

      case 'linux':
        return '4';

      case 'cros':
        return '5';

      default:
        return null;
    }
  });
}

// Open the section corresponding to the target OS
function openAppropriateSection() {
  var tabs = document.querySelector('.md-content .tabbed-set');

  getOSLabel().then(labelId => {
    if (labelId === null) return;

    var label = tabs.querySelector('label[for="__tabbed_1_' + labelId + '"]');
    label.click();
  });
}

window.addEventListener('load', _ => {
  openAppropriateSection();
});
