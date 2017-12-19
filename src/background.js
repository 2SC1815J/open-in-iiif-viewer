/*
 * Open IIIF Manifest Link In Favorite Viewer
 *
 * Copyright 2017 2SC1815J
 * Released under the MIT license
 */
(function() {
    'use strict';

    // ref.
    // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/sendMessage
    // https://developer.mozilla.org/en-US/docs/MDN/About#Copyrights_and_licenses
    // Code samples added on or after August 20, 2010 are in the public domain.
    
    function sendMessageToTabs(function_) {
        browser.tabs.query({
            currentWindow: true,
            active: true
        }).then(function(tabs) {
            for (let tab of tabs) {
                browser.tabs.sendMessage(
                    tab.id,
                    {message: 'getManifestUrl'}
                ).then(response => {
                    function_(response.url);
                }).catch(onError);
            }
        }).catch(onError);
    }
    
    function onError() {
        browserActionButtonOff();
    }
    
    function openNewTab() {
        sendMessageToTabs(function(url) {
            if (url) {
                browser.storage.sync.get({
                    openInBaseUrl: 'http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?manifest='
                }).then((options) => {
                    var viewerUrl = options.openInBaseUrl + url;
                    browser.tabs.create({url: viewerUrl});
                });
            }
        });
    }
    browser.browserAction.onClicked.addListener(openNewTab);

    // icons: 'Ligature Symbols' (by Kazuyuki Motoyama) under the SIL Open Font License. 
    // http://kudakurage.com/ligature_symbols/
    function browserActionButtonOff() {
        browser.browserAction.setTitle({title: 'IIIF Manifest not found'});
        browser.browserAction.setIcon({path: 'icon_off.svg'});
    }
    function updateBrowserActionButton() {
        sendMessageToTabs(function(url) {
            if (url) {
                browser.browserAction.setTitle({title: url});
                browser.browserAction.setIcon({path: 'icon.svg'});
            } else {
                browserActionButtonOff();
            }
        });
    }
    browser.tabs.onUpdated.addListener(updateBrowserActionButton);
    browser.tabs.onActivated.addListener(updateBrowserActionButton);
})();