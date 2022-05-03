// @Author: avm99963 (https://www.avm99963.com)
/* @License: The MIT License (MIT)

Copyright (c) 2022 Adrià Vilanova Martínez

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

// Detect the current OS
function detectOS() {
  var androidRegex = /Android/i;
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
    // The order in which OSs are checked is important! (e.g. Android contains
    // the substring "Linux" in its user agent)
    if (androidRegex.test(ua)) return 'android';
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
