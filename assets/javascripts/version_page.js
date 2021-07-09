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

var actualversion;

var app = {
  init: function() {
    fetch('https://omahaproxy.appspot.com/all.json')
        .then(res => res.json())
        .then(chromeversions => {
          var browser = BrowserDetect.browser, version = BrowserDetect.version,
              version2, os3, os2 = System.OS(), os = BrowserDetect.OS;
          if (navigator.appVersion.indexOf('OPR') != -1) browser = 'Opera';
          if (browser == 'Chrome') {
            version2 = window.navigator.appVersion.match(/Chrome\/(.*?) /)[1];
            if (navigator.appVersion.indexOf('CrOS') != -1)
              var os = 'Chrome OS', os2 = 'cros', os3 = 'Chrome OS';
            else
              var os3 = os2,
                  os2 = str_replace(
                      ['Windows', 'Mac', 'iPhone/iPod', 'Chrome OS', 'Linux'],
                      ['win64', 'mac', 'ios', 'cros', 'linux'], os);
            var matches = chromeversions.filter(function(val, index, array) {
              return val.os === os2;
            });
            var actualchrome =
                matches[0].versions.filter(function(val, index, array) {
                  return val.channel === 'stable';
                });
            actualversion = actualchrome[0].version.split('.')[0];
            if (version < actualversion) {
              document.getElementById('updated').innerHTML =
                  '¡Oh, no! Google Chrome ' +
                  '<a href=\'https://support.google.com/chrome/answer/95414\'>no está actualizado</a>.';
            } else if (version > actualversion) {
              document.getElementById('updated').innerHTML =
                  'No estás usando el canal estable de Chrome. Ve con cuidado ;-)';
            } else if (version2 != actualchrome[0].version) {
              document.getElementById('updated').innerHTML =
                  'Oops, Google Chrome ' +
                  '<a href=\'https://support.google.com/chrome/answer/95414\'>no está actualizado</a>.';
            } else {
              document.getElementById('updated').innerHTML =
                  'Chrome está actualizado';
            }
          } else {
            os3 = os2;
            version2 = version;
          }
          document.getElementById('version').textContent =
              'Usas la versión ' + version2 + ' de ' + browser + ' en ' + os3;
        });
  }
}

// Function to detect navigator (informally browser)
// Source:

var BrowserDetect = {
  init: function() {
    this.browser = this.searchString(this.dataBrowser) || '?';
    this.version = this.searchVersion(navigator.userAgent) ||
        this.searchVersion(navigator.appVersion) || '?';
    this.OS = this.searchString(this.dataOS) || '?';
  },
  searchString: function(data) {
    for (var i = 0; i < data.length; i++) {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) != -1)
          return data[i].identity;
      } else if (dataProp)
        return data[i].identity;
    }
  },
  searchVersion: function(dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index == -1) return;
    return parseFloat(
        dataString.substring(index + this.versionSearchString.length + 1));
  },
  dataBrowser: [
    {string: navigator.userAgent, subString: 'Chrome', identity: 'Chrome'}, {
      string: navigator.userAgent,
      subString: 'OmniWeb',
      versionSearch: 'OmniWeb/',
      identity: 'OmniWeb'
    },
    {
      string: navigator.vendor,
      subString: 'Apple',
      identity: 'Safari',
      versionSearch: 'Version'
    },
    {prop: window.opera, identity: 'Opera', versionSearch: 'Version'},
    {string: navigator.vendor, subString: 'iCab', identity: 'iCab'},
    {string: navigator.vendor, subString: 'KDE', identity: 'Konqueror'},
    {string: navigator.userAgent, subString: 'Firefox', identity: 'Firefox'},
    {string: navigator.vendor, subString: 'Camino', identity: 'Camino'}, {
      // for newer Netscapes (6+)
      string: navigator.userAgent,
      subString: 'Netscape',
      identity: 'Netscape'
    },
    {
      string: navigator.userAgent,
      subString: 'MSIE',
      identity: 'Explorer',
      versionSearch: 'MSIE'
    },
    {
      string: navigator.userAgent,
      subString: 'Gecko',
      identity: 'Mozilla',
      versionSearch: 'rv'
    },
    {
      // for older Netscapes (4-)
      string: navigator.userAgent,
      subString: 'Mozilla',
      identity: 'Netscape',
      versionSearch: 'Mozilla'
    }
  ],
  dataOS: [
    {string: navigator.platform, subString: 'Win', identity: 'Windows'},
    {string: navigator.platform, subString: 'Mac', identity: 'Mac'},
    {string: navigator.userAgent, subString: 'iPhone', identity: 'iPhone/iPod'},
    {string: navigator.platform, subString: 'Linux', identity: 'Linux'}
  ]
};

function str_replace(search, replace, subject, count) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Gabriel Paderni
  // +   improved by: Philip Peterson
  // +   improved by: Simon Willison (http://simonwillison.net)
  // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   bugfixed by: Anton Ongson
  // +      input by: Onno Marsman
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    tweaked by: Onno Marsman
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   input by: Oleg Eremeev
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Oleg Eremeev
  // %          note 1: The count parameter must be passed as a string in order
  // %          note 1:  to find a global variable in which the result will be
  // given
  // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
  // *     returns 1: 'Kevin.van.Zonneveld'
  // *     example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name},
  // lars');
  // *     returns 2: 'hemmo, mars'
  var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0, f = [].concat(search),
      r = [].concat(replace), s = subject,
      ra = Object.prototype.toString.call(r) === '[object Array]',
      sa = Object.prototype.toString.call(s) === '[object Array]';
  s = [].concat(s);
  if (count) {
    this.window[count] = 0;
  }

  for (i = 0, sl = s.length; i < sl; i++) {
    if (s[i] === '') {
      continue;
    }
    for (j = 0, fl = f.length; j < fl; j++) {
      temp = s[i] + '';
      repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
      s[i] = (temp).split(f[j]).join(repl);
      if (count && s[i] !== temp) {
        this.window[count] += (temp.length - s[i].length) / f[j].length;
      }
    }
  }
  return sa ? s : s[0];
}

/**
 * JavaScript Client Detection
 * (C) viazenetti GmbH (Christian Ludwig)
 */

var System = {
  OS: function() {
    var unknown = '?';

    // browser
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browser = navigator.appName;
    var version = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // system
    var os = unknown;
    var clientStrings = [
      {s: 'Windows 3.11', r: /Win16/},
      {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
      {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
      {s: 'Windows 98', r: /(Windows 98|Win98)/},
      {s: 'Windows CE', r: /Windows CE/},
      {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
      {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
      {s: 'Windows Server 2003', r: /Windows NT 5.2/},
      {s: 'Windows Vista', r: /Windows NT 6.0/},
      {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
      {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
      {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
      {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
      {s: 'Windows ME', r: /Windows ME/},
      {s: 'Android', r: /Android/},
      {s: 'Open BSD', r: /OpenBSD/},
      {s: 'Sun OS', r: /SunOS/},
      {s: 'Linux', r: /(Linux|X11)/},
      {s: 'iOS', r: /(iPhone|iPad|iPod)/},
      {s: 'Mac OS X', r: /Mac OS X/},
      {s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
      {s: 'QNX', r: /QNX/},
      {s: 'UNIX', r: /UNIX/},
      {s: 'BeOS', r: /BeOS/},
      {s: 'OS/2', r: /OS\/2/},
      {
        s: 'Search Bot',
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
      }
    ];
    for (var id in clientStrings) {
      var cs = clientStrings[id];
      if (cs.r.test(nAgt)) {
        os = cs.s;
        break;
      }
    }

    var osVersion = 'unknown';

    if (/Windows/.test(os)) {
      osVersion = /Windows (.*)/.exec(os)[1];
      os = 'Windows';
    }

    switch (os) {
      case 'Mac OS X':
        osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
        break;

      case 'Android':
        osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
        break;

      case 'iOS':
        osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
        osVersion =
            osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
        break;
    }

    var jscd = {os: os, osVersion: osVersion};

    return (jscd.os + ' ' + jscd.osVersion);
  }
};

window.addEventListener('load', _ => {
  BrowserDetect.init();
  app.init();
});
