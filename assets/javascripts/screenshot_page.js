// @Author: avm99963 (https://www.avm99963.com)
/* @License: The MIT License (MIT)

Copyright (c) 2021 Adrià Vilanova Martínez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

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
