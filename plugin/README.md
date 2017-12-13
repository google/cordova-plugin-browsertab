# cordova-plugin-browsertab

Note: This is not an official Google product.

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

To open a URL in an in-app browser tab on a compatible platform:

    cordova.plugins.browsertab.openUrl('https://www.google.com');

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

## Customization

Plugin can be customized by providing parameters during installation.
You can customize i.e. custom tab background color by passing `CUSTOM_TAB_COLOR_RGB` variable in string RGB format:

```bash
cordova plugin add cordova-plugin-browsertab --variable CUSTOM_TAB_COLOR_RGB="#ff0000"
```

List of available parameters:

* **CUSTOM_TAB_COLOR_RGB** - Customize custom tab background color. Pass value as a RGB string `#RRGGBB`.
                            Supported by Android only at the moment.

## Building

Install Cordova if you haven't already:

    npm install -g cordova

Then from the root directory:

    cd demo
    cordova platform add ios
    cordova run ios
    cordova platform add android
    cordova run android

## Development

During development if you want to make changes to the plugin you need to force
a rebuild and add the plugin from source, like so (from the demo directory):

    cordova plugin remove cordova-plugin-browsertab
    cordova plugin add ../plugin

To refresh the platform build:

    cordova platform remove ios
    cordova platform add ios

To set breakpoints, etc, open the project in the code editor:

    cordova platform add ios
    open platforms/ios/BrowserTabDemo.xcworkspace
