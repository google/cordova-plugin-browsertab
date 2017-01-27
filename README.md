# cordova-plugin-browsertab-themeable

Note: This is not an official Google product.

## Supported Platforms

- __Android__
- __iOS__

## Installation

Execute from the projects root folder:
  ```
  $ cordova plugin add cordova-plugin-browsertab-themeable
  ```

Or install a specific version:
  ```
  $ cordova plugin add cordova-plugin-browsertab-themeable@VERSION
  ```

Or install the latest head version:
  ```
  $ cordova plugin add https://github.com/gabfiocchi/cordova-plugin-browsertab.git
  ```

## About

This plugin provides an interface to in-app browser tabs that exist on some
mobile platforms, specifically
[Custom Tabs](http://developer.android.com/tools/support-library/features.html#custom-tabs)
on Android (including the
[Chrome Custom Tabs](https://developer.chrome.com/multidevice/android/customtabs)
implementation), and
[SFSafariViewController](https://developer.apple.com/library/ios/documentation/SafariServices/Reference/SFSafariViewController_Ref/)
on iOS.

## Usage

To open a URL in an in-app browser tab on a compatible platform with Default theme:

    cordova.plugins.browsertab.themeable.openUrl('https://www.google.com');

To open a URL in an in-app browser tab on a compatible platform with Custom theme:

    cordova.plugins.browsertab.themeable.openUrl('https://www.google.com', {toolbarColor:"#000000"});

toolbarColor: works only with Hexa.

This plugin is designed to complement cordova-plugin-inappbrowser. No fallback
is triggered automatically, you need to test whether it will succeed, and then
perform your own fallback logic like opening the link in the system browser
instead using cordova-plugin-inappbrowser.

    cordova.InAppBrowser.open('https://www.google.com/', '_system');

Complete example with fallback handling:

    var testURL = 'https://www.google.com';

    document.querySelector("#tabwithfallback").addEventListener('click', function(ev) {
    cordova.plugins.browsertab.isAvailable(function(result) {
        if (!result) {
          cordova.InAppBrowser.open(testURL, '_system');
        } else {
          cordova.plugins.browsertab.openUrl(
              testURL,
              function(successResp) {},
              function(failureResp) {
                error.textContent = "failed to launch browser tab";
                error.style.display = '';
              });
        }
      },
      function(isAvailableError) {
        error.textContent = "failed to query availability of in-app browser tab";
        error.style.display = '';
      });
    });