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

var actualversion;

function detectCrVersion() {
  if (!navigator?.userAgentData)
    return Promise.resolve(
        window.navigator.appVersion.match(/Chrome\/(.*?) /)?.[1]);

  return navigator.userAgentData.getHighEntropyValues(['fullVersionList'])
      .then(res => {
        let brands = res?.fullVersionList ?? [];
        for (const b of brands)
          if (b?.brand == 'Chromium' || b?.brand == 'Google Chrome')
            return b?.version;

        return undefined;
      });
}

function convert2OmahaOS(os) {
  if (os == 'linux' || os == 'mac' || os == 'cros' || os == 'android')
    return os;
  if (os == 'win_7_or_less' || os == 'win_latest') return 'win64';
  return undefined;
}

function prettifyOS(os) {
  if (os == 'linux') return 'Linux';
  if (os == 'mac') return 'Mac';
  if (os == 'cros') return 'Chrome OS';
  if (os == 'win_7_or_less' || os == 'win_latest') return 'Windows';
  if (os == 'android') return 'Android';
  return undefined;
}

var app = {
  init: function() {
    let promises = [];
    promises.push(fetch('https://omahaproxy.appspot.com/all.json')
                      .then(res => res.json()));
    promises.push(detectOS());
    promises.push(detectCrVersion());

    Promise.all(promises)
        .then(responses => {
          const [chromeVersions, os, version] = responses;
          if (!version) {
            document.getElementById('version').textContent =
                'No hemos podido determinar tu versión.';
            document.getElementById('updated').textContent =
                'Es posible que no estés usando Chrome o que la página no funcione correctamente.';
            return;
          }

          let majorVersion = version?.split?.('.')?.[0];
          let omahaOS = convert2OmahaOS(os);
          let matches = chromeVersions.filter(function(val, index, array) {
            return val.os === omahaOS;
          });
          var actualChrome =
              matches?.[0]?.versions?.filter?.(function(val, index, array) {
                return val.channel === 'stable';
              }) ??
              [];
          actualVersion = actualChrome?.[0]?.version?.split?.('.')?.[0];
          if (actualVersion === undefined) {
            document.getElementById('updated').innerHTML = '';
          } else if (majorVersion < actualVersion) {
            document.getElementById('updated').innerHTML =
                '¡Oh, no! Google Chrome ' +
                '<a href=\'https://support.google.com/chrome/answer/95414\'>no está actualizado</a>.';
          } else if (majorVersion > actualVersion) {
            document.getElementById('updated').innerHTML =
                'No estás usando el canal estable de Chrome. Ve con cuidado ;-)';
          } else if (version != actualChrome[0].version) {
            document.getElementById('updated').innerHTML =
                'Oops, Google Chrome ' +
                '<a href=\'https://support.google.com/chrome/answer/95414\'>no está actualizado</a>.';
          } else {
            document.getElementById('updated').innerHTML =
                'Chrome está actualizado';
          }
          let prettyOS = prettifyOS(os);
          document.getElementById('version').textContent = 'Usas la versión ' +
              version + ' de Chrome' + (prettyOS ? ' en ' + prettyOS : '');
        })
        .catch(err => {
          document.getElementById('version').textContent =
              'Ha ocurrido un error inesperado.';
          document.getElementById('updated').textContent =
              'Error: ' + err + '.';
        });
  }
};

window.addEventListener('load', _ => {
  app.init();
});
