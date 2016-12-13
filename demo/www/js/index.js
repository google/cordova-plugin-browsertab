/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

var app = {
  initialize: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  onDeviceReady: function() {
    var button = document.querySelector('#go');
    var nobrowser = document.querySelector('#nobrowser');
    var error = document.querySelector('#error');

    var testURL = 'https://www.google.com';

    document.querySelector('#browsertab').addEventListener('click', function(ev) {
      cordova.plugins.browsertab.isAvailable(function(result) {
        if (!result) {
          nobrowser.style.display = '';
        } else {
          cordova.plugins.browsertab.openUrl(
              testURL,
              function(successResp) {},
              function(failureResp) {
                error.textContent = 'failed to launch browser tab';
                error.style.display = '';
              });
          // Uncomment to test the SVC close functionality. Normally this would
          // be done as the result of an incoming link.
          //setTimeout(function() { cordova.plugins.browsertab.close() }, 3000);
        }
      },
      function(isAvailableError) {
        error.textContent = 'failed to query availability of in-app browser tab';
        error.style.display = '';
      });
    });

    document.querySelector('#browser').addEventListener('click', function(ev) {
      cordova.InAppBrowser.open(testURL, '_system');
    });

    document.querySelector('#tabwithfallback').addEventListener('click', function(ev) {
    cordova.plugins.browsertab.isAvailable(function(result) {
        if (!result) {
          cordova.InAppBrowser.open(testURL, '_system');
        } else {
          cordova.plugins.browsertab.openUrl(
              testURL,
              function(successResp) {},
              function(failureResp) {
                error.textContent = 'failed to launch browser tab';
                error.style.display = '';
              });
        }
      },
      function(isAvailableError) {
        error.textContent = 'failed to query availability of in-app browser tab';
        error.style.display = '';
      });
    });

  }
};

app.initialize();
